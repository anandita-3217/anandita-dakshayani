import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Icon,
  useColorMode,
  Badge,
  Flex,
} from '@chakra-ui/react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FaCode,
  FaGamepad,
  FaBook,
  FaMusic,
  FaCamera,
  FaPalette,
  FaChess,
  FaMountain,
} from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const hobbiesData = [
  {
    icon: FaCode,
    title: 'Coding',
    emoji: '💻',
    description: 'Building projects and learning new technologies',
    tags: ['React', 'JavaScript', 'Web Dev'],
    gradient: 'linear(to-br, #667eea, #764ba2)',
  },
  {
    icon: FaGamepad,
    title: 'Gaming',
    emoji: '🎮',
    description: 'Strategy games and immersive storytelling',
    tags: ['RPG', 'Strategy', 'Indie'],
    gradient: 'linear(to-br, #f093fb, #f5576c)',
  },
  {
    icon: FaBook,
    title: 'Reading',
    emoji: '📚',
    description: 'Sci-fi novels and tech articles',
    tags: ['Sci-Fi', 'Tech', 'Philosophy'],
    gradient: 'linear(to-br, #4facfe, #00f2fe)',
  },
  {
    icon: FaMusic,
    title: 'Music',
    emoji: '🎵',
    description: 'Lo-fi beats and electronic soundscapes',
    tags: ['Lo-Fi', 'EDM', 'Jazz'],
    gradient: 'linear(to-br, #fa709a, #fee140)',
  },
  {
    icon: FaCamera,
    title: 'Photography',
    emoji: '📷',
    description: 'Street photography and golden hour shots',
    tags: ['Street', 'Landscape', 'Minimal'],
    gradient: 'linear(to-br, #30cfd0, #330867)',
  },
  {
    icon: FaPalette,
    title: 'Design',
    emoji: '🎨',
    description: 'UI/UX and creative experiments',
    tags: ['UI/UX', 'Motion', 'Branding'],
    gradient: 'linear(to-br, #a8edea, #fed6e3)',
  },
  {
    icon: FaChess,
    title: 'Chess',
    emoji: '♟️',
    description: 'Strategic thinking and pattern recognition',
    tags: ['Strategy', 'Logic', 'Tactics'],
    gradient: 'linear(to-br, #ff9a9e, #fecfef)',
  },
  {
    icon: FaMountain,
    title: 'Hiking',
    emoji: '⛰️',
    description: 'Exploring nature and clearing the mind',
    tags: ['Nature', 'Fitness', 'Adventure'],
    gradient: 'linear(to-br, #ffecd2, #fcb69f)',
  },
];

const FloatingCard = ({ hobby, index, isActive, onClick }) => {
  const { colorMode } = useColorMode();
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        y: `${Math.sin(index) * 20}px`,
        duration: 2 + index * 0.3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });

    return () => ctx.revert();
  }, [index]);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

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
      position="relative"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      onClick={onClick}
      cursor="pointer"
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.23, 1, 0.32, 1],
      }}
    >
      <Box
        bg={colorMode === 'dark' ? 'rgba(255,255,255,0.03)' : 'white'}
        backdropFilter="blur(10px)"
        borderRadius="24px"
        borderWidth="1px"
        borderColor={
          isActive
            ? 'brand.400'
            : colorMode === 'dark'
            ? 'rgba(255,255,255,0.1)'
            : 'rgba(0,0,0,0.06)'
        }
        p={6}
        h="180px"
        position="relative"
        overflow="hidden"
        transition="all 0.3s cubic-bezier(0.23, 1, 0.32, 1)"
        transform={isActive ? 'scale(1.02)' : 'scale(1)'}
        boxShadow={
          isActive
            ? colorMode === 'dark'
              ? '0 20px 60px rgba(20, 184, 166, 0.3)'
              : '0 20px 60px rgba(20, 184, 166, 0.2)'
            : 'none'
        }
      >
        {/* Gradient overlay on hover */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bgGradient={hobby.gradient}
          opacity={isHovered ? 0.15 : 0}
          transition="opacity 0.4s"
          pointerEvents="none"
        />

        {/* Content */}
        <VStack align="start" spacing={3} h="100%" justify="space-between" position="relative">
          <HStack spacing={3} align="center">
            <Text fontSize="3xl" lineHeight={1}>
              {hobby.emoji}
            </Text>
            <Heading as="h3" size="md" color="text.primary">
              {hobby.title}
            </Heading>
          </HStack>

          <Text
            color="text.secondary"
            fontSize="sm"
            lineHeight="1.6"
            noOfLines={2}
          >
            {hobby.description}
          </Text>

          <HStack spacing={2} flexWrap="wrap">
            {hobby.tags.slice(0, 2).map((tag, i) => (
              <Badge
                key={i}
                fontSize="10px"
                px={2}
                py={1}
                borderRadius="full"
                bg={colorMode === 'dark' ? 'whiteAlpha.100' : 'blackAlpha.50'}
                color="text.secondary"
              >
                {tag}
              </Badge>
            ))}
          </HStack>
        </VStack>

        {/* Subtle corner accent */}
        <Box
          position="absolute"
          bottom={0}
          right={0}
          w="60px"
          h="60px"
          bgGradient={hobby.gradient}
          opacity={0.1}
          borderRadius="24px 0 24px 0"
        />
      </Box>
    </MotionBox>
  );
};

const Hobbies = () => {
  const { colorMode } = useColorMode();
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [expandedHobby, setExpandedHobby] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const chars = titleRef.current.querySelectorAll('.char');
      
      gsap.from(chars, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 85%',
        },
        y: 100,
        opacity: 0,
        rotateX: -90,
        stagger: 0.03,
        duration: 1,
        ease: 'back.out(1.7)',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCardClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
    setExpandedHobby(expandedHobby === index ? null : index);
  };

  const titleText = "What I Love Doing";
  
  return (
    <Box
      ref={sectionRef}
      py={{ base: 20, md: 32 }}
      bg="bg.primary"
      position="relative"
      overflow="hidden"
    >
      {/* Animated mesh gradient background */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        opacity={colorMode === 'dark' ? 0.15 : 0.08}
        pointerEvents="none"
      >
        <Box
          position="absolute"
          top="20%"
          left="10%"
          w="600px"
          h="600px"
          bgGradient="radial(circle, brand.400, transparent)"
          filter="blur(100px)"
          animation="float 20s ease-in-out infinite"
        />
        <Box
          position="absolute"
          bottom="20%"
          right="10%"
          w="500px"
          h="500px"
          bgGradient="radial(circle, purple.400, transparent)"
          filter="blur(100px)"
          animation="float 25s ease-in-out infinite reverse"
        />
      </Box>

      <Container maxW="container.xl" position="relative" zIndex={1}>
        <VStack spacing={16} align="stretch">
          {/* Creative Title */}
          <Box textAlign="center" ref={titleRef}>
            <Heading
              as="h2"
              fontSize={{ base: '4xl', md: '6xl' }}
              fontWeight="black"
              letterSpacing="tight"
              lineHeight={1.2}
            >
              {titleText.split('').map((char, i) => (
                <Box
                  as="span"
                  key={i}
                  className="char"
                  display="inline-block"
                  style={{ perspective: '1000px' }}
                  color={i >= titleText.indexOf('Love') && i < titleText.indexOf('Love') + 4 
                    ? 'brand.400' 
                    : 'text.primary'
                  }
                >
                  {char === ' ' ? '\u00A0' : char}
                </Box>
              ))}
            </Heading>
            <Text
              mt={4}
              fontSize="lg"
              color="text.secondary"
              maxW="500px"
              mx="auto"
            >
              Click on a card to explore more
            </Text>
          </Box>

          {/* Bento-style Grid */}
          <Box
            display="grid"
            gridTemplateColumns={{ 
              base: '1fr',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(4, 1fr)',
            }}
            gap={6}
            gridAutoRows="180px"
          >
            {hobbiesData.map((hobby, index) => (
              <Box
                key={index}
                gridColumn={{ 
                  base: 'span 1',
                  lg: index === 0 || index === 7 ? 'span 2' : 'span 1'
                }}
              >
                <FloatingCard
                  hobby={hobby}
                  index={index}
                  isActive={activeIndex === index}
                  onClick={() => handleCardClick(index)}
                />
              </Box>
            ))}
          </Box>

          {/* Expanded Detail View */}
          <AnimatePresence>
            {expandedHobby !== null && (
              <MotionBox
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              >
                <Box
                  bg={colorMode === 'dark' ? 'whiteAlpha.50' : 'white'}
                  backdropFilter="blur(20px)"
                  borderRadius="3xl"
                  p={8}
                  borderWidth="1px"
                  borderColor={colorMode === 'dark' ? 'whiteAlpha.100' : 'blackAlpha.100'}
                  bgGradient={hobbiesData[expandedHobby].gradient}
                  position="relative"
                  overflow="hidden"
                >
                  <Box
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    bg={colorMode === 'dark' ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.9)'}
                    backdropFilter="blur(10px)"
                  />
                  
                  <VStack spacing={4} align="start" position="relative">
                    <HStack spacing={4}>
                      <Text fontSize="5xl">{hobbiesData[expandedHobby].emoji}</Text>
                      <Heading size="xl" color="text.primary">
                        {hobbiesData[expandedHobby].title}
                      </Heading>
                    </HStack>
                    
                    <Text fontSize="lg" color="text.secondary">
                      {hobbiesData[expandedHobby].description}
                    </Text>
                    
                    <HStack spacing={2} flexWrap="wrap" pt={2}>
                      {hobbiesData[expandedHobby].tags.map((tag, i) => (
                        <Badge
                          key={i}
                          fontSize="sm"
                          px={4}
                          py={2}
                          borderRadius="full"
                          bg={colorMode === 'dark' ? 'whiteAlpha.200' : 'blackAlpha.100'}
                          color="text.primary"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </HStack>
                  </VStack>
                </Box>
              </MotionBox>
            )}
          </AnimatePresence>
        </VStack>
      </Container>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -30px) rotate(5deg); }
          66% { transform: translate(-20px, 20px) rotate(-5deg); }
        }
      `}</style>
    </Box>
  );
};

export default Hobbies;