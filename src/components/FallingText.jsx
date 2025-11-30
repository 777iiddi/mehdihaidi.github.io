import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const FallingText = ({ text, delay = 0 }) => {
    const letters = text.split('');

    return (
        <div style={{ display: 'flex', overflow: 'hidden' }}>
            {letters.map((letter, index) => (
                <motion.span
                    key={index}
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                        type: 'spring',
                        damping: 12,
                        stiffness: 100,
                        delay: delay + index * 0.1
                    }}
                    whileHover={{
                        y: 20,
                        color: '#3b82f6',
                        transition: { type: 'spring', stiffness: 300 }
                    }}
                    style={{
                        display: 'inline-block',
                        cursor: 'default',
                        marginRight: letter === ' ' ? '0.5rem' : '0'
                    }}
                >
                    {letter}
                </motion.span>
            ))}
        </div>
    );
};

export default FallingText;
