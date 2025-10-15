import { useMutation } from "@tanstack/react-query";
import type { LoginDto } from "../../models/auth/AuthDto";
import type { CreateUserDto } from "../../models/auth/CreateUserDto";
import { queryClient } from "../queryClient";
import { authApi } from "./authApi";

export const useCreateUser = () =>
    useMutation({
        mutationFn: (dto: CreateUserDto) => {
            return authApi.register(dto);
        },
        onSettled: async () => {
            await queryClient.invalidateQueries({ queryKey: ["create-user"] });
        },
    });

export const useLogin = () =>
    useMutation({
        mutationFn: (dto: LoginDto) => {
            return authApi.login(dto);
        },
        onSettled: async () => {
            await queryClient.invalidateQueries({ queryKey: ["login"] });
        },
    });
export const useLogout = () =>
    useMutation({
        mutationFn: () => {
            return authApi.logout();
        },
        onSettled: async () => {
            await queryClient.invalidateQueries({ queryKey: ["logout"] });
        },
    });
