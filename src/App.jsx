import React from 'react';
import Hero from './components/Hero';
import Experience from './components/Experience';
import MatrixRain from './components/MatrixRain';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';
import Dock from './components/Dock';
import { FaHome, FaUser, FaBriefcase, FaCode, FaEnvelope } from 'react-icons/fa';
import TagCloud from './components/TagCloud';
import RollingGallery from './components/RollingGallery';
import { cvData } from './data/cv';

function App() {
  const dockItems = [
    { icon: <FaHome />, href: '#about' },
    { icon: <FaUser />, href: '#experience' },
    { icon: <FaBriefcase />, href: '#projects' },
    { icon: <FaCode />, href: '#skills' },
    { icon: <FaEnvelope />, href: '#contact' },
  ];

  return (
    <div style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh', background: '#050505' }}>
      <MatrixRain />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <CustomCursor />

        {/* Dock replaces standard Navbar for a more "React Bits" feel */}
        <Dock items={dockItems} />

        <Hero />
        <Experience />

        <section id="projects" style={{ padding: '5rem 0' }}>
          <div className="container">
            <h2 className="section-title">Selected Projects</h2>
            <RollingGallery items={cvData.projects} />
          </div>
        </section>

        <section id="skills" style={{ minHeight: '600px', position: 'relative' }}>
          <div className="container" style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2 className="section-title">Skills Universe</h2>
            <p style={{ color: '#aaa', marginBottom: '1rem' }}>Spin the globe to explore my tech stack</p>
            <TagCloud skills={[
              ...cvData.skills.development,
              ...cvData.skills.devops,
              ...cvData.skills.cybersecurity,
              ...cvData.skills.networks
            ]} />
          </div>
        </section>

        <Contact />
      </div>
    </div>
  );
}

export default App;
