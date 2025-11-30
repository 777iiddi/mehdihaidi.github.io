import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

const DecryptedText = ({ text, className }) => {
    const [displayText, setDisplayText] = useState(text);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        let interval = null;

        if (isHovering) {
            let iteration = 0;
            interval = setInterval(() => {
                setDisplayText(prev =>
                    text
                        .split("")
                        .map((letter, index) => {
                            if (index < iteration) {
                                return text[index];
                            }
                            return letters[Math.floor(Math.random() * 26)];
                        })
                        .join("")
                );

                if (iteration >= text.length) {
                    clearInterval(interval);
                }

                iteration += 1 / 3;
            }, 30);
        } else {
            setDisplayText(text);
        }

        return () => clearInterval(interval);
    }, [isHovering, text]);

    return (
        <motion.span
            onHoverStart={() => setIsHovering(true)}
            onHoverEnd={() => setIsHovering(false)}
            className={className}
            style={{ display: 'inline-block', cursor: 'default' }}
        >
            {displayText}
        </motion.span>
    );
};

export default DecryptedText;
