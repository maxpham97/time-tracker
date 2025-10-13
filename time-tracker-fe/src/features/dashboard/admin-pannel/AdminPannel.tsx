import * as Tabs from "@radix-ui/react-tabs";
import { Building2, CalendarDays, MapPin, Users } from "lucide-react";
import ClientsTab from "./ClientsTab";
import LocationTab from "./LocationTab";
import StaffTab from "./StaffTab";
import TodayTab from "./TodayTab";

const adminTabs = [
    { value: "entries", label: "Today's Entries", icon: CalendarDays },
    { value: "staff", label: "Staff Management", icon: Users },
    { value: "clients", label: "Client Management", icon: Building2 },
    { value: "locations", label: "Location Management", icon: MapPin },
];

const AdminPannel = () => {
    return (
        <div className="flex flex-col h-full">
            <Tabs.Root defaultValue="entries" className="flex flex-col h-full">
                {/* Tab buttons */}
                <Tabs.List className="flex space-x-4 border-b border-gray-200 mb-6">
                    {adminTabs.map(({ value, label, icon: Icon }) => (
                        <Tabs.Trigger
                            key={value}
                            value={value}
                            className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-t-lg transition-all
                                data-[state=active]:bg-gray-800 data-[state=active]:text-white
                                hover:bg-gray-100 text-gray-700">
                            <Icon className="w-4 h-4" />
                            {label}
                        </Tabs.Trigger>
                    ))}
                </Tabs.List>

                {/* Tab content */}
                <div className="flex-1 ">
                    <Tabs.Content value="entries">
                        <TodayTab />
                    </Tabs.Content>

                    <Tabs.Content value="staff">
                        <StaffTab />
                    </Tabs.Content>

                    <Tabs.Content value="clients">
                        <ClientsTab />
                    </Tabs.Content>

                    <Tabs.Content value="locations">
                        <LocationTab />
                    </Tabs.Content>
                </div>
            </Tabs.Root>
        </div>
    );
};

export default AdminPannel;
