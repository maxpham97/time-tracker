import { poolPromise } from "../config/db";

const createTable = async () => {
    try {
        const pool = await poolPromise;
        await pool.request().query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Clients')
            BEGIN
                CREATE TABLE Clients (
                    id INT IDENTITY(1,1) PRIMARY KEY,
                    name NVARCHAR(255) NOT NULL,
                    mail NVARCHAR(255) NOT NULL,
                    phone NVARCHAR(50),
                    address NVARCHAR(500),
                    billingRate DECIMAL(18, 2),
                    isActive BIT NOT NULL DEFAULT 1,
                    createdAt DATETIME2 DEFAULT GETDATE(),
                    updatedAt DATETIME2 DEFAULT GETDATE()
                );
                
                -- Create indexes
                CREATE INDEX IX_Clients_Mail ON Clients(mail);
                CREATE INDEX IX_Clients_IsActive ON Clients(isActive);
                
                PRINT 'Clients table created successfully';
            END
            ELSE
            BEGIN
                PRINT 'Clients table already exists';
            END
        `);
        console.log("✅ Table creation script completed successfully");
    } catch (error) {
        console.error("❌ Error creating table:", error);
    }
};

createTable()
    .then(() => {
        console.log("🎉 Script finished");
        process.exit(0);
    })
    .catch((error) => {
        console.error("💥 Script failed:", error);
        process.exit(1);
    });
