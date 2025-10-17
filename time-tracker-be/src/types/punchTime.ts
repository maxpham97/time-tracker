export interface PunchTime {
    id?: number;
    userSubmit: number;
    stuffId: number;
    clientId: number;
    locationId: number;
    startedUp: Date;
    finishAt?: Date | null;
    description?: string;
    status: "Active" | "Completed";
    hour?: number | null;
}

export interface PunchTimePopulated extends PunchTime {
    stuffInfo: import("./employee").Employee;
    clientInfo: import("./client").Client;
}
