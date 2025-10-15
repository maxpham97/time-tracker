import { Request, Response } from "express";
import { CreateUserDto } from "../models/CreateUserDto";
import { LoginDto } from "../models/LoginDto";
import * as authService from "../services/authService";

export const login = async (req: Request, res: Response) => {
    try {
        const loginData: LoginDto = req.body;

        if (!loginData.userName || !loginData.password) {
            return res.status(400).json({
                error: "Bad Request",
                message: "userName and password are required",
            });
        }

        const result = await authService.login(loginData);
        res.status(200).json(result);
    } catch (error) {
        console.error("Login error:", error);
        res.status(401).json({
            error: "Unauthorized",
            message: error instanceof Error ? error.message : "Login failed",
        });
    }
};

export const register = async (req: Request, res: Response) => {
    try {
        const userData: CreateUserDto = req.body;

        if (!userData.userName || !userData.name || !userData.password) {
            return res.status(400).json({
                error: "Bad Request",
                message: "userName, name and password are required",
            });
        }

        if (userData.password.length < 6) {
            return res.status(400).json({
                error: "Bad Request",
                message: "Password must be at least 6 characters long",
            });
        }

        const result = await authService.register(userData);
        res.status(201).json(result);
    } catch (error) {
        console.error("Registration error:", error);
        res.status(400).json({
            error: "Bad Request",
            message: error instanceof Error ? error.message : "Registration failed",
        });
    }
};

export const logout = async (req: Request, res: Response) => {
    try {
        const result = await authService.logout();
        res.status(200).json(result);
    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({
            error: "Internal Server Error",
            message: "Logout failed",
        });
    }
};
