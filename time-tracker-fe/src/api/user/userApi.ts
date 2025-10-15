import type { UserResponseDto } from "../../models/user/UserResponseDto";
import { apiRoutes } from "../ApiRoutes";
import { baseApi } from "../BaseApi";

class UserApi {
    getUser = async (): Promise<{ user: UserResponseDto }> => {
        try {
            const result = await baseApi.get(apiRoutes.getUser);
            return result.data;
        } catch (error) {
            throw new Error(`Failed to create user: ${error}`);
        }
    };
}

export const userApi = new UserApi();
