import { Routes, Route, Navigate } from "react-router-dom";

import { SignIn } from "../pages/Singin";
import { SignUp } from "../pages/Signup";

export function AuthRoutes() {
    const user = localStorage.getItem("@rocketmovies:user");

    return (
        <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
            {!user && <Route path="*" element={<Navigate to="/" />} />}
        </Routes>
    );
}