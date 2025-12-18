import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateEvent = () => {
    const [formData, setFormData] = useState({
        title: '', description: '', date: '', location: '', capacity: ''
    });
    const [image, setImage] = useState(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        if (image) data.append('image', image);

        try {
            await axios.post(`${backendUrl}/api/events`, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            navigate('/dashboard');
        } catch (err) {
            alert(err.response?.data?.message || 'Create failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{ padding: '4rem 0', minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
            <div className="glass animate-fade-in" style={{ width: '100%', maxWidth: '700px', padding: '2rem', borderRadius: '16px' }}>
                <h2 className="text-center text-gradient" style={{ fontSize: '2rem', marginBottom: '2rem' }}>Host an Event</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Event Title</label>
                        <input type="text" className="form-control" onChange={e => setFormData({ ...formData, title: e.target.value })} required placeholder="e.g. Summer Coding Bootcamp" />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Description</label>
                        <textarea
                            className="form-control"
                            rows="4"
                            style={{ resize: 'none' }}
                            name="description"
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                            required
                            placeholder="Tell people what's happening..."
                        ></textarea>
                    </div>

                    <div className="flex gap-4" style={{ marginBottom: '1.5rem' }}>
                        <div style={{ flex: 1 }}>
                            <label className="form-label">Date & Time</label>
                            <input type="datetime-local" className="form-control" onChange={e => setFormData({ ...formData, date: e.target.value })} required />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label className="form-label">Capacity</label>
                            <input type="number" className="form-control" onChange={e => setFormData({ ...formData, capacity: e.target.value })} required min="1" />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Location</label>
                        <input type="text" className="form-control" onChange={e => setFormData({ ...formData, location: e.target.value })} required placeholder="Venue address or Online Link" />
                    </div>


                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
                        <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%' }}>
                            {loading ? 'Creating...' : 'Publish Event'}
                        </button>
                        <button type="button" className="btn" style={{ background: 'transparent', color: 'var(--text-secondary)' }} onClick={() => navigate('/dashboard')}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateEvent;
