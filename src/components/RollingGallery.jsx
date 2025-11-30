import React, { useRef, useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

const RollingGallery = ({ items, autoplay = true, pauseOnHover = true }) => {
    const [isPaused, setIsPaused] = useState(false);
    const controls = useAnimation();

    useEffect(() => {
        const animate = async () => {
            if (isPaused && pauseOnHover) {
                controls.stop();
                return;
            }
            await controls.start({
                x: [0, -1000], // Adjust based on content width
                transition: {
                    x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 30, // Slower for better readability
                        ease: "linear",
                    },
                },
            });
        };
        animate();
    }, [isPaused, pauseOnHover, controls]);

    return (
        <div
            className="rolling-gallery-container"
            style={{ overflow: 'hidden', width: '100%', position: 'relative', padding: '1rem 0' }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <motion.div
                animate={controls}
                style={{ display: 'flex', gap: '2rem', width: 'max-content', paddingLeft: '2rem' }}
            >
                {[...items, ...items].map((item, index) => (
                    <div key={index} className="cyber-card project-card">
                        <div className="cyber-header">
                            <span className="cyber-label">PROJECT</span>
                            <span className="cyber-id">#{String(index + 1).padStart(2, '0')}</span>
                        </div>

                        <h3 className="cyber-title">{item.title}</h3>
                        <p className="cyber-desc">{item.description}</p>

                        <div className="cyber-tech-stack">
                            {item.tech.split(',').map((t, i) => (
                                <span key={i} className="cyber-tech">{t.trim()}</span>
                            ))}
                        </div>

                        <div className="cyber-corner-tl"></div>
                        <div className="cyber-corner-br"></div>
                    </div>
                ))}
            </motion.div>

            <style>{`
                .project-card {
                    min-width: 350px;
                    max-width: 350px;
                    height: 250px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }

                .cyber-card {
                    background: rgba(0, 20, 0, 0.8);
                    border: 1px solid #00ff00;
                    padding: 1.5rem;
                    position: relative;
                    backdrop-filter: blur(5px);
                    box-shadow: 0 0 15px rgba(0, 255, 0, 0.1);
                    transition: all 0.3s ease;
                }

                .cyber-card:hover {
                    box-shadow: 0 0 25px rgba(0, 255, 0, 0.3);
                    transform: translateY(-5px);
                }

                .cyber-header {
                    display: flex;
                    justify-content: space-between;
                    border-bottom: 1px solid rgba(0, 255, 0, 0.3);
                    padding-bottom: 0.5rem;
                    margin-bottom: 1rem;
                    font-family: monospace;
                    color: #00ff00;
                    font-size: 0.8rem;
                    letter-spacing: 1px;
                }

                .cyber-title {
                    color: #fff;
                    font-size: 1.4rem;
                    margin-bottom: 0.5rem;
                    text-shadow: 0 0 5px rgba(255,255,255,0.5);
                }

                .cyber-desc {
                    color: #ccc;
                    font-size: 0.9rem;
                    margin-bottom: 1rem;
                    line-height: 1.4;
                    flex-grow: 1;
                }

                .cyber-tech-stack {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                }

                .cyber-tech {
                    font-size: 0.75rem;
                    color: #00ff00;
                    border: 1px solid #00ff00;
                    padding: 0.2rem 0.5rem;
                    background: rgba(0, 255, 0, 0.1);
                    font-family: monospace;
                }

                .cyber-corner-tl {
                    position: absolute;
                    top: -1px;
                    left: -1px;
                    width: 15px;
                    height: 15px;
                    border-top: 2px solid #00ff00;
                    border-left: 2px solid #00ff00;
                }

                .cyber-corner-br {
                    position: absolute;
                    bottom: -1px;
                    right: -1px;
                    width: 15px;
                    height: 15px;
                    border-bottom: 2px solid #00ff00;
                    border-right: 2px solid #00ff00;
                }
            `}</style>
        </div>
    );
};

export default RollingGallery;
