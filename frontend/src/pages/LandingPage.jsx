import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

import { Rocket, Calendar, Palette, Star, Heart } from 'lucide-react';

const LandingPage = () => {
    const { user } = useContext(AuthContext);

    return (
        <div>
            <section
                className="animate-fade-in"
                style={{
                    padding: '6rem 0',
                    textAlign: 'center',
                    background: 'radial-gradient(circle at center, #e0e7ff 0%, transparent 70%)'
                }}
            >
                <div className="container">
                    <h1 className="text-gradient" style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>
                        Host & Join Amazing Events
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
                        The easiest way to manage RSVPs, track attendees, and discover local happenings.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link to="/create-event" className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>Start Hosting</Link>
                        {user ? (
                            <Link to="/dashboard" className="btn btn-secondary" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>Go to Dashboard</Link>
                        ) : (
                            <Link to="/register" className="btn btn-secondary" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>Join Community</Link>
                        )}
                    </div>
                </div>
            </section>

            {/* features grid */}
            <section className="container" style={{ marginTop: '4rem' }}>
                <div className="dashboard-grid">
                    <div className="card glass text-center">
                        <div style={{ marginBottom: '1rem', color: 'var(--primary)' }}><Rocket size={48} /></div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Fast & Secure</h3>
                        <p style={{ color: 'var(--text-secondary)' }}>Built with modern MERN stack technology ensuring top-notch performance and security.</p>
                    </div>

                    <div className="card glass text-center">
                        <div style={{ marginBottom: '1rem', color: 'var(--accent)' }}><Calendar size={48} /></div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Real-time RSVPs</h3>
                        <p style={{ color: 'var(--text-secondary)' }}>Manage your guest list effortlessly with instant status updates and capacity tracking.</p>
                    </div>

                    <div className="card glass text-center">
                        <div style={{ marginBottom: '1rem', color: '#10b981' }}><Palette size={48} /></div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Beautiful Design</h3>
                        <p style={{ color: 'var(--text-secondary)' }}>Experience a premium, user-friendly interface with dark mode support.</p>
                    </div>
                </div>
            </section>

            {/* testimonials */}
            <section className="container" style={{ marginTop: '6rem' }}>
                <h2 className="text-center" style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '3rem' }}>Loved by Organizers</h2>
                <div className="dashboard-grid">
                    {[
                        { name: "Armaan Khan", role: "Event Leader", text: "This platform transformed how we handle our weekly meetups. The RSVP system is flawless!", color: "var(--primary)", initials: "AK" },
                        { name: "Sarah Bashir", role: "Event Planner", text: "Incredible design and super easy to use. My guests loved the smooth registration process.", color: "var(--accent)", initials: "SB" },
                        { name: "Nafasat Karim", role: "Tech Host", text: "Finally, an event tool that looks as good as it functions. Dark mode is a huge plus!", color: "#10b981", initials: "NK" }
                    ].map((t, i) => (
                        <div key={i} className="card glass">
                            <div className="flex gap-2" style={{ color: '#fbbf24', marginBottom: '1rem' }}>
                                {[1, 2, 3, 4, 5].map(star => <Star key={star} size={16} fill="#fbbf24" />)}
                            </div>
                            <p style={{ fontStyle: 'italic', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>"{t.text}"</p>
                            <div className="flex items-center gap-4">
                                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: t.color, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>{t.initials}</div>
                                <div>
                                    <h4 style={{ margin: 0, fontWeight: 'bold' }}>{t.name}</h4>
                                    <small style={{ color: 'var(--text-secondary)' }}>{t.role}</small>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="container" style={{ marginTop: '6rem', textAlign: 'center' }}>
                <div className="glass" style={{ borderRadius: '24px', padding: '4rem', background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(236,72,153,0.1))', border: '1px solid var(--border)' }}>
                    <h2 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem' }}>Ready to Launch?</h2>
                    <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
                        Join thousands of event organizers creating unforgettable experiences.
                    </p>
                    <Link to="/register" className="btn btn-primary" style={{ fontSize: '1.25rem', padding: '1rem 3rem' }}>Get Started for Free</Link>
                </div>
            </section>


            <footer className="footer">
                <div className="container">
                    <div className="footer-grid">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-2">
                                <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, var(--primary), var(--accent))', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                                    <Rocket size={20} />
                                </div>
                                <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Eventor</span>
                            </div>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                The all-in-one solution for creating, managing, and discovering amazing local events. Built for community.
                            </p>
                        </div>

                        <div>
                            <h4 className="footer-title">Product</h4>
                            <ul className="footer-links">
                                <li><Link to="#" className="footer-link">Home</Link></li>
                                <li><Link to="#" className="footer-link">Features</Link></li>
                                <li><Link to="#" className="footer-link">Pricing</Link></li>
                                <li><Link to="#" className="footer-link">Testimonials</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="footer-title">Resources</h4>
                            <ul className="footer-links">
                                <li><Link to="#" className="footer-link">Community</Link></li>
                                <li><Link to="#" className="footer-link">Help Center</Link></li>
                                <li><Link to="#" className="footer-link">Privacy Policy</Link></li>
                                <li><Link to="#" className="footer-link">Terms & Conditions</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="footer-title">Social Links</h4>
                            <ul className="footer-links">
                                <li><Link to="#" className="footer-link">Facebook</Link></li>
                                <li><Link to="#" className="footer-link">Instagram</Link></li>
                                <li><Link to="#" className="footer-link">LinkedIn</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="footer-bottom">
                        <p>© All rights reserved.</p>
                        <div className="flex gap-4">
                            <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                Made with <Heart size={16} fill="#ef4444" color="#ef4444" /> by Mahtab
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
