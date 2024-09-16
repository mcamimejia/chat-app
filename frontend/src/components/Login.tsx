import React, { useState, useContext, FormEvent  } from 'react';
import { AuthContext } from './AuthProvider';
import { CreateUserInput, User } from '../dataTypes/types';
import { useMutation } from '@apollo/client';
import { CREATE_USER_MUTATION } from '../api/mutations';

const Login: React.FC = () => {
    const [user, setUser] = useState<User>({});
    const [isSignUp, setIsSignUp] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [infoMessage, setInfoMessage] = useState<string>('');

    const [createUserMutation] = useMutation(CREATE_USER_MUTATION);

    const { login } = useContext(AuthContext);

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setInfoMessage('');

        if (!user.username || user.username.length < 3 || !user.password || user.password.length < 3) {
            setError('User Name and Password must be at least 3 characters long.');
            return;
        }
        
        login(user.username, user.password)
            .catch ((error: any) => {
                setError('Error Logging in');
            })
        
    };

    const handleSignUp = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setInfoMessage('');

        if (!user.username || user.username.length < 3 || !user.password || user.password.length < 3) {
            setError('User Name and Password must be at least 3 characters long.');
            return;
        }

        try {
            const createUserInput: CreateUserInput = {username: user.username, password: user.password };
            const { data } = await createUserMutation({
                variables: {createUserInput},
            });
        
            if (data && data.createUser) {
                setUser({});
                setInfoMessage('User created successfully');
                setIsSignUp(false);
            } else {
                setError('Failed to create user');
            }
        } catch (error) {
            setError('Failed to create user');
        }
    };

    const toggleSignInSignUp = () => {
        setError('');
        setInfoMessage('');
        setIsSignUp(!isSignUp);
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    {isSignUp ? 'Sign Up' : 'Login'}
                </h2>

                {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
                {infoMessage && <div className="bg-green-100 text-green-700 p-3 rounded mb-4">{infoMessage}</div>}

                <form onSubmit={isSignUp ? handleSignUp : handleLogin}>
                    <div className="mb-4">
                        <label htmlFor="userName" className="block text-gray-700 font-semibold mb-2">
                            User Name
                        </label>
                        <input
                            type="text"
                            id="userName"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={user.username || ''}
                            onChange={(e) =>
                                setUser({ ...user, username: e.target.value })
                            }
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={user.password || ''}
                            onChange={(e) =>
                                setUser({ ...user, password: e.target.value })
                            }
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded mb-4 hover:bg-blue-600"
                    >
                        {isSignUp ? 'Sign Up' : 'Login'}
                    </button>
                </form>

                <div className="text-center">
                    <button
                        className="text-blue-500 hover:underline"
                        onClick={toggleSignInSignUp}
                    >
                        {isSignUp ? 'If you already have an account, login here' : 'Create an account'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;