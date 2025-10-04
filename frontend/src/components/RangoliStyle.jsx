import React, { useEffect, useState } from 'react';
import './RangoliStyle.css';

const RangoliStyle = () => {
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
                        <h1>Rangoli Style</h1>
                        <p className="hero-subtitle">Colors of Culture and Celebration</p>
                        <p className="hero-description">
                            Rangoli is a vibrant art form drawn on the ground using colored powders, flowers, or rice, symbolizing joy, beauty, and auspiciousness. It blends creativity with tradition, brightening homes and festive spaces.
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
                            <p>Rangoli has been practiced for thousands of years across India, with references in the Chitralakshana, one of the oldest texts on painting. Each region developed its own variations, from Tamil Nadu’s Kolam to Maharashtra’s Rangavalli. Historically, it marked both sacred occasions and everyday rituals, representing continuity of culture.</p>
                        </div>
                        
                        <div className="content-card">
                            <div className="card-icon">TECHNIQUE</div>
                            <h3>Creating the Pattern</h3>
                            <p>Rangoli is drawn freehand or with stencils, beginning with dots, grids, or circles. Designs expand with curves, symmetry, and motifs like lotuses, peacocks, or deities. Materials include rice flour for simplicity, bright powders for festivals, and flowers for weddings. The process is as important as the result—patience, focus, and flow shape the beauty.</p>
                        </div>
                        
                        <div className="content-card">
                            <div className="card-icon">SYMBOLISM</div>
                            <h3>Deeper Meaning</h3>
                            <p>Rangoli is more than decoration—it reflects the cosmic cycle of life, prosperity, and harmony. Its impermanence teaches detachment and renewal, reminding us that beauty lies in both creation and dissolution. Every color carries meaning: red for strength, yellow for prosperity, green for growth, and white for purity.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Significance Tabs Section */}
            <section className="significance">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Understanding Rangoli Style</h2>
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
                                        <p>Families and communities gather to make Rangoli, turning it into a collective ritual of sharing creativity and knowledge. Elders guide while children learn patterns, ensuring traditions continue. In villages, competitions and group Rangoli events foster unity and celebrate collective spirit.</p>
                                    </div>
                                    <div className="significance-item">
                                        <h4>Festive Celebrations</h4>
                                        <p>During Diwali, houses glow with Rangoli lit by diyas. Pongal and Sankranti see farmers decorate yards to thank nature, while weddings feature grand floral Rangoli symbolizing auspicious beginnings. Festivals give Rangoli its most elaborate, colorful, and joyous expressions, becoming the centerpiece of celebration.</p>
                                    </div>
                                    <div className="significance-item">
                                        <h4>Identity and Pride</h4>
                                        <p>Rangoli reflects regional diversity—Kolam in Tamil Nadu, Muggulu in Andhra, Mandana in Rajasthan, and Chowk Purna in Madhya Pradesh. Each carries distinct motifs and styles, allowing families to express cultural pride and individuality. It becomes both a signature of tradition and a personal creative identity.</p>
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
                                        <p>The doorway is not just a physical entrance but a spiritual boundary. Rangoli placed here acts as a sacred marker, welcoming Lakshmi, the goddess of wealth, while keeping away evil spirits. It transforms an ordinary threshold into a blessed space, reminding those entering the home that beauty, harmony, and positive energy await inside. The first step over Rangoli is symbolic—crossing into a realm of protection and prosperity.</p>
                                    </div>
                                    <div className="significance-item">
                                        <h4>Meditation in Motion</h4>
                                        <p>The act of drawing Rangoli is a meditative practice. Each line demands balance, patience, and presence of mind. The repetitive motions calm the nervous system, much like chanting or breathing exercises in yoga. For many women, especially in rural India, drawing Rangoli at dawn is not just a ritual but a grounding activity that aligns the mind before the day begins. It embodies mindfulness long before the term became globally popular.</p>
                                    </div>
                                    <div className="significance-item">
                                        <h4>Offering to Nature</h4>
                                        <p>Rangoli originated with eco-consciousness. Rice flour was deliberately used to feed ants, birds, and insects—making art an offering to nature. Similarly, flower petals and turmeric not only beautified the design but also had ecological and medicinal value. This act acknowledged the interconnectedness of life and subtly reinforced the principle of Ahimsa (non-violence) by sharing sustenance with other beings.</p>
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
                                        <p>In modern times, Rangoli has entered the digital sphere. Artists create Rangoli-inspired mandalas for apps, AR filters for festivals, and even NFT art inspired by Rangoli geometry. Graphic designers use its symmetry in logos, textile prints, and branding. Rangoli has also become a cultural export—used in stage backdrops, international Diwali campaigns, and global design competitions, showing how tradition adapts to technology.</p>
                                    </div>
                                    <div className="significance-item">
                                        <h4>Educational Tool</h4>
                                        <p>Rangoli has gained global admiration as a symbol of Indian creativity. It is now a central feature of Diwali celebrations in London, New York, and Singapore. Universities, embassies, and cultural centers showcase Rangoli at events, highlighting its universal appeal. Art festivals abroad have embraced Rangoli as both performance art and installation, where its ephemeral beauty resonates with global audiences. It has come to represent not only Indian tradition but also a shared human love for art, color, and community.</p>
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

            {/* Rangoli Showcase */}
            <section className="showcase">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Rangoli Examples</h2>
                        <p className="section-subtitle">
                          Explore Rangoli from quick geometric layouts to elaborate floral and pictorial compositions — perfect for festivals, weddings, and community events.
                        </p>
                    </div>
                    <div className="design-grid">
                        {/* Simple Pattern */}
                        <div className="design-card">
                          <div className="design-visual rangoli-simple">
                            <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Simple Rangoli">
                              <defs>
                                <linearGradient id="rangoliSimple" x1="0%" y1="0%" x2="100%" y2="100%">
                                  <stop offset="0%" stopColor="#fbbf24" />
                                  <stop offset="100%" stopColor="#f97316" />
                                </linearGradient>
                              </defs>

                              {/* center dot */}
                              <circle cx="100" cy="100" r="4" fill="url(#rangoliSimple)" />

                              {/* simple radial diamond petals */}
                              <g stroke="url(#rangoliSimple)" strokeWidth="2" fill="none">
                                <path d="M100 30 L115 80 L165 95 L115 110 L100 160 L85 110 L35 95 L85 80 Z" />
                              </g>

                              {/* corner accents */}
                              <g fill="url(#rangoliSimple)" opacity="0.85">
                                <circle cx="30" cy="30" r="3" />
                                <circle cx="170" cy="30" r="3" />
                                <circle cx="30" cy="170" r="3" />
                                <circle cx="170" cy="170" r="3" />
                              </g>
                            </svg>
                          </div>
                          <h4>Simple Symmetric Rangoli</h4>
                          <p>Quick, geometric radial pattern using bold diamond petals — ideal for beginners and daily decor.</p>
                        </div>

                        {/* Intermediate Pattern */}
                        <div className="design-card">
                          <div className="design-visual rangoli-medium">
                            <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Intermediate Rangoli">
                              <defs>
                                <linearGradient id="rangoliMedium" x1="0%" y1="0%" x2="100%" y2="100%">
                                  <stop offset="0%" stopColor="#06b6d4" />
                                  <stop offset="100%" stopColor="#7c3aed" />
                                </linearGradient>
                              </defs>

                              {/* central lotus-like motif */}
                              <g transform="translate(100,100)" stroke="url(#rangoliMedium)" strokeWidth="1.8" fill="none">
                                {/* petals */}
                                <path d="M0 -36 C18 -36, 30 -10, 0 0 C-30 -10, -18 -36, 0 -36 Z" />
                                <g transform="rotate(45)">
                                  <path d="M0 -36 C18 -36, 30 -10, 0 0 C-30 -10, -18 -36, 0 -36 Z" />
                                </g>
                                <g transform="rotate(90)">
                                  <path d="M0 -36 C18 -36, 30 -10, 0 0 C-30 -10, -18 -36, 0 -36 Z" />
                                </g>
                                <g transform="rotate(135)">
                                  <path d="M0 -36 C18 -36, 30 -10, 0 0 C-30 -10, -18 -36, 0 -36 Z" />
                                </g>

                                {/* inner circle */}
                                <circle cx="0" cy="0" r="8" stroke="url(#rangoliMedium)" strokeWidth="2" fill="url(#rangoliMedium)" opacity="0.9" />
                              </g>

                              {/* outer ornamental arcs */}
                              <g stroke="url(#rangoliMedium)" strokeWidth="1.4" fill="none" opacity="0.95">
                                <path d="M40 100 A60 60 0 0 1 160 100" />
                                <path d="M55 70 A45 45 0 0 1 145 130" />
                              </g>

                              {/* small colored dots for texture */}
                              <g fill="url(#rangoliMedium)">
                                {[40, 70, 100, 130, 160].map((x, i) =>
                                  <circle key={`md-${i}`} cx={x} cy={40 + (i % 2) * 120 / 4} r="2" />
                                )}
                              </g>
                            </svg>
                          </div>
                          <h4>Floral & Ornamental Rangoli</h4>
                          <p>Lotus-inspired central motif with layered arcs — blends floral aesthetics and symmetry for festive displays.</p>
                        </div>

                        {/* Complex Pattern */}
                        <div className="design-card">
                          <div className="design-visual rangoli-complex">
                            <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Complex Rangoli">
                              <defs>
                                <linearGradient id="rangoliComplexA" x1="0%" y1="0%" x2="100%" y2="100%">
                                  <stop offset="0%" stopColor="#ef4444" />
                                  <stop offset="50%" stopColor="#f59e0b" />
                                  <stop offset="100%" stopColor="#a78bfa" />
                                </linearGradient>
                                <linearGradient id="rangoliComplexB" x1="0%" y1="100%" x2="100%" y2="0%">
                                  <stop offset="0%" stopColor="#34d399" />
                                  <stop offset="100%" stopColor="#06b6d4" />
                                </linearGradient>
                              </defs>

                              {/* large concentric mandala */}
                              <g transform="translate(100,100)" fill="none" strokeWidth="1.6" stroke="url(#rangoliComplexA)">
                                <circle r="62" />
                                <circle r="46" />
                                <circle r="28" />
                              </g>

                              {/* layered petal rings */}
                              <g transform="translate(100,100)" stroke="url(#rangoliComplexB)" strokeWidth="1.2" fill="none" opacity="0.95">
                                {Array.from({ length: 16 }).map((_, i) => {
                                  const angle = (i / 16) * 360;
                                  const x1 = 100 + Math.cos((angle - 90) * Math.PI / 180) * 62;
                                  const y1 = 100 + Math.sin((angle - 90) * Math.PI / 180) * 62;
                                  return (
                                    <path
                                      key={`petal-${i}`}
                                      d={`M 100 100 L ${x1} ${y1} C ${100 + Math.cos((angle - 80) * Math.PI / 180) * 82} ${100 + Math.sin((angle - 80) * Math.PI / 180) * 82}, ${100 + Math.cos((angle - 100) * Math.PI / 180) * 82} ${100 + Math.sin((angle - 100) * Math.PI / 180) * 82}, ${100 + Math.cos((angle - 90) * Math.PI / 180) * 62} ${100 + Math.sin((angle - 90) * Math.PI / 180) * 62}`}
                                      fill="none"
                                    />
                                  );
                                })}
                              </g>

                              {/* intricate border motifs around canvas */}
                              <g stroke="url(#rangoliComplexA)" strokeWidth="1" fill="none">
                                <path d="M10 100 C30 60, 60 30, 100 30 C140 30, 170 60, 190 100 C170 140, 140 170, 100 170 C60 170, 30 140, 10 100 Z" />
                              </g>

                              {/* decorative flower clusters (pookalam influence) */}
                              <g fill="url(#rangoliComplexB)" opacity="0.95">
                                <circle cx="100" cy="30" r="6" />
                                <circle cx="140" cy="60" r="5" />
                                <circle cx="160" cy="110" r="5.2" />
                                <circle cx="120" cy="150" r="6.2" />
                                <circle cx="60" cy="150" r="5.6" />
                                <circle cx="30" cy="110" r="5" />
                                <circle cx="60" cy="60" r="5.4" />
                              </g>
                            </svg>
                          </div>
                          <h4>Complex Mandala & Pictorial Rangoli</h4>
                          <p>Concentric mandala with layered petals, border motifs, and floral clusters — suited for grand festivals, competitions, or ceremonial entrances.</p>
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

export default RangoliStyle;