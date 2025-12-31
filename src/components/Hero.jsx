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
import { useInView } from 'react-intersection-observer';
import TextType from "./ui/TextType";
import Marquee from "react-fast-marquee";
// Create motion components
const MotionBox = motion.create(Box);
const MotionHeading = motion.create(Heading);
const MotionText = motion.create(Text);
const MotionButton = motion.create(Button);
const MotionImage = motion.create(Image);

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



function Hero() {
  const [headerRef,headerInView] = useInView({
    triggerOnce: false,
    threshold: 0.2
  });
  const [imageRef,imageInView] = useInView({
    triggerOnce: false,
    threshold: 0.2
  });
  const [contentRef,contentInView] = useInView({
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
              ref={imageRef}
              initial="hidden"
              animate={imageInView?"visible":"hidden"}
              variants={fadeInLeft}
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

          {/* Right side - Text content */}
          <GridItem>
            <MotionBox
            ref={contentRef}
              initial="hidden"
              animate={contentInView?"visible":"hidden"}

              variants={fadeInRight}
            >
              <VStack spacing={6} align={{ base: 'center', lg: 'flex-start' }} textAlign={{ base: 'center', lg: 'left' }}>
                {/* Main Heading with Typing Effect */}
                <MotionHeading
                  ref={headerRef}
                  as="h1"
                  fontSize={{ base: '3xl', md: '4xl', lg: '5xl', xl: '6xl' }}
                  fontWeight="bold"
                  lineHeight="1.2"
                  color="brand.400"
                  initial= "hidden"
                  animate={headerInView?"visible":"hidden"}
                  variants={fadeInUp}
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
                  Full-Stack Developer | ML Enthusiast
                </MotionText>

                {/* Tagline */}
                <MotionText
                  fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}
                  color="text.secondary"
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
                      bg="brand.400"
                      color="white"
                      size="lg"
                      px={8}
                      py={6}
                      fontSize="md"
                      fontWeight="600"
                      _hover={{
                        bg: 'brand.500'
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
                        borderColor: 'brand.400',
                        color: 'brand.400'
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
              <Marquee>
  I can be a React component, multiple React components, or just some text.
</Marquee>
            </MotionBox>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
}

export default Hero;