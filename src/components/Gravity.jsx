import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';

const Gravity = ({ children, className }) => {
    const sceneRef = useRef(null);
    const engineRef = useRef(null);
    const renderRef = useRef(null);
    const runnerRef = useRef(null);

    useEffect(() => {
        const Engine = Matter.Engine;
        const Render = Matter.Render;
        const World = Matter.World;
        const Bodies = Matter.Bodies;
        const Mouse = Matter.Mouse;
        const MouseConstraint = Matter.MouseConstraint;
        const Runner = Matter.Runner;

        const engine = Engine.create();
        const world = engine.world;
        engineRef.current = engine;

        const width = sceneRef.current.clientWidth;
        const height = sceneRef.current.clientHeight;

        const render = Render.create({
            element: sceneRef.current,
            engine: engine,
            options: {
                width,
                height,
                wireframes: false,
                background: 'transparent',
                pixelRatio: window.devicePixelRatio
            }
        });
        renderRef.current = render;

        // Boundaries
        const ground = Bodies.rectangle(width / 2, height + 30, width, 60, { isStatic: true, render: { visible: false } });
        const leftWall = Bodies.rectangle(-30, height / 2, 60, height, { isStatic: true, render: { visible: false } });
        const rightWall = Bodies.rectangle(width + 30, height / 2, 60, height, { isStatic: true, render: { visible: false } });

        World.add(world, [ground, leftWall, rightWall]);

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
        const runner = Runner.create();
        runnerRef.current = runner;
        Runner.run(runner, engine);
        Render.run(render);

        // Add random shapes/skills
        const skills = ['React', 'Node', 'Python', 'C#', 'Docker', 'AWS', 'Security', 'Network', 'SQL', 'Git'];
        const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD', '#D4A5A5', '#9B59B6', '#3498DB'];

        skills.forEach((skill, i) => {
            const x = Math.random() * width;
            const y = Math.random() * -500 - 50; // Start above screen
            const color = colors[i % colors.length];

            // Create a rounded rectangle for the skill
            const body = Bodies.rectangle(x, y, 100, 40, {
                chamfer: { radius: 20 },
                render: {
                    fillStyle: color,
                    strokeStyle: '#fff',
                    lineWidth: 2,
                    text: {
                        content: skill,
                        color: '#fff',
                        size: 16,
                        family: 'Arial'
                    }
                }
            });

            // Custom rendering for text (Matter.js render doesn't support text natively easily without plugin, 
            // so we'll just use colored blocks for now and maybe overlay DOM elements if needed, 
            // but for "funny/cool" physics, bouncing blocks is good. 
            // Let's try to map DOM elements to physics bodies for best effect)

            World.add(world, body);
        });

        // Resize handler
        const handleResize = () => {
            render.canvas.width = sceneRef.current.clientWidth;
            render.canvas.height = sceneRef.current.clientHeight;
            Matter.Body.setPosition(ground, { x: sceneRef.current.clientWidth / 2, y: sceneRef.current.clientHeight + 30 });
            Matter.Body.setPosition(rightWall, { x: sceneRef.current.clientWidth + 30, y: sceneRef.current.clientHeight / 2 });
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            Render.stop(render);
            Runner.stop(runner);
            World.clear(world);
            Engine.clear(engine);
            render.canvas.remove();
        };
    }, []);

    return (
        <div ref={sceneRef} className={className} style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative' }}>
            {children}
        </div>
    );
};

export default Gravity;
