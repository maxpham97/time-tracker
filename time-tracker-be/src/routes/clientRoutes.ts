import { Router } from "express";
import { createClient, deleteClient, getActiveClients, getAllClients, getClientById, updateClient } from "../controllers/clientController";

const router = Router();

// Client CRUD routes
router.post("/clients", createClient);
router.get("/clients", getAllClients);
router.get("/clients/active", getActiveClients);
router.get("/clients/:id", getClientById);
router.put("/clients/:id", updateClient);
router.delete("/clients/:id", deleteClient);

export default router;
