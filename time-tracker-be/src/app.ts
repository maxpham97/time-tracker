import cors from "cors";
import express from "express";
import authRoutes from "./routes/authRoutes";
import clientRoutes from "./routes/clientRoutes";
import employeeRoutes from "./routes/employeeRoutes";
import locationRoutes from "./routes/locationsRoutes";
import userRoutes from "./routes/userRoutes";

const app = express();

app.use(express.json());

app.use(cors());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`, req.body);
    next();
});

app.use("/api", employeeRoutes);
app.use("/api", clientRoutes);
app.use("/api", locationRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error("Global error:", err);
    res.status(500).json({ error: "Internal server error", details: err.message });
});

export default app;
