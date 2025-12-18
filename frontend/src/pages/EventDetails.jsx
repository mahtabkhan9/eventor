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

        <div style={{ minHeight: '100vh', paddingBottom: '5rem', position: 'relative' }}>
            <div className="container" style={{ paddingTop: '2rem' }}>
                <button
                    onClick={() => navigate('/dashboard')}
                    className="btn glass"
                    style={{ marginBottom: '2rem', padding: '0.5rem 1rem' }}
                >
                    <ArrowLeft size={18} style={{ marginRight: '0.5rem' }} /> Back to Dashboard
                </button>

                <div className="glass animate-slide-up" style={{ borderRadius: '24px', overflow: 'hidden', padding: 0 }}>
                    <div style={{ height: '400px', width: '100%', position: 'relative' }}>
                        <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, var(--primary), var(--accent))' }} />
                        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', padding: '3rem' }}>
                            <span className="badge" style={{ background: 'var(--accent)', color: 'white', border: 'none', marginBottom: '1rem' }}>
                                Hosted by {event.createdBy?.username || 'Unknown'}
                            </span>
                            <h1 style={{ fontSize: '3.5rem', fontWeight: '800', margin: 0, color: 'white' }}>{event.title}</h1>
                        </div>
                    </div>

                    <div style={{ padding: '3rem', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem' }}>
                        {/* Left Column */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                            <div className="flex gap-4">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{ padding: '0.75rem', background: 'rgba(99, 102, 241, 0.15)', borderRadius: '12px', color: 'var(--primary)' }}>
                                        <Calendar size={28} />
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Date</div>
                                        <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
                                            {new Date(event.date).toLocaleDateString(undefined, { weekday: 'short', month: 'long', day: 'numeric' })}
                                        </div>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginLeft: '2rem' }}>
                                    <div style={{ padding: '0.75rem', background: 'rgba(236, 72, 153, 0.15)', borderRadius: '12px', color: 'var(--accent)' }}>
                                        <Clock size={28} />
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Time</div>
                                        <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
                                            {new Date(event.date).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', borderLeft: '4px solid var(--primary)', paddingLeft: '1rem' }}>About Event</h3>
                                <p style={{ fontSize: '1.1rem', lineHeight: '1.7', color: 'var(--text-secondary)', whiteSpace: 'pre-line' }}>
                                    {event.description || "No description provided."}
                                </p>
                            </div>

                            <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '16px', border: '1px solid var(--border)' }}>
                                <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                                    <MapPin size={24} style={{ color: 'var(--primary)' }} /> Location
                                </h4>
                                <p style={{ fontSize: '1.2rem', marginLeft: '2rem', margin: 0 }}>{event.location}</p>
                            </div>
                        </div>


                        <div style={{ position: 'relative' }}>
                            <div className="glass" style={{ position: 'sticky', top: '2rem', padding: '2rem', borderRadius: '20px', boxShadow: 'var(--shadow)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '1.5rem' }}>
                                    <div>
                                        <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Capacity</div>
                                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{event.capacity} seats</div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Going</div>
                                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: isFull ? '#ef4444' : '#10b981' }}>
                                            {event.attendees.length}
                                        </div>
                                    </div>
                                </div>

                                {user ? (
                                    <button
                                        className={`btn w-full ${isAttending ? 'btn-secondary' : 'btn-primary'}`}
                                        style={{ width: '100%', fontSize: '1.1rem', padding: '1rem' }}
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
                                    <button className="btn btn-primary w-full" style={{ width: '100%', fontSize: '1.1rem', padding: '1rem' }} onClick={() => navigate('/login')}>
                                        Login to Join
                                    </button>
                                )}

                                <p style={{ textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '1rem' }}>
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
