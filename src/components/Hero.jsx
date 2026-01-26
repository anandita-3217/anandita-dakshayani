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
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { motion, useAnimation  } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useColorMode } from '@chakra-ui/react';
import TextType from "./ui/TextType";

// Create motion components
const MotionButton = motion.create(Button);
const MotionBox = motion.create(Box);
const MotionHeading = motion.create(Heading);
const MotionText = motion.create(Text);

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
  
  // Controls for Let's Connect button
  const connectControls = useAnimation();
  const connectCircleControls = useAnimation();
  
  // Controls for View Projects button
  const projectsControls = useAnimation();
const projectsCircleControls = useAnimation();

const handleProjectsHoverStart = () => {
  projectsControls.start({
    x: [0, -30, 30, 0],  // Reversed for left arrow
    transition: {
      duration: 0.8,
      ease: "easeInOut",
      times: [0, 0.3, 0.5, 1]
    }
  });
  
  projectsCircleControls.start({
    scale: [1, 20],
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeInOut"
    }
  });
};
const handleProjectsHoverEnd = () => {
  projectsCircleControls.start({
    scale: 1,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  });
};

  const handleConnectHoverStart = () => {
    connectControls.start({
      x: [0, 30, -30, 0],
      transition: {
        duration: 0.8,
        ease: "easeInOut",
        times: [0, 0.3, 0.5, 1]
      }
    });
    
    connectCircleControls.start({
      scale: [1, 20],
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    });
  };
  
  const handleConnectHoverEnd = () => {
    connectCircleControls.start({
      scale: 1,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    });
  };
  

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
                {/* View Projects Button */}
               <MotionButton
  as="a"
  href="#projects"
  size="lg"
  px={1}
  py={1}
  minW="150px"  // Made smaller
  h="48px"      // Fixed height to make it more compact
  bg="rgba(255, 255, 255, 0.1)"
  color="text.primary"
  border="2px solid"
  borderColor="border.primary"
  borderRadius="full"
  position="relative"
  overflow="hidden"
  _hover={{
    color: "black",
  }}
  whileHover={{
    scale: 1.02,
    boxShadow: "0 10px 30px rgba(255, 255, 255, 0.3)",
  }}
  whileTap={{ scale: 0.98 }}
  transition={{ duration: 0.3 }}
  onHoverStart={handleProjectsHoverStart}
  onHoverEnd={handleProjectsHoverEnd}
>
  <Box
    w="full"
    display="flex"
    alignItems="center"
    justifyContent="space-between"
    pr={4}  // Right padding for text
    position="relative"
    zIndex={2}
  >
    {/* Left circular icon */}
    <Box
      bg="white"
      h={10}
      w={10}
      borderRadius="full"
      display="flex"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
      position="relative"
      zIndex={3}
    >
      <MotionBox animate={projectsControls}>
        <GoArrowLeft color="black" />
      </MotionBox>
    </Box>

    {/* Text */}
    <Box fontWeight="600" fontSize="md" ml={3}>
      Past Work
    </Box>
  </Box>
  
  {/* Expanding white circle background */}
  {/* TODO: Take care of the whites so they look ok even in light theme */}
  <MotionBox
  style={{ transformOrigin: "center center" }}
    position="absolute"
    left="4px"
    top="50%"
    transform="translateY(-50%)"
    h={10}
    w={10}
    bg="white"
    borderRadius="full"
    zIndex={1}
    animate={projectsCircleControls}
  />
</MotionButton>
                

                
                {/* Contact CTA */}
                <MotionButton
                  as="a"
                  href="#contact"
                  size="lg"
                  px={1}
                  py={1}
                  minW="170px"
                  bg="rgba(255, 255, 255, 0.1)"
                  color="text.primary"
                  border="2px solid"
                  borderColor="border.primary"
                  borderRadius="full"
                  position="relative"
                  overflow="hidden"
                  _hover={{
                    color: "black",
                  }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 10px 30px rgba(255, 255, 255, 0.3)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  onHoverStart={handleConnectHoverStart}
                  onHoverEnd={handleConnectHoverEnd}
                >
                  <Box
                    w="full"
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    pl={4}
                    position="relative"
                    zIndex={2}
                  >
                    {/* Text */}
                    <Box fontWeight="600" fontSize="md" mr={3}>
                      Future Collab
                    </Box>
                
                    {/* Right circular icon */}
                    <Box
                      bg="white"
                      h={10}
                      w={10}
                      borderRadius="full"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      overflow="hidden"
                      position="relative"
                      zIndex={3}
                    >
                      <MotionBox animate={connectControls}>
                        <GoArrowRight color="black" />
                      </MotionBox>
                    </Box>
                  </Box>
                  
                  {/* Expanding white circle background */}
                  <MotionBox
                    position="absolute"
                    right="4px"
                    top="50%"
                    transform="translateY(-50%)"
                    h={10}
                    w={10}
                    bg="white"
                    borderRadius="full"
                    zIndex={1}
                    animate={connectCircleControls}
                  />
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