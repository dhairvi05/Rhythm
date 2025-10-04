import React, { useEffect, useState } from 'react';
import './PadiKolam.css';

const PadiKolam = () => {
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
                        <h1>Kambi Kolam</h1>
                        <p className="hero-subtitle">Steps of Harmony, Drawn in Balance</p>
                        <p className="hero-description">
                            Padi Kolam is a traditional South Indian floor art characterized by straight lines, squares, and geometric symmetry. Unlike flowing loops, it emphasizes order, discipline, and layered precision, often created during rituals and auspicious days.
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
                            <p>Rooted in Tamil Nadu’s temple traditions, Padi Kolams were drawn during important ceremonies and festive days. Their structured designs, resembling temple mandapas (pillared halls), carry influences from Vedic geometry and sacred architecture. They were traditionally drawn with rice flour or limestone, symbolizing both devotion and auspicious beginnings.</p>
                        </div>
                        
                        <div className="content-card">
                            <div className="card-icon">TECHNIQUE</div>
                            <h3>Creating the Pattern</h3>
                            <p>Padi Kolams are made using straight lines and layered squares arranged concentrically. Dots may or may not be used, but the focus is on symmetry and balance. The design often starts with a square or rectangle and expands outward with steps, borders, and repeated shapes—like a mandala in motion. Precision is key, as uneven lines disrupt the harmony of the whole design.</p>
                        </div>
                        
                        <div className="content-card">
                            <div className="card-icon">SYMBOLISM</div>
                            <h3>Deeper Meaning</h3>
                            <p>The concentric squares symbolize layers of consciousness, moving from the outer material world to the spiritual center within. Each step inward reflects the path of meditation and the journey toward inner truth. The symmetry also represents balance in life—between duty and devotion, body and spirit, home and universe.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Significance Tabs Section */}
            <section className="significance">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Understanding Padi Kolam</h2>
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
                                        <p>In traditional households, drawing Padi Kolams was not just an individual act but often a collective one. Women, elders, and even children participated, either by preparing the space, grinding the rice flour, or learning the lines. During weddings and festivals, large groups of women drew grand Padi Kolams together in courtyards or temple entrances, turning it into an event of learning, laughter, and togetherness. This practice ensured cultural continuity and strengthened family and community bonds.</p>
                                    </div>
                                    <div className="significance-item">
                                        <h4>Festive Celebrations</h4>
                                        <p>Padi Kolams hold a special place in festivals like Pongal, Navratri, and temple ceremonies. They are often drawn before placing a kalasham (sacred pot) or lamp, making them central to rituals. In weddings, large and intricate Padi Kolams mark thresholds and ceremonial spaces, inviting auspiciousness. During Margazhi month, devotees decorate temple entrances with expansive Padi Kolams that remain as offerings to deities.</p>
                                    </div>
                                    <div className="significance-item">
                                        <h4>Identity and Pride</h4>
                                        <p>Skill in drawing perfect Padi Kolams is seen as a mark of artistic discipline and devotion. Families take pride in the precision and symmetry of their designs, as it reflects not only aesthetic sense but also respect for tradition. Passing down Padi Kolam knowledge is considered a way of preserving heritage and honoring ancestors who practiced the same art for generations.</p>
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
                                        <p>Placing Padi Kolams at thresholds is deeply symbolic. They act as spiritual protectors, warding off negative energy and inviting blessings from deities. Their architectural symmetry, echoing temple floors and mandalas, is believed to anchor divine vibrations at the doorstep, turning the home into a sacred space.</p>
                                    </div>
                                    <div className="significance-item">
                                        <h4>Meditation in Motion</h4>
                                        <p>The act of creating Padi Kolams requires slow, deliberate movement and mental focus. Each line drawn is an exercise in concentration, and the repetition of squares and steps induces a state of meditative calm. For many women, this practice is a daily ritual of grounding, discipline, and mindfulness—an art form that doubles as a spiritual practice.</p>
                                    </div>
                                    <div className="significance-item">
                                        <h4>Offering to Nature</h4>
                                        <p>Traditionally made with rice flour, Padi Kolams serve as a gift to birds, ants, and other small creatures. This simple act reflects the principle of dharma—living in harmony with nature. By feeding life around them, households symbolically express gratitude for abundance and participate in an eco-friendly practice long before sustainability became a global conversation.</p>
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
                                        <p>The clean lines and symmetry of Padi Kolams make them highly adaptable to modern digital design. They inspire logos, textile motifs, architectural floor patterns, and digital mandalas. In graphic design, they represent balance and structure, while in UI/UX, they serve as metaphors for grids, alignment, and harmony in layouts. Some AI art projects even reinterpret Padi Kolams into generative patterns, bridging tradition with technology.</p>
                                    </div>
                                    <div className="significance-item">
                                        <h4>Educational Tool</h4>
                                        <p>Padi Kolams are widely used as teaching tools in mathematics and design education. They help students understand symmetry, geometry, fractions, ratios, and spatial reasoning. For young learners, practicing these patterns improves motor skills and concentration. By integrating them into modern curricula, schools connect STEM with culture, making learning more engaging.</p>
                                    </div>
                                    <div className="significance-item">
                                        <h4>Global Recognition</h4>
                                        <p>Beyond India, Padi Kolams have been exhibited in international art galleries, cultural festivals, and mathematics conferences. Their blend of simplicity and depth attracts architects, designers, and mathematicians worldwide. Today, they are not only cherished as cultural art but also celebrated as universal symbols of order, discipline, and inner peace.</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Padi Kolam Showcase */}
            <section className="showcase">
              <div className="container">
                <div className="section-header">
                  <h2 className="section-title">Padi Kolam Examples</h2>
                  <p className="section-subtitle">
                    Discover Padi Kolam — structured, step-like geometric patterns built from straight lines and concentric squares, ideal for rituals and formal entrances.
                  </p>
                </div>

                <div className="design-grid">
                  {/* Simple Pattern */}
                  <div className="design-card">
                    <div className="design-visual padi-simple">
                      <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Simple Padi Kolam">
                        <defs>
                          <linearGradient id="padiSimple" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#f59e0b" />
                            <stop offset="100%" stopColor="#ef4444" />
                          </linearGradient>
                        </defs>

                        {/* concentric squares (steps) */}
                        <g stroke="url(#padiSimple)" strokeWidth="2" fill="none" strokeLinejoin="miter">
                          <rect x="60" y="60" width="80" height="80" />
                          <rect x="70" y="70" width="60" height="60" />
                          <rect x="80" y="80" width="40" height="40" />
                          <rect x="90" y="90" width="20" height="20" />
                        </g>

                        {/* small central accent */}
                        <rect x="97" y="97" width="6" height="6" fill="url(#padiSimple)" />
                      </svg>
                    </div>
                    <h4>Simple Padi Steps</h4>
                    <p>Minimal concentric square steps — a tidy and auspicious threshold design for daily use.</p>
                  </div>

                  {/* Intermediate Pattern */}
                  <div className="design-card">
                    <div className="design-visual padi-medium">
                      <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Intermediate Padi Kolam">
                        <defs>
                          <linearGradient id="padiMedium" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#10b981" />
                            <stop offset="100%" stopColor="#3b82f6" />
                          </linearGradient>
                        </defs>

                        {/* outer frame */}
                        <rect x="20" y="20" width="160" height="160" stroke="url(#padiMedium)" strokeWidth="1.6" fill="none" />

                        {/* stepped layers built from alternating line segments */}
                        <g stroke="url(#padiMedium)" strokeWidth="2" fill="none" strokeLinecap="square">
                          <path d="M60 40 L140 40 L140 60 L80 60 L80 80 L120 80 L120 100 L60 100 L60 40 Z" />
                          <path d="M50 120 L130 120 L130 140 L70 140 L70 160" />
                        </g>

                        {/* corner motifs - small squares */}
                        <g fill="url(#padiMedium)">
                          <rect x="28" y="28" width="8" height="8" />
                          <rect x="164" y="28" width="8" height="8" />
                          <rect x="28" y="164" width="8" height="8" />
                          <rect x="164" y="164" width="8" height="8" />
                        </g>

                        {/* subtle dot accents between steps */}
                        <g fill="url(#padiMedium)" opacity="0.9">
                          {[80, 100, 120].map((y, i) =>
                            <circle key={`pm-dot-${i}`} cx="100" cy={y} r="1.6" />
                          )}
                        </g>
                      </svg>
                    </div>
                    <h4>Stepped Frame Padi</h4>
                    <p>Layered terraces and border motifs—structured and ceremonial, ideal for special days and temple entrances.</p>
                  </div>

                  {/* Complex Pattern */}
                  <div className="design-card">
                    <div className="design-visual padi-complex">
                      <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Complex Padi Kolam">
                        <defs>
                          <linearGradient id="padiComplexA" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#7c3aed" />
                            <stop offset="100%" stopColor="#a855f7" />
                          </linearGradient>
                          <linearGradient id="padiComplexB" x1="0%" y1="100%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#f97316" />
                            <stop offset="100%" stopColor="#ef4444" />
                          </linearGradient>
                        </defs>

                        {/* multi-layered concentric padi with alternating stroke styles */}
                        <g transform="translate(100,100)" fill="none" strokeLinecap="square">
                          {/* outer ornamental stepped border */}
                          <path d="M-90 -70 L 90 -70 L 90 70 L -90 70 Z" stroke="url(#padiComplexA)" strokeWidth="1.6" />
                          {/* inner stepped rings (rotated) */}
                          <g stroke="url(#padiComplexB)" strokeWidth="1.8">
                            <path d="M-60 -40 L 60 -40 L 60 40 L -60 40 Z" />
                            <path d="M-40 -20 L 40 -20 L 40 20 L -40 20 Z" />
                            <path d="M-20 -10 L 20 -10 L 20 10 L -20 10 Z" />
                          </g>

                          {/* diagonal step connectors to create a woven grid feel */}
                          <g stroke="url(#padiComplexA)" strokeWidth="1.2">
                            <path d="M-90 -70 L -60 -40 L -30 -10 L 0 20 L 30 50 L 60 70" />
                            <path d="M90 70 L 60 40 L 30 10 L 0 -20 L -30 -50 L -60 -70" />
                          </g>
                        </g>

                        {/* decorative corner ladders (outside canvas) */}
                        <g stroke="url(#padiComplexB)" strokeWidth="1.4" fill="none">
                          <path d="M10 10 L 10 30 L 30 30" />
                          <path d="M190 10 L 190 30 L 170 30" />
                          <path d="M10 190 L 10 170 L 30 170" />
                          <path d="M190 190 L 190 170 L 170 170" />
                        </g>

                        {/* ornamental central square with tiny floral fill */}
                        <g transform="translate(100,100)">
                          <rect x="-12" y="-12" width="24" height="24" stroke="url(#padiComplexA)" strokeWidth="1.4" fill="none" />
                          <g fill="url(#padiComplexB)" transform="translate(-6,-6)">
                            <circle cx="3" cy="3" r="1.6" />
                            <circle cx="15" cy="3" r="1.6" />
                            <circle cx="3" cy="15" r="1.6" />
                            <circle cx="15" cy="15" r="1.6" />
                          </g>
                        </g>
                      </svg>
                    </div>
                    <h4>Ornamental Padi Mandala</h4>
                    <p>Complex concentric padi with border connectors and corner ladders—designed for ceremonial courtyards and grand entrances.</p>
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

export default PadiKolam;