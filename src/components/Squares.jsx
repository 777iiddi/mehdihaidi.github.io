import React, { useRef, useEffect, useState } from 'react';

const Squares = ({
    direction = 'right',
    speed = 1,
    borderColor = '#333',
    squareSize = 40,
    hoverFillColor = '#222',
}) => {
    const canvasRef = useRef(null);
    const requestRef = useRef(null);
    const numSquaresX = useRef();
    const numSquaresY = useRef();
    const gridOffset = useRef({ x: 0, y: 0 });
    const [hoveredSquare, setHoveredSquare] = useState(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            numSquaresX.current = Math.ceil(canvas.width / squareSize) + 1;
            numSquaresY.current = Math.ceil(canvas.height / squareSize) + 1;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const drawGrid = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const startX = Math.floor(gridOffset.current.x / squareSize);
            const startY = Math.floor(gridOffset.current.y / squareSize);
            const offsetX = gridOffset.current.x % squareSize;
            const offsetY = gridOffset.current.y % squareSize;

            for (let i = 0; i < numSquaresX.current; i++) {
                for (let j = 0; j < numSquaresY.current; j++) {
                    const x = i * squareSize - offsetX;
                    const y = j * squareSize - offsetY;

                    ctx.strokeStyle = borderColor;
                    ctx.lineWidth = 1;

                    // If hovered, fill it
                    if (hoveredSquare &&
                        Math.floor((x + offsetX) / squareSize) === hoveredSquare.x &&
                        Math.floor((y + offsetY) / squareSize) === hoveredSquare.y) {
                        ctx.fillStyle = hoverFillColor;
                        ctx.fillRect(x, y, squareSize, squareSize);
                    }

                    ctx.strokeRect(x, y, squareSize, squareSize);
                }
            }
        };

        const updateGrid = () => {
            const moveAmount = speed;
            if (direction === 'right') {
                gridOffset.current.x = (gridOffset.current.x - moveAmount + squareSize) % squareSize;
            } else if (direction === 'left') {
                gridOffset.current.x = (gridOffset.current.x + moveAmount) % squareSize;
            } else if (direction === 'up') {
                gridOffset.current.y = (gridOffset.current.y + moveAmount) % squareSize;
            } else if (direction === 'down') {
                gridOffset.current.y = (gridOffset.current.y - moveAmount + squareSize) % squareSize;
            } else if (direction === 'diagonal') {
                gridOffset.current.x = (gridOffset.current.x - moveAmount + squareSize) % squareSize;
                gridOffset.current.y = (gridOffset.current.y - moveAmount + squareSize) % squareSize;
            }

            drawGrid();
            requestRef.current = requestAnimationFrame(updateGrid);
        };

        requestRef.current = requestAnimationFrame(updateGrid);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(requestRef.current);
        };
    }, [direction, speed, borderColor, hoverFillColor, hoveredSquare, squareSize]);

    const handleMouseMove = (e) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const gridX = Math.floor((x + (gridOffset.current.x % squareSize)) / squareSize);
        const gridY = Math.floor((y + (gridOffset.current.y % squareSize)) / squareSize);

        setHoveredSquare({ x: gridX, y: gridY });
    };

    const handleMouseLeave = () => {
        setHoveredSquare(null);
    };

    return (
        <canvas
            ref={canvasRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                width: '100%',
                height: '100%',
                border: 'none',
                display: 'block',
            }}
        />
    );
};

export default Squares;
