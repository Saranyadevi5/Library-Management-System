import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from './components/navbar';
import Login from './pages/login'; // Import your login component
import ListLibrary from './pages/list_library';
import ListLibraryUser from './pages/list_library_user';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isTableView, setIsTableView] = useState(true);
  const [role, setRole] = useState('user'); // Default role is 'user'
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#333' : '#fff';
    document.body.style.color = darkMode ? '#fff' : '#333';
  }, [darkMode]);

  // Function to handle login
  const handleLogin = (userRole) => {
    setRole(userRole);
    setIsLoggedIn(true);
  };

  return (
    <div className={`container${darkMode ? ' dark-mode' : ''}`}>
      <Navbar isDarkMode={darkMode} setIsDarkMode={setDarkMode} isTableView={isTableView} setIsTableView={setIsTableView} />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        {/* Conditional rendering based on login status and role */}
        {isLoggedIn ? (
          role === 'admin' ? (
            <ListLibrary isTableView={isTableView} setIsTableView={setIsTableView} />
          ) : (
            <ListLibraryUser isTableView={isTableView} setIsTableView={setIsTableView} />
          )
        ) : (
          <Login onLogin={handleLogin} theme={darkMode ? 'dark' : 'light'} />
        )}
      </div>
    </div>
  );
}

export default App;
