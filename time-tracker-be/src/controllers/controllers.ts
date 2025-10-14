import type { Request, Response } from "express";
import { EmployeeModel } from "../models/employeeModel";

export const EmployeeController = {
    async getAll(req: Request, res: Response) {
        const employees = await EmployeeModel.getAll();
        res.json(employees);
    },

    async getById(req: Request, res: Response) {
        const id = Number(req.params.id);
        const employee = await EmployeeModel.getById(id);
        employee ? res.json(employee) : res.status(404).send("Not found");
    },

    async create(req: Request, res: Response) {
        console.log("req", req);
        await EmployeeModel.create(req.body);
        res.status(201).send("Employee created");
    },

    async update(req: Request, res: Response) {
        const id = Number(req.params.id);
        await EmployeeModel.update(id, req.body);
        res.send("Employee updated");
    },

    async delete(req: Request, res: Response) {
        const id = Number(req.params.id);
        await EmployeeModel.delete(id);
        res.send("Employee deleted");
    },
};
