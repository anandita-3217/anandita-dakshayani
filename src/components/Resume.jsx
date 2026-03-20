import React, { useRef } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  Grid,
  Badge,
  useColorModeValue,
} from '@chakra-ui/react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import {
  Download,
  Briefcase,
  GraduationCap,
  Award,
  Code,
  Calendar,
  MapPin,
} from 'lucide-react';

const MotionBox = motion.create(Box);

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------
const personalInfo = {
  name: 'Anandita',
  title: 'Full-Stack Developer | ML Explorer',
  email: 'your@email.com',
  location: 'Your City, Country',
  summary:
    'Passionate developer building AI-powered web applications with React, Django, and Python. Turning ideas into elegant, functional solutions.',
};

const experience = [
  {
    id: 1,
    role: 'Senior Full-Stack Developer',
    company: 'Tech Company Inc.',
    location: 'Remote',
    period: 'Jan 2024 - Present',
    description:
      'Leading development of AI-powered web applications using React and Django.',
    achievements: [
      'Built scalable microservices handling 1M+ requests/day',
      'Implemented ML models for predictive analytics',
      'Mentored 3 junior developers',
    ],
    color: '#6366f1',
  },
  {
    id: 2,
    role: 'Full-Stack Developer',
    company: 'StartupXYZ',
    location: 'Hybrid',
    period: 'Jun 2022 - Dec 2023',
    description:
      'Developed and maintained customer-facing web applications.',
    achievements: [
      'Reduced page load time by 60% through optimization',
      'Integrated third-party APIs and payment gateways',
      'Led migration from monolith to microservices',
    ],
    color: '#10b981',
  },
  {
    id: 3,
    role: 'Junior Developer',
    company: 'Digital Agency',
    location: 'On-site',
    period: 'Jan 2021 - May 2022',
    description:
      'Built responsive websites and web applications for clients.',
    achievements: [
      'Delivered 15+ client projects on time',
      'Implemented responsive design systems',
      'Collaborated with designers and stakeholders',
    ],
    color: '#ec4899',
  },
];

const education = [
  {
    id: 1,
    role: 'Bachelor of Technology in Computer Science',
    company: 'Jawaharlal Nehru Technological University',
    location: 'Visakhapatnam, India',
    period: '2019 - 2023',
    description: 'CGPA: 8.5/10',
    color: '#f59e0b',
  },
];

const skills = {
  'Frontend': ['React', 'Next.js', 'TypeScript', 'Chakra UI', 'Tailwind CSS', 'Framer Motion'],
  'Backend': ['Node.js', 'Django', 'Python', 'Express.js', 'REST APIs', 'GraphQL'],
  'Database': ['MongoDB', 'PostgreSQL', 'Firebase', 'Redis'],
  'ML/AI': ['TensorFlow', 'PyTorch', 'Scikit-learn', 'OpenAI API'],
  'DevOps': ['Docker', 'AWS', 'Vercel', 'GitHub Actions', 'CI/CD'],
  'Tools': ['Git', 'VS Code', 'Postman', 'Figma', 'Jira'],
};

const certifications = [
  {
    id: 1,
    title: 'AWS Certified Developer',
    issuer: 'Amazon Web Services',
    date: '2023',
    color: '#6366f1',
  },
  {
    id: 2,
    title: 'Machine Learning Specialization',
    issuer: 'Coursera',
    date: '2022',
    color: '#10b981',
  },
];

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
// Timeline Item Component - Continuum Style with Scroll Animation
// ---------------------------------------------------------------------------
const TimelineItem = ({ item, index, isLast }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-50px' });

  const { r, g, b } = hexToRgb(item.color);
  const rgba = (a) => `rgba(${r},${g},${b},${a})`;

  const textPrimary = useColorModeValue('text.primary', 'white');
  const textSecondary = useColorModeValue('text.secondary', 'text.secondary');

  // Scroll-based animations for the timeline line
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Line grows from top to bottom as you scroll
  const lineHeight = useTransform(scrollYProgress, [0, 0.5], ['0%', '100%']);
  
  // Dot scales in when visible
  const dotScale = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  
  // Card slides and fades in
  const cardX = useTransform(scrollYProgress, [0, 0.4], [-50, 0]);
  const cardOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <MotionBox
      ref={ref}
      position="relative"
      pl={{ base: 8, md: 12 }}
      pb={isLast ? 0 : 12}
    >
      {/* Gradient Timeline Line - Continuum Style */}
      {!isLast && (
        <Box
          position="absolute"
          left={{ base: '15px', md: '23px' }}
          top="40px"
          bottom="0"
          w="3px"
          overflow="hidden"
          borderRadius="full"
        >
          {/* Background line (faded) */}
          <Box
            position="absolute"
            inset={0}
            bgGradient="linear(to-b, rgba(99, 102, 241, 0.2), rgba(236, 72, 153, 0.2))"
          />
          
          {/* Animated progress line (gradient) */}
          <MotionBox
            position="absolute"
            top={0}
            left={0}
            right={0}
            style={{ height: lineHeight }}
            bgGradient="linear(to-b, #6366f1, #ec4899)"
            boxShadow="0 0 10px rgba(99, 102, 241, 0.5)"
          />
        </Box>
      )}

      {/* Animated Timeline Dot - Continuum Style */}
      <MotionBox
        position="absolute"
        left={{ base: '7px', md: '15px' }}
        top="8px"
        w="18px"
        h="18px"
        style={{ scale: dotScale }}
      >
        <Box
          w="full"
          h="full"
          borderRadius="full"
          bg={item.color}
          border="4px solid"
          borderColor={rgba(0.3)}
          boxShadow={`0 0 20px ${rgba(0.6)}, 0 0 40px ${rgba(0.3)}`}
          position="relative"
        >
          {/* Pulsing ring effect */}
          <MotionBox
            position="absolute"
            inset="-8px"
            borderRadius="full"
            border="2px solid"
            borderColor={item.color}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </Box>
      </MotionBox>

      {/* Content Card - Smooth Scroll Animation */}
      <MotionBox
        style={{ x: cardX, opacity: cardOpacity }}
        p={6}
        borderRadius="2xl"
        border="1px solid"
        borderColor={rgba(0.3)}
        bg={rgba(0.1)}
        backdropFilter="blur(20px)"
        whileHover={{ scale: 1.02, y: -4 }}
        transition={{ duration: 0.2 }}
      >
        <VStack align="start" spacing={3}>
          {/* Role & Company */}
          <Box>
            <Heading
              as="h3"
              fontSize={{ base: 'xl', md: '2xl' }}
              fontWeight="bold"
              color={textPrimary}
              fontFamily="heading"
            >
              {item.role}
            </Heading>
            <Text fontSize="lg" fontWeight="600" color={item.color} mt={1}>
              {item.company}
            </Text>
          </Box>

          {/* Meta info */}
          <HStack spacing={4} flexWrap="wrap" fontSize="sm" color={textSecondary}>
            <HStack spacing={1}>
              <Calendar size={14} />
              <Text>{item.period}</Text>
            </HStack>
            <HStack spacing={1}>
              <MapPin size={14} />
              <Text>{item.location}</Text>
            </HStack>
          </HStack>

          {/* Description */}
          <Text fontSize="md" color={textSecondary}>
            {item.description}
          </Text>

          {/* Achievements */}
          {item.achievements && (
            <VStack align="start" spacing={2} w="full">
              {item.achievements.map((achievement, i) => (
                <HStack key={i} align="start" spacing={2}>
                  <Box
                    mt={1.5}
                    w={1.5}
                    h={1.5}
                    borderRadius="full"
                    bg={item.color}
                    flexShrink={0}
                  />
                  <Text fontSize="sm" color={textSecondary}>
                    {achievement}
                  </Text>
                </HStack>
              ))}
            </VStack>
          )}
        </VStack>
      </MotionBox>
    </MotionBox>
  );
};

// ---------------------------------------------------------------------------
// Skills Section Component
// ---------------------------------------------------------------------------
const SkillCategory = ({ category, skills, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const textPrimary = useColorModeValue('text.primary', 'white');

  const colors = ['#6366f1', '#10b981', '#ec4899', '#f59e0b', '#06b6d4', '#8b5cf6'];
  const color = colors[index % colors.length];
  const { r, g, b } = hexToRgb(color);
  const rgba = (a) => `rgba(${r},${g},${b},${a})`;

  return (
    <MotionBox
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <VStack align="start" spacing={4}>
        <HStack spacing={2}>
          <Code size={20} color={color} />
          <Heading
            as="h3"
            fontSize="lg"
            fontWeight="bold"
            color={textPrimary}
            fontFamily="heading"
          >
            {category}
          </Heading>
        </HStack>

        <HStack spacing={2} flexWrap="wrap">
          {skills.map((skill, i) => (
            <MotionBox
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.3, delay: index * 0.1 + i * 0.05 }}
              whileHover={{ scale: 1.05 }}
            >
              <Badge
                px={3}
                py={1.5}
                fontSize="xs"
                borderRadius="full"
                border="1px solid"
                borderColor={rgba(0.3)}
                bg={rgba(0.15)}
                color={color}
                fontWeight="500"
              >
                {skill}
              </Badge>
            </MotionBox>
          ))}
        </HStack>
      </VStack>
    </MotionBox>
  );
};

// ---------------------------------------------------------------------------
// Main Resume Component
// ---------------------------------------------------------------------------
export const Resume = () => {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  const textPrimary = useColorModeValue('text.primary', 'white');
  const textSecondary = useColorModeValue('text.secondary', 'text.secondary');

  // Scroll-based blur effect on header
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', '200px start'],
  });

  const headerBlur = useTransform(
    scrollYProgress,
    [0, 1],
    ['blur(0px)', 'blur(10px)']
  );

  const headerOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Anandita-Resume.pdf';
    link.click();
  };

  return (
    <Box ref={containerRef} bg="transparent" minH="100vh" py={20} px={4}>
      <Container maxW="1200px">
        {/* Header with scroll blur */}
        <MotionBox
          ref={headerRef}
          style={{ filter: headerBlur, opacity: headerOpacity }}
          initial={{ opacity: 0, y: 40 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          mb={16}
          textAlign="center"
        >
          <Heading
            as="h1"
            fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }}
            fontWeight="normal"
            bgGradient="linear(to-r, #1e40af, #7c3aed, #ec4899)"
            bgClip="text"
            fontFamily="heading"
            display="inline-block"
            width="fit-content"
            mb={4}
          >
            {personalInfo.name}
          </Heading>
          <Text
            fontSize={{ base: 'xl', md: '2xl' }}
            color={textSecondary}
            fontWeight="500"
            mb={6}
          >
            {personalInfo.title}
          </Text>

          <HStack spacing={6} justify="center" flexWrap="wrap" fontSize="md" color={textSecondary}>
            <Text>{personalInfo.email}</Text>
            <Text>•</Text>
            <Text>{personalInfo.location}</Text>
          </HStack>

          <Text
            fontSize="lg"
            color={textSecondary}
            maxW="800px"
            mx="auto"
            mt={6}
            lineHeight="1.8"
          >
            {personalInfo.summary}
          </Text>
        </MotionBox>

        {/* Experience Section */}
        <Box mb={20}>
          <MotionBox
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            mb={8}
          >
            <HStack spacing={3} mb={2}>
              <Briefcase size={28} color="#6366f1" />
              <Heading
                as="h2"
                fontSize={{ base: '3xl', md: '4xl' }}
                fontWeight="bold"
                color={textPrimary}
                fontFamily="heading"
              >
                Experience
              </Heading>
            </HStack>
            <Box h="2px" w="100px" bgGradient="linear(to-r, #6366f1, #ec4899)" />
          </MotionBox>

          <VStack spacing={8} align="stretch">
            {experience.map((job, index) => (
              <TimelineItem
                key={job.id}
                item={job}
                index={index}
                isLast={index === experience.length - 1}
              />
            ))}
          </VStack>
        </Box>

        {/* Education Section */}
        <Box mb={20}>
          <MotionBox
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            mb={8}
          >
            <HStack spacing={3} mb={2}>
              <GraduationCap size={28} color="#10b981" />
              <Heading
                as="h2"
                fontSize={{ base: '3xl', md: '4xl' }}
                fontWeight="bold"
                color={textPrimary}
                fontFamily="heading"
              >
                Education
              </Heading>
            </HStack>
            <Box h="2px" w="100px" bgGradient="linear(to-r, #10b981, #06b6d4)" />
          </MotionBox>

          <VStack spacing={6} align="stretch">
            {education.map((edu, index) => (
              <TimelineItem key={edu.id} item={edu} index={index} isLast />
            ))}
          </VStack>
        </Box>

        {/* Skills Section */}
        <Box mb={20}>
          <MotionBox
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            mb={8}
          >
            <HStack spacing={3} mb={2}>
              <Code size={28} color="#ec4899" />
              <Heading
                as="h2"
                fontSize={{ base: '3xl', md: '4xl' }}
                fontWeight="bold"
                color={textPrimary}
                fontFamily="heading"
              >
                Skills
              </Heading>
            </HStack>
            <Box h="2px" w="100px" bgGradient="linear(to-r, #ec4899, #f59e0b)" />
          </MotionBox>

          <Grid
            templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
            gap={8}
          >
            {Object.entries(skills).map(([category, skillList], index) => (
              <SkillCategory
                key={category}
                category={category}
                skills={skillList}
                index={index}
              />
            ))}
          </Grid>
        </Box>

        {/* Certifications Section */}
        <Box mb={20}>
          <MotionBox
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            mb={8}
          >
            <HStack spacing={3} mb={2}>
              <Award size={28} color="#8b5cf6" />
              <Heading
                as="h2"
                fontSize={{ base: '3xl', md: '4xl' }}
                fontWeight="bold"
                color={textPrimary}
                fontFamily="heading"
              >
                Certifications
              </Heading>
            </HStack>
            <Box h="2px" w="100px" bgGradient="linear(to-r, #8b5cf6, #6366f1)" />
          </MotionBox>

          <Grid
            templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
            gap={6}
          >
            {certifications.map((cert, index) => {
              const { r, g, b } = hexToRgb(cert.color);
              const rgba = (a) => `rgba(${r},${g},${b},${a})`;

              return (
                <MotionBox
                  key={cert.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.03, y: -4 }}
                >
                  <Box
                    p={6}
                    borderRadius="2xl"
                    border="1px solid"
                    borderColor={rgba(0.3)}
                    bg={rgba(0.1)}
                    backdropFilter="blur(20px)"
                  >
                    <VStack align="start" spacing={2}>
                      <Heading
                        as="h3"
                        fontSize="lg"
                        fontWeight="bold"
                        color={textPrimary}
                        fontFamily="heading"
                      >
                        {cert.title}
                      </Heading>
                      <Text fontSize="md" color={cert.color} fontWeight="600">
                        {cert.issuer}
                      </Text>
                      <Text fontSize="sm" color={textSecondary}>
                        {cert.date}
                      </Text>
                    </VStack>
                  </Box>
                </MotionBox>
              );
            })}
          </Grid>
        </Box>

        {/* Download CTA */}
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          textAlign="center"
          p={12}
          borderRadius="3xl"
          bgGradient="linear(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)"
          border="1px solid"
          borderColor="border.primary"
          backdropFilter="blur(20px)"
        >
          <VStack spacing={6}>
            <Box>
              <Heading
                as="h2"
                fontSize={{ base: '2xl', md: '3xl' }}
                fontWeight="bold"
                color={textPrimary}
                fontFamily="heading"
                mb={2}
              >
                Like what you see?
              </Heading>
              <Text fontSize="lg" color={textSecondary}>
                Download a PDF copy of my resume for your records
              </Text>
            </Box>

            <MotionBox whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                onClick={handleDownload}
                bgGradient="linear(to-r, #7c3aed, #ec4899)"
                color="white"
                leftIcon={<Download size={20} />}
                px={8}
                py={6}
                fontSize="lg"
                borderRadius="full"
                _hover={{ opacity: 0.9 }}
              >
                Download Resume
              </Button>
            </MotionBox>
          </VStack>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default Resume;