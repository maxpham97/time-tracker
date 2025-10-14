import { Request, Response } from "express";
import * as employeeService from "../services/employeeService";

export const createEmployee = async (req: Request, res: Response) => {
    try {
        const employee = await employeeService.createEmployee(req.body);
        res.status(201).json(employee);
    } catch (error) {
        res.status(500).json({ error: "Failed to create employee" });
    }
};

export const getAllEmployees = async (req: Request, res: Response) => {
    try {
        const employees = await employeeService.getAllEmployees();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch employees" });
    }
};

export const getEmployeeById = async (req: Request, res: Response) => {
    try {
        const employee = await employeeService.getEmployeeById(Number(req.params.id));
        if (!employee) {
            return res.status(404).json({ error: "Employee not found" });
        }
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch employee" });
    }
};

export const updateEmployee = async (req: Request, res: Response) => {
    try {
        const employee = await employeeService.updateEmployee(Number(req.params.id), req.body);
        if (!employee) {
            return res.status(404).json({ error: "Employee not found" });
        }
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ error: "Failed to update employee" });
    }
};

export const deleteEmployee = async (req: Request, res: Response) => {
    try {
        const success = await employeeService.deleteEmployee(Number(req.params.id));
        if (!success) {
            return res.status(404).json({ error: "Employee not found" });
        }
        res.status(200).json({ message: "Employee deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete employee" });
    }
};
