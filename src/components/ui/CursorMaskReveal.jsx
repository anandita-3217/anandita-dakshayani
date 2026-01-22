import React, { useRef, useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const CursorMaskReveal = ({ 
  children, 
  revealContent,
  maskSize = 200,
  springConfig = { damping: 25, stiffness: 200 }
}) => {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, [mouseX, mouseY]);

  return (
    <Box
      ref={containerRef}
      position="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      overflow="hidden"
      cursor="none"
    >
      {/* Base content */}
      <Box position="relative" zIndex={1}>
        {children}
      </Box>

      {/* Revealed content with mask */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 2,
          pointerEvents: 'none',
          opacity: isHovered ? 1 : 0,
        }}
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            WebkitMaskImage: useTransform(
              [smoothX, smoothY],
              ([x, y]) => `radial-gradient(circle ${maskSize}px at ${x}px ${y}px, black, transparent)`
            ),
            maskImage: useTransform(
              [smoothX, smoothY],
              ([x, y]) => `radial-gradient(circle ${maskSize}px at ${x}px ${y}px, black, transparent)`
            ),
          }}
        >
          {revealContent}
        </motion.div>
      </motion.div>

      {/* Custom cursor */}
      {isHovered && (
        <motion.div
          style={{
            position: 'absolute',
            width: maskSize * 2,
            height: maskSize * 2,
            border: '2px solid rgba(236, 72, 153, 0.5)',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 3,
            x: smoothX,
            y: smoothY,
            translateX: '-50%',
            translateY: '-50%',
          }}
        />
      )}
    </Box>
  );
};

export default CursorMaskReveal;