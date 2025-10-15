import { UserResponse } from './user';

export interface LoginRequest {
    userName: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    user: UserResponse;
}

export interface RegisterRequest {
    userName: string;
    name: string;
    isAdmin: boolean;
    password: string;
}

export interface RegisterResponse {
    user: UserResponse;
}

export interface LogoutResponse {
    message: string;
}
