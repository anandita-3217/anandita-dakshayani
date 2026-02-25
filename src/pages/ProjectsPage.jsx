import React, { useRef } from 'react';
import { Box } from '@chakra-ui/react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useColorModeValue } from '@chakra-ui/react';

import Learning from '../components/Learning';
import Projects from '../components/Projects';
import ProjectsIndex from '../components/ProjectPageBits/ProjectsIndex';
import DotGrid from '../components/assets/DotGrid/DotGrid';
import Header from '../components/Header';
import Footer from '../components/Footer';
const ParallaxSection = ({ children, speed = 0.5, direction = 1 }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Transform scroll progress to Y position
  const y = useTransform(
    scrollYProgress, 
    [0, 1], 
    [100 * direction * speed, -100 * direction * speed]
  );
  
  // Add spring physics for smooth motion
  const springY = useSpring(y, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <Box ref={ref} position="relative">
      <motion.div style={{ y: springY }}>
        {children}
      </motion.div>
    </Box>
  );
};

// Fade in as section enters viewport
const FadeInSection = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.5"]
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);

  return (
    <Box ref={ref}>
      <motion.div 
        style={{ opacity, scale }}
        transition={{ delay }}
      >
        {children}
      </motion.div>
    </Box>
  );
};
export default function ProjectsPage() {
  const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress,{
      stiffness: 100,
      damping: 30,
      restDelta: 0.001
      
    })
    const gradientColors = useColorModeValue(
      ['#ff0080', '#6366f1', '#3b82f6'],
      ['#ff00ff', '#8000ff', '#0080ff']
    );
    
    const baseColor = useColorModeValue("#d4dadc", '#1a1a1a');
  const progressBg = useColorModeValue(
    'linear-gradient(90deg, #ec4899, #a855f7, #6366f1)',
    'linear-gradient(90deg, #ec4899, #a855f7, #6366f1)'
  );

  return (
    <Box position="relative" overflow="hidden">
            {/* Scroll Progress Bar */}
      <motion.div
        style={{
          scaleX,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: progressBg,
          transformOrigin: '0%',
          zIndex: 9999
        }}
      />

      {/* Animated Dot Grid Background */}
      <DotGrid
        dotSize={5}
        gap={15}
        baseColor={baseColor}
        activeColor={gradientColors}
        proximity={85}
        shockRadius={170}
        shockStrength={3}
        resistance={750}
        returnDuration={1.5}
      />

      {/* Fixed Header */}
      <Header />
      <Box position="relative" zIndex={1}>
              {/* TODO: https://aayushbharti.in/projects/snippix  make a page like this for the first 4 projects */}
      {/* About Section - Slow upward parallax */}
      <FadeInSection>
        <ParallaxSection speed={0.3} direction={1}>
          <ProjectsIndex/>
        </ParallaxSection>
      </FadeInSection>
      <FadeInSection delay={0.1}>
          <ParallaxSection speed={0.6} direction={-1}>
            <Learning />
          </ParallaxSection>
      </FadeInSection>
      <FadeInSection delay={0.2}>
        <ParallaxSection speed={0.4} direction={1}>
          <Projects />
        </ParallaxSection>
      </FadeInSection>
      </Box>
      <Footer/>
    </Box>
  );
}