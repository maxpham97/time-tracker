import { useMutation, useQuery } from "@tanstack/react-query";
import type { CreateClientDto } from "../../models/client/CreateClientDto";
import { queryClient } from "../queryClient";
import { clientApi } from "./clientApi";

export const useCreateClients = () =>
    useMutation({
        mutationFn: (dto: CreateClientDto) => {
            return clientApi.create(dto);
        },
        onSettled: async () => {
            await queryClient.invalidateQueries({ queryKey: ["create-client"] });
        },
    });

export const useGetClients = () =>
    useQuery({
        queryKey: ["all-client"],
        queryFn: clientApi.getClient,
    });
export const useEditClients = () =>
    useMutation({
        mutationFn: ({ id, dto }: { id: number; dto: Partial<CreateClientDto> }) => {
            return clientApi.editClient(id, dto);
        },
        onSettled: async () => {
            await queryClient.invalidateQueries({ queryKey: ["edit-client"] });
        },
    });
