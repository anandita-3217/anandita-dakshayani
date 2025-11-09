import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Image,
  Grid,
  GridItem
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { ReactTyped } from "react-typed";
import CodingImg from "./assets/Coding.png";
// Create motion components
const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionButton = motion(Button);
const MotionImage = motion(Image);

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" }
  }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

function Hero() {
  return (
    <Box
      id="hero"
      bg="transparent"
      color="white"
      py={{ base: 12, md: 20 }}
      minH="100vh"
      display="flex"
      alignItems="center"
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
        <Grid
          templateColumns={{ base: '1fr', lg: '1fr 1fr' }}
          gap={{ base: 8, lg: 12 }}
          alignItems="center"
        >
          <GridItem>
            <MotionBox
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              position="relative"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              {/* Coding Image with float animation */}
              <MotionImage
                src={CodingImg}
                alt="Coding"
                boxSize={{ base: "200px", md: "250px", lg: "300px" }}
                variants={scaleIn}
                animate={{
                  y: [0, -20, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                filter="drop-shadow(0 10px 30px rgba(20, 184, 166, 0.3))"
              />
              

            </MotionBox>
          </GridItem>
          {/* Left side - Text content */}
          <GridItem>
            <MotionBox
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <VStack spacing={6} align={{ base: 'center', lg: 'flex-start' }} textAlign={{ base: 'center', lg: 'left' }}>
                {/* Main Heading with Typing Effect */}
                <MotionHeading
                  as="h1"
                  fontSize={{ base: '3xl', md: '4xl', lg: '5xl', xl: '6xl' }}
                  fontWeight="bold"
                  lineHeight="1.2"
                  color="#14b8a6"
                  variants={fadeInUp}
                >
                  <ReactTyped
                    strings={["Hi! I'm Anandita!"]}
                    typeSpeed={80}
                    backSpeed={60}
                    loop
                  />
                </MotionHeading>

                {/* Subtitle */}
                <MotionText
                  fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
                  color="#b0b0b0"
                  fontWeight="500"
                  variants={fadeInUp}
                >
                  Full-Stack Developer | ML Enthusiast
                </MotionText>

                {/* Tagline */}
                <MotionText
                  fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}
                  color="#b0b0b0"
                  maxW={{ base: "full", lg: "500px" }}
                  lineHeight="1.8"
                  variants={fadeInUp}
                >
                  Building AI-powered web applications with React, Django, and Python. 
                  Turning ideas into elegant, functional solutions.
                </MotionText>

                {/* CTA Buttons */}
                <MotionBox variants={fadeInUp} w="full">
                  <HStack
                    spacing={4}
                    pt={4}
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
                      colorScheme="teal"
                      size="lg"
                      px={8}
                      py={6}
                      fontSize="md"
                      fontWeight="600"
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
                      bg="#0a0a0a"
                      borderColor="#2a2a2a"
                      color="white"
                      _hover={{
                        borderColor: '#14b8a6',
                        color: '#14b8a6'
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
          </GridItem>

          {/* Right side - Images */}
          
        </Grid>
      </Container>
    </Box>
  );
}

export default Hero;