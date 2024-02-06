import {createContext, useContext, useState, ReactNode, useEffect} from "react";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";

interface IUserContext {
    user: {
        id: string;
        email: string;
        firstname: string;
        lastname: string;
        phone: string;
        role: string;
    } | undefined;
    setUserData: (data: { id: string; email: string; firstname: string; lastname: string; phone: string; role: string; } | undefined) => void;
}

function checkForValidCookie() {
    const cookie = Cookies.get('token');
    if (cookie) {
        try {
            const user = jwtDecode(cookie);
            return user;
        } catch (err) {
            Cookies.remove('token');
        }
    }
    return null;
}


const UserContext = createContext<IUserContext | undefined>(undefined);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userFromCookie = checkForValidCookie();
        if (userFromCookie) {
            setUser(userFromCookie);
        } else {
            setUser(null);
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): IUserContext | undefined => useContext(UserContext);