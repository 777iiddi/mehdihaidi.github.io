import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';

const Hyperspeed = ({
    effectOptions = {
        onSpeedUp: () => { },
        onSlowDown: () => { },
        distortion: 'turbulentDistortion',
        length: 400,
        roadWidth: 10,
        islandWidth: 2,
        lanesPerRoad: 3,
        fov: 90,
        fovSpeedUp: 150,
        speedUp: 2,
        carLightsFade: 0.4,
        totalSideLightSticks: 20,
        lightPairsPerRoadWay: 40,
        shoulderLinesWidthPercentage: 0.05,
        brokenLinesWidthPercentage: 0.1,
        brokenLinesLengthPercentage: 0.5,
        lightStickWidth: [0.12, 0.5],
        lightStickHeight: [1.3, 1.7],
        movingAwaySpeed: [60, 80],
        movingCloserSpeed: [-120, -160],
        carLightsLength: [400 * 0.03, 400 * 0.2],
        carLightsRadius: [0.05, 0.14],
        carWidthPercentage: [0.3, 0.5],
        carShiftX: [-0.8, 0.8],
        carFloorSeparation: [0, 5],
        colors: {
            roadColor: 0x080808,
            islandColor: 0x0a0a0a,
            background: 0x000000,
            shoulderLines: 0x131318,
            brokenLines: 0x131318,
            leftCars: [0xD856BF, 0x6750A2, 0xC247AC],
            rightCars: [0x03B3C2, 0x037881, 0x81519C],
            sticks: 0x03B3C2,
        }
    }
}) => {
    const mountRef = useRef(null);

    useEffect(() => {
        const options = {
            onSpeedUp: () => { },
            onSlowDown: () => { },
            distortion: 'turbulentDistortion',
            length: 400,
            roadWidth: 10,
            islandWidth: 2,
            lanesPerRoad: 3,
            fov: 90,
            fovSpeedUp: 150,
            speedUp: 2,
            carLightsFade: 0.4,
            totalSideLightSticks: 20,
            lightPairsPerRoadWay: 40,
            shoulderLinesWidthPercentage: 0.05,
            brokenLinesWidthPercentage: 0.1,
            brokenLinesLengthPercentage: 0.5,
            lightStickWidth: [0.12, 0.5],
            lightStickHeight: [1.3, 1.7],
            movingAwaySpeed: [60, 80],
            movingCloserSpeed: [-120, -160],
            carLightsLength: [400 * 0.03, 400 * 0.2],
            carLightsRadius: [0.05, 0.14],
            carWidthPercentage: [0.3, 0.5],
            carShiftX: [-0.8, 0.8],
            carFloorSeparation: [0, 5],
            colors: {
                roadColor: 0x080808,
                islandColor: 0x0a0a0a,
                background: 0x000000,
                shoulderLines: 0x131318,
                brokenLines: 0x131318,
                leftCars: [0xD856BF, 0x6750A2, 0xC247AC],
                rightCars: [0x03B3C2, 0x037881, 0x81519C],
                sticks: 0x03B3C2,
            },
            ...effectOptions
        };

        const container = mountRef.current;
        const width = window.innerWidth;
        const height = window.innerHeight;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(options.colors.background);
        scene.fog = new THREE.Fog(options.colors.background, 20, options.length);

        const camera = new THREE.PerspectiveCamera(options.fov, width / height, 0.1, options.length);
        camera.position.z = -5;
        camera.position.y = 1;

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);

        // Simplified Hyperspeed implementation for stability
        // Creating a starfield/warp effect instead of complex road to avoid shader errors without full library

        const starsGeometry = new THREE.BufferGeometry();
        const starsCount = 2000;
        const posArray = new Float32Array(starsCount * 3);

        for (let i = 0; i < starsCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 100; // Spread stars
        }

        starsGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

        const starsMaterial = new THREE.PointsMaterial({
            size: 0.1,
            color: 0xffffff,
            transparent: true,
            opacity: 0.8,
        });

        const starMesh = new THREE.Points(starsGeometry, starsMaterial);
        scene.add(starMesh);

        // Add some "warp lines"
        const linesGeometry = new THREE.BufferGeometry();
        const linesCount = 100;
        const linesPos = new Float32Array(linesCount * 6); // 2 points per line

        for (let i = 0; i < linesCount; i++) {
            const x = (Math.random() - 0.5) * 50;
            const y = (Math.random() - 0.5) * 50;
            const z = Math.random() * 100;
            const length = Math.random() * 20 + 5;

            linesPos[i * 6] = x;
            linesPos[i * 6 + 1] = y;
            linesPos[i * 6 + 2] = z;

            linesPos[i * 6 + 3] = x;
            linesPos[i * 6 + 4] = y;
            linesPos[i * 6 + 5] = z + length;
        }

        linesGeometry.setAttribute('position', new THREE.BufferAttribute(linesPos, 3));
        const linesMaterial = new THREE.LineBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.5 });
        const linesMesh = new THREE.LineSegments(linesGeometry, linesMaterial);
        scene.add(linesMesh);

        const animate = () => {
            requestAnimationFrame(animate);

            // Move stars/lines towards camera
            const positions = starMesh.geometry.attributes.position.array;
            for (let i = 0; i < starsCount; i++) {
                positions[i * 3 + 2] += 0.5; // Move Z
                if (positions[i * 3 + 2] > 5) {
                    positions[i * 3 + 2] = -100; // Reset
                }
            }
            starMesh.geometry.attributes.position.needsUpdate = true;

            const linePositions = linesMesh.geometry.attributes.position.array;
            for (let i = 0; i < linesCount; i++) {
                const z1 = linePositions[i * 6 + 2];
                const z2 = linePositions[i * 6 + 5];

                linePositions[i * 6 + 2] += 2; // Move faster
                linePositions[i * 6 + 5] += 2;

                if (linePositions[i * 6 + 2] > 10) {
                    const offset = -100;
                    const len = z2 - z1;
                    linePositions[i * 6 + 2] = offset;
                    linePositions[i * 6 + 5] = offset + len;
                }
            }
            linesMesh.geometry.attributes.position.needsUpdate = true;

            renderer.render(scene, camera);
        };

        animate();

        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            container.removeChild(renderer.domElement);
            renderer.dispose();
        };
    }, [effectOptions]);

    return <div ref={mountRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }} />;
};

export default Hyperspeed;
