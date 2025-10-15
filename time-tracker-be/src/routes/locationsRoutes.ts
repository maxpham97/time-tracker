import { Router } from "express";
import { createLocation, getActiveLocations, getAllLocations, updateLocation } from "../controllers/locationsController";

const router = Router();

// Client CRUD routes
router.post("/locations", createLocation);
router.get("/locations", getAllLocations);
router.get("/locations/active", getActiveLocations);
router.put("/locations/:id", updateLocation);

export default router;
