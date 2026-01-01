import React, { useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  Icon,
  useColorMode,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FaCode,
  FaGamepad,
  FaBook,
  FaMusic,
  FaCamera,
  FaPalette,
} from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const MotionBox = motion(Box);

const hobbiesData = [
  {
    icon: FaCode,
    title: 'Coding',
    description: 'Building projects and learning new technologies every day',
    color: 'brand.400',
  },
  {
    icon: FaGamepad,
    title: 'Gaming',
    description: 'Strategy games and problem-solving adventures',
    color: 'purple.400',
  },
  {
    icon: FaBook,
    title: 'Reading',
    description: 'Tech blogs, sci-fi novels, and continuous learning',
    color: 'blue.400',
  },
  {
    icon: FaMusic,
    title: 'Music',
    description: 'Listening to lo-fi beats while coding',
    color: 'pink.400',
  },
  {
    icon: FaCamera,
    title: 'Photography',
    description: 'Capturing moments and exploring perspectives',
    color: 'orange.400',
  },
  {
    icon: FaPalette,
    title: 'Design',
    description: 'UI/UX design and creative visual experiments',
    color: 'teal.400',
  },
];

const Hobbies = () => {
  const { colorMode } = useColorMode();
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.43, 0.13, 0.23, 0.96],
      },
    },
  };

  return (
    <Box
      ref={sectionRef}
      py={{ base: 16, md: 24 }}
      bg="transparent"
      position="relative"
      overflow="hidden"
    >
      {/* Animated background decoration */}
      <Box
        position="absolute"
        top="10%"
        right="-5%"
        w="400px"
        h="400px"
        bg={colorMode === 'dark' ? 'brand.900' : 'brand.50'}
        opacity={0.3}
        borderRadius="full"
        filter="blur(80px)"
        pointerEvents="none"
      />
      <Box
        position="absolute"
        bottom="10%"
        left="-5%"
        w="300px"
        h="300px"
        bg={colorMode === 'dark' ? 'purple.900' : 'purple.50'}
        opacity={0.3}
        borderRadius="full"
        filter="blur(80px)"
        pointerEvents="none"
      />

      <Container maxW="container.xl" position="relative" zIndex={1}>
        <VStack spacing={12} align="stretch">
          {/* Section Header */}
          <VStack ref={headingRef} spacing={4} textAlign="center">
            <Heading
              as="h2"
              size="2xl"
              bgGradient={
                colorMode === 'dark'
                  ? 'linear(to-r, brand.300, purple.300)'
                  : 'linear(to-r, brand.500, purple.500)'
              }
              bgClip="text"
              fontWeight="extrabold"
            >
              Hobbies & Interests
            </Heading>
            <Text
              fontSize="lg"
              color="text.secondary"
              maxW="600px"
              mx="auto"
            >
              Beyond coding, here's what keeps me inspired and creative
            </Text>
          </VStack>

          {/* Hobbies Grid */}
          <MotionBox
            as={SimpleGrid}
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={8}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {hobbiesData.map((hobby, index) => (
              <MotionBox
                key={index}
                variants={cardVariants}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3 },
                }}
              >
                <Box
                  bg="surface.card"
                  p={8}
                  borderRadius="2xl"
                  borderWidth="1px"
                  borderColor="border.primary"
                  h="100%"
                  position="relative"
                  overflow="hidden"
                  cursor="pointer"
                  transition="all 0.3s ease"
                  _hover={{
                    borderColor: hobby.color,
                    boxShadow: colorMode === 'dark' 
                      ? `0 8px 30px rgba(20, 184, 166, 0.2)`
                      : `0 8px 30px rgba(20, 184, 166, 0.15)`,
                  }}
                >
                  {/* Animated background on hover */}
                  <MotionBox
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    bgGradient={`linear(to-br, ${hobby.color}, transparent)`}
                    opacity={0}
                    transition="opacity 0.3s"
                    whileHover={{ opacity: 0.05 }}
                    pointerEvents="none"
                  />

                  <VStack align="start" spacing={4} position="relative">
                    {/* Icon with pulse animation */}
                    <MotionBox
                      whileHover={{
                        rotate: [0, -10, 10, -10, 0],
                        transition: { duration: 0.5 },
                      }}
                    >
                      <Box
                        p={4}
                        bg={
                          colorMode === 'dark'
                            ? 'rgba(20, 184, 166, 0.1)'
                            : 'rgba(20, 184, 166, 0.08)'
                        }
                        borderRadius="xl"
                        w="fit-content"
                      >
                        <Icon
                          as={hobby.icon}
                          boxSize={8}
                          color={hobby.color}
                        />
                      </Box>
                    </MotionBox>

                    <VStack align="start" spacing={2}>
                      <Heading as="h3" size="md" color="text.primary">
                        {hobby.title}
                      </Heading>
                      <Text color="text.secondary" lineHeight="tall">
                        {hobby.description}
                      </Text>
                    </VStack>
                  </VStack>
                </Box>
              </MotionBox>
            ))}
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
};

export default Hobbies;