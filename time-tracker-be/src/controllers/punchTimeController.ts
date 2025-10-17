import { Request, Response } from "express";
import { CreatePunchTimeDto } from "../models/CreatePunchTimeDto";
import * as punchTimeService from "../services/punchTimeService";

export const createPunchTime = async (req: Request, res: Response) => {
    try {
        const punchTime = await punchTimeService.createPunchTime(req.body as CreatePunchTimeDto);
        res.status(201).json(punchTime);
    } catch (err) {
        res.status(500).json({ error: "Failed to create punchTime", details: String(err) });
    }
};

export const getAllPunchTimes = async (_req: Request, res: Response) => {
    try {
        const punchTimes = await punchTimeService.getAllPunchTimes();
        res.status(200).json(punchTimes);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch punchTimes", details: String(err) });
    }
};

export const getPunchTimeById = async (req: Request, res: Response) => {
    try {
        const punchTime = await punchTimeService.getPunchTimeById(Number(req.params.id));
        if (!punchTime) return res.status(404).json({ error: "PunchTime not found" });
        res.status(200).json(punchTime);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch punchTime", details: String(err) });
    }
};

export const updatePunchTime = async (req: Request, res: Response) => {
    try {
        const punchTime = await punchTimeService.updatePunchTime(Number(req.params.id), req.body);
        if (!punchTime) return res.status(404).json({ error: "PunchTime not found" });
        res.status(200).json(punchTime);
    } catch (err) {
        res.status(500).json({ error: "Failed to update punchTime", details: String(err) });
    }
};
