// import React, { useEffect, useRef } from "react";
// import { Box } from "@chakra-ui/react";

// export default function Background({ children }) {
//   const canvasRef = useRef(null);
//   const containerRef = useRef(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const container = containerRef.current;
//     const ctx = canvas.getContext("2d");

//     let width = window.innerWidth;
//     let height = window.innerHeight;
//     const cellSize = 55;
//     const baseColor = "#1e1e1e";
//     const glowColor = "#14b8a6";

//     const dpr = window.devicePixelRatio || 1;
//     canvas.width = width * dpr;
//     canvas.height = height * dpr;
//     canvas.style.width = `${width}px`;
//     canvas.style.height = `${height}px`;
//     ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

//     function drawGrid() {
//       ctx.clearRect(0, 0, width, height);
//       ctx.fillStyle = "#0c0c0c";
//       ctx.fillRect(0, 0, width, height);

//       ctx.strokeStyle = baseColor;
//       ctx.lineWidth = 1;
//       for (let x = 0; x < width; x += cellSize) {
//         ctx.beginPath();
//         ctx.moveTo(x, 0);
//         ctx.lineTo(x, height);
//         ctx.stroke();
//       }
//       for (let y = 0; y < height; y += cellSize) {
//         ctx.beginPath();
//         ctx.moveTo(0, y);
//         ctx.lineTo(width, y);
//         ctx.stroke();
//       }
//     }

//     drawGrid();

//     function highlightCell(mx, my) {
//       drawGrid(); // redraw base grid
//       const col = Math.floor(mx / cellSize);
//       const row = Math.floor(my / cellSize);
//       const x = col * cellSize;
//       const y = row * cellSize;

//       ctx.strokeStyle = glowColor;
//       ctx.lineWidth = 2;
//       ctx.shadowColor = glowColor;
//       ctx.shadowBlur = 10;

//       ctx.strokeRect(x, y, cellSize, cellSize);

//       // reset shadow so it doesn't affect future drawings
//       ctx.shadowBlur = 0;
//     }

//     function handlePointerMove(e) {
//       const rect = container.getBoundingClientRect();
//       const mx = e.clientX - rect.left;
//       const my = e.clientY - rect.top;
//       highlightCell(mx, my);
//     }

//     function handleLeave() {
//       drawGrid();
//     }

//     container.addEventListener("pointermove", handlePointerMove);
//     container.addEventListener("pointerleave", handleLeave);

//     const handleResize = () => {
//       width = window.innerWidth;
//       height = window.innerHeight;
//       canvas.width = width * dpr;
//       canvas.height = height * dpr;
//       canvas.style.width = `${width}px`;
//       canvas.style.height = `${height}px`;
//       ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
//       drawGrid();
//     };

//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//       container.removeEventListener("pointermove", handlePointerMove);
//       container.removeEventListener("pointerleave", handleLeave);
//     };
//   }, []);

//   return (
//     <Box ref={containerRef} position="relative" zIndex={0}>
//       {/* fixed canvas for grid and glow effect */}
//       <canvas
//         ref={canvasRef}
//         style={{
//           position: "fixed",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "100%",
//           zIndex: -1,
//           pointerEvents: "none",
//           backgroundColor: "#0c0c0c",
//         }}
//       />
//       {/* content above background */}
//       <Box position="relative" zIndex={1}>
//         {children}
//       </Box>
//     </Box>
//   );
// }

// InteractiveGridBackground.jsx
import React, { useEffect, useRef } from "react";
import { Box } from "@chakra-ui/react";

export default function Background({ children }) {
  const canvasRef = useRef(null);
  const glowRef = useRef({ x: -1, y: -1, alpha: 0 }); // stores last glow position + fade value

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;

    let width = window.innerWidth;
    let height = Math.max(window.innerHeight, document.body.scrollHeight);
    const cellSize = 55;
    const baseColor = "#1e1e1e";
    const glowColor = "#14b8a6";

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = Math.max(window.innerHeight, document.body.scrollHeight);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resizeCanvas();

    function drawGrid() {
      ctx.fillStyle = "#0c0c0c";
      ctx.fillRect(0, 0, width, height);
      ctx.strokeStyle = baseColor;
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += cellSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += cellSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    }

    function draw() {
      drawGrid();

      const { x, y, alpha } = glowRef.current;
      if (x >= 0 && y >= 0 && alpha > 0.01) {
        ctx.strokeStyle = `rgba(20, 184, 166, ${alpha})`;
        ctx.lineWidth = 2;
        ctx.shadowColor = glowColor;
        ctx.shadowBlur = 12 * alpha;
        ctx.strokeRect(x, y, cellSize, cellSize);
        ctx.shadowBlur = 0;
      }

      // fade the glow over time
      glowRef.current.alpha *= 0.9;
      requestAnimationFrame(draw);
    }

    draw();

    function handlePointerMove(e) {
      const scrollY = window.scrollY;
      const mx = e.clientX;
      const my = e.clientY + scrollY;
      const col = Math.floor(mx / cellSize);
      const row = Math.floor(my / cellSize);
      const x = col * cellSize;
      const y = row * cellSize;
      glowRef.current = { x, y, alpha: 1 }; // reset glow
    }

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <Box position="relative" zIndex={0}>
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
          pointerEvents: "none",
          backgroundColor: "#0c0c0c",
        }}
      />
      <Box position="relative" zIndex={1}>
        {children}
      </Box>
    </Box>
  );
}
