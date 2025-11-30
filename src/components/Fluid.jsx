import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const Fluid = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const container = mountRef.current;
        const width = window.innerWidth;
        const height = window.innerHeight;

        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(width, height);
        container.appendChild(renderer.domElement);

        const geometry = new THREE.PlaneGeometry(2, 2);
        const uniforms = {
            u_time: { value: 0.0 },
            u_resolution: { value: new THREE.Vector2(width, height) },
            u_mouse: { value: new THREE.Vector2(0, 0) }
        };

        const material = new THREE.ShaderMaterial({
            uniforms,
            vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
            fragmentShader: `
        uniform float u_time;
        uniform vec2 u_resolution;
        uniform vec2 u_mouse;
        varying vec2 vUv;

        // Simplex noise function
        vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

        float snoise(vec2 v){
          const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                   -0.577350269189626, 0.024390243902439);
          vec2 i  = floor(v + dot(v, C.yy) );
          vec2 x0 = v -   i + dot(i, C.xx);
          vec2 i1;
          i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
          vec4 x12 = x0.xyxy + C.xxzz;
          x12.xy -= i1;
          i = mod(i, 289.0);
          vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
          + i.x + vec3(0.0, i1.x, 1.0 ));
          vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
          m = m*m ;
          m = m*m ;
          vec3 x = 2.0 * fract(p * C.www) - 1.0;
          vec3 h = abs(x) - 0.5;
          vec3 ox = floor(x + 0.5);
          vec3 a0 = x - ox;
          m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
          vec3 g;
          g.x  = a0.x  * x0.x  + h.x  * x0.y;
          g.yz = a0.yz * x12.xz + h.yz * x12.yw;
          return 130.0 * dot(m, g);
        }

        void main() {
          vec2 st = gl_FragCoord.xy / u_resolution.xy;
          st.x *= u_resolution.x / u_resolution.y;

          vec2 mouse = u_mouse / u_resolution.xy;
          mouse.x *= u_resolution.x / u_resolution.y;

          float t = u_time * 0.2;
          
          float noise1 = snoise(vec2(st.x * 3.0 + t, st.y * 3.0 - t));
          float noise2 = snoise(vec2(st.x * 4.0 - t, st.y * 4.0 + t));
          
          float fluid = snoise(vec2(st.x * 2.0 + noise1, st.y * 2.0 + noise2));
          
          // Colorful gradient based on fluid noise
          vec3 color1 = vec3(0.1, 0.0, 0.3); // Dark purple
          vec3 color2 = vec3(0.0, 0.5, 0.8); // Blue
          vec3 color3 = vec3(0.9, 0.1, 0.4); // Pink
          
          vec3 finalColor = mix(color1, color2, fluid + 0.5);
          finalColor = mix(finalColor, color3, sin(fluid * 3.0 + t));
          
          // Mouse interaction
          float dist = distance(st, mouse);
          finalColor += vec3(0.2, 0.2, 0.5) * (1.0 - smoothstep(0.0, 0.3, dist));

          gl_FragColor = vec4(finalColor, 1.0);
        }
      `
        });

        const plane = new THREE.Mesh(geometry, material);
        scene.add(plane);

        const animate = (time) => {
            uniforms.u_time.value = time * 0.001;
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);

        const handleMouseMove = (e) => {
            uniforms.u_mouse.value.x = e.clientX;
            uniforms.u_mouse.value.y = window.innerHeight - e.clientY;
        };
        window.addEventListener('mousemove', handleMouseMove);

        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            renderer.setSize(width, height);
            uniforms.u_resolution.value.x = width;
            uniforms.u_resolution.value.y = height;
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            container.removeChild(renderer.domElement);
        };
    }, []);

    return <div ref={mountRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }} />;
};

export default Fluid;
