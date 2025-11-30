import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';

const FunButton = ({ children, onClick, style, className }) => {
    const [isExploding, setIsExploding] = useState(false);
    const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleClick = (e) => {
        setIsExploding(true);
        setTimeout(() => setIsExploding(false), 3000); // Stop after 3s
        if (onClick) onClick(e);
    };

    return (
        <>
            {isExploding && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 9999 }}>
                    <Confetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={500} />
                </div>
            )}
            <button onClick={handleClick} style={style} className={className}>
                {children}
            </button>
        </>
    );
};

export default FunButton;
