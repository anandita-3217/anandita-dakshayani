import React, { useState, useMemo } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Badge,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  Grid,
  useColorModeValue,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowUpRight, X } from 'lucide-react';

const MotionBox = motion(Box);
const MotionGrid = motion(Grid);

// ---------------------------------------------------------------------------
// Projects Data
// ---------------------------------------------------------------------------
const allProjects = [
  {
    id: '01',
    type: 'Web App',
    title: 'Next Ventures',
    period: 'Q1 2025',
    year: 2025,
    month: 3,
    description: 'A space for entrepreneurs to pitch ideas, explore others, and gain exposure with clean design.',
    tags: ['Next.js', 'React', 'Sanity CMS', 'TypeScript', 'Better Auth', 'GROQ', 'Sentry', 'Tailwind CSS', 'Motion.dev'],
    color: '#6366f1',
    link: '#',
  },
  {
    id: '02',
    type: 'Mobile App',
    title: 'Finote App',
    period: 'Q4 2024',
    year: 2024,
    month: 12,
    description: 'An intuitive mobile companion for organizing your digital wallets and analyzing your financial health.',
    tags: ['Expo', 'TypeScript', 'Firebase', 'Zod', 'Zustand', 'Cloudinary', 'Reanimated', 'Gifted Charts'],
    color: '#10b981',
    link: '#',
  },
  {
    id: '03',
    type: 'Web App',
    title: 'Zenith Minds',
    period: 'Q3 2024',
    year: 2024,
    month: 9,
    description: 'A platform connecting students and instructors for enhanced learning experiences.',
    tags: ['Next.js', 'React', 'Node.js', 'Express.js', 'TypeScript', 'MongoDB', 'Razorpay', 'Zustand', 'Tailwind CSS'],
    color: '#f59e0b',
    link: '#',
  },
  {
    id: '04',
    type: 'Web App',
    title: 'Snippix',
    period: 'Q2 2024',
    year: 2024,
    month: 6,
    description: 'A platform for creating and sharing code snippets with a clean and intuitive design.',
    tags: ['Next.js', 'React', 'Zustand', 'TypeScript', 'shadcn-ui', 'Tailwind CSS', 'highlight.js'],
    color: '#ec4899',
    link: '#',
  },
  {
    id: '05',
    type: 'Web App',
    title: 'StarForge',
    period: 'Q1 2024',
    year: 2024,
    month: 2,
    description: 'A sleek AI SaaS landing page with a user-friendly design that enhances engagement.',
    tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
    color: '#06b6d4',
    link: '#',
  },
  {
    id: '06',
    type: 'ML Project',
    title: 'SentimentAI',
    period: 'Q4 2023',
    year: 2023,
    month: 11,
    description: 'A real-time sentiment analysis tool that classifies user reviews with high accuracy.',
    tags: ['Python', 'TensorFlow', 'Flask', 'React', 'NLP', 'Scikit-learn'],
    color: '#8b5cf6',
    link: '#',
  },
];

// Extract all unique types and tags
const allTypes = ['All', ...new Set(allProjects.map(p => p.type))];
const allTags = [...new Set(allProjects.flatMap(p => p.tags))].sort();

// ---------------------------------------------------------------------------
// Helper
// ---------------------------------------------------------------------------
const hexToRgb = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
};

// ---------------------------------------------------------------------------
// Project Card Component
// ---------------------------------------------------------------------------
const ProjectCard = ({ project, index }) => {
  const { r, g, b } = hexToRgb(project.color);
  const rgba = (a) => `rgba(${r},${g},${b},${a})`;

  const textPrimary = useColorModeValue('text.primary', 'white');
  const textSecondary = useColorModeValue('text.secondary', 'text.secondary');

  return (
    <MotionBox
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -6 }}
      p={6}
      borderRadius="2xl"
      border="1px solid"
      borderColor={rgba(0.25)}
      bg={rgba(0.08)}
      backdropFilter="blur(20px)"
      cursor="pointer"
      position="relative"
      overflow="hidden"
      role="group"
      onClick={() => project.link !== '#' && window.open(project.link, '_blank')}
    >
      {/* Top accent line */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        h="3px"
        bgGradient={`linear(to-r, ${project.color}, transparent)`}
      />

      <VStack align="start" spacing={4} h="full">
        {/* Header */}
        <HStack justify="space-between" w="full">
          <HStack spacing={3}>
            <Text
              fontSize="4xl"
              fontWeight="900"
              lineHeight="none"
              color={project.color}
              opacity={0.4}
              fontFamily="heading"
            >
              {project.id}
            </Text>
            <Badge
              px={3}
              py={1}
              borderRadius="full"
              fontSize="xs"
              textTransform="uppercase"
              letterSpacing="wider"
              border="1px solid"
              borderColor={rgba(0.4)}
              bg={rgba(0.2)}
              color={project.color}
              fontWeight="600"
            >
              {project.type}
            </Badge>
          </HStack>
          <MotionBox
            initial={{ opacity: 0, x: -8 }}
            whileHover={{ opacity: 1, x: 0, rotate: 45 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowUpRight size={20} color={project.color} />
          </MotionBox>
        </HStack>

        {/* Title */}
        <Box>
          <Heading
            as="h3"
            fontSize={{ base: 'xl', md: '2xl' }}
            fontWeight="800"
            color={textPrimary}
            fontFamily="heading"
            lineHeight="tight"
          >
            {project.title}
          </Heading>
          <Text fontSize="xs" color={textSecondary} mt={1} textTransform="uppercase" letterSpacing="wider" fontWeight="600">
            {project.period}
          </Text>
        </Box>

        {/* Description */}
        <Text fontSize="sm" color={textSecondary} lineHeight="1.7" flex={1}>
          {project.description}
        </Text>

        {/* Tags */}
        <HStack spacing={2} flexWrap="wrap">
          {project.tags.slice(0, 5).map((tag) => (
            <Box
              key={tag}
              px={2.5}
              py={1}
              fontSize="xs"
              borderRadius="full"
              border="1px solid"
              borderColor={rgba(0.25)}
              bg={rgba(0.1)}
              color={textSecondary}
              fontWeight="500"
            >
              {tag}
            </Box>
          ))}
          {project.tags.length > 5 && (
            <Box
              px={2.5}
              py={1}
              fontSize="xs"
              borderRadius="full"
              border="1px solid"
              borderColor={rgba(0.25)}
              color={project.color}
              fontWeight="600"
            >
              +{project.tags.length - 5}
            </Box>
          )}
        </HStack>
      </VStack>
    </MotionBox>
  );
};

// ---------------------------------------------------------------------------
// Filter Button Component
// ---------------------------------------------------------------------------
const FilterButton = ({ label, isActive, onClick, color }) => {
  const inactiveBg = useColorModeValue('surface.card', 'surface.card');
  const inactiveBorder = useColorModeValue('border.primary', 'border.primary');

  return (
    <MotionBox
      as="button"
      onClick={onClick}
      px={4}
      py={2}
      borderRadius="full"
      border="1px solid"
      borderColor={isActive ? color || 'button.primary.bg' : inactiveBorder}
      bg={isActive ? color ? `${color}20` : 'button.primary.bg' : 'transparent'}
      color={isActive ? color || 'button.primary.text' : 'text.secondary'}
      fontSize="sm"
      fontWeight={isActive ? '600' : '400'}
      cursor="pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.15 }}
      flexShrink={0}
    >
      {label}
    </MotionBox>
  );
};

// ---------------------------------------------------------------------------
// Main ProjectsPage Component
// ---------------------------------------------------------------------------
export default function ProjectsPage()  {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeType, setActiveType] = useState('All');
  const [activeTags, setActiveTags] = useState([]);

  const textPrimary = useColorModeValue('text.primary', 'white');
  const textSecondary = useColorModeValue('text.secondary', 'text.secondary');
  const textMuted = useColorModeValue('text.muted', 'text.muted');
  const inputBg = useColorModeValue('surface.card', 'surface.card');

  // Toggle a tech tag on/off
  const toggleTag = (tag) => {
    setActiveTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setActiveType('All');
    setActiveTags([]);
  };

  const hasActiveFilters = searchQuery || activeType !== 'All' || activeTags.length > 0;

  // Filter + sort logic
  const filteredProjects = useMemo(() => {
    let result = [...allProjects];

    // Sort by latest (year DESC, then month DESC)
    result.sort((a, b) => b.year - a.year || b.month - a.month);

    // Filter by search query (name or description)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    // Filter by type
    if (activeType !== 'All') {
      result = result.filter(p => p.type === activeType);
    }

    // Filter by selected tech tags (must match ALL selected tags)
    if (activeTags.length > 0) {
      result = result.filter(p =>
        activeTags.every(tag => p.tags.includes(tag))
      );
    }

    return result;
  }, [searchQuery, activeType, activeTags]);

  return (
    <Box bg="transparent" minH="100vh" py={20} px={4}>
      <Container maxW="1400px">

        {/* Page Header */}
        <MotionBox
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          mb={16}
          textAlign="center"
        >
          <Text
            fontSize="sm"
            color={textMuted}
            textTransform="uppercase"
            letterSpacing="0.3em"
            mb={4}
            fontWeight="600"
          >
            Portfolio
          </Text>
          <Heading
            as="h1"
            fontSize={{ base: '5xl', md: '7xl', lg: '8xl' }}
            fontWeight="normal"
            color={textPrimary}
            fontFamily="heading"
            mb={6}
          >
            All{' '}
            <Text as="span" bgGradient="linear(to-r, #1e40af, #7c3aed, #ec4899)" bgClip="text">
              Projects
            </Text>
          </Heading>
          <Text fontSize="lg" color={textSecondary} maxW="600px" mx="auto">
            {allProjects.length} projects — sorted by latest. Search by name, filter by type or tech stack.
          </Text>
        </MotionBox>

        {/* Search + Filters */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          mb={12}
        >
          <VStack spacing={6} align="stretch">
            {/* Search Bar */}
            <InputGroup size="lg">
              <InputLeftElement pointerEvents="none" pl={4}>
                <Search size={20} color="var(--chakra-colors-text-secondary)" />
              </InputLeftElement>
              <Input
                pl={14}
                placeholder="Search projects, technologies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                bg={inputBg}
                border="1px solid"
                borderColor="border.primary"
                borderRadius="2xl"
                color={textPrimary}
                fontSize="md"
                _placeholder={{ color: 'text.secondary' }}
                _hover={{ borderColor: 'brand.400' }}
                _focus={{
                  borderColor: 'brand.400',
                  boxShadow: '0 0 0 1px var(--chakra-colors-brand-400)',
                }}
              />
            </InputGroup>

            {/* Type Filter Buttons */}
            <Box>
              <Text fontSize="xs" color={textMuted} textTransform="uppercase" letterSpacing="wider" fontWeight="600" mb={3}>
                Type
              </Text>
              <HStack spacing={2} flexWrap="wrap">
                {allTypes.map(type => (
                  <FilterButton
                    key={type}
                    label={type}
                    isActive={activeType === type}
                    onClick={() => setActiveType(type)}
                  />
                ))}
              </HStack>
            </Box>

            {/* Tech Filter Buttons */}
            <Box>
              <Text fontSize="xs" color={textMuted} textTransform="uppercase" letterSpacing="wider" fontWeight="600" mb={3}>
                Tech Stack
              </Text>
              <HStack spacing={2} flexWrap="wrap">
                {allTags.map(tag => {
                  const isActive = activeTags.includes(tag);
                  return (
                    <FilterButton
                      key={tag}
                      label={tag}
                      isActive={isActive}
                      onClick={() => toggleTag(tag)}
                    />
                  );
                })}
              </HStack>
            </Box>

            {/* Active filters summary + clear */}
            <AnimatePresence>
              {hasActiveFilters && (
                <MotionBox
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <HStack justify="space-between">
                    <Text fontSize="sm" color={textSecondary}>
                      Showing <Text as="span" color={textPrimary} fontWeight="700">{filteredProjects.length}</Text> of {allProjects.length} projects
                    </Text>
                    <MotionBox
                      as="button"
                      onClick={clearFilters}
                      display="flex"
                      alignItems="center"
                      gap={1.5}
                      fontSize="sm"
                      color="text.secondary"
                      _hover={{ color: 'text.primary' }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      cursor="pointer"
                    >
                      <X size={14} />
                      Clear all filters
                    </MotionBox>
                  </HStack>
                </MotionBox>
              )}
            </AnimatePresence>
          </VStack>
        </MotionBox>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          {filteredProjects.length > 0 ? (
            <MotionBox
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Grid
                templateColumns={{
                  base: '1fr',
                  md: 'repeat(2, 1fr)',
                  lg: 'repeat(3, 1fr)',
                }}
                gap={6}
              >
                <AnimatePresence>
                  {filteredProjects.map((project, index) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      index={index}
                    />
                  ))}
                </AnimatePresence>
              </Grid>
            </MotionBox>
          ) : (
            <MotionBox
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              textAlign="center"
              py={20}
            >
              <Text fontSize="5xl" mb={4} alignSelf="center"><Search/></Text>
              <Heading
                as="h3"
                fontSize="2xl"
                fontWeight="700"
                color={textPrimary}
                fontFamily="heading"
                mb={3}
              >
                No projects found
              </Heading>
              <Text fontSize="md" color={textSecondary} mb={6}>
                No projects match "{searchQuery || activeTags.join(', ')}". Try a different search.
              </Text>
              <MotionBox
                as="button"
                onClick={clearFilters}
                px={6}
                py={3}
                borderRadius="full"
                bg="button.primary.bg"
                color="button.primary.text"
                fontSize="md"
                fontWeight="600"
                cursor="pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Clear filters
              </MotionBox>
            </MotionBox>
          )}
        </AnimatePresence>
      </Container>
    </Box>
  );
};

// export default ProjectsPage;