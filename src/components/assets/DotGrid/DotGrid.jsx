'use client';
import { useRef, useEffect, useCallback, useMemo } from 'react';
import { gsap } from 'gsap';
import { InertiaPlugin } from 'gsap/InertiaPlugin';

import './DotGrid.css';

gsap.registerPlugin(InertiaPlugin);

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

const DotGrid = ({
  dotSize = 16,
  gap = 32,
  baseColor = '#5227FF',
  activeColor = '#5227FF',
  proximity = 150,
  speedTrigger = 100,
  shockRadius = 250,
  shockStrength = 5,
  maxSpeed = 5000,
  resistance = 750,
  returnDuration = 1.5,
  className = '',
  style
}) => {
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);
  const dotsRef = useRef([]);
  const pointerRef = useRef({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    speed: 0,
    lastTime: 0,
    lastX: 0,
    lastY: 0
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
        dots.push({ cx, cy, xOffset: 0, yOffset: 0, _inertiaApplied: false });
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
        const ox = dot.cx + dot.xOffset;
        const oy = dot.cy + dot.yOffset;
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
        ctx.translate(ox, oy);
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
    const onMove = e => {
      const now = performance.now();
      const pr = pointerRef.current;
      const dt = pr.lastTime ? now - pr.lastTime : 16;
      const dx = e.clientX - pr.lastX;
      const dy = e.clientY - pr.lastY;
      let vx = (dx / dt) * 1000;
      let vy = (dy / dt) * 1000;
      let speed = Math.hypot(vx, vy);
      if (speed > maxSpeed) {
        const scale = maxSpeed / speed;
        vx *= scale;
        vy *= scale;
        speed = maxSpeed;
      }
      pr.lastTime = now;
      pr.lastX = e.clientX;
      pr.lastY = e.clientY;
      pr.vx = vx;
      pr.vy = vy;
      pr.speed = speed;

      const rect = canvasRef.current.getBoundingClientRect();
      pr.x = e.clientX - rect.left;
      pr.y = e.clientY - rect.top;

      for (const dot of dotsRef.current) {
        const dist = Math.hypot(dot.cx - pr.x, dot.cy - pr.y);
        if (speed > speedTrigger && dist < proximity && !dot._inertiaApplied) {
          dot._inertiaApplied = true;
          gsap.killTweensOf(dot);
          const pushX = dot.cx - pr.x + vx * 0.005;
          const pushY = dot.cy - pr.y + vy * 0.005;
          gsap.to(dot, {
            inertia: { xOffset: pushX, yOffset: pushY, resistance },
            onComplete: () => {
              gsap.to(dot, {
                xOffset: 0,
                yOffset: 0,
                duration: returnDuration,
                ease: 'elastic.out(1,0.75)'
              });
              dot._inertiaApplied = false;
            }
          });
        }
      }
    };

    const onClick = e => {
      const rect = canvasRef.current.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      for (const dot of dotsRef.current) {
        const dist = Math.hypot(dot.cx - cx, dot.cy - cy);
        if (dist < shockRadius && !dot._inertiaApplied) {
          dot._inertiaApplied = true;
          gsap.killTweensOf(dot);
          const falloff = Math.max(0, 1 - dist / shockRadius);
          const pushX = (dot.cx - cx) * shockStrength * falloff;
          const pushY = (dot.cy - cy) * shockStrength * falloff;
          gsap.to(dot, {
            inertia: { xOffset: pushX, yOffset: pushY, resistance },
            onComplete: () => {
              gsap.to(dot, {
                xOffset: 0,
                yOffset: 0,
                duration: returnDuration,
                ease: 'elastic.out(1,0.75)'
              });
              dot._inertiaApplied = false;
            }
          });
        }
      }
    };

    const throttledMove = throttle(onMove, 50);
    window.addEventListener('mousemove', throttledMove, { passive: true });
    window.addEventListener('click', onClick);

    return () => {
      window.removeEventListener('mousemove', throttledMove);
      window.removeEventListener('click', onClick);
    };
  }, [maxSpeed, speedTrigger, proximity, resistance, returnDuration, shockRadius, shockStrength]);

  return (
    <section className={`dot-grid ${className}`} style={style}>
      <div ref={wrapperRef} className="dot-grid__wrap">
        <canvas ref={canvasRef} className="dot-grid__canvas" />
      </div>
    </section>
  );
};

export default DotGrid;


// import { useRef, useEffect, useCallback, useMemo } from 'react';
// import { gsap } from 'gsap';
// import { InertiaPlugin } from 'gsap/InertiaPlugin';

// gsap.registerPlugin(InertiaPlugin);

// const throttle = (func, limit) => {
//   let lastCall = 0;
//   return function (...args) {
//     const now = performance.now();
//     if (now - lastCall >= limit) {
//       lastCall = now;
//       func.apply(this, args);
//     }
//   };
// };

// function hexToRgb(hex) {
//   const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
//   if (!m) return { r: 0, g: 0, b: 0 };
//   return {
//     r: parseInt(m[1], 16),
//     g: parseInt(m[2], 16),
//     b: parseInt(m[3], 16)
//   };
// }

// // Function to interpolate between multiple colors based on position
// function getGradientColor(x, y, width, height, gradientColors) {
//   // Calculate diagonal position (0 to 1)
//   const diagonalProgress = (x / width + y / height) / 2;
  
//   // Find which two colors to interpolate between
//   const segmentSize = 1 / (gradientColors.length - 1);
//   const segmentIndex = Math.floor(diagonalProgress / segmentSize);
//   const localProgress = (diagonalProgress % segmentSize) / segmentSize;
  
//   const startColor = gradientColors[Math.min(segmentIndex, gradientColors.length - 1)];
//   const endColor = gradientColors[Math.min(segmentIndex + 1, gradientColors.length - 1)];
  
//   return {
//     r: Math.round(startColor.r + (endColor.r - startColor.r) * localProgress),
//     g: Math.round(startColor.g + (endColor.g - startColor.g) * localProgress),
//     b: Math.round(startColor.b + (endColor.b - startColor.b) * localProgress)
//   };
// }

// const DotGrid = ({
//   dotSize = 16,
//   gap = 32,
//   baseColor = '#1a1a1a',
//   // Gradient colors: pink -> indigo -> blue
//   gradientColors = ['#ec4899', '#8b5cf6', '#3b82f6'],
//   proximity = 150,
//   speedTrigger = 100,
//   shockRadius = 250,
//   shockStrength = 5,
//   maxSpeed = 5000,
//   resistance = 750,
//   returnDuration = 1.5,
//   className = '',
//   style
// }) => {
//   const wrapperRef = useRef(null);
//   const canvasRef = useRef(null);
//   const dotsRef = useRef([]);
//   const pointerRef = useRef({
//     x: 0,
//     y: 0,
//     vx: 0,
//     vy: 0,
//     speed: 0,
//     lastTime: 0,
//     lastX: 0,
//     lastY: 0
//   });

//   const baseRgb = useMemo(() => hexToRgb(baseColor), [baseColor]);
  
//   // Convert gradient colors to RGB
//   const gradientRgb = useMemo(() => 
//     gradientColors.map(color => hexToRgb(color)), 
//     [gradientColors]
//   );

//   const circlePath = useMemo(() => {
//     if (typeof window === 'undefined' || !window.Path2D) return null;

//     const p = new window.Path2D();
//     p.arc(0, 0, dotSize / 2, 0, Math.PI * 2);
//     return p;
//   }, [dotSize]);

//   const buildGrid = useCallback(() => {
//     const wrap = wrapperRef.current;
//     const canvas = canvasRef.current;
//     if (!wrap || !canvas) return;

//     const { width, height } = wrap.getBoundingClientRect();
//     const dpr = window.devicePixelRatio || 1;

//     canvas.width = width * dpr;
//     canvas.height = height * dpr;
//     canvas.style.width = `${width}px`;
//     canvas.style.height = `${height}px`;
//     const ctx = canvas.getContext('2d');
//     if (ctx) ctx.scale(dpr, dpr);

//     const cols = Math.floor((width + gap) / (dotSize + gap));
//     const rows = Math.floor((height + gap) / (dotSize + gap));
//     const cell = dotSize + gap;

//     const gridW = cell * cols - gap;
//     const gridH = cell * rows - gap;

//     const extraX = width - gridW;
//     const extraY = height - gridH;

//     const startX = extraX / 2 + dotSize / 2;
//     const startY = extraY / 2 + dotSize / 2;

//     const dots = [];
//     for (let y = 0; y < rows; y++) {
//       for (let x = 0; x < cols; x++) {
//         const cx = startX + x * cell;
//         const cy = startY + y * cell;
//         dots.push({ cx, cy, xOffset: 0, yOffset: 0, _inertiaApplied: false });
//       }
//     }
//     dotsRef.current = dots;
//   }, [dotSize, gap]);

//   useEffect(() => {
//     if (!circlePath) return;

//     let rafId;
//     const proxSq = proximity * proximity;

//     const draw = () => {
//       const canvas = canvasRef.current;
//       if (!canvas) return;
//       const ctx = canvas.getContext('2d');
//       if (!ctx) return;
      
//       const width = canvas.width / (window.devicePixelRatio || 1);
//       const height = canvas.height / (window.devicePixelRatio || 1);
      
//       ctx.clearRect(0, 0, canvas.width, canvas.height);

//       const { x: px, y: py } = pointerRef.current;

//       for (const dot of dotsRef.current) {
//         const ox = dot.cx + dot.xOffset;
//         const oy = dot.cy + dot.yOffset;
//         const dx = dot.cx - px;
//         const dy = dot.cy - py;
//         const dsq = dx * dx + dy * dy;

//         let style = baseColor;
        
//         if (dsq <= proxSq) {
//           const dist = Math.sqrt(dsq);
//           const proximityFactor = 1 - dist / proximity;
          
//           // Get the gradient color based on dot position
//           const gradientColor = getGradientColor(dot.cx, dot.cy, width, height, gradientRgb);
          
//           // Interpolate between base color and gradient color based on proximity
//           const r = Math.round(baseRgb.r + (gradientColor.r - baseRgb.r) * proximityFactor);
//           const g = Math.round(baseRgb.g + (gradientColor.g - baseRgb.g) * proximityFactor);
//           const b = Math.round(baseRgb.b + (gradientColor.b - baseRgb.b) * proximityFactor);
//           style = `rgb(${r},${g},${b})`;
//         }

//         ctx.save();
//         ctx.translate(ox, oy);
//         ctx.fillStyle = style;
//         ctx.fill(circlePath);
//         ctx.restore();
//       }

//       rafId = requestAnimationFrame(draw);
//     };

//     draw();
//     return () => cancelAnimationFrame(rafId);
//   }, [proximity, baseColor, baseRgb, gradientRgb, circlePath]);

//   useEffect(() => {
//     buildGrid();
//     let ro = null;
//     if ('ResizeObserver' in window) {
//       ro = new ResizeObserver(buildGrid);
//       wrapperRef.current && ro.observe(wrapperRef.current);
//     } else {
//       window.addEventListener('resize', buildGrid);
//     }
//     return () => {
//       if (ro) ro.disconnect();
//       else window.removeEventListener('resize', buildGrid);
//     };
//   }, [buildGrid]);

//   useEffect(() => {
//     const onMove = e => {
//       const now = performance.now();
//       const pr = pointerRef.current;
//       const dt = pr.lastTime ? now - pr.lastTime : 16;
//       const dx = e.clientX - pr.lastX;
//       const dy = e.clientY - pr.lastY;
//       let vx = (dx / dt) * 1000;
//       let vy = (dy / dt) * 1000;
//       let speed = Math.hypot(vx, vy);
//       if (speed > maxSpeed) {
//         const scale = maxSpeed / speed;
//         vx *= scale;
//         vy *= scale;
//         speed = maxSpeed;
//       }
//       pr.lastTime = now;
//       pr.lastX = e.clientX;
//       pr.lastY = e.clientY;
//       pr.vx = vx;
//       pr.vy = vy;
//       pr.speed = speed;

//       const rect = canvasRef.current.getBoundingClientRect();
//       pr.x = e.clientX - rect.left;
//       pr.y = e.clientY - rect.top;

//       for (const dot of dotsRef.current) {
//         const dist = Math.hypot(dot.cx - pr.x, dot.cy - pr.y);
//         if (speed > speedTrigger && dist < proximity && !dot._inertiaApplied) {
//           dot._inertiaApplied = true;
//           gsap.killTweensOf(dot);
//           const pushX = dot.cx - pr.x + vx * 0.005;
//           const pushY = dot.cy - pr.y + vy * 0.005;
//           gsap.to(dot, {
//             inertia: { xOffset: pushX, yOffset: pushY, resistance },
//             onComplete: () => {
//               gsap.to(dot, {
//                 xOffset: 0,
//                 yOffset: 0,
//                 duration: returnDuration,
//                 ease: 'elastic.out(1,0.75)'
//               });
//               dot._inertiaApplied = false;
//             }
//           });
//         }
//       }
//     };

//     const onClick = e => {
//       const rect = canvasRef.current.getBoundingClientRect();
//       const cx = e.clientX - rect.left;
//       const cy = e.clientY - rect.top;
//       for (const dot of dotsRef.current) {
//         const dist = Math.hypot(dot.cx - cx, dot.cy - cy);
//         if (dist < shockRadius && !dot._inertiaApplied) {
//           dot._inertiaApplied = true;
//           gsap.killTweensOf(dot);
//           const falloff = Math.max(0, 1 - dist / shockRadius);
//           const pushX = (dot.cx - cx) * shockStrength * falloff;
//           const pushY = (dot.cy - cy) * shockStrength * falloff;
//           gsap.to(dot, {
//             inertia: { xOffset: pushX, yOffset: pushY, resistance },
//             onComplete: () => {
//               gsap.to(dot, {
//                 xOffset: 0,
//                 yOffset: 0,
//                 duration: returnDuration,
//                 ease: 'elastic.out(1,0.75)'
//               });
//               dot._inertiaApplied = false;
//             }
//           });
//         }
//       }
//     };

//     const throttledMove = throttle(onMove, 50);
//     window.addEventListener('mousemove', throttledMove, { passive: true });
//     window.addEventListener('click', onClick);

//     return () => {
//       window.removeEventListener('mousemove', throttledMove);
//       window.removeEventListener('click', onClick);
//     };
//   }, [maxSpeed, speedTrigger, proximity, resistance, returnDuration, shockRadius, shockStrength]);

//   return (
//     <div 
//       className={`dot-grid ${className}`} 
//       style={{
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         height: '100%',
//         width: '100%',
//         position: 'relative',
//         ...style
//       }}
//     >
//       <div 
//         ref={wrapperRef} 
//         style={{
//           width: '100%',
//           height: '100%',
//           position: 'relative'
//         }}
//       >
//         <canvas 
//           ref={canvasRef}
//           style={{
//             position: 'absolute',
//             inset: 0,
//             width: '100%',
//             height: '100%',
//             pointerEvents: 'none'
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default DotGrid;