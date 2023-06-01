import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState(localStorage.getItem("userId"));
    useEffect(() => {
        // Перевірка локального сховища під час завантаження компонента
        const storedAuth = localStorage.getItem('isAuthenticated');
        if (storedAuth) {
            setIsAuthenticated(JSON.parse(storedAuth));
        }
    }, []);

    const login = (id) => {
        console.log(id);
        setUserId(id);
        setIsAuthenticated(true);
        localStorage.setItem('isAuthenticated', true);
        localStorage.setItem('userId', id);
    };

    const logout = () => {
        // Логіка виходу з авторизації тут
        setIsAuthenticated(false);
        setUserId(-1);
        localStorage.setItem('userId', -1);
        localStorage.removeItem('isAuthenticated');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userId, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};