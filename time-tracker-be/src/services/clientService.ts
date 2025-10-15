import sql from "mssql";
import { poolPromise } from "../config/db";
import { Client } from "../types/client";

export const createClient = async (client: Client): Promise<Client> => {
    const pool = await poolPromise;
    const result = await pool
        .request()
        .input("name", sql.NVarChar, client.name)
        .input("mail", sql.NVarChar, client.mail)
        .input("phone", sql.NVarChar, client.phone)
        .input("address", sql.NVarChar, client.address)
        .input("billingRate", sql.Decimal(18, 2), client.billingRate)
        .input("isActive", sql.Bit, client.isActive).query(`
            INSERT INTO Clients (name, mail, phone, address, billingRate, isActive)
            OUTPUT INSERTED.*
            VALUES (@name, @mail, @phone, @address, @billingRate, @isActive)
        `);
    return result.recordset[0];
};

export const getAllClients = async (): Promise<Client[]> => {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM Clients ORDER BY createdAt DESC");
    return result.recordset;
};

export const getClientById = async (id: number): Promise<Client | null> => {
    const pool = await poolPromise;
    const result = await pool.request().input("id", sql.Int, id).query("SELECT * FROM Clients WHERE id = @id");
    return result.recordset[0] || null;
};

export const updateClient = async (id: number, client: Client): Promise<Client | null> => {
    const pool = await poolPromise;
    const result = await pool
        .request()
        .input("id", sql.Int, id)
        .input("name", sql.NVarChar, client.name)
        .input("mail", sql.NVarChar, client.mail)
        .input("phone", sql.NVarChar, client.phone)
        .input("address", sql.NVarChar, client.address)
        .input("billingRate", sql.Decimal(18, 2), client.billingRate)
        .input("isActive", sql.Bit, client.isActive).query(`
            UPDATE Clients
            SET name = @name, mail = @mail, phone = @phone, 
                address = @address, billingRate = @billingRate, isActive = @isActive,
                updatedAt = GETDATE()
            OUTPUT INSERTED.*
            WHERE id = @id
        `);
    return result.recordset[0] || null;
};

export const deleteClient = async (id: number): Promise<boolean> => {
    const pool = await poolPromise;
    const result = await pool.request().input("id", sql.Int, id).query("DELETE FROM Clients WHERE id = @id");
    return result.rowsAffected[0] > 0;
};

export const getActiveClients = async (): Promise<Client[]> => {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM Clients WHERE isActive = 1 ORDER BY name");
    return result.recordset;
};
