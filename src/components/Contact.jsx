import React from 'react';
import { motion } from 'framer-motion';
import { cvData } from '../data/cv';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaDownload } from 'react-icons/fa';

const Contact = () => {
    return (
        <section id="contact" style={{ padding: '5rem 0', paddingBottom: '8rem', position: 'relative' }}>
            <div className="container">
                <h2 className="section-title glitch-header" data-text="Establish Uplink">Establish Uplink</h2>

                <div className="contact-container">
                    {/* Contact Info Card */}
                    <motion.div
                        className="cyber-card contact-info"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="cyber-header">
                            <span className="cyber-label">STATUS: ONLINE</span>
                            <span className="cyber-id">ID: MH-2025</span>
                        </div>

                        <div className="info-content">
                            <p className="mission-brief">
                                Ready to deploy on new missions. Secure channels are open for collaboration inquiries.
                            </p>

                            <div className="contact-details">
                                <div className="detail-item">
                                    <FaEnvelope className="cyber-icon" />
                                    <span>{cvData.personalInfo.email}</span>
                                </div>
                                <div className="detail-item">
                                    <FaPhone className="cyber-icon" />
                                    <span>{cvData.personalInfo.phone}</span>
                                </div>
                                <div className="detail-item">
                                    <FaMapMarkerAlt className="cyber-icon" />
                                    <span>{cvData.personalInfo.location}</span>
                                </div>
                            </div>

                            <a href="/cv.pdf" download className="cyber-btn download-btn">
                                <FaDownload /> Download Dossier (CV)
                            </a>
                        </div>

                        <div className="cyber-corner-tl"></div>
                        <div className="cyber-corner-br"></div>
                    </motion.div>
                </div>
            </div>

            <style>{`
                .contact-container {
                    display: flex;
                    justify-content: center;
                    max-width: 600px;
                    margin: 0 auto;
                }

                .cyber-card {
                    width: 100%;
                    background: rgba(0, 20, 0, 0.8);
                    border: 1px solid #00ff00;
                    padding: 2.5rem;
                    position: relative;
                    backdrop-filter: blur(5px);
                    box-shadow: 0 0 15px rgba(0, 255, 0, 0.1);
                }

                .cyber-header {
                    display: flex;
                    justify-content: space-between;
                    border-bottom: 1px solid rgba(0, 255, 0, 0.3);
                    padding-bottom: 1rem;
                    margin-bottom: 1.5rem;
                    font-family: monospace;
                    color: #00ff00;
                    font-size: 0.9rem;
                    letter-spacing: 1px;
                }

                .mission-brief {
                    color: #ccc;
                    margin-bottom: 2rem;
                    line-height: 1.6;
                    text-align: center;
                }

                .contact-details {
                    display: flex;
                    flex-direction: column;
                    gap: 1.2rem;
                    margin-bottom: 2.5rem;
                }

                .detail-item {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    color: #fff;
                    font-family: monospace;
                    background: rgba(0, 255, 0, 0.05);
                    padding: 0.8rem;
                    border-radius: 4px;
                    border: 1px solid rgba(0, 255, 0, 0.1);
                }

                .cyber-icon {
                    color: #00ff00;
                    font-size: 1.2rem;
                }

                .cyber-btn {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.8rem;
                    background: transparent;
                    border: 1px solid #00ff00;
                    color: #00ff00;
                    padding: 1rem 2rem;
                    font-family: monospace;
                    text-transform: uppercase;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    text-decoration: none;
                    width: 100%;
                    font-weight: bold;
                    letter-spacing: 1px;
                }

                .cyber-btn:hover {
                    background: rgba(0, 255, 0, 0.1);
                    box-shadow: 0 0 15px rgba(0, 255, 0, 0.3);
                    transform: translateY(-2px);
                }

                .cyber-corner-tl {
                    position: absolute;
                    top: -1px;
                    left: -1px;
                    width: 20px;
                    height: 20px;
                    border-top: 2px solid #00ff00;
                    border-left: 2px solid #00ff00;
                }

                .cyber-corner-br {
                    position: absolute;
                    bottom: -1px;
                    right: -1px;
                    width: 20px;
                    height: 20px;
                    border-bottom: 2px solid #00ff00;
                    border-right: 2px solid #00ff00;
                }
                @media (max-width: 768px) {
                    .contact-grid {
                        grid-template-columns: 1fr;
                    }
                    .cyber-card {
                        padding: 1.5rem;
                    }
                }
            `}</style>
        </section>
    );
};

export default Contact;
