import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';

const Ballpit = () => {
    const sceneRef = useRef(null);
    const engineRef = useRef(null);
    const renderRef = useRef(null);
    const runnerRef = useRef(null);

    useEffect(() => {
        // Module aliases
        const Engine = Matter.Engine,
            Render = Matter.Render,
            Runner = Matter.Runner,
            World = Matter.World,
            Bodies = Matter.Bodies,
            Mouse = Matter.Mouse,
            MouseConstraint = Matter.MouseConstraint,
            Composite = Matter.Composite,
            Events = Matter.Events;

        // Create engine
        const engine = Engine.create();
        const world = engine.world;
        engineRef.current = engine;

        // Create renderer
        const render = Render.create({
            element: sceneRef.current,
            engine: engine,
            options: {
                width: window.innerWidth,
                height: window.innerHeight,
                background: '#0a0a0a', // Match theme bg
                wireframes: false,
                pixelRatio: window.devicePixelRatio
            }
        });
        renderRef.current = render;

        // Create bounds
        const ground = Bodies.rectangle(window.innerWidth / 2, window.innerHeight + 50, window.innerWidth, 100, { isStatic: true, render: { visible: false } });
        const leftWall = Bodies.rectangle(-50, window.innerHeight / 2, 100, window.innerHeight, { isStatic: true, render: { visible: false } });
        const rightWall = Bodies.rectangle(window.innerWidth + 50, window.innerHeight / 2, 100, window.innerHeight, { isStatic: true, render: { visible: false } });

        World.add(world, [ground, leftWall, rightWall]);

        // Add balls
        const balls = [];
        const colors = ['#d4af37', '#ffffff', '#333333', '#1a1a1a']; // Gold, White, Dark Grey, Darker Grey

        for (let i = 0; i < 50; i++) {
            const radius = 15 + Math.random() * 20;
            const x = Math.random() * window.innerWidth;
            const y = -Math.random() * 500 - 50; // Start above screen

            const ball = Bodies.circle(x, y, radius, {
                restitution: 0.9,
                friction: 0.005,
                render: {
                    fillStyle: colors[Math.floor(Math.random() * colors.length)]
                }
            });
            balls.push(ball);
        }

        World.add(world, balls);

        // Add mouse control
        const mouse = Mouse.create(render.canvas);
        const mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

        World.add(world, mouseConstraint);

        // Keep the mouse in sync with rendering
        render.mouse = mouse;

        // Run the engine
        Render.run(render);

        // Create runner
        const runner = Runner.create();
        runnerRef.current = runner;
        Runner.run(runner, engine);

        // Handle resize
        const handleResize = () => {
            render.canvas.width = window.innerWidth;
            render.canvas.height = window.innerHeight;

            // Reposition walls
            Matter.Body.setPosition(ground, { x: window.innerWidth / 2, y: window.innerHeight + 50 });
            Matter.Body.setPosition(rightWall, { x: window.innerWidth + 50, y: window.innerHeight / 2 });

            // Update ground width
            // Note: Changing body vertices/size is complex in Matter.js, simpler to just replace or accept slight inaccuracy for now
            // For a perfect resize, we'd need to recreate the static bodies.
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            Render.stop(render);
            Runner.stop(runner);
            if (render.canvas) {
                render.canvas.remove();
            }
            World.clear(world);
            Engine.clear(engine);
        };
    }, []);

    return (
        <div
            ref={sceneRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                pointerEvents: 'auto' // Allow mouse interaction
            }}
        />
    );
};

export default Ballpit;
