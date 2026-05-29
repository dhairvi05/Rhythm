import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"
import './Homepage.css';
import Signin from './Signin';
import Signup from './Signup';
import Dashboard from './Dashboard';

const Homepage = () => {
    const [activeModal, setActiveModal] = useState(null);

    const openModal = (modalId) => {
        setActiveModal(modalId);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setActiveModal(null);
        document.body.style.overflow = 'auto';
    };

    const switchModal = (to) => {
        setActiveModal(null);
        setTimeout(() => setActiveModal(to), 200);
    };

    const scrollToGallery = () => {
        const typesSection = document.getElementById('types-section');
        if(typesSection) {
            typesSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

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

        // Enhanced button interactions
        document.querySelectorAll('.btn-hero, .btn-modal').forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.transform = this.classList.contains('btn-hero-primary') ? 'translateY(-3px) scale(1.02)' : 'translateY(-2px) scale(1.02)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Add sparkle effect to hero section
        const createSparkle = () => {
            const hero = document.querySelector('.hero');
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

    return (
        <>
            {/* Navigation */}
            <nav className="navbar">
                <div className="nav-container">
                    <div className="logo">
                        <div className="logo-icon">🎨</div>
                        <span>Rhythm</span>
                    </div>
                    <div className="nav-buttons">
                        <button className="btn btn-outline" onClick={() => openModal('signin')}>Sign In</button>
                        <button className="btn btn-primary" onClick={() => openModal('signup')}>Get Started</button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="hero">
                <div className="container">
                    <div className="hero-grid">
                        <div className="hero-content">
                            <h1>Kolam — The Rhythm of Devotion</h1>
                            <p className="hero-subtitle">Traditional Indian Floor Patterns</p>
                            <p className="hero-description">
                                Discover the ancient Tamil tradition of creating intricate geometric patterns that bring prosperity, positive energy, and spiritual harmony to your space.
                            </p>
                            <div className="hero-buttons">
                                <button className="btn-hero btn-hero-primary" onClick={() => openModal('signup')}>
                                    <span>Start Creating</span>
                                </button>
                                <button className="btn-hero btn-hero-secondary" onClick={scrollToGallery}>
                                    <span>Explore Gallery</span>
                                </button>
                            </div>
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

            {/* About Section */}
            <section className="about">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">What is Kolam?</h2>
                        <p className="section-subtitle">
                            A sacred art form that transforms simple rice flour into divine geometric masterpieces
                        </p>
                    </div>
                    
                    <div className="about-grid">
                        <div className="feature-card">
                            <div className="feature-icon">🏛️</div>
                            <h3>Ancient Tradition</h3>
                            <p>Dating back thousands of years, this sacred practice has been passed down through generations as a daily ritual of devotion and artistic expression.</p>
                        </div>
                        
                        <div className="feature-card">
                            <div className="feature-icon">🌟</div>
                            <h3>Spiritual Significance</h3>
                            <p>Each pattern carries deep meaning, believed to invite prosperity, ward off negative energy, and create a sacred threshold between the home and the world.</p>
                        </div>
                        
                        <div className="feature-card">
                            <div className="feature-icon">📐</div>
                            <h3>Mathematical Beauty</h3>
                            <p>Complex geometric designs that showcase the perfect harmony between mathematics, art, and spirituality in traditional Indian culture.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Types Section */}
            <section className="types" id="types-section">
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
                                <div className="type-icon">⚪</div>
                                <h3>Pulli Kolam</h3>
                            </div>
                            <p>Dot-based patterns where dots are connected with elegant curved lines to create intricate geometric designs that flow seamlessly.</p>
                            <div className="pattern-preview">• • • • •</div>
                        </div>
                        </Link>
                        
                        <Link to="/sikkukolam">
                        <div className="type-card">
                            <div className="type-header">
                                <div className="type-icon">🌀</div>
                                <h3>Sikku Kolam</h3>
                            </div>
                            <p>Continuous line patterns drawn without lifting the hand, symbolizing the interconnectedness of all life and the eternal cycle of existence.</p>
                            <div className="pattern-preview">〜〜〜〜〜</div>
                        </div>
                        </Link>
                        
                        <Link to="/margazhikolam">
                        <div className="type-card">
                            <div className="type-header">
                                <div className="type-icon">🌟</div>
                                <h3>Margazhi Kolam</h3>
                            </div>
                            <p>Elaborate festive designs created during the sacred Margazhi month, often featuring complex religious motifs and larger scales.</p>
                            <div className="pattern-preview">✦ ✧ ✦ ✧ ✦</div>
                        </div>
                        </Link>
                        
                        <Link to="/rangolistyle">
                        <div className="type-card">
                            <div className="type-header">
                                <div className="type-icon">🌺</div>
                                <h3>Rangoli Style</h3>
                            </div>
                            <p>Colorful variations using vibrant powders, flower petals, and decorative elements to create stunning visual displays for festivals and celebrations.</p>
                            <div className="pattern-preview">🌸 🌼 🌺 🌼 🌸</div>
                        </div>
                        </Link>
                        
                        <Link to="/kambikolam">
                        <div className="type-card">
                            <div className="type-header">
                                <div className="type-icon">📐</div>
                                <h3>Kambi Kolam</h3>
                            </div>
                            <p>Geometric line patterns using straight lines and angles to create structured, mathematical designs that emphasize precision and symmetry.</p>
                            <div className="pattern-preview">◇ ◆ ◇ ◆ ◇</div>
                        </div>
                        </Link>
                        
                        <Link to="/padikolam">
                        <div className="type-card">
                            <div className="type-header">
                                <div className="type-icon">🎨</div>
                                <h3>Padi Kolam</h3>
                            </div>
                            <p>Free-hand artistic expressions created without dots or guides, showcasing pure creativity, skill, and the artist's personal interpretation.</p>
                            <div className="pattern-preview">✨ 🎭 ✨ 🎭 ✨</div>
                        </div>
                        </Link>
                        
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta">
                <div className="container">
                    <div className="cta-content">
                        <h2>Begin Your Kolam Journey</h2>
                        <p>Join thousands of artists preserving this beautiful tradition and creating meaningful patterns that connect us to our cultural heritage.</p>
                        <button className="btn-new" onClick={() => openModal('signup')}>
                            <span>Start Creating Today</span>
                            <span>🚀</span>
                        </button>
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

            {/* Modals */}
            {activeModal === 'signin' && (
                <Signin 
                    isOpen={activeModal === 'signin'} 
                    onClose={closeModal} 
                    onSwitchToSignup={() => switchModal('signup')} 
                />
            )}
            {activeModal === 'signup' && (
                <Signup 
                    isOpen={activeModal === 'signup'} 
                    onClose={closeModal} 
                    onSwitchToSignin={() => switchModal('signin')} 
                />
            )}
        </>
    );
};

export default Homepage;