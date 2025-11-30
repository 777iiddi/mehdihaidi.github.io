import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cvData } from '../data/cv';

const Projects = () => {
    const handleMouseMove = (e) => {
        const cards = document.getElementsByClassName('bento-card');
        for (const card of cards) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        }
    };

    return (
        <section id="projects" style={{ padding: '8rem 0' }} onMouseMove={handleMouseMove}>
            <div className="container">
                <h2 className="section-title">Selected Projects</h2>
                <div className="bento-grid">
                    {cvData.projects.map((project, index) => (
                        <motion.div
                            key={index}
                            className="bento-card"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
                        >
                            <div className="spotlight"></div>

                            <div style={{ marginBottom: '1.5rem', zIndex: 2 }}>
                                <h3 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '0.5rem' }}>{project.title}</h3>
                                <p style={{ color: '#888', fontSize: '1rem', lineHeight: '1.6' }}>{project.description}</p>
                            </div>

                            <div style={{ marginTop: 'auto', zIndex: 2 }}>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                    {project.tech.split(',').map((t, i) => (
                                        <span key={i} style={{
                                            fontSize: '0.75rem',
                                            background: '#222',
                                            color: '#ccc',
                                            padding: '0.3rem 0.8rem',
                                            borderRadius: '4px',
                                            border: '1px solid #333'
                                        }}>
                                            {t.trim()}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
