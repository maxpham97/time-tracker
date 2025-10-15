import { useQuery } from "@tanstack/react-query";
import { userApi } from "./userApi";

export const useGetUser = () =>
    useQuery({
        queryKey: ["get-user"],
        queryFn: userApi.getUser,
    });
