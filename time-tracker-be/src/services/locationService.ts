import sql from "mssql";
import { poolPromise } from "../config/db";
import { LocationManagment } from "../types/location";

export const createLocation = async (client: LocationManagment): Promise<LocationManagment> => {
    const pool = await poolPromise;
    const result = await pool
        .request()
        .input("name", sql.NVarChar, client.name)
        .input("address", sql.NVarChar, client.address)
        .input("isActive", sql.Bit, client.isActive).query(`
            INSERT INTO LocationsManagment (name, address, isActive)
            OUTPUT INSERTED.*
            VALUES (@name, @address, @isActive)
        `);
    return result.recordset[0];
};

export const getAllLocation = async (): Promise<LocationManagment[]> => {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM LocationsManagment ORDER BY createdAt DESC");
    return result.recordset;
};

export const updateLocation = async (id: number, client: LocationManagment): Promise<LocationManagment | null> => {
    const pool = await poolPromise;
    const result = await pool
        .request()
        .input("id", sql.Int, id)
        .input("name", sql.NVarChar, client.name)
        .input("address", sql.NVarChar, client.address)
        .input("isActive", sql.Bit, client.isActive).query(`
            UPDATE LocationsManagment
            SET name = @name, address = @address, isActive = @isActive,
                updatedAt = GETDATE()
            OUTPUT INSERTED.*
            WHERE id = @id
        `);
    return result.recordset[0] || null;
};

export const getActiveLocations = async (): Promise<LocationManagment[]> => {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM LocationsManagment WHERE isActive = 1 ORDER BY name");
    return result.recordset;
};
