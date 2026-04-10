// TODO: For some reason the contact section opens up every time - look into that 

import React, { useState,useRef } from 'react';
import { Box } from '@chakra-ui/react';
import { motion, useScroll, useInView , useTransform, useSpring } from 'framer-motion';
import { useColorModeValue } from '@chakra-ui/react';

import ProjectsHero from '../components/ProjectPageBits/ProjectsHero'
import Projects from '../components/ProjectPageBits/Projects';

import DotGrid from '../components/assets/DotGrid/DotGrid';

import ContactTerminal from '../components/ui/ContactTerminal';
import StatsTicker from '../components/ui/StatsTicker';
// import ProjectsConstellation from '../components/ProjectPageBits/ProjectsConstellation';

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
// TODO: When i need to add a data to a front end project like this how do i choose the data between a js file and a json file
// Fade in as section enters viewport
// const FadeInSection = ({ children, delay = 0 }) => {
//   const ref = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: ref,
//     offset: ["start 0.9", "start 0.5"]
//   });

//   const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
//   const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);

//   return (
//     <Box ref={ref}>
//       <motion.div 
//         style={{ opacity, scale }}
//         transition={{ delay }}
//       >
//         {children}
//       </motion.div>
//     </Box>
//   );
// };

const FadeInSection = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <Box ref={ref}>
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 16 }}
        animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ duration: 0.55, delay, ease: [0.23, 1, 0.32, 1] }}
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
  const [techFilter, setTechFilter] = useState(null);

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
      <Box position="relative" zIndex={1} pt={{ base: "100px", md: "120px" }} px={"70px"}>
              {/* TODO: https://aayushbharti.in/projects/snippix  make a page like this for the first 4 projects */}
        <StatsTicker/>
        <ProjectsHero/>

      <FadeInSection delay={0.2}>
        <ParallaxSection speed={0.4} direction={1}>
          <Projects />
                  </ParallaxSection>
      </FadeInSection>
        <FadeInSection delay={0.2}>
        <ParallaxSection speed={0.4} direction={1}>
            <ContactTerminal/>{/*  Cool will put here*/}
          </ParallaxSection>
        </FadeInSection>
      </Box>
      <Footer/>
    </Box>
  );
}