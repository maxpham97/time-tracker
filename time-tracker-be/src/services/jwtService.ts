import jwt, { SignOptions } from "jsonwebtoken";
import { JwtPayload } from "../types/jwt";

const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-jwt-key-change-in-production";
const JWT_EXPIRES_IN = (process.env.JWT_EXPIRES_IN || "24h") as SignOptions["expiresIn"];

export class JwtService {
    static generateToken(payload: Omit<JwtPayload, "iat" | "exp">): string {
        return jwt.sign(payload as object, JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN,
        });
    }

    static verifyToken(token: string): JwtPayload {
        try {
            return jwt.verify(token, JWT_SECRET) as JwtPayload;
        } catch (error) {
            throw new Error("Invalid or expired token");
        }
    }

    static extractTokenFromHeader(authHeader: string | undefined): string {
        if (!authHeader) {
            throw new Error("Authorization header is required");
        }

        if (!authHeader.startsWith("Bearer ")) {
            throw new Error("Invalid authorization header format");
        }

        return authHeader.substring(7);
    }
}
