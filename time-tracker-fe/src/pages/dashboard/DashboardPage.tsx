import * as Tabs from "@radix-ui/react-tabs";
import { BarChart3, Clock, LogOut, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTERS_PATHS } from "../../constants/router-paths";
import AdminPannel from "../../features/dashboard/admin-pannel/AdminPannel";
import PunchClock from "../../features/dashboard/punch-clock/PunchClock";
import Reports from "../../features/dashboard/reports/Reports";

const tabs = [
    { value: "punch", label: "Punch Clock", icon: Clock, Component: PunchClock },
    { value: "admin", label: "Admin Panel", icon: Shield, Component: AdminPannel },
    { value: "reports", label: "Reports", icon: BarChart3, Component: Reports },
];

export default function DashboardPage() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("auth");
        navigate(ROUTERS_PATHS.LOGIN);
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 text-gray-800">
            <div className="flex w-[90%] h-[85vh] backdrop-blur-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
                <Tabs.Root defaultValue="punch" className="flex w-full">
                    {/* Sidebar */}
                    <aside className="w-64 bg-gradient-to-b from-gray-100 to-gray-200 text-gray-800 flex flex-col justify-between py-6 px-4 border-r border-gray-200">
                        <div>
                            <h1 className="text-2xl font-bold mb-8 text-center text-gray-700">⏱ Time Tracker</h1>

                            <Tabs.List className="flex flex-col space-y-2">
                                {tabs.map((tab) => {
                                    const Icon = tab.icon;
                                    return (
                                        <Tabs.Trigger
                                            key={tab.value}
                                            value={tab.value}
                                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                                                hover:bg-gray-300/60 hover:translate-x-1 data-[state=active]:bg-gray-800 data-[state=active]:text-white">
                                            <Icon className="w-5 h-5" />
                                            {tab.label}
                                        </Tabs.Trigger>
                                    );
                                })}
                            </Tabs.List>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="flex items-center justify-center gap-2 px-4 py-3 mt-4 text-sm font-medium bg-gray-800 text-white rounded-xl hover:bg-gray-700 transition">
                            <LogOut className="w-5 h-5" />
                            Logout
                        </button>
                    </aside>

                    {/* Main content */}
                    <div className="flex-1 flex flex-col bg-gray-50">
                        <header className="flex justify-between items-center px-10 py-6 border-b border-gray-200 bg-white shadow-sm">
                            <h2 className="text-xl font-semibold text-gray-800">Welcome back 👋</h2>
                        </header>

                        <div className="flex-1 p-8 overflow-auto">
                            {tabs.map(({ value, Component }) => (
                                <Tabs.Content key={value} value={value} className="h-full w-full data-[state=inactive]:hidden animate-fadeIn">
                                    <div className="bg-white rounded-2xl shadow-md p-8 h-full border border-gray-100">
                                        <Component />
                                    </div>
                                </Tabs.Content>
                            ))}
                        </div>
                    </div>
                </Tabs.Root>
            </div>
        </div>
    );
}
