import { useMutation, useQuery } from "@tanstack/react-query";
import type { CreateLocationDto } from "../../models/locations/CreateLocationDto";
import { queryClient } from "../queryClient";
import { locationApi } from "./locationApi";

export const useCreateLocation = () =>
    useMutation({
        mutationFn: (dto: CreateLocationDto) => {
            return locationApi.create(dto);
        },
        onSettled: async () => {
            await queryClient.invalidateQueries({ queryKey: ["create-location"] });
        },
    });

export const useGetLocations = () =>
    useQuery({
        queryKey: ["all-locations"],
        queryFn: locationApi.getLocations,
    });
export const useEditLocations = () =>
    useMutation({
        mutationFn: ({ id, dto }: { id: number; dto: Partial<CreateLocationDto> }) => {
            return locationApi.editLocation(id, dto);
        },
        onSettled: async () => {
            await queryClient.invalidateQueries({ queryKey: ["edit-location"] });
        },
    });
