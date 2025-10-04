import React, { useEffect, useState } from 'react';
import './KambiKolam.css';

const KambiKolam = () => {
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
                        <p className="hero-subtitle">Threads of Grace, Woven in Symmetry</p>
                        <p className="hero-description">
                            Kambi Kolam is a traditional South Indian floor art made with a single continuous line looping around dots. Its elegance lies in turning simple geometry into flowing sacred designs that embody grace, patience, and devotion.
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
                            <p>Originating centuries ago, Kambi Kolams were drawn daily at dawn by women in Tamil households as part of cultural and spiritual practices. These patterns reflect the Indian fascination with geometry, balance, and cosmic cycles, and are often linked to temple architecture and ancient yantras.</p>
                        </div>
                        
                        <div className="content-card">
                            <div className="card-icon">TECHNIQUE</div>
                            <h3>Creating the Pattern</h3>
                            <p>Kambi Kolams begin with a dot grid (pulli), around which a continuous line is skillfully drawn. The challenge is to complete the design without lifting the hand or breaking the flow. Some patterns are simple and symmetrical, while others evolve into elaborate, maze-like structures requiring high concentratio.</p>
                        </div>
                        
                        <div className="content-card">
                            <div className="card-icon">SYMBOLISM</div>
                            <h3>Deeper Meaning</h3>
                            <p>The unbroken line mirrors the eternal journey of life, death, and rebirth. Each twist and loop represents resilience, adaptability, and the way everything in the universe is interconnected. It’s a reminder that continuity gives strength, and beauty emerges through discipline and flow.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Significance Tabs Section */}
            <section className="significance">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Understanding Kambi Kolam</h2>
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
                                        <p>Kambi Kolams are more than individual practice—they are community art. Women gather to learn, share, and challenge one another with new designs. Children grow up watching and imitating, creating a chain of learning across generations. During festivals, families decorate entire streets, turning neighborhoods into vibrant, shared canvases that strengthen cultural ties.</p>
                                    </div>
                                    <div className="significance-item">
                                        <h4>Festive Celebrations</h4>
                                        <p>In festivals like Pongal, Margazhi, and temple fairs, Kambi Kolams expand from modest daily patterns to grand, elaborate displays. They are enhanced with colors, flowers, and turmeric, blending art with worship. Their presence heightens the festive atmosphere, signaling joy, prosperity, and reverence for the divine.</p>
                                    </div>
                                    <div className="significance-item">
                                        <h4>Identity and Pride</h4>
                                        <p>For many households, creating complex Kambi Kolams is a matter of cultural pride and honor. Skill in weaving intricate, unbroken designs reflects artistry, discipline, and devotion. They serve as markers of Tamil identity, preserving heritage and giving families a way to express creativity while honoring tradition.</p>
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
                                        <p>Placed at entrances, Kambi Kolams are spiritual guardians. They symbolize auspicious beginnings, welcoming prosperity and divine energy into the home. At the same time, they act as protective barriers, believed to repel negativity and disharmony. The threshold becomes a canvas that bridges the inner and outer worlds.</p>
                                    </div>
                                    <div className="significance-item">
                                        <h4>Meditation in Motion</h4>
                                        <p>The act of drawing an unbroken line around dots requires focus, rhythm, and flow. For practitioners, this becomes a meditative state where the mind slows down, aligning with the movement of the hand. Each curve and loop nurtures patience, clarity, and inner calm—turning an everyday act into a form of mindfulness and self-discipline.</p>
                                    </div>
                                    <div className="significance-item">
                                        <h4>Offering to Nature</h4>
                                        <p>Traditionally drawn with rice flour, Kambi Kolams serve not only as art but also as nourishment for birds, ants, and tiny creatures. In this way, they embody sustainability and compassion, reminding us that human rituals can exist in harmony with the natural world.</p>
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
                                        <p>Modern reinterpretations of Kambi Kolams thrive in digital spaces. Artists use software to generate algorithmic kolams, blending coding with tradition. The patterns inspire graphic design, textile prints, logos, and animations, making them relevant in global creative industries. Through digital art, Kambi Kolams evolve from doorsteps to screens without losing their soul.</p>
                                    </div>
                                    <div className="significance-item">
                                        <h4>Educational Tool</h4>
                                        <p>Kambi Kolams double as playful learning tools. Teachers use them to introduce geometry, symmetry, graph theory, and problem-solving. For children, they become a bridge between cultural heritage and practical learning, combining art with mathematics and encouraging creative thinking.</p>
                                    </div>
                                    <div className="significance-item">
                                        <h4>Global Recognition</h4>
                                        <p>Today, Kambi Kolams are admired far beyond South India. They appear in international art exhibitions, cultural showcases, and academic studies for their mathematical elegance and symbolic depth. Artists, mathematicians, and spiritual seekers alike view them as timeless expressions of India’s fusion of creativity, geometry, and philosophy, giving this humble threshold art global resonance.</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Kambi Kolam Showcase */}
            <section className="showcase">
              <div className="container">
                <div className="section-header">
                  <h2 className="section-title">Kambi Kolam Examples</h2>
                  <p className="section-subtitle">
                    Explore Kambi Kolam — continuous-line patterns that weave around dot grids, from simple loops to intricate labyrinthine weaves.
                  </p>
                </div>

                <div className="design-grid">
                  {/* Simple Pattern */}
                  <div className="design-card">
                    <div className="design-visual kambi-simple">
                      <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Simple Kambi Kolam">
                        <defs>
                          <linearGradient id="kambiSimple" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#06b6d4" />
                            <stop offset="100%" stopColor="#0ea5e9" />
                          </linearGradient>
                        </defs>

                        {/* dot grid 3x3 */}
                        {[...Array(3)].map((_, r) =>
                          [...Array(3)].map((_, c) => (
                            <circle
                              key={`ks-${r}-${c}`}
                              cx={70 + c * 30}
                              cy={70 + r * 30}
                              r="2.8"
                              fill="url(#kambiSimple)"
                            />
                          ))
                        )}

                        {/* continuous single-line weave (simple) */}
                        <path
                          d="M 70 85 C 85 60, 115 60, 130 85
                             C 145 110, 115 130, 100 115
                             C 85 100, 55 100, 70 85 Z"
                          stroke="url(#kambiSimple)" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <h4>Simple Continuous Weave</h4>
                    <p>A minimal Kambi Kolam using a 3×3 pulli (dot) grid and a single flowing line — great for daily practice.</p>
                  </div>

                  {/* Intermediate Pattern */}
                  <div className="design-card">
                    <div className="design-visual kambi-medium">
                      <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Intermediate Kambi Kolam">
                        <defs>
                          <linearGradient id="kambiMedium" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#f97316" />
                            <stop offset="100%" stopColor="#f43f5e" />
                          </linearGradient>
                        </defs>

                        {/* dot grid 5x5 */}
                        {[...Array(5)].map((_, r) =>
                          [...Array(5)].map((_, c) => (
                            <circle
                              key={`km-${r}-${c}`}
                              cx={30 + c * 30}
                              cy={30 + r * 30}
                              r="1.9"
                              fill="url(#kambiMedium)"
                            />
                          ))
                        )}

                        {/* continuous unbroken path weaving around dots */}
                        <path
                          d="M30 90
                             C50 60, 80 40, 110 60
                             C140 80, 160 50, 130 40
                             C110 30, 90 50, 70 70
                             C50 90, 70 120, 100 110
                             C130 100, 150 130, 120 150
                             C90 170, 60 150, 30 130"
                          stroke="url(#kambiMedium)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <h4>Intermediate Loop Network</h4>
                    <p>An extended single-line kolam around a 5×5 pulli grid — introduces interlacing loops and subtle crossings.</p>
                  </div>

                  {/* Complex Pattern */}
                  <div className="design-card">
                    <div className="design-visual kambi-complex">
                      <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Complex Kambi Kolam">
                        <defs>
                          <linearGradient id="kambiComplexA" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#7c3aed" />
                            <stop offset="50%" stopColor="#a855f7" />
                            <stop offset="100%" stopColor="#f472b6" />
                          </linearGradient>
                          <linearGradient id="kambiComplexB" x1="0%" y1="100%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#34d399" />
                            <stop offset="100%" stopColor="#06b6d4" />
                          </linearGradient>
                        </defs>

                        {/* dense dot grid 7x7 */}
                        {[...Array(7)].map((_, r) =>
                          [...Array(7)].map((_, c) => (
                            <circle
                              key={`kc-${r}-${c}`}
                              cx={18 + c * 24}
                              cy={18 + r * 24}
                              r="1.2"
                              fill={ (r + c) % 2 === 0 ? "url(#kambiComplexA)" : "url(#kambiComplexB)" }
                            />
                          ))
                        )}

                        {/* intricate continuous path that loops and knots */}
                        <path
                          d="M18 90
                             C40 40, 80 20, 110 50
                             C140 80, 170 40, 150 20
                             C130 0, 100 20, 80 40
                             C60 60, 40 90, 60 110
                             C85 135, 120 120, 140 100
                             C160 80, 150 60, 130 50
                             C110 40, 90 60, 70 80
                             C50 100, 30 120, 18 90 Z"
                          stroke="url(#kambiComplexA)" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"
                        />

                        {/* secondary thinner weave overlay to suggest interlacing */}
                        <path
                          d="M40 30 C70 50, 110 30, 140 50 C170 70, 150 100, 120 120 C90 140, 60 130, 40 110"
                          stroke="url(#kambiComplexB)" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.95"
                        />
                      </svg>
                    </div>
                    <h4>Complex Knotted Kambi Kolam</h4>
                    <p>Advanced single-line kolam over a 7×7 pulli grid with knotted loops and overlapping weaves — suited for ceremonial displays and competitions.</p>
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

export default KambiKolam;