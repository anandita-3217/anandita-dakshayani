// InteractiveGridBackground.jsx
import React, { useEffect, useRef } from "react";
import { Box } from "@chakra-ui/react";

export default function Background({ children }) {
  const canvasRef = useRef(null);
  const glowRef = useRef({ col: -1, row: -1, alpha: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;

    const cellSize = 55;
    const baseColor = "#1e1e1e";
    const glowColor = "#14b8a6";

    let width, height;

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

      // vertical lines
      for (let x = 0; x <= width; x += cellSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // horizontal lines
      for (let y = 0; y <= height; y += cellSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    }

    function drawGlow() {
      drawGrid();

      const { col, row, alpha } = glowRef.current;
      if (col < 0 || row < 0 || alpha <= 0.01) return;

      ctx.strokeStyle = `rgba(20, 184, 166, ${alpha})`;
      ctx.lineWidth = 1; // thinner glow edge
      ctx.shadowColor = glowColor;
      ctx.shadowBlur = 8 * alpha;

      const x = col * cellSize;
      const y = row * cellSize;

      // draw main square edges
      ctx.beginPath();
      ctx.rect(x, y, cellSize, cellSize);
      ctx.stroke();

      // glow shared edges with adjacent squares
      const drawSharedEdge = (dx, dy) => {
        const nx = (col + dx) * cellSize;
        const ny = (row + dy) * cellSize;
        ctx.beginPath();
        // shared vertical edges
        if (dx !== 0 && dy === 0) {
          const sx = dx > 0 ? nx : x;
          ctx.moveTo(sx, y);
          ctx.lineTo(sx, y + cellSize);
        }
        // shared horizontal edges
        if (dy !== 0 && dx === 0) {
          const sy = dy > 0 ? ny : y;
          ctx.moveTo(x, sy);
          ctx.lineTo(x + cellSize, sy);
        }
        ctx.stroke();
      };

      // draw shared edges with neighbors (up, down, left, right)
      drawSharedEdge(-1, 0); // left
      drawSharedEdge(1, 0); // right
      drawSharedEdge(0, -1); // up
      drawSharedEdge(0, 1); // down

      ctx.shadowBlur = 0; // reset shadow
    }

    function animate() {
      drawGlow();
      glowRef.current.alpha *= 0.9; // fade glow smoothly
      requestAnimationFrame(animate);
    }

    animate();

    function handlePointerMove(e) {
      const scrollY = window.scrollY;
      const mx = e.clientX;
      const my = e.clientY + scrollY;
      const col = Math.floor(mx / cellSize);
      const row = Math.floor(my / cellSize);
      glowRef.current = { col, row, alpha: 1 };
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
