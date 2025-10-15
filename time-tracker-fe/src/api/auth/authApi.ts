import type { LoginDto } from "../../models/auth/AuthDto";
import type { CreateUserDto } from "../../models/auth/CreateUserDto";
import type { UserResponseDto } from "../../models/user/UserResponseDto";
import { apiRoutes } from "../ApiRoutes";
import { baseApi } from "../BaseApi";

class AuthApi {
    register = async (dto: CreateUserDto): Promise<unknown> => {
        try {
            const result = await baseApi.post(apiRoutes.createUser, dto);
            return result.data;
        } catch (error) {
            throw new Error(`Failed to create user: ${error}`);
        }
    };

    login = async (dto: LoginDto): Promise<{ token: string; user: UserResponseDto }> => {
        try {
            const result = await baseApi.post(apiRoutes.login, dto);
            return result.data;
        } catch (error) {
            throw new Error(`Failed to login: ${error}`);
        }
    };

    logout = async (): Promise<unknown> => {
        try {
            const result = await baseApi.post(apiRoutes.logout);
            return result.data;
        } catch (error) {
            throw new Error(`Failed to logout: ${error}`);
        }
    };
}

export const authApi = new AuthApi();
