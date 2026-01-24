import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useColorMode } from '@chakra-ui/react';
import TextType from "./ui/TextType";


// Create motion components
const MotionBox = motion.create(Box);
const MotionHeading = motion.create(Heading);
const MotionText = motion.create(Text);
const MotionButton = motion.create(Button);


// Animation variants
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
  const [headerRef, headerInView] = useInView({
    triggerOnce: false,
    threshold: 0.2
  });

  const [contentRef, contentInView] = useInView({
    triggerOnce: false,
    threshold: 0.2
  });
  
  return (
    <Box
      id="hero"
      bg="transparent"
      color="text.primary"
      py={{ base: 12, md: 20 }}
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="relative"
      overflow="hidden"
      padding={30}
    >
      {/* Animated background elements */}
      <MotionBox
        position="absolute"
        top="10%"
        right="10%"
        w="300px"
        h="300px"
        bg="rgba(20, 184, 166, 0.05)"
        borderRadius="full"
        filter="blur(60px)"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <MotionBox
        position="absolute"
        bottom="20%"
        left="5%"
        w="250px"
        h="250px"
        bg="rgba(20, 184, 166, 0.05)"
        borderRadius="full"
        filter="blur(60px)"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <Container maxW="container.xl" position="relative" zIndex={1}>
        {/* Text content */}
        <MotionBox
          ref={contentRef}
          initial="hidden"
          animate={contentInView ? "visible" : "hidden"}
          variants={fadeInUp}
        >
          <VStack spacing={6} align="center" textAlign="center">
            {/* Main Heading with Typing Effect */}
            <MotionHeading
              ref={headerRef}
              as="h1"
              fontSize={{ base: '3xl', md: '4xl', lg: '5xl', xl: '6xl' }}
              fontWeight="normal"
              lineHeight="1.2"
              initial="hidden"
              animate={headerInView ? "visible" : "hidden"}
              variants={fadeInUp}
              bgGradient="linear(to-r, #1e40af, #7c3aed,#ec4899)"
              bgClip="text"
            >
              <TextType 
                text={["Hi! I'm Anandita!"]}
                typingSpeed={75}
                pauseDuration={1500}
                showCursor={true}
                cursorCharacter="_"
              />
            </MotionHeading>

            {/* Subtitle */}
            <MotionText
              fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
              color="text.secondary"
              fontWeight="500"
              variants={fadeInUp}
            >
              Full-Stack Developer | ML Explorer
            </MotionText>

            {/* Tagline */}
            <MotionText
              fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}
              color="text.secondary"
              maxW={{ base: "full", lg: "600px" }}
              lineHeight="1.8"
              variants={fadeInUp}
            >
              Building AI-powered web applications with React, Django, and Python. 
              Turning ideas into elegant, functional solutions.
            </MotionText>

            {/* CTA Buttons */}
            <MotionBox variants={fadeInUp}>
              <HStack
                spacing={4}
                pt={4}
                flexWrap="wrap"
                justify="center"
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
                  bg="fuchsia.400"
                  color="white"
                  size="lg"
                  px={8}
                  py={6}
                  fontSize="md"
                  fontWeight="600"
                  _hover={{
                    bg: 'fuchsia.500'
                  }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0 8px 25px rgba(20, 184, 166, 0.4)'
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  View Projects
                </MotionButton>

                <MotionButton
                  as="a"
                  href="#contact"
                  variant="outline"
                  size="lg"
                  px={8}
                  py={6}
                  fontSize="md"
                  fontWeight="600"
                  bg="bg.secondary"
                  borderColor="border.secondary"
                  color="text.primary"
                  _hover={{
                    borderColor: 'fuchsia.400',
                    color: 'fuchsia.400'
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  Get in Touch
                </MotionButton>
              </HStack>
            </MotionBox>
          </VStack>
        </MotionBox>
      </Container>
    </Box>
  );
}

export default Hero;
// import Hero from "./assets/Hero.jpg";


// import React, { useState } from 'react';
// import { Box, Heading, Text, VStack } from '@chakra-ui/react';

// const HeroMaskReveal = () => {
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

//   const handleMouseMove = (e) => {
//     const rect = e.currentTarget.getBoundingClientRect();
//     setMousePosition({
//       x: e.clientX - rect.left,
//       y: e.clientY - rect.top,
//     });
//   };

//   // Replace these URLs with your actual images
//   const colorImage = Hero;
//   const grayscaleImage = Hero;

//   return (
    
//       <Box
//         position="relative"
//         width="100vw"
//         height="100vh"
//         overflow="hidden"
//         onMouseMove={handleMouseMove}
//       >
//         {/* Background layer - Color image */}
//         <Box
//           position="absolute"
//           inset="0"
//           backgroundImage={`url(${colorImage})`}
//           backgroundSize="cover"
//           backgroundPosition="center"
//           backgroundRepeat="no-repeat"
//         />

//         {/* Foreground layer - Grayscale image with mask */}
//         <Box
//           position="absolute"
//           inset="0"
//           backgroundImage={`url(${grayscaleImage})`}
//           backgroundSize="cover"
//           backgroundPosition="center"
//           backgroundRepeat="no-repeat"
//           filter="grayscale(100%) invert(100%) brightness(40%)"
//           // filter="grayscale(100%)"
//           style={{
//             maskImage: `radial-gradient(circle 200px at ${mousePosition.x}px ${mousePosition.y}px, transparent 0%, transparent 100%, black 100%, black 100%)`,
//             WebkitMaskImage: `radial-gradient(circle 200px at ${mousePosition.x}px ${mousePosition.y}px, transparent 0%, transparent 100%, black 100%, black 100%)`,
//           }}
//         />

//         {/* Content overlay */}
//         <Box
//           position="absolute"
//           inset="0"
//           display="flex"
//           alignItems="center"
//           justifyContent="center"
//           bg="rgba(0, 0, 0, 0.3)"
//         >
//           <VStack spacing={4} textAlign="center" px={4}>
//             <Heading
//               as="h1"
//               fontSize={{ base: '4xl', md: '6xl', lg: '7xl' }}
//               fontWeight="bold"
//               color="white"
//               textShadow="0 2px 10px rgba(0,0,0,0.5)"
//             >
//               I am Anandita
//             </Heading>
//             <Text
//               fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
//               color="white"
//               maxW="2xl"
//               textShadow="0 2px 10px rgba(0,0,0,0.5)"
//             >
//               ML Explorer and Design Experimenter 
//             </Text>
//           </VStack>
//         </Box>
//       </Box>
    
//   );
// };

// export default HeroMaskReveal;
// // Hero mask reveal should go to some other project doesnt sit with this one well