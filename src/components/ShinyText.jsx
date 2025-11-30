import React from 'react';

const ShinyText = ({ text, disabled = false, speed = 3, className = '' }) => {
    const animationDuration = `${speed}s`;

    return (
        <div
            className={`shiny-text ${disabled ? 'disabled' : ''} ${className}`}
            style={{
                backgroundImage: 'linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 60%)',
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                display: 'inline-block',
                animationDuration: animationDuration,
            }}
        >
            {text}
            <style>{`
        .shiny-text {
          color: #b5b5b5a4;
          animation: shine 5s linear infinite;
        }

        .shiny-text.disabled {
          animation: none;
        }

        @keyframes shine {
          0% {
            background-position: 100%;
          }
          100% {
            background-position: -100%;
          }
        }
      `}</style>
        </div>
    );
};

export default ShinyText;
