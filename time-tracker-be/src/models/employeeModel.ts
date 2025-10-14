import { poolPromise } from "../config/db";
import type { Employee } from "../types/employee";

export const EmployeeModel = {
    async getAll(): Promise<Employee[]> {
        const pool = await poolPromise;
        const result = await pool.request().query("SELECT * FROM Employees");
        return result.recordset;
    },

    async getById(id: number): Promise<Employee | null> {
        const pool = await poolPromise;
        const result = await pool.request().input("id", id).query("SELECT * FROM Employees WHERE id = @id");
        return result.recordset[0] || null;
    },

    async create(employee: Employee): Promise<void> {
        const pool = await poolPromise;
        await pool
            .request()
            .input("name", employee.name)
            .input("email", employee.email)
            .input("role", employee.role)
            .input("cost", employee.cost)
            .input("isAdmin", employee.isAdmin)
            .input("isActive", employee.isActive).query(`
        INSERT INTO Employees (name, email, role, cost, isAdmin, isActive)
        VALUES (@name, @email, @role, @cost, @isAdmin, @isActive)
      `);
    },

    async update(id: number, employee: Employee): Promise<void> {
        const pool = await poolPromise;
        await pool
            .request()
            .input("id", id)
            .input("name", employee.name)
            .input("email", employee.email)
            .input("role", employee.role)
            .input("cost", employee.cost)
            .input("isAdmin", employee.isAdmin)
            .input("isActive", employee.isActive).query(`
        UPDATE Employees
        SET name=@name, email=@email, role=@role, cost=@cost, isAdmin=@isAdmin, isActive=@isActive
        WHERE id=@id
      `);
    },

    async delete(id: number): Promise<void> {
        const pool = await poolPromise;
        await pool.request().input("id", id).query("DELETE FROM Employees WHERE id=@id");
    },
};
