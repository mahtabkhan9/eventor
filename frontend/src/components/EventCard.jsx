import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Users, Trash2, Image as ImageIcon } from 'lucide-react';

const EventCard = ({ event, onUpdate }) => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    // check if user is logged in before accessing properties
    const isAttending = user && event.attendees.includes(user.id);
    const isFull = event.attendees.length >= event.capacity;
    const isOwner = user && event.createdBy._id === user.id;

    const handleRSVP = async (e) => {
        e.stopPropagation();
        if (!user) {
            navigate('/login');
            return;
        }
        try {
            const res = await axios.post(`${backendUrl}/api/events/${event._id}/rsvp`, {}, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            onUpdate(res.data);
        } catch (err) {
            alert(err.response?.data?.message || 'RSVP Action failed');
        }
    };

    const [isDeleting, setIsDeleting] = React.useState(false);

    const handleDelete = async (e) => {
        // no confirm dialog for now to rule out browser blocking
        setIsDeleting(true);

        try {
            await axios.delete(`${backendUrl}/api/events/${event._id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            // force reload to ensure UI reflects change
            window.location.reload();
        } catch (err) {
            alert(err.response?.data?.message || 'Delete failed');
            setIsDeleting(false);
        }
    };

    return (
        <div className="event-card group">
            <div
                style={{ padding: '1.5rem', flex: 1, cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
                onClick={() => navigate(`/events/${event._id}`)}
            >
                <div className="flex justify-between items-start" style={{ marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{event.title}</h3>
                    {isAttending && <span className="badge badge-green">Attending</span>}
                </div>

                <p style={{ color: 'var(--primary)', fontSize: '0.9rem', fontWeight: '500', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Calendar size={16} />
                    {new Date(event.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </p>

                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem', flex: 1 }}>
                    <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{event.location}</span>
                    </div>
                </div>
            </div>

            
            <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--border)', background: 'rgba(0,0,0,0.02)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="badge" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Users size={14} /> {event.attendees.length} / {event.capacity}
                </span>

                <div className="flex gap-2">
                    {isOwner && (
                        <button
                            className="btn"
                            style={{ padding: '0.5rem', background: '#ef4444', color: 'white', borderRadius: '8px' }}
                            onClick={handleDelete}
                            disabled={isDeleting}
                            title="Delete Event"
                        >
                            {isDeleting ? '...' : <Trash2 size={16} />}
                        </button>
                    )}

                    {user ? (
                        <button
                            className={`btn ${isAttending ? 'btn-secondary' : 'btn-primary'}`}
                            style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                            onClick={handleRSVP}
                            disabled={!isAttending && isFull}
                        >
                            {isAttending ? 'Leave' : (isFull ? 'Full' : 'Join')}
                        </button>
                    ) : (
                        <button className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }} onClick={handleRSVP}>
                            Join
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EventCard;
