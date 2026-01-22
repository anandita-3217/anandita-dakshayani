
// import React, { useState, useEffect } from 'react';
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
// import { motion, AnimatePresence, useAnimation } from 'framer-motion';
// import { useInView } from 'react-intersection-observer';

// const MotionBox = motion.create(Box);
// const MotionHeading = motion.create(Heading);

// function Projects() {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [direction, setDirection] = useState(0);
//   const headerControls = useAnimation();
//   const carouselControls = useAnimation();
//   const [headerRef, headerInView] = useInView({ 
//     triggerOnce: false,
//     threshold: 0.2
//   });
//   const [carouselRef, carouselInView] = useInView({ 
//     triggerOnce: false,
//     threshold: 0.2
//   });
//   const [projectsRef, projectsInView] = useInView({
//     triggerOnce: false,
//     threshold: 0.2
//   });
  
//   // useEffect(() => {
//   //   if (headerInView) {
//   //     headerControls.start("visible");
//   //   }
//   // }, [headerControls, headerInView]);

//   useEffect(() => {
//     if (carouselInView) {
//       carouselControls.start("visible");
//     }
//   }, [carouselControls, carouselInView]);

//   useEffect(() => {
//     // Load projects from JSON file
//     fetch('../data/projects.json')
//       .then(response => response.json())
//       .then(data => {
//         setProjects(data.projects || []);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('Error loading projects:', error);
//         setLoading(false);
//       });
//   }, []);

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

//   const headerVariants = {
//     hidden: { opacity: 0, y: 40 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.7 }
//     }
//   };
//   const projectsVariants = {
//     hidden: { opacity: 0, y: -40 },
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

//   if (loading) {
//     return (
//       <Box
//         bg="bg.secondary"
//         color="text.primary"
//         py={{ base: 16, md: 24 }}
//         minH="100vh"
//         display="flex"
//         alignItems="center"
//         justifyContent="center"
//       >
//         <Spinner size="xl" color="brand.400" />
//       </Box>
//     );
//   }

//   if (projects.length === 0) {
//     return null;
//   }

//   const currentProject = projects[currentIndex];

//   return (
//     <Box
//       bg="transparent"
//       color="text.primary"
//       py={{ base: 16, md: 20 }}
//       minH="100vh"
//       id="projects"
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
//             animate = {headerInView?"visible":"hidden"}
//             variants={headerVariants}
//           >
//             <Text as="span" color="brand.400">Projects</Text>
//           </MotionHeading>
//         <MotionBox
//         ref={projectsRef}
//             textAlign="center"
//             initial="hidden"
//             viewport={{ once: true }}
//             animate={projectsInView ? "visible" : "hidden"}
//             variants={projectsVariants}>
//           {/* Carousel Container with scroll animation */}
//           <MotionBox
//             ref={carouselRef}
//             initial="hidden"
//             animate={carouselControls}
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
//                           <ImageIcon size={48} color="#6B7280"/>
//                         )}
//                       </Box>

//                       {/* Project Content */}
//                       <VStack spacing={5} align="stretch" p={6}>
//                         {/* Title */}
//                         <Heading
//                           as="h3"
//                           fontSize="xl"
//                           fontWeight="bold"
//                           color="text.primary"
//                         >
//                           {currentProject.title}
//                         </Heading>

//                         {/* Description */}
//                         <Text
//                           fontSize="sm"
//                           color="text.secondary"
//                           lineHeight="1.6"
//                         >
//                           {currentProject.description}
//                         </Text>

//                         {/* Tech Tags */}
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

//                         {/* Project Links */}
//                         <HStack spacing={3}>
//                           <Button
//                             as={Link}
//                             href={currentProject.liveUrl}
//                             bg="brand.400"
//                             color="white"
//                             size="sm"
//                             fontWeight="600"
//                             _hover={{
//                               bg: 'brand.500',
//                               textDecoration: 'none'
//                             }}
//                             rightIcon={<ExternalLink size={16} />}
//                             isExternal
//                             onClick={(e) => e.stopPropagation()}
//                           >
//                             {currentProject.demoText || 'Live Demo'}
//                           </Button>
//                           <Button
//                             as={Link}
//                             href={currentProject.githubUrl}
//                             bg="transparent"
//                             color="text.primary"
//                             size="sm"
//                             fontWeight="600"
//                             border="2px solid"
//                             borderColor="border.secondary"
//                             _hover={{
//                               borderColor: 'brand.400',
//                               color: 'brand.400',
//                               textDecoration: 'none'
//                             }}
//                             rightIcon={<Github size={16} />}
//                             isExternal
//                             onClick={(e) => e.stopPropagation()}
//                           >
//                             View Code
//                           </Button>
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
//           </MotionBox>
//         </VStack>
//       </Container>
//     </Box>
//   );
// }

// export default Projects;

import React, { useRef } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Grid,
  Card,
  CardBody,
  Image,
  Badge,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ScrollReveal, { ScrollRevealStagger } from './ui/ScrollReveal';
import ParallaxSection from './ui/ParallaxSection';
import MagneticButton from './ui/MagneticButton';

const MotionBox = motion.create(Box);
const MotionCard = motion.create(Card);

const projects = [
  {
    title: "AI Chat Application",
    description: "Real-time chat app with AI-powered responses using OpenAI API",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
    tags: ["React", "Django", "OpenAI", "WebSocket"],
    gradient: "linear(to-br, purple.400, pink.500)"
  },
  {
    title: "E-Commerce Platform",
    description: "Full-stack shopping platform with payment integration",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800",
    tags: ["React", "Node.js", "Stripe", "MongoDB"],
    gradient: "linear(to-br, blue.400, cyan.500)"
  },
  {
    title: "ML Image Classifier",
    description: "Deep learning model for image classification with 95% accuracy",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800",
    tags: ["Python", "TensorFlow", "Flask", "Docker"],
    gradient: "linear(to-br, green.400, teal.500)"
  },
];

function Projects() {
  const containerRef = useRef(null);
  const [titleRef, titleInView] = useInView({ 
    triggerOnce: false, 
    threshold: 0.3 
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <Box
      ref={containerRef}
      id="projects"
      py={20}
      position="relative"
      overflow="hidden"
      bg="bg.primary"
    >
      {/* Animated background */}
      <MotionBox
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        opacity={0.4}
        style={{ y: backgroundY }}
      >
        <Box
          position="absolute"
          top="20%"
          right="10%"
          w="300px"
          h="300px"
          bgGradient="radial(circle, fuchsia.400, transparent)"
          opacity={0.1}
          filter="blur(60px)"
        />
        <Box
          position="absolute"
          bottom="20%"
          left="10%"
          w="400px"
          h="400px"
          bgGradient="radial(circle, purple.500, transparent)"
          opacity={0.1}
          filter="blur(70px)"
        />
      </MotionBox>

      <Container maxW="container.xl" position="relative" zIndex={1}>
        <VStack spacing={16}>
          {/* Section Title */}
          <ScrollReveal direction="fade" distance={0}>
            <VStack spacing={4} textAlign="center">
              <Heading
                ref={titleRef}
                as="h2"
                fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
                fontWeight="bold"
                bgGradient="linear(to-r, purple.400, pink.400, fuchsia.500)"
                bgClip="text"
              >
                Featured Projects
              </Heading>
              <Text
                fontSize={{ base: 'md', md: 'lg' }}
                color="text.secondary"
                maxW="600px"
              >
                A showcase of my recent work in web development and machine learning
              </Text>
            </VStack>
          </ScrollReveal>

          {/* Projects Grid */}
          <Grid
            templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
            gap={8}
            w="full"
          >
            {projects.map((project, index) => (
              <ParallaxSection 
                key={index} 
                speed={0.2 + (index * 0.1)} 
                direction={index % 2 === 0 ? 'up' : 'down'}
              >
                <ScrollReveal 
                  direction="up" 
                  delay={index * 0.1}
                  distance={60}
                >
                  <MotionCard
                    bg="surface.card"
                    borderWidth="1px"
                    borderColor="border.primary"
                    overflow="hidden"
                    position="relative"
                    h="full"
                    whileHover={{ 
                      y: -8,
                      transition: { duration: 0.3 }
                    }}
                    _before={{
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      bgGradient: project.gradient,
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                    }}
                    _hover={{
                      _before: {
                        opacity: 0.05
                      },
                      borderColor: 'fuchsia.400',
                      boxShadow: '0 20px 40px rgba(236, 72, 153, 0.2)'
                    }}
                  >
                    {/* Project Image */}
                    <Box position="relative" overflow="hidden" h="200px">
                      <MotionBox
                        as={Image}
                        src={project.image}
                        alt={project.title}
                        w="full"
                        h="full"
                        objectFit="cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.4 }}
                      />
                      <Box
                        position="absolute"
                        top="0"
                        left="0"
                        right="0"
                        bottom="0"
                        bgGradient={`${project.gradient}, transparent`}
                        opacity={0.3}
                      />
                    </Box>

                    <CardBody>
                      <VStack align="start" spacing={3}>
                        <Heading size="md" color="text.primary">
                          {project.title}
                        </Heading>
                        <Text color="text.secondary" fontSize="sm">
                          {project.description}
                        </Text>
                        <HStack spacing={2} flexWrap="wrap">
                          {project.tags.map((tag, i) => (
                            <Badge
                              key={i}
                              colorScheme="purple"
                              variant="subtle"
                              px={2}
                              py={1}
                              borderRadius="md"
                              fontSize="xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </HStack>
                        <MagneticButton
                          size="sm"
                          variant="outline"
                          borderColor="fuchsia.400"
                          color="fuchsia.400"
                          _hover={{
                            bg: 'fuchsia.400',
                            color: 'white'
                          }}
                          mt={2}
                          w="full"
                        >
                          View Project
                        </MagneticButton>
                      </VStack>
                    </CardBody>
                  </MotionCard>
                </ScrollReveal>
              </ParallaxSection>
            ))}
          </Grid>
        </VStack>
      </Container>
    </Box>
  );
}

export default Projects;