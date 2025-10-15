import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTERS_PATHS } from "../constants/router-paths";

interface IAuthGuard {
    children: React.ReactNode;
}

const AuthGuard = ({ children }: IAuthGuard) => {
    const navigate = useNavigate();
    const isAuthenticated = localStorage.getItem("token") === null;

    useEffect(() => {
        if (isAuthenticated) {
            navigate(ROUTERS_PATHS.LOGIN);
        } else {
            navigate(ROUTERS_PATHS.DASHBOARD);
        }
    }, []);

    return <> {children}</>;
};

export default AuthGuard;
