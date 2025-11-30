import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Magnet = ({ children, padding = 50, disabled = false, magnetStrength = 2 }) => {
    const [isActive, setIsActive] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const ref = useRef(null);

    const handleMouseMove = (e) => {
        if (!ref.current || disabled) return;

        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;

        const dist = Math.sqrt(Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2));

        if (dist < width / 2 + padding) {
            setIsActive(true);
            const offsetX = (e.clientX - centerX) / magnetStrength;
            const offsetY = (e.clientY - centerY) / magnetStrength;
            setPosition({ x: offsetX, y: offsetY });
        } else {
            setIsActive(false);
            setPosition({ x: 0, y: 0 });
        }
    };

    const handleMouseLeave = () => {
        setIsActive(false);
        setPosition({ x: 0, y: 0 });
    };

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <motion.div
            ref={ref}
            onMouseLeave={handleMouseLeave}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
            style={{ display: 'inline-block' }}
        >
            {children}
        </motion.div>
    );
};

export default Magnet;
