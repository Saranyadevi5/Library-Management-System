import React, { useState } from 'react';
import ListLibrary from './list_library';
import ListLibraryUser from './list_library_user';

const Login = ({ onClose, onLogin, theme }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [role, setRole] = useState('');

    const handleLogin = (role) => {
        const adminUsername = 'admin';
        const adminPassword = 'admin';

        const userUsername = 'user';
        const userPassword = 'user';

        if (username === adminUsername && password === adminPassword && role === 'admin') {
            onLogin('admin');
            onClose && onClose();
            setLoggedIn(true);
            setRole('admin');
        } else if (username === userUsername && password === userPassword && role === 'user') {
            onLogin('user');
            onClose && onClose();
            setLoggedIn(true);
            setRole('user');
        } else {
            setError('Invalid username or password');
        }
    };

    const inputStyle = {
        width: '100%',
        padding: '8px',
        marginBottom: '10px',
        border: '1px solid #ccc',
        borderRadius: '3px',
        color: theme === 'dark' ? '#fff' : '#333',
        backgroundColor: theme === 'dark' ? '#555' : '#fff',
    };

    return (
        <div style={styles.loginForm}>
            {loggedIn && (
                role === 'admin' ? <ListLibrary /> : <ListLibraryUser />
            )}
            {!loggedIn && (
                <>
                    <h2 style={styles.title}>Login</h2>
                    <label style={styles.label}>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                        style={inputStyle}
                    />
                    <label style={styles.label}>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        style={inputStyle}
                    />
                    <button style={styles.loginButton} onClick={() => handleLogin('user')}>
                        Login as User
                    </button>
                    <button style={styles.loginButton} onClick={() => handleLogin('admin')}>
                        Login as Admin
                    </button>
                    {error && <p style={styles.errorMessage}>{error}</p>}
                </>
            )}
        </div>
    );
};

const styles = {
    loginForm: {
        width: '300px',
        margin: '0 auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        backgroundColor: '#fff',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    title: {
        textAlign: 'center',
        color: '#333',
    },
    label: {
        display: 'block',
        marginBottom: '5px',
        color: '#333',
    },
    loginButton: {
        width: '100%',
        padding: '10px',
        color: '#fff',
        border: 'none',
        borderRadius: '3px',
        cursor: 'pointer',
        backgroundColor: '#3498db',
        marginBottom: '10px',
    },
    errorMessage: {
        color: 'red',
        textAlign: 'center',
    },
};

export default Login;