import React from 'react';
import { motion } from 'framer-motion';
import { cvData } from '../data/cv';

const Skills = () => {
    return (
        <section id="skills" style={{ padding: '5rem 0' }}>
            <div className="container">
                <h2 className="section-title">Skills</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                    {Object.entries(cvData.skills).map(([category, skills], index) => (
                        <motion.div
                            key={category}
                            className="card"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <h3 style={{
                                textTransform: 'capitalize',
                                marginBottom: '1.5rem',
                                color: 'var(--accent-color)',
                                fontSize: '1.3rem'
                            }}>
                                {category}
                            </h3>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
                                {skills.map((skill, i) => (
                                    <span key={i} style={{
                                        background: 'rgba(255, 255, 255, 0.05)',
                                        padding: '0.5rem 1rem',
                                        borderRadius: '0.5rem',
                                        fontSize: '0.9rem',
                                        border: '1px solid rgba(255, 255, 255, 0.1)'
                                    }}>
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
