export interface User {
    id?: number;
    userName: string;
    name: string;
    password?: string; // Не включаем в ответы API
    isAdmin: boolean;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface UserResponse {
    id: number;
    userName: string;
    name: string;
    isAdmin: boolean;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
