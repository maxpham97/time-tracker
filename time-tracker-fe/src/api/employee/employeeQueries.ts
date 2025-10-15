import { useMutation, useQuery } from "@tanstack/react-query";
import type { CreateEmployeeDto } from "../../models/employee/CreateEmployeeDto";
import { queryClient } from "../queryClient";
import { employeeApi } from "./employeeApi";

export const useCreateEmployee = () =>
    useMutation({
        mutationFn: (dto: CreateEmployeeDto) => {
            return employeeApi.create(dto);
        },
        onSettled: async () => {
            await queryClient.invalidateQueries({ queryKey: ["create-employee"] });
        },
    });

export const useGetEmployees = () =>
    useQuery({
        queryKey: ["all-employee"],
        queryFn: employeeApi.getEmployee,
    });
export const useEditEmployee = () =>
    useMutation({
        mutationFn: ({ id, dto }: { id: number; dto: Partial<CreateEmployeeDto> }) => {
            return employeeApi.editEmployee(id, dto);
        },
        onSettled: async () => {
            await queryClient.invalidateQueries({ queryKey: ["edit-employee"] });
        },
    });
