import express from "express";
import { EmployeeController } from "../controllers/controllers";

const router = express.Router();

router.get("/", EmployeeController.getAll);
router.get("/:id", EmployeeController.getById);
router.post("/", EmployeeController.create);
router.put("/:id", EmployeeController.update);
router.delete("/:id", EmployeeController.delete);

export default router;
