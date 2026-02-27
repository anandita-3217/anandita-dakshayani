// TODO: redesign this entire component 
// import React, { useEffect, useRef } from 'react';
// import {
//   Box,
//   Container,
//   Heading,
//   Text,
//   SimpleGrid,
//   VStack,
//   Icon,
//   useColorMode,
// } from '@chakra-ui/react';
// import { motion } from 'framer-motion';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import {
//   FaCode,
//   FaGamepad,
//   FaBook,
//   FaMusic,
//   FaCamera,
//   FaPalette,
// } from 'react-icons/fa';

// gsap.registerPlugin(ScrollTrigger);

// const MotionBox = motion(Box);

// const hobbiesData = [
//   {
//     icon: FaCode,
//     title: 'Coding',
//     description: 'Building projects and learning new technologies every day',
//     color: 'brand.400',
//   },
//   {
//     icon: FaGamepad,
//     title: 'Gaming',
//     description: 'Strategy games and problem-solving adventures',
//     color: 'purple.400',
//   },
//   {
//     icon: FaBook,
//     title: 'Reading',
//     description: 'Tech blogs, sci-fi novels, and continuous learning',
//     color: 'blue.400',
//   },
//   {
//     icon: FaMusic,
//     title: 'Music',
//     description: 'Listening to lo-fi beats while coding',
//     color: 'pink.400',
//   },
//   {
//     icon: FaCamera,
//     title: 'Photography',
//     description: 'Capturing moments and exploring perspectives',
//     color: 'orange.400',
//   },
//   {
//     icon: FaPalette,
//     title: 'Design',
//     description: 'UI/UX design and creative visual experiments',
//     color: 'teal.400',
//   },
// ];

// const Hobbies = () => {
//   const { colorMode } = useColorMode();
//   const sectionRef = useRef(null);
//   const headingRef = useRef(null);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       gsap.from(headingRef.current, {
//         scrollTrigger: {
//           trigger: headingRef.current,
//           start: 'top 80%',
//         },
//         y: 50,
//         opacity: 0,
//         duration: 1,
//         ease: 'power3.out',
//       });
//     }, sectionRef);

//     return () => ctx.revert();
//   }, []);

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.15,
//       },
//     },
//   };

//   const cardVariants = {
//     hidden: {
//       opacity: 0,
//       y: 50,
//       scale: 0.9,
//     },
//     visible: {
//       opacity: 1,
//       y: 0,
//       scale: 1,
//       transition: {
//         duration: 0.6,
//         ease: [0.43, 0.13, 0.23, 0.96],
//       },
//     },
//   };

//   return (
//     <Box
//       ref={sectionRef}
//       py={{ base: 16, md: 24 }}
//       bg="transparent"
//       position="relative"
//       overflow="hidden"
//     >
//       {/* Animated background decoration */}
//       <Box
//         position="absolute"
//         top="10%"
//         right="-5%"
//         w="400px"
//         h="400px"
//         bg={colorMode === 'dark' ? 'brand.900' : 'brand.50'}
//         opacity={0.3}
//         borderRadius="full"
//         filter="blur(80px)"
//         pointerEvents="none"
//       />
//       <Box
//         position="absolute"
//         bottom="10%"
//         left="-5%"
//         w="300px"
//         h="300px"
//         bg={colorMode === 'dark' ? 'purple.900' : 'purple.50'}
//         opacity={0.3}
//         borderRadius="full"
//         filter="blur(80px)"
//         pointerEvents="none"
//       />

//       <Container maxW="container.xl" position="relative" zIndex={1}>
//         <VStack spacing={12} align="stretch">
//           {/* Section Header */}
//           <VStack ref={headingRef} spacing={4} textAlign="center">
//             <Heading
//               as="h2"
//               size="2xl"
//               bgGradient={
//                 colorMode === 'dark'
//                   ? 'linear(to-r, brand.300, purple.300)'
//                   : 'linear(to-r, brand.500, purple.500)'
//               }
//               bgClip="text"
//               fontWeight="normal"
//             >
//               Hobbies & Interests
//             </Heading>
//             <Text
//               fontSize="lg"
//               color="text.secondary"
//               maxW="600px"
//               mx="auto"
//             >
//               Beyond coding, here's what keeps me inspired and creative
//             </Text>
//           </VStack>

//           {/* Hobbies Grid */}
//           <MotionBox
//             as={SimpleGrid}
//             columns={{ base: 1, md: 2, lg: 3 }}
//             spacing={8}
//             variants={containerVariants}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, margin: '-100px' }}
//           >
//             {hobbiesData.map((hobby, index) => (
//               <MotionBox
//                 key={index}
//                 variants={cardVariants}
//                 whileHover={{
//                   y: -8,
//                   transition: { duration: 0.3 },
//                 }}
//               >
//                 <Box
//                   bg="surface.card"
//                   p={8}
//                   borderRadius="2xl"
//                   borderWidth="1px"
//                   borderColor="border.primary"
//                   h="100%"
//                   position="relative"
//                   overflow="hidden"
//                   cursor="pointer"
//                   transition="all 0.3s ease"
//                   _hover={{
//                     borderColor: hobby.color,
//                     boxShadow: colorMode === 'dark' 
//                       ? `0 8px 30px rgba(20, 184, 166, 0.2)`
//                       : `0 8px 30px rgba(20, 184, 166, 0.15)`,
//                   }}
//                 >
//                   {/* Animated background on hover */}
//                   <MotionBox
//                     position="absolute"
//                     top={0}
//                     left={0}
//                     right={0}
//                     bottom={0}
//                     bgGradient={`linear(to-br, ${hobby.color}, transparent)`}
//                     opacity={0}
//                     transition="opacity 0.3s"
//                     whileHover={{ opacity: 0.05 }}
//                     pointerEvents="none"
//                   />

//                   <VStack align="start" spacing={4} position="relative">
//                     {/* Icon with pulse animation */}
//                     <MotionBox
//                       whileHover={{
//                         rotate: [0, -10, 10, -10, 0],
//                         transition: { duration: 0.5 },
//                       }}
//                     >
//                       <Box
//                         p={4}
//                         bg={
//                           colorMode === 'dark'
//                             ? 'rgba(20, 184, 166, 0.1)'
//                             : 'rgba(20, 184, 166, 0.08)'
//                         }
//                         borderRadius="xl"
//                         w="fit-content"
//                       >
//                         <Icon
//                           as={hobby.icon}
//                           boxSize={8}
//                           color={hobby.color}
//                         />
//                       </Box>
//                     </MotionBox>

//                     <VStack align="start" spacing={2}>
//                       <Heading as="h3" size="md" color="text.primary">
//                         {hobby.title}
//                       </Heading>
//                       <Text color="text.secondary" lineHeight="tall">
//                         {hobby.description}
//                       </Text>
//                     </VStack>
//                   </VStack>
//                 </Box>
//               </MotionBox>
//             ))}
//           </MotionBox>
//         </VStack>
//       </Container>
//     </Box>
//   );
// };

// export default Hobbies;
import React, { useState, useRef } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

const MotionBox = motion(Box);

// ---------------------------------------------------------------------------
// Hobbies Data - Just emojis and names
// ---------------------------------------------------------------------------
const hobbies = [
  // { id: 1, emoji: '💻', name: 'Coding', color: '#6366f1', left: 10, top: 20, size: 140 },
  { id: 2, emoji: '🎵', name: 'Music', color: '#ec4899', left: 65, top: 15, size: 110 },
  { id: 3, emoji: '📸', name: 'Photography', color: '#8b5cf6', left: 35, top: 55, size: 120 },
  { id: 4, emoji: '📚', name: 'Reading', color: '#10b981', left: 75, top: 60, size: 100 },
  { id: 5, emoji: '🎮', name: 'Gaming', color: '#f59e0b', left: 15, top: 75, size: 130 },
  { id: 6, emoji: '💪', name: 'Fitness', color: '#06b6d4', left: 55, top: 85, size: 95 },
  { id: 7, emoji: '☕', name: 'Coffee', color: '#78350f', left: 85, top: 35, size: 85 },
  { id: 8, emoji: '🎨', name: 'Design', color: '#e11d48', left: 45, top: 30, size: 105 },
];

// ---------------------------------------------------------------------------
// Helper
// ---------------------------------------------------------------------------
const hexToRgb = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
};

// ---------------------------------------------------------------------------
// Hobby Bubble Component
// ---------------------------------------------------------------------------
const HobbyBubble = ({ hobby, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [ripples, setRipples] = useState([]);

  const { r, g, b } = hexToRgb(hobby.color);
  const rgba = (a) => `rgba(${r},${g},${b},${a})`;

  const textPrimary = useColorModeValue('text.primary', 'white');

  // Mouse tracking for tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useMotionValue(0), { stiffness: 300, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 300, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const rotateXValue = ((e.clientY - centerY) / rect.height) * -20;
    const rotateYValue = ((e.clientX - centerX) / rect.width) * 20;

    rotateX.set(rotateXValue);
    rotateY.set(rotateYValue);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    setIsHovered(false);
  };

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newRipple = { id: Date.now(), x, y };
    setRipples(prev => [...prev, newRipple]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 600);
  };

  return (
    <MotionBox
      position="absolute"
      left={`${hobby.left}%`}
      top={`${hobby.top}%`}
      w={`${hobby.size}px`}
      h={`${hobby.size}px`}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        type: 'spring',
        bounce: 0.5,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      cursor="pointer"
    >
      {/* Floating animation */}
      <MotionBox
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 3 + index * 0.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        position="relative"
        w="full"
        h="full"
      >
        {/* Outer glow ring */}
        <MotionBox
          position="absolute"
          inset="-8px"
          borderRadius="full"
          border="2px solid"
          borderColor={hobby.color}
          animate={{
            scale: isHovered ? [1, 1.15, 1] : 1,
            opacity: isHovered ? [0.3, 0, 0.3] : 0,
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Main bubble */}
        <MotionBox
          position="relative"
          w="full"
          h="full"
          borderRadius="full"
          bg={rgba(0.15)}
          border="2px solid"
          borderColor={rgba(0.3)}
          backdropFilter="blur(20px)"
          overflow="hidden"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          boxShadow={`0 8px 32px ${rgba(0.3)}`}
          animate={{
            scale: isHovered ? 1.08 : 1,
            boxShadow: isHovered 
              ? `0 16px 48px ${rgba(0.5)}` 
              : `0 8px 32px ${rgba(0.3)}`,
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Gradient background */}
          <Box
            position="absolute"
            inset={0}
            bgGradient={`radial(circle at 30% 30%, ${rgba(0.25)} 0%, transparent 70%)`}
          />

          {/* Click ripple effects */}
          <AnimatePresence>
            {ripples.map(ripple => (
              <MotionBox
                key={ripple.id}
                position="absolute"
                left={ripple.x}
                top={ripple.y}
                w="20px"
                h="20px"
                borderRadius="full"
                border="2px solid"
                borderColor={hobby.color}
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 4, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
            ))}
          </AnimatePresence>

          {/* Emoji */}
          <MotionBox
            fontSize={`${hobby.size * 0.4}px`}
            lineHeight="none"
            mb={2}
            animate={{
              rotate: isHovered ? [0, 5, -5, 0] : 0,
            }}
            transition={{ duration: 0.4 }}
            style={{ transformStyle: 'preserve-3d', transform: 'translateZ(20px)' }}
          >
            {hobby.emoji}
          </MotionBox>

          {/* Name label */}
          <MotionBox
            fontSize="sm"
            fontWeight="600"
            color={textPrimary}
            textAlign="center"
            px={3}
            animate={{
              opacity: isHovered ? 1 : 0.8,
              y: isHovered ? 0 : 5,
            }}
            transition={{ duration: 0.2 }}
            style={{ transformStyle: 'preserve-3d', transform: 'translateZ(10px)' }}
          >
            {hobby.name}
          </MotionBox>

          {/* Sparkle particles on hover */}
          <AnimatePresence>
            {isHovered && (
              <>
                {[...Array(4)].map((_, i) => (
                  <MotionBox
                    key={i}
                    position="absolute"
                    w="6px"
                    h="6px"
                    borderRadius="full"
                    bg={hobby.color}
                    initial={{
                      x: 0,
                      y: 0,
                      opacity: 0,
                    }}
                    animate={{
                      x: [0, (Math.cos(i * Math.PI / 2) * 40)],
                      y: [0, (Math.sin(i * Math.PI / 2) * 40)],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 1,
                      delay: i * 0.1,
                      ease: 'easeOut',
                    }}
                  />
                ))}
              </>
            )}
          </AnimatePresence>
        </MotionBox>
      </MotionBox>
    </MotionBox>
  );
};

// ---------------------------------------------------------------------------
// Main Hobbies Component
// ---------------------------------------------------------------------------
export const Hobbies = () => {
  const textPrimary = useColorModeValue('text.primary', 'white');
  const textMuted = useColorModeValue('text.muted', 'text.muted');

  return (
    <Box bg="transparent" py={20} px={4}>
      <Container maxW="1400px">
        {/* Header */}
        <MotionBox
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          mb={16}
          textAlign="center"
        >
          <Text
            fontSize="sm"
            color={textMuted}
            textTransform="uppercase"
            letterSpacing="0.3em"
            mb={4}
            fontWeight="600"
          >
            Beyond Code
          </Text>
          <Heading
            as="h2"
            fontSize={{ base: '5xl', md: '7xl', lg: '8xl' }}
            fontWeight="normal"
            color={textPrimary}
            fontFamily="heading"
            mb={6}
          >
            What I{' '}
            <Text as="span" bgGradient="linear(to-r, #1e40af, #7c3aed, #ec4899)" bgClip="text">
              Love
            </Text>
          </Heading>
          <Text fontSize="lg" color="text.secondary" maxW="600px" mx="auto">
            Click on any bubble to create ripples, hover to see them float and sparkle.
          </Text>
        </MotionBox>

        {/* Scattered Bubble Layout */}
        <Box
          position="relative"
          h={{ base: '600px', md: '700px', lg: '800px' }}
          w="full"
          borderRadius="3xl"
          border="1px solid"
          borderColor="border.primary"
          bg={useColorModeValue('rgba(255,255,255,0.02)', 'rgba(0,0,0,0.2)')}
          backdropFilter="blur(10px)"
          overflow="hidden"
        >
          {hobbies.map((hobby, index) => (
            <HobbyBubble key={hobby.id} hobby={hobby} index={index} />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Hobbies;