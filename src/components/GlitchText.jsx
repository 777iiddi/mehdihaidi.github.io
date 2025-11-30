import React from 'react';
import './GlitchText.css';

const GlitchText = ({ text, className = '' }) => {
    return (
        <div className={`glitch-wrapper ${className}`}>
            <div className="glitch" data-text={text}>
                {text}
            </div>
        </div>
    );
};

export default GlitchText;
