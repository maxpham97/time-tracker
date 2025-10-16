import type { CreateLocationDto } from "../../models/locations/CreateLocationDto";
import type { LocationResponseDto } from "../../models/locations/Locations";
import { apiRoutes } from "../ApiRoutes";
import { baseApi } from "../BaseApi";

class LocationApi {
    getLocations = async (): Promise<LocationResponseDto[]> => {
        try {
            const result = await baseApi.get(apiRoutes.locations);

            return result.data;
        } catch (error) {
            throw new Error(`Failed to get locations: ${error}`);
        }
    };

    create = async (dto: CreateLocationDto): Promise<unknown> => {
        try {
            const result = await baseApi.post(apiRoutes.locations, dto);
            return result.data;
        } catch (error) {
            throw new Error(`Failed to create location: ${error}`);
        }
    };

    editLocation = async (id: number, dto: Partial<CreateLocationDto>): Promise<unknown> => {
        try {
            const result = await baseApi.put(`${apiRoutes.locations}/${id}`, dto);
            return result.data;
        } catch (error) {
            throw new Error(`Failed to edit location: ${error}`);
        }
    };
}

export const locationApi = new LocationApi();
