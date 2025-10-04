import React, { useEffect, useState } from 'react';
import './MargazhiKolam.css';

const MargazhiKolam = () => {
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
                        <h1>Margazhi Kolam</h1>
                        <p className="hero-subtitle">Patterns of Devotion and Dawn</p>
                        <p className="hero-description">
                            Margazhi Kolam is a sacred Tamil tradition of drawing intricate patterns at dawn during the month of Margazhi. Made with rice flour, they symbolize devotion, harmony with nature, and cultural pride, while also bringing communities together in celebration.
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
                            <p>The tradition of drawing Margazhi Kolam dates back centuries in Tamil Nadu. Rooted in agrarian culture, it was a way of celebrating abundance, inviting prosperity, and expressing devotion during the sacred month of Margazhi. Ancient texts and temple traditions highlight kolams as both ritualistic and artistic practices, symbolizing harmony between humans, nature, and the divine.</p>
                        </div>
                        
                        <div className="content-card">
                            <div className="card-icon">TECHNIQUE</div>
                            <h3>Creating the Pattern</h3>
                            <p>Margazhi Kolams are usually larger and more elaborate than daily kolams. Drawn with rice flour or chalk powder, they begin with a grid of dots (pulli) or freehand outlines. Artists then weave curves, lines, and motifs — often inspired by flowers, deities, or geometric symmetry. The act is performed at dawn, when the air is fresh, the streets quiet, and devotion at its peak.</p>
                        </div>
                        
                        <div className="content-card">
                            <div className="card-icon">SYMBOLISM</div>
                            <h3>Deeper Meaning</h3>
                            <p>Beyond their beauty, Margazhi Kolams carry layered significance. They serve as spiritual offerings, welcoming divine energy into the home. They also embody mindfulness, as the repetitive motions cultivate patience and focus. And, at a deeper level, they reflect values of generosity, since rice flour kolams feed birds and insects — a reminder that every act of beauty can also be an act of giving.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Significance Tabs Section */}
            <section className="significance">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Understanding Margazhi Kolam</h2>
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
                                        <p>Margazhi Kolam is not just an individual act — it’s a collective experience. In many neighborhoods, women and girls gather early in the morning to draw kolams together, exchanging designs, techniques, and stories. This daily practice fosters community ties, turning streets into shared creative canvases and strengthening social harmony.</p>
                                    </div>
                                    <div className="significance-item">
                                        <h4>Festive Celebrations</h4>
                                        <p>The month of Margazhi is deeply tied to devotion and music, especially with the Andal Tiruppavai and the December Music Season in Tamil Nadu. Kolams drawn during this time often reflect the festive spirit — larger, more intricate, and adorned with lamps or flowers. They transform homes and streets into vibrant spaces of celebration, marking the season as one of both art and devotion.</p>
                                    </div>
                                    <div className="significance-item">
                                        <h4>Identity and Pride</h4>
                                        <p>For Tamil households, Margazhi Kolam is a marker of cultural identity and heritage. Creating elaborate kolams during this month is a way of honoring ancestors, preserving tradition, and showcasing artistic skill. For many, it is also a matter of pride — a visible declaration of belonging to a living, evolving cultural practice that continues to inspire generations.</p>
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
                                        <p>Margazhi Kolam is more than decoration — it marks the doorway as sacred. Drawn daily at the entrance, it becomes a spiritual threshold that welcomes prosperity, positivity, and divine energy into the home. Especially in the Margazhi month, when devotion to Vishnu and Andal is celebrated, these kolams turn thresholds into spaces of sanctity and prayer.</p>
                                    </div>
                                    <div className="significance-item">
                                        <h4>Meditation in Motion</h4>
                                        <p>For the one who draws it, Margazhi Kolam is a mindful practice. Rising before sunrise, preparing the surface, and creating intricate patterns day after day transforms the act into meditation. Each curve and dot demands focus, patience, and rhythm — calming the mind and connecting the individual to something larger than themselves.</p>
                                    </div>
                                    <div className="significance-item">
                                        <h4>Offering to Nature</h4>
                                        <p>Traditionally, Margazhi Kolams are made with rice flour, not just for aesthetic value but as a humble offering. Birds, ants, and other tiny creatures feed on it, making the kolam an ecological gesture of coexistence. It reflects an ingrained philosophy: beauty should not only please humans but also nourish the environment.</p>
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
                                        <p>Margazhi Kolam, traditionally drawn during the Tamil month of Margazhi, is finding new expression in the digital age. Its seasonal, festival-centric motifs inspire designers to create digital wallpapers, greeting cards, website elements, and even NFT art collections. With tools like Procreate, Illustrator, and 3D modeling software, Margazhi Kolams are transformed into contemporary design assets while preserving their festive charm.</p>
                                    </div>
                                    <div className="significance-item">
                                        <h4>Educational Tool</h4>
                                        <p>Beyond being a ritual, Margazhi Kolam is also a medium of learning. Schools and cultural organizations use it to introduce children to symmetry, proportion, and cultural heritage. Through workshops and digital tutorials, learners practice both hand drawing and computer-aided kolam design, gaining mathematical reasoning skills while staying rooted in tradition.</p>
                                    </div>
                                    <div className="significance-item">
                                        <h4>Global Recognition</h4>
                                        <p>Once limited to South Indian homes during the Margazhi month, this kolam tradition now enjoys international recognition. Cultural festivals abroad showcase Margazhi Kolam as a unique blend of spirituality, art, and community bonding. Social media platforms amplify its reach, while diaspora communities adapt the practice in innovative formats, ensuring the tradition continues to thrive across the globe.</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Margazhi Kolam Showcase */}
            <section className="showcase">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Margazhi Kolam Examples</h2>
                        <p className="section-subtitle">Celebrate the festive spirit with daily Margazhi Kolam, from simple geometric lines to elaborate floral motifs</p>
                    </div>
                    <div className="design-grid">
                        {/* Simple Pattern */}
                        <div className="design-card">
                            <div className="design-visual margazhi-simple">
                                <svg viewBox="0 0 200 200">
                                    <defs>
                                        <linearGradient id="margazhiSimple" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#f59e0b" />
                                            <stop offset="100%" stopColor="#ef4444" />
                                        </linearGradient>
                                    </defs>
                                    {/* Basic grid dots */}
                                    {[...Array(5)].map((_, row) =>
                                        [...Array(5)].map((_, col) => (
                                            <circle
                                                key={`ms-${row}-${col}`}
                                                cx={40 + col * 30}
                                                cy={40 + row * 30}
                                                r="2.5"
                                                fill="url(#margazhiSimple)"
                                            />
                                        ))
                                    )}
                                    {/* Simple geometric line */}
                                    <path
                                        d="M 40 40 L 160 40 L 160 160 L 40 160 Z"
                                        stroke="url(#margazhiSimple)" strokeWidth="2" fill="none"
                                    />
                                </svg>
                            </div>
                            <h4>Simple Geometric Pattern</h4>
                            <p>A beginner-friendly Margazhi Kolam with symmetrical squares and straight lines.</p>
                        </div>

                        {/* Intermediate Pattern */}
                        <div className="design-card">
                            <div className="design-visual margazhi-medium">
                                <svg viewBox="0 0 200 200">
                                    <defs>
                                        <linearGradient id="margazhiMedium" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#10b981" />
                                            <stop offset="100%" stopColor="#3b82f6" />
                                        </linearGradient>
                                    </defs>
                                    {/* Dots */}
                                    {[...Array(6)].map((_, row) =>
                                        [...Array(6)].map((_, col) => (
                                            <circle
                                                key={`mm-${row}-${col}`}
                                                cx={30 + col * 30}
                                                cy={30 + row * 30}
                                                r="2"
                                                fill="url(#margazhiMedium)"
                                            />
                                        ))
                                    )}
                                    {/* Floral motif lines */}
                                    <path
                                        d="M 30 90 Q 60 30, 90 90 Q 120 150, 150 90 Q 180 30, 150 150 Q 120 90, 90 150 Q 60 90, 30 150 Z"
                                        stroke="url(#margazhiMedium)" strokeWidth="2" fill="none"
                                    />
                                </svg>
                            </div>
                            <h4>Intermediate Floral Pattern</h4>
                            <p>An elegant Margazhi Kolam featuring petal-like curves and radial symmetry.</p>
                        </div>

                        {/* Complex Pattern */}
                        <div className="design-card">
                            <div className="design-visual margazhi-complex">
                                <svg viewBox="0 0 200 200">
                                    <defs>
                                        <linearGradient id="margazhiComplex" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#f43f5e" />
                                            <stop offset="50%" stopColor="#f97316" />
                                            <stop offset="100%" stopColor="#8b5cf6" />
                                        </linearGradient>
                                    </defs>
                                    {/* Dots */}
                                    {[...Array(8)].map((_, row) =>
                                        [...Array(8)].map((_, col) => (
                                            <circle
                                                key={`mc-${row}-${col}`}
                                                cx={20 + col * 22}
                                                cy={20 + row * 22}
                                                r="1.8"
                                                fill="url(#margazhiComplex)"
                                            />
                                        ))
                                    )}
                                    {/* Complex intertwined floral and circular motifs */}
                                    <path
                                        d="M 20 100 Q 60 20, 100 100 Q 140 180, 180 100 Q 140 20, 100 100 Q 60 180, 20 100 Z"
                                        stroke="url(#margazhiComplex)" strokeWidth="2" fill="none"
                                    />
                                    <circle cx="100" cy="100" r="50" stroke="url(#margazhiComplex)" strokeWidth="1.5" fill="none" />
                                </svg>
                            </div>
                            <h4>Complex Intertwined Motif</h4>
                            <p>A detailed Margazhi Kolam with overlapping petals and concentric patterns, ideal for advanced practitioners.</p>
                        </div>
                    </div>
                </div>
            </section>


            <footer className="footer">
                <div className="container">
                    <div className="footer-logo">
                        <div className="logo-icon">K</div>
                        <span>Kolam Art</span>
                    </div>
                    <p>Preserving and celebrating the sacred art of Kolam for future generations</p>
                    <p>Experience the beauty of traditional Indian floor patterns</p>
                </div>
            </footer>
        </>
    );
};

export default MargazhiKolam;