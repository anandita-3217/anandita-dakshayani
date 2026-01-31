import React, { useRef, useEffect, useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Tag,
  Button,
} from '@chakra-ui/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MotionBox = motion(Box);

const projects = [
  {
    id: 1,
    number: '01',
    category: 'Web App',
    title: 'Next Ventures',
    description: 'A space for entrepreneurs to pitch ideas, explore others, and gain exposure with clean design. Built with modern tech stack for blazing fast performance.',
    images: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    ],
    tags: ['Next.js', 'React', 'TypeScript', 'Sanity CMS', 'Tailwind CSS'],
    year: 'Q1 2025',
    link: '#',
    color: '#6366F1',
  },
  {
    id: 2,
    number: '02',
    category: 'Mobile App',
    title: 'Finote App',
    description: 'An intuitive mobile companion for organizing your digital wallets and analyzing your financial health with real-time insights.',
    images: [
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop',
    ],
    tags: ['Expo', 'TypeScript', 'Firebase', 'Zustand', 'Reanimated'],
    year: 'Q4 2025',
    link: '#',
    color: '#10B981',
  },
  {
    id: 3,
    number: '03',
    category: 'Web App',
    title: 'Zenith Minds',
    description: 'A platform connecting students and instructors for enhanced learning experiences. Features real-time collaboration and progress tracking.',
    images: [
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop',
    ],
    tags: ['Next.js', 'Node.js', 'Express.js', 'MongoDB', 'Turborepo'],
    year: '2025',
    link: '#',
    color: '#F59E0B',
  },
  {
    id: 4,
    number: '04',
    category: 'Web App',
    title: 'Snippix',
    description: 'A platform for creating and sharing code snippets with syntax highlighting, version control, and collaborative features.',
    images: [
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop',
    ],
    tags: ['Next.js', 'React', 'Zustand', 'TypeScript', 'Tailwind CSS'],
    year: '2025',
    link: '#',
    color: '#EC4899',
  },
];

const ScrollLinkedShowcase = () => {
  const containerRef = useRef(null);
  const imagesContainerRef = useRef(null);
  const [activeProject, setActiveProject] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create scroll triggers for each project
    projects.forEach((project, index) => {
      ScrollTrigger.create({
        trigger: container,
        start: () => `top+=${index * window.innerHeight} top`,
        end: () => `top+=${(index + 1) * window.innerHeight} top`,
        onEnter: () => setActiveProject(index),
        onEnterBack: () => setActiveProject(index),
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Parallax effect for images - they scroll slower than the page
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -(projects.length - 1) * 400] // Adjust based on number of projects
  );

  return (
    <Box bg="#0a0a0f" minH="100vh" position="relative" overflow="hidden">
      {/* Background gradients */}
      <Box
        position="fixed"
        top="20%"
        right="10%"
        width="500px"
        height="500px"
        borderRadius="full"
        bg={`radial-gradient(circle, ${projects[activeProject]?.color}15, transparent 70%)`}
        filter="blur(80px)"
        pointerEvents="none"
        transition="background 0.6s ease"
        zIndex={0}
      />

      {/* Header */}
      <Box
        position="relative"
        pt={{ base: 20, md: 24 }}
        pb={12}
        zIndex={2}
      >
        <Container maxW="1400px" px={{ base: 4, md: 8 }}>
          <VStack spacing={3} align="flex-start">
            <Text
              fontSize="xs"
              fontWeight="700"
              letterSpacing="3px"
              textTransform="uppercase"
              color="gray.500"
            >
              Case Studies
            </Text>
            <Heading
              fontSize={{ base: '5xl', md: '7xl' }}
              fontWeight="900"
              color="white"
              lineHeight="0.95"
              bgGradient="linear(to-r, white, gray.400)"
              bgClip="text"
            >
              Featured Work
            </Heading>
          </VStack>
        </Container>
      </Box>

      {/* Main Content Area */}
      <Box
        ref={containerRef}
        position="relative"
        height={`${projects.length * 100}vh`}
        zIndex={1}
      >
        <Box
          position="sticky"
          top={0}
          height="100vh"
          display="flex"
          alignItems="center"
        >
          <Container maxW="1400px" px={{ base: 4, md: 8 }}>
            <Box
              display="grid"
              gridTemplateColumns={{ base: '1fr', lg: '1fr 1fr' }}
              gap={{ base: 8, lg: 16 }}
              alignItems="center"
            >
              {/* LEFT SIDE - Scrolling Images (Background) */}
              <MotionBox
                ref={imagesContainerRef}
                style={{ y: imageY }}
                position="relative"
                display={{ base: 'none', lg: 'block' }}
              >
                <VStack spacing={8} align="stretch">
                  {projects.map((project, index) => (
                    <Box
                      key={project.id}
                      position="relative"
                      opacity={activeProject === index ? 1 : 0.3}
                      transform={activeProject === index ? 'scale(1)' : 'scale(0.95)'}
                      transition="all 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
                    >
                      {/* Image Grid */}
                      <Box
                        display="grid"
                        gridTemplateColumns={project.images.length === 1 ? '1fr' : 'repeat(2, 1fr)'}
                        gap={3}
                      >
                        {project.images.map((image, imgIndex) => (
                          <Box
                            key={imgIndex}
                            gridColumn={imgIndex === 0 && project.images.length > 2 ? 'span 2' : 'span 1'}
                            position="relative"
                            overflow="hidden"
                            borderRadius="16px"
                            height={
                              imgIndex === 0 && project.images.length > 2
                                ? '350px'
                                : '250px'
                            }
                            bg="rgba(255, 255, 255, 0.02)"
                            border="1px solid rgba(255, 255, 255, 0.1)"
                          >
                            <Box
                              as="img"
                              src={image}
                              alt={`${project.title} ${imgIndex + 1}`}
                              width="100%"
                              height="100%"
                              objectFit="cover"
                            />
                            {/* Color overlay */}
                            <Box
                              position="absolute"
                              top={0}
                              left={0}
                              right={0}
                              bottom={0}
                              bgGradient={`linear(to-br, ${project.color}15, transparent)`}
                            />
                          </Box>
                        ))}
                      </Box>

                      {/* Glow effect */}
                      <Box
                        position="absolute"
                        top="-20px"
                        left="-20px"
                        width="150px"
                        height="150px"
                        borderRadius="full"
                        bg={`${project.color}20`}
                        filter="blur(60px)"
                        pointerEvents="none"
                        opacity={activeProject === index ? 1 : 0}
                        transition="opacity 0.6s ease"
                      />
                    </Box>
                  ))}
                </VStack>
              </MotionBox>

              {/* RIGHT SIDE - Sticky Content (Foreground) */}
              <Box position="relative" zIndex={2}>
                <VStack align="flex-start" spacing={5}>
                  {/* Project Number & Category */}
                  <HStack spacing={3}>
                    <Text
                      fontSize="5xl"
                      fontWeight="900"
                      color={projects[activeProject]?.color}
                      lineHeight="1"
                      transition="color 0.4s ease"
                    >
                      {projects[activeProject]?.number}
                    </Text>
                    <VStack align="flex-start" spacing={0}>
                      <Text
                        fontSize="xs"
                        fontWeight="700"
                        textTransform="uppercase"
                        letterSpacing="2px"
                        color="gray.500"
                      >
                        {projects[activeProject]?.category}
                      </Text>
                      <Text
                        fontSize="xs"
                        fontWeight="500"
                        color="gray.500"
                      >
                        {projects[activeProject]?.year}
                      </Text>
                    </VStack>
                  </HStack>

                  {/* Title */}
                  <Heading
                    fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }}
                    fontWeight="900"
                    color="white"
                    lineHeight="1.05"
                    transition="opacity 0.4s ease"
                  >
                    {projects[activeProject]?.title}
                  </Heading>

                  {/* Description */}
                  <Text
                    fontSize={{ base: 'md', md: 'lg' }}
                    color="gray.300"
                    lineHeight="1.7"
                    maxW="550px"
                    transition="opacity 0.4s ease"
                  >
                    {projects[activeProject]?.description}
                  </Text>

                  {/* Tags */}
                  <HStack spacing={2} flexWrap="wrap" pt={2}>
                    {projects[activeProject]?.tags.map((tag, i) => (
                      <Tag
                        key={i}
                        size="md"
                        bg="rgba(255, 255, 255, 0.05)"
                        color="gray.300"
                        border="1px solid rgba(255, 255, 255, 0.1)"
                        borderRadius="full"
                        px={3}
                        py={1}
                        fontSize="xs"
                        fontWeight="500"
                        transition="all 0.3s ease"
                        _hover={{
                          bg: `${projects[activeProject]?.color}20`,
                          borderColor: projects[activeProject]?.color,
                          color: 'white',
                        }}
                      >
                        {tag}
                      </Tag>
                    ))}
                  </HStack>

                  {/* CTA Button */}
                  <Button
                    as="a"
                    href={projects[activeProject]?.link}
                    size="md"
                    bg={projects[activeProject]?.color}
                    color="white"
                    px={6}
                    py={5}
                    fontSize="sm"
                    fontWeight="700"
                    borderRadius="full"
                    mt={4}
                    transition="all 0.3s ease"
                    _hover={{
                      transform: 'translateY(-2px)',
                      boxShadow: `0 10px 30px ${projects[activeProject]?.color}50`,
                    }}
                  >
                    <HStack spacing={2}>
                      <Text>View Project</Text>
                      <Text>→</Text>
                    </HStack>
                  </Button>

                  {/* Progress Indicator */}
                  <HStack spacing={2} pt={6}>
                    {projects.map((_, index) => (
                      <Box
                        key={index}
                        width={activeProject === index ? '40px' : '8px'}
                        height="3px"
                        bg={activeProject === index ? projects[activeProject]?.color : 'rgba(255, 255, 255, 0.2)'}
                        borderRadius="full"
                        transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                      />
                    ))}
                  </HStack>
                </VStack>
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>

      {/* Bottom padding */}
      <Box height="50vh" position="relative" zIndex={1} />
    </Box>
  );
};

export default ScrollLinkedShowcase;