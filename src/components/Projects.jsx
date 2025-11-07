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
  Spinner,
  Link
} from '@chakra-ui/react';
import { ChevronLeft, ChevronRight, ExternalLink, Github } from 'lucide-react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const MotionBox = motion(Box);

function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [direction, setDirection] = useState(0);
  

  // Scroll animation controls
  const headerControls = useAnimation();
  const carouselControls = useAnimation();
  const [headerRef, headerInView] = useInView({ 
    triggerOnce: false, // Change to false to animate every time
    threshold: 0.2
  });
  const [carouselRef, carouselInView] = useInView({ 
    triggerOnce: false, // Change to false to animate every time
    threshold: 0.2
  });

  useEffect(() => {
    if (headerInView) {
      headerControls.start("visible");
    }
  }, [headerControls, headerInView]);

  useEffect(() => {
    if (carouselInView) {
      carouselControls.start("visible");
    }
  }, [carouselControls, carouselInView]);

  useEffect(() => {
    // Load projects from JSON file
    fetch('/assets/projects.json')
      .then(response => response.json())
      .then(data => {
        setProjects(data.projects || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading projects:', error);
        setLoading(false);
      });
  }, []);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8
    })
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7 }
    }
  };

  const carouselContainerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay: 0.3 }
    }
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = projects.length - 1;
      if (nextIndex >= projects.length) nextIndex = 0;
      return nextIndex;
    });
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
      py={{ base: 16, md: 20 }}
      minH="100vh"
      id="projects"
    >
      <Container maxW="container.xl">
        <VStack spacing={12} align="stretch">
          {/* Section Header with scroll animation */}
          <MotionBox
            ref={headerRef}
            initial="hidden"
            animate={headerControls}
            variants={headerVariants}
          >
            <Heading
              as="h2"
              fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
              fontWeight="bold"
              textAlign="center"
            >
              Featured Projects
            </Heading>
          </MotionBox>

          {/* Carousel Container with scroll animation */}
          <MotionBox
            ref={carouselRef}
            initial="hidden"
            animate={carouselControls}
            variants={carouselContainerVariants}
            w="full"
            position="relative"
            overflow="hidden"
          >
            <Flex align="center" justify="center" gap={4}>
              {/* Previous Button */}
              <IconButton
                icon={<ChevronLeft size={24} />}
                onClick={() => paginate(-1)}
                aria-label="Previous project"
                bg="#1a1a1a"
                color="white"
                _hover={{
                  bg: '#14b8a6',
                  transform: 'scale(1.1)'
                }}
                transition="all 0.3s"
                size={{ base: 'md', md: 'lg' }}
                isRound
                zIndex={2}
              />

              {/* Carousel Track */}
              <Box
                position="relative"
                width={{ base: '280px', sm: '360px', md: '450px', lg: '500px' }}
                height="600px"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <AnimatePresence initial={false} custom={direction}>
                  <MotionBox
                    key={currentIndex}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 },
                      scale: { duration: 0.2 }
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={1}
                    onDragEnd={(e, { offset, velocity }) => {
                      const swipe = swipePower(offset.x, velocity.x);

                      if (swipe < -swipeConfidenceThreshold) {
                        paginate(1);
                      } else if (swipe > swipeConfidenceThreshold) {
                        paginate(-1);
                      }
                    }}
                    position="absolute"
                    width="100%"
                    cursor="grab"
                    _active={{ cursor: 'grabbing' }}
                  >
                    <Box
                      bg="#1f1f1f"
                      border="1px solid"
                      borderColor="#2a2a2a"
                      borderRadius="xl"
                      overflow="hidden"
                      transition="all 0.3s"
                      _hover={{
                        transform: 'translateY(-8px)',
                        boxShadow: '0 12px 24px rgba(0,0,0,0.3)'
                      }}
                    >
                      {/* Project Image/Video */}
                      <Box
                        h="250px"
                        bg="#1a1a1a"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        color="#b0b0b0"
                        fontSize="sm"
                        overflow="hidden"
                      >
                        {currentProject.videoUrl ? (
                          <Box
                            as="iframe"
                            src={currentProject.videoUrl}
                            width="100%"
                            height="100%"
                            title={currentProject.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        ) : currentProject.imageUrl ? (
                          <Box
                            as="img"
                            src={currentProject.imageUrl}
                            alt={currentProject.title}
                            width="100%"
                            height="100%"
                            objectFit="cover"
                          />
                        ) : (
                          currentProject.imagePlaceholder || 'Project Image'
                        )}
                      </Box>

                      {/* Project Content */}
                      <VStack spacing={5} align="stretch" p={6}>
                        {/* Title */}
                        <Heading
                          as="h3"
                          fontSize="xl"
                          fontWeight="bold"
                          color="white"
                        >
                          {currentProject.title}
                        </Heading>

                        {/* Description */}
                        <Text
                          fontSize="sm"
                          color="#b0b0b0"
                          lineHeight="1.6"
                        >
                          {currentProject.description}
                        </Text>

                        {/* Tech Tags */}
                        <HStack spacing={2} flexWrap="wrap">
                          {currentProject.tags?.map((tag, idx) => (
                            <Badge
                              key={idx}
                              bg="#1a1a1a"
                              color="white"
                              px={3}
                              py={1}
                              borderRadius="md"
                              fontSize="xs"
                              fontWeight="600"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </HStack>

                        {/* Project Links */}
                        <HStack spacing={3}>
                          <Button
                            as={Link}
                            href={currentProject.liveUrl}
                            bg="#14b8a6"
                            color="white"
                            size="sm"
                            fontWeight="600"
                            _hover={{
                              bg: '#0d9488',
                              textDecoration: 'none'
                            }}
                            rightIcon={<ExternalLink size={16} />}
                            isExternal
                            onClick={(e) => e.stopPropagation()}
                          >
                            {currentProject.demoText || 'Live Demo'}
                          </Button>
                          <Button
                            as={Link}
                            href={currentProject.githubUrl}
                            bg="transparent"
                            color="white"
                            size="sm"
                            fontWeight="600"
                            border="2px solid"
                            borderColor="#2a2a2a"
                            _hover={{
                              borderColor: '#14b8a6',
                              color: '#14b8a6',
                              textDecoration: 'none'
                            }}
                            rightIcon={<Github size={16} />}
                            isExternal
                            onClick={(e) => e.stopPropagation()}
                          >
                            View Code
                          </Button>
                        </HStack>
                      </VStack>
                    </Box>
                  </MotionBox>
                </AnimatePresence>
              </Box>

              {/* Next Button */}
              <IconButton
                icon={<ChevronRight size={24} />}
                onClick={() => paginate(1)}
                aria-label="Next project"
                bg="#1a1a1a"
                color="white"
                _hover={{
                  bg: '#14b8a6',
                  transform: 'scale(1.1)'
                }}
                transition="all 0.3s"
                size={{ base: 'md', md: 'lg' }}
                isRound
                zIndex={2}
              />
            </Flex>

            {/* Carousel Indicators */}
            <HStack justify="center" spacing={3} mt={8}>
              {projects.map((_, idx) => (
                <MotionBox
                  key={idx}
                  w={currentIndex === idx ? '32px' : '8px'}
                  h="8px"
                  bg={currentIndex === idx ? '#14b8a6' : '#2a2a2a'}
                  borderRadius="full"
                  cursor="pointer"
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                  }}
                  whileHover={{
                    backgroundColor: currentIndex === idx ? '#14b8a6' : '#404040',
                    scale: 1.2
                  }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </HStack>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
}

export default Projects;