import React, { useRef, useEffect } from "react";
import { Box } from "@chakra-ui/react";

export default function NeonLinesBackground({ children }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = window.innerWidth;
    let height = window.innerHeight;
    let lines = [];
    const numLines = 30;
    const speed = 0.5;
    const color = "#14b8a6";

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const mouse = { x: width / 2, y: height / 2 };

    for (let i = 0; i < numLines; i++) {
      lines.push({
        y: (i / numLines) * height,
        offset: Math.random() * width,
        speed: speed + Math.random(),
      });
    }

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    window.addEventListener("resize", resize);

    function animate() {
      ctx.clearRect(0, 0, width, height);
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "rgba(20,184,166,0.1)");
      gradient.addColorStop(1, "rgba(20,184,166,0.3)");
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1.5;

      for (let line of lines) {
        line.offset += line.speed;
        const brightness =
          0.3 + 0.7 * Math.exp(-Math.pow((line.y - mouse.y) / 150, 2));
        ctx.globalAlpha = brightness;

        const y = (line.y + Math.sin(line.offset / 50) * 10) % height;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
      requestAnimationFrame(animate);
    }

    animate();

    function onMove(e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }

    window.addEventListener("pointermove", onMove);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <Box position="relative" zIndex={0}>
      {/* fixed canvas background */}
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1, // stays behind content
          pointerEvents: "none", // allows scrolling & interaction
          backgroundColor: "#0c0c0c",
        }}
      />
      {/* your actual content renders above */}
      <Box position="relative" zIndex={1}>
        {children}
      </Box>
    </Box>
  );
}
