import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import type { UserResponseDto } from "../../models/user/UserResponseDto";
import { useAppSelector } from "../hook";
import type { RootState } from "../store";

const initialState = null;

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserData: (_, action) => {
            return action.payload;
        },
    },
});

const { setUserData } = userSlice.actions;

export const useGetUserData = () => useAppSelector((state: RootState) => state.user);

export const useSetUserData = () => {
    const dispatch = useDispatch();

    return {
        setUserData: (user: UserResponseDto) => {
            if (user) {
                dispatch(setUserData(user));
            }
        },
    };
};

export default userSlice;
