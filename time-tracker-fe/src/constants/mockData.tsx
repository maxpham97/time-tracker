import { type ColumnDef } from "@tanstack/react-table";

type Staff = {
    staff: string;
    client: string;
    location: string;
    startTime: string;
    endTime: string;
    hours: number;
    description: string;
    status: "Completed" | "Pending" | "In Progress";
    action?: string;
};

export const columns: ColumnDef<Staff>[] = [
    { header: "Staff", accessorKey: "staff" },
    { header: "Client", accessorKey: "client" },
    { header: "Location", accessorKey: "location" },
    { header: "Start Time", accessorKey: "startTime" },
    { header: "End Time", accessorKey: "endTime" },
    { header: "Hours", accessorKey: "hours" },
    { header: "Description", accessorKey: "description" },
    { header: "Status", accessorKey: "status" },
    { header: "Action", accessorKey: "action" },
];

export const data: Staff[] = [
    {
        staff: "John Doe",
        client: "Acme Corp",
        location: "New York",
        startTime: "09:00 AM",
        endTime: "05:30 PM",
        hours: 8.5,
        description: "Project planning meeting",
        status: "Completed",
        action: "View",
    },
    {
        staff: "Alice Smith",
        client: "Techify Ltd",
        location: "San Francisco",
        startTime: "10:00 AM",
        endTime: "06:00 PM",
        hours: 8,
        description: "Client onboarding session",
        status: "Pending",
        action: "Edit",
    },
    {
        staff: "Robert King",
        client: "Nova Group",
        location: "London",
        startTime: "08:30 AM",
        endTime: "04:30 PM",
        hours: 8,
        description: "System maintenance",
        status: "In Progress",
        action: "Track",
    },
];
