import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e) => {
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('.cyber-card')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    return (
        <>
            {/* Crosshair Cursor */}
            <motion.div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '40px',
                    height: '40px',
                    border: '1px solid #00ff00',
                    pointerEvents: 'none',
                    zIndex: 9999,
                    mixBlendMode: 'difference',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                animate={{
                    x: mousePosition.x - 20,
                    y: mousePosition.y - 20,
                    scale: isHovering ? 1.5 : 1,
                    rotate: isHovering ? 45 : 0
                }}
                transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 28
                }}
            >
                <div style={{ width: '100%', height: '1px', background: '#00ff00', position: 'absolute' }}></div>
                <div style={{ width: '1px', height: '100%', background: '#00ff00', position: 'absolute' }}></div>
            </motion.div>

            {/* Center Dot */}
            <motion.div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '4px',
                    height: '4px',
                    backgroundColor: '#00ff00',
                    pointerEvents: 'none',
                    zIndex: 9999,
                    boxShadow: '0 0 10px #00ff00'
                }}
                animate={{
                    x: mousePosition.x - 2,
                    y: mousePosition.y - 2,
                }}
                transition={{
                    type: 'spring',
                    stiffness: 1500,
                    damping: 50
                }}
            />
        </>
    );
};

export default CustomCursor;
