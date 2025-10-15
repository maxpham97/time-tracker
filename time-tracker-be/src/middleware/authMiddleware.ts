import { NextFunction, Response } from 'express';
import { JwtService } from '../services/jwtService';
import { AuthenticatedRequest } from '../types/jwt';

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = JwtService.extractTokenFromHeader(authHeader);
        const decoded = JwtService.verifyToken(token);
        
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ 
            error: 'Unauthorized', 
            message: error instanceof Error ? error.message : 'Invalid token' 
        });
    }
};

export const requireAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    
    if (!req.user.isAdmin) {
        return res.status(403).json({ error: 'Forbidden', message: 'Admin access required' });
    }
    
    next();
};
