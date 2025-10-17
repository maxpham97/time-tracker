import { Client } from "../types/client";
import { Employee } from "../types/employee";

export interface PunchTimeResponseDto {
    id: number;
    userSubmit: number;
    stuffId: number;
    clientId: number;
    locationId: number;
    startedUp: Date;
    finishAt?: Date | null;
    description?: string;
    status: "Active" | "Completed";
    hour?: number | null;
    stuffInfo: Employee;
    clientInfo: Client;
}
