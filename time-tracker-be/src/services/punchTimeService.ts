import sql from "mssql";
import { poolPromise } from "../config/db";
import { CreatePunchTimeDto } from "../models/CreatePunchTimeDto";
import { PunchTimeResponseDto } from "../models/PunchTimeResponseDto";

export const createPunchTime = async (dto: CreatePunchTimeDto): Promise<PunchTimeResponseDto> => {
    const pool = await poolPromise;
    const tr = new sql.Transaction(pool);
    await tr.begin();
    try {
        const insertPunch = await tr
            .request()
            .input("userSubmit", sql.Int, dto.userSubmit)
            .input("stuffId", sql.Int, dto.stuffId)
            .input("clientId", sql.Int, dto.clientId)
            .input("locationId", sql.Int, dto.locationId)
            .input("startedUp", sql.DateTime2, dto.startedUp)
            .input("description", sql.NVarChar, dto.description ?? null)
            .input("status", sql.NVarChar, dto.status).query(`
                INSERT INTO PunchTime (userSubmit, stuffId, clientId, locationId, startedUp, description, status)
                OUTPUT INSERTED.*
                VALUES (@userSubmit, @stuffId, @clientId, @locationId, @startedUp, @description, @status)
            `);

        const punchTime = insertPunch.recordset[0];
        // Update user.punchTimeId
        await tr
            .request()
            .input("punchTimeId", sql.Int, punchTime.id)
            .input("userId", sql.Int, punchTime.userSubmit)
            .query("UPDATE Users SET punchTimeId = @punchTimeId WHERE id = @userId");

        // JOIN info
        const info = await tr.request().input("stuffId", sql.Int, punchTime.stuffId).input("clientId", sql.Int, punchTime.clientId).query(`
                SELECT *,
                   (SELECT TOP 1 * FROM Employees WHERE id = @stuffId FOR JSON PATH, WITHOUT_ARRAY_WRAPPER) AS stuffInfo,
                   (SELECT TOP 1 * FROM Clients WHERE id = @clientId FOR JSON PATH, WITHOUT_ARRAY_WRAPPER) AS clientInfo
                    FROM (SELECT 1 AS dummy) AS t
            `);
        const dtoFull = {
            ...punchTime,
            stuffInfo: JSON.parse(info.recordset[0].stuffInfo),
            clientInfo: JSON.parse(info.recordset[0].clientInfo),
        };
        await tr.commit();
        return dtoFull;
    } catch (e) {
        await tr.rollback();
        throw e;
    }
};

export const getPunchTimeById = async (id: number): Promise<PunchTimeResponseDto | null> => {
    const pool = await poolPromise;
    const result = await pool.request().input("id", sql.Int, id).query(`
        SELECT pt.*, 
           (SELECT TOP 1 * FROM Employees WHERE id = pt.stuffId FOR JSON PATH, WITHOUT_ARRAY_WRAPPER) AS stuffInfo,
           (SELECT TOP 1 * FROM Clients WHERE id = pt.clientId FOR JSON PATH, WITHOUT_ARRAY_WRAPPER) AS clientInfo
        FROM PunchTime pt WHERE pt.id = @id
    `);
    if (!result.recordset[0]) return null;
    const row = result.recordset[0];
    return {
        id: row.id,
        userSubmit: row.userSubmit,
        stuffId: row.stuffId,
        clientId: row.clientId,
        locationId: row.locationId,
        startedUp: row.startedUp,
        finishAt: row.finishAt,
        description: row.description,
        status: row.status,
        hour: row.hour,
        stuffInfo: JSON.parse(row.stuffInfo),
        clientInfo: JSON.parse(row.clientInfo),
    };
};

export const getAllPunchTimes = async (): Promise<PunchTimeResponseDto[]> => {
    const pool = await poolPromise;
    const result = await pool.request().query(`
        SELECT pt.*, 
           (SELECT TOP 1 * FROM Employees WHERE id = pt.stuffId FOR JSON PATH, WITHOUT_ARRAY_WRAPPER) AS stuffInfo,
           (SELECT TOP 1 * FROM Clients WHERE id = pt.clientId FOR JSON PATH, WITHOUT_ARRAY_WRAPPER) AS clientInfo
        FROM PunchTime pt ORDER BY startedUp DESC
    `);
    return result.recordset.map((row) => ({
        id: row.id,
        userSubmit: row.userSubmit,
        stuffId: row.stuffId,
        clientId: row.clientId,
        locationId: row.locationId,
        startedUp: row.startedUp,
        finishAt: row.finishAt,
        description: row.description,
        status: row.status,
        hour: row.hour,
        stuffInfo: JSON.parse(row.stuffInfo),
        clientInfo: JSON.parse(row.clientInfo),
    }));
};

export const updatePunchTime = async (
    id: number,
    payload: { stuffId?: number; description?: string; status?: "Active" | "Completed" }
): Promise<PunchTimeResponseDto | null> => {
    const pool = await poolPromise;
    const tr = new sql.Transaction(pool);
    await tr.begin();
    try {
        const current = await tr.request().input("id", sql.Int, id).query("SELECT * FROM PunchTime WHERE id = @id");
        if (!current.recordset[0]) throw new Error("PunchTime not found");
        const cur = current.recordset[0];
        let finishAt = cur.finishAt;
        let hour = cur.hour;
        if (payload.status === "Completed" && cur.status !== "Completed") {
            finishAt = new Date();
            hour = (finishAt - cur.startedUp) / (1000 * 60 * 60);
        }
        await tr
            .request()
            .input("id", sql.Int, id)
            .input("stuffId", sql.Int, payload.stuffId ?? cur.stuffId)
            .input("description", sql.NVarChar, payload.description ?? cur.description)
            .input("status", sql.NVarChar, payload.status ?? cur.status)
            .input("finishAt", sql.DateTime2, finishAt)
            .input("hour", sql.Decimal(8, 2), hour)
            .query(`UPDATE PunchTime SET stuffId=@stuffId, description=@description, status=@status, finishAt=@finishAt, hour=@hour WHERE id=@id`);
        if (payload.status === "Completed" && cur.status !== "Completed") {
            await tr.request().input("userId", sql.Int, cur.userSubmit).query(`UPDATE Users SET punchTimeId = NULL WHERE id = @userId`);
        }
        // JOIN info
        const info = await tr
            .request()
            .input("stuffId", sql.Int, payload.stuffId ?? cur.stuffId)
            .input("clientId", sql.Int, cur.clientId).query(`
                SELECT *,
                   (SELECT TOP 1 * FROM Employees WHERE id = @stuffId FOR JSON PATH, WITHOUT_ARRAY_WRAPPER) AS stuffInfo,
                   (SELECT TOP 1 * FROM Clients WHERE id = @clientId FOR JSON PATH, WITHOUT_ARRAY_WRAPPER) AS clientInfo
                    FROM (SELECT 1 AS dummy) AS t
            `);
        const dtoFull = {
            ...cur,
            ...payload,
            finishAt,
            hour,
            stuffInfo: JSON.parse(info.recordset[0].stuffInfo),
            clientInfo: JSON.parse(info.recordset[0].clientInfo),
        };
        await tr.commit();
        return dtoFull;
    } catch (e) {
        await tr.rollback();
        throw e;
    }
};
