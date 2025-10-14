import dotenv from "dotenv";
import sql from "mssql";
dotenv.config();

const config = {
    user: "sa",
    password: "YourStrong@Passw0rd",
    server: "localhost",
    database: "master",
    port: 1433,
    options: {
        encrypt: false,
        trustServerCertificate: true,
    },
};

export const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then((pool) => {
        console.log("✅ MSSQL connected");
        return pool;
    })
    .catch((err) => {
        console.error("❌ Database connection failed", err);
        throw err;
    });
