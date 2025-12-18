import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
        setIsMenuOpen(false);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav className="navbar">
            <div className="container navbar-container">
                <Link to="/" className="text-gradient logo" onClick={closeMenu}>
                    Eventor
                </Link>

                <div className="menu-toggle" onClick={toggleMenu}>
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </div>

                <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                    {user ? (
                        <>
                            <Link to="/dashboard" className="nav-link" onClick={closeMenu}>Dashboard</Link>
                            <Link to="/my-events" className="nav-link" onClick={closeMenu}>My Events</Link>
                            <Link to="/create-event" className="btn btn-primary" onClick={closeMenu}>Create Event</Link>
                            <button onClick={handleLogout} className="btn logout-btn">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="nav-link" onClick={closeMenu}>Login</Link>
                            <Link to="/register" className="btn btn-primary" onClick={closeMenu}>Get Started</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
