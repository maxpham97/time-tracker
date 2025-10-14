import { Router } from "express";
import { createEmployee, deleteEmployee, getAllEmployees, getEmployeeById, updateEmployee } from "../controllers/employeeController";

const router = Router();

router.post("/employees", createEmployee);
router.get("/employees", getAllEmployees);
router.get("/employees/:id", getEmployeeById);
router.put("/employees/:id", updateEmployee);
router.delete("/employees/:id", deleteEmployee);

export default router;
