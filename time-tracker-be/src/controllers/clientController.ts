import { Request, Response } from "express";
import * as clientService from "../services/clientService";

export const createClient = async (req: Request, res: Response) => {
    try {
        const client = await clientService.createClient(req.body);
        res.status(201).json(client);
    } catch (error) {
        console.error("Error creating client:", error);
        res.status(500).json({ error: "Failed to create client" });
    }
};

export const getAllClients = async (req: Request, res: Response) => {
    try {
        const clients = await clientService.getAllClients();
        res.status(200).json(clients);
    } catch (error) {
        console.error("Error fetching clients:", error);
        res.status(500).json({ error: "Failed to fetch clients" });
    }
};

export const getClientById = async (req: Request, res: Response) => {
    try {
        const client = await clientService.getClientById(Number(req.params.id));
        if (!client) {
            return res.status(404).json({ error: "Client not found" });
        }
        res.status(200).json(client);
    } catch (error) {
        console.error("Error fetching client:", error);
        res.status(500).json({ error: "Failed to fetch client" });
    }
};

export const updateClient = async (req: Request, res: Response) => {
    try {
        const client = await clientService.updateClient(Number(req.params.id), req.body);
        if (!client) {
            return res.status(404).json({ error: "Client not found" });
        }
        res.status(200).json(client);
    } catch (error) {
        console.error("Error updating client:", error);
        res.status(500).json({ error: "Failed to update client" });
    }
};

export const deleteClient = async (req: Request, res: Response) => {
    try {
        const success = await clientService.deleteClient(Number(req.params.id));
        if (!success) {
            return res.status(404).json({ error: "Client not found" });
        }
        res.status(200).json({ message: "Client deleted successfully" });
    } catch (error) {
        console.error("Error deleting client:", error);
        res.status(500).json({ error: "Failed to delete client" });
    }
};

export const getActiveClients = async (req: Request, res: Response) => {
    try {
        const clients = await clientService.getActiveClients();
        res.status(200).json(clients);
    } catch (error) {
        console.error("Error fetching active clients:", error);
        res.status(500).json({ error: "Failed to fetch active clients" });
    }
};
