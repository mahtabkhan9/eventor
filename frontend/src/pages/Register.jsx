import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(formData.username, formData.email, formData.password);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div style={{ paddingTop: '2rem', paddingBottom: '2rem', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="container">
            <div className="glass animate-fade-in" style={{ width: '100%', maxWidth: '400px', padding: '2rem', borderRadius: '16px' }}>
                <h2 className="text-center" style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>Create Account</h2>
                {error && <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', border: '1px solid rgba(239, 68, 68, 0.2)' }}>{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            required
                            placeholder="Choose a username"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input
                            type="email"
                            className="form-control"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                            placeholder="Create a strong password"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-full" style={{ marginTop: '1rem' }}>Register</button>
                    <p className="text-center" style={{ marginTop: '1.5rem', color: 'var(--text-secondary)' }}>
                        Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: '600', textDecoration: 'none' }}>Login here</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;
