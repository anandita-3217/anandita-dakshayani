// import { useState, useEffect } from 'react';
// import {
//   Box,
//   Container,
//   Heading,
//   Text,
//   Button,
//   VStack,
//   HStack,
//   Badge,
//   IconButton,
//   Flex,
//   Spinner,
//   Link
// } from '@chakra-ui/react';
// import { ChevronLeft, ChevronRight, ExternalLink, Github, Image as ImageIcon } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useInView } from 'react-intersection-observer';

// const MotionBox = motion.create(Box);
// const MotionHeading = motion.create(Heading);

// function Learning() {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [direction, setDirection] = useState(0);
  
//   // Scroll animation with useInView
//   const [headerRef, headerInView] = useInView({ 
//     triggerOnce: false,
//     threshold: 0.2
//   });
  
//   const [carouselRef, carouselInView] = useInView({ 
//     triggerOnce: false,
//     threshold: 0.2
//   });

//   useEffect(() => {
//     console.log('Loading projects from JSON...');
    
//     // Try absolute path from public folder
//     fetch('../data/learning/miniprojects.json')
//       .then(response => {
//         if (!response.ok) {
//           throw new Error(`Failed to load: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then(data => {
//         console.log('Projects loaded successfully:', data);
//         setProjects(data.projects || []);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('Error loading projects:', error);
//         setError(error.message);
//         setLoading(false);
//       });
//   }, []);

//   // Animation variants
//   const headerVariants = {
//     hidden: { opacity: 0, y: 40 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.7 }
//     }
//   };

//   const carouselContainerVariants = {
//     hidden: { opacity: 0, y: 40 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.7, delay: 0.3 }
//     }
//   };

//   const slideVariants = {
//     enter: (direction) => ({
//       x: direction > 0 ? 1000 : -1000,
//       opacity: 0,
//       scale: 0.8
//     }),
//     center: {
//       zIndex: 1,
//       x: 0,
//       opacity: 1,
//       scale: 1
//     },
//     exit: (direction) => ({
//       zIndex: 0,
//       x: direction < 0 ? 1000 : -1000,
//       opacity: 0,
//       scale: 0.8
//     })
//   };

//   const swipeConfidenceThreshold = 10000;
//   const swipePower = (offset, velocity) => {
//     return Math.abs(offset) * velocity;
//   };

//   const paginate = (newDirection) => {
//     setDirection(newDirection);
//     setCurrentIndex((prevIndex) => {
//       let nextIndex = prevIndex + newDirection;
//       if (nextIndex < 0) nextIndex = projects.length - 1;
//       if (nextIndex >= projects.length) nextIndex = 0;
//       return nextIndex;
//     });
//   };

//   // Loading state
//   if (loading) {
//     return (
//       <Box
//         bg="transparent"
//         color="text.primary"
//         py={{ base: 16, md: 24 }}
//         minH="100vh"
//         display="flex"
//         alignItems="center"
//         justifyContent="center"
//       >
//         <VStack spacing={4}>
//           <Spinner size="xl" color="brand.400" />
//           <Text>Loading projects...</Text>
//         </VStack>
//       </Box>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <Box
//         bg="transparent"
//         color="text.primary"
//         py={{ base: 16, md: 24 }}
//         minH="100vh"
//         display="flex"
//         alignItems="center"
//         justifyContent="center"
//       >
//         <VStack spacing={4}>
//           <Text color="red.400">Error loading projects: {error}</Text>
//           <Text fontSize="sm" color="text.secondary">
//             Make sure miniprojects.json is in public/data/learning/
//           </Text>
//         </VStack>
//       </Box>
//     );
//   }

//   // No projects state
//   if (projects.length === 0) {
//     return (
//       <Box
//         bg="transparent"
//         color="text.primary"
//         py={{ base: 16, md: 24 }}
//         minH="100vh"
//         display="flex"
//         alignItems="center"
//         justifyContent="center"
//       >
//         <Text>No projects found</Text>
//       </Box>
//     );
//   }

//   const currentProject = projects[currentIndex];

//   return (
//     <Box
//       bg="transparent"
//       color="text.primary"
//       py={{ base: 16, md: 20 }}
//       minH="100vh"
//       id="learning"
//     >
//       <Container maxW="container.xl">
//         <VStack spacing={12} align="stretch">
//           {/* Section Header with scroll animation */}
//           <MotionHeading
//             ref={headerRef}
//             as="h2"
//             fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
//             fontWeight="bold"
//             textAlign="center"
//             initial="hidden"
//             animate={headerInView ? "visible" : "hidden"}
//             variants={headerVariants}
//           >
//             <Text as="span" color="brand.400">Learning</Text>
//           </MotionHeading>

//           {/* Carousel Container with scroll animation */}
//           <MotionBox
//             ref={carouselRef}
//             initial="hidden"
//             animate={carouselInView ? "visible" : "hidden"}
//             variants={carouselContainerVariants}
//             w="full"
//             position="relative"
//             overflow="hidden"
//           >
//             <Flex align="center" justify="center" gap={4}>
//               {/* Previous Button */}
//               <IconButton
//                 icon={<ChevronLeft size={24} />}
//                 onClick={() => paginate(-1)}
//                 aria-label="Previous project"
//                 bg="bg.hover"
//                 color="text.primary"
//                 _hover={{
//                   bg: 'brand.400',
//                   transform: 'scale(1.1)'
//                 }}
//                 transition="all 0.3s"
//                 size={{ base: 'md', md: 'lg' }}
//                 isRound
//                 zIndex={2}
//               />

//               {/* Carousel Track */}
//               <Box
//                 position="relative"
//                 width={{ base: '280px', sm: '360px', md: '450px', lg: '500px' }}
//                 height="600px"
//                 display="flex"
//                 alignItems="center"
//                 justifyContent="center"
//               >
//                 <AnimatePresence initial={false} custom={direction}>
//                   <MotionBox
//                     key={currentIndex}
//                     custom={direction}
//                     variants={slideVariants}
//                     initial="enter"
//                     animate="center"
//                     exit="exit"
//                     transition={{
//                       x: { type: "spring", stiffness: 300, damping: 30 },
//                       opacity: { duration: 0.2 },
//                       scale: { duration: 0.2 }
//                     }}
//                     drag="x"
//                     dragConstraints={{ left: 0, right: 0 }}
//                     dragElastic={1}
//                     onDragEnd={(e, { offset, velocity }) => {
//                       const swipe = swipePower(offset.x, velocity.x);

//                       if (swipe < -swipeConfidenceThreshold) {
//                         paginate(1);
//                       } else if (swipe > swipeConfidenceThreshold) {
//                         paginate(-1);
//                       }
//                     }}
//                     position="absolute"
//                     width="100%"
//                     cursor="grab"
//                     _active={{ cursor: 'grabbing' }}
//                   >
//                     <Box
//                       bg="bg.primary"
//                       border="1px solid"
//                       borderColor="border.primary"
//                       borderRadius="xl"
//                       overflow="hidden"
//                       transition="all 0.3s"
//                       _hover={{
//                         transform: 'translateY(-8px)',
//                         boxShadow: 'xl'
//                       }}
//                     >
//                       {/* Project Image/Video */}
//                       <Box
//                         h="250px"
//                         bg="bg.hover"
//                         display="flex"
//                         alignItems="center"
//                         justifyContent="center"
//                         color="text.secondary"
//                         fontSize="sm"
//                         overflow="hidden"
//                       >
//                         {currentProject.videoUrl ? (
//                           <Box
//                             as="iframe"
//                             src={currentProject.videoUrl}
//                             width="100%"
//                             height="100%"
//                             title={currentProject.title}
//                             frameBorder="0"
//                             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                             allowFullScreen
//                           />
//                         ) : currentProject.imageUrl ? (
//                           <Box
//                             as="img"
//                             src={currentProject.imageUrl}
//                             alt={currentProject.title}
//                             width="100%"
//                             height="100%"
//                             objectFit="cover"
//                           />
//                         ) : (
//                           // currentProject.imagePlaceholder || 'Project Image'
//                           <ImageIcon size={48} color='#6B7280'/>
//                         )}
//                       </Box>

//                       {/* Project Content */}
//                       <VStack spacing={5} align="stretch" p={6}>
//                         <Heading
//                           as="h3"
//                           fontSize="xl"
//                           fontWeight="bold"
//                           color="text.primary"
//                         >
//                           {currentProject.title}
//                         </Heading>

//                         <Text
//                           fontSize="sm"
//                           color="text.secondary"
//                           lineHeight="1.6"
//                         >
//                           {currentProject.description}
//                         </Text>

//                         <HStack spacing={2} flexWrap="wrap">
//                           {currentProject.tags?.map((tag, idx) => (
//                             <Badge
//                               key={idx}
//                               bg="bg.hover"
//                               color="text.primary"
//                               px={3}
//                               py={1}
//                               borderRadius="md"
//                               fontSize="xs"
//                               fontWeight="600"
//                             >
//                               {tag}
//                             </Badge>
//                           ))}
//                         </HStack>

//                         <HStack spacing={3}>
//                           {currentProject.liveUrl && (
//                             <Button
//                               as={Link}
//                               href={currentProject.liveUrl}
//                               bg="brand.400"
//                               color="white"
//                               size="sm"
//                               fontWeight="600"
//                               _hover={{
//                                 bg: 'brand.500',
//                                 textDecoration: 'none'
//                               }}
//                               rightIcon={<ExternalLink size={16} />}
//                               isExternal
//                               onClick={(e) => e.stopPropagation()}
//                             >
//                               {currentProject.demoText || 'Live Demo'}
//                             </Button>
//                           )}
//                           {currentProject.githubUrl && (
//                             <Button
//                               as={Link}
//                               href={currentProject.githubUrl}
//                               bg="transparent"
//                               color="text.primary"
//                               size="sm"
//                               fontWeight="600"
//                               border="2px solid"
//                               borderColor="border.secondary"
//                               _hover={{
//                                 borderColor: 'brand.400',
//                                 color: 'brand.400',
//                                 textDecoration: 'none'
//                               }}
//                               rightIcon={<Github size={16} />}
//                               isExternal
//                               onClick={(e) => e.stopPropagation()}
//                             >
//                               View Code
//                             </Button>
//                           )}
//                         </HStack>
//                       </VStack>
//                     </Box>
//                   </MotionBox>
//                 </AnimatePresence>
//               </Box>

//               {/* Next Button */}
//               <IconButton
//                 icon={<ChevronRight size={24} />}
//                 onClick={() => paginate(1)}
//                 aria-label="Next project"
//                 bg="bg.hover"
//                 color="text.primary"
//                 _hover={{
//                   bg: 'brand.400',
//                   transform: 'scale(1.1)'
//                 }}
//                 transition="all 0.3s"
//                 size={{ base: 'md', md: 'lg' }}
//                 isRound
//                 zIndex={2}
//               />
//             </Flex>

//             {/* Carousel Indicators */}
//             <HStack justify="center" spacing={3} mt={8}>
//               {projects.map((_, idx) => (
//                 <MotionBox
//                   key={idx}
//                   w={currentIndex === idx ? '32px' : '8px'}
//                   h="8px"
//                   bg={currentIndex === idx ? 'brand.400' : 'border.secondary'}
//                   borderRadius="full"
//                   cursor="pointer"
//                   onClick={() => {
//                     setDirection(idx > currentIndex ? 1 : -1);
//                     setCurrentIndex(idx);
//                   }}
//                   whileHover={{
//                     backgroundColor: currentIndex === idx ? '#14b8a6' : '#404040',
//                     scale: 1.2
//                   }}
//                   transition={{ duration: 0.3 }}
//                 />
//               ))}
//             </HStack>
//           </MotionBox>
//         </VStack>
//       </Container>
//     </Box>
//   );
// }

// export default Learning;

import React, { useState, useRef } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Badge,
  Button,
  Grid,
  Flex,
  Icon,
} from '@chakra-ui/react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Sparkles,
  Code2,
  Rocket,
  Gamepad2,
  Palette,
  Zap,
  Github,
  ExternalLink,
} from 'lucide-react';

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);

// Fun project categories with playful colors
const categories = [
  { id: 'all', label: 'All Projects', icon: Sparkles, color: '#14b8a6' },
  { id: 'web', label: 'Web Experiments', icon: Code2, color: '#667eea' },
  { id: 'game', label: 'Games & Fun', icon: Gamepad2, color: '#f093fb' },
  { id: 'design', label: 'UI/UX Play', icon: Palette, color: '#4facfe' },
  { id: 'tool', label: 'Mini Tools', icon: Zap, color: '#68d391' },
];

// Sample learning projects data
const learningProjects = [
  {
    id: 1,
    title: 'CSS Animation Playground',
    description: 'Experimenting with wild CSS animations and transitions. Made things bounce, spin, and dance!',
    category: 'web',
    techStack: ['CSS3', 'HTML5', 'JavaScript'],
    color: '#667eea',
    emoji: '🎨',
    learned: ['Advanced CSS animations', 'Keyframes', 'Transform functions'],
    githubUrl: '#',
    liveUrl: '#',
    funFact: 'Spent 3 hours making a button bounce perfectly',
  },
  {
    id: 2,
    title: 'Retro Snake Game',
    description: 'Built the classic snake game from scratch. Added neon colors and dubstep vibes.',
    category: 'game',
    techStack: ['Canvas API', 'JavaScript', 'Game Logic'],
    color: '#f093fb',
    emoji: '🐍',
    learned: ['Canvas rendering', 'Game loops', 'Collision detection'],
    githubUrl: '#',
    liveUrl: '#',
    funFact: 'My high score is embarrassingly low',
  },
  {
    id: 3,
    title: 'Random Color Generator',
    description: 'Click for random colors! Used it way too much during late-night coding sessions.',
    category: 'tool',
    techStack: ['React', 'Color Theory', 'Hooks'],
    color: '#68d391',
    emoji: '🎨',
    learned: ['Color spaces', 'Clipboard API', 'React hooks'],
    githubUrl: '#',
    liveUrl: '#',
    funFact: 'Generated 1000+ colors to find "the perfect blue"',
  },
  {
    id: 4,
    title: 'Glassmorphism Generator',
    description: 'Tool to create those trendy glass effect cards. Made my portfolio look fancy.',
    category: 'tool',
    techStack: ['React', 'CSS', 'Design Systems'],
    color: '#4facfe',
    emoji: '✨',
    learned: ['Backdrop filters', 'Design patterns', 'UI trends'],
    githubUrl: '#',
    liveUrl: '#',
    funFact: 'Used on this very website!',
  },
  {
    id: 5,
    title: 'Typing Speed Tester',
    description: 'Test your WPM! Learned I type faster when angry at bugs.',
    category: 'game',
    techStack: ['JavaScript', 'Timers', 'DOM'],
    color: '#f093fb',
    emoji: '⌨️',
    learned: ['Event handling', 'Time calculations', 'Performance'],
    githubUrl: '#',
    liveUrl: '#',
    funFact: 'Beat my own record while writing this description',
  },
  {
    id: 6,
    title: 'Meme Generator',
    description: 'Create dank memes with custom text. Essential developer tool tbh.',
    category: 'web',
    techStack: ['React', 'Canvas', 'Imgflip API'],
    color: '#667eea',
    emoji: '😂',
    learned: ['Canvas text rendering', 'API integration', 'Meme culture'],
    githubUrl: '#',
    liveUrl: '#',
    funFact: 'Made 50+ memes about semicolons',
  },
];

// Animated Project Card
const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [8, -8]);
  const rotateY = useTransform(x, [-100, 100], [-8, 8]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <MotionBox
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Box
        bg="rgba(255, 255, 255, 0.02)"
        backdropFilter="blur(20px)"
        borderRadius="32px"
        border="2px solid"
        borderColor={isHovered ? project.color : 'rgba(255, 255, 255, 0.08)'}
        p={6}
        h="100%"
        minH="380px"
        position="relative"
        overflow="hidden"
        transition="all 0.4s cubic-bezier(0.23, 1, 0.32, 1)"
        boxShadow={isHovered ? `0 30px 80px ${project.color}40` : 'none'}
        cursor="pointer"
        onClick={() => setShowDetails(!showDetails)}
      >
        {/* Animated gradient background */}
        <Box
          position="absolute"
          top="-100px"
          right="-100px"
          w="300px"
          h="300px"
          bgGradient={`radial(circle, ${project.color}, transparent)`}
          opacity={isHovered ? 0.3 : 0.15}
          transition="opacity 0.6s"
          pointerEvents="none"
          filter="blur(40px)"
        />

        {/* Decorative corner */}
        <Box
          position="absolute"
          top={0}
          right={0}
          w="120px"
          h="120px"
          opacity={0.05}
          pointerEvents="none"
        >
          <Box
            w="100%"
            h="100%"
            bgGradient={`linear(to-br, ${project.color}, ${project.color})`}
            clipPath="polygon(100% 0, 100% 100%, 0 0)"
          />
        </Box>

        {/* Shimmer effect */}
        <Box
          position="absolute"
          top={0}
          left="-100%"
          w="50%"
          h="100%"
          bgGradient="linear(to-r, transparent, rgba(255,255,255,0.1), transparent)"
          transform={isHovered ? 'translateX(300%)' : 'translateX(0)'}
          transition="transform 0.8s"
          pointerEvents="none"
        />

        <VStack align="stretch" spacing={4} h="100%" position="relative" zIndex={1}>
          {/* Emoji Icon */}
          <Flex justify="space-between" align="start">
            <Box
              fontSize="4xl"
              transform={isHovered ? 'scale(1.2) rotate(10deg)' : 'scale(1)'}
              transition="transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)"
            >
              {project.emoji}
            </Box>
            
            <Badge
              colorScheme="purple"
              fontSize="xs"
              px={2}
              py={1}
              borderRadius="md"
              textTransform="capitalize"
            >
              {categories.find(c => c.id === project.category)?.label.split(' ')[0]}
            </Badge>
          </Flex>

          {/* Title and Description */}
          <VStack align="stretch" spacing={2} flex={1}>
            <Heading
              as="h3"
              size="md"
              color="text.primary"
              lineHeight="1.3"
            >
              {project.title}
            </Heading>
            
            <Text
              fontSize="sm"
              color="text.secondary"
              lineHeight="1.6"
            >
              {project.description}
            </Text>

            {/* Fun Fact (shows on hover or click) */}
            {(isHovered || showDetails) && (
              <MotionBox
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                bg={`${project.color}15`}
                p={3}
                borderRadius="lg"
                borderLeft="3px solid"
                borderColor={project.color}
              >
                <Text fontSize="xs" color={project.color} fontWeight="600" mb={1}>
                  Fun Fact 🎉
                </Text>
                <Text fontSize="xs" color="text.secondary">
                  {project.funFact}
                </Text>
              </MotionBox>
            )}
          </VStack>

          {/* Tech Stack Tags */}
          <Flex flexWrap="wrap" gap={2}>
            {project.techStack.map((tech, i) => (
              <Badge
                key={i}
                fontSize="10px"
                px={2}
                py={1}
                borderRadius="md"
                bg="rgba(255, 255, 255, 0.05)"
                color="text.secondary"
                borderWidth="1px"
                borderColor="rgba(255, 255, 255, 0.1)"
              >
                {tech}
              </Badge>
            ))}
          </Flex>

          {/* Action Buttons */}
          <HStack spacing={2}>
            <Button
              as="a"
              href={project.githubUrl}
              target="_blank"
              size="sm"
              variant="ghost"
              leftIcon={<Github size={16} />}
              flex={1}
              color={project.color}
              _hover={{ bg: `${project.color}15` }}
            >
              Code
            </Button>
            <Button
              as="a"
              href={project.liveUrl}
              target="_blank"
              size="sm"
              variant="ghost"
              leftIcon={<ExternalLink size={16} />}
              flex={1}
              color={project.color}
              _hover={{ bg: `${project.color}15` }}
            >
              Demo
            </Button>
          </HStack>
        </VStack>
      </Box>
    </MotionBox>
  );
};

// Main Learning Projects Component
export default function Learning() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [headerRef, headerInView] = useInView({ 
    triggerOnce: false,
    threshold: 0.2
  });

  const filteredProjects = selectedCategory === 'all' 
    ? learningProjects 
    : learningProjects.filter(p => p.category === selectedCategory);

  return (
    <Box
      bg="transparent"
      minH="100vh"
      py={{ base: 12, md: 20 }}
      position="relative"
      overflow="hidden"
    >
      {/* Background decorations */}
      <MotionBox
        position="absolute"
        top="10%"
        left="5%"
        w="400px"
        h="400px"
        bgGradient="radial(circle, purple.400, transparent)"
        opacity={0.1}
        filter="blur(100px)"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <Container maxW="container.xl" position="relative" zIndex={1}>
        <VStack spacing={12} align="stretch">
          {/* Header Section */}
          <VStack spacing={6} textAlign="center">
            <MotionBox
              ref={headerRef}
              initial={{ opacity: 0, y: 40 }}
              animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.7 }}
            >
              <Heading
                as="h2"
                fontSize={{ base: '3xl', md: '5xl' }}
                fontWeight="bold"
                color="text.primary"
                mb={3}
              >
                Learning & Experiments{' '}
                <Text as="span" fontSize={{ base: '3xl', md: '5xl' }}>
                  🧪
                </Text>
              </Heading>
              
              <Text
                fontSize="lg"
                color="text.secondary"
                maxW="700px"
                mx="auto"
              >
                Side projects built purely for learning, experimenting, and having fun. 
                No pressure, just vibes and good code. ✨
              </Text>
            </MotionBox>

            {/* Stats */}
            <HStack spacing={8} pt={4} flexWrap="wrap" justify="center">
              <VStack spacing={1}>
                <Heading size="xl" color="brand.400">
                  {learningProjects.length}
                </Heading>
                <Text fontSize="sm" color="text.secondary">
                  Fun Projects
                </Text>
              </VStack>
              
              <VStack spacing={1}>
                <Heading size="xl" color="purple.400">
                  ∞
                </Heading>
                <Text fontSize="sm" color="text.secondary">
                  Things Learned
                </Text>
              </VStack>
              
              <VStack spacing={1}>
                <Heading size="xl" color="blue.400">
                  100%
                </Heading>
                <Text fontSize="sm" color="text.secondary">
                  Fun Factor
                </Text>
              </VStack>
            </HStack>
          </VStack>

          {/* Category Filter Pills */}
          <Flex 
            gap={3} 
            flexWrap="wrap" 
            justify="center"
            px={{ base: 4, md: 0 }}
          >
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <Button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  leftIcon={<Icon as={cat.icon} boxSize={4} />}
                  size="md"
                  bg={isActive ? `${cat.color}20` : 'rgba(255, 255, 255, 0.02)'}
                  color={isActive ? cat.color : 'text.secondary'}
                  borderWidth="2px"
                  borderColor={isActive ? cat.color : 'rgba(255, 255, 255, 0.08)'}
                  _hover={{
                    bg: `${cat.color}15`,
                    borderColor: cat.color,
                    transform: 'translateY(-2px)',
                  }}
                  transition="all 0.3s"
                  fontWeight="600"
                >
                  {cat.label}
                </Button>
              );
            })}
          </Flex>

          {/* Projects Grid */}
          <Grid
            templateColumns={{
              base: '1fr',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)',
            }}
            gap={6}
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </Grid>

          {/* Call to Action */}
          <Box
            bg="rgba(255, 255, 255, 0.02)"
            backdropFilter="blur(20px)"
            borderRadius="32px"
            border="2px solid"
            borderColor="rgba(255, 255, 255, 0.08)"
            p={8}
            textAlign="center"
          >
            <VStack spacing={4}>
              <Heading size="md" color="text.primary">
                Want to see more? 🚀
              </Heading>
              <Text color="text.secondary" maxW="500px">
                Check out my GitHub for more experiments, half-finished ideas, 
                and projects that taught me valuable lessons!
              </Text>
              <Button
                as="a"
                href="https://github.com/yourusername"
                target="_blank"
                leftIcon={<Github size={20} />}
                colorScheme="purple"
                size="lg"
              >
                View All on GitHub
              </Button>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}