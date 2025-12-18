import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { MapPin, Calendar, Users, ArrowLeft, Share2, Heart, Clock } from 'lucide-react';

const EventDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const res = await axios.get(`${backendUrl}/api/events/${id}`);
                setEvent(res.data);
            } catch (err) {
                console.error("Fetch error:", err);
                setError('Event not found');
            } finally {
                setLoading(false);
            }
        };
        fetchEvent();
    }, [id]);

    const handleRSVP = async () => {
        if (!user) {
            navigate('/login');
            return;
        }
        try {
            const res = await axios.post(`${backendUrl}/api/events/${id}/rsvp`, {}, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setEvent(res.data);
        } catch (err) {
            alert(err.response?.data?.message || 'RSVP Action failed');
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-glass backdrop-blur-md p-8 rounded-2xl border border-glass-border font-semibold animate-pulse">Loading Event...</div>
        </div>
    );

    if (error) return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <div className="bg-red-500/10 text-red-500 p-8 rounded-2xl border border-red-500/20 text-xl font-bold">{error}</div>
        </div>
    );

    if (!event) return null;

    const isAttending = user && event.attendees.includes(user.id);
    const isFull = event.attendees.length >= event.capacity;

    return (
        <div className="event-details-page">
            <div className="container event-details-container">
                <button
                    onClick={() => navigate('/dashboard')}
                    className="btn glass back-btn"
                >
                    <ArrowLeft size={18} style={{ marginRight: '0.5rem' }} /> Back to Dashboard
                </button>

                <div className="glass animate-slide-up event-hero">
                    <div className="event-banner">
                        <div className="event-banner-overlay" />
                        <div className="event-banner-content">
                            <span className="badge event-host-badge">
                                Hosted by {event.createdBy?.username || 'Unknown'}
                            </span>
                            <h1 className="event-title">{event.title}</h1>
                        </div>
                    </div>

                    <div className="event-content-grid">
                        {/* Left Column */}
                        <div className="event-details-col">
                            <div className="event-datetime-row">
                                <div className="flex items-center gap-4">
                                    <div className="event-icon-box event-icon-cal">
                                        <Calendar size={28} />
                                    </div>
                                    <div>
                                        <div className="event-info-label">Date</div>
                                        <div className="event-info-value">
                                            {new Date(event.date).toLocaleDateString(undefined, { weekday: 'short', month: 'long', day: 'numeric' })}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="event-icon-box event-icon-clock">
                                        <Clock size={28} />
                                    </div>
                                    <div>
                                        <div className="event-info-label">Time</div>
                                        <div className="event-info-value">
                                            {new Date(event.date).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="event-description-title">About Event</h3>
                                <p className="event-description-text">
                                    {event.description || "No description provided."}
                                </p>
                            </div>

                            <div className="event-location-box">
                                <h4 className="event-location-title">
                                    <MapPin size={24} style={{ color: 'var(--primary)' }} /> Location
                                </h4>
                                <p style={{ fontSize: '1.2rem', marginLeft: '2rem', margin: 0 }}>{event.location}</p>
                            </div>
                        </div>


                        <div className="rsvp-card-wrapper">
                            <div className="glass rsvp-card">
                                <div className="capacity-row">
                                    <div>
                                        <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Capacity</div>
                                        <div className="capacity-val">{event.capacity} seats</div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Going</div>
                                        <div className="capacity-val" style={{ color: isFull ? '#ef4444' : '#10b981' }}>
                                            {event.attendees.length}
                                        </div>
                                    </div>
                                </div>

                                {user ? (
                                    <button
                                        className={`btn w-full rsvp-btn ${isAttending ? 'btn-secondary' : 'btn-primary'}`}
                                        onClick={handleRSVP}
                                        disabled={!isAttending && isFull}
                                    >
                                        {isAttending ? (
                                            <> <RotateCw size={24} style={{ marginRight: '0.5rem' }} /> Leave Event </>
                                        ) : (
                                            isFull ? 'Event Full' : 'Join Event Now'
                                        )}
                                    </button>
                                ) : (
                                    <button className="btn btn-primary w-full rsvp-btn" onClick={() => navigate('/login')}>
                                        Login to Join
                                    </button>
                                )}

                                <p className="waitlist-text">
                                    {isFull ? "Waitlist available upon request." : "Secure your spot today!"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const RotateCw = ({ size }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" /><path d="M3 21v-5h5" /></svg>;

export default EventDetails;
