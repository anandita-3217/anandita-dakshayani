// import React, { useRef } from 'react';
// import {
//   Box,
//   Container,
//   Heading,
//   Text,
//   VStack,
//   HStack,
//   Badge,
//   Link,
//   useColorModeValue,
//   AspectRatio 
// } from '@chakra-ui/react';
// import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
// import { ArrowUpRight } from 'lucide-react';

// const MotionBox = motion(Box);
// const MotionDiv = motion.div;

// const projects = [
//   {
//     id: '01',
//     type: 'Web App',
//     title: 'Next Ventures',
//     period: 'Q1 2025',
//     description:
//       'A space for entrepreneurs to pitch ideas, explore others, and gain exposure with clean design',
//     longDescription:
//       "A platform designed for early-stage entrepreneurs to pitch, browse, and engage with startup ideas. It's built to impress both users and investors with blazing speed, compelling visuals, and a modern tech stack.",
//     highlights: [
//       'Leveraged Partial Prerendering and After for faster loading.',
//       'Simplified idea submission with a clean, intuitive design.',
//       'Enhanced browsing with seamless performance optimization.',
//     ],
//     tags: [
//       'Next.js',
//       'React',
//       'Sanity CMS',
//       'TypeScript',
//       'Better Auth',
//       'GROQ',
//       'Sentry',
//       'Markdown',
//       'Tailwind CSS',
//       'Motion.dev',
//     ],
//     color: '#6366f1',
//   },
//   {
//     id: '02',
//     type: 'Mobile App',
//     title: 'Finote App',
//     period: 'Q4 2025',
//     description:
//       'An intuitive mobile companion for organizing your digital wallets and analyzing your financial health',
//     longDescription:
//       'A comprehensive mobile application for managing digital finances with real-time analytics and intuitive wallet organization.',
//     highlights: [
//       'Beautiful animated charts for financial visualization.',
//       'Secure wallet management with cloud sync.',
//       'Smart spending insights and budget tracking.',
//     ],
//     tags: [
//       'Expo',
//       'TypeScript',
//       'Firebase',
//       'Zod',
//       'Zustand',
//       'Cloudinary',
//       'Reanimated',
//       'Gifted Charts',
//     ],
//     color: '#10b981',
//   },
//   {
//     id: '03',
//     type: 'Web App',
//     title: 'Zenith Minds',
//     period: '2025',
//     description:
//       'A platform connecting students and instructors for enhanced learning experiences',
//     longDescription:
//       'An educational platform bridging the gap between knowledge seekers and providers with robust course management and payment integration.',
//     highlights: [
//       'Seamless video streaming for courses.',
//       'Integrated payment system with Razorpay.',
//       'Real-time progress tracking and analytics.',
//     ],
//     tags: [
//       'Next.js',
//       'React',
//       'Node.js',
//       'Express.js',
//       'Turborepo',
//       'TypeScript',
//       'MongoDB',
//       'Razorpay',
//       'Zustand',
//       'Zod',
//       'Tailwind CSS',
//       'Motion.dev',
//     ],
//     color: '#f59e0b',
//   },
//   {
//     id: '04',
//     type: 'Web App',
//     title: 'Snippix',
//     period: '2025',
//     description:
//       'A platform for creating and sharing code snippets with a clean and intuitive design',
//     longDescription:
//       'A developer-focused tool for creating, sharing, and organizing beautiful code snippets with syntax highlighting and keyboard shortcuts.',
//     highlights: [
//       'Multiple theme support for code highlighting.',
//       'Keyboard shortcuts for power users.',
//       'Easy sharing and export options.',
//     ],
//     tags: [
//       'Next.js',
//       'React',
//       'Zustand',
//       'TypeScript',
//       'shadcn-ui',
//       'Tailwind CSS',
//       'highlight.js',
//       'react-hotkeys-hook',
//     ],
//     color: '#ec4899',
//   },
//   {
//     id: '05',
//     type: 'Web App',
//     title: 'StarForge',
//     period: '2025',
//     description:
//       'A sleek AI SaaS landing page with a user-friendly design that enhances engagement',
//     longDescription:
//       'A modern, high-converting landing page template for AI SaaS products featuring stunning parallax effects and optimized performance.',
//     highlights: [
//       'Scroll-triggered parallax animations.',
//       'Optimized for conversion and engagement.',
//       'Lightning fast Core Web Vitals scores.',
//     ],
//     tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Parallax', 'Vercel'],
//     color: '#06b6d4',
//   },
// ];

// const ProjectCard = ({ project, index }) => {
//   const cardRef = useRef(null);
//   const isInView = useInView(cardRef, { once: true, margin: '-100px' });

//   // Theme colors
//   const cardBg = useColorModeValue('surface.card', '#1a1a1a');
//   const textPrimary = useColorModeValue('text.primary', 'white');
//   const textSecondary = useColorModeValue('text.secondary', 'text.secondary');
//   const borderColor = useColorModeValue('border.primary', 'border.primary');

//   const { scrollYProgress } = useScroll({
//     target: cardRef,
//     offset: ['start end', 'end start'],
//   });

//   // Smooth the scroll progress
//   const smoothProgress = useSpring(scrollYProgress, {
//     stiffness: 100,
//     damping: 30,
//     restDelta: 0.001,
//   });

//   // Foreground (info) moves faster - 2x scroll speed
//   const foregroundY = useTransform(smoothProgress, [0, 1], [200, -200]);

//   // Background (images) moves slower - 0.5x scroll speed
//   const backgroundY = useTransform(smoothProgress, [0, 1], [50, -50]);

//   const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.4, 1, 1, 0.4]);
//   const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.9, 1, 1, 0.9]);

//   const isEven = index % 2 === 0;

//   return (
//     <MotionBox
//       ref={cardRef}
//       style={{ opacity, scale }}
//       position="relative"
//       minH="700px"
//       h="700px" // Fixed height for all cards
//     >
//       <Box
//         position="relative"
//         display="grid"
//         gridTemplateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }}
//         gap={{ base: 8, lg: 16 }}
//         alignItems="center"
//         h="full"
//       >
//         {/* Background Layer - Project Visual (moves slower) */}
//         <MotionBox
//           style={{ y: backgroundY }}
//           position={{ base: 'relative', lg: 'absolute' }}
//           inset={{ base: 'auto', lg: 0 }}
//           gridColumn={{ base: '1', lg: isEven ? '2' : '1' }}
//           order={{ base: 2, lg: isEven ? 2 : 1 }}
//           h="full"
//         >
//           <MotionBox
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={isInView ? { opacity: 1, scale: 1 } : {}}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             position="relative"
//             h="full"
//           >
//             {/* Main card */}
//             <Box
//               position="relative"
//               h="full"
//               borderRadius="3xl"
//               overflow="hidden"
//               border="1px solid"
//               borderColor={`${project.color}20`}
//               bgGradient={`linear(135deg, ${project.color}08 0%, ${project.color}02 100%)`}
//             >
//               {/* Mock Screenshot */}
//               <Box position="absolute" inset={0} p={6}>
//                 {/* Browser chrome */}
//                 <Box
//                   borderRadius="2xl"
//                   overflow="hidden"
//                   h="full"
//                   bgGradient={`linear(180deg, ${project.color}15 0%, ${project.color}05 100%)`}
//                 >
//                   {/* Title bar */}
//                   <HStack
//                     px={4}
//                     py={3}
//                     borderBottom="1px solid"
//                     borderColor={`${project.color}20`}
//                     spacing={2}
//                   >
//                     <HStack spacing={1.5}>
//                       <Box w={3} h={3} borderRadius="full" bg="red.500" opacity={0.8} />
//                       <Box w={3} h={3} borderRadius="full" bg="yellow.500" opacity={0.8} />
//                       <Box w={3} h={3} borderRadius="full" bg="green.500" opacity={0.8} />
//                     </HStack>
//                     <Box
//                       flex={1}
//                       mx={4}
//                       h={6}
//                       borderRadius="md"
//                       bg={`${project.color}15`}
//                     />
//                   </HStack>

//                   {/* Content area */}
//                   <VStack p={4} spacing={4} align="stretch">
//                     {/* Sidebar + Main content layout */}
//                     <HStack spacing={4} h="full" align="stretch">
//                       {/* Sidebar */}
//                       <VStack w={16} spacing={3}>
//                         {[...Array(5)].map((_, i) => (
//                           <Box
//                             key={i}
//                             h={8}
//                             borderRadius="lg"
//                             bg={`${project.color}${i === 0 ? '40' : '15'}`}
//                             w="full"
//                           />
//                         ))}
//                       </VStack>

//                       {/* Main content */}
//                       <VStack flex={1} spacing={3} align="stretch">
//                         <Box h={8} borderRadius="lg" w="66%" bg={`${project.color}30`} />
//                         <Box h={4} borderRadius="md" w="50%" bg={`${project.color}15`} />
//                         <Box
//                           display="grid"
//                           gridTemplateColumns="repeat(3, 1fr)"
//                           gap={3}
//                           mt={4}
//                           flex={1}
//                         >
//                           {[...Array(6)].map((_, i) => (
//                             <Box
//                               key={i}
//                               borderRadius="xl"
//                               bg={`${project.color}${10 + i * 3}`}
//                             />
//                           ))}
//                         </Box>
//                       </VStack>
//                     </HStack>
//                   </VStack>
//                 </Box>
//               </Box>
//             </Box>
//           </MotionBox>
//         </MotionBox>

//         {/* Foreground Layer - Project Info (moves faster) */}
//         <MotionBox
//           style={{ y: foregroundY }}
//           position="relative"
//           zIndex={10}
//           gridColumn={{ base: '1', lg: isEven ? '1' : '2' }}
//           order={{ base: 1, lg: isEven ? 1 : 2 }}
//           h="full"
//           display="flex"
//           alignItems="center"
//         >
//           <MotionBox
//             initial={{ opacity: 0, x: isEven ? -80 : 80 }}
//             animate={isInView ? { opacity: 1, x: 0 } : {}}
//             transition={{ duration: 0.7, delay: 0.1 }}
//             p={8}
//             borderRadius="2xl"
//             backdropFilter="blur(40px)"
//             bg="surface.card"
//             border="1px solid"
//             borderColor={`${project.color}30`}
//             boxShadow={`0 8px 32px ${project.color}15`}
//             w="full"
//           >
//             <VStack align="flex-start" spacing={5}>
//               {/* Number and Type */}
//               <HStack spacing={4} align="center">
//                 <Text
//                   fontSize={{ base: '6xl', md: '7xl' }}
//                   fontWeight="900"
//                   lineHeight="none"
//                   color={project.color}
//                   textShadow={`0 0 40px ${project.color}30`}
//                 >
//                   {project.id}
//                 </Text>
//                 <Badge
//                   variant="outline"
//                   fontSize="xs"
//                   textTransform="uppercase"
//                   letterSpacing="widest"
//                   px={3}
//                   py={1}
//                   borderColor={project.color}
//                   color={project.color}
//                   bg={`${project.color}10`}
//                 >
//                   {project.type}
//                 </Badge>
//               </HStack>

//               {/* Title */}
//               <MotionDiv
//                 whileHover={{ x: 8 }}
//                 transition={{ type: 'spring', stiffness: 400, damping: 25 }}
//               >
//                 <HStack spacing={3} align="center" cursor="pointer" role="group">
//                   <Heading
//                     as="h3"
//                     fontSize={{ base: '3xl', md: '4xl' }}
//                     fontWeight="800"
//                     color={textPrimary}
//                     lineHeight="tight"
//                     fontFamily="heading"
//                   >
//                     {project.title}
//                   </Heading>
//                   <MotionBox
//                     initial={{ opacity: 0, x: -10 }}
//                     whileHover={{ opacity: 1, x: 0, rotate: 45 }}
//                     transition={{ duration: 0.2 }}
//                   >
//                     <Box as={ArrowUpRight} w={7} h={7} color={project.color} />
//                   </MotionBox>
//                 </HStack>
//               </MotionDiv>

//               {/* Period */}
//               <Text
//                 fontSize="xs"
//                 color={textSecondary}
//                 textTransform="uppercase"
//                 letterSpacing="0.15em"
//                 fontWeight="600"
//               >
//                 {project.period}
//               </Text>

//               {/* Description */}
//               <Text 
//                 fontSize="md" 
//                 color={textSecondary} 
//                 lineHeight="1.7"
//                 fontFamily="body"
//               >
//                 {project.description}
//               </Text>

//               {/* Tags */}
//               <MotionBox
//                 pt={3}
//                 initial="hidden"
//                 animate={isInView ? 'visible' : 'hidden'}
//                 variants={{
//                   visible: {
//                     transition: {
//                       staggerChildren: 0.03,
//                       delayChildren: 0.4,
//                     },
//                   },
//                 }}
//               >
//                 <HStack spacing={2} flexWrap="wrap">
//                   {project.tags.slice(0, 6).map((tag) => (
//                     <MotionBox
//                       key={tag}
//                       as="span"
//                       variants={{
//                         hidden: { opacity: 0, scale: 0.8, y: 10 },
//                         visible: { opacity: 1, scale: 1, y: 0 },
//                       }}
//                       whileHover={{
//                         scale: 1.05,
//                         background: `${project.color}25`,
//                       }}
//                       px={3}
//                       py={1.5}
//                       fontSize="xs"
//                       borderRadius="full"
//                       border="1px solid"
//                       borderColor={`${project.color}30`}
//                       bg={`${project.color}12`}
//                       color={project.color}
//                       cursor="default"
//                       transition="all 0.2s"
//                       fontWeight="500"
//                     >
//                       {tag}
//                     </MotionBox>
//                   ))}
//                 </HStack>
//               </MotionBox>
//             </VStack>
//           </MotionBox>
//         </MotionBox>
//       </Box>
//     </MotionBox>
//   );
// };

// export const Projects = () => {
//   const sectionRef = useRef(null);
//   const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  
//   const bgPrimary = useColorModeValue('bg.primary', 'bg.secondary');
//   const textPrimary = useColorModeValue('text.primary', 'white');
//   const textMuted = useColorModeValue('text.muted', 'text.muted');

//   return (
//     <Box
//       ref={sectionRef}
//       as="section"
//       id="projects"
//       py={32}
//       px={4}
//       overflow="hidden"
//       bg="transparent"
//     >
//       <Container maxW="1400px">
//         {/* Header */}
//         <MotionBox
//           initial={{ opacity: 0, y: 40 }}
//           animate={isInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.7 }}
//           mb={32}
//           textAlign="center"
//         >
//           <MotionBox
//             as={Text}
//             fontSize="sm"
//             color={textMuted}
//             textTransform="uppercase"
//             letterSpacing="0.3em"
//             mb={4}
//             fontWeight="600"
//             initial={{ opacity: 0 }}
//             animate={isInView ? { opacity: 1 } : {}}
//             transition={{ delay: 0.2 }}
//           >
//             Case Studies
//           </MotionBox>
//           <Heading
//             as="h2"
//             fontSize={{ base: '6xl', md: '7xl', lg: '8xl' }}
//             fontWeight="normal"
//             color={textPrimary}
//             fontFamily="heading"
//           >
//             Curated{' '}
//             <Text as="span" bgGradient="linear(to-r, #1e40af, #7c3aed,#ec4899)" bgClip="text">
//               work
//             </Text>
//           </Heading>
//         </MotionBox>

//         {/* Projects List */}
//         <VStack spacing={48} align="stretch">
//           {projects.map((project, index) => (
//             <ProjectCard key={project.id} project={project} index={index} />
//           ))}
//         </VStack>

//         {/* See More */}
//         <MotionBox
//           initial={{ opacity: 0, y: 30 }}
//           animate={isInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.6, delay: 0.8 }}
//           mt={32}
//           textAlign="center"
//         >
//           <MotionBox
//             as={Link}
//             href="#"
//             display="inline-flex"
//             alignItems="center"
//             gap={3}
//             fontSize="lg"
//             color="brand.400"
//             _hover={{ color: 'brand.500', textDecoration: 'none' }}
//             transition="color 0.3s"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             role="group"
//             fontWeight="600"
//           >
//             <Text>See more projects</Text>
//             <Box
//               as={ArrowUpRight}
//               w={5}
//               h={5}
//               _groupHover={{ transform: 'rotate(45deg)' }}
//               transition="transform 0.3s"
//             />
//           </MotionBox>
//         </MotionBox>
//       </Container>
//     </Box>
//   );
// };

// export default Projects;
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
import { ArrowUpRight } from 'lucide-react';

const MotionBox = motion(Box);
const MotionDiv = motion.div;

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
  const { r, g, b } = hexToRgb(color);
  const rgba = (a) => `rgba(${r},${g},${b},${a})`;

  return (
    <Box
      w="100%"
      maxW="780px"
      h="520px"
      borderRadius="2xl"
      overflow="hidden"
      border="1px solid"
      borderColor={rgba(0.4)}
      bg={rgba(0.2)}
      backdropFilter="blur(14px)"
      display="flex"
      flexDirection="column"
    >
      {/* ── Title / address bar ── */}
      <HStack
        px={4}
        py={2.5}
        spacing={2}
        flexShrink={0}
        borderBottom="1px solid"
        borderColor={rgba(0.3)}
        bg={rgba(0.15)}
      >
        <HStack spacing={1.5}>
          <Box w={3} h={3} borderRadius="full" bg="#ef4444" />
          <Box w={3} h={3} borderRadius="full" bg="#eab308" />
          <Box w={3} h={3} borderRadius="full" bg="#22c55e" />
        </HStack>
        <Box flex={1} mx={3} h={5} borderRadius="md" bg={rgba(0.25)} />
      </HStack>

      {/* ── Body row: sidebar + main  OR  full-bleed image ── */}
      {image ? (
        <Box flex={1} overflow="hidden" minH={0}>
          <Image
            src={image}
            alt="screenshot"
            w="100%"
            h="100%"
            objectFit="cover"
          />
        </Box>
      ) : (
        <HStack flex={1} spacing={0} overflow="hidden" minH={0}>
          {/* Sidebar */}
          <VStack
            w="52px"
            flexShrink={0}
            spacing={2}
            py={3}
            px={2}
            bg={rgba(0.18)}
            borderRight="1px solid"
            borderColor={rgba(0.25)}
            align="stretch"
          >
            {[0, 1, 2, 3, 4].map((i) => (
              <Box
                key={i}
                h="26px"
                borderRadius="lg"
                bg={i === 0 ? rgba(0.6) : rgba(0.32)}
              />
            ))}
          </VStack>

          {/* Main content */}
          <VStack flex={1} spacing={3} p={4} align="stretch" overflow="hidden" minH={0}>
            {/* Heading + sub line */}
            <Box h="22px" borderRadius="lg" w="58%" bg={rgba(0.55)} />
            <Box h="14px" borderRadius="md" w="38%" bg={rgba(0.35)} />

            {/* 3-col card grid */}
            <Box
              flex={1}
              display="grid"
              gridTemplateColumns="repeat(3, 1fr)"
              gap={3}
              minH={0}
            >
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <Box
                  key={i}
                  borderRadius="xl"
                  bg={rgba(0.28 + i * 0.07)}
                  border="1px solid"
                  borderColor={rgba(0.22)}
                />
              ))}
            </Box>
          </VStack>
        </HStack>
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
    >
      <Box
        display="grid"
        gridTemplateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }}
        gap={{ base: 12, lg: 16 }}
        alignItems="center"
      >
        {/* ── Mock Screenshot (background – slower parallax) ── */}
        <MotionBox
          style={{ y: backgroundY }}
          order={{ base: 2, lg: isEven ? 2 : 1 }}
          display="flex"
          justifyContent="center"
        >
          <MotionBox
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            w="100%"
          >
            <MockBrowserWindow color={project.color} image={project.image} />
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
              <MotionDiv
                whileHover={{ x: 8 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                <HStack spacing={3} align="center" cursor="pointer" role="group">
                  <Heading
                    as="h3"
                    fontSize={{ base: '3xl', md: '4xl' }}
                    fontWeight="800"
                    color={textPrimary}
                    lineHeight="tight"
                    fontFamily="heading"
                  >
                    {project.title}
                  </Heading>
                  <MotionBox
                    initial={{ opacity: 0, x: -10 }}
                    whileHover={{ opacity: 1, x: 0, rotate: 45 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Box as={ArrowUpRight} w={7} h={7} color={project.color} />
                  </MotionBox>
                </HStack>
              </MotionDiv>

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
export const Projects = () => {
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
          >
            Curated{' '}
            <Text as="span" bgGradient="linear(to-r, #1e40af, #7c3aed, #ec4899)" bgClip="text">
              work
            </Text>
          </Heading>
        </MotionBox>

        {/* Cards */}
        <VStack spacing={48} align="stretch">
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
            fontSize="lg"
            color="brand.400"
            _hover={{ color: 'brand.500', textDecoration: 'none' }}
            transition="color 0.3s"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            role="group"
            fontWeight="600"
          >
            <Text>See more projects</Text>
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

// import React, { useRef } from 'react';
// import {
//   Box,
//   Container,
//   Heading,
//   Text,
//   VStack,
//   HStack,
//   Badge,
//   Link,
//   Image,
//   useColorModeValue,
// } from '@chakra-ui/react';
// import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
// import { ArrowUpRight } from 'lucide-react';

// const MotionBox = motion(Box);
// const MotionDiv = motion.div;

// // ---------------------------------------------------------------------------
// // Projects data
// // ---------------------------------------------------------------------------
// const projects = [
//   {
//     id: '01',
//     type: 'Web App',
//     title: 'Next Ventures',
//     period: 'Q1 2025',
//     description:
//       'A space for entrepreneurs to pitch ideas, explore others, and gain exposure with clean design',
//     longDescription:
//       "A platform designed for early-stage entrepreneurs to pitch, browse, and engage with startup ideas. It's built to impress both users and investors with blazing speed, compelling visuals, and a modern tech stack.",
//     highlights: [
//       'Leveraged Partial Prerendering and After for faster loading.',
//       'Simplified idea submission with a clean, intuitive design.',
//       'Enhanced browsing with seamless performance optimization.',
//     ],
//     tags: [
//       'Next.js',
//       'React',
//       'Sanity CMS',
//       'TypeScript',
//       'Better Auth',
//       'GROQ',
//       'Sentry',
//       'Markdown',
//       'Tailwind CSS',
//       'Motion.dev',
//     ],
//     color: '#6366f1',
//     image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
//   },
//   {
//     id: '02',
//     type: 'Mobile App',
//     title: 'Finote App',
//     period: 'Q4 2025',
//     description:
//       'An intuitive mobile companion for organizing your digital wallets and analyzing your financial health',
//     longDescription:
//       'A comprehensive mobile application for managing digital finances with real-time analytics and intuitive wallet organization.',
//     highlights: [
//       'Beautiful animated charts for financial visualization.',
//       'Secure wallet management with cloud sync.',
//       'Smart spending insights and budget tracking.',
//     ],
//     tags: [
//       'Expo',
//       'TypeScript',
//       'Firebase',
//       'Zod',
//       'Zustand',
//       'Cloudinary',
//       'Reanimated',
//       'Gifted Charts',
//     ],
//     color: '#10b981',
//     image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=500&fit=crop',
//   },
//   {
//     id: '03',
//     type: 'Web App',
//     title: 'Zenith Minds',
//     period: '2025',
//     description:
//       'A platform connecting students and instructors for enhanced learning experiences',
//     longDescription:
//       'An educational platform bridging the gap between knowledge seekers and providers with robust course management and payment integration.',
//     highlights: [
//       'Seamless video streaming for courses.',
//       'Integrated payment system with Razorpay.',
//       'Real-time progress tracking and analytics.',
//     ],
//     tags: [
//       'Next.js',
//       'React',
//       'Node.js',
//       'Express.js',
//       'Turborepo',
//       'TypeScript',
//       'MongoDB',
//       'Razorpay',
//       'Zustand',
//       'Zod',
//       'Tailwind CSS',
//       'Motion.dev',
//     ],
//     color: '#f59e0b',
//     image: null,
//   },
//   {
//     id: '04',
//     type: 'Web App',
//     title: 'Snippix',
//     period: '2025',
//     description:
//       'A platform for creating and sharing code snippets with a clean and intuitive design',
//     longDescription:
//       'A developer-focused tool for creating, sharing, and organizing beautiful code snippets with syntax highlighting and keyboard shortcuts.',
//     highlights: [
//       'Multiple theme support for code highlighting.',
//       'Keyboard shortcuts for power users.',
//       'Easy sharing and export options.',
//     ],
//     tags: [
//       'Next.js',
//       'React',
//       'Zustand',
//       'TypeScript',
//       'shadcn-ui',
//       'Tailwind CSS',
//       'highlight.js',
//       'react-hotkeys-hook',
//     ],
//     color: '#ec4899',
//     image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=500&fit=crop',
//   },
//   {
//     id: '05',
//     type: 'Web App',
//     title: 'StarForge',
//     period: '2025',
//     description:
//       'A sleek AI SaaS landing page with a user-friendly design that enhances engagement',
//     longDescription:
//       'A modern, high-converting landing page template for AI SaaS products featuring stunning parallax effects and optimized performance.',
//     highlights: [
//       'Scroll-triggered parallax animations.',
//       'Optimized for conversion and engagement.',
//       'Lightning fast Core Web Vitals scores.',
//     ],
//     tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Parallax', 'Vercel'],
//     color: '#06b6d4',
//     image: null,
//   },
// ];

// // ---------------------------------------------------------------------------
// // Utility – hex → rgb
// // ---------------------------------------------------------------------------
// const hexToRgb = (hex) => {
//   const r = parseInt(hex.slice(1, 3), 16);
//   const g = parseInt(hex.slice(3, 5), 16);
//   const b = parseInt(hex.slice(5, 7), 16);
//   return { r, g, b };
// };

// // ---------------------------------------------------------------------------
// // MockBrowserWindow
// //   • Fixed 700 px tall – matches the card h so it fills the background slot.
// //   • All colours are real rgba() – visible on transparent page bgs.
// //   • image prop: truthy → full-bleed photo below title bar
// //                 falsy  → sidebar + mock-grid placeholder
// // ---------------------------------------------------------------------------
// const MockBrowserWindow = ({ color, image }) => {
//   const { r, g, b } = hexToRgb(color);
//   const rgba = (a) => `rgba(${r},${g},${b},${a})`;

//   return (
//     <Box
//       position="relative"
//       h="full"
//       borderRadius="3xl"
//       overflow="hidden"
//       border="1px solid"
//       borderColor={rgba(0.35)}
//       bgGradient={`linear(135deg, ${rgba(0.22)} 0%, ${rgba(0.08)} 100%)`}
//     >
//       <Box position="absolute" inset={0} p={6}>
//         {/* Browser chrome wrapper */}
//         <Box
//           borderRadius="2xl"
//           overflow="hidden"
//           h="full"
//           display="flex"
//           flexDirection="column"
//           bgGradient={`linear(180deg, ${rgba(0.28)} 0%, ${rgba(0.12)} 100%)`}
//         >
//           {/* Title bar */}
//           <HStack
//             px={4}
//             py={3}
//             borderBottom="1px solid"
//             borderColor={rgba(0.3)}
//             spacing={2}
//             flexShrink={0}
//           >
//             <HStack spacing={1.5}>
//               <Box w={3} h={3} borderRadius="full" bg="red.500" opacity={0.8} />
//               <Box w={3} h={3} borderRadius="full" bg="yellow.500" opacity={0.8} />
//               <Box w={3} h={3} borderRadius="full" bg="green.500" opacity={0.8} />
//             </HStack>
//             <Box flex={1} mx={4} h={6} borderRadius="md" bg={rgba(0.25)} />
//           </HStack>

//           {/* Content area */}
//           {image ? (
//             /* full-bleed screenshot when image exists */
//             <Box flex={1} overflow="hidden" minH={0}>
//               <Image src={image} alt="screenshot" w="100%" h="100%" objectFit="cover" />
//             </Box>
//           ) : (
//             /* sidebar + mock grid when no image */
//             <VStack flex={1} p={4} spacing={4} align="stretch" overflow="hidden" minH={0}>
//               <HStack spacing={4} flex={1} align="stretch" minH={0}>
//                 {/* Sidebar */}
//                 <VStack w={16} spacing={3} flexShrink={0}>
//                   {[0, 1, 2, 3, 4].map((i) => (
//                     <Box
//                       key={i}
//                       h={8}
//                       borderRadius="lg"
//                       bg={i === 0 ? rgba(0.6) : rgba(0.32)}
//                       w="full"
//                     />
//                   ))}
//                 </VStack>

//                 {/* Main content */}
//                 <VStack flex={1} spacing={3} align="stretch" minH={0}>
//                   <Box h={8} borderRadius="lg" w="66%" bg={rgba(0.55)} />
//                   <Box h={4} borderRadius="md" w="50%" bg={rgba(0.35)} />
//                   <Box
//                     display="grid"
//                     gridTemplateColumns="repeat(3, 1fr)"
//                     gap={3}
//                     mt={4}
//                     flex={1}
//                     minH={0}
//                   >
//                     {[0, 1, 2, 3, 4, 5].map((i) => (
//                       <Box
//                         key={i}
//                         borderRadius="xl"
//                         bg={rgba(0.28 + i * 0.07)}
//                         border="1px solid"
//                         borderColor={rgba(0.22)}
//                       />
//                     ))}
//                   </Box>
//                 </VStack>
//               </HStack>
//             </VStack>
//           )}
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// // ---------------------------------------------------------------------------
// // ProjectCard  –  layout from the doc-6 styling:
// //   • Outer box is h="700px" so every card is the same height.
// //   • Background layer is position absolute, fills the right (or left) column.
// //   • Foreground info card is position relative z-10, flex-centered vertically.
// // ---------------------------------------------------------------------------
// const ProjectCard = ({ project, index }) => {
//   const cardRef = useRef(null);
//   const isInView = useInView(cardRef, { once: true, margin: '-100px' });

//   const textPrimary   = useColorModeValue('text.primary', 'white');
//   const textSecondary = useColorModeValue('text.secondary', 'text.secondary');

//   const { scrollYProgress } = useScroll({
//     target: cardRef,
//     offset: ['start end', 'end start'],
//   });

//   const smoothProgress = useSpring(scrollYProgress, {
//     stiffness: 100,
//     damping: 30,
//     restDelta: 0.001,
//   });

//   const foregroundY = useTransform(smoothProgress, [0, 1], [200, -200]);
//   const backgroundY = useTransform(smoothProgress, [0, 1], [50, -50]);
//   const opacity     = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.4, 1, 1, 0.4]);
//   const scale       = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.9, 1, 1, 0.9]);

//   const isEven = index % 2 === 0;

//   return (
//     <MotionBox
//       ref={cardRef}
//       style={{ opacity, scale }}
//       position="relative"
//       minH="700px"
//       h="700px"
//     >
//       <Box
//         position="relative"
//         display="grid"
//         gridTemplateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }}
//         gap={{ base: 8, lg: 16 }}
//         alignItems="center"
//         h="full"
//       >
//         {/* ── Background Layer – MockBrowserWindow (moves slower) ── */}
//         <MotionBox
//           style={{ y: backgroundY }}
//           position={{ base: 'relative', lg: 'absolute' }}
//           inset={{ base: 'auto', lg: 0 }}
//           gridColumn={{ base: '1', lg: isEven ? '2' : '1' }}
//           order={{ base: 2, lg: isEven ? 2 : 1 }}
//           h="full"
//         >
//           <MotionBox
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={isInView ? { opacity: 1, scale: 1 } : {}}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             position="relative"
//             h="full"
//           >
//             <MockBrowserWindow color={project.color} image={project.image} />
//           </MotionBox>
//         </MotionBox>

//         {/* ── Foreground Layer – Project Info (moves faster) ── */}
//         <MotionBox
//           style={{ y: foregroundY }}
//           position="relative"
//           zIndex={10}
//           gridColumn={{ base: '1', lg: isEven ? '1' : '2' }}
//           order={{ base: 1, lg: isEven ? 1 : 2 }}
//           h="full"
//           display="flex"
//           alignItems="center"
//         >
//           <MotionBox
//             initial={{ opacity: 0, x: isEven ? -80 : 80 }}
//             animate={isInView ? { opacity: 1, x: 0 } : {}}
//             transition={{ duration: 0.7, delay: 0.1 }}
//             p={8}
//             borderRadius="2xl"
//             backdropFilter="blur(40px)"
//             bg="surface.card"
//             border="1px solid"
//             borderColor={`${project.color}30`}
//             boxShadow={`0 8px 32px ${project.color}15`}
//             w="full"
//           >
//             <VStack align="flex-start" spacing={5}>
//               {/* Number and Type */}
//               <HStack spacing={4} align="center">
//                 <Text
//                   fontSize={{ base: '6xl', md: '7xl' }}
//                   fontWeight="900"
//                   lineHeight="none"
//                   color={project.color}
//                   textShadow={`0 0 40px ${project.color}30`}
//                 >
//                   {project.id}
//                 </Text>
//                 <Badge
//                   variant="outline"
//                   fontSize="xs"
//                   textTransform="uppercase"
//                   letterSpacing="widest"
//                   px={3}
//                   py={1}
//                   borderColor={project.color}
//                   color={project.color}
//                   bg={`${project.color}10`}
//                 >
//                   {project.type}
//                 </Badge>
//               </HStack>

//               {/* Title */}
//               <MotionDiv
//                 whileHover={{ x: 8 }}
//                 transition={{ type: 'spring', stiffness: 400, damping: 25 }}
//               >
//                 <HStack spacing={3} align="center" cursor="pointer" role="group">
//                   <Heading
//                     as="h3"
//                     fontSize={{ base: '3xl', md: '4xl' }}
//                     fontWeight="800"
//                     color={textPrimary}
//                     lineHeight="tight"
//                     fontFamily="heading"
//                   >
//                     {project.title}
//                   </Heading>
//                   <MotionBox
//                     initial={{ opacity: 0, x: -10 }}
//                     whileHover={{ opacity: 1, x: 0, rotate: 45 }}
//                     transition={{ duration: 0.2 }}
//                   >
//                     <Box as={ArrowUpRight} w={7} h={7} color={project.color} />
//                   </MotionBox>
//                 </HStack>
//               </MotionDiv>

//               {/* Period */}
//               <Text
//                 fontSize="xs"
//                 color={textSecondary}
//                 textTransform="uppercase"
//                 letterSpacing="0.15em"
//                 fontWeight="600"
//               >
//                 {project.period}
//               </Text>

//               {/* Description */}
//               <Text fontSize="md" color={textSecondary} lineHeight="1.7" fontFamily="body">
//                 {project.description}
//               </Text>

//               {/* Tags */}
//               <MotionBox
//                 pt={3}
//                 initial="hidden"
//                 animate={isInView ? 'visible' : 'hidden'}
//                 variants={{
//                   visible: {
//                     transition: {
//                       staggerChildren: 0.03,
//                       delayChildren: 0.4,
//                     },
//                   },
//                 }}
//               >
//                 <HStack spacing={2} flexWrap="wrap">
//                   {project.tags.slice(0, 6).map((tag) => (
//                     <MotionBox
//                       key={tag}
//                       as="span"
//                       variants={{
//                         hidden: { opacity: 0, scale: 0.8, y: 10 },
//                         visible: { opacity: 1, scale: 1, y: 0 },
//                       }}
//                       whileHover={{
//                         scale: 1.05,
//                         background: `${project.color}25`,
//                       }}
//                       px={3}
//                       py={1.5}
//                       fontSize="xs"
//                       borderRadius="full"
//                       border="1px solid"
//                       borderColor={`${project.color}30`}
//                       bg={`${project.color}12`}
//                       color={project.color}
//                       cursor="default"
//                       transition="all 0.2s"
//                       fontWeight="500"
//                     >
//                       {tag}
//                     </MotionBox>
//                   ))}
//                 </HStack>
//               </MotionBox>
//             </VStack>
//           </MotionBox>
//         </MotionBox>
//       </Box>
//     </MotionBox>
//   );
// };

// // ---------------------------------------------------------------------------
// // Projects – page section
// // ---------------------------------------------------------------------------
// export const Projects = () => {
//   const sectionRef = useRef(null);
//   const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

//   const textPrimary = useColorModeValue('text.primary', 'white');
//   const textMuted   = useColorModeValue('text.muted', 'text.muted');

//   return (
//     <Box
//       ref={sectionRef}
//       as="section"
//       id="projects"
//       py={32}
//       px={4}
//       overflow="hidden"
//       bg="transparent"
//     >
//       <Container maxW="1400px">
//         {/* Header */}
//         <MotionBox
//           initial={{ opacity: 0, y: 40 }}
//           animate={isInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.7 }}
//           mb={32}
//           textAlign="center"
//         >
//           <MotionBox
//             as={Text}
//             fontSize="sm"
//             color={textMuted}
//             textTransform="uppercase"
//             letterSpacing="0.3em"
//             mb={4}
//             fontWeight="600"
//             initial={{ opacity: 0 }}
//             animate={isInView ? { opacity: 1 } : {}}
//             transition={{ delay: 0.2 }}
//           >
//             Case Studies
//           </MotionBox>
//           <Heading
//             as="h2"
//             fontSize={{ base: '6xl', md: '7xl', lg: '8xl' }}
//             fontWeight="normal"
//             color={textPrimary}
//             fontFamily="heading"
//           >
//             Curated{' '}
//             <Text as="span" bgGradient="linear(to-r, #1e40af, #7c3aed, #ec4899)" bgClip="text">
//               work
//             </Text>
//           </Heading>
//         </MotionBox>

//         {/* Projects List */}
//         <VStack spacing={48} align="stretch">
//           {projects.map((project, index) => (
//             <ProjectCard key={project.id} project={project} index={index} />
//           ))}
//         </VStack>

//         {/* See More */}
//         <MotionBox
//           initial={{ opacity: 0, y: 30 }}
//           animate={isInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.6, delay: 0.8 }}
//           mt={32}
//           textAlign="center"
//         >
//           <MotionBox
//             as={Link}
//             href="#"
//             display="inline-flex"
//             alignItems="center"
//             gap={3}
//             fontSize="lg"
//             color="brand.400"
//             _hover={{ color: 'brand.500', textDecoration: 'none' }}
//             transition="color 0.3s"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             role="group"
//             fontWeight="600"
//           >
//             <Text>See more projects</Text>
//             <Box
//               as={ArrowUpRight}
//               w={5}
//               h={5}
//               _groupHover={{ transform: 'rotate(45deg)' }}
//               transition="transform 0.3s"
//             />
//           </MotionBox>
//         </MotionBox>
//       </Container>
//     </Box>
//   );
// };

// export default Projects;