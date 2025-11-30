import React from 'react';
import { motion } from 'framer-motion';
import { cvData } from '../data/cv';
import BlurText from './BlurText';
import Magnet from './Magnet';
import TiltedCard from './TiltedCard';
import FunButton from './FunButton';
import FallingText from './FallingText';
import GlitchText from './GlitchText';
import Spotlight from './Spotlight';

const Hero = () => {
    return (
        <section id="about" style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: '60px',
            position: 'relative',
            zIndex: 10
        }}>
            <div className="container" style={{ width: '100%' }}>
                <Spotlight className="spotlight-wrapper" spotlightColor="rgba(0, 255, 0, 0.15)">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(12, 1fr)',
                        gap: '2rem',
                        alignItems: 'center',
                        padding: '2rem',
                        borderRadius: '20px',
                        background: 'rgba(0, 20, 0, 0.6)',
                        border: '1px solid rgba(0, 255, 0, 0.2)',
                        boxShadow: '0 0 30px rgba(0, 255, 0, 0.05)'
                    }}>

                        {/* Main Text Block */}
                        <div style={{ gridColumn: 'span 7', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <span style={{
                                    color: '#00ff00',
                                    fontSize: '1.2rem',
                                    fontWeight: '600',
                                    letterSpacing: '4px',
                                    fontFamily: 'monospace',
                                    textTransform: 'uppercase',
                                    display: 'block',
                                    marginBottom: '0.5rem',
                                    textShadow: '0 0 10px rgba(0, 255, 0, 0.5)'
                                }}>
                                    <FallingText text="System.Engineer" delay={0.5} />
                                </span>
                                <div style={{
                                    fontSize: 'clamp(3.5rem, 8vw, 6rem)',
                                    lineHeight: '0.9',
                                    fontWeight: '800',
                                    color: '#fff',
                                    marginBottom: '1rem'
                                }}>
                                    <GlitchText text={cvData.personalInfo.name} />
                                </div>
                                <p style={{ fontSize: '1.2rem', color: '#00cc00', lineHeight: '1.6', maxWidth: '90%', fontFamily: 'monospace' }}>
                                    {">"} {cvData.personalInfo.summary}
                                </p>
                            </motion.div>

                            <div style={{ display: 'flex', gap: '1.5rem' }}>
                                <Magnet magnetStrength={5}>
                                    <a href="#projects" className="btn" style={{
                                        background: 'rgba(0, 255, 0, 0.1)',
                                        color: '#00ff00',
                                        border: '1px solid #00ff00',
                                        padding: '1rem 2.5rem',
                                        fontSize: '1.1rem',
                                        boxShadow: '0 0 15px rgba(0, 255, 0, 0.2)'
                                    }}>
                                        Initialize_Projects
                                    </a>
                                </Magnet>
                                <Magnet magnetStrength={5}>
                                    <FunButton
                                        onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                                        style={{
                                            background: 'transparent',
                                            color: '#fff',
                                            border: '1px solid rgba(255,255,255,0.3)',
                                            padding: '1rem 2.5rem',
                                            fontSize: '1.1rem',
                                            cursor: 'pointer',
                                            borderRadius: '4px',
                                            fontFamily: 'monospace'
                                        }}
                                    >
                                        Execute_Contact
                                    </FunButton>
                                </Magnet>
                            </div>
                        </div>

                        {/* Profile Image Block with TiltedCard */}
                        <div style={{ gridColumn: 'span 5', display: 'flex', justifyContent: 'center' }}>
                            <TiltedCard className="profile-card">
                                <div style={{
                                    width: '100%',
                                    maxWidth: '400px',
                                    aspectRatio: '1/1',
                                    borderRadius: '20px',
                                    overflow: 'hidden',
                                    boxShadow: '0 0 30px rgba(0, 255, 0, 0.3)',
                                    border: '2px solid #00ff00',
                                    position: 'relative'
                                }}>
                                    <div style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        background: 'linear-gradient(to bottom, transparent 50%, rgba(0, 255, 0, 0.1) 50%)',
                                        backgroundSize: '100% 4px',
                                        pointerEvents: 'none',
                                        zIndex: 2
                                    }}></div>
                                    <img
                                        src="/profile.png"
                                        alt="Profile"
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%) contrast(1.2)' }}
                                    />
                                </div>
                            </TiltedCard>
                        </div>

                    </div>
                </Spotlight>
            </div>
            <style>{`
        @media (max-width: 900px) {
          .spotlight-wrapper > div { grid-template-columns: 1fr !important; }
          .spotlight-wrapper > div > div { grid-column: span 1 !important; }
        }
      `}</style>
        </section >
    );
};

export default Hero;
