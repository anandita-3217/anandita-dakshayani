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
import { Code, Brain, Zap, Link, UserRound, ListChecks ,MailOpen, Copy,CheckCheck  } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter, } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
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
const MotionGridItem = motion(GridItem);


// Copyable Email Component
const CopyableEmail = () => {
  const [copied, setCopied] = useState(false);
  const email = 'ananditad21@gmail.com';

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Box
      as="button"
      onClick={handleCopy}
      bg="rgba(255, 255, 255, 0.05)"
      border="2px solid"
      borderColor={copied ? '#4facfe' : 'rgba(255, 255, 255, 0.1)'}
      borderRadius="lg"
      p={4}
      cursor="pointer"
      transition="all 0.3s"
      position="relative"
      overflow="hidden"
      w="100%"
      _hover={{
        borderColor: '#4facfe',
        bg: "rgba(79, 172, 254, 0.15)",
        transform: 'translateY(-2px)',
      }}
      _active={{
        transform: 'translateY(0)',
      }}
    >
      {/* Email or Copied Text */}
      <Box position="relative" zIndex={1}>
        {!copied ? (
          <HStack spacing={3} justify="center" flexWrap="wrap">
            <Icon as={Copy} boxSize={5} color="#4facfe" flexShrink={0} />
            <Text
              fontSize={{ base: 'xs', sm: 'sm', md: 'md' }}
              fontWeight="600"
              color="text.primary"
              wordBreak="break-all"
              textAlign="center"
            >
              {email}
            </Text>
          </HStack>
        ) : (
          <MotionBox
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <HStack spacing={2} justify="center">
              <Icon as={CheckCheck} boxSize={5} color="#4facfe" />
              <Text
                fontSize={{ base: 'sm', md: 'md' }}
                fontWeight="600"
                color="#4facfe"
              >
                Copied to clipboard
              </Text>
            </HStack>
          </MotionBox>
        )}
      </Box>
    </Box>
  );
};
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
  // const x = useMotionValue(0);
  // const y = useMotionValue(0);
  // const rotateX = useTransform(y, [-100, 100], [8, -8]);
  // const rotateY = useTransform(x, [-100, 100], [-8, 8]);

  // const handleMouseMove = (e) => {
  //   if (!cardRef.current) return;
  //   const rect = cardRef.current.getBoundingClientRect();
  //   const centerX = rect.left + rect.width / 2;
  //   const centerY = rect.top + rect.height / 2;
  //   x.set(e.clientX - centerX);
  //   y.set(e.clientY - centerY);
  // };

  const handleMouseLeave = () => {
    // x.set(0);
    // y.set(0);
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
      // onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      variants={cardVariants}
      // style={{
      //   rotateX,
      //   rotateY,
      //   transformStyle: 'preserve-3d',
      // }}
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
  const [headerRef, headerInView] = useInView({ 
    triggerOnce: false,
    threshold: 0.2
  });

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
        
          <VStack spacing={6} textAlign="center" mb={12}>
  <MotionBox
    ref={headerRef}
    initial="hidden"
    animate={headerInView ? "visible" : "hidden"}
    variants={headerVariants}
  >
    <Heading
      as="h2"
      fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
      fontWeight="bold"
      color="text.primary"
    >
      {"About Me".split('').map((char, i) => (
        <motion.span
          key={i}
          style={{
            display: 'inline-block',
            transformOrigin: 'center bottom',
            perspective: '1000px',
            color: char === 'M' || char === 'e' ? '#14b8a6' : 'inherit'
          }}
          initial={{ opacity: 0, y: 50, rotateX: -90 }}
          animate={headerInView ? { 
            opacity: 1, 
            y: 0, 
            rotateX: 0 
          } : { 
            opacity: 0, 
            y: 50, 
            rotateX: -90 
          }}
          transition={{
            duration: 0.5,
            delay: i * 0.08,
            ease: [0.23, 1, 0.32, 1]
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </Heading>
  </MotionBox>
  
  <MotionBox
    as={Text}
    fontSize="lg"
    color="text.secondary"
    maxW="600px"
    initial={{ opacity: 0, y: 20 }}
    animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
    transition={{ duration: 0.6, delay: 0.8 }}
  >
    Full-stack developer and ML enthusiast crafting innovative solutions
  </MotionBox>
</VStack>
          <Grid
            templateColumns={{
              base: "1fr",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)"
            }}
            templateRows={{
              base: "auto",
              lg: "repeat(5, 1fr)"
            }}
            gap={4}
            w="100%"
            h={{ base: "auto", lg: "100vh" }}  
          >
            {/* Top Left - Introduction */}
            <BentoCard rowSpan={{ base: 1, lg: 2 }} colSpan={{ base: 1, md: 2, lg: 1 }}  index={1} color="#14b8a6" accentColor="#0d9488">
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
              </VStack>
            </BentoCard>
            {/* Middle Top - Currently Learning */}
            <BentoCard rowSpan={{ base: 1, md: 1, lg: 3 }}  colSpan={{ base: 1, md: 2, lg: 1 }}  index={1} color="#667eea" accentColor="#764ba2">
              <VStack spacing={4} align="stretch" h="100%" justify="space-between">
                <Box
                  p={3}
                  bg="rgba(102, 126, 234, 0.15)"
                  borderRadius="xl"
                  w="fit-content"
                >
                  <Icon as={Brain} boxSize={8} color="#764ba2" />
                </Box>
                
                <VStack spacing={3} align="stretch" flex={1}>
                  <Heading
                    as="h3"
                    fontSize={{ base: 'xl', md: '2xl' }}
                    fontWeight="bold"
                    color="#764ba2"
                  >
                    🎯 Currently Mastering
                  </Heading>

                  <Box
                    p={4}
                    bg="rgba(102, 126, 234, 0.1)"
                    borderRadius="xl"
                    border="1px solid"
                    borderColor="rgba(102, 126, 234, 0.2)"
                  >
                    <VStack spacing={2} align="stretch">
                      <Text
                        fontSize={{ base: 'md', md: 'lg' }}
                        fontWeight="600"
                        color="#667eea"
                      >
                        Deep Learning Specialization
                      </Text>
                      <Text
                        fontSize={{ base: 'xs', md: 'sm' }}
                        color="text.secondary"
                      >
                        by Andrew Ng - Coursera
                      </Text>
                    </VStack>
                  </Box>

                  <Text
                    fontSize={{ base: 'sm', md: 'md' }}
                    color="text.primary"
                    lineHeight="1.6"
                  >
                    Building neural networks and computer vision models to solve real-world problems
                  </Text>

                  <HStack spacing={2} pt={2}>
                    <Box
                      px={3}
                      py={1}
                      bg="rgba(102, 126, 234, 0.2)"
                      borderRadius="full"
                      border="1px solid"
                      borderColor="rgba(102, 126, 234, 0.3)"
                    >
                      <Text fontSize="xs" fontWeight="600" color="#667eea">
                        📅 Week 3 of 5
                      </Text>
                    </Box>
                  </HStack>
                </VStack>
              </VStack>
            </BentoCard>
            {/* Top Right - Socials */}
            <BentoCard rowSpan={{ base: 1, md: 1, lg: 2 }}  colSpan={{ base: 1, md: 2, lg: 1 }} index={5} color="#68d391" accentColor="#38a169">
              <VStack spacing={3} align="stretch" h="100%" justify="center">
                <Box
                  p={3}
                  bg="rgba(104, 211, 145, 0.15)"
                  borderRadius="xl"
                  w="fit-content"
                >
                  <Icon as={Link} boxSize={7} color="#68d391" />
                </Box>
                <Heading
                  as="h3"
                  fontSize={{ base: 'lg', md: 'xl' }}
                  fontWeight="bold"
                  color="#68d391"
                >
                  Let's Connect!
                </Heading>
                    <HStack spacing={3} justify="flex-start" flexWrap="wrap">
                {[
                  {
                    name: 'GitHub',
                    icon: FaGithub,
                    url: 'https://github.com/anandita-3217',
                    color: '#68d391',
                  },
                  {
                    name: 'LinkedIn',
                    icon: FaLinkedin,
                    url: 'https://linkedin.com/in/yourusername',
                    color: '#68d391',
                  },
                ].map((social, i) => (
                  <Box
                    key={i}
                    as="a"
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    w="40px"
                    h="40px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    bg="rgba(255, 255, 255, 0.05)"
                    borderRadius="full"
                    border="1px solid"
                    borderColor="rgba(255, 255, 255, 0.1)"
                    transition="all 0.3s"
                    cursor="pointer"
                    title={social.name}
                    _hover={{
                      borderColor: social.color,
                      bg: `${social.color}15`,
                      transform: 'scale(1.15))',
                    }}
            >
          <Box color={social.color}>
            <social.icon />
          </Box>
        </Box>
      ))}
    </HStack>
              </VStack>
            </BentoCard>
          
          {/* Bottom Left - Copyable Email */}
          <BentoCard rowSpan={{ base: 1, md: 1, lg: 3 }}  colSpan={{ base: 1, md: 1, lg: 1 }}  index={4} color="#4facfe" accentColor="#00f2fe">
            <VStack spacing={3} align="stretch" h="100%" justify="center">
                <Box
                  p={3}
                  bg="rgba(79, 172, 254, 0.15)"
                  borderRadius="xl"
                  w="fit-content"
                >
                  <Icon as={MailOpen} boxSize={7} color="#4facfe" />
                </Box>
                <Heading
                  as="h3"
                  fontSize={{ base: 'lg', md: 'xl' }}
                  fontWeight="bold"
                  color="#4facfe"
                >
                  Write To Me!
                </Heading>
                    <CopyableEmail/>
              </VStack>
            </BentoCard>
            {/* Bottom Right - Tech Stack */}
          <BentoCard rowSpan={{ base: 1, md: 1, lg: 3 }} colSpan={{ base: 1, md: 1, lg: 1 }}  index={0} color="#f093fb" accentColor="#f5576c">
            <VStack spacing={2} align="stretch" h="100%" overflow="hidden" justify="space-between">
              <Box flex={1}/>
              <VStack spacing={3} align="stretch" mb={3}>
                <Box
                  p={2}
                  bg="rgba(240, 147, 251, 0.15)"
                  borderRadius="lg"
                  flexShrink={0} w="fit-content"
                >
                  <Icon as={Zap} boxSize={9} color="#f093fb" />
                </Box>
                          
                <Heading
                  as="h3"
                  fontSize={{ base: 'lg', md: 'xl' }}
                  fontWeight="bold"
                  color="#f093fb"
                >
                  Tech Stack
                </Heading>
              </VStack>
                          
              {/* Marquee Section - Takes remaining space */}
              <VStack spacing={2} justify="flex-end" overflow="hidden">
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
                      { icon: DiMongodb, color: '#47a248' },
                      { icon: DiGit, color: '#f05032' },
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
                      { icon: DiNpm, color: '#cb3837' },
                      { icon: DiGithubBadge, color: '#fff' },
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
                      { icon: DiLinux, color: '#fcc624' },
                      { icon: DiTerminal, color: '#4eaa25' },
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
            {/* Bottom Middle - Monthly Goals */}
            
            <BentoCard rowSpan={{ base: 1, md: 1, lg: 2 }}  colSpan={{ base: 1, md: 2, lg: 1 }}  index={2} color="#667eea" accentColor="#764ba2">
              <VStack spacing={4} align="stretch" h="100%" justify="space-between">
                <Box
                  p={3}
                  bg="#8b42d544"
                  borderRadius="xl"
                  w="fit-content"
                >
                  <Icon as={ListChecks} boxSize={7} color="#8b42d5ff" />
                </Box>
                <Heading
                  as="h3"
                  fontSize={{ base: 'lg', md: 'xl' }}
                  fontWeight="bold"
                  color="#8b42d5ff"
                >
                  Current Goals
                </Heading>

                <VStack spacing={3} align="stretch" flex={1}>
                  {[
                    { text: 'Complete ML certification', checked: true },
                    { text: 'Build AI-powered chat application', checked: false },
                    { text: 'Contribute to React documentation', checked: false },
                  ].map((goal, i) => (
                    <HStack key={i} spacing={3} align="flex-start">
                      <Box
                        mt={1}
                        w="18px"
                        h="18px"
                        borderRadius="md"
                        border="2px solid"
                        borderColor={goal.checked ? "#667eea" : "rgba(255, 255, 255, 0.2)"}
                        bg={goal.checked ? "rgba(102, 126, 234, 0.2)" : "transparent"}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        flexShrink={0}
                        transition="all 0.3s"
                      >
                        {goal.checked && (
                          <Box
                            w="8px"
                            h="8px"
                            bg="#667eea"
                            borderRadius="sm"
                          />
                        )}
                      </Box>
                      <Text
                        fontSize={{ base: 'sm', md: 'md' }}
                        color={goal.checked ? "text.secondary" : "text.primary"}
                        textDecoration={goal.checked ? "line-through" : "none"}
                        opacity={goal.checked ? 0.7 : 1}
                      >
                        {goal.text}
                      </Text>
                    </HStack>
                  ))}
                </VStack>
              </VStack>
            </BentoCard>
            
          </Grid>
        </MotionBox>
      </Container>
    </Box>
  );
}

export default About;
