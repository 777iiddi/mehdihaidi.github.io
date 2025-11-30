import React, { useEffect, useRef, useState } from 'react';

const TagCloud = ({ skills }) => {
    const containerRef = useRef(null);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const lastMouseRef = useRef({ x: 0, y: 0 });

    // Configuration
    const radius = 250;
    const autoRotateSpeed = 0.002;

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let animationFrameId;
        let currentRotation = { x: 0, y: 0 };

        // Distribute tags on a sphere
        const tags = Array.from(container.children);
        const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

        tags.forEach((tag, i) => {
            const y = 1 - (i / (tags.length - 1)) * 2; // y goes from 1 to -1
            const radiusAtY = Math.sqrt(1 - y * y); // radius at y
            const theta = phi * i; // golden angle increment

            const x = Math.cos(theta) * radiusAtY;
            const z = Math.sin(theta) * radiusAtY;

            tag.dataset.x = x * radius;
            tag.dataset.y = y * radius;
            tag.dataset.z = z * radius;
        });

        const animate = () => {
            if (!isDragging) {
                currentRotation.y += autoRotateSpeed;
                currentRotation.x += autoRotateSpeed * 0.5;
            } else {
                // Smoothly interpolate towards the user-set rotation
                // For simplicity in this version, we just let the drag handler set the rotation state
                // and we use that state here if we wanted strictly controlled animation, 
                // but mixing React state updates with high-freq animation can be laggy.
                // So we'll use refs for performance if needed, but let's stick to simple auto-rotate + drag.
            }

            // Apply rotation
            const cosX = Math.cos(rotation.x + currentRotation.x);
            const sinX = Math.sin(rotation.x + currentRotation.x);
            const cosY = Math.cos(rotation.y + currentRotation.y);
            const sinY = Math.sin(rotation.y + currentRotation.y);

            tags.forEach((tag) => {
                const x = parseFloat(tag.dataset.x);
                const y = parseFloat(tag.dataset.y);
                const z = parseFloat(tag.dataset.z);

                // Rotate around Y
                const rx1 = x * cosY - z * sinY;
                const rz1 = z * cosY + x * sinY;

                // Rotate around X
                const ry2 = y * cosX - rz1 * sinX;
                const rz2 = rz1 * cosX + y * sinX;

                // Perspective scale
                const scale = (2 * radius) / (2 * radius - rz2);
                const alpha = (rz2 + radius) / (2 * radius);

                tag.style.transform = `translate3d(${rx1}px, ${ry2}px, ${rz2}px) scale(${scale})`;
                tag.style.opacity = Math.max(0.2, alpha);
                tag.style.zIndex = Math.floor(scale * 100);
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => cancelAnimationFrame(animationFrameId);
    }, [skills, rotation, isDragging]);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        lastMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        const deltaX = e.clientX - lastMouseRef.current.x;
        const deltaY = e.clientY - lastMouseRef.current.y;

        setRotation(prev => ({
            x: prev.x - deltaY * 0.005,
            y: prev.y + deltaX * 0.005
        }));

        lastMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    return (
        <div
            style={{
                width: '100%',
                height: '600px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                perspective: '1000px',
                overflow: 'hidden',
                cursor: isDragging ? 'grabbing' : 'grab'
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
            <div
                ref={containerRef}
                style={{
                    position: 'relative',
                    width: '0',
                    height: '0',
                    transformStyle: 'preserve-3d'
                }}
            >
                {skills.map((skill, index) => (
                    <div
                        key={index}
                        style={{
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)',
                            color: '#00ff00',
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                            fontFamily: 'monospace',
                            padding: '0.5rem 1rem',
                            background: 'rgba(0, 20, 0, 0.8)',
                            border: '1px solid #00ff00',
                            borderRadius: '4px',
                            whiteSpace: 'nowrap',
                            userSelect: 'none',
                            boxShadow: '0 0 15px rgba(0, 255, 0, 0.2)',
                            textShadow: '0 0 5px rgba(0, 255, 0, 0.5)'
                        }}
                    >
                        {skill}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TagCloud;
