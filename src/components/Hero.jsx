import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  useColorModeValue,
  Image 
} from '@chakra-ui/react';
import { ReactTyped } from "react-typed";
import { MotionBox } from "./MotionBox";


import CodingImg from "./assets/Coding.png";
import DevGif from "./assets/developer.gif";
function Hero() {
  return (
    <Box
      bg="#0a0a0a"
      color="white"
      py={{ base: 20, md: 32 }}
      minH="100vh"
      display="flex"
      alignItems="center"
    >
      <Container maxW="container.xl">
        <VStack spacing={6} textAlign="center">
          {/* Main Heading */}
          <Heading
            as="h1"
            fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }}
            fontWeight="bold"
            lineHeight="1.2"
            color="#14b8a6"
          >
          <ReactTyped
          strings={
            ["Hi! I am Anandita!"]}
          typeSpeed={80}
          backSpeed={80}
          loop

        />

          </Heading>

          {/* Subtitle */}
          <Text
            fontSize={{ base: 'xl', md: '2xl' }}
            color="#b0b0b0"
            fontWeight="500"
          >
            Full-Stack Developer | ML Enthusiast
          </Text>

          {/* Tagline */}
          <Text
            fontSize={{ base: 'md', md: 'lg' }}
            color="#b0b0b0"
            maxW="600px"
            lineHeight="1.8"
          >
            Building AI-powered web applications with React, Django, and Python
          </Text>

          {/* CTA Buttons */}
          <HStack
            spacing={4}
            pt={4}
            flexWrap="wrap"
            justify="center"
          >
            <Button
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
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 20px rgba(20, 184, 166, 0.3)'
              }}
              transition="all 0.3s"
            >
              View Projects
            </Button>

            <Button
              as="a"
              href="#contact"
              variant="outline"
              size="lg"
              px={8}
              py={6}
              fontSize="md"
              fontWeight="600"
              borderColor="#2a2a2a"
              color="white"
              _hover={{
                borderColor: '#14b8a6',
                color: '#14b8a6',
                transform: 'translateY(-2px)'
              }}
              transition="all 0.3s"
            >
              Get in Touch
            </Button>
          </HStack>
          <Box textAlign="center" p={10}>
      <Image src={CodingImg} alt="Coding" boxSize="250px" mx="auto" />
      {/* <Image src={DevGif} alt="Developer" boxSize="250px" mx="auto" mt={4} /> */}
      <MotionBox delay={0.6}>
        <Image
          src={DevGif}
          alt="Developer"
          mx="auto"
          mt={8}
          boxSize={["200px", "300px"]}
          borderRadius="xl"
        />
      </MotionBox>
    </Box>
        </VStack>
      </Container>
    </Box>
  );
}

export default Hero;