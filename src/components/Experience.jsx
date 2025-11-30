import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { cvData } from '../data/cv';

const ExperienceCard = ({ exp, index }) => {
    const cardRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "center center"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
    const x = useTransform(scrollYProgress, [0, 0.5], [index % 2 === 0 ? -50 : 50, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);

    return (
        <motion.div
            ref={cardRef}
            style={{ opacity, x, scale }}
            className="cyber-card"
        >
            <div className="cyber-card-content">
                <div className="cyber-header">
                    <span className="cyber-date">{exp.period}</span>
                    <span className="cyber-location">{exp.location}</span>
                </div>

                <h3 className="cyber-role">{exp.role}</h3>
                <h4 className="cyber-company">{exp.company}</h4>

                <ul className="cyber-list">
                    {exp.description.map((desc, i) => (
                        <li key={i}>{desc}</li>
                    ))}
                </ul>

                <div className="cyber-tech-stack">
                    {exp.technologies.map((tech, i) => (
                        <span key={i} className="cyber-tech">{tech}</span>
                    ))}
                </div>
            </div>
            <div className="cyber-corner-tl"></div>
            <div className="cyber-corner-br"></div>
        </motion.div>
    );
};

const Experience = () => {
    return (
        <section id="experience" style={{ padding: '5rem 0', position: 'relative' }}>
            <div className="container">
                <h2 className="section-title glitch-header" data-text="Mission History">Mission History</h2>

                <div className="timeline-container">
                    <div className="timeline-line"></div>
                    {cvData.experience.map((exp, index) => (
                        <div key={index} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
                            <div className="timeline-dot"></div>
                            <ExperienceCard exp={exp} index={index} />
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
        .timeline-container {
          position: relative;
          max-width: 1000px;
          margin: 0 auto;
          padding: 2rem 0;
        }

        .timeline-line {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(to bottom, transparent, #00ff00, transparent);
          transform: translateX(-50%);
          box-shadow: 0 0 10px #00ff00;
        }

        .timeline-item {
          display: flex;
          justify-content: center;
          padding-bottom: 4rem;
          position: relative;
          width: 100%;
        }

        .timeline-dot {
          position: absolute;
          left: 50%;
          top: 0;
          width: 16px;
          height: 16px;
          background: #000;
          border: 2px solid #00ff00;
          border-radius: 50%;
          transform: translateX(-50%);
          z-index: 2;
          box-shadow: 0 0 10px #00ff00;
        }

        .cyber-card {
          width: 45%;
          background: rgba(0, 20, 0, 0.8);
          border: 1px solid #00ff00;
          padding: 1.5rem;
          position: relative;
          backdrop-filter: blur(5px);
          box-shadow: 0 0 15px rgba(0, 255, 0, 0.1);
        }

        .timeline-item.left {
          justify-content: flex-start;
          padding-right: 50%;
        }
        
        .timeline-item.left .cyber-card {
          margin-left: auto;
          margin-right: 2rem;
        }

        .timeline-item.right {
          justify-content: flex-end;
          padding-left: 50%;
        }

        .timeline-item.right .cyber-card {
          margin-right: auto;
          margin-left: 2rem;
        }

        .cyber-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
          font-family: monospace;
          color: #00ff00;
          font-size: 0.9rem;
        }

        .cyber-role {
          color: #fff;
          font-size: 1.4rem;
          margin-bottom: 0.2rem;
          text-shadow: 0 0 5px rgba(255,255,255,0.5);
        }

        .cyber-company {
          color: #00ff00;
          font-size: 1.1rem;
          margin-bottom: 1rem;
          font-family: monospace;
        }

        .cyber-list {
          list-style: none;
          color: #ccc;
          margin-bottom: 1.5rem;
        }

        .cyber-list li {
          margin-bottom: 0.5rem;
          position: relative;
          padding-left: 1.2rem;
        }

        .cyber-list li::before {
          content: '>';
          position: absolute;
          left: 0;
          color: #00ff00;
        }

        .cyber-tech-stack {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .cyber-tech {
          font-size: 0.8rem;
          color: #00ff00;
          border: 1px solid #00ff00;
          padding: 0.2rem 0.6rem;
          background: rgba(0, 255, 0, 0.1);
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
          .timeline-line { left: 20px; }
          .timeline-item { flex-direction: column; padding-left: 40px; padding-bottom: 2rem; }
          .timeline-item.left, .timeline-item.right { justify-content: flex-start; padding-right: 0; }
          .timeline-item.left .cyber-card, .timeline-item.right .cyber-card { width: 100%; margin: 0; }
          .timeline-dot { left: 20px; }
        }
      `}</style>
        </section>
    );
};

export default Experience;
