import cors from "cors";
import express from "express";
import employeeRoutes from "../src/routes/employeeRoutes";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/employees", employeeRoutes);

export default app;
