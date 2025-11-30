import React, { useRef, useEffect } from 'react';

const Dither = ({
    waveSpeed = 0.05,
    waveFrequency = 3,
    waveAmplitude = 10,
    waveColor = [80, 80, 80],
    backgroundColor = [0, 0, 0],
    disableAnimation = false,
    enableMouseInteraction = true,
    mouseRadius = 200,
    mouseStrength = 20,
}) => {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const timeRef = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const gl = canvas.getContext('webgl');
        if (!gl) {
            console.error('WebGL not supported');
            return;
        }

        const vertexShaderSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

        const fragmentShaderSource = `
      precision mediump float;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec2 u_mouse;
      uniform float u_waveSpeed;
      uniform float u_waveFrequency;
      uniform float u_waveAmplitude;
      uniform vec3 u_waveColor;
      uniform vec3 u_backgroundColor;
      uniform bool u_enableMouse;
      uniform float u_mouseRadius;
      uniform float u_mouseStrength;

      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
      }

      void main() {
        vec2 st = gl_FragCoord.xy / u_resolution.xy;
        st.x *= u_resolution.x / u_resolution.y;

        // Wave effect
        float wave = sin(st.x * u_waveFrequency + u_time * u_waveSpeed) * u_waveAmplitude;
        
        // Mouse interaction
        if (u_enableMouse) {
          vec2 mousePos = u_mouse / u_resolution;
          mousePos.x *= u_resolution.x / u_resolution.y;
          float dist = distance(st, mousePos);
          if (dist < u_mouseRadius / u_resolution.x) {
            wave += (1.0 - dist / (u_mouseRadius / u_resolution.x)) * u_mouseStrength;
          }
        }

        // Dither pattern
        float noise = random(gl_FragCoord.xy);
        float dither = step(0.5, noise + wave * 0.01);

        vec3 color = mix(u_backgroundColor / 255.0, u_waveColor / 255.0, dither);
        gl_FragColor = vec4(color, 1.0);
      }
    `;

        const createShader = (gl, type, source) => {
            const shader = gl.createShader(type);
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error(gl.getShaderInfoLog(shader));
                gl.deleteShader(shader);
                return null;
            }
            return shader;
        };

        const createProgram = (gl, vertexShader, fragmentShader) => {
            const program = gl.createProgram();
            gl.attachShader(program, vertexShader);
            gl.attachShader(program, fragmentShader);
            gl.linkProgram(program);
            if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
                console.error(gl.getProgramInfoLog(program));
                gl.deleteProgram(program);
                return null;
            }
            return program;
        };

        const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
        const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
        const program = createProgram(gl, vertexShader, fragmentShader);

        const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        const positions = [
            -1, -1,
            1, -1,
            -1, 1,
            -1, 1,
            1, -1,
            1, 1,
        ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

        const resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution');
        const timeUniformLocation = gl.getUniformLocation(program, 'u_time');
        const mouseUniformLocation = gl.getUniformLocation(program, 'u_mouse');
        const waveSpeedUniformLocation = gl.getUniformLocation(program, 'u_waveSpeed');
        const waveFrequencyUniformLocation = gl.getUniformLocation(program, 'u_waveFrequency');
        const waveAmplitudeUniformLocation = gl.getUniformLocation(program, 'u_waveAmplitude');
        const waveColorUniformLocation = gl.getUniformLocation(program, 'u_waveColor');
        const backgroundColorUniformLocation = gl.getUniformLocation(program, 'u_backgroundColor');
        const enableMouseUniformLocation = gl.getUniformLocation(program, 'u_enableMouse');
        const mouseRadiusUniformLocation = gl.getUniformLocation(program, 'u_mouseRadius');
        const mouseStrengthUniformLocation = gl.getUniformLocation(program, 'u_mouseStrength');

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const handleMouseMove = (e) => {
            mouseRef.current = { x: e.clientX, y: window.innerHeight - e.clientY };
        };

        if (enableMouseInteraction) {
            window.addEventListener('mousemove', handleMouseMove);
        }

        const render = (time) => {
            if (disableAnimation) return;

            timeRef.current = time * 0.001;

            gl.useProgram(program);
            gl.enableVertexAttribArray(positionAttributeLocation);
            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
            gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

            gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
            gl.uniform1f(timeUniformLocation, timeRef.current);
            gl.uniform2f(mouseUniformLocation, mouseRef.current.x, mouseRef.current.y);
            gl.uniform1f(waveSpeedUniformLocation, waveSpeed);
            gl.uniform1f(waveFrequencyUniformLocation, waveFrequency);
            gl.uniform1f(waveAmplitudeUniformLocation, waveAmplitude);
            gl.uniform3f(waveColorUniformLocation, waveColor[0], waveColor[1], waveColor[2]);
            gl.uniform3f(backgroundColorUniformLocation, backgroundColor[0], backgroundColor[1], backgroundColor[2]);
            gl.uniform1i(enableMouseUniformLocation, enableMouseInteraction ? 1 : 0);
            gl.uniform1f(mouseRadiusUniformLocation, mouseRadius);
            gl.uniform1f(mouseStrengthUniformLocation, mouseStrength);

            gl.drawArrays(gl.TRIANGLES, 0, 6);

            requestAnimationFrame(render);
        };

        requestAnimationFrame(render);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [waveSpeed, waveFrequency, waveAmplitude, waveColor, backgroundColor, disableAnimation, enableMouseInteraction, mouseRadius, mouseStrength]);

    return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, background: '#000' }} />;
};

export default Dither;
