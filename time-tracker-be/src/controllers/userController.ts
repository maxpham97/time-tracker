import { Response } from "express";
import * as userService from "../services/userService";
import { AuthenticatedRequest } from "../types/jwt";

export const getProfile = async (req: AuthenticatedRequest, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const user = await userService.getUserById(req.user.userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ user });
    } catch (error) {
        console.error("Get profile error:", error);
        res.status(500).json({
            error: "Internal Server Error",
            message: "Failed to fetch user profile",
        });
    }
};
