import React, { useRef, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Tag,
  Link,
  Image,
} from '@chakra-ui/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MotionBox = motion(Box);

// Sample projects - same as before
const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'Full-stack shopping platform with real-time inventory and payment integration',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop',
    tags: ['React', 'Node.js', 'Stripe', 'MongoDB'],
    link: '#',
    color: '#FF6B6B',
  },
  {
    id: 2,
    title: 'AI Task Manager',
    description: 'Smart task management with AI-powered priority suggestions and natural language input',
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop',
    tags: ['TypeScript', 'OpenAI', 'PostgreSQL', 'Next.js'],
    link: '#',
    color: '#4ECDC4',
  },
  {
    id: 3,
    title: 'Real-Time Analytics Dashboard',
    description: 'Live data visualization dashboard with WebSocket streaming and custom charts',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    tags: ['D3.js', 'WebSocket', 'React', 'Express'],
    link: '#',
    color: '#95E1D3',
  },
  {
    id: 4,
    title: 'Social Media Scheduler',
    description: 'Multi-platform content scheduler with analytics and automated posting',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop',
    tags: ['Vue.js', 'Firebase', 'Cloud Functions', 'API Integration'],
    link: '#',
    color: '#FFE66D',
  },
];

const StackedCard = ({ project, index, total }) => {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  // Calculate stacking offset based on position
  const baseOffset = (total - index - 1) * 20;
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    [0.95 - index * 0.05, 1, 1, 1, 1.05]
  );
  const y = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [baseOffset, 0, -100]
  );
  const rotateZ = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [index % 2 === 0 ? -2 : 2, 0, index % 2 === 0 ? 3 : -3]
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.5, 1, 1, 0]
  );

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Perspective tilt on hover
    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;

      gsap.to(card, {
        rotateY: x * 15,
        rotateX: -y * 15,
        duration: 0.3,
        ease: 'power2.out',
      });

      // Move color gradient
      gsap.to(card.querySelector('.gradient-overlay'), {
        x: x * 50,
        y: y * 50,
        duration: 0.3,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.5,
        ease: 'power2.out',
      });

      gsap.to(card.querySelector('.gradient-overlay'), {
        x: 0,
        y: 0,
        duration: 0.5,
      });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <MotionBox
      style={{ scale, y, rotateZ, opacity }}
      position="sticky"
      top="100px"
      zIndex={total - index}
      mb={8}
    >
      <Box
        ref={cardRef}
        as={Link}
        href={project.link}
        display="block"
        position="relative"
        maxW="900px"
        mx="auto"
        borderRadius="32px"
        overflow="hidden"
        bg="rgba(20, 20, 30, 0.8)"
        backdropFilter="blur(20px)"
        border="2px solid rgba(255, 255, 255, 0.1)"
        transformStyle="preserve-3d"
        transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
        boxShadow={`0 20px 60px ${project.color}20, 0 0 0 1px ${project.color}10`}
        _hover={{
          textDecoration: 'none',
          border: `2px solid ${project.color}`,
          boxShadow: `0 30px 80px ${project.color}40, 0 0 0 1px ${project.color}30`,
          transform: 'translateY(-5px)',
        }}
      >
        {/* Animated gradient overlay */}
        <Box
          className="gradient-overlay"
          position="absolute"
          top="-50%"
          left="-50%"
          width="200%"
          height="200%"
          bgGradient={`radial-gradient(circle, ${project.color}30, transparent 50%)`}
          pointerEvents="none"
          zIndex={0}
        />

        <VStack spacing={0} align="stretch" position="relative" zIndex={1}>
          {/* Image section with split effect */}
          <Box position="relative" height="300px" overflow="hidden">
            <Image
              src={project.image}
              alt={project.title}
              objectFit="cover"
              width="100%"
              height="100%"
              transition="transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
              _groupHover={{ transform: 'scale(1.08)' }}
            />
            
            {/* Overlay gradient */}
            <Box
              position="absolute"
              bottom={0}
              left={0}
              right={0}
              height="60%"
              bgGradient="linear(to-t, rgba(20, 20, 30, 1), transparent)"
            />

            {/* Project number badge */}
            <Box
              position="absolute"
              top={6}
              right={6}
              bg={project.color}
              color="black"
              fontWeight="900"
              fontSize="2xl"
              width="60px"
              height="60px"
              borderRadius="full"
              display="flex"
              alignItems="center"
              justifyContent="center"
              boxShadow="0 4px 20px rgba(0, 0, 0, 0.3)"
            >
              {String(index + 1).padStart(2, '0')}
            </Box>
          </Box>

          {/* Content section */}
          <VStack
            align="flex-start"
            spacing={4}
            p={8}
            bg="rgba(20, 20, 30, 0.6)"
          >
            <Heading
              as="h3"
              fontSize={{ base: '2xl', md: '3xl' }}
              fontWeight="700"
              color="white"
              lineHeight="1.2"
              position="relative"
              _after={{
                content: '""',
                position: 'absolute',
                bottom: '-8px',
                left: 0,
                width: '60px',
                height: '3px',
                bg: project.color,
              }}
            >
              {project.title}
            </Heading>

            <Text
              fontSize="md"
              color="gray.300"
              lineHeight="1.7"
              mt={2}
            >
              {project.description}
            </Text>

            <HStack spacing={2} flexWrap="wrap" pt={4}>
              {project.tags.map((tag, i) => (
                <Tag
                  key={i}
                  size="md"
                  bg={`${project.color}20`}
                  color={project.color}
                  border="1px solid"
                  borderColor={`${project.color}40`}
                  borderRadius="full"
                  fontWeight="600"
                  fontSize="xs"
                  px={4}
                  py={2}
                  transition="all 0.3s ease"
                  _hover={{
                    bg: `${project.color}40`,
                    transform: 'translateY(-2px)',
                  }}
                >
                  {tag}
                </Tag>
              ))}
            </HStack>

            <HStack
              pt={4}
              spacing={2}
              color={project.color}
              fontWeight="600"
              fontSize="sm"
              transition="gap 0.3s ease"
            >
              <Text>Explore Project</Text>
              <Box
                as="span"
                transform="translateX(0)"
                transition="transform 0.3s ease"
                _groupHover={{ transform: 'translateX(5px)' }}
              >
                →
              </Box>
            </HStack>
          </VStack>
        </VStack>
      </Box>
    </MotionBox>
  );
};

const Options = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const title = titleRef.current;
    if (!title) return;

    // Split text animation
    const chars = title.textContent.split('');
    title.innerHTML = chars
      .map(
        (char, i) =>
          `<span style="display: inline-block; opacity: 0;">${char === ' ' ? '&nbsp;' : char}</span>`
      )
      .join('');

    gsap.to(title.children, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      stagger: 0.03,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: title,
        start: 'top 80%',
      },
    });

    // Floating animation for background elements
    gsap.to('.float-1', {
      y: -30,
      x: 20,
      rotation: 5,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    gsap.to('.float-2', {
      y: -40,
      x: -15,
      rotation: -5,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }, []);

  return (
    <Box
      ref={sectionRef}
      position="relative"
      minH="100vh"
      py={{ base: 16, md: 24 }}
      overflow="hidden"
      bg="#0a0a0f"
    >
      {/* Floating background elements */}
      <Box
        className="float-1"
        position="absolute"
        top="10%"
        right="5%"
        width="400px"
        height="400px"
        borderRadius="50%"
        bg="radial-gradient(circle, #FF6B6B15, transparent 70%)"
        filter="blur(60px)"
        pointerEvents="none"
      />
      <Box
        className="float-2"
        position="absolute"
        bottom="15%"
        left="5%"
        width="350px"
        height="350px"
        borderRadius="50%"
        bg="radial-gradient(circle, #4ECDC415, transparent 70%)"
        filter="blur(60px)"
        pointerEvents="none"
      />

      <Container maxW="1200px" position="relative" zIndex={1}>
        <VStack spacing={16} align="stretch">
          {/* Header */}
          <VStack spacing={4} textAlign="center" mb={12}>
            <Text
              fontSize="xs"
              fontWeight="700"
              letterSpacing="4px"
              textTransform="uppercase"
              color="gray.500"
            >
              Portfolio
            </Text>
            <Heading
              ref={titleRef}
              as="h2"
              fontSize={{ base: '5xl', md: '7xl' }}
              fontWeight="900"
              color="white"
              lineHeight="1"
            >
              Featured Works
            </Heading>
            <Text
              fontSize="lg"
              color="gray.400"
              maxW="600px"
              mx="auto"
            >
              Scroll through my latest projects, each card revealing more as you explore
            </Text>
          </VStack>

          {/* Stacked Cards */}
          <Box position="relative">
            {projects.map((project, index) => (
              <StackedCard
                key={project.id}
                project={project}
                index={index}
                total={projects.length}
              />
            ))}
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default Options;