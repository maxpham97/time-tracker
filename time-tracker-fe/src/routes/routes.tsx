/* eslint-disable @typescript-eslint/no-explicit-any */
// routes/routes.tsx
import React, { Fragment, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { ROUTERS_PATHS } from "../constants/router-paths";
import AuthGuard from "./AuthGuard";

const DashboardPage = lazy(() => import("../pages/dashboard/DashboardPage"));
const LoginPage = lazy(() => import("../pages/login/LoginPage"));

interface IRoutesState {
    guard?: React.FC<any>;
    path: string;
    component: React.ReactNode;
}

const routes: IRoutesState[] = [
    { component: <LoginPage />, path: ROUTERS_PATHS.LOGIN, guard: AuthGuard },
    { component: <DashboardPage />, path: ROUTERS_PATHS.DASHBOARD, guard: AuthGuard },
];

export const renderRoutes = () => (
    <Suspense fallback={<div>Loader...</div>}>
        <Routes>
            {routes.map((route, index) => {
                const Guard = route.guard || Fragment;
                return <Route key={index} path={route.path} element={<Guard>{route.component}</Guard>} />;
            })}
        </Routes>
    </Suspense>
);
