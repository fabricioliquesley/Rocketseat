import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

export const AuthContext = createContext({})

function AuthProvider({ children }) {
    const [data, setData] = useState("");

    async function signIn({ email, password }) {
        try {
            const response = await api.post("/sessions", { email, password })

            const { user, token } = response.data;

            localStorage.setItem("@rocketmovies:user", JSON.stringify(user))
            localStorage.setItem("@rocketmovies:token", token)

            api.defaults.headers["Authorization"] = `Bearer ${token}`

            setData({ user, token })
        } catch (error) {
            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert("Não foi possível fazer login.");
            }
        }
    }

    function signOut(){
        localStorage.removeItem("@rocketmovies:user");
        localStorage.removeItem("@rocketmovies:token");

        setData({})
    }

    useEffect(() => {
        const user = localStorage.getItem("@rocketmovies:user");
        const token = localStorage.getItem("@rocketmovies:token");

        if(user && token) {
            api.defaults.headers["Authorization"] = `Bearer ${token}`;

            setData({
                user: JSON.parse(user),
                token
            });
        }
    }, [])

    return (
        <AuthContext.Provider
            value={{
                signIn,
                signOut,
                user: data.user
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    const context = useContext(AuthContext);

    return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuth };