import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { routesPath } from "../components/pages/routesPath";


export const UserContext = createContext(null);

const getUserFromLS = () => {
    try {
        return JSON.parse(localStorage.getItem("user"));
    } catch (error) {
        return null;
    }
};

export const UserProvider = ({children}) => {
    let navigate = useNavigate();

    const [user, setUser] = useState(getUserFromLS);

    const isLoginUser = (newUser) => {
        setUser(newUser);
        navigate(routesPath.MAIN);
    };

    const logoutUser = () => {
        setUser(null);
        navigate(routesPath.LOGIN);
    };

    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
    }, [user]);

    return (
        <UserContext.Provider value={{ user, isLoginUser, logoutUser }}>
            {children}
        </UserContext.Provider>
    )
}