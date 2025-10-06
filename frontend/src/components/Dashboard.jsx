import React, { useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom'
import './Dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Navbar scroll effect
        const handleScroll = () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.9)';
                navbar.style.boxShadow = 'none';
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
        document.querySelectorAll('.feature-card, .type-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });

        // Add sparkle effect to hero section
        const createSparkle = () => {
            const hero = document.querySelector('.dashboard .hero');
            if (!hero) return;
            
            const sparkle = document.createElement('div');
            sparkle.style.position = 'absolute';
            sparkle.style.width = '4px';
            sparkle.style.height = '4px';
            sparkle.style.background = '#a855f7';
            sparkle.style.borderRadius = '50%';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.animation = 'sparkle 2s ease-out forwards';
            sparkle.style.boxShadow = '0 0 10px #a855f7';
            
            const sparkleKeyframes = `
                @keyframes sparkle {
                    0% { opacity: 0; transform: scale(0); }
                    50% { opacity: 1; transform: scale(1); }
                    100% { opacity: 0; transform: scale(0); }
                }
            `;
            
            if (!document.querySelector('#sparkle-styles')) {
                const style = document.createElement('style');
                style.id = 'sparkle-styles';
                style.textContent = sparkleKeyframes;
                document.head.appendChild(style);
            }
            
            hero.appendChild(sparkle);
            
            setTimeout(() => {
                sparkle.remove();
            }, 2000);
        };

        // Create sparkles periodically
        const sparkleInterval = setInterval(createSparkle, 1000);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearInterval(sparkleInterval);
        };
    }, []);

    const handleLogout = () => {
        // Handle logout logic here
        console.log('User logged out');
    };

    return (
        <>
        <div className="dashboard">
            {/* Navigation */}
            <nav className="navbar">
                <div className="nav-container">
                    <div className="logo">
                        <div className="logo-icon">R</div>
                        <span>Rhythm</span>
                    </div>
                    <div className="nav-buttons">
                        <button className="btn btn-outline" onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
        
            <section className="hero">
                <div className="container">
                    <div className="hero-grid">
                        <div className="hero-content">
                            <h1>Welcome to Rhythm — Inspired By Heritage</h1>
                            <p className="hero-subtitle">The Art of Kolam, Reimagined</p>
                            <p className="hero-description">
                                Step into a world where every line, curve, and dot dances in harmony. Rhythm lets you explore the beauty of Kolam — blending ancient artistry with modern technology to inspire creativity, culture, and connection.
                            </p>
                        </div>
                        <div className="hero-visual">
                            <div className="kolam-visualization">
                                <div className="kolam-pattern">
                                    <div className="pattern-dots">
                                        <div className="dot"></div>
                                        <div className="dot"></div>
                                        <div className="dot"></div>
                                        <div className="dot"></div>
                                        <div className="dot"></div>
                                        <div className="dot"></div>
                                        <div className="dot"></div>
                                        <div className="dot"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            

            {/* Features Section */}
            <section className="features">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Choose Your Tool</h2>
                        <p className="section-subtitle">
                            Select the perfect tool to bring your Kolam vision to life
                        </p>
                    </div>
                    
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">AI</div>
                            <h3>Generate a Kolam </h3>
                            <p>Let artificial intelligence craft stunning and intricate Kolam patterns for you. Describe your vision or pick from elegant styles, and watch as our AI instantly generates traditional, mesmerizing designs. Perfect for sparking inspiration and creating Kolams that blend heritage with creativity.</p>
                            <button className="btn-feature" onClick={() => navigate('/kolam')}>Start Generating</button>
                        </div>
                        
                        <div className="feature-card">
                            <div className="feature-icon">DRAW</div>
                            <h3>Design Yourself</h3>
                            <p>Unleash your creativity with our intuitive design canvas. Draw freehand, use symmetry tools, and experiment with colors and patterns. This tool gives you complete control to create original Kolam designs from scratch, allowing you to express your artistic vision with precision and ease.</p>
                            <button className="btn-feature" onClick={() => navigate('/kolamdesigner')}>Start Drawing</button>
                        </div>
                        
                       {/* <div className="feature-card">
                        <div className="feature-icon">🎨</div>
                        <h3>View Gallery</h3>
                        <p>
                            Discover your saved Kolam creations in the Gallery. Revisit your favorite patterns, or share them with others for inspiration. This feature helps you track your artistic growth, celebrate your progress, and keep all your traditional and experimental Kolam designs beautifully organized in one place.
                        </p>
                        <button className="btn-feature">View Gallery</button>
                        </div> */}

                    </div>
                </div>
            </section>

            {/* Types Section */}
            <section className="types">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Types of Kolam</h2>
                        <p className="section-subtitle">
                            Explore the diverse styles and techniques of this beautiful art form
                        </p>
                    </div>

                    <div className="types-grid">
                        <Link to="/pullikolam">
                        <div className="type-card">
                            <div className="type-header">
                                <div className="type-icon">DOT</div>
                                <h3>Pulli Kolam</h3>
                            </div>
                            <p>Dot-based patterns where dots are connected with elegant curved lines to create intricate geometric designs that flow seamlessly.</p>
                            <div className="pattern-preview">• • • • •</div>
                        </div>
                        </Link>
                        
                        <Link to="/sikkukolam">
                        <div className="type-card">
                            <div className="type-header">
                                <div className="type-icon">FLOW</div>
                                <h3>Sikku Kolam</h3>
                            </div>
                            <p>Continuous line patterns drawn without lifting the hand, symbolizing the interconnectedness of all life and the eternal cycle of existence.</p>
                            <div className="pattern-preview">〜〜〜〜〜</div>
                        </div>
                        </Link>
                        
                        <Link to="/margazhikolam">
                        <div className="type-card">
                            <div className="type-header">
                                <div className="type-icon">STAR</div>
                                <h3>Margazhi Kolam</h3>
                            </div>
                            <p>Elaborate festive designs created during the sacred Margazhi month, often featuring complex religious motifs and larger scales.</p>
                            <div className="pattern-preview">✦ ✧ ✦ ✧ ✦</div>
                        </div>
                        </Link>
                        
                        <Link to="/rangolistyle">
                        <div className="type-card">
                            <div className="type-header">
                                <div className="type-icon">COLOR</div>
                                <h3>Rangoli Style</h3>
                            </div>
                            <p>Colorful variations using vibrant powders, flower petals, and decorative elements to create stunning visual displays for festivals and celebrations.</p>
                            <div className="pattern-preview">⚘ ⚘ ⚘ ⚘ ⚘</div>
                        </div>
                        </Link>
                        
                        <Link to="/kambikolam">
                        <div className="type-card">
                            <div className="type-header">
                                <div className="type-icon">LINE</div>
                                <h3>Kambi Kolam</h3>
                            </div>
                            <p>Geometric line patterns using straight lines and angles to create structured, mathematical designs that emphasize precision and symmetry.</p>
                            <div className="pattern-preview">◇ ◆ ◇ ◆ ◇</div>
                        </div>
                        </Link>
                        
                        <Link to="/padikolam">
                        <div className="type-card">
                            <div className="type-header">
                                <div className="type-icon">FREE</div>
                                <h3>Padi Kolam</h3>
                            </div>
                            <p>Free-hand artistic expressions created without dots or guides, showcasing pure creativity, skill, and the artist's personal interpretation.</p>
                            <div className="pattern-preview">❋ ❊ ❋ ❊ ❋</div>
                        </div>
                        </Link>                    
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta">
                <div className="container">
                    <div className="cta-content">
                        <h2>Ready to Create Your Masterpiece?</h2>
                        <p>Choose your preferred tool and start designing beautiful Kolam patterns that honor tradition while embracing modern creativity.</p>
                        <div className="cta-buttons">
                            <button className="btn-hero btn-hero-primary" onClick={() => navigate('/kolamdesigner')}>
                                <span>Start Creating Now</span>
                            </button>
                            <button className="btn-hero btn-hero-secondary">
                                <span>View Gallery</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
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
            </div>
        </>
    );
};

export default Dashboard;