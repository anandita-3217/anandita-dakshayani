// import React, { useRef } from 'react';
// import { Box } from '@chakra-ui/react';
// import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
// import { useColorModeValue } from '@chakra-ui/react';

// import AboutPart from '../components/AboutPageBits/AboutPart';
// import Hobbies from '../components/AboutPageBits/Hobbies';
// import Certificates from '../components/AboutPageBits/Certificates';
// import TechSkills from '../components/AboutPageBits/TechSkills';
// import ContributionMap from '../components/AboutPageBits/ContributionMap';
// import Learning from '../components/AboutPageBits/Learning';
// import Resume from '../components/Resume';
// import DotGrid from '../components/assets/DotGrid/DotGrid';
// import Header from '../components/Header';
// import Footer from '../components/Footer';

// // Wrapper for parallax sections
// const ParallaxSection = ({ children, speed = 0.5, direction = 1 }) => {
//   const ref = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: ref,
//     offset: ["start end", "end start"]
//   });

//   // Transform scroll progress to Y position
//   const y = useTransform(
//     scrollYProgress, 
//     [0, 1], 
//     [100 * direction * speed, -100 * direction * speed]
//   );
  
//   // Add spring physics for smooth motion
//   const springY = useSpring(y, {
//     stiffness: 100,
//     damping: 30,
//     restDelta: 0.001
//   });

//   return (
//     <Box ref={ref} position="relative">
//       <motion.div style={{ y: springY }}>
//         {children}
//       </motion.div>
//     </Box>
//   );
// };

// // Fade in as section enters viewport
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

// function AboutPage() {
//   const { scrollYProgress } = useScroll();
//   const scaleX = useSpring(scrollYProgress,{
//     stiffness: 100,
//     damping: 30,
//     restDelta: 0.001
    
//   })
//   const gradientColors = useColorModeValue(
//     ['#ff0080', '#6366f1', '#3b82f6'],
//     ['#ff00ff', '#8000ff', '#0080ff']
//   );
  
//   const baseColor = useColorModeValue("#d4dadc", '#1a1a1a');
  
//   // Progress bar background
//   const progressBg = useColorModeValue(
//     'linear-gradient(90deg, #ec4899, #a855f7, #6366f1)',
//     'linear-gradient(90deg, #ec4899, #a855f7, #6366f1)'
//   );

//   return (
//     <Box position="relative" overflow="hidden">
//       {/* Scroll Progress Bar */}
//       <motion.div
//         style={{
//           scaleX,
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           right: 0,
//           height: '4px',
//           background: progressBg,
//           transformOrigin: '0%',
//           zIndex: 9999
//         }}
//       />

//       {/* Animated Dot Grid Background */}
//       <DotGrid
//         dotSize={5}
//         gap={15}
//         baseColor={baseColor}
//         activeColor={gradientColors}
//         proximity={85}
//         shockRadius={170}
//         shockStrength={3}
//         resistance={750}
//         returnDuration={1.5}
//       />

//       {/* Fixed Header */}
//       <Header />

//       {/* Main Content with Parallax Layers */}
//       <Box position="relative" zIndex={1}>
        
//         {/* About Section - Slow upward parallax */}
//         <FadeInSection>
//           <ParallaxSection speed={0.3} direction={1}>
//             <AboutPart />
//           </ParallaxSection>
//         </FadeInSection>

//         {/* Hobbies - Faster downward parallax */}
//         <FadeInSection delay={0.1}>
//           <ParallaxSection speed={0.6} direction={-1}>
//             <Hobbies />
//           </ParallaxSection>
//         </FadeInSection>

//         {/* Certificates - Slow upward */}
//         <FadeInSection delay={0.2}>
//           <ParallaxSection speed={0.4} direction={1}>
//             <Certificates />
//           </ParallaxSection>
//         </FadeInSection>

//         {/* Tech Skills - Medium speed downward */}
//         <FadeInSection delay={0.1}>
//           <ParallaxSection speed={0.5} direction={-1}>
//             <TechSkills />
//           </ParallaxSection>
//         </FadeInSection>

//         {/* Learning - Slow upward */}
//         <FadeInSection delay={0.2}>
//           <ParallaxSection speed={0.35} direction={1}>
//             <Learning />
//           </ParallaxSection>
//         </FadeInSection>

//         {/* Contribution Map - Subtle parallax */}
//         <FadeInSection delay={0.15}>
//           <ParallaxSection speed={0.3} direction={-1}>
//             <ContributionMap />
//           </ParallaxSection>
//         </FadeInSection>

//         {/* Resume - Final section, gentle parallax */}
//         <FadeInSection delay={0.1}>
//           <ParallaxSection speed={0.2} direction={1}>
//             <Resume />
//           </ParallaxSection>
//         </FadeInSection>
//       </Box>

//       {/* Footer */}
//       <Footer />
//     </Box>
//   );
// }

// export default AboutPage;
import { useRef } from 'react';
import {
  Box,
  Text,
  chakra,
  shouldForwardProp,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  isValidMotionProp,
} from 'framer-motion';

import DotGrid from '../components/assets/DotGrid/DotGrid';
import Header from '../components/Header';
import Footer from '../components/Footer';



import AboutPart from '../components/AboutPageBits/AboutPart';
import Hobbies from '../components/AboutPageBits/Hobbies';
import Certificates from '../components/AboutPageBits/Certificates';
import TechSkills from '../components/AboutPageBits/TechSkills';
import ContributionMap from '../components/AboutPageBits/ContributionMap';
import Learning from '../components/AboutPageBits/Learning';

// import Options from "../components/options"
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


// ─── Section index badge ──────────────────────────────────────────────────────
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


export default function AboutPage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Match the same values used in App.jsx
  const baseColor = useColorModeValue('#d4dadc', '#1a1a1a');
  const gradientColors = useColorModeValue(
    ['#ff0080', '#6366f1', '#3b82f6'],
    ['#ff00ff', '#8000ff', '#0080ff']
  );
  const bg1 = useColorModeValue('rgba(235, 237, 242, 0.88)', 'rgba(10, 10, 18, 0.82)');
  const bg2 = useColorModeValue('rgba(242, 238, 248, 0.84)', 'rgba(18, 10, 22, 0.78)');
  const bg3 = useColorModeValue('rgba(236, 242, 240, 0.88)', 'rgba(8,  18, 14, 0.82)');
  const bg4 = useColorModeValue('rgba(242, 240, 248, 0.84)', 'rgba(14, 10, 22, 0.78)');
  const bg5 = useColorModeValue('rgba(238, 236, 246, 0.88)', 'rgba(10,  8, 20, 0.82)');
  const bg6 = useColorModeValue('rgba(236, 244, 242, 0.84)', 'rgba(8,  16, 14, 0.78)');
  const bg7 = useColorModeValue('rgba(232, 234, 244, 0.92)', 'rgba(8,   8, 18, 0.88)');

  const LAYER_BG = ['transparent', bg1, bg2, bg3, bg4, bg5, bg6, bg7];


  return (
    <>
      {/* ── Scroll progress bar ── */}
      <motion.div
        style={{
          scaleX,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #ec4899, #a855f7, #6366f1)',
          transformOrigin: '0%',
          zIndex: 9999,
        }}
      />
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        zIndex={0}
        pointerEvents="none"
      >
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
      </Box>
          <Header />
          <AboutPart />
        <FadeInSection delay={0.2}>
          <ParallaxSection speed={0.4} direction={1}>
            <TechSkills />
          </ParallaxSection>
        </FadeInSection>
          <FadeInSection delay={0.2}>
          <ParallaxSection speed={0.4} direction={1}>
            <Hobbies />
          </ParallaxSection>
          </FadeInSection>
          <FadeInSection delay={0.2}>
          <ParallaxSection speed={0.4} direction={1}>
            <Learning />
          </ParallaxSection>
          </FadeInSection>
          <FadeInSection delay={0.2}>
          <ParallaxSection speed={0.4} direction={1}>
          <Certificates />
          </ParallaxSection>
          </FadeInSection>
          <FadeInSection delay={0.2}>
          <ParallaxSection speed={0.4} direction={1}>
          <ContributionMap />
          </ParallaxSection>
          </FadeInSection>
          <Footer />
</>
  );
}

