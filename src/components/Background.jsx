// // import React, { useEffect, useRef } from 'react';
// // import { Box } from '@chakra-ui/react';

// // function InteractiveGridBackground({ children }) {
// //   const canvasRef = useRef(null);
// //   const mouseRef = useRef({ x: 0, y: 0 });
// //   const animationRef = useRef(null);

// //   useEffect(() => {
// //     const canvas = canvasRef.current;
// //     if (!canvas) return;

// //     const ctx = canvas.getContext('2d');
// //     let width = window.innerWidth;
// //     let height = document.documentElement.scrollHeight;

// //     // Set canvas size
// //     const setCanvasSize = () => {
// //       width = window.innerWidth;
// //       height = document.documentElement.scrollHeight;
// //       canvas.width = width;
// //       canvas.height = height;
// //     };

// //     setCanvasSize();

// //     // Grid settings to match CSS grid (55px)
// //     const gridSize = 55;
// //     const glowRadius = 200;

// //     // Track mouse position
// //     const handleMouseMove = (e) => {
// //       mouseRef.current = {
// //         x: e.clientX,
// //         y: e.clientY + window.scrollY
// //       };
// //     };

// //     // Draw glow effect
// //     const drawGlow = () => {
// //       ctx.clearRect(0, 0, width, height);
      
// //       const mouse = mouseRef.current;

// //       // Draw vertical line glows
// //       for (let x = 0; x <= width; x += gridSize) {
// //         const distanceX = Math.abs(x - mouse.x);
// //         if (distanceX < glowRadius) {
// //           const opacity = (1 - distanceX / glowRadius) * 0.6;
          
// //           // Draw vertical glow
// //           const gradient = ctx.createLinearGradient(x - 20, 0, x + 20, 0);
// //           gradient.addColorStop(0, 'rgba(20, 184, 166, 0)');
// //           gradient.addColorStop(0.5, `rgba(20, 184, 166, ${opacity})`);
// //           gradient.addColorStop(1, 'rgba(20, 184, 166, 0)');
          
// //           ctx.fillStyle = gradient;
// //           ctx.fillRect(x - 20, Math.max(0, mouse.y - glowRadius), 40, glowRadius * 2);
// //         }
// //       }

// //       // Draw horizontal line glows
// //       for (let y = 0; y <= height; y += gridSize) {
// //         const distanceY = Math.abs(y - mouse.y);
// //         if (distanceY < glowRadius) {
// //           const opacity = (1 - distanceY / glowRadius) * 0.6;
          
// //           // Draw horizontal glow
// //           const gradient = ctx.createLinearGradient(0, y - 20, 0, y + 20);
// //           gradient.addColorStop(0, 'rgba(20, 184, 166, 0)');
// //           gradient.addColorStop(0.5, `rgba(20, 184, 166, ${opacity})`);
// //           gradient.addColorStop(1, 'rgba(20, 184, 166, 0)');
          
// //           ctx.fillStyle = gradient;
// //           ctx.fillRect(Math.max(0, mouse.x - glowRadius), y - 20, glowRadius * 2, 40);
// //         }
// //       }

// //       // Draw radial glow at cursor position
// //       const radialGradient = ctx.createRadialGradient(
// //         mouse.x, mouse.y, 0,
// //         mouse.x, mouse.y, glowRadius
// //       );
// //       radialGradient.addColorStop(0, 'rgba(20, 184, 166, 0.15)');
// //       radialGradient.addColorStop(0.5, 'rgba(20, 184, 166, 0.05)');
// //       radialGradient.addColorStop(1, 'rgba(20, 184, 166, 0)');
      
// //       ctx.fillStyle = radialGradient;
// //       ctx.fillRect(
// //         mouse.x - glowRadius, 
// //         mouse.y - glowRadius, 
// //         glowRadius * 2, 
// //         glowRadius * 2
// //       );

// //       animationRef.current = requestAnimationFrame(drawGlow);
// //     };

// //     // Handle resize
// //     const handleResize = () => {
// //       setCanvasSize();
// //     };

// //     window.addEventListener('mousemove', handleMouseMove);
// //     window.addEventListener('resize', handleResize);

// //     // Start animation
// //     drawGlow();

// //     // Cleanup
// //     return () => {
// //       window.removeEventListener('mousemove', handleMouseMove);
// //       window.removeEventListener('resize', handleResize);
// //       if (animationRef.current) {
// //         cancelAnimationFrame(animationRef.current);
// //       }
// //     };
// //   }, []);

// //   return (
// //     <Box 
// //       position="relative" 
// //       minH="100vh"
// //       w="100%"
// //       bg="#0c0c0c"
// //       sx={{
// //         '--color': '#1e1e1e',
// //         backgroundImage: `
// //           linear-gradient(
// //             0deg,
// //             transparent 24%,
// //             var(--color) 25%,
// //             var(--color) 26%,
// //             transparent 27%,
// //             transparent 74%,
// //             var(--color) 75%,
// //             var(--color) 76%,
// //             transparent 77%,
// //             transparent
// //           ),
// //           linear-gradient(
// //             90deg,
// //             transparent 24%,
// //             var(--color) 25%,
// //             var(--color) 26%,
// //             transparent 27%,
// //             transparent 74%,
// //             var(--color) 75%,
// //             var(--color) 76%,
// //             transparent 77%,
// //             transparent
// //           )
// //         `,
// //         backgroundSize: '55px 55px'
// //       }}
// //     >
// //       {/* Canvas for glow effect */}
// //       <canvas
// //         ref={canvasRef}
// //         style={{
// //           position: 'fixed',
// //           top: 0,
// //           left: 0,
// //           width: '100%',
// //           height: '100%',
// //           pointerEvents: 'none',
// //           zIndex: 1,
// //           mixBlendMode: 'screen'
// //         }}
// //       />
      
// //       {/* Content */}
// //       <Box position="relative" zIndex={2}>
// //         {children}
// //       </Box>
// //     </Box>
// //   );
// // }

// // export default InteractiveGridBackground;
import React, { useRef, useEffect, useCallback, useMemo } from 'react';
import { Box } from '@chakra-ui/react';

const throttle = (func, limit) => {
  let lastCall = 0;
  return function (...args) {
    const now = performance.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      func.apply(this, args);
    }
  };
};

function hexToRgb(hex) {
  const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!m) return { r: 0, g: 0, b: 0 };
  return {
    r: parseInt(m[1], 16),
    g: parseInt(m[2], 16),
    b: parseInt(m[3], 16)
  };
}

function InteractiveGridBackground({ 
  children,
  dotSize = 2,
  gap = 55,
  baseColor = '#1e1e1e',
  activeColor = '#14b8a6',
  proximity = 150
}) {
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);
  const dotsRef = useRef([]);
  const pointerRef = useRef({
    x: -1000,
    y: -1000
  });

  const baseRgb = useMemo(() => hexToRgb(baseColor), [baseColor]);
  const activeRgb = useMemo(() => hexToRgb(activeColor), [activeColor]);

  const circlePath = useMemo(() => {
    if (typeof window === 'undefined' || !window.Path2D) return null;
    const p = new window.Path2D();
    p.arc(0, 0, dotSize / 2, 0, Math.PI * 2);
    return p;
  }, [dotSize]);

  const buildGrid = useCallback(() => {
    const wrap = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const { width, height } = wrap.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.scale(dpr, dpr);

    const cols = Math.floor((width + gap) / (dotSize + gap));
    const rows = Math.floor((height + gap) / (dotSize + gap));
    const cell = dotSize + gap;

    const gridW = cell * cols - gap;
    const gridH = cell * rows - gap;

    const extraX = width - gridW;
    const extraY = height - gridH;

    const startX = extraX / 2 + dotSize / 2;
    const startY = extraY / 2 + dotSize / 2;

    const dots = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const cx = startX + x * cell;
        const cy = startY + y * cell;
        dots.push({ cx, cy });
      }
    }
    dotsRef.current = dots;
  }, [dotSize, gap]);

  useEffect(() => {
    if (!circlePath) return;

    let rafId;
    const proxSq = proximity * proximity;

    const draw = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const { x: px, y: py } = pointerRef.current;

      for (const dot of dotsRef.current) {
        const dx = dot.cx - px;
        const dy = dot.cy - py;
        const dsq = dx * dx + dy * dy;

        let style = baseColor;
        if (dsq <= proxSq) {
          const dist = Math.sqrt(dsq);
          const t = 1 - dist / proximity;
          const r = Math.round(baseRgb.r + (activeRgb.r - baseRgb.r) * t);
          const g = Math.round(baseRgb.g + (activeRgb.g - baseRgb.g) * t);
          const b = Math.round(baseRgb.b + (activeRgb.b - baseRgb.b) * t);
          style = `rgb(${r},${g},${b})`;
        }

        ctx.save();
        ctx.translate(dot.cx, dot.cy);
        ctx.fillStyle = style;
        ctx.fill(circlePath);
        ctx.restore();
      }

      rafId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(rafId);
  }, [proximity, baseColor, activeRgb, baseRgb, circlePath]);

  useEffect(() => {
    buildGrid();
    let ro = null;
    if ('ResizeObserver' in window) {
      ro = new ResizeObserver(buildGrid);
      wrapperRef.current && ro.observe(wrapperRef.current);
    } else {
      window.addEventListener('resize', buildGrid);
    }
    return () => {
      if (ro) ro.disconnect();
      else window.removeEventListener('resize', buildGrid);
    };
  }, [buildGrid]);

  useEffect(() => {
    const onMove = throttle((e) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const rect = canvas.getBoundingClientRect();
      pointerRef.current.x = e.clientX - rect.left;
      pointerRef.current.y = e.clientY - rect.top;
    }, 16);

    window.addEventListener('mousemove', onMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <Box 
      position="relative" 
      minH="100vh"
      w="100%"
      bg="#0c0c0c"
      sx={{
        '--color': '#1e1e1e',
        backgroundImage: `
          linear-gradient(
            0deg,
            transparent 24%,
            var(--color) 25%,
            var(--color) 26%,
            transparent 27%,
            transparent 74%,
            var(--color) 75%,
            var(--color) 76%,
            transparent 77%,
            transparent
          ),
          linear-gradient(
            90deg,
            transparent 24%,
            var(--color) 25%,
            var(--color) 26%,
            transparent 27%,
            transparent 74%,
            var(--color) 75%,
            var(--color) 76%,
            transparent 77%,
            transparent
          )
        `,
        backgroundSize: '55px 55px'
      }}
    >
      {/* Dot Grid Overlay */}
      <Box
        position="fixed"
        top={0}
        left={0}
        w="100%"
        h="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        pointerEvents="none"
        zIndex={1}
      >
        <Box
          ref={wrapperRef}
          w="100%"
          h="100%"
          position="relative"
        >
          <canvas
            ref={canvasRef}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none'
            }}
          />
        </Box>
      </Box>
      
      {/* Content */}
      <Box position="relative" zIndex={2}>
        {children}
      </Box>
    </Box>
  );
}

export default InteractiveGridBackground;
