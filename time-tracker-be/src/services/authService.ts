import { CreateUserDto } from "../models/CreateUserDto";
import { LoginDto } from "../models/LoginDto";
import { LoginResponse, RegisterResponse } from "../types/auth";
import { UserResponse } from "../types/user";
import { JwtService } from "./jwtService";
import * as userService from "./userService";

export const login = async (loginData: LoginDto): Promise<LoginResponse> => {
    const user = await userService.getUserByUserName(loginData.userName);

    if (!user) {
        throw new Error("Invalid credentials");
    }

    if (!user.password) {
        throw new Error("Invalid user data");
    }

    const isPasswordValid = await userService.comparePassword(loginData.password, user.password);

    if (!isPasswordValid) {
        throw new Error("Invalid credentials");
    }

    if (user.id) {
        await userService.updateUserLastLogin(user.id);
    }

    const token = JwtService.generateToken({
        userId: user.id!,
        userName: user.userName,
        isAdmin: user.isAdmin,
    });

    const userResponse: UserResponse = {
        id: user.id!,
        userName: user.userName,
        name: user.name,
        isAdmin: user.isAdmin,
        isActive: user.isActive,
        punchTimeId: user.punchTimeId || null,
        createdAt: user.createdAt!,
        updatedAt: user.updatedAt!,
    };

    return {
        token,
        user: userResponse,
    };
};

export const register = async (userData: CreateUserDto): Promise<RegisterResponse> => {
    const user = await userService.createUser(userData);

    return {
        user,
    };
};

export const logout = async (): Promise<{ message: string }> => {
    return {
        message: "Logged out successfully",
    };
};
