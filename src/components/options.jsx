// import React, { useRef } from 'react';
// import {
//   Box,
//   Container,
//   Heading,
//   Text,
//   VStack,
//   HStack,
//   Tag,
//   Link,
//   SimpleGrid,
//   Badge,
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

//   const { scrollYProgress } = useScroll({
//     target: cardRef,
//     offset: ['start end', 'end start'],
//   });

//   const smoothProgress = useSpring(scrollYProgress, {
//     stiffness: 100,
//     damping: 30,
//     restDelta: 0.001,
//   });

//   const y = useTransform(smoothProgress, [0, 1], [100, -100]);
//   const imageY = useTransform(smoothProgress, [0, 1], [50, -50]);
//   const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);
//   const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

//   const isEven = index % 2 === 0;

//   return (
//     <MotionBox ref={cardRef} style={{ opacity, scale }} position="relative">
//       <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 8, lg: 12 }} alignItems="start">
//         {/* Project Info */}
//         <MotionBox
//           initial={{ opacity: 0, x: isEven ? -50 : 50 }}
//           animate={isInView ? { opacity: 1, x: 0 } : {}}
//           transition={{ duration: 0.6, delay: 0.2 }}
//           order={{ base: 1, lg: isEven ? 1 : 2 }}
//         >
//           <VStack align="flex-start" spacing={6}>
//             {/* Number and Type */}
//             <HStack spacing={4} align="center">
//               <Text
//                 fontSize={{ base: '6xl', md: '7xl' }}
//                 fontWeight="bold"
//                 color={`${project.color}20`}
//                 lineHeight="1"
//               >
//                 {project.id}
//               </Text>
//               <Badge
//                 variant="outline"
//                 fontSize="xs"
//                 textTransform="uppercase"
//                 letterSpacing="wider"
//                 borderColor={project.color}
//                 color={project.color}
//                 px={3}
//                 py={1}
//               >
//                 {project.type}
//               </Badge>
//             </HStack>

//             {/* Title */}
//             <MotionDiv whileHover={{ x: 10 }} transition={{ type: 'spring', stiffness: 300 }}>
//               <HStack spacing={3} align="center" cursor="pointer" role="group">
//                 <Heading
//                   as="h3"
//                   fontSize={{ base: '3xl', md: '4xl' }}
//                   fontWeight="bold"
//                   color="white"
//                 >
//                   {project.title}
//                 </Heading>
//                 <Box
//                   as={ArrowUpRight}
//                   width="24px"
//                   height="24px"
//                   opacity={0}
//                   _groupHover={{ opacity: 1 }}
//                   transition="opacity 0.2s"
//                   color={project.color}
//                 />
//               </HStack>
//             </MotionDiv>

//             {/* Period */}
//             <Text
//               fontSize="sm"
//               color="text.secondary"
//               textTransform="uppercase"
//               letterSpacing="wider"
//             >
//               {project.period}
//             </Text>
//           </VStack>
//         </MotionBox>

//         {/* Project Visual Card */}
//         <MotionBox
//           style={{ y: imageY }}
//           initial={{ opacity: 0, x: isEven ? 50 : -50 }}
//           animate={isInView ? { opacity: 1, x: 0 } : {}}
//           transition={{ duration: 0.6, delay: 0.3 }}
//           order={{ base: 2, lg: isEven ? 2 : 1 }}
//           position="relative"
//         >
//           <Box
//             position="relative"
//             borderRadius="2xl"
//             overflow="hidden"
//             cursor="pointer"
//             role="group"
//             bgGradient={`linear(135deg, ${project.color}15 0%, ${project.color}05 100%)`}
//           >
//             {/* Inner glow */}
//             <Box
//               position="absolute"
//               inset={0}
//               opacity={0}
//               _groupHover={{ opacity: 1 }}
//               transition="opacity 0.5s"
//               bgGradient={`radial(circle at center, ${project.color}20 0%, transparent 70%)`}
//             />

//             {/* Content */}
//             <Box position="relative" p={{ base: 6, md: 8 }}>
//               {/* Description Card */}
//               <MotionBox
//                 borderRadius="xl"
//                 p={6}
//                 mb={4}
//                 bgGradient={`linear(135deg, ${project.color}10 0%, transparent 100%)`}
//                 border="1px solid"
//                 borderColor={`${project.color}20`}
//                 whileHover={{ scale: 1.02 }}
//                 transition={{ type: 'spring', stiffness: 300 }}
//               >
//                 <Heading as="h4" fontSize="lg" fontWeight="semibold" color="white" mb={3}>
//                   {project.description}
//                 </Heading>
//               </MotionBox>

//               {/* Mock Screenshot Area */}
//               <MotionBox
//                 style={{ y }}
//                 position="relative"
//                 paddingBottom="56.25%" // 16:9 aspect ratio
//                 borderRadius="xl"
//                 overflow="hidden"
//               >
//                 <Box
//                   position="absolute"
//                   inset={0}
//                   bgGradient={`linear(180deg, ${project.color}30 0%, ${project.color}10 100%)`}
//                 />
//                 {/* Mock UI Elements */}
//                 <VStack
//                   position="absolute"
//                   inset={4}
//                   spacing={3}
//                   align="stretch"
//                 >
//                   <HStack spacing={2}>
//                     <Box w={3} h={3} borderRadius="full" bg={project.color} />
//                     <Box w={3} h={3} borderRadius="full" bg={project.color} opacity={0.6} />
//                     <Box w={3} h={3} borderRadius="full" bg={project.color} opacity={0.3} />
//                   </HStack>
//                   <HStack flex={1} spacing={3} align="stretch">
//                     <Box w="25%" borderRadius="lg" bg={project.color} opacity={0.2} />
//                     <VStack flex={1} spacing={2} align="stretch">
//                       <Box h={4} borderRadius="md" bg={project.color} opacity={0.3} w="75%" />
//                       <Box h={4} borderRadius="md" bg={project.color} opacity={0.2} w="50%" />
//                       <Box flex={1} borderRadius="lg" bg={project.color} opacity={0.1} />
//                     </VStack>
//                   </HStack>
//                 </VStack>
//               </MotionBox>
//             </Box>
//           </Box>
//         </MotionBox>
//       </SimpleGrid>

//       {/* Tags Section - Full Width Below */}
//       <MotionBox
//         initial={{ opacity: 0, y: 20 }}
//         animate={isInView ? { opacity: 1, y: 0 } : {}}
//         transition={{ duration: 0.6, delay: 0.5 }}
//         mt={8}
//       >
//         <HStack spacing={2} flexWrap="wrap">
//           {project.tags.map((tag, tagIndex) => (
//             <MotionBox
//               key={tag}
//               as="span"
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={isInView ? { opacity: 1, scale: 1 } : {}}
//               transition={{ duration: 0.3, delay: 0.5 + tagIndex * 0.05 }}
//             >
//               <Tag
//                 size="md"
//                 px={3}
//                 py={1.5}
//                 fontSize="xs"
//                 borderRadius="full"
//                 border="1px solid"
//                 borderColor={`${project.color}30`}
//                 bg={`${project.color}10`}
//                 color="gray.300"
//                 _hover={{ borderColor: project.color }}
//                 transition="border-color 0.3s"
//               >
//                 {tag}
//               </Tag>
//             </MotionBox>
//           ))}
//         </HStack>
//       </MotionBox>
//     </MotionBox>
//   );
// };

// const ProjectDetails = ({ project }) => {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, margin: '-50px' });

//   return (
//     <MotionBox
//       ref={ref}
//       initial={{ opacity: 0, y: 50 }}
//       animate={isInView ? { opacity: 1, y: 0 } : {}}
//       transition={{ duration: 0.6 }}
//       mt={16}
//       p={8}
//       borderRadius="2xl"
//       border="1px solid"
//       borderColor="whiteAlpha.100"
//       bgGradient={`linear(135deg, ${project.color}05 0%, transparent 100%)`}
//     >
//       <Heading as="h4" fontSize="xl" fontWeight="bold" color="white" mb={4}>
//         {project.title}
//       </Heading>
//       <Text color="text.secondary" mb={6}>
//         {project.longDescription}
//       </Text>
//       <VStack align="stretch" spacing={2}>
//         {project.highlights.map((highlight, i) => (
//           <MotionBox
//             key={i}
//             initial={{ opacity: 0, x: -20 }}
//             animate={isInView ? { opacity: 1, x: 0 } : {}}
//             transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
//           >
//             <HStack align="flex-start" spacing={3}>
//               <Text color={project.color}>•</Text>
//               <Text color="text.secondary">{highlight}</Text>
//             </HStack>
//           </MotionBox>
//         ))}
//       </VStack>

//       <HStack spacing={2} flexWrap="wrap" mt={6}>
//         {project.tags.map((tag) => (
//           <Tag
//             key={tag}
//             size="sm"
//             px={3}
//             py={1}
//             fontSize="xs"
//             borderRadius="full"
//             bg={`${project.color}15`}
//             color={project.color}
//           >
//             {tag}
//           </Tag>
//         ))}
//       </HStack>
//     </MotionBox>
//   );
// };

// export const Projects = () => {
//   const sectionRef = useRef(null);
//   const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

//   return (
//     <Box
//       ref={sectionRef}
//       as="section"
//       id="projects"
//       py={24}
//       px={4}
//       overflow="hidden"
//       // bg="#0a0a0f"
//       bg="transparent"
//     >
//       <Container maxW="1200px">
//         {/* Header */}
//         <MotionBox
//           initial={{ opacity: 0, y: 30 }}
//           animate={isInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.6 }}
//           mb={20}
//         >
//           <Text
//             fontSize="sm"
//             color="gray.500"
//             textTransform="uppercase"
//             letterSpacing="widest"
//             mb={3}
//           >
//             CASE STUDIES
//           </Text>
//           <Heading
//             as="h2"
//             fontSize={{ base: '5xl', md: '6xl' }}
//             fontWeight="bold"
//             color="white"
//           >
//             Curated{' '}
//             <Text
//               as="span"
//               bgGradient="linear(to-r, #6366f1, #ec4899)"
//               bgClip="text"
//             >
//               work
//             </Text>
//           </Heading>
//         </MotionBox>

//         {/* Projects List */}
//         <VStack spacing={32} align="stretch">
//           {projects.map((project, index) => (
//             <ProjectCard key={project.id} project={project} index={index} />
//           ))}
//         </VStack>

//         {/* Featured Project Details */}
//         <ProjectDetails project={projects[0]} />

//         {/* See More */}
//         <MotionBox
//           initial={{ opacity: 0 }}
//           animate={isInView ? { opacity: 1 } : {}}
//           transition={{ duration: 0.6, delay: 0.8 }}
//           mt={16}
//           textAlign="center"
//         >
//           <MotionBox
//             as={Link}
//             href="#"
//             display="inline-flex"
//             alignItems="center"
//             gap={2}
//             color="#6366f1"
//             _hover={{ textDecoration: 'none', gap: 3 }}
//             transition="gap 0.3s"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             role="group"
//           >
//             <Text>See more projects</Text>
//             <Box
//               as={ArrowUpRight}
//               width="16px"
//               height="16px"
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
//       minH="600px"
//     >
//       <Box
//         position="relative"
//         display="grid"
//         gridTemplateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }}
//         gap={{ base: 8, lg: 16 }}
//         alignItems="center"
//       >
//         {/* Background Layer - Project Visual (moves slower) */}
//         <MotionBox
//           style={{ y: backgroundY }}
//           position={{ base: 'relative', lg: 'absolute' }}
//           inset={{ base: 'auto', lg: 0 }}
//           gridColumn={{ base: '1', lg: isEven ? '2' : '1' }}
//           order={{ base: 2, lg: isEven ? 2 : 1 }}
//         >
//           <MotionBox
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={isInView ? { opacity: 1, scale: 1 } : {}}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             position="relative"
//             h="full"
//             minH={{ base: '400px', lg: '500px' }}
//           >
//             {/* Glow effect */}
//             <Box
//               position="absolute"
//               inset={0}
//               borderRadius="3xl"
//               filter="blur(60px)"
//               opacity={0.2}
//               bg={project.color}
//             />

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
//                     <HStack spacing={4} h="256px" align="stretch">
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
//                         >
//                           {[...Array(6)].map((_, i) => (
//                             <Box
//                               key={i}
//                               h={20}
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
//         >
//           <MotionBox
//             initial={{ opacity: 0, x: isEven ? -80 : 80 }}
//             animate={isInView ? { opacity: 1, x: 0 } : {}}
//             transition={{ duration: 0.7, delay: 0.1 }}
//             p={8}
//             borderRadius="2xl"
//             backdropFilter="blur(40px)"
//             bg="rgba(5, 5, 5, 0.8)"
//             border="1px solid"
//             borderColor={`${project.color}20`}
//           >
//             <VStack align="flex-start" spacing={6}>
//               {/* Number and Type */}
//               <HStack spacing={4} align="center">
//                 <Text
//                   fontSize={{ base: '7xl', md: '8xl' }}
//                   fontWeight="900"
//                   lineHeight="none"
//                   color={project.color}
//                   textShadow={`0 0 60px ${project.color}40`}
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
//                 >
//                   {project.type}
//                 </Badge>
//               </HStack>

//               {/* Title */}
//               <MotionDiv
//                 whileHover={{ x: 12 }}
//                 transition={{ type: 'spring', stiffness: 400, damping: 25 }}
//               >
//                 <HStack spacing={4} align="center" cursor="pointer" role="group">
//                   <Heading
//                     as="h3"
//                     fontSize={{ base: '4xl', md: '5xl' }}
//                     fontWeight="bold"
//                     color="white"
//                     lineHeight="tight"
//                   >
//                     {project.title}
//                   </Heading>
//                   <MotionBox
//                     initial={{ opacity: 0, x: -10 }}
//                     whileHover={{ opacity: 1, x: 0, rotate: 45 }}
//                     transition={{ duration: 0.2 }}
//                   >
//                     <Box as={ArrowUpRight} w={8} h={8} color={project.color} />
//                   </MotionBox>
//                 </HStack>
//               </MotionDiv>

//               {/* Period */}
//               <Text
//                 fontSize="sm"
//                 color="text.secondary"
//                 textTransform="uppercase"
//                 letterSpacing="0.2em"
//               >
//                 {project.period}
//               </Text>

//               {/* Description */}
//               <Text fontSize="lg" color="text.secondary" lineHeight="relaxed">
//                 {project.description}
//               </Text>

//               {/* Tags */}
//               <MotionBox
//                 pt={4}
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
//                   {project.tags.map((tag) => (
//                     <MotionBox
//                       key={tag}
//                       as="span"
//                       variants={{
//                         hidden: { opacity: 0, scale: 0.8, y: 10 },
//                         visible: { opacity: 1, scale: 1, y: 0 },
//                       }}
//                       whileHover={{
//                         scale: 1.1,
//                         background: `${project.color}30`,
//                       }}
//                       px={3}
//                       py={1.5}
//                       fontSize="xs"
//                       borderRadius="full"
//                       border="1px solid"
//                       borderColor={`${project.color}30`}
//                       bg={`${project.color}10`}
//                       color={project.color}
//                       cursor="default"
//                       transition="all 0.2s"
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

//   return (
//     <Box
//       ref={sectionRef}
//       as="section"
//       id="projects"
//       py={32}
//       px={4}
//       overflow="hidden"
//       bg="#0a0a0f"
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
//             color="gray.500"
//             textTransform="uppercase"
//             letterSpacing="0.3em"
//             mb={4}
//             initial={{ opacity: 0 }}
//             animate={isInView ? { opacity: 1 } : {}}
//             transition={{ delay: 0.2 }}
//           >
//             Case Studies
//           </MotionBox>
//           <Heading
//             as="h2"
//             fontSize={{ base: '6xl', md: '7xl', lg: '8xl' }}
//             fontWeight="bold"
//             color="white"
//           >
//             Curated{' '}
//             <Text as="span" bgGradient="linear(to-r, #6366f1, #ec4899)" bgClip="text">
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
//             color="text.secondary"
//             _hover={{ color: 'white', textDecoration: 'none' }}
//             transition="color 0.3s"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             role="group"
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
//       minH="600px"
//     >
//       <Box
//         position="relative"
//         display="grid"
//         gridTemplateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }}
//         gap={{ base: 8, lg: 16 }}
//         alignItems="center"
//       >
//         {/* Background Layer - Project Visual (moves slower) */}
//         <MotionBox
//           style={{ y: backgroundY }}
//           position={{ base: 'relative', lg: 'absolute' }}
//           inset={{ base: 'auto', lg: 0 }}
//           gridColumn={{ base: '1', lg: isEven ? '2' : '1' }}
//           order={{ base: 2, lg: isEven ? 2 : 1 }}
//         >
//           <MotionBox
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={isInView ? { opacity: 1, scale: 1 } : {}}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             position="relative"
//             h="full"
//             minH={{ base: '400px', lg: '500px' }}
//           >
//             {/* Glow effect */}
//             <Box
//               position="absolute"
//               inset={0}
//               borderRadius="3xl"
//               filter="blur(60px)"
//               opacity={0.2}
//               bg={project.color}
//             />

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
//                     <HStack spacing={4} h="256px" align="stretch">
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
//                         >
//                           {[...Array(6)].map((_, i) => (
//                             <Box
//                               key={i}
//                               h={20}
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
//             borderColor={`${project.color}20`}
//           >
//             <VStack align="flex-start" spacing={6}>
//               {/* Number and Type */}
//               <HStack spacing={4} align="center">
//                 <Text
//                   fontSize={{ base: '7xl', md: '8xl' }}
//                   fontWeight="900"
//                   lineHeight="none"
//                   color={project.color}
//                   textShadow={`0 0 60px ${project.color}40`}
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
//                 >
//                   {project.type}
//                 </Badge>
//               </HStack>

//               {/* Title */}
//               <MotionDiv
//                 whileHover={{ x: 12 }}
//                 transition={{ type: 'spring', stiffness: 400, damping: 25 }}
//               >
//                 <HStack spacing={4} align="center" cursor="pointer" role="group">
//                   <Heading
//                     as="h3"
//                     fontSize={{ base: '4xl', md: '5xl' }}
//                     fontWeight="bold"
//                     color="text.primary"
//                     lineHeight="tight"
//                   >
//                     {project.title}
//                   </Heading>
//                   <MotionBox
//                     initial={{ opacity: 0, x: -10 }}
//                     whileHover={{ opacity: 1, x: 0, rotate: 45 }}
//                     transition={{ duration: 0.2 }}
//                   >
//                     <Box as={ArrowUpRight} w={8} h={8} color={project.color} />
//                   </MotionBox>
//                 </HStack>
//               </MotionDiv>

//               {/* Period */}
//               <Text
//                 fontSize="sm"
//                 color="text.secondary"
//                 textTransform="uppercase"
//                 letterSpacing="0.2em"
//               >
//                 {project.period}
//               </Text>

//               {/* Description */}
//               <Text fontSize="lg" color="text.secondary" lineHeight="relaxed">
//                 {project.description}
//               </Text>

//               {/* Tags */}
//               <MotionBox
//                 pt={4}
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
//                   {project.tags.map((tag) => (
//                     <MotionBox
//                       key={tag}
//                       as="span"
//                       variants={{
//                         hidden: { opacity: 0, scale: 0.8, y: 10 },
//                         visible: { opacity: 1, scale: 1, y: 0 },
//                       }}
//                       whileHover={{
//                         scale: 1.1,
//                         background: `${project.color}30`,
//                       }}
//                       px={3}
//                       py={1.5}
//                       fontSize="xs"
//                       borderRadius="full"
//                       border="1px solid"
//                       borderColor={`${project.color}30`}
//                       bg={`${project.color}10`}
//                       color={project.color}
//                       cursor="default"
//                       transition="all 0.2s"
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
//             color="gray.500"
//             textTransform="uppercase"
//             letterSpacing="0.3em"
//             mb={4}
//             initial={{ opacity: 0 }}
//             animate={isInView ? { opacity: 1 } : {}}
//             transition={{ delay: 0.2 }}
//           >
//             Case Studies
//           </MotionBox>
//           <Heading
//             as="h2"
//             fontSize={{ base: '6xl', md: '7xl', lg: '8xl' }}
//             fontWeight="bold"
//             color="white"
//           >
//             Curated{' '}
//             <Text as="span" bgGradient="linear(to-r, #6366f1, #ec4899)" bgClip="text">
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
//             color="text.secondary"
//             _hover={{ color: 'white', textDecoration: 'none' }}
//             transition="color 0.3s"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             role="group"
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

// const projects = [
//   {
//     id: '01',
//     type: 'Web App',
//     title: 'Next Ventures',
//     period: 'Q1 2025',
//     description:
//       'A space for entrepreneurs to pitch ideas, explore others, and gain exposure with clean design',
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
//     image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=500&fit=crop',
//   },
//   {
//     id: '04',
//     type: 'Web App',
//     title: 'Snippix',
//     period: '2025',
//     description:
//       'A platform for creating and sharing code snippets with a clean and intuitive design',
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
//     tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Parallax', 'Vercel'],
//     color: '#06b6d4',
//     image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
//   },
// ];

// const ProjectCard = ({ project, index }) => {
//   const cardRef = useRef(null);
//   const isInView = useInView(cardRef, { once: true, margin: '-100px' });

//   // Theme colors
//   const textPrimary = useColorModeValue('text.primary', 'white');
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

//   // Foreground (info) moves faster - 2x scroll speed
//   const y = useTransform(smoothProgress, [0, 1], [100, -100]);

//   // Background (images) moves slower - 0.5x scroll speed
//   const imageY = useTransform(smoothProgress, [0, 1], [50, -50]);

//   const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);
//   const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

//   const isEven = index % 2 === 0;

//   return (
//     <MotionBox ref={cardRef} style={{ opacity, scale }} position="relative">
//       <Box
//         display="grid"
//         gridTemplateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }}
//         gap={{ base: 8, lg: 12 }}
//         alignItems="start"
//       >
//         {/* Project Info - Foreground */}
//         <MotionBox
//           style={{ y }}
//           initial={{ opacity: 0, x: isEven ? -50 : 50 }}
//           animate={isInView ? { opacity: 1, x: 0 } : {}}
//           transition={{ duration: 0.6, delay: 0.2 }}
//           order={{ base: 1, lg: isEven ? 1 : 2 }}
//         >
//           <VStack align="flex-start" spacing={6}>
//             {/* Number and Type */}
//             <HStack spacing={4} align="center">
//               <Text
//                 fontSize={{ base: '6xl', md: '7xl' }}
//                 fontWeight="bold"
//                 lineHeight="1"
//                 color={`${project.color}20`}
//               >
//                 {project.id}
//               </Text>
//               <Badge
//                 variant="outline"
//                 fontSize="xs"
//                 textTransform="uppercase"
//                 letterSpacing="wider"
//                 px={3}
//                 py={1}
//                 borderColor={project.color}
//                 color={project.color}
//                 bg={`${project.color}10`}
//               >
//                 {project.type}
//               </Badge>
//             </HStack>

//             {/* Title */}
//             <MotionDiv
//               whileHover={{ x: 10 }}
//               transition={{ type: 'spring', stiffness: 300 }}
//             >
//               <HStack spacing={3} align="center" cursor="pointer" role="group">
//                 <Heading
//                   as="h3"
//                   fontSize={{ base: '3xl', md: '4xl' }}
//                   fontWeight="bold"
//                   color={textPrimary}
//                   fontFamily="heading"
//                   lineHeight="1.2"
//                 >
//                   {project.title}
//                 </Heading>
//                 <Box
//                   as={ArrowUpRight}
//                   w={6}
//                   h={6}
//                   opacity={0}
//                   _groupHover={{ opacity: 1 }}
//                   transition="opacity 0.2s"
//                   color={project.color}
//                 />
//               </HStack>
//             </MotionDiv>

//             {/* Period */}
//             <Text
//               fontSize="sm"
//               color={textSecondary}
//               textTransform="uppercase"
//               letterSpacing="wider"
//               fontWeight="600"
//             >
//               {project.period}
//             </Text>
//           </VStack>
//         </MotionBox>

//         {/* Project Visual Card - Background (Browser Mockup) */}
//         <MotionBox
//           style={{ y: imageY }}
//           initial={{ opacity: 0, x: isEven ? 50 : -50 }}
//           animate={isInView ? { opacity: 1, x: 0 } : {}}
//           transition={{ duration: 0.6, delay: 0.3 }}
//           order={{ base: 2, lg: isEven ? 2 : 1 }}
//         >
//           {/* Browser Screenshot Mockup */}
//           <Box
//             borderRadius="xl"
//             overflow="hidden"
//             cursor="pointer"
//             role="group"
//             bg={project.color}
//           >
//             {/* Browser Chrome */}
//             <HStack spacing={2} px={4} py={3} bg="blackAlpha.200">
//               <HStack spacing={1.5}>
//                 <Box w={3} h={3} borderRadius="full" bg="whiteAlpha.300" />
//                 <Box w={3} h={3} borderRadius="full" bg="whiteAlpha.300" />
//                 <Box w={3} h={3} borderRadius="full" bg="whiteAlpha.300" />
//               </HStack>
//               <Box flex={1} mx={4}>
//                 <Box h={5} borderRadius="md" bg="whiteAlpha.100" maxW="xs" />
//               </Box>
//             </HStack>

//             {/* Screenshot Content */}
//             <Box p={{ base: 4, md: 6 }}>
//               <Box
//                 position="relative"
//                 paddingBottom="56.25%" // 16:9 aspect ratio
//                 borderRadius="lg"
//                 overflow="hidden"
//                 boxShadow="2xl"
//               >
//                 <Image
//                   src={project.image}
//                   alt={`${project.title} screenshot`}
//                   position="absolute"
//                   top={0}
//                   left={0}
//                   width="100%"
//                   height="100%"
//                   objectFit="cover"
//                   transition="transform 0.5s"
//                   _groupHover={{ transform: 'scale(1.05)' }}
//                 />
//               </Box>
//             </Box>

//             {/* Description below screenshot */}
//             <Box px={{ base: 4, md: 6 }} pb={{ base: 4, md: 6 }}>
//               <Text fontSize="sm" color="whiteAlpha.800">
//                 {project.description}
//               </Text>
//             </Box>
//           </Box>
//         </MotionBox>
//       </Box>

//       {/* Tags Section - Full Width Below */}
//       <MotionBox
//         initial={{ opacity: 0, y: 20 }}
//         animate={isInView ? { opacity: 1, y: 0 } : {}}
//         transition={{ duration: 0.6, delay: 0.5 }}
//         mt={8}
//       >
//         <HStack spacing={2} flexWrap="wrap">
//           {project.tags.map((tag, tagIndex) => (
//             <MotionBox
//               key={tag}
//               as="span"
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={isInView ? { opacity: 1, scale: 1 } : {}}
//               transition={{ duration: 0.3, delay: 0.5 + tagIndex * 0.05 }}
//             >
//               <Box
//                 as="span"
//                 px={3}
//                 py={1.5}
//                 fontSize="xs"
//                 borderRadius="full"
//                 border="1px solid"
//                 borderColor={`${project.color}30`}
//                 bg={`${project.color}10`}
//                 color={project.color}
//                 display="inline-block"
//                 fontWeight="500"
//                 transition="all 0.3s"
//                 _hover={{ borderColor: project.color }}
//               >
//                 {tag}
//               </Box>
//             </MotionBox>
//           ))}
//         </HStack>
//       </MotionBox>
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
//       bg={bgPrimary}
//     >
//       <Container maxW="1400px">
//         {/* Header */}
//         <MotionBox
//           initial={{ opacity: 0, y: 40 }}
//           animate={isInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.7 }}
//           mb={24}
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
//             fontSize={{ base: '5xl', md: '6xl', lg: '7xl' }}
//             fontWeight="bold"
//             color={textPrimary}
//             fontFamily="heading"
//           >
//             Curated{' '}
//             <Text as="span" bgGradient="gradients.pinkTeal" bgClip="text">
//               work
//             </Text>
//           </Heading>
//         </MotionBox>

//         {/* Projects List */}
//         <VStack spacing={{ base: 32, lg: 48 }} align="stretch">
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
  useColorModeValue,
} from '@chakra-ui/react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const MotionBox = motion(Box);
const MotionDiv = motion.div;

const projects = [
  {
    id: '01',
    type: 'Web App',
    title: 'Next Ventures',
    period: 'Q1 2025',
    description:
      'A space for entrepreneurs to pitch ideas, explore others, and gain exposure with clean design',
    longDescription:
      "A platform designed for early-stage entrepreneurs to pitch, browse, and engage with startup ideas. It's built to impress both users and investors with blazing speed, compelling visuals, and a modern tech stack.",
    highlights: [
      'Leveraged Partial Prerendering and After for faster loading.',
      'Simplified idea submission with a clean, intuitive design.',
      'Enhanced browsing with seamless performance optimization.',
    ],
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
  },
  {
    id: '02',
    type: 'Mobile App',
    title: 'Finote App',
    period: 'Q4 2025',
    description:
      'An intuitive mobile companion for organizing your digital wallets and analyzing your financial health',
    longDescription:
      'A comprehensive mobile application for managing digital finances with real-time analytics and intuitive wallet organization.',
    highlights: [
      'Beautiful animated charts for financial visualization.',
      'Secure wallet management with cloud sync.',
      'Smart spending insights and budget tracking.',
    ],
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
  },
  {
    id: '03',
    type: 'Web App',
    title: 'Zenith Minds',
    period: '2025',
    description:
      'A platform connecting students and instructors for enhanced learning experiences',
    longDescription:
      'An educational platform bridging the gap between knowledge seekers and providers with robust course management and payment integration.',
    highlights: [
      'Seamless video streaming for courses.',
      'Integrated payment system with Razorpay.',
      'Real-time progress tracking and analytics.',
    ],
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
  },
  {
    id: '04',
    type: 'Web App',
    title: 'Snippix',
    period: '2025',
    description:
      'A platform for creating and sharing code snippets with a clean and intuitive design',
    longDescription:
      'A developer-focused tool for creating, sharing, and organizing beautiful code snippets with syntax highlighting and keyboard shortcuts.',
    highlights: [
      'Multiple theme support for code highlighting.',
      'Keyboard shortcuts for power users.',
      'Easy sharing and export options.',
    ],
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
  },
  {
    id: '05',
    type: 'Web App',
    title: 'StarForge',
    period: '2025',
    description:
      'A sleek AI SaaS landing page with a user-friendly design that enhances engagement',
    longDescription:
      'A modern, high-converting landing page template for AI SaaS products featuring stunning parallax effects and optimized performance.',
    highlights: [
      'Scroll-triggered parallax animations.',
      'Optimized for conversion and engagement.',
      'Lightning fast Core Web Vitals scores.',
    ],
    tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Parallax', 'Vercel'],
    color: '#06b6d4',
  },
];

const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: '-100px' });

  // Theme colors
  const cardBg = useColorModeValue('surface.card', '#1a1a1a');
  const textPrimary = useColorModeValue('text.primary', 'white');
  const textSecondary = useColorModeValue('text.secondary', 'text.secondary');
  const borderColor = useColorModeValue('border.primary', 'border.primary');

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  // Smooth the scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Foreground (info) moves faster - 2x scroll speed
  const foregroundY = useTransform(smoothProgress, [0, 1], [200, -200]);

  // Background (images) moves slower - 0.5x scroll speed
  const backgroundY = useTransform(smoothProgress, [0, 1], [50, -50]);

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.4, 1, 1, 0.4]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.9, 1, 1, 0.9]);

  const isEven = index % 2 === 0;

  return (
    <MotionBox
      ref={cardRef}
      style={{ opacity, scale }}
      position="relative"
      minH="700px"
      h="700px" // Fixed height for all cards
    >
      <Box
        position="relative"
        display="grid"
        gridTemplateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }}
        gap={{ base: 8, lg: 16 }}
        alignItems="center"
        h="full"
      >
        {/* Background Layer - Project Visual (moves slower) */}
        <MotionBox
          style={{ y: backgroundY }}
          position={{ base: 'relative', lg: 'absolute' }}
          inset={{ base: 'auto', lg: 0 }}
          gridColumn={{ base: '1', lg: isEven ? '2' : '1' }}
          order={{ base: 2, lg: isEven ? 2 : 1 }}
          h="full"
        >
          <MotionBox
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            position="relative"
            h="full"
          >
            {/* Main card */}
            <Box
              position="relative"
              h="full"
              borderRadius="3xl"
              overflow="hidden"
              border="1px solid"
              borderColor={`${project.color}20`}
              bgGradient={`linear(135deg, ${project.color}08 0%, ${project.color}02 100%)`}
            >
              {/* Mock Screenshot */}
              <Box position="absolute" inset={0} p={6}>
                {/* Browser chrome */}
                <Box
                  borderRadius="2xl"
                  overflow="hidden"
                  h="full"
                  bgGradient={`linear(180deg, ${project.color}15 0%, ${project.color}05 100%)`}
                >
                  {/* Title bar */}
                  <HStack
                    px={4}
                    py={3}
                    borderBottom="1px solid"
                    borderColor={`${project.color}20`}
                    spacing={2}
                  >
                    <HStack spacing={1.5}>
                      <Box w={3} h={3} borderRadius="full" bg="red.500" opacity={0.8} />
                      <Box w={3} h={3} borderRadius="full" bg="yellow.500" opacity={0.8} />
                      <Box w={3} h={3} borderRadius="full" bg="green.500" opacity={0.8} />
                    </HStack>
                    <Box
                      flex={1}
                      mx={4}
                      h={6}
                      borderRadius="md"
                      bg={`${project.color}15`}
                    />
                  </HStack>

                  {/* Content area */}
                  <VStack p={4} spacing={4} align="stretch">
                    {/* Sidebar + Main content layout */}
                    <HStack spacing={4} h="full" align="stretch">
                      {/* Sidebar */}
                      <VStack w={16} spacing={3}>
                        {[...Array(5)].map((_, i) => (
                          <Box
                            key={i}
                            h={8}
                            borderRadius="lg"
                            bg={`${project.color}${i === 0 ? '40' : '15'}`}
                            w="full"
                          />
                        ))}
                      </VStack>

                      {/* Main content */}
                      <VStack flex={1} spacing={3} align="stretch">
                        <Box h={8} borderRadius="lg" w="66%" bg={`${project.color}30`} />
                        <Box h={4} borderRadius="md" w="50%" bg={`${project.color}15`} />
                        <Box
                          display="grid"
                          gridTemplateColumns="repeat(3, 1fr)"
                          gap={3}
                          mt={4}
                          flex={1}
                        >
                          {[...Array(6)].map((_, i) => (
                            <Box
                              key={i}
                              borderRadius="xl"
                              bg={`${project.color}${10 + i * 3}`}
                            />
                          ))}
                        </Box>
                      </VStack>
                    </HStack>
                  </VStack>
                </Box>
              </Box>
            </Box>
          </MotionBox>
        </MotionBox>

        {/* Foreground Layer - Project Info (moves faster) */}
        <MotionBox
          style={{ y: foregroundY }}
          position="relative"
          zIndex={10}
          gridColumn={{ base: '1', lg: isEven ? '1' : '2' }}
          order={{ base: 1, lg: isEven ? 1 : 2 }}
          h="full"
          display="flex"
          alignItems="center"
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
            w="full"
          >
            <VStack align="flex-start" spacing={5}>
              {/* Number and Type */}
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
              <Text 
                fontSize="md" 
                color={textSecondary} 
                lineHeight="1.7"
                fontFamily="body"
              >
                {project.description}
              </Text>

              {/* Tags */}
              <MotionBox
                pt={3}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.03,
                      delayChildren: 0.4,
                    },
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
                      whileHover={{
                        scale: 1.05,
                        background: `${project.color}25`,
                      }}
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

export const Projects = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  
  const bgPrimary = useColorModeValue('bg.primary', 'bg.secondary');
  const textPrimary = useColorModeValue('text.primary', 'white');
  const textMuted = useColorModeValue('text.muted', 'text.muted');

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
            <Text as="span" bgGradient="linear(to-r, #1e40af, #7c3aed,#ec4899)" bgClip="text">
              work
            </Text>
          </Heading>
        </MotionBox>

        {/* Projects List */}
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