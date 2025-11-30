import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const Dock = ({ items }) => {
    const mouseX = useMotionValue(Infinity);

    return (
        <motion.div
            onMouseMove={(e) => mouseX.set(e.pageX)}
            onMouseLeave={() => mouseX.set(Infinity)}
            style={{
                display: 'flex',
                height: '64px',
                alignItems: 'end',
                gap: '12px',
                padding: '12px',
                borderRadius: '16px',
                background: 'rgba(0, 20, 0, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid #00ff00',
                boxShadow: '0 0 20px rgba(0, 255, 0, 0.2)',
                position: 'fixed',
                bottom: '32px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 1000,
            }}
        >
            {items.map((item, index) => (
                <DockItem key={index} mouseX={mouseX} item={item} />
            ))}
        </motion.div>
    );
};

const DockItem = ({ mouseX, item }) => {
    const ref = useRef(null);

    const distance = useTransform(mouseX, (val) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
    const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

    return (
        <motion.a
            ref={ref}
            href={item.href}
            style={{
                width,
                height: width,
                borderRadius: '50%',
                background: '#000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#00ff00',
                textDecoration: 'none',
                fontSize: '1.2rem',
                border: '1px solid #00ff00',
                overflow: 'hidden',
                boxShadow: '0 0 10px rgba(0, 255, 0, 0.3)'
            }}
        >
            {item.icon}
        </motion.a>
    );
};

export default Dock;
