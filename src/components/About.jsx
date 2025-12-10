
import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  SimpleGrid,
  Icon
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { 
  FaCode,
  FaBrain
} from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
// Motion components
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

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const headerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7 }
    }
  };
const aboutVariants = {
    hidden: { opacity: 0, y: -40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7 }
    }
  };


// About Section Component
function About() {
  const [headerRef, headerInView] = useInView({ 
      triggerOnce: false,
      threshold: 0.2
    });
    
  const [aboutRef, aboutInView] = useInView({ 
      triggerOnce: false,
      threshold: 0.2
    });
    
  return (
    <Box
      id="about"
      bg="transparent"
      color="text.primary"
      py={{ base: 12, md: 20 }}
      minH="100vh"
      display="flex"
      alignItems="center"
      position="relative"
      overflow="hidden"
      p={90}
    >
      {/* Background decoration */}
      <MotionBox
        position="absolute"
        top="20%"
        left="5%"
        w="200px"
        h="200px"
        bg="rgba(20, 184, 166, 0.03)"
        borderRadius="full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <Container maxW="container.xl" position="relative" zIndex={1}>
        <MotionBox
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          {/* Section Title */}
          <MotionHeading
            ref={headerRef}
            as="h2"
            fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
            fontWeight="bold"
            textAlign="center"
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
            variants={headerVariants}
            mb={12}
          >
            <Text as="span" color="brand.400">About Me</Text>
          </MotionHeading>

          {/* <MotionText
            textAlign="center"
            color="text.secondary"
            fontSize={{ base: 'sm', md: 'md' }}
            mb={12}
            variants={fadeInUp}
          >
            Get to know me and my technical expertise
          </MotionText> */}

          {/* About Content */}
          <MotionBox
            ref={aboutRef}
            bg="transparent"
            backdropFilter="blur(1.5px)"
            borderRadius="2xl"
            p={{ base: 6, md: 10 }}
            mb={12}
            border="1px solid"
            borderColor="border.primary"
            initial="hidden"
            animate={aboutInView ? "visible" : "hidden"}
            variants={aboutVariants}
            _hover={{
              borderColor: 'brand.400',
              boxShadow: '0 0 30px rgba(20, 184, 166, 0.2)'
            }}
            transition="all 0.3s"
          >
            <VStack spacing={6} align="stretch">
              <Text
                fontSize={{ base: 'md', md: 'lg' }}
                color="text.primary"
                lineHeight="1.8"
              >
                Hi! I'm a <Text as="span" color="brand.400" fontWeight="600">Computer Science graduate</Text> specializing 
                in full-stack web development and machine learning. I'm passionate about building 
                practical solutions to real-world problems, from AI-powered applications to complete web platforms.
                I am most excited about react right now!
              </Text>

              <Text
                fontSize={{ base: 'md', md: 'lg' }}
                color="text.primary"
                lineHeight="1.8"
              >
                My approach combines technical 
                proficiency with creative problem-solving to deliver elegant, functional solutions.
              </Text>

              <HStack spacing={4} pt={4} flexWrap="wrap">
                <HStack spacing={2} color="brand.400">
                  <Icon as={FaCode} boxSize={5} />
                  <Text fontWeight="600">Full-Stack Development</Text>
                </HStack>
                <HStack spacing={2} color="brand.400">
                  <Icon as={FaBrain} boxSize={5} />
                  <Text fontWeight="600">Machine Learning</Text>
                </HStack>
              </HStack>
            </VStack>
          </MotionBox>
        </MotionBox>
      </Container>
    </Box>
  );
}

export default About;