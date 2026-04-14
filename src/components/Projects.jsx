import React, { useRef } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Badge,
  Link,
  Image,
  useColorModeValue,
} from '@chakra-ui/react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';

// TODO: Make this more mobile friendly by adding vertical padding on mobile screens 

const MotionBox = motion.create(Box);


// ---------------------------------------------------------------------------
// Projects data
// ---------------------------------------------------------------------------
const projects = [
  {
    id: '01',
    type: 'Web App',
    title: 'Next Ventures',
    period: 'Q1 2025',
    description:
      'A space for entrepreneurs to pitch ideas, explore others, and gain exposure with clean design',
    tags: [
      'Next.js',
      'React',
      'Sanity CMS',
      'TypeScript',
      'Better Auth',
      'GROQ',
      'Sentry',
      'Markdown',
      'Tailwind CSS',
      'Motion.dev',
    ],
    color: '#6366f1',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
    url: '#', 
    githubUrl: 'https://github.com/anandita-3217'
  },
  {
    id: '02',
    type: 'Mobile App',
    title: 'Finote App',
    period: 'Q4 2025',
    description:
      'An intuitive mobile companion for organizing your digital wallets and analyzing your financial health',
    tags: [
      'Expo',
      'TypeScript',
      'Firebase',
      'Zod',
      'Zustand',
      'Cloudinary',
      'Reanimated',
      'Gifted Charts',
    ],
    color: '#10b981',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=500&fit=crop',
    url: '#', 
    githubUrl: 'https://github.com/anandita-3217'
  },
  {
    id: '03',
    type: 'Web App',
    title: 'Zenith Minds',
    period: '2025',
    description:
      'A platform connecting students and instructors for enhanced learning experiences',
    tags: [
      'Next.js',
      'React',
      'Node.js',
      'Express.js',
      'Turborepo',
      'TypeScript',
      'MongoDB',
      'Razorpay',
      'Zustand',
      'Zod',
      'Tailwind CSS',
      'Motion.dev',
    ],
    color: '#f59e0b',
    image: null,
    url: '#', 
    githubUrl: 'https://github.com/anandita-3217'
  },
  {
    id: '04',
    type: 'Web App',
    title: 'Snippix',
    period: '2025',
    description:
      'A platform for creating and sharing code snippets with a clean and intuitive design',
    tags: [
      'Next.js',
      'React',
      'Zustand',
      'TypeScript',
      'shadcn-ui',
      'Tailwind CSS',
      'highlight.js',
      'react-hotkeys-hook',
    ],
    color: '#ec4899',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=500&fit=crop',
    url: '#', 
    githubUrl: 'https://github.com/anandita-3217'

  },
  {
    id: '05',
    type: 'Web App',
    title: 'StarForge',
    period: '2025',
    description:
      'A sleek AI SaaS landing page with a user-friendly design that enhances engagement',
    tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Parallax', 'Vercel'],
    color: '#06b6d4',
    image: null,
    url: '#', 
    githubUrl: 'https://github.com/anandita-3217'
  },
];

// ---------------------------------------------------------------------------
// Utility – hex → rgb
// ---------------------------------------------------------------------------
const hexToRgb = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
};

// ---------------------------------------------------------------------------
// MockBrowserWindow  –  every instance is exactly the same pixel size.
//   • Uses real rgba() so colours stay visible on a transparent page bg.
//   • Flexbox column layout: titlebar (fixed) → body (flex-1).
//   • The body is a row: sidebar (fixed w) + main (flex-1 grid).
// ---------------------------------------------------------------------------
const MockBrowserWindow = ({ color, image }) => {
  return (

    <Box
      w="100%"
      maxW={{ base: "100%", sm: "900px"  }} 
      minW={{ base: "280px", sm: "500px" }}
      h={{ base: "580px", sm: "380px"}}
      borderRadius="2xl"
      overflow="hidden"
      position="relative"
      bg={`${color}35`}              // ← strong base
      border="1px solid"
      borderColor={`${color}60`}     // ← saturated border
      boxShadow={`0 40px 120px ${color}45`} // ← depth instead of blur
    >
      {/* Gradient polish (NOT the base) */}
      <Box
        position="absolute"
        inset={0}
        bgGradient={`linear(180deg, ${color}20 0%, transparent 100%)`}
        pointerEvents="none"
      />

      {/* ── Browser chrome ── */}
      <HStack
        px={4}
        py={3}
        spacing={2}
        position="relative"
        zIndex={1}
        borderBottom="1px solid"
        borderColor={`${color}50`}
        bg={`${color}30`}
      >
        <HStack spacing={1.5}>
          <Box w={3} h={3} borderRadius="full" bg="red.500" />
          <Box w={3} h={3} borderRadius="full" bg="yellow.500" />
          <Box w={3} h={3} borderRadius="full" bg="green.500" />
        </HStack>

        <Box flex={1} mx={4} h={6} borderRadius="md" bg={`${color}40`} />
      </HStack>

      {/* ── Content ── */}
      {image ? (
        <Image src={image} w="100%" h="100%" objectFit="cover" />
      ) : (
        <VStack p={5} spacing={4} align="stretch" position="relative" zIndex={1}>
          <HStack spacing={4} align="stretch">
            {/* Sidebar */}
            <VStack w={16} spacing={3}>
              {[0, 1, 2, 3, 4].map((i) => (
                <Box
                  key={i}
                  h={8}
                  w="full"
                  borderRadius="lg"
                  bg={`${color}${i === 0 ? '65' : '40'}`} // ← saturated
                />
              ))}
            </VStack>

            {/* Main */}
            <VStack flex={1} spacing={3} align="stretch">
              <Box h={8} w="65%" borderRadius="lg" bg={`${color}60`} />
              <Box h={4} w="45%" borderRadius="md" bg={`${color}45`} />

              <Box
                flex={1}
                display="grid"
                gridTemplateColumns="repeat(3, 1fr)"
                gap={3}
                mt={4}
              >
                {[...Array(6)].map((_, i) => (
                  <Box
                    key={i}
                    borderRadius="xl"
                    bg={`${color}${30 + i * 6}`}
                  />
                ))}
              </Box>
            </VStack>
          </HStack>
        </VStack>
      )}
    </Box>


  );
};




// ---------------------------------------------------------------------------
// ProjectCard
// ---------------------------------------------------------------------------
const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: '-100px' });

  const textPrimary = useColorModeValue('text.primary', 'white');
  const textSecondary = useColorModeValue('text.secondary', 'text.secondary');

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const foregroundY = useTransform(smoothProgress, [0, 1], [200, -200]);
  const backgroundY = useTransform(smoothProgress, [0, 1], [50, -50]);
  const opacity   = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.4, 1, 1, 0.4]);
  const scale     = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.9, 1, 1, 0.9]);

  const isEven = index % 2 === 0;

  return (
    <MotionBox
      ref={cardRef}
      style={{ opacity, scale }}
      position="relative"
      py={{ base: 20, md: 28 }}   
    >
      <Box
        display="grid"
        gridTemplateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }}
        gap={{ base: 14, lg: 20 }}
        alignItems="center"
      >
        {/* ── Mock Screenshot (background – slower parallax) ── */}

        {/* ── Background mock screenshot ── */}
          <MotionBox
            position="absolute"
            inset={{ base: '-20px', lg: '-160px' }}
            zIndex={0}
            style={{ y: backgroundY }}
            display="flex"
            justifyContent="center"
            pointerEvents="none"
          >
            <MotionBox
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1 }}
            >
              <MockBrowserWindow
                color={project.color}
                image={project.image}
              />
            </MotionBox>
          </MotionBox>

        {/* ── Project Info (foreground – faster parallax) ── */}
        <MotionBox
          style={{ y: foregroundY }}
          position="relative"
          zIndex={10}
          order={{ base: 1, lg: isEven ? 1 : 2 }}
        >
          <MotionBox
            initial={{ opacity: 0, x: isEven ? -80 : 80 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            p={8}
            borderRadius="2xl"
            backdropFilter="blur(40px)"
            bg="surface.card"
            border="1px solid"
            borderColor={`${project.color}30`}
            boxShadow={`0 8px 32px ${project.color}15`}
          >
            <VStack align="flex-start" spacing={5}>
              {/* Number + badge */}
              <HStack spacing={4} align="center">
                <Text
                  fontSize={{ base: '6xl', md: '7xl' }}
                  fontWeight="900"
                  lineHeight="none"
                  color={project.color}
                  textShadow={`0 0 40px ${project.color}30`}
                >
                  {project.id}
                </Text>
                <Badge
                  variant="outline"
                  fontSize="xs"
                  textTransform="uppercase"
                  letterSpacing="widest"
                  px={3}
                  py={1}
                  borderColor={project.color}
                  color={project.color}
                  bg={`${project.color}10`}
                >
                  {project.type}
                </Badge>
              </HStack>

              {/* Title */}
              <Link
                href={project.url}
                isExternal
                _hover={{ textDecoration: 'none' }}
              >
                <HStack
                  spacing={3}
                  align="center"
                  role="group"
                  cursor="pointer"
                >
                  <Heading
                    as="h3"
                    fontSize={{ base: '3xl', md: '4xl' }}
                    fontWeight="800"
                    lineHeight="tight"
                    fontFamily="heading"
                    transition="color 0.25s ease"
                    _groupHover={{ color: project.color }}
                  >
                    {project.title}
                  </Heading>

                  {/* Arrow – hidden by default, appears on group hover */}
                  <Box
                    as={ArrowUpRight}
                    w={7}
                    h={7}
                    color={project.color}
                    opacity={0}
                    transform="translateX(-6px)"
                    transition="all 0.25s cubic-bezier(0.4, 0, 0.2, 1)"
                    _groupHover={{
                      opacity: 1,
                      transform: 'translateX(0) rotate(45deg)',
                    }}
                  />
                </HStack>
              </Link>
              {project.githubUrl && (
    <Link
      href={project.githubUrl}
      isExternal
      aria-label="View source on GitHub"
      _hover={{ textDecoration: 'none' }}
    >
      <Box
        as={Github}
        w={5}
        h={5}
        color="text.secondary"
        opacity={0.6}
        transition="all 0.2s ease"
        _hover={{
          opacity: 1,
          color: project.color,
          transform: 'translateY(-1px)',
        }}
      />
    </Link>
  )}

              {/* Period */}
              <Text
                fontSize="xs"
                color={textSecondary}
                textTransform="uppercase"
                letterSpacing="0.15em"
                fontWeight="600"
              >
                {project.period}
              </Text>

              {/* Description */}
              <Text fontSize="md" color={textSecondary} lineHeight="1.7" fontFamily="body">
                {project.description}
              </Text>

              {/* Tags */}
              <MotionBox
                pt={3}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                variants={{
                  visible: {
                    transition: { staggerChildren: 0.03, delayChildren: 0.4 },
                  },
                }}
              >
                <HStack spacing={2} flexWrap="wrap">
                  {project.tags.slice(0, 6).map((tag) => (
                    <MotionBox
                      key={tag}
                      as="span"
                      variants={{
                        hidden: { opacity: 0, scale: 0.8, y: 10 },
                        visible: { opacity: 1, scale: 1, y: 0 },
                      }}
                      whileHover={{ scale: 1.05, background: `${project.color}25` }}
                      px={3}
                      py={1.5}
                      fontSize="xs"
                      borderRadius="full"
                      border="1px solid"
                      borderColor={`${project.color}30`}
                      bg={`${project.color}12`}
                      color={project.color}
                      cursor="default"
                      transition="all 0.2s"
                      fontWeight="500"
                    >
                      {tag}
                    </MotionBox>
                  ))}
                </HStack>
              </MotionBox>
            </VStack>
          </MotionBox>
        </MotionBox>
      </Box>
    </MotionBox>
  );
};

// ---------------------------------------------------------------------------
// Projects – page section
// ---------------------------------------------------------------------------
export function Projects(){
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const textPrimary = useColorModeValue('text.primary', 'white');
  const textMuted  = useColorModeValue('text.muted', 'text.muted');

  return (
    <Box
      ref={sectionRef}
      as="section"
      id="projects"
      py={32}
      px={4}
      overflow="hidden"
      bg="transparent"
    >
      <Container maxW="1400px">
        {/* Header */}
        <MotionBox
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          mb={32}
          textAlign="center"
        >
          <MotionBox
            as={Text}
            fontSize="sm"
            color={textMuted}
            textTransform="uppercase"
            letterSpacing="0.3em"
            mb={4}
            fontWeight="600"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            Case Studies
          </MotionBox>
          <Heading
            as="h2"
            fontSize={{ base: '6xl', md: '7xl', lg: '8xl' }}
            fontWeight="normal"
            color={textPrimary}
            fontFamily="heading"
            py={'50'}
          >
            Curated{' '}
            <Text as="span" bgGradient="linear(to-r, #1e40af, #7c3aed, #ec4899)" bgClip="text">
              work
            </Text>
          </Heading>
        </MotionBox>

        {/* Cards */}
        <VStack spacing={{ base: 40, md: 56, lg: 72 }}  align="stretch">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </VStack>

        {/* See More */}
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          mt={32}
          textAlign="center"
        >
          <MotionBox
            as={Link}
            href="#"
            display="inline-flex"
            alignItems="center"
            gap={3}
            fontSize="xl"
            color="brand.400"
            _hover={{ color: 'brand.500', textDecoration: 'none' }}
            transition="color 0.3s"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            role="group"
            fontWeight="600"
            
          >
            <Text fontFamily="Orbitron">See more projects</Text>
            <Box
              as={ArrowUpRight}
              w={5}
              h={5}
              _groupHover={{ transform: 'rotate(45deg)' }}
              transition="transform 0.3s"
            />
          </MotionBox>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default Projects;

// TODO: 
// add a small github icon to check the code of the project, for responsiveness only the project card should show up not the image card in phones