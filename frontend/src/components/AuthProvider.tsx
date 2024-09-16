import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { LoginInput, User } from '../dataTypes/types';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../api/mutations';

interface AuthContextType {
    user: User | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    login: async () => {},
    logout: () => {},
    loading: false,
});

interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [loginMutation] = useMutation(LOGIN_MUTATION);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        if (token && storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser({ username: parsedUser.username, _id: parsedUser._id });
        }
        setLoading(false);
    }, []);

    const login = async (username: string, password: string) => {
        try {
            const loginInput: LoginInput = {username, password};
            const { data } = await loginMutation({
                variables: { loginInput },
            });
        
            if (data && data.login) {
                const { access_token, userInfo } = data.login;
                localStorage.setItem('token', access_token);
                localStorage.setItem('user', JSON.stringify(userInfo));
                setUser({ username: userInfo.username, _id: userInfo._id});
            } else {
                throw new Error('Failed to log in');
            }
        } catch (error) {
            throw new Error('Failed to log in: ' + error);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;