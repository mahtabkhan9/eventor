import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/" className="text-gradient" style={{ fontSize: '1.5rem', textDecoration: 'none' }}>
                    Eventor
                </Link>
                <div className="nav-links">
                    {user ? (
                        <>
                            <Link to="/dashboard" className="nav-link">Dashboard</Link>
                            <Link to="/my-events" className="nav-link">My Events</Link>
                            <Link to="/create-event" className="btn btn-primary">Create Event</Link>
                            <button onClick={handleLogout} className="btn" style={{ color: '#ef4444', border: '1px solid #ef4444', background: 'transparent' }}>Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="nav-link">Login</Link>
                            <Link to="/register" className="btn btn-primary">Get Started</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
