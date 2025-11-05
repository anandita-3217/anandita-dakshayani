import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  useColorModeValue
} from '@chakra-ui/react';

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
          >
            Anandita Garimella
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

          {/* Optional: Scroll indicator */}
          <Box
            pt={16}
            opacity={0.6}
            animation="bounce 2s infinite"
          >
            <Text fontSize="sm" color="#b0b0b0">
              ↓
            </Text>
          </Box>
        </VStack>
      </Container>

      {/* CSS for scroll animation */}
      <style jsx>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }
      `}</style>
    </Box>
  );
}

export default Hero;