import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";

interface IUserContext {
    user: {
        userId: string;
        email: string;
        firstname: string;
        lastname: string;
        phone: string;
        role: string;
    } | null;
    setUser: (data: { userId: string; email: string; firstname: string; lastname: string; phone: string; role: string; } | null) => void;
}

function checkForValidCookie() {
    const cookie = Cookies.get('token');
    if (cookie) {
        try {
            return jwtDecode(cookie);
        } catch (err) {
            Cookies.remove('token');
        }
    }
    return null;
}

const UserContext = createContext<IUserContext | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<IUserContext['user']>(null);

    useEffect(() => {
        const checkCookie = () => {
            const userFromCookie = checkForValidCookie();
            if (userFromCookie) {
                setUser(userFromCookie as IUserContext['user']);
            } else {
                setUser(null);
            }
        };
        checkCookie();
        const intervalId = setInterval(checkCookie, 1000);
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): IUserContext | undefined => useContext(UserContext);