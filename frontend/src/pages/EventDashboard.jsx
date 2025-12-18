import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import EventCard from '../components/EventCard';
import { AuthContext } from '../context/AuthContext'; // Assuming AuthContext is located here

const EventDashboard = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({ category: '', date: '' });
    const { user } = useContext(AuthContext);

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const fetchEvents = async () => {
        try {
            const res = await axios.get(`${backendUrl}/api/events`);
            setEvents(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleUpdateEvent = (updatedEvent) => {
        setEvents(events.map(ev => ev._id === updatedEvent._id ? updatedEvent : ev));
    };

    const filteredEvents = events.filter(event => {
        if (filters.category && event.category !== filters.category) return false;
        if (filters.date) {
            const eventDate = new Date(event.date).toISOString().split('T')[0];
            if (eventDate !== filters.date) return false;
        }
        return true;
    });

    if (loading) return <div className="flex items-center justify-center h-screen" style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Loading events...</div>;

    return (
        <div className="container" style={{ paddingBottom: '4rem', paddingTop: '2rem' }}>
            <div className="glass" style={{ padding: '2rem', borderRadius: '16px', marginBottom: '2.5rem', background: 'linear-gradient(to right, rgba(99,102,241,0.1), rgba(236,72,153,0.1))' }}>
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                        <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Discover Events</h1>
                        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>Find and join amazing events happening around you.</p>
                    </div>
                </div>
            </div>

            <div className="dashboard-grid">
                    {filteredEvents.map(event => (
                        <EventCard key={event._id} event={event} onUpdate={handleUpdateEvent} />
                    ))}
                </div>
        </div>
    );
};

export default EventDashboard;
