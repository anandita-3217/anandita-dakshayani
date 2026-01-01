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
  Image,
} from '@chakra-ui/react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FaGraduationCap,
  FaAward,
  FaCertificate,
  FaCode,
  FaReact,
  FaNode,
  FaPython,
  FaDatabase,
  FaCloudDownloadAlt,
  FaExternalLinkAlt,
} from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const MotionBox = motion(Box);

const certificatesData = [
  {
    id: 1,
    type: 'degree',
    title: 'Bachelor of Technology',
    subtitle: 'Computer Science Engineering',
    institution: 'University Name',
    year: '2020 - 2024',
    grade: 'CGPA: 8.5/10',
    icon: FaGraduationCap,
    color: '#667eea',
    accentColor: '#764ba2',
    verified: true,
    skills: ['Data Structures', 'Algorithms', 'Web Dev', 'DBMS'],
  },
  {
    id: 2,
    type: 'certificate',
    title: 'React - The Complete Guide',
    subtitle: 'Advanced Web Development',
    institution: 'Udemy',
    year: '2024',
    duration: '40 hours',
    icon: FaReact,
    color: '#61dafb',
    accentColor: '#21a1c4',
    verified: true,
    skills: ['React', 'Hooks', 'Redux', 'Next.js'],
  },
  {
    id: 3,
    type: 'certificate',
    title: 'Full Stack Web Development',
    subtitle: 'MERN Stack Specialization',
    institution: 'Coursera',
    year: '2023',
    duration: '6 months',
    icon: FaCode,
    color: '#f093fb',
    accentColor: '#f5576c',
    verified: true,
    skills: ['MongoDB', 'Express', 'React', 'Node.js'],
  },
  {
    id: 4,
    type: 'certificate',
    title: 'JavaScript Algorithms',
    subtitle: 'Data Structures Masterclass',
    institution: 'freeCodeCamp',
    year: '2023',
    duration: '300 hours',
    icon: FaCode,
    color: '#4facfe',
    accentColor: '#00f2fe',
    verified: true,
    skills: ['Algorithms', 'DS', 'Problem Solving'],
  },
  {
    id: 5,
    type: 'certificate',
    title: 'Node.js Backend Development',
    subtitle: 'RESTful APIs & Microservices',
    institution: 'LinkedIn Learning',
    year: '2024',
    duration: '25 hours',
    icon: FaNode,
    color: '#68d391',
    accentColor: '#38a169',
    verified: true,
    skills: ['Node.js', 'Express', 'REST API', 'JWT'],
  },
  {
    id: 6,
    type: 'certificate',
    title: 'Database Design',
    subtitle: 'SQL & NoSQL Databases',
    institution: 'Udacity',
    year: '2023',
    duration: '3 months',
    icon: FaDatabase,
    color: '#fbd38d',
    accentColor: '#ed8936',
    verified: true,
    skills: ['SQL', 'MongoDB', 'PostgreSQL', 'Redis'],
  },
];

const CertificateCard = ({ cert, index, isSelected, onClick }) => {
  const { colorMode } = useColorMode();
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const isDegree = cert.type === 'degree';

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Continuous floating with unique timing
      gsap.to(el, {
        y: `${Math.sin(index * 1.5) * 15}px`,
        duration: 3 + index * 0.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Subtle rotation
      gsap.to(el, {
        rotation: Math.sin(index) * 2,
        duration: 4 + index * 0.3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });

    return () => ctx.revert();
  }, [index]);

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
      onClick={onClick}
      cursor="pointer"
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.23, 1, 0.32, 1],
      }}
    >
      <Box
        bg={colorMode === 'dark' ? 'rgba(255,255,255,0.02)' : 'white'}
        backdropFilter="blur(20px)"
        borderRadius="32px"
        borderWidth="2px"
        borderColor={
          isSelected
            ? cert.color
            : colorMode === 'dark'
            ? 'rgba(255,255,255,0.08)'
            : 'rgba(0,0,0,0.05)'
        }
        p={8}
        h="100%"
        minH={isDegree ? '320px' : '280px'}
        position="relative"
        overflow="hidden"
        transition="all 0.4s cubic-bezier(0.23, 1, 0.32, 1)"
        boxShadow={
          isSelected
            ? `0 30px 80px ${cert.color}40`
            : isHovered
            ? colorMode === 'dark'
              ? '0 20px 60px rgba(0,0,0,0.4)'
              : '0 20px 60px rgba(0,0,0,0.1)'
            : 'none'
        }
      >
        {/* Animated gradient background */}
        <Box
          position="absolute"
          top={-100}
          right={-100}
          w="300px"
          h="300px"
          bgGradient={`radial(circle, ${cert.color}, transparent)`}
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
            bgGradient={`linear(to-br, ${cert.color}, ${cert.accentColor})`}
            clipPath="polygon(100% 0, 100% 100%, 0 0)"
          />
        </Box>

        <VStack align="start" spacing={5} h="100%" justify="space-between" position="relative">
          {/* Header with icon and type badge */}
          <HStack justify="space-between" w="100%">
            <HStack spacing={3}>
              <Box
                p={3}
                bg={`${cert.color}15`}
                borderRadius="xl"
                transform={isHovered ? 'rotate(10deg) scale(1.1)' : 'rotate(0deg) scale(1)'}
                transition="transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)"
              >
                <Icon as={cert.icon} boxSize={isDegree ? 8 : 6} color={cert.color} />
              </Box>
              {isDegree && (
                <Badge
                  colorScheme="purple"
                  fontSize="xs"
                  px={3}
                  py={1}
                  borderRadius="full"
                  textTransform="uppercase"
                  fontWeight="bold"
                >
                  Degree
                </Badge>
              )}
            </HStack>
            
            {cert.verified && (
              <Badge
                colorScheme="green"
                fontSize="xs"
                px={2}
                py={1}
                borderRadius="full"
              >
                ✓ Verified
              </Badge>
            )}
          </HStack>

          {/* Content */}
          <VStack align="start" spacing={2} flex={1}>
            <Heading
              as="h3"
              size={isDegree ? 'lg' : 'md'}
              color="text.primary"
              lineHeight="1.3"
            >
              {cert.title}
            </Heading>
            
            <Text
              color={cert.color}
              fontSize="sm"
              fontWeight="semibold"
            >
              {cert.subtitle}
            </Text>

            <HStack spacing={2} fontSize="sm" color="text.secondary">
              <Text fontWeight="medium">{cert.institution}</Text>
              <Text>•</Text>
              <Text>{cert.year}</Text>
            </HStack>

            {cert.grade && (
              <Badge
                bg={colorMode === 'dark' ? 'whiteAlpha.100' : 'blackAlpha.50'}
                color="text.primary"
                fontSize="xs"
                px={3}
                py={1}
                borderRadius="full"
              >
                {cert.grade}
              </Badge>
            )}

            {cert.duration && (
              <HStack spacing={2} fontSize="xs" color="text.muted">
                <Icon as={FaCloudDownloadAlt} />
                <Text>{cert.duration}</Text>
              </HStack>
            )}
          </VStack>

          {/* Skills tags */}
          <Flex flexWrap="wrap" gap={2} w="100%">
            {cert.skills.slice(0, 4).map((skill, i) => (
              <Badge
                key={i}
                fontSize="10px"
                px={2}
                py={1}
                borderRadius="md"
                bg={colorMode === 'dark' ? 'whiteAlpha.100' : 'blackAlpha.50'}
                color="text.secondary"
                borderWidth="1px"
                borderColor={colorMode === 'dark' ? 'whiteAlpha.100' : 'transparent'}
              >
                {skill}
              </Badge>
            ))}
          </Flex>

          {/* View certificate hint */}
          {isHovered && (
            <MotionBox
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              position="absolute"
              bottom={4}
              right={4}
            >
              <HStack
                spacing={1}
                fontSize="xs"
                color={cert.color}
                fontWeight="semibold"
              >
                <Text>View Details</Text>
                <Icon as={FaExternalLinkAlt} boxSize={3} />
              </HStack>
            </MotionBox>
          )}
        </VStack>

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
      </Box>
    </MotionBox>
  );
};

const Certificates = () => {
  const { colorMode } = useColorMode();
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const [selectedCert, setSelectedCert] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const chars = titleRef.current.querySelectorAll('.char');
      
      gsap.from(chars, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 85%',
        },
        y: 120,
        opacity: 0,
        rotateX: -90,
        stagger: 0.04,
        duration: 1.2,
        ease: 'back.out(2)',
      });

      // Animate stats
      const stats = sectionRef.current.querySelectorAll('.stat');
      gsap.from(stats, {
        scrollTrigger: {
          trigger: stats[0],
          start: 'top 90%',
        },
        scale: 0,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'back.out(2)',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCardClick = (certId) => {
    setSelectedCert(selectedCert === certId ? null : certId);
  };

  const titleText = "Credentials & Achievements";
  const degree = certificatesData.filter(c => c.type === 'degree');
  const certificates = certificatesData.filter(c => c.type === 'certificate');

  return (
    <Box
      ref={sectionRef}
      py={{ base: 20, md: 32 }}
      bg="transeparent"
      position="relative"
      overflow="hidden"
    >
      {/* Animated background elements */}
      <Box
        position="absolute"
        top="10%"
        left="5%"
        w="500px"
        h="500px"
        bgGradient="radial(circle, purple.400, transparent)"
        opacity={colorMode === 'dark' ? 0.1 : 0.05}
        filter="blur(100px)"
        animation="float 25s ease-in-out infinite"
        pointerEvents="none"
      />
      <Box
        position="absolute"
        bottom="10%"
        right="5%"
        w="600px"
        h="600px"
        bgGradient="radial(circle, blue.400, transparent)"
        opacity={colorMode === 'dark' ? 0.1 : 0.05}
        filter="blur(100px)"
        animation="float 30s ease-in-out infinite reverse"
        pointerEvents="none"
      />

      <Container maxW="container.xl" position="relative" zIndex={1}>
        <VStack spacing={16} align="stretch">
          {/* Title Section */}
          <VStack spacing={6} textAlign="center">
            <Box ref={titleRef}>
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
                    color={
                      char === '&' 
                        ? 'brand.400'
                        : 'text.primary'
                    }
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </Box>
                ))}
              </Heading>
            </Box>

            <Text
              fontSize="lg"
              color="text.secondary"
              maxW="600px"
            >
              My academic journey and professional certifications
            </Text>

            {/* Stats */}
            <HStack spacing={8} pt={4} flexWrap="wrap" justify="center">
              <VStack className="stat" spacing={1}>
                <Heading size="xl" color="brand.400">
                  {degree.length}
                </Heading>
                <Text fontSize="sm" color="text.secondary">
                  Degree{degree.length !== 1 ? 's' : ''}
                </Text>
              </VStack>
              <VStack className="stat" spacing={1}>
                <Heading size="xl" color="purple.400">
                  {certificates.length}
                </Heading>
                <Text fontSize="sm" color="text.secondary">
                  Certificates
                </Text>
              </VStack>
              <VStack className="stat" spacing={1}>
                <Heading size="xl" color="blue.400">
                  {certificatesData.filter(c => c.verified).length}
                </Heading>
                <Text fontSize="sm" color="text.secondary">
                  Verified
                </Text>
              </VStack>
            </HStack>
          </VStack>

          {/* Degree Section */}
          {degree.length > 0 && (
            <VStack spacing={6} align="stretch">
              <HStack spacing={3}>
                <Box w="40px" h="2px" bg="brand.400" />
                <Heading size="md" color="text.primary">
                  Education
                </Heading>
              </HStack>
              
              <Box
                display="grid"
                gridTemplateColumns={{
                  base: '1fr',
                  lg: 'repeat(2, 1fr)',
                }}
                gap={6}
              >
                {degree.map((cert, index) => (
                  <CertificateCard
                    key={cert.id}
                    cert={cert}
                    index={index}
                    isSelected={selectedCert === cert.id}
                    onClick={() => handleCardClick(cert.id)}
                  />
                ))}
              </Box>
            </VStack>
          )}

          {/* Certificates Section */}
          <VStack spacing={6} align="stretch">
            <HStack spacing={3}>
              <Box w="40px" h="2px" bg="purple.400" />
              <Heading size="md" color="text.primary">
                Professional Certifications
              </Heading>
            </HStack>
            
            <Box
              display="grid"
              gridTemplateColumns={{
                base: '1fr',
                md: 'repeat(2, 1fr)',
                lg: 'repeat(3, 1fr)',
              }}
              gap={6}
            >
              {certificates.map((cert, index) => (
                <CertificateCard
                  key={cert.id}
                  cert={cert}
                  index={index + degree.length}
                  isSelected={selectedCert === cert.id}
                  onClick={() => handleCardClick(cert.id)}
                />
              ))}
            </Box>
          </VStack>

          {/* Expanded Detail View */}
          <AnimatePresence>
            {selectedCert !== null && (
              <MotionBox
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              >
                {(() => {
                  const cert = certificatesData.find(c => c.id === selectedCert);
                  return (
                    <Box
                      bg={colorMode === 'dark' ? 'rgba(255,255,255,0.03)' : 'white'}
                      backdropFilter="blur(30px)"
                      borderRadius="3xl"
                      p={10}
                      borderWidth="2px"
                      borderColor={cert.color}
                      position="relative"
                      overflow="hidden"
                      boxShadow={`0 40px 100px ${cert.color}30`}
                    >
                      <Box
                        position="absolute"
                        top={-200}
                        right={-200}
                        w="500px"
                        h="500px"
                        bgGradient={`radial(circle, ${cert.color}, transparent)`}
                        opacity={0.2}
                        filter="blur(60px)"
                        pointerEvents="none"
                      />

                      <VStack spacing={6} align="start" position="relative">
                        <HStack spacing={4}>
                          <Box
                            p={4}
                            bg={`${cert.color}20`}
                            borderRadius="2xl"
                          >
                            <Icon as={cert.icon} boxSize={12} color={cert.color} />
                          </Box>
                          <VStack align="start" spacing={1}>
                            <Heading size="xl" color="text.primary">
                              {cert.title}
                            </Heading>
                            <Text fontSize="lg" color={cert.color} fontWeight="semibold">
                              {cert.subtitle}
                            </Text>
                          </VStack>
                        </HStack>

                        <HStack spacing={6} flexWrap="wrap">
                          <VStack align="start" spacing={1}>
                            <Text fontSize="sm" color="text.muted">Institution</Text>
                            <Text fontWeight="semibold" color="text.primary">
                              {cert.institution}
                            </Text>
                          </VStack>
                          <VStack align="start" spacing={1}>
                            <Text fontSize="sm" color="text.muted">Year</Text>
                            <Text fontWeight="semibold" color="text.primary">
                              {cert.year}
                            </Text>
                          </VStack>
                          {cert.duration && (
                            <VStack align="start" spacing={1}>
                              <Text fontSize="sm" color="text.muted">Duration</Text>
                              <Text fontWeight="semibold" color="text.primary">
                                {cert.duration}
                              </Text>
                            </VStack>
                          )}
                          {cert.grade && (
                            <VStack align="start" spacing={1}>
                              <Text fontSize="sm" color="text.muted">Grade</Text>
                              <Text fontWeight="semibold" color="text.primary">
                                {cert.grade}
                              </Text>
                            </VStack>
                          )}
                        </HStack>

                        <Box>
                          <Text fontSize="sm" color="text.muted" mb={3}>
                            Skills Acquired
                          </Text>
                          <Flex flexWrap="wrap" gap={3}>
                            {cert.skills.map((skill, i) => (
                              <Badge
                                key={i}
                                fontSize="sm"
                                px={4}
                                py={2}
                                borderRadius="lg"
                                bg={`${cert.color}15`}
                                color={cert.color}
                                borderWidth="1px"
                                borderColor={`${cert.color}30`}
                                fontWeight="semibold"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </Flex>
                        </Box>
                      </VStack>
                    </Box>
                  );
                })()}
              </MotionBox>
            )}
          </AnimatePresence>
        </VStack>
      </Container>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(40px, -40px) rotate(3deg); }
          66% { transform: translate(-30px, 30px) rotate(-3deg); }
        }
      `}</style>
    </Box>
  );
};

export default Certificates;