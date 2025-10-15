import { Request } from 'express';

export interface JwtPayload {
    userId: number;
    userName: string;
    isAdmin: boolean;
    iat?: number;
    exp?: number;
}

export interface AuthenticatedRequest extends Request {
    user?: JwtPayload;
}
