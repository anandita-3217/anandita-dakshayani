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

import AboutPart from '../components/AboutPageBits/AboutPart';
import Hobbies from '../components/AboutPageBits/Hobbies';
import Certificates from '../components/AboutPageBits/Certificates';
import TechSkills from '../components/AboutPageBits/TechSkills';
import ContributionMap from '../components/AboutPageBits/ContributionMap';
import Learning from '../components/AboutPageBits/Learning';
import Resume from '../components/Resume';
import DotGrid from '../components/assets/DotGrid/DotGrid';
import Header from '../components/Header';
import Footer from '../components/Footer';
// import Options from "../components/options"
// ─── Chakra + Framer Motion bridge ───────────────────────────────────────────
const MotionBox = chakra(motion.div, {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});

const OVERLAP = 80;

// ─── Section index badge ──────────────────────────────────────────────────────
const SectionBadge = ({ index, label }) => (
  <Box display="flex" alignItems="center" gap={3} mb={8}>
    <Text
      fontFamily="Orbitron, sans-serif"
      fontSize="9px"
      letterSpacing="0.3em"
      textTransform="uppercase"
      color="whiteAlpha.300"
    >
      {String(index).padStart(2, '0')}
    </Text>
    <Box h="1px" w="32px" bg="whiteAlpha.100" />
    <Text
      fontFamily="Orbitron, sans-serif"
      fontSize="9px"
      letterSpacing="0.3em"
      textTransform="uppercase"
      color="whiteAlpha.300"
    >
      {label}
    </Text>
  </Box>
);

// ─── Individual layer ─────────────────────────────────────────────────────────
const Layer = ({ children, index, label, bg, zIndex, speed = 0 }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed * 60, speed * -60]);
  const springY = useSpring(y, { stiffness: 80, damping: 25, restDelta: 0.001 });
  const isHero = index === 0;

  return (
    <Box
      ref={ref}
      position="relative"
      zIndex={zIndex}
      mt={isHero ? 0 : `-${OVERLAP}px`}
      bg={bg}
      borderRadius={isHero ? 0 : '24px 24px 0 0'}
      // Subtle blur keeps text readable over the dot grid beneath
      backdropFilter={isHero ? 'none' : 'blur(2px)'}
      _before={
        !isHero
          ? {
              content: '""',
              position: 'absolute',
              top: 0,
              left: '8%',
              right: '8%',
              height: '1px',
              background:
                'linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)',
              borderRadius: '50%',
            }
          : undefined
      }
    >
      <MotionBox style={{ y: springY }}>
        <Box
          maxW="1100px"
          mx="auto"
          px={{ base: 6, md: 12, lg: 16 }}
          py={{ base: 20, md: 28 }}
        >
          {label && <SectionBadge index={index} label={label} />}
          {children}
        </Box>
      </MotionBox>
    </Box>
  );
};

// ─── Reveal on scroll ─────────────────────────────────────────────────────────
const Reveal = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.92', 'start 0.55'],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [32, 0]);

  return (
    <Box ref={ref}>
      <MotionBox style={{ opacity, y }} transition={{ delay }}>
        {children}
      </MotionBox>
    </Box>
  );
};

// ─── Semi-transparent layer backgrounds ──────────────────────────────────────
// These let the DotGrid canvas show through while keeping content legible.
// Tweak the alpha (0.0 – 1.0) to control how much grid bleeds through each layer.
// Hero is fully transparent so the grid is completely exposed on load.
const LAYER_BG = [
  'transparent',              // 0 — Hero:        grid fully visible
  'rgba(10, 10, 10, 0.82)',   // 1 — About
  'rgba(15, 15, 15, 0.78)',   // 2 — Hobbies
  'rgba(10, 10, 10, 0.82)',   // 3 — Tech Skills
  'rgba(15, 15, 15, 0.78)',   // 4 — Learning
  'rgba(10, 10, 10, 0.82)',   // 5 — Certificates
  'rgba(15, 15, 15, 0.78)',   // 6 — Activity
  'rgba(10, 10, 10, 0.88)',   // 7 — Resume:      slightly more solid to anchor
];



const LAYER_META = [
  { label: null },
  { label: 'About' },
  { label: 'Hobbies' },
  { label: 'Tech Skills' },
  { label: 'Learning' },
  { label: 'Certificates' },
  { label: 'Activity' },
  { label: 'Resume' },
];

// ─── PAGE ─────────────────────────────────────────────────────────────────────
function AboutPage() {
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

      {/* ── Header ── */}
      <Header />

      {/* ── Layered sections — sit above DotGrid via z-index: 1+ ── */}
      <Box position="relative" zIndex={1} pt="80px">

        <Layer index={0} bg={LAYER_BG[0]} zIndex={LAYER_META.length + 1} speed={0}>
          <Reveal>
            <Box>
              <Text
                fontFamily="Orbitron, sans-serif"
                fontSize={{ base: '10px', md: '11px' }}
                letterSpacing="0.4em"
                textTransform="uppercase"
                bgGradient="linear(to-r, #ec4899, #a855f7, #6366f1)"
                bgClip="text"
                mb={5}
              >
                About Me
              </Text>
              <Text
                fontFamily="Orbitron, sans-serif"
                fontSize={{ base: '36px', md: '64px', lg: '80px' }}
                fontWeight="900"
                letterSpacing="-0.03em"
                lineHeight={0.95}
                color="text.primary"
                mb={6}
              >
                Building things
                <br />
                <chakra.span
                  bgGradient="linear(to-r, #1e40af, #7c3aed, #ec4899)"
                  bgClip="text"
                >
                  that matter.
                </chakra.span>
              </Text>
              <Text
                fontFamily="Sora, sans-serif"
                fontSize={{ base: '15px', md: '17px' }}
                color="whiteAlpha.500"
                maxW="480px"
                lineHeight={1.8}
              >
                A developer whose curiosity stretches beyond the IDE — into
                craft, texture, and the physical world.
              </Text>
            </Box>
          </Reveal>
        </Layer>

          <AboutPart />
            <Hobbies />
            <TechSkills />
            <Learning />
          <Certificates />
            <ContributionMap />
            <Resume />
      </Box>

      <Box position="relative" zIndex={2}>
        <Footer />
      </Box>
</>
  );
}

export default AboutPage;