export interface CreatePunchTimeDto {
    userSubmit: number;
    stuffId: number;
    clientId: number;
    locationId: number;
    startedUp: Date;
    description?: string;
    status: "Active" | "Completed";
}
