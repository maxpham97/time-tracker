export interface CreateClientDto {
    name: string;
    mail: string;
    phone?: string;
    address?: string;
    billingRate?: number;
    isActive?: boolean;
}
