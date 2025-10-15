export interface ClientResponseDto {
    id: number;
    name: string;
    mail: string;
    phone?: string;
    address?: string;
    billingRate?: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
