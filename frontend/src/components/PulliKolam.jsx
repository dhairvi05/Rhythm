import React, { useEffect, useState } from 'react';
import './PulliKolam.css';

const PulliKolam = () => {
    const [activeTab, setActiveTab] = useState('cultural');

    useEffect(() => {
        // Navbar scroll effect
        const handleScroll = () => {
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                if (window.scrollY > 100) {
                    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                    navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
                } else {
                    navbar.style.background = 'rgba(255, 255, 255, 0.9)';
                    navbar.style.boxShadow = 'none';
                }
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Add entrance animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.content-card, .design-card, .significance-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleBackClick = () => {
        window.history.back();
    };

    return (
        <>
            {/* Navigation */}
            <nav className="navbar">
                <div className="nav-container">
                    <div className="logo">
                        <div className="logo-icon">R</div>
                        <span>Rhythm</span>
                    </div>
                    <div className="nav-buttons">
                        <button className="btn btn-outline" onClick={handleBackClick}>Back to Home</button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="hero">
                <div className="container">
                    <div className="hero-content">
                        <div className="hero-badge">Traditional Art Form</div>
                        <h1>Pulli Kolam</h1>
                        <p className="hero-subtitle">The Art of Connecting Dots</p>
                        <p className="hero-description">
                            Pulli Kolam is the most fundamental and widely practiced form of Kolam art, where dots are arranged in a grid pattern and connected with elegant curved lines to create intricate geometric designs. This ancient practice combines mathematical precision with artistic expression.
                        </p>
                    </div>
                </div>
                <div className="hero-pattern">
                    <svg viewBox="0 0 400 400" className="pulli-design">
                        <defs>
                            <linearGradient id="dotGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#1e3a8a" />
                                <stop offset="50%" stopColor="#7c3aed" />
                                <stop offset="100%" stopColor="#a855f7" />
                            </linearGradient>
                        </defs>
                        
                        {/* Dots Grid */}
                        {[...Array(5)].map((_, row) => 
                            [...Array(5)].map((_, col) => (
                                <circle
                                    key={`dot-${row}-${col}`}
                                    cx={100 + col * 50}
                                    cy={100 + row * 50}
                                    r="4"
                                    fill="url(#dotGradient)"
                                    className="dot-point"
                                    style={{ animationDelay: `${(row + col) * 0.1}s` }}
                                />
                            ))
                        )}
                        
                        {/* Connecting Lines */}
                        <path
                            d="M 100 100 Q 125 75, 150 100 Q 175 125, 200 100 Q 225 75, 250 100 Q 275 125, 300 100"
                            stroke="url(#dotGradient)"
                            strokeWidth="2"
                            fill="none"
                            className="connecting-line"
                            style={{ animationDelay: '0.5s' }}
                        />
                        <path
                            d="M 100 150 Q 125 125, 150 150 Q 175 175, 200 150 Q 225 125, 250 150 Q 275 175, 300 150"
                            stroke="url(#dotGradient)"
                            strokeWidth="2"
                            fill="none"
                            className="connecting-line"
                            style={{ animationDelay: '0.7s' }}
                        />
                        <path
                            d="M 100 200 Q 125 175, 150 200 Q 175 225, 200 200 Q 225 175, 250 200 Q 275 225, 300 200"
                            stroke="url(#dotGradient)"
                            strokeWidth="2"
                            fill="none"
                            className="connecting-line"
                            style={{ animationDelay: '0.9s' }}
                        />
                        <path
                            d="M 100 250 Q 125 225, 150 250 Q 175 275, 200 250 Q 225 225, 250 250 Q 275 275, 300 250"
                            stroke="url(#dotGradient)"
                            strokeWidth="2"
                            fill="none"
                            className="connecting-line"
                            style={{ animationDelay: '1.1s' }}
                        />
                        <path
                            d="M 100 300 Q 125 275, 150 300 Q 175 325, 200 300 Q 225 275, 250 300 Q 275 325, 300 300"
                            stroke="url(#dotGradient)"
                            strokeWidth="2"
                            fill="none"
                            className="connecting-line"
                            style={{ animationDelay: '1.3s' }}
                        />
                        
                        {/* Vertical Lines */}
                        <path
                            d="M 100 100 Q 75 125, 100 150 Q 125 175, 100 200 Q 75 225, 100 250 Q 125 275, 100 300"
                            stroke="url(#dotGradient)"
                            strokeWidth="2"
                            fill="none"
                            className="connecting-line"
                            style={{ animationDelay: '1.5s' }}
                        />
                        <path
                            d="M 150 100 Q 125 125, 150 150 Q 175 175, 150 200 Q 125 225, 150 250 Q 175 275, 150 300"
                            stroke="url(#dotGradient)"
                            strokeWidth="2"
                            fill="none"
                            className="connecting-line"
                            style={{ animationDelay: '1.7s' }}
                        />
                        <path
                            d="M 200 100 Q 175 125, 200 150 Q 225 175, 200 200 Q 175 225, 200 250 Q 225 275, 200 300"
                            stroke="url(#dotGradient)"
                            strokeWidth="2"
                            fill="none"
                            className="connecting-line"
                            style={{ animationDelay: '1.9s' }}
                        />
                        <path
                            d="M 250 100 Q 225 125, 250 150 Q 275 175, 250 200 Q 225 225, 250 250 Q 275 275, 250 300"
                            stroke="url(#dotGradient)"
                            strokeWidth="2"
                            fill="none"
                            className="connecting-line"
                            style={{ animationDelay: '2.1s' }}
                        />
                        <path
                            d="M 300 100 Q 275 125, 300 150 Q 325 175, 300 200 Q 275 225, 300 250 Q 325 275, 300 300"
                            stroke="url(#dotGradient)"
                            strokeWidth="2"
                            fill="none"
                            className="connecting-line"
                            style={{ animationDelay: '2.3s' }}
                        />
                    </svg>
                </div>
            </section>

            {/* Overview Section */}
            <section className="overview">
                <div className="container">
                    <div className="overview-grid">
                        <div className="content-card">
                            <div className="card-icon">TRADITION</div>
                            <h3>Historical Background</h3>
                            <p>Pulli Kolam has been practiced for over 5,000 years in South India, particularly in Tamil Nadu. The word "Pulli" means dot in Tamil, representing the fundamental building blocks of this ancient art form. Traditionally drawn at dawn, these patterns were believed to welcome prosperity and ward off evil spirits.</p>
                        </div>
                        
                        <div className="content-card">
                            <div className="card-icon">TECHNIQUE</div>
                            <h3>Creating the Pattern</h3>
                            <p>Artists begin by placing dots in a symmetrical grid formation, typically using rice flour or chalk powder. The dots are then connected using curved, flowing lines that weave around them, creating intricate patterns. The challenge lies in ensuring all dots are connected while maintaining symmetry and aesthetic balance.</p>
                        </div>
                        
                        <div className="content-card">
                            <div className="card-icon">SYMBOLISM</div>
                            <h3>Deeper Meaning</h3>
                            <p>Each dot represents a soul or a point of energy in the universe. The connecting lines symbolize the interconnectedness of all beings and the flow of cosmic energy. The practice of creating these patterns is a form of meditation, promoting mindfulness and inner peace.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Significance Tabs Section */}
            <section className="significance">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Understanding Pulli Kolam</h2>
                        <p className="section-subtitle">Explore the cultural, spiritual, and modern dimensions of this timeless art</p>
                    </div>

                    <div className="tabs">
                        <button 
                            className={`tab ${activeTab === 'cultural' ? 'active' : ''}`}
                            onClick={() => setActiveTab('cultural')}
                        >
                            Cultural Significance
                        </button>
                        <button 
                            className={`tab ${activeTab === 'spiritual' ? 'active' : ''}`}
                            onClick={() => setActiveTab('spiritual')}
                        >
                            Spiritual Significance
                        </button>
                        <button 
                            className={`tab ${activeTab === 'modern' ? 'active' : ''}`}
                            onClick={() => setActiveTab('modern')}
                        >
                            Modern Applications
                        </button>
                    </div>

                    <div className="tab-content">
                        {activeTab === 'cultural' && (
                            <div className="significance-card fade-in">
                                <h3>Cultural Heritage and Community</h3>
                                <div className="significance-grid">
                                    <div className="significance-item">
                                        <h4>Social Bonding</h4>
                                        <p>Creating Kolam is often a communal activity where women gather, share designs, and compete in friendly competitions. This practice strengthens social bonds and creates a sense of community identity, serving as a medium for cultural expression and social interaction.</p>
                                    </div>
                                    <div className="significance-item">
                                        <h4>Festive Celebrations</h4>
                                        <p>During festivals like Pongal, Diwali, and Navaratri, elaborate Pulli Kolam designs are created to welcome guests and deities. These special occasion Kolams are larger, more intricate, and often incorporate colors, flowers, and lamps, marking the importance of the celebration.</p>
                                    </div>
                                    <div className="significance-item">
                                        <h4>Identity and Pride</h4>
                                        <p>Pulli Kolam serves as a visual marker of Tamil cultural identity. The skill in creating complex patterns is a source of pride, and the art form has become a symbol of South Indian heritage recognized globally, representing the region's rich artistic traditions.</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'spiritual' && (
                            <div className="significance-card fade-in">
                                <h3>Spiritual Practices and Beliefs</h3>
                                <div className="significance-grid">
                                    <div className="significance-item">
                                        <h4>Sacred Threshold</h4>
                                        <p>The Kolam at the entrance is believed to be a sacred boundary between the material and spiritual worlds. It purifies the space, inviting positive energies and divine blessings while preventing negative forces from entering the home, acting as a spiritual shield.</p>
                                    </div>
                                    <div className="significance-item">
                                        <h4>Meditation in Motion</h4>
                                        <p>The act of drawing Pulli Kolam is a form of moving meditation. The focus required to connect dots in perfect symmetry quiets the mind, promotes concentration, and brings the practitioner into a state of mindfulness and present-moment awareness.</p>
                                    </div>
                                    <div className="significance-item">
                                        <h4>Offering to Nature</h4>
                                        <p>Traditionally drawn with rice flour, Kolam serves as food for small creatures like ants and birds. This practice embodies the principle of sharing and compassion, teaching that even the smallest beings deserve nourishment and care, reflecting the concept of universal love.</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'modern' && (
                            <div className="significance-card fade-in">
                                <h3>Contemporary Uses and Innovation</h3>
                                <div className="significance-grid">
                                    <div className="significance-item">
                                        <h4>Digital Art and Design</h4>
                                        <p>Pulli Kolam patterns have been digitized and used in graphic design, textile prints, architecture, and user interface design. Modern designers incorporate these traditional patterns into contemporary products, from smartphone wallpapers to fashion accessories, bridging tradition and technology.</p>
                                    </div>
                                    <div className="significance-item">
                                        <h4>Educational Tool</h4>
                                        <p>Schools and universities use Pulli Kolam to teach mathematical concepts like symmetry, geometry, patterns, and spatial reasoning. The art form serves as an engaging way to introduce students to complex mathematical principles while preserving cultural heritage.</p>
                                    </div>
                                    <div className="significance-item">
                                        <h4>Global Recognition</h4>
                                        <p>Pulli Kolam has gained international recognition as a form of street art and mathematical art. Exhibitions, competitions, and workshops worldwide celebrate this tradition, with artists experimenting with new materials, scales, and contexts while honoring its roots.</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Design Showcase */}
            <section className="showcase">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Design Examples</h2>
                        <p className="section-subtitle">Explore various Pulli Kolam patterns from simple to complex</p>
                    </div>

                    <div className="design-grid">
                        <div className="design-card">
                            <div className="design-visual simple-pattern">
                                <svg viewBox="0 0 200 200">
                                    <defs>
                                        <linearGradient id="simpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#1e3a8a" />
                                            <stop offset="100%" stopColor="#7c3aed" />
                                        </linearGradient>
                                    </defs>
                                    <circle cx="50" cy="50" r="3" fill="url(#simpleGradient)" />
                                    <circle cx="100" cy="50" r="3" fill="url(#simpleGradient)" />
                                    <circle cx="150" cy="50" r="3" fill="url(#simpleGradient)" />
                                    <circle cx="50" cy="100" r="3" fill="url(#simpleGradient)" />
                                    <circle cx="100" cy="100" r="3" fill="url(#simpleGradient)" />
                                    <circle cx="150" cy="100" r="3" fill="url(#simpleGradient)" />
                                    <circle cx="50" cy="150" r="3" fill="url(#simpleGradient)" />
                                    <circle cx="100" cy="150" r="3" fill="url(#simpleGradient)" />
                                    <circle cx="150" cy="150" r="3" fill="url(#simpleGradient)" />
                                    <path d="M 50 50 Q 75 25, 100 50 Q 125 75, 150 50" stroke="url(#simpleGradient)" strokeWidth="2" fill="none" />
                                    <path d="M 50 100 Q 75 75, 100 100 Q 125 125, 150 100" stroke="url(#simpleGradient)" strokeWidth="2" fill="none" />
                                    <path d="M 50 150 Q 75 125, 100 150 Q 125 175, 150 150" stroke="url(#simpleGradient)" strokeWidth="2" fill="none" />
                                    <path d="M 50 50 Q 25 75, 50 100 Q 75 125, 50 150" stroke="url(#simpleGradient)" strokeWidth="2" fill="none" />
                                    <path d="M 100 50 Q 75 75, 100 100 Q 125 125, 100 150" stroke="url(#simpleGradient)" strokeWidth="2" fill="none" />
                                    <path d="M 150 50 Q 125 75, 150 100 Q 175 125, 150 150" stroke="url(#simpleGradient)" strokeWidth="2" fill="none" />
                                </svg>
                            </div>
                            <h4>Simple 3x3 Pattern</h4>
                            <p>Basic design perfect for beginners, featuring a symmetrical 3x3 dot grid with curved connecting lines</p>
                        </div>

                        <div className="design-card">
                            <div className="design-visual medium-pattern">
                                <svg viewBox="0 0 200 200">
                                    <defs>
                                        <linearGradient id="mediumGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#7c3aed" />
                                            <stop offset="100%" stopColor="#a855f7" />
                                        </linearGradient>
                                    </defs>
                                    {[...Array(5)].map((_, row) => 
                                        [...Array(5)].map((_, col) => (
                                            <circle
                                                key={`dot-m-${row}-${col}`}
                                                cx={40 + col * 30}
                                                cy={40 + row * 30}
                                                r="2"
                                                fill="url(#mediumGradient)"
                                            />
                                        ))
                                    )}
                                    <circle cx="100" cy="100" r="40" stroke="url(#mediumGradient)" strokeWidth="2" fill="none" />
                                    <circle cx="100" cy="100" r="25" stroke="url(#mediumGradient)" strokeWidth="2" fill="none" />
                                    <path d="M 100 60 L 100 40" stroke="url(#mediumGradient)" strokeWidth="2" />
                                    <path d="M 100 140 L 100 160" stroke="url(#mediumGradient)" strokeWidth="2" />
                                    <path d="M 60 100 L 40 100" stroke="url(#mediumGradient)" strokeWidth="2" />
                                    <path d="M 140 100 L 160 100" stroke="url(#mediumGradient)" strokeWidth="2" />
                                </svg>
                            </div>
                            <h4>Intermediate 5x5 Pattern</h4>
                            <p>More complex design with circular elements and radiating lines, demonstrating advanced symmetry</p>
                        </div>

                        <div className="design-card">
                            <div className="design-visual complex-pattern">
                                <svg viewBox="0 0 200 200">
                                    <defs>
                                        <linearGradient id="complexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#1e3a8a" />
                                            <stop offset="50%" stopColor="#7c3aed" />
                                            <stop offset="100%" stopColor="#a855f7" />
                                        </linearGradient>
                                    </defs>
                                    {[...Array(7)].map((_, row) => 
                                        [...Array(7)].map((_, col) => (
                                            <circle
                                                key={`dot-c-${row}-${col}`}
                                                cx={25 + col * 25}
                                                cy={25 + row * 25}
                                                r="2"
                                                fill="url(#complexGradient)"
                                            />
                                        ))
                                    )}
                                    <path d="M 100 25 L 130 50 L 130 80 L 100 105 L 70 80 L 70 50 Z" stroke="url(#complexGradient)" strokeWidth="2" fill="none" />
                                    <path d="M 100 95 L 150 95 L 175 125 L 150 155 L 100 155 L 75 125 L 100 95 Z" stroke="url(#complexGradient)" strokeWidth="2" fill="none" />
                                    <circle cx="100" cy="100" r="50" stroke="url(#complexGradient)" strokeWidth="1.5" fill="none" opacity="0.5" />
                                </svg>
                            </div>
                            <h4>Complex 7x7 Pattern</h4>
                            <p>Elaborate design featuring multiple geometric shapes and intricate line work for experienced practitioners</p>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="footer">
                <div className="container">
                    <div className="footer-logo">
                        <div className="logo-icon">R</div>
                        <span>Rhythm</span>
                    </div>
                    <p>Where art, symmetry, and tradition move in Rhythm.</p>
                    <p>Celebrating the timeless grace of Kolam through creativity and code.</p>
                </div>
            </footer>
        </>
    );
};

export default PulliKolam;