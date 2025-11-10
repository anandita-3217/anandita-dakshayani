import React from 'react';
import {
  Box,Container,Heading,Text,Button,VStack,HStack,SimpleGrid,Icon
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { 
  FaReact, 
  FaPython, 
  FaCode,
  FaBrain
} from 'react-icons/fa';
import { 
  SiDjango, 
  SiJavascript, 
  SiElectron,
  SiTensorflow,
  SiMongodb,
  SiSqlite 
} from 'react-icons/si';

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

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

// About Section Component
function About() {
  const skills = [
    { name: 'React', icon: FaReact, color: '#61DAFB' },
    { name: 'Django', icon: SiDjango, color: '#092E20' },
    { name: 'Python', icon: FaPython, color: '#3776AB' },
    { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
    { name: 'Electron', icon: SiElectron, color: '#3178C6' },
    { name: 'TensorFlow', icon: SiTensorflow, color: '#FF6F00' },
    { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
    { name: 'Sqlite', icon: SiSqlite , color: '#4169E1' },
  ];

  return (
    <Box
      id="about"
      // bg="transparent"
      // color="white"
      // py={{ base: 16, md: 24 }}
      // position="relative"
      // overflow="hidden"
      // padding={30}
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
      {/* Background decoration */}
      <MotionBox
        position="absolute"
        top="20%"
        left="5%"
        w="200px"
        h="200px"
        bg="rgba(20, 184, 166, 0.03)"
        borderRadius="full"
        filter="blur(40px)"
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
            as="h2"
            fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
            fontWeight="bold"
            textAlign="center"
            mb={4}
            variants={fadeInUp}
          >
            <Text as="span" color="#14b8a6">About Me</Text>
          </MotionHeading>

          <MotionText
            textAlign="center"
            color="#b0b0b0"
            fontSize={{ base: 'sm', md: 'md' }}
            mb={12}
            variants={fadeInUp}
          >
            Get to know me and my technical expertise
          </MotionText>

          {/* About Content */}
          <MotionBox
            bg="#222"
            borderRadius="2xl"
            p={{ base: 6, md: 10 }}
            mb={12}
            border="1px solid"
            borderColor="#2a2a2a"
            variants={fadeInUp}
            _hover={{
              borderColor: '#14b8a6',
              boxShadow: '0 0 30px rgba(20, 184, 166, 0.2)'
            }}
            transition="all 0.3s"
          >
            <VStack spacing={6} align="stretch">
              <Text
                fontSize={{ base: 'md', md: 'lg' }}
                color="#e0e0e0"
                lineHeight="1.8"
              >
                Hi! I'm a <Text as="span" color="#14b8a6" fontWeight="600">Computer Science graduate</Text> specializing 
                in full-stack web development and machine learning. I'm passionate about building 
                practical solutions to real-world problems, from AI-powered applications to complete web platforms.
              </Text>

              <Text
                fontSize={{ base: 'md', md: 'lg' }}
                color="#e0e0e0"
                lineHeight="1.8"
              >
                My approach combines technical 
                proficiency with creative problem-solving to deliver elegant, functional solutions.
              </Text>

              <HStack spacing={4} pt={4} flexWrap="wrap">
                <HStack spacing={2} color="#14b8a6">
                  <Icon as={FaCode} boxSize={5} />
                  <Text fontWeight="600">Full-Stack Development</Text>
                </HStack>
                <HStack spacing={2} color="#14b8a6">
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