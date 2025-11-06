import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Badge,
  IconButton,
  Flex,
  useBreakpointValue,
  Spinner
} from '@chakra-ui/react';
import { ChevronLeft, ChevronRight, ExternalLink, Github } from 'lucide-react';

function ProjectCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [projects, setProjects] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [direction, setDirection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const isMobile = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    // Load projects from JSON file
    fetch('/assets/projects.json')
      .then(response => response.json())
      .then(data => {
        setProjects(data.projects);
        setAchievements(data.achievements);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading projects:', error);
        setLoading(false);
      });
  }, []);

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  if (loading) {
    return (
      <Box
        bg="#0a0a0a"
        color="white"
        py={{ base: 16, md: 24 }}
        minH="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Spinner size="xl" color="#14b8a6" />
      </Box>
    );
  }

  if (projects.length === 0) {
    return null;
  }

  const currentProject = projects[currentIndex];

  return (
    <Box
      bg="#0a0a0a"
      color="white"
      py={{ base: 16, md: 24 }}
      minH="100vh"
      id="projects"
    >
      <Container maxW="container.xl">
        <VStack spacing={12}>
          {/* Section Header */}
          <VStack spacing={4} textAlign="center">
            <Heading
              as="h2"
              fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
              fontWeight="bold"
            >
              Featured Projects
            </Heading>
            <Text fontSize={{ base: 'md', md: 'lg' }} color="#b0b0b0" maxW="600px">
              Explore my work in AI, machine learning, and full-stack development
            </Text>
          </VStack>

          {/* Carousel Container */}
          <Box w="full" position="relative">
            <Flex align="center" justify="center" gap={4}>
              {/* Previous Button */}
              <IconButton
                icon={<ChevronLeft size={24} />}
                onClick={prevProject}
                aria-label="Previous project"
                bg="#1a1a1a"
                color="white"
                _hover={{
                  bg: '#14b8a6',
                  transform: 'scale(1.1)'
                }}
                transition="all 0.3s"
                size={isMobile ? 'md' : 'lg'}
                isRound
              />

              {/* Project Card */}
              <Box
                bg="#1a1a1a"
                borderRadius="xl"
                p={{ base: 6, md: 10 }}
                maxW="800px"
                w="full"
                border="1px solid"
                borderColor="#2a2a2a"
                transition="all 0.5s ease-in-out"
                _hover={{
                  borderColor: '#14b8a6',
                  boxShadow: '0 8px 30px rgba(20, 184, 166, 0.2)'
                }}
              >
                <VStack spacing={6} align="stretch">
                  {/* Project Header */}
                  <Box>
                    <Flex justify="space-between" align="start" mb={4}>
                      <Heading
                        as="h3"
                        fontSize={{ base: 'xl', md: '2xl' }}
                        color="#14b8a6"
                      >
                        {currentProject.title}
                      </Heading>
                      <HStack spacing={2}>
                        {currentProject.githubUrl && (
                          <IconButton
                            as="a"
                            href={currentProject.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            icon={<Github size={18} />}
                            aria-label="View code"
                            size="sm"
                            variant="ghost"
                            color="#b0b0b0"
                            _hover={{ color: '#14b8a6' }}
                          />
                        )}
                        {currentProject.liveUrl && (
                          <IconButton
                            as="a"
                            href={currentProject.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            icon={<ExternalLink size={18} />}
                            aria-label="View project"
                            size="sm"
                            variant="ghost"
                            color="#b0b0b0"
                            _hover={{ color: '#14b8a6' }}
                          />
                        )}
                      </HStack>
                    </Flex>

                    {/* Tags */}
                    <Flex flexWrap="wrap" gap={2} mb={4}>
                      {currentProject.tags.map((tag, idx) => (
                        <Badge
                          key={idx}
                          bg="#0a0a0a"
                          color="#14b8a6"
                          px={3}
                          py={1}
                          borderRadius="full"
                          fontSize="xs"
                          fontWeight="600"
                          border="1px solid"
                          borderColor="#14b8a6"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </Flex>
                  </Box>

                  {/* Description */}
                  <Text
                    fontSize={{ base: 'sm', md: 'md' }}
                    color="#b0b0b0"
                    lineHeight="1.8"
                  >
                    {currentProject.description}
                  </Text>

                  {/* Metrics */}
                  <HStack
                    spacing={6}
                    flexWrap="wrap"
                    py={4}
                    borderY="1px solid"
                    borderColor="#2a2a2a"
                  >
                    {currentProject.metrics.map((metric, idx) => (
                      <VStack key={idx} spacing={1} align="start">
                        <Text fontSize="xs" color="#808080">
                          {metric.label}
                        </Text>
                        <Text
                          fontSize={{ base: 'lg', md: 'xl' }}
                          fontWeight="bold"
                          color="#14b8a6"
                        >
                          {metric.value}
                        </Text>
                      </VStack>
                    ))}
                  </HStack>

                  {/* Highlights */}
                  <VStack spacing={2} align="stretch">
                    <Text fontSize="sm" fontWeight="600" color="#b0b0b0">
                      Key Highlights:
                    </Text>
                    {currentProject.highlights.map((highlight, idx) => (
                      <Flex key={idx} align="start">
                        <Text color="#14b8a6" mr={2}>•</Text>
                        <Text fontSize="sm" color="#b0b0b0">
                          {highlight}
                        </Text>
                      </Flex>
                    ))}
                  </VStack>
                </VStack>
              </Box>

              {/* Next Button */}
              <IconButton
                icon={<ChevronRight size={24} />}
                onClick={nextProject}
                aria-label="Next project"
                bg="#1a1a1a"
                color="white"
                _hover={{
                  bg: '#14b8a6',
                  transform: 'scale(1.1)'
                }}
                transition="all 0.3s"
                size={isMobile ? 'md' : 'lg'}
                isRound
              />
            </Flex>

            {/* Carousel Indicators */}
            <HStack justify="center" spacing={3} mt={8}>
              {projects.map((_, idx) => (
                <Box
                  key={idx}
                  w={currentIndex === idx ? '32px' : '8px'}
                  h="8px"
                  bg={currentIndex === idx ? '#14b8a6' : '#2a2a2a'}
                  borderRadius="full"
                  cursor="pointer"
                  onClick={() => setCurrentIndex(idx)}
                  transition="all 0.3s"
                  _hover={{
                    bg: currentIndex === idx ? '#14b8a6' : '#404040'
                  }}
                />
              ))}
            </HStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}

export default ProjectCarousel;