import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import EventCard from '../components/EventCard';
import { AuthContext } from '../context/AuthContext';

const MyEvents = () => {
    const [events, setEvents] = useState([]);
    const [activeTab, setActiveTab] = useState('hosting'); // 'hosting' or 'attending'
    const { user } = useContext(AuthContext);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const fetchMyEvents = async () => {
        try {
            const res = await axios.get(`${backendUrl}/api/events`);
            setEvents(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchMyEvents();
    }, []);

    const handleUpdateEvent = (updatedEvent) => {
        setEvents(events.map(ev => ev._id === updatedEvent._id ? updatedEvent : ev));
    };

    const hostingEvents = events.filter(ev => ev.createdBy._id === user?.id);
    const attendingEvents = events.filter(ev => ev.attendees.includes(user?.id));

    const displayedEvents = activeTab === 'hosting' ? hostingEvents : attendingEvents;

    return (
        <div className="container" style={{ paddingBottom: '4rem', paddingTop: '2rem' }}>
            <h1 className="text-center text-gradient" style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>My Dashboard</h1>

            <div className="flex justify-center" style={{ marginBottom: '2.5rem' }}>
                <div className="glass" style={{ padding: '0.25rem', borderRadius: '16px', display: 'inline-flex' }}>
                    <button
                        className="btn"
                        style={{ padding: '0.75rem 2rem', background: activeTab === 'hosting' ? 'var(--primary)' : 'transparent', color: activeTab === 'hosting' ? 'white' : 'var(--text-secondary)' }}
                        onClick={() => setActiveTab('hosting')}
                    >
                        Hosting ({hostingEvents.length})
                    </button>
                    <button
                        className="btn"
                        style={{ padding: '0.75rem 2rem', background: activeTab === 'attending' ? 'var(--primary)' : 'transparent', color: activeTab === 'attending' ? 'white' : 'var(--text-secondary)' }}
                        onClick={() => setActiveTab('attending')}
                    >
                        Attending ({attendingEvents.length})
                    </button>
                </div>
            </div>

            {displayedEvents.length === 0 ? (
                <div className="card glass text-center animate-fade-in" style={{ padding: '4rem', borderStyle: 'dashed' }}>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>You are not {activeTab} any events yet.</p>
                    {activeTab === 'hosting' ? (
                        <Link to="/create-event" className="btn btn-primary">Create Your First Event</Link>
                    ) : (
                        <Link to="/dashboard" className="btn btn-primary">Browse Events</Link>
                    )}
                </div>
            ) : (
                <div className="dashboard-grid animate-fade-in">
                    {displayedEvents.map(event => (
                        <EventCard key={event._id} event={event} onUpdate={handleUpdateEvent} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyEvents;
