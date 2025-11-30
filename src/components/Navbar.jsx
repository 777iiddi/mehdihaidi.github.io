import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = ['About', 'Experience', 'Projects', 'Skills', 'Contact'];

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.6, 0.05, -0.01, 0.9] }}
                style={{
                    position: 'fixed',
                    top: '2rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 1000,
                    width: '90%',
                    maxWidth: '1200px',
                    padding: '1rem 2rem',
                    background: 'rgba(10, 10, 10, 0.5)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    borderRadius: '100px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
                <a href="#" style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.5rem',
                    fontWeight: '800',
                    color: '#fff',
                    letterSpacing: '-1px'
                }}>
                    MH<span style={{ color: 'var(--accent-color)' }}>.</span>
                </a>

                {/* Desktop Nav */}
                <ul style={{ display: 'none', gap: '3rem', md: { display: 'flex' } }} className="desktop-nav">
                    {navItems.map((item) => (
                        <li key={item}>
                            <a
                                href={`#${item.toLowerCase()}`}
                                style={{
                                    fontSize: '0.9rem',
                                    fontWeight: '500',
                                    color: 'var(--text-secondary)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    transition: 'color 0.3s'
                                }}
                                onMouseEnter={(e) => e.target.style.color = '#fff'}
                                onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
                            >
                                {item}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Mobile Menu Toggle */}
                <div
                    onClick={() => setIsOpen(!isOpen)}
                    style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '6px' }}
                    className="mobile-toggle"
                >
                    <span style={{ width: '24px', height: '2px', background: '#fff' }}></span>
                    <span style={{ width: '24px', height: '2px', background: '#fff' }}></span>
                </div>
            </motion.nav>

            {/* Mobile Nav Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        style={{
                            position: 'fixed',
                            top: '6rem',
                            right: '5%',
                            width: '200px',
                            background: 'rgba(20, 20, 20, 0.9)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '1rem',
                            padding: '2rem',
                            zIndex: 999,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1.5rem'
                        }}
                    >
                        {navItems.map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                onClick={() => setIsOpen(false)}
                                style={{ color: '#fff', fontSize: '1.1rem' }}
                            >
                                {item}
                            </a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .mobile-toggle { display: none !important; }
        }
      `}</style>
        </>
    );
};

export default Navbar;
