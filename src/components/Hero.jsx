// import React from 'react';
// import {
//   Box,
//   Container,
//   Heading,
//   Text,
//   Button,
//   VStack,
//   HStack,
// } from '@chakra-ui/react';
// import { motion } from 'framer-motion';
// import { useInView } from 'react-intersection-observer';
// import { useColorMode } from '@chakra-ui/react';
// import TextType from "./ui/TextType";


// // Create motion components
// const MotionBox = motion.create(Box);
// const MotionHeading = motion.create(Heading);
// const MotionText = motion.create(Text);
// const MotionButton = motion.create(Button);


// // Animation variants
// const fadeInUp = {
//   hidden: { opacity: 0, y: 30 },
//   visible: { 
//     opacity: 1, 
//     y: 0,
//     transition: { duration: 0.6, ease: "easeOut" }
//   }
// };

// const fadeInRight = {
//   hidden: { opacity: 0, x: 50 },
//   visible: { 
//     opacity: 1, 
//     x: 0,
//     transition: { duration: 0.7, ease: "easeOut" }
//   }
// };




// function Hero() {
//   const { colorMode } = useColorMode();
//   const [headerRef,headerInView] = useInView({
//     triggerOnce: false,
//     threshold: 0.2
//   });

//   const [contentRef,contentInView] = useInView({
//     triggerOnce: false,
//     threshold: 0.2
//   });
//   return (
//     <Box
//       id="hero"
//       bg="transparent"
//       color="text.primary"
//       py={{ base: 12, md: 20 }}
//       minH="100vh"
//       display="flex"
//       alignItems="center"
//       position="relative"
//       overflow="hidden"
//       padding={30}
//     >
//       {/* Animated background elements */}
//       <MotionBox
//         position="absolute"
//         top="10%"
//         right="10%"
//         w="300px"
//         h="300px"
//         bg="rgba(20, 184, 166, 0.05)"
//         borderRadius="full"
//         filter="blur(60px)"
//         animate={{
//           scale: [1, 1.2, 1],
//           opacity: [0.3, 0.5, 0.3]
//         }}
//         transition={{
//           duration: 8,
//           repeat: Infinity,
//           ease: "easeInOut"
//         }}
//       />
      
//       <MotionBox
//         position="absolute"
//         bottom="20%"
//         left="5%"
//         w="250px"
//         h="250px"
//         bg="rgba(20, 184, 166, 0.05)"
//         borderRadius="full"
//         filter="blur(60px)"
//         animate={{
//           scale: [1, 1.3, 1],
//           opacity: [0.2, 0.4, 0.2]
//         }}
//         transition={{
//           duration: 10,
//           repeat: Infinity,
//           ease: "easeInOut"
//         }}
//       />

//       <Container maxW="container.xl" position="relative" zIndex={1}>
//           {/* Text content */}
//             <MotionBox
//             ref={contentRef}
//               initial="hidden"
//               animate={contentInView?"visible":"hidden"}

//               variants={fadeInRight}
//             >
//               <VStack spacing={6} align={{ base: 'center', lg: 'flex-start' }} textAlign={{ base: 'center', lg: 'left' }}>
//                 {/* Main Heading with Typing Effect */}
//                 <MotionHeading
//                   ref={headerRef}
//                   as="h1"
//                   fontSize={{ base: '3xl', md: '4xl', lg: '5xl', xl: '6xl' }}
//                   fontWeight="normal"
//                   lineHeight="1.2"
//                   initial="hidden"
//                   animate={headerInView ? "visible" : "hidden"}
//                   variants={fadeInUp}
//                   bgGradient="linear(to-r, #1e40af, #7c3aed,#ec4899)"
//                   bgClip="text"
//                   fontFamily="Silkscreen"
//                 >
                  
//                   <TextType 
//                     text={["Hi! I'm Anandita!"]}
                    
//                     typingSpeed={75}
//                     pauseDuration={1500}
//                     showCursor={true}
//                     cursorCharacter="_"
//                   />
//                 </MotionHeading>

//                 {/* Subtitle */}
//                 <MotionText
//                   fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
//                   color="text.secondary"
//                   fontWeight="500"
//                   variants={fadeInUp}
//                 >
//                   Full-Stack Developer | ML Explorer
//                 </MotionText>

//                 {/* Tagline */}
//                 <MotionText
//                   fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}
//                   color="text.secondary"
//                   maxW={{ base: "full", lg: "500px" }}
//                   lineHeight="1.8"
//                   variants={fadeInUp}
//                 >
//                   Building AI-powered web applications with React, Django, and Python. 
//                   Turning ideas into elegant, functional solutions.
//                 </MotionText>

//                 {/* CTA Buttons */}
//                 <MotionBox variants={fadeInUp} w="full">
//                   <HStack
//                     spacing={4}
//                     pt={4}
//                     flexWrap="wrap"
//                     justify={{ base: 'center', lg: 'flex-start' }}
//                   >
//                     <MotionButton
//                       as="a"
//                       href="#projects"
//                       onClick={(e) => {
//                         e.preventDefault();
//                         document.getElementById('projects')?.scrollIntoView({ 
//                           behavior: 'smooth',
//                           block: 'start'
//                         });
//                       }}
//                       bg="fuchsia.400"
//                       color="white"
//                       size="lg"
//                       px={8}
//                       py={6}
//                       fontSize="md"
//                       fontWeight="600"
//                       _hover={{
//                         bg: 'fuchsia.500'
//                       }}
//                       whileHover={{
//                         scale: 1.05,
//                         boxShadow: '0 8px 25px rgba(20, 184, 166, 0.4)'
//                       }}
//                       whileTap={{ scale: 0.95 }}
//                       transition={{ duration: 0.2 }}
//                     >
//                       View Projects
//                     </MotionButton>

//                     <MotionButton
//                       as="a"
//                       href="#contact"
//                       variant="outline"
//                       size="lg"
//                       px={8}
//                       py={6}
//                       fontSize="md"
//                       fontWeight="600"
//                       bg="bg.secondary"
//                       borderColor="border.secondary"
//                       color="text.primary"
//                       _hover={{
//                         borderColor: 'fuchsia.400',
//                         color: 'fuchsia.400'
//                       }}
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       transition={{ duration: 0.2 }}
//                     >
//                       Get in Touch
//                     </MotionButton>
//                   </HStack>
//                 </MotionBox>
//               </VStack>
//             </MotionBox>
//       </Container>
//     </Box>
//   );
// }

// export default Hero;


import React, { useRef } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Image,
} from '@chakra-ui/react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useColorMode } from '@chakra-ui/react';
import CursorMaskReveal from './ui/CursorMaskReveal';
import TextType from "./ui/TextType";

const MotionBox = motion.create(Box);
const MotionHeading = motion.create(Heading);
const MotionText = motion.create(Text);
const MotionButton = motion.create(Button);

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

function Hero() {
  const { colorMode } = useColorMode();
  const containerRef = useRef(null);
  
  const [headerRef, headerInView] = useInView({
    triggerOnce: false,
    threshold: 0.2
  });

  const [contentRef, contentInView] = useInView({
    triggerOnce: false,
    threshold: 0.2
  });

  // Parallax scroll effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const imageY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 300]), springConfig);
  const contentY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 150]), springConfig);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.5], [1, 0]), springConfig);

  return (
    <Box
      ref={containerRef}
      id="hero"
      position="relative"
      minH="100vh"
      display="flex"
      alignItems="center"
      overflow="hidden"
      bg={colorMode === 'dark' ? 'gray.900' : 'white'}
    >
      {/* Masked Background Image with Parallax */}
      <CursorMaskReveal
        maskSize={250}
        springConfig={{ damping: 20, stiffness: 150 }}
        revealContent={
          <MotionBox
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
            style={{ y: imageY }}
          >
            {/* Colorful vibrant image */}
            <Image
              src="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=1920&q=80"
              alt="Colorful gradient background"
              w="full"
              h="120%"
              objectFit="cover"
              objectPosition="center"
            />
            {/* Gradient overlay for revealed content */}
            <Box
              position="absolute"
              top="0"
              left="0"
              right="0"
              bottom="0"
              bgGradient="linear(to-br, rgba(236, 72, 153, 0.4), rgba(168, 85, 247, 0.4), rgba(59, 130, 246, 0.3))"
            />
          </MotionBox>
        }
      >
        {/* Base grayscale/muted image */}
        <MotionBox
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          style={{ y: imageY }}
        >
          <Image
            src="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=1920&q=80"
            alt="Background"
            w="full"
            h="120%"
            objectFit="cover"
            objectPosition="center"
            filter={colorMode === 'dark' 
              ? 'grayscale(90%) brightness(0.3)' 
              : 'grayscale(80%) brightness(0.9) contrast(0.8)'}
          />
          {/* Dark overlay for readability */}
          <Box
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
            bg={colorMode === 'dark' 
              ? 'rgba(0, 0, 0, 0.7)' 
              : 'rgba(255, 255, 255, 0.85)'}
          />
          {/* Gradient accent overlay */}
          <Box
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
            bgGradient={colorMode === 'dark'
              ? "linear(to-br, rgba(30, 64, 175, 0.15), rgba(124, 58, 237, 0.15), rgba(236, 72, 153, 0.2))"
              : "linear(to-br, rgba(30, 64, 175, 0.08), rgba(124, 58, 237, 0.08), rgba(236, 72, 153, 0.1))"}
          />
        </MotionBox>
      </CursorMaskReveal>

      {/* Floating particles/blobs */}
      <MotionBox
        position="absolute"
        top="15%"
        right="8%"
        w="350px"
        h="350px"
        borderRadius="full"
        bgGradient="radial(circle, rgba(236, 72, 153, 0.3), transparent)"
        filter="blur(80px)"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -150]) }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <MotionBox
        position="absolute"
        bottom="10%"
        left="10%"
        w="400px"
        h="400px"
        borderRadius="full"
        bgGradient="radial(circle, rgba(168, 85, 247, 0.3), transparent)"
        filter="blur(90px)"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Content */}
      <Container maxW="container.xl" position="relative" zIndex={10}>
        <MotionBox
          style={{ y: contentY, opacity }}
          py={{ base: 20, md: 24 }}
        >
          <MotionBox
            ref={contentRef}
            initial="hidden"
            animate={contentInView ? "visible" : "hidden"}
            variants={fadeInUp}
          >
            <VStack 
              spacing={6} 
              align={{ base: 'center', lg: 'flex-start' }} 
              textAlign={{ base: 'center', lg: 'left' }}
            >
              {/* Main Heading with Typing Effect */}
              <MotionHeading
                ref={headerRef}
                as="h1"
                fontSize={{ base: '4xl', md: '5xl', lg: '6xl', xl: '7xl' }}
                fontWeight="bold"
                lineHeight="1.1"
                initial="hidden"
                animate={headerInView ? "visible" : "hidden"}
                variants={fadeInUp}
                color={colorMode === 'dark' ? 'white' : 'gray.900'}
                fontFamily="Silkscreen"
                textShadow={colorMode === 'dark' 
                  ? '0 0 40px rgba(236, 72, 153, 0.5), 0 0 80px rgba(168, 85, 247, 0.3)'
                  : 'none'}
              >
                <Box
                  as="span"
                  bgGradient="linear(to-r, #ec4899, #a855f7, #6366f1)"
                  bgClip="text"
                >
                  <TextType 
                    text={["Hi! I'm Anandita!"]}
                    typingSpeed={75}
                    pauseDuration={1500}
                    showCursor={true}
                    cursorCharacter="_"
                  />
                </Box>
              </MotionHeading>

              {/* Accent line */}
              <MotionBox
                w="100px"
                h="4px"
                bgGradient="linear(to-r, #ec4899, #a855f7)"
                borderRadius="full"
                variants={fadeInUp}
              />

              {/* Subtitle */}
              <MotionText
                fontSize={{ base: 'xl', md: '2xl', lg: '3xl' }}
                color={colorMode === 'dark' ? 'gray.200' : 'gray.700'}
                fontWeight="600"
                variants={fadeInUp}
              >
                Full-Stack Developer | ML Explorer
              </MotionText>

              {/* Tagline */}
              <MotionText
                fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}
                color={colorMode === 'dark' ? 'gray.400' : 'gray.600'}
                maxW={{ base: "full", lg: "600px" }}
                lineHeight="1.8"
                variants={fadeInUp}
              >
                Building AI-powered web applications with React, Django, and Python. 
                Turning ideas into elegant, functional solutions.
              </MotionText>

              {/* CTA Buttons */}
              <MotionBox variants={fadeInUp} w="full" pt={4}>
                <HStack
                  spacing={4}
                  flexWrap="wrap"
                  justify={{ base: 'center', lg: 'flex-start' }}
                >
                  <MotionButton
                    as="a"
                    href="#projects"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('projects')?.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                      });
                    }}
                    size="lg"
                    px={10}
                    py={7}
                    fontSize="md"
                    fontWeight="700"
                    position="relative"
                    overflow="hidden"
                    color="white"
                    border="none"
                    bgGradient="linear(to-r, #ec4899, #a855f7)"
                    _before={{
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      right: 0,
                      bottom: 0,
                      bgGradient: 'linear(to-r, #a855f7, #6366f1)',
                      transition: 'left 0.4s ease',
                    }}
                    _hover={{
                      _before: {
                        left: 0,
                      }
                    }}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: '0 10px 40px rgba(236, 72, 153, 0.5)',
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Box position="relative" zIndex={1}>
                      View Projects
                    </Box>
                  </MotionButton>

                  <MotionButton
                    as="a"
                    href="#contact"
                    size="lg"
                    px={10}
                    py={7}
                    fontSize="md"
                    fontWeight="700"
                    position="relative"
                    overflow="hidden"
                    bg={colorMode === 'dark' ? 'whiteAlpha.100' : 'blackAlpha.100'}
                    backdropFilter="blur(10px)"
                    borderWidth="2px"
                    borderColor={colorMode === 'dark' ? 'whiteAlpha.300' : 'blackAlpha.300'}
                    color={colorMode === 'dark' ? 'white' : 'gray.900'}
                    _hover={{
                      bg: colorMode === 'dark' ? 'whiteAlpha.200' : 'blackAlpha.200',
                      borderColor: '#ec4899',
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: '0 10px 40px rgba(168, 85, 247, 0.3)',
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Get in Touch
                  </MotionButton>
                </HStack>
              </MotionBox>

              {/* Scroll Indicator */}
              <MotionBox
                mt={12}
                animate={{
                  y: [0, 12, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <VStack spacing={2}>
                  <Text
                    fontSize="xs"
                    fontWeight="600"
                    letterSpacing="wider"
                    textTransform="uppercase"
                    color={colorMode === 'dark' ? 'gray.400' : 'gray.600'}
                  >
                    Scroll to explore
                  </Text>
                  <Box
                    w="28px"
                    h="45px"
                    border="2px solid"
                    borderColor={colorMode === 'dark' ? 'whiteAlpha.400' : 'blackAlpha.400'}
                    borderRadius="full"
                    position="relative"
                  >
                    <MotionBox
                      w="4px"
                      h="8px"
                      bg={colorMode === 'dark' ? 'white' : 'gray.900'}
                      borderRadius="full"
                      position="absolute"
                      top="8px"
                      left="50%"
                      transform="translateX(-50%)"
                      animate={{
                        y: [0, 16, 0],
                        opacity: [1, 0.3, 1]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </Box>
                </VStack>
              </MotionBox>
            </VStack>
          </MotionBox>
        </MotionBox>
      </Container>
    </Box>
  );
}

export default Hero;