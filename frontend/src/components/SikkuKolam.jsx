import React, { useEffect, useState } from 'react';
import './SikkuKolam.css';

const SikkuKolam = () => {
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
                        <h1>Sikku Kolam</h1>
                        <p className="hero-subtitle">The Art of Endless Knots</p>
                        <p className="hero-description">
                            Sikku Kolam, also called Chikku Kolam, is a traditional South Indian pattern drawn using a single continuous line that weaves around dots to form intricate knot-like designs. It symbolizes infinity, interconnectedness, and the unbroken cycle of life.
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
                            <p>This tradition was not merely decorative — it carried deep cultural and spiritual significance. The act of drawing kolams was believed to invite prosperity, keep away negative energy, and feed tiny creatures like ants and birds with the rice flour, symbolizing harmony with nature. Over time, Sikku Kolam became a hallmark of discipline, concentration, and creativity, passed down through generations as an essential part of everyday life.</p>
                        </div>
                        
                        <div className="content-card">
                            <div className="card-icon">TECHNIQUE</div>
                            <h3>Creating the Pattern</h3>
                            <p>The artist first arranges a grid of dots on the ground, typically in even numbers to maintain symmetry.
                               A single line is then drawn to curve and loop around these dots in a flowing manner, without lifting the hand.
                               The curves crisscross and interlock like knots, creating mesmerizing patterns that appear simple yet hold intricate mathematical balance.
                               While small and simple designs are made for everyday rituals, larger and more elaborate kolams are drawn during festivals, weddings, and special occasions.
                            </p>
                        </div>
                        
                        <div className="content-card">
                            <div className="card-icon">SYMBOLISM</div>
                            <h3>Deeper Meaning</h3>
                            <p>Sikku Kolam is more than just an artistic design; it represents a profound philosophy of life. The continuous, unbroken line reflects the journey of existence — bending, twisting, and looping, yet always moving forward without abrupt endings. Each curve connects seamlessly with the next, symbolizing the unity and interconnection of all beings and events in the universe. The very act of drawing a Sikku Kolam demands patience, precision, and mindfulness, turning the process into a meditative practice that disciplines the mind and calms the soul.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Significance Tabs Section */}
            <section className="significance">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Understanding Sikku Kolam</h2>
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
                                        <p>Sikku Kolam is often drawn in the early mornings, where women of the household or neighborhood come together, share designs, and exchange ideas. This daily ritual fosters connection, strengthens community ties, and passes cultural knowledge from one generation to the next.</p>
                                    </div>
                                    <div className="significance-item">
                                        <h4>Festive Celebrations</h4>
                                        <p>During festivals and special occasions, Sikku Kolams become larger and more intricate, adorning courtyards and temple entrances. They are considered auspicious, welcoming prosperity, and enhancing the festive spirit with beauty and sacred symbolism.</p>
                                    </div>
                                    <div className="significance-item">
                                        <h4>Identity and Pride</h4>
                                        <p>For many families, Sikku Kolam is a source of cultural identity and pride, representing discipline, creativity, and continuity of tradition. Mastering complex patterns reflects both personal skill and respect for heritage, making it a cherished emblem of Tamil culture.</p>
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
                                        <p>Sikku Kolam is traditionally drawn at the threshold of homes, marking the entrance as a sacred space. It is believed to purify the doorway, invite prosperity, and protect the household from negative forces. The knots act like symbolic barriers, allowing only positive energy to pass through.</p>
                                    </div>
                                    <div className="significance-item">
                                        <h4>Meditation in Motion</h4>
                                        <p>The act of creating Sikku Kolam is often described as meditative. The continuous looping line requires deep concentration and rhythm, quieting the mind while keeping the hand in steady motion. For many, this daily practice is a form of mindfulness that nurtures inner calm and discipline.</p>
                                    </div>
                                    <div className="significance-item">
                                        <h4>Offering to Nature</h4>
                                        <p>Originally drawn with rice flour, Sikku Kolam served as a humble offering to nature. Birds, ants, and small creatures would feed on it, reflecting a spirit of coexistence and gratitude. This simple act of sharing sustenance connected households with the natural world in a cycle of giving.</p>
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
                                        <p>In the modern era, Sikku Kolam has inspired digital creators and designers worldwide. Its looping patterns and geometric symmetry are being adapted into graphic design, animations, fashion prints, and even architectural motifs. With software and apps, traditional kolams are reimagined in vibrant colors and interactive formats, bridging heritage with contemporary aesthetics.</p>
                                    </div>
                                    <div className="significance-item">
                                        <h4>Educational Tool</h4>
                                        <p>Sikku Kolam is increasingly used as a learning aid in classrooms to teach concepts of mathematics, symmetry, and logical reasoning. The patterns resemble puzzles, encouraging problem-solving, hand-eye coordination, and creativity in children. As an educational tool, it merges cultural tradition with practical skills, making learning both engaging and meaningful.</p>
                                    </div>
                                    <div className="significance-item">
                                        <h4>Global Recognition</h4>
                                        <p>Once confined to South Indian households, Sikku Kolam is now gaining recognition on the global stage. Exhibitions, cultural festivals, and research studies highlight its artistic and mathematical brilliance. From UNESCO acknowledgments of kolam traditions to workshops conducted abroad, Sikku Kolam has become a symbol of India’s rich cultural identity celebrated worldwide.</p>
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
                        <h2 className="section-title">Sikku Kolam Examples</h2>
                        <p className="section-subtitle">Discover the elegance of continuous-line Sikku Kolam, from basic loops to intricate knot-like patterns</p>
                    </div>
                    <div className="design-grid">
                        {/* Simple Pattern */}
                        <div className="design-card">
                            <div className="design-visual sikku-simple">
                                <svg viewBox="0 0 200 200">
                                    <defs>
                                        <linearGradient id="sikkuSimple" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#1e3a8a" />
                                            <stop offset="100%" stopColor="#7c3aed" />
                                        </linearGradient>
                                    </defs>
                                    {/* Dots */}
                                    {[...Array(4)].map((_, row) =>
                                    [...Array(4)].map((_, col) => (
                                    <circle
                                    key={`s-${row}-${col}`}
                                    cx={50 + col * 30}
                                    cy={50 + row * 30}
                                    r="2.5"
                                    fill="url(#sikkuSimple)"
                                    />
                                    ))
                                  )}
                                 {/* Continuous looping line */}
                                 <path
                                 d="M 50 50 Q 65 40, 80 50 Q 95 60, 110 50 Q 125 40, 140 50
                                    Q 155 60, 140 80 Q 125 100, 110 80 Q 95 60, 80 80
                                    Q 65 100, 50 80 Q 35 60, 50 50 Z"
                                    stroke="url(#sikkuSimple)" strokeWidth="2" fill="none"/>
                                </svg>
                            </div>
                            <h4>Simple Loop Pattern</h4>
                            <p>A beginner-friendly Sikku Kolam using a 4x4 dot grid with a single looping curve.</p>
                        </div>
                        {/* Intermediate Pattern */}
                        <div className="design-card">
                            <div className="design-visual sikku-medium">
                                <svg viewBox="0 0 200 200">
                                    <defs>
                                        <linearGradient id="sikkuMedium" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#7c3aed" />
                                            <stop offset="100%" stopColor="#a855f7" />
                                        </linearGradient>
                                    </defs>
                                    {/* Dots */}
                                    {[...Array(5)].map((_, row) =>
                                    [...Array(5)].map((_, col) => (
                                    <circle
                                    key={`m-${row}-${col}`}
                                    cx={40 + col * 30}
                                    cy={40 + row * 30}
                                    r="2"
                                    fill="url(#sikkuMedium)"
                                    />
                                    ))
                                    )}
                                    {/* Knot-like loops */}
                                    <path
                                      d="M 40 70 Q 70 40, 100 70 Q 130 100, 160 70
                                         Q 190 40, 160 100 Q 130 160, 100 130
                                         Q 70 100, 40 130 Q 10 160, 40 70 Z"
                                      stroke="url(#sikkuMedium)" strokeWidth="2" fill="none"
                                    />
                                </svg>
                            </div>
                            <h4>Intermediate Knot Pattern</h4>
                            <p>An elegant Sikku Kolam with interlacing curves symbolizing unity and flow.</p>
                        </div>
                        {/* Complex Pattern */}
                        <div className="design-card">
                          <div className="design-visual sikku-complex">
                            <svg viewBox="0 0 200 200">
                              <defs>
                                <linearGradient id="sikkuComplex" x1="0%" y1="0%" x2="100%" y2="100%">
                                  <stop offset="0%" stopColor="#1e3a8a" />
                                  <stop offset="50%" stopColor="#7c3aed" />
                                  <stop offset="100%" stopColor="#a855f7" />
                                </linearGradient>
                              </defs>
                              {/* Dots */}
                              {[...Array(7)].map((_, row) =>
                                [...Array(7)].map((_, col) => (
                                  <circle
                                    key={`c-${row}-${col}`}
                                    cx={25 + col * 25}
                                    cy={25 + row * 25}
                                    r="1.8"
                                    fill="url(#sikkuComplex)"
                                  />
                                ))
                                )}
                                {/* Intricate intertwined pattern */}
                                <path
                                d="M 25 100 Q 60 40, 100 100 Q 140 160, 175 100
                                   Q 140 40, 100 100 Q 60 160, 25 100 Z"
                                stroke="url(#sikkuComplex)" strokeWidth="2" fill="none"
                                />
                                <circle cx="100" cy="100" r="50" stroke="url(#sikkuComplex)" strokeWidth="1.5" fill="none" />
                            </svg>
                        </div>
                        <h4>Complex Intertwined Pattern</h4>
                        <p>A sophisticated design with multiple overlapping loops, ideal for advanced practitioners.</p>
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

export default SikkuKolam;