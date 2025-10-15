import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./root-reducer";

export const store = configureStore({
    reducer: rootReducer,
});

//EXPORT TYPE FOR GLOBAL STORE
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
