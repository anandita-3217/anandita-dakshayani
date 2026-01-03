import React, { useEffect, useRef, useState } from 'react';
import Marquee from "react-fast-marquee";
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
import { Code, Brain, Zap, Award, Target, Rocket,UserRound } from 'lucide-react';
import {
  DiReact,
  DiNodejsSmall,
  DiPython,
  DiJavascript1,
  DiMongodb,
  DiPostgresql,
  DiGit,
  DiDocker,
  DiHtml5,
  DiCss3,
  DiSass,
  DiNpm,
  DiGithubBadge,
  DiRedis,
  DiFirebase,
  DiVisualstudio,
  DiBootstrap,
  DiJqueryLogo,
  DiLinux,
  DiTerminal,
  DiPhotoshop,
  DiIllustrator,
} from 'react-icons/di';


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
        minW={0}              
  maxW="100%"           
  overflow="hidden"
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
      color="text.primary"
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
            {/* Add animations here */}
            <Text as="span" color="brand.500">About Me</Text>
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
              <VStack spacing={3} align="stretch" h="100%">
                <Box
                  p={4}
                  bg="rgba(102, 234, 219, 0.15)"
                  borderRadius="2xl"
                  w="fit-content"
                >
                  <Icon as={UserRound} boxSize={10} color="#14b8a6" />
                </Box>

                <Text
                  fontSize={{ base: 'sm', md: 'md' }}
                  color="text.primary"
                  lineHeight="1.5"
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
                  <Icon as={Rocket} boxSize={10} color="#764ba2" />
                </Box>
                
                <Heading
                  as="h3"
                  fontSize={{ base: '2xl', md: '3xl' }}
                  fontWeight="bold"
                  color="#764ba2"
                >
                  Building the Future
                </Heading>

                <Text
                  fontSize={{ base: 'md', md: 'lg' }}
                  color="#667eea"
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
                      <Text fontSize="sm" color="text.secondary">
                        {value}
                      </Text>
                    </HStack>
                  ))}
                </VStack>
              </VStack>
            </BentoCard>

           {/* Top Right - Tech Stack */}
          <BentoCard rowSpan={3} colSpan={1} index={2} color="#f093fb" accentColor="#f5576c">
            <VStack spacing={3} align="stretch" h="100%" overflow="hidden">
              <HStack spacing={3} align="center">
                <Box
                  p={2}
                  bg="rgba(240, 147, 251, 0.15)"
                  borderRadius="lg"
                  flexShrink={0}
                >
                  <Icon as={Zap} boxSize={6} color="#f093fb" />
                </Box>
                          
                <Heading
                  as="h3"
                  fontSize={{ base: 'lg', md: 'xl' }}
                  fontWeight="bold"
                  color="#f093fb"
                >
                  Tech Stack
                </Heading>
              </HStack>
                          
              {/* Marquee Section - Takes remaining space */}
              <VStack spacing={3} flex={1} justify="center" overflow="hidden">
                <Box w="100%" overflow="hidden">
                  <Marquee
                    gradient={false}
                    speed={30}
                    pauseOnHover={true}
                  >
                    {[
                      { icon: DiReact, color: '#61dafb' },
                      { icon: DiNodejsSmall, color: '#68a063' },
                      { icon: DiPython, color: '#3776ab' },
                      // { icon: DiExpress, color: '#f7df1e' },
                      { icon: DiMongodb, color: '#47a248' },
                      // { icon: DiPostgresql, color: '#336791' },
                      { icon: DiGit, color: '#f05032' },
                      // { icon: DiDocker, color: '#2496ed' },
                    ].map((tech, i) => (
                      <Box
                        key={i}
                        p={2}
                        bg="rgba(255, 255, 255, 0.05)"
                        borderRadius="lg"
                        border="1px solid"
                        borderColor="rgba(255, 255, 255, 0.1)"
                        mx={1.5}
                      >
                        <Icon as={tech.icon} boxSize={6} color={tech.color} />
                      </Box>
                    ))}
                  </Marquee>
                </Box>
                  
                <Box w="100%" overflow="hidden">
                  <Marquee
                    gradient={false}
                    speed={30}
                    direction="right"
                    pauseOnHover={true}
                  >
                    {[
                      { icon: DiHtml5, color: '#e34f26' },
                      { icon: DiCss3, color: '#1572b6' },
                      { icon: DiJavascript1, color: '#f7df1e' },
                      // { icon: DiSass, color: '#cc6699' },
                      { icon: DiNpm, color: '#cb3837' },
                      { icon: DiGithubBadge, color: '#fff' },
                      // { icon: DiRedis, color: '#dc382d' },
                      // { icon: DiFirebase, color: '#ffca28' },
                      { icon: DiVisualstudio, color: '#007acc' },
                    ].map((tech, i) => (
                      <Box
                        key={i}
                        p={2}
                        bg="rgba(255, 255, 255, 0.05)"
                        borderRadius="lg"
                        border="1px solid"
                        borderColor="rgba(255, 255, 255, 0.1)"
                        mx={1.5}
                      >
                        <Icon as={tech.icon} boxSize={6} color={tech.color} />
                      </Box>
                    ))}
                  </Marquee>
                </Box>
                  
                <Box w="100%" overflow="hidden">
                  <Marquee
                    gradient={false}
                    speed={30}
                    pauseOnHover={true}
                  >
                    {[
                      { icon: DiBootstrap, color: '#7952b3' },
                      // { icon: DiJqueryLogo, color: '#0769ad' },
                      { icon: DiLinux, color: '#fcc624' },
                      { icon: DiTerminal, color: '#4eaa25' },
                      // { icon: DiPhotoshop, color: '#31a8ff' },
                      // { icon: DiIllustrator, color: '#ff9a00' },
                    ].map((tech, i) => (
                      <Box
                        key={i}
                        p={2}
                        bg="rgba(255, 255, 255, 0.05)"
                        borderRadius="lg"
                        border="1px solid"
                        borderColor="rgba(255, 255, 255, 0.1)"
                        mx={1.5}
                      >
                        <Icon as={tech.icon} boxSize={6} color={tech.color} />
                      </Box>
                    ))}
                  </Marquee>
                </Box>
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
                  color="#4facfe"
                >
                  Experience
                </Heading>

                <VStack spacing={3} align="stretch">
                  <Box>
                    <Text fontSize="md" fontWeight="600" color="text.primary">
                      2+ Years
                    </Text>
                    <Text fontSize="sm" color="text.secondary">
                      Building Web Apps
                    </Text>
                  </Box>
                  <Box>
                    <Text fontSize="md" fontWeight="600" color="text.primary">
                      10+ Projects
                    </Text>
                    <Text fontSize="sm" color="text.secondary">
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
                  color="#68d391"
                >
                  My Mission
                </Heading>

                <Text
                  fontSize={{ base: 'sm', md: 'md' }}
                  color="text.secondary"
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
