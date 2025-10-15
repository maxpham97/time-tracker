export interface LocationResponseDto {
    id: number;
    name: string;
    address?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
