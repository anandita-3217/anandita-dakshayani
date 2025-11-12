import React, { useEffect, useRef } from "react";
import { Box } from "@chakra-ui/react";

export default function InteractiveGridBackground({ children }) {
  const canvasRef = useRef(null);
  const glowRef = useRef({ col: -1, row: -1, alpha: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;

    const cellSize = 10;
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

    const drawGrid = () => {
      ctx.fillStyle = "#0c0c0c";
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = baseColor;
      ctx.lineWidth = 1;

      for (let x = 0; x <= width; x += cellSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = 0; y <= height; y += cellSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    };

    const drawGlow = () => {
      drawGrid();

      const { col, row, alpha } = glowRef.current;
      if (col < 0 || row < 0 || alpha <= 0.01) return;

      const fadeFactor = alpha;
      ctx.lineWidth = 1;
      ctx.shadowColor = glowColor;
      ctx.shadowBlur = 8 * fadeFactor;

      const x = col * cellSize;
      const y = row * cellSize;

      // Full glow on hovered square
      ctx.strokeStyle = `rgba(20, 184, 166, ${fadeFactor})`;
      ctx.beginPath();
      ctx.rect(x, y, cellSize, cellSize);
      ctx.stroke();

      // Function to draw a half-edge glow into neighbor squares
      const drawHalfGlowEdge = (dx, dy, intensity) => {
        const sharedAlpha = fadeFactor * intensity;
        ctx.strokeStyle = `rgba(20, 184, 166, ${sharedAlpha})`;

        ctx.beginPath();

        if (dx !== 0) {
          // Left or right shared edge glow
          const sx = dx > 0 ? x + cellSize : x; // edge position
          const offset = (cellSize / 2) * dx; // glow halfway across
          ctx.moveTo(sx, y);
          ctx.lineTo(sx + offset, y);
          ctx.moveTo(sx, y + cellSize);
          ctx.lineTo(sx + offset, y + cellSize);
        }

        if (dy !== 0) {
          // Top or bottom shared edge glow
          const sy = dy > 0 ? y + cellSize : y;
          const offset = (cellSize / 2) * dy;
          ctx.moveTo(x, sy);
          ctx.lineTo(x, sy + offset);
          ctx.moveTo(x + cellSize, sy);
          ctx.lineTo(x + cellSize, sy + offset);
        }

        ctx.stroke();
      };

      // Shared edges glowing halfway into adjacent squares
      drawHalfGlowEdge(-1, 0, 0.6); // left
      drawHalfGlowEdge(1, 0, 0.6); // right
      drawHalfGlowEdge(0, -1, 0.6); // top
      drawHalfGlowEdge(0, 1, 0.6); // bottom

      ctx.shadowBlur = 0;
    };

    const animate = () => {
      drawGlow();
      glowRef.current.alpha *= 0.9;
      requestAnimationFrame(animate);
    };

    animate();

    const handlePointerMove = (e) => {
      const scrollY = window.scrollY;
      const mx = e.clientX;
      const my = e.clientY + scrollY;
      const col = Math.floor(mx / cellSize);
      const row = Math.floor(my / cellSize);
      glowRef.current = { col, row, alpha: 1 };
    };

    const handleScroll = () => {
      const newHeight = Math.max(window.innerHeight, document.body.scrollHeight);
      if (newHeight > height) resizeCanvas();
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box position="relative" zIndex={0}>
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
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
