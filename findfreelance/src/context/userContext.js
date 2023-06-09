import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import useFetch from "@/hooks/useFetch";

const UserContext = createContext({
    isLogged: false,
    user:{} ,
    token: null,
    isAdmin: false,
    isFreelancer: false,
    isCompany: false,
    login: () => {},
    logout: () => {},
});


export default UserContext ;

export const UserContextProvider = ({ children }) => {
    const router = useRouter();
    const [user, setUser] = useState({});
    const [token, setToken] = useState(null);
    const [isLogged, setIsLogged] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isFreelancer, setIsFreelancer] = useState(false);
    const [isCompany, setIsCompany] = useState(false);

    const { fetchData, data, error, loading } = useFetch({url: "/user", method: "GET", token: token, body: null});

    useEffect(() => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("token");
            if (token) {
                setToken(token);
                setIsLogged(true);
            } else {
                setToken(null);
                setIsLogged(false);
                router.push("/auth/login");
            }
        }
    }, []);

    useEffect(() => {
        if (token && !isLogged) {
            fetchData();
        }
    }, [token, isLogged]);

    useEffect(() => {
        if (data && data.success) {
            login(data.user);
          }
    }, [data]);

    const login = (user) => {
        if (user.user.isAdmin) {
            setIsAdmin(true);
        } else if (user.user.isFreelancer) {
            setIsFreelancer(true);
        } else if (user.user.isCompany) {
            setIsCompany(true);
        }
        setUser(user);
        setIsLogged(true);

        localStorage.setItem("token", user.token);
        setToken(user.token);
        router.push("/");
    };

    const logout = () => {
        setUser({});
        setIsLogged(false);
        localStorage.removeItem("token");
        setToken(null);
        router.push("/");
    };

    const updateUser = (user) => {
        setUser(user);
    };

    
    const context = {
        isLogged,
        user,
        login,
        logout,
        updateUser,
        token,
        isAdmin,
        isFreelancer,
        isCompany
    };

    return (
        <UserContext.Provider value={context}>{children}</UserContext.Provider>
    );


};

