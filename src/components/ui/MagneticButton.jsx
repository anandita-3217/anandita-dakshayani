import React, { useRef, useState } from 'react';
import { Button } from '@chakra-ui/react';
import { motion, useSpring } from 'framer-motion';

const MotionButton = motion.create(Button);

const MagneticButton = ({ 
  children, 
  strength = 0.3,
  springConfig = { damping: 15, stiffness: 150 },
  ...props 
}) => {
  const buttonRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = (e) => {
    if (!buttonRef.current || !isHovered) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = (e.clientX - centerX) * strength;
    const distanceY = (e.clientY - centerY) * strength;

    x.set(distanceX);
    y.set(distanceY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <MotionButton
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        x,
        y,
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      {...props}
    >
      {children}
    </MotionButton>
  );
};

export default MagneticButton;