/**
 * DTO which is used to create employee.
 * @see Operator
 */
export interface CreateEmployeeDto {
    name: string;
    email: string;
    role: string;
    cost: number;
    isAdmin: boolean;
    isActive: boolean;
}
