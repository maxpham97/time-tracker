import bcrypt from "bcryptjs";
import sql from "mssql";
import { poolPromise } from "../config/db";
import { CreateUserDto } from "../models/CreateUserDto";
import { User, UserResponse } from "../types/user";

export const createUser = async (userData: CreateUserDto): Promise<UserResponse> => {
    const pool = await poolPromise;

    const existingUser = await pool
        .request()
        .input("userName", sql.NVarChar, userData.userName)
        .query("SELECT id FROM Users WHERE userName = @userName");

    if (existingUser.recordset.length > 0) {
        throw new Error("User with this userName already exists");
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

    const result = await pool
        .request()
        .input("userName", sql.NVarChar, userData.userName)
        .input("name", sql.NVarChar, userData.name)
        .input("password", sql.NVarChar, hashedPassword)
        .input("isAdmin", sql.Bit, userData.isAdmin)
        .input("isActive", sql.Bit, true).query(`
            INSERT INTO Users (userName, name, password, isAdmin, isActive)
            OUTPUT INSERTED.id, INSERTED.userName, INSERTED.name, INSERTED.isAdmin, INSERTED.isActive, INSERTED.createdAt, INSERTED.updatedAt
            VALUES (@userName, @name, @password, @isAdmin, @isActive)
        `);

    return result.recordset[0];
};

export const getUserByUserName = async (userName: string): Promise<User | null> => {
    const pool = await poolPromise;
    const result = await pool
        .request()
        .input("userName", sql.NVarChar, userName)
        .query("SELECT * FROM Users WHERE userName = @userName AND isActive = 1");

    return result.recordset[0] || null;
};

export const getUserById = async (id: number): Promise<UserResponse | null> => {
    const pool = await poolPromise;
    const result = await pool
        .request()
        .input("id", sql.Int, id)
        .query("SELECT id, userName, name, isAdmin, isActive, createdAt, updatedAt FROM Users WHERE id = @id AND isActive = 1");

    return result.recordset[0] || null;
};

export const updateUserLastLogin = async (id: number): Promise<void> => {
    const pool = await poolPromise;
    await pool.request().input("id", sql.Int, id).query("UPDATE Users SET updatedAt = GETDATE() WHERE id = @id");
};

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    return bcrypt.compare(password, hashedPassword);
};
