import sql from "mssql";
import { poolPromise } from "../config/db";
import { Employee } from "../types/employee";

export const createEmployee = async (employee: Employee): Promise<Employee> => {
    const pool = await poolPromise;
    const result = await pool
        .request()
        .input("name", sql.NVarChar, employee.name)
        .input("email", sql.NVarChar, employee.email)
        .input("role", sql.NVarChar, employee.role)
        .input("cost", sql.Decimal(18, 2), employee.cost)
        .input("isAdmin", sql.Bit, employee.isAdmin)
        .input("isActive", sql.Bit, employee.isActive).query(`
            INSERT INTO Employees (name, email, role, cost, isAdmin, isActive)
            OUTPUT INSERTED.*
            VALUES (@name, @email, @role, @cost, @isAdmin, @isActive)
        `);
    return result.recordset[0];
};

export const getAllEmployees = async (): Promise<Employee[]> => {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM Employees");
    return result.recordset;
};

export const getEmployeeById = async (id: number): Promise<Employee | null> => {
    const pool = await poolPromise;
    const result = await pool.request().input("id", sql.Int, id).query("SELECT * FROM Employees WHERE id = @id");
    return result.recordset[0] || null;
};

export const updateEmployee = async (id: number, employee: Employee): Promise<Employee | null> => {
    const pool = await poolPromise;
    const result = await pool
        .request()
        .input("id", sql.Int, id)
        .input("name", sql.NVarChar, employee.name)
        .input("email", sql.NVarChar, employee.email)
        .input("role", sql.NVarChar, employee.role)
        .input("cost", sql.Decimal(18, 2), employee.cost)
        .input("isAdmin", sql.Bit, employee.isAdmin)
        .input("isActive", sql.Bit, employee.isActive).query(`
            UPDATE Employees
            SET name = @name, email = @email, role = @role, 
                cost = @cost, isAdmin = @isAdmin, isActive = @isActive
            OUTPUT INSERTED.*
            WHERE id = @id
        `);
    return result.recordset[0] || null;
};

export const deleteEmployee = async (id: number): Promise<boolean> => {
    const pool = await poolPromise;
    const result = await pool.request().input("id", sql.Int, id).query("DELETE FROM Employees WHERE id = @id");
    return result.rowsAffected[0] > 0;
};
