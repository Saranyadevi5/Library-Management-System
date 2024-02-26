// Navbar.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faTable, faBook, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import Login from '../pages/login'; // Import your Login component here

const Navbar = ({ isDarkMode, setIsDarkMode, isTableView, setIsTableView }) => {
    const [showLogin, setShowLogin] = useState(false);

    return (
        <nav className={`navbar fixed-top ${isDarkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'} d-flex justify-content-between align-items-center px-3`} style={{height: '80px'}}>
            <a className="navbar-brand m-0" href="#">Library Management System</a>
            <div className="d-flex align-items-center">
                <FontAwesomeIcon 
                    icon={isDarkMode ? faEyeSlash : faEye} 
                    onClick={() => setIsDarkMode(!isDarkMode)} 
                    style={{cursor: 'pointer', marginRight: '15px'}}
                />
                <button onClick={() => setIsTableView(!isTableView)}>
                    <FontAwesomeIcon icon={isTableView ? faBook : faTable} />
                </button>
                <FontAwesomeIcon 
                    icon={faSignInAlt} 
                    onClick={() => setShowLogin(true)} 
                    style={{cursor: 'pointer', marginLeft: '15px'}}
                />
            </div>

            {showLogin && <Login onClose={() => setShowLogin(false)} />}
        </nav>
    );
};

export default Navbar;
