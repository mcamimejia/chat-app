import React, { useContext } from 'react';
import { AuthContext } from './components/AuthProvider';
import Chat from './components/Chat';
import Login from './components/Login';

const App = () => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <React.Fragment>
            {user ? <Chat/> : <Login/>}
        </React.Fragment>
    );
};

export default App;
