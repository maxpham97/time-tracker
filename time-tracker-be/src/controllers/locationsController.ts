import { Request, Response } from "express";
import * as locationService from "../services/locationService";

export const createLocation = async (req: Request, res: Response) => {
    try {
        const location = await locationService.createLocation(req.body);
        res.status(201).json(location);
    } catch (error) {
        console.error("Error creating location:", error);
        res.status(500).json({ error: "Failed to create location" });
    }
};

export const getAllLocations = async (req: Request, res: Response) => {
    try {
        const locations = await locationService.getAllLocation();
        res.status(200).json(locations);
    } catch (error) {
        console.error("Error fetching locations:", error);
        res.status(500).json({ error: "Failed to fetch locations" });
    }
};

export const updateLocation = async (req: Request, res: Response) => {
    try {
        const location = await locationService.updateLocation(Number(req.params.id), req.body);
        if (!location) {
            return res.status(404).json({ error: "Location not found" });
        }
        res.status(200).json(location);
    } catch (error) {
        console.error("Error updating location:", error);
        res.status(500).json({ error: "Failed to update location" });
    }
};

export const getActiveLocations = async (req: Request, res: Response) => {
    try {
        const locations = await locationService.getActiveLocations();
        res.status(200).json(locations);
    } catch (error) {
        console.error("Error fetching active locations:", error);
        res.status(500).json({ error: "Failed to fetch active locations" });
    }
};
