import type { CreateEmployeeDto } from "../../models/employee/CreateEmployeeDto";
import { apiRoutes } from "../ApiRoutes";
import { baseApi } from "../BaseApi";

class EmployeeApi {
    getEmployee = async (): Promise<unknown> => {
        try {
            const result = await baseApi.get(apiRoutes.employee);

            return result.data;
        } catch (error) {
            throw new Error(`Failed to get employee: ${error}`);
        }
    };

    create = async (dto: CreateEmployeeDto): Promise<unknown> => {
        try {
            const result = await baseApi.post(apiRoutes.employee, dto);
            return result.data;
        } catch (error) {
            throw new Error(`Failed to create employee: ${error}`);
        }
    };

    editEmployee = async (id: number, dto: Partial<CreateEmployeeDto>): Promise<unknown> => {
        try {
            const result = await baseApi.put(`${apiRoutes.employee}/${id}`, dto);
            return result.data;
        } catch (error) {
            throw new Error(`Failed to edit employee: ${error}`);
        }
    };
}

export const employeeApi = new EmployeeApi();
