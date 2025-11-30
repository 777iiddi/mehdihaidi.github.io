import React from 'react';
import { motion } from 'framer-motion';

const BlurText = ({
    text = '',
    delay = 50,
    className = '',
    animateBy = 'words', // 'words' or 'letters'
    direction = 'top', // 'top' or 'bottom'
}) => {
    const elements = animateBy === 'words' ? text.split(' ') : text.split('');

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: delay / 1000, delayChildren: 0.04 * i },
        }),
    };

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: {
                type: 'spring',
                damping: 12,
                stiffness: 100,
            },
        },
        hidden: {
            opacity: 0,
            y: direction === 'top' ? -20 : 20,
            filter: 'blur(10px)',
            transition: {
                type: 'spring',
                damping: 12,
                stiffness: 100,
            },
        },
    };

    return (
        <motion.div
            className={className}
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{ display: 'flex', flexWrap: 'wrap' }}
        >
            {elements.map((el, index) => (
                <motion.span variants={child} key={index} style={{ marginRight: animateBy === 'words' ? '0.25em' : '0' }}>
                    {el}
                </motion.span>
            ))}
        </motion.div>
    );
};

export default BlurText;
