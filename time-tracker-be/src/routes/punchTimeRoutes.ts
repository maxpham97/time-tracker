import { Router } from "express";
import { createPunchTime, getAllPunchTimes, getPunchTimeById, updatePunchTime } from "../controllers/punchTimeController";

const router = Router();

router.post("/punchtime", createPunchTime);
router.get("/punchtime", getAllPunchTimes);
router.get("/punchtime/:id", getPunchTimeById);
router.put("/punchtime/:id", updatePunchTime);

export default router;
