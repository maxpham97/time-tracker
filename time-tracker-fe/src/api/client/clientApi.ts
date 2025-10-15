import type { ClientResponseDto } from "../../models/client/Client";
import type { CreateClientDto } from "../../models/client/CreateClientDto";
import { apiRoutes } from "../ApiRoutes";
import { baseApi } from "../BaseApi";

class ClientApi {
    getClient = async (): Promise<ClientResponseDto[]> => {
        try {
            const result = await baseApi.get(apiRoutes.clients);

            return result.data;
        } catch (error) {
            throw new Error(`Failed to get clients: ${error}`);
        }
    };

    create = async (dto: CreateClientDto): Promise<unknown> => {
        try {
            const result = await baseApi.post(apiRoutes.clients, dto);
            return result.data;
        } catch (error) {
            throw new Error(`Failed to create client: ${error}`);
        }
    };

    editClient = async (id: number, dto: Partial<CreateClientDto>): Promise<unknown> => {
        try {
            const result = await baseApi.put(`${apiRoutes.clients}/${id}`, dto);
            return result.data;
        } catch (error) {
            throw new Error(`Failed to edit client: ${error}`);
        }
    };
}

export const clientApi = new ClientApi();
