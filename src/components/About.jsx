
// import React from 'react';
// import {
//   Box,
//   Container,
//   Grid,
//   GridItem,
//   Heading,
//   Text,
//   Button,
//   VStack,
//   HStack,
//   SimpleGrid,
//   Icon
// } from '@chakra-ui/react';
// import { motion } from 'framer-motion';
// import { 
//   FaCode,
//   FaBrain
// } from 'react-icons/fa';
// import { useInView } from 'react-intersection-observer';
// // Motion components
// const MotionBox = motion.create(Box);
// const MotionHeading = motion.create(Heading);
// const MotionGridItem = motion.create(GridItem);

// // Animation variants

// const staggerContainer = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.1,
//       delayChildren: 0.2
//     }
//   }
// };

// const headerVariants = {
//     hidden: { opacity: 0, y: 40 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.7 }
//     }
//   };
// const cardVariants = {
//   hidden: { opacity: 0, y: 30 },
//   visible: { 
//     opacity: 1, 
//     y: 0,
//     transition: { duration: 0.6, ease: "easeOut" }
//   }
// };


// // About Section Component
// function About() {
//   const [headerRef, headerInView] = useInView({ 
//       triggerOnce: false,
//       threshold: 0.2
//     });
    
//   const [topLeftRef, topLeftInView] = useInView({ 
//     triggerOnce: false,
//     threshold: 0.2
//   });

//   const [middleRef, middleInView] = useInView({ 
//     triggerOnce: false,
//     threshold: 0.2
//   });

//   const [topRightRef, topRightInView] = useInView({ 
//     triggerOnce: false,
//     threshold: 0.2
//   });

//   const [bottomLeftRef, bottomLeftInView] = useInView({ 
//     triggerOnce: false,
//     threshold: 0.2
//   });

//   const [bottomRightRef, bottomRightInView] = useInView({ 
//     triggerOnce: false,
//     threshold: 0.2
//   });
    
//   return (
//     <Box
//       id="about"
//       bg="transparent"
//       color="text.primary"
//       py={{ base: 12, md: 20 }}
//       minH="100vh"
//       display="flex"
//       alignItems="center"
//       position="relative"
//       overflow="hidden"
//       p={90}
//     >
//       {/* Background decoration */}
//       <MotionBox
//         position="absolute"
//         top="20%"
//         left="5%"
//         w="200px"
//         h="200px"
//         bg="rgba(20, 184, 166, 0.03)"
//         borderRadius="full"
//         animate={{
//           scale: [1, 1.2, 1],
//           opacity: [0.3, 0.5, 0.3]
//         }}
//         transition={{
//           duration: 6,
//           repeat: Infinity,
//           ease: "easeInOut"
//         }}
//       />

//        <Container maxW="container.xl" position="relative" zIndex={1}>
//         <MotionBox
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: "-100px" }}
//           variants={staggerContainer}
//         >
          
//           <MotionHeading
//             ref={headerRef}
//             as="h2"
//             fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
//             fontWeight="bold"
//             textAlign="center"
//             initial="hidden"
//             animate={headerInView ? "visible" : "hidden"}
//             variants={headerVariants}
//             mb={12}
//           >
//             <Text as="span" color="brand.400">About Me</Text>
//           </MotionHeading>
//           <Grid
//                templateColumns="repeat(3, 1fr)"
//                templateRows="repeat(5, 1fr)"
//                gap={4}
//                w="100%"
//                h="100vh"
//                p={4}
//              >
//                {/* Top Left - 3 rows */}
//                <MotionGridItem
//                  ref={topLeftRef}
//                  rowSpan={2}
//                  colSpan={1}
//                  bg="surface.card"
//                  borderRadius="xl"
//                  border="1px solid"
//                  borderColor="border.primary"
//                  p={6}
//                  initial="hidden"
//                  animate={topLeftInView ? "visible" : "hidden"}
//                  variants={cardVariants}
//                  _hover={{
//                    borderColor: 'brand.400',
//                    boxShadow: '0 0 30px rgba(20, 184, 166, 0.2)'
//                  }}
//                  transition="all 0.3s"
//                >
//                  <VStack spacing={4} align="stretch" h="100%">
//            <Heading
//              as="h3"
//              fontSize={{ base: 'xl', md: '2xl' }}
//              fontWeight="bold"
//              color="brand.400"
//            >
//              About Me
//            </Heading>
         
//            <Text
//              fontSize={{ base: 'sm', md: 'md' }}
//              color="text.primary"
//              lineHeight="1.6"
//              noOfLines={4}
//            >
//              Hi! I'm a <Text as="span" color="brand.400" fontWeight="600">Computer Science graduate</Text> specializing 
//              in full-stack web development and machine learning. I'm passionate about building 
//              practical solutions to real-world problems.
//            </Text>
         
//            <HStack spacing={3} pt={2} flexWrap="wrap">
//              <HStack spacing={1} color="brand.400" fontSize="sm">
//                <Icon as={FaCode} boxSize={4} />
//                <Text fontWeight="600">Full-Stack</Text>
//              </HStack>
//              <HStack spacing={1} color="brand.400" fontSize="sm">
//                <Icon as={FaBrain} boxSize={4} />
//                <Text fontWeight="600">ML</Text>
//              </HStack>
//            </HStack>
//          </VStack>
//                </MotionGridItem>
         
//                {/* Middle - 5 rows */}
//                <MotionGridItem
//                  ref={middleRef}
//                  rowSpan={5}
//                  colSpan={1}
//                  bg="surface.card"
//                  borderRadius="xl"
//                  border="1px solid"
//                  borderColor="border.primary"
//                  p={6}
//                  initial="hidden"
//                  animate={middleInView ? "visible" : "hidden"}
//                  variants={cardVariants}
//                  _hover={{
//                    borderColor: 'brand.400',
//                    boxShadow: '0 0 30px rgba(20, 184, 166, 0.2)'
//                  }}
//                  transition="all 0.3s"
//                >
//                  <Box>Middle (5 rows)</Box>
//                </MotionGridItem>
         
//                {/* Top Right - 3 rows */}
//                <MotionGridItem
//                  ref={topRightRef}
//                  rowSpan={3}
//                  colSpan={1}
//                  bg="surface.card"
//                  borderRadius="xl"
//                  border="1px solid"
//                  borderColor="border.primary"
//                  p={6}
//                  initial="hidden"
//                  animate={topRightInView ? "visible" : "hidden"}
//                  variants={cardVariants}
//                  _hover={{
//                    borderColor: 'brand.400',
//                    boxShadow: '0 0 30px rgba(20, 184, 166, 0.2)'
//                  }}
//                  transition="all 0.3s"
//                  overflow="hidden"
//                >
//                  <Box>Top Right (3 rows) </Box>
//                </MotionGridItem>
         
//                {/* Bottom Left - 2 rows */}
//                <MotionGridItem
//                  ref={bottomLeftRef}
//                  rowSpan={3}
//                  colSpan={1}
//                  bg="surface.card"
//                  borderRadius="xl"
//                  border="1px solid"
//                  borderColor="border.primary"
//                  p={6}
//                  initial="hidden"
//                  animate={bottomLeftInView ? "visible" : "hidden"}
//                  variants={cardVariants}
//                  _hover={{
//                    borderColor: 'brand.400',
//                    boxShadow: '0 0 30px rgba(20, 184, 166, 0.2)'
//                  }}
//                  transition="all 0.3s"
//                >
//                  <Box>Bottom Right (3 rows)</Box>
//                </MotionGridItem>
         
//                {/* Bottom Right - 3 rows */}
//                <MotionGridItem
//                  ref={bottomRightRef}
//                  rowSpan={3}
//                  colSpan={1}
//                  bg="surface.card"
//                  borderRadius="xl"
//                  border="1px solid"
//                  borderColor="border.primary"
//                  p={6}
//                  initial="hidden"
//                  animate={bottomRightInView ? "visible" : "hidden"}
//                  variants={cardVariants}
//                  _hover={{
//                    borderColor: 'brand.400',
//                    boxShadow: '0 0 30px rgba(20, 184, 166, 0.2)'
//                  }}
//                  transition="all 0.3s"
//                >
//                  <Box>Bottom Left (2 rows)</Box>
//                </MotionGridItem>
//              </Grid>
//         </MotionBox>
//       </Container> 
//     </Box>
//   );
// }

// export default About;

import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  Text,
  VStack,
  HStack,
  Icon,
} from '@chakra-ui/react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Code, Brain, Zap, Award, Target, Rocket } from 'lucide-react';

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionGridItem = motion(GridItem);

// Animation variants
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const headerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

// Enhanced Card Component with 3D tilt and animations
const BentoCard = ({ children, rowSpan, colSpan, index, color = '#14b8a6', accentColor = '#0d9488' }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

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

  // Floating animation with GSAP-like effect using CSS
  // useEffect(() => {
  //   const card = cardRef.current;
  //   if (!card) return;

  //   const floatAnimation = `
  //     @keyframes float-${index} {
  //       0%, 100% { transform: translateY(0px) rotate(0deg); }
  //       33% { transform: translateY(${Math.sin((index+1) * 1.5) * 10}px) rotate(${Math.sin(index) * 1}deg); }
  //       66% { transform: translateY(${-Math.sin((index+1) * 1.5) * 10}px) rotate(${-Math.sin(index) * 1}deg); }
  //     }
  //   `;

  //   const styleSheet = document.createElement('style');
  //   styleSheet.textContent = floatAnimation;
  //   document.head.appendChild(styleSheet);

  //   card.style.animation = `float-${index} ${3 + index * 0.2}s ease-in-out infinite`;

  //   return () => {
  //     document.head.removeChild(styleSheet);
  //   };
  // }, [index]);

  return (
    <MotionGridItem
      ref={cardRef}
      rowSpan={rowSpan}
      colSpan={colSpan}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      variants={cardVariants}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
    >
      <Box
        bg="rgba(255, 255, 255, 0.02)"
        backdropFilter="blur(20px)"
        borderRadius="32px"
        border="2px solid"
        borderColor={isHovered ? color : 'rgba(255, 255, 255, 0.08)'}
        p={6}
        h="100%"
        position="relative"
        overflow="hidden"
        transition="all 0.4s cubic-bezier(0.23, 1, 0.32, 1)"
        boxShadow={isHovered ? `0 30px 80px ${color}40` : 'none'}
        _hover={{
          borderColor: color,
        }}
      >
        {/* Animated gradient background */}
        <Box
          position="absolute"
          top="-100px"
          right="-100px"
          w="300px"
          h="300px"
          bgGradient={`radial(circle, ${color}, transparent)`}
          opacity={isHovered ? 0.3 : 0.15}
          transition="opacity 0.6s"
          pointerEvents="none"
          filter="blur(40px)"
        />

        {/* Decorative corner pattern */}
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
            bgGradient={`linear(to-br, ${color}, ${accentColor})`}
            clipPath="polygon(100% 0, 100% 100%, 0 0)"
          />
        </Box>

        {/* Shimmer effect on hover */}
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

        <Box position="relative" zIndex={1} h="100%">
          {children}
        </Box>
      </Box>
    </MotionGridItem>
  );
};

// About Section Component
function About() {
  return (
    <Box
      id="about"
      bg="transparent"
      color="white"
      py={{ base: 12, md: 20 }}
      minH="100vh"
      display="flex"
      alignItems="center"
      position="relative"
      overflow="hidden"
      px={{ base: 4, md: 8, lg: 16 }}
    >
      {/* Background decoration */}
      <MotionBox
        position="absolute"
        top="20%"
        left="5%"
        w="200px"
        h="200px"
        bg="rgba(20, 184, 166, 0.03)"
        borderRadius="full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <Container maxW="container.xl" position="relative" zIndex={1}>
        <MotionBox
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <MotionHeading
            as="h2"
            fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
            fontWeight="bold"
            textAlign="center"
            variants={headerVariants}
            mb={12}
          >
            <Text as="span" color="#14b8a6">About Me</Text>
          </MotionHeading>

          <Grid
            templateColumns="repeat(3, 1fr)"
            templateRows="repeat(5, 1fr)"
            gap={4}
            w="100%"
            h="100vh"
          >
            {/* Top Left - Introduction */}
            <BentoCard rowSpan={2} colSpan={1} index={0} color="#14b8a6" accentColor="#0d9488">
              <VStack spacing={4} align="stretch" h="100%">
                <Heading
                  as="h3"
                  fontSize={{ base: 'xl', md: '2xl' }}
                  fontWeight="bold"
                  color="#14b8a6"
                >
                  About Me
                </Heading>

                <Text
                  fontSize={{ base: 'sm', md: 'md' }}
                  color="rgba(255, 255, 255, 0.9)"
                  lineHeight="1.6"
                >
                  Hi! I'm a <Text as="span" color="#14b8a6" fontWeight="600">Computer Science graduate</Text> specializing 
                  in full-stack web development and machine learning. I'm passionate about building 
                  practical solutions to real-world problems.
                </Text>

                <HStack spacing={3} pt={2} flexWrap="wrap">
                  <HStack spacing={1} color="#14b8a6" fontSize="sm">
                    <Icon as={Code} boxSize={4} />
                    <Text fontWeight="600">Full-Stack</Text>
                  </HStack>
                  <HStack spacing={1} color="#14b8a6" fontSize="sm">
                    <Icon as={Brain} boxSize={4} />
                    <Text fontWeight="600">ML</Text>
                  </HStack>
                </HStack>
              </VStack>
            </BentoCard>

            {/* Middle - Main Focus */}
            <BentoCard rowSpan={5} colSpan={1} index={1} color="#667eea" accentColor="#764ba2">
              <VStack spacing={6} align="stretch" h="100%" justify="center">
                <Box
                  p={4}
                  bg="rgba(102, 126, 234, 0.15)"
                  borderRadius="2xl"
                  w="fit-content"
                >
                  <Icon as={Rocket} boxSize={10} color="#667eea" />
                </Box>
                
                <Heading
                  as="h3"
                  fontSize={{ base: '2xl', md: '3xl' }}
                  fontWeight="bold"
                  color="white"
                >
                  Building the Future
                </Heading>

                <Text
                  fontSize={{ base: 'md', md: 'lg' }}
                  color="rgba(255, 255, 255, 0.8)"
                  lineHeight="1.7"
                >
                  I combine cutting-edge technologies with innovative thinking to create 
                  solutions that make a real impact. From web applications to AI models, 
                  every project is an opportunity to push boundaries.
                </Text>

                <VStack spacing={3} align="stretch">
                  {['Innovation', 'Quality', 'Impact'].map((value, i) => (
                    <HStack key={i} spacing={3}>
                      <Box w="6px" h="6px" bg="#667eea" borderRadius="full" />
                      <Text fontSize="sm" color="rgba(255, 255, 255, 0.7)">
                        {value}
                      </Text>
                    </HStack>
                  ))}
                </VStack>
              </VStack>
            </BentoCard>

            {/* Top Right - Skills */}
            <BentoCard rowSpan={3} colSpan={1} index={2} color="#f093fb" accentColor="#f5576c">
              <VStack spacing={4} align="stretch" h="100%">
                <Box
                  p={3}
                  bg="rgba(240, 147, 251, 0.15)"
                  borderRadius="xl"
                  w="fit-content"
                >
                  <Icon as={Zap} boxSize={8} color="#f093fb" />
                </Box>

                <Heading
                  as="h3"
                  fontSize={{ base: 'xl', md: '2xl' }}
                  fontWeight="bold"
                  color="white"
                >
                  Technical Skills
                </Heading>

                <VStack spacing={2} align="stretch">
                  {[
                    { name: 'React & Next.js', level: 90 },
                    { name: 'Node.js', level: 85 },
                    { name: 'Python & ML', level: 80 }
                  ].map((skill, i) => (
                    <Box key={i}>
                      <HStack justify="space-between" mb={1}>
                        <Text fontSize="sm" color="rgba(255, 255, 255, 0.9)">
                          {skill.name}
                        </Text>
                        <Text fontSize="xs" color="#f093fb">
                          {skill.level}%
                        </Text>
                      </HStack>
                      <Box h="4px" bg="rgba(255, 255, 255, 0.1)" borderRadius="full">
                        <Box
                          h="100%"
                          w={`${skill.level}%`}
                          bg="#f093fb"
                          borderRadius="full"
                          transition="width 1s ease-out"
                        />
                      </Box>
                    </Box>
                  ))}
                </VStack>
              </VStack>
            </BentoCard>

            {/* Bottom Left - Experience */}
            <BentoCard rowSpan={3} colSpan={1} index={3} color="#4facfe" accentColor="#00f2fe">
              <VStack spacing={4} align="stretch" h="100%" justify="center">
                <Box
                  p={3}
                  bg="rgba(79, 172, 254, 0.15)"
                  borderRadius="xl"
                  w="fit-content"
                >
                  <Icon as={Award} boxSize={8} color="#4facfe" />
                </Box>

                <Heading
                  as="h3"
                  fontSize={{ base: 'xl', md: '2xl' }}
                  fontWeight="bold"
                  color="white"
                >
                  Experience
                </Heading>

                <VStack spacing={3} align="stretch">
                  <Box>
                    <Text fontSize="md" fontWeight="600" color="white">
                      2+ Years
                    </Text>
                    <Text fontSize="sm" color="rgba(255, 255, 255, 0.6)">
                      Building Web Apps
                    </Text>
                  </Box>
                  <Box>
                    <Text fontSize="md" fontWeight="600" color="white">
                      10+ Projects
                    </Text>
                    <Text fontSize="sm" color="rgba(255, 255, 255, 0.6)">
                      Completed Successfully
                    </Text>
                  </Box>
                </VStack>
              </VStack>
            </BentoCard>

            {/* Bottom Right - Mission */}
            <BentoCard rowSpan={2} colSpan={1} index={4} color="#68d391" accentColor="#38a169">
              <VStack spacing={3} align="stretch" h="100%" justify="center">
                <Box
                  p={3}
                  bg="rgba(104, 211, 145, 0.15)"
                  borderRadius="xl"
                  w="fit-content"
                >
                  <Icon as={Target} boxSize={7} color="#68d391" />
                </Box>

                <Heading
                  as="h3"
                  fontSize={{ base: 'lg', md: 'xl' }}
                  fontWeight="bold"
                  color="white"
                >
                  My Mission
                </Heading>

                <Text
                  fontSize={{ base: 'sm', md: 'md' }}
                  color="rgba(255, 255, 255, 0.8)"
                  lineHeight="1.6"
                >
                  Creating elegant, efficient solutions that solve real problems and delight users.
                </Text>
              </VStack>
            </BentoCard>
          </Grid>
        </MotionBox>
      </Container>
    </Box>
  );
}

export default About;