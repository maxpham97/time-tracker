import express from "express";
import employeeRoutes from "./routes/employeeRoutes";

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`, req.body);
    next();
});

app.use("/api", employeeRoutes);

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error("Global error:", err);
    res.status(500).json({ error: "Internal server error", details: err.message });
});

export default app;
