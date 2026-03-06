import React, { useState } from 'react';
import {
  Box,
  Heading,
  Text,
  HStack,
  VStack,
  Flex,
  Badge,
  useColorModeValue,
  // keyframes,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

// Sample data - replace with your actual skills
const skillsData = {
  frontend: ['React', 'JavaScript', 'Chakra UI', 'HTML/CSS', 'Framer Motion'],
  backend: ['Node.js', 'Express', 'MongoDB', 'REST APIs'],
  tools: ['Git', 'VS Code', 'Figma', 'npm'],
  learning: ['TypeScript', 'Next.js', 'GraphQL']
};

const allSkills = Object.entries(skillsData).flatMap(([category, skills]) =>
  skills.map(skill => ({ name: skill, category }))
);

/**
 * LAYOUT 1: Single Dense Row
 * All skills in one continuous line with gradient category dividers
 */
export const TechSkillsDenseRow = () => {
  const dividerGradient = 'linear(to-r, #059669, #2563eb, #9333ea)';
  
  return (
    <VStack spacing={8} align="stretch">
      <Box textAlign="center">
        <Heading 
          size="2xl" 
          mb={3}
          bgGradient={dividerGradient}
          bgClip="text"
        >
          Tech Stack
        </Heading>
        <Text color="text.muted" fontSize="lg">
          Technologies I work with
        </Text>
      </Box>

      <Flex
        wrap="wrap"
        gap={3}
        justify="center"
        align="center"
        maxW="1000px"
        mx="auto"
      >
        {Object.entries(skillsData).map(([category, skills], catIdx) => (
          <React.Fragment key={category}>
            {catIdx > 0 && (
              <Box
                h="30px"
                w="2px"
                bgGradient={dividerGradient}
                opacity={0.6}
                mx={2}
              />
            )}
            {skills.map((skill, idx) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: (catIdx * 5 + idx) * 0.03 }}
                whileHover={{ scale: 1.1 }}
              >
                <Badge
                  px={4}
                  py={2}
                  borderRadius="full"
                  fontSize="md"
                  fontWeight="semibold"
                  bg="surface.elevated"
                  borderWidth="1px"
                  borderColor="border.primary"
                  color="text.primary"
                  cursor="pointer"
                  transition="all 0.2s"
                  _hover={{
                    borderColor: 'brand.400',
                    shadow: 'md',
                    bgGradient: dividerGradient,
                    color: 'white'
                  }}
                >
                  {skill}
                </Badge>
              </motion.div>
            ))}
          </React.Fragment>
        ))}
      </Flex>

      {/* Legend */}
      <HStack spacing={6} justify="center" fontSize="sm" color="text.muted">
        {Object.keys(skillsData).map(cat => (
          <HStack key={cat} spacing={2}>
            <Box w={2} h={2} borderRadius="full" bg="brand.400" />
            <Text textTransform="capitalize">{cat}</Text>
          </HStack>
        ))}
      </HStack>
    </VStack>
  );
};

/**
 * LAYOUT 2: Bento Grid
 * Asymmetric card sizes for visual interest
 */
export const TechSkillsBento = () => {
  const cardBg = 'surface.elevated';
  const borderColor = 'border.primary';

  return (
    <VStack spacing={10} align="stretch">
      <Box textAlign="center">
        <Heading size="2xl" mb={3} bgGradient="gradients.jewel" bgClip="text">
          My Toolkit
        </Heading>
        <Text color="text.muted" fontSize="lg">
          Technologies organized by expertise
        </Text>
      </Box>

      <Box
        display="grid"
        gridTemplateColumns={{ base: "1fr", md: "repeat(6, 1fr)" }}
        gridTemplateRows={{ base: "auto", md: "repeat(3, 120px)" }}
        gap={4}
      >
        {/* Frontend - Large */}
        <Box
          gridColumn={{ base: "1", md: "1 / 4" }}
          gridRow={{ base: "auto", md: "1 / 3" }}
          bg={cardBg}
          p={6}
          borderRadius="xl"
          borderWidth="1px"
          borderColor={borderColor}
          transition="all 0.3s"
          _hover={{ borderColor: 'brand.400', shadow: 'lg' }}
        >
          <Text fontSize="sm" fontWeight="bold" color="brand.400" mb={3}>
            FRONTEND
          </Text>
          <Flex wrap="wrap" gap={2}>
            {skillsData.frontend.map(skill => (
              <Badge key={skill} colorScheme="blue" fontSize="sm" px={3} py={1}>
                {skill}
              </Badge>
            ))}
          </Flex>
        </Box>

        {/* Backend - Medium */}
        <Box
          gridColumn={{ base: "1", md: "4 / 7" }}
          gridRow={{ base: "auto", md: "1 / 2" }}
          bg={cardBg}
          p={6}
          borderRadius="xl"
          borderWidth="1px"
          borderColor={borderColor}
          transition="all 0.3s"
          _hover={{ borderColor: 'brand.400', shadow: 'lg' }}
        >
          <Text fontSize="sm" fontWeight="bold" color="brand.400" mb={3}>
            BACKEND
          </Text>
          <Flex wrap="wrap" gap={2}>
            {skillsData.backend.map(skill => (
              <Badge key={skill} colorScheme="purple" fontSize="sm" px={3} py={1}>
                {skill}
              </Badge>
            ))}
          </Flex>
        </Box>

        {/* Tools - Medium */}
        <Box
          gridColumn={{ base: "1", md: "4 / 7" }}
          gridRow={{ base: "auto", md: "2 / 3" }}
          bg={cardBg}
          p={6}
          borderRadius="xl"
          borderWidth="1px"
          borderColor={borderColor}
          transition="all 0.3s"
          _hover={{ borderColor: 'brand.400', shadow: 'lg' }}
        >
          <Text fontSize="sm" fontWeight="bold" color="brand.400" mb={3}>
            TOOLS & PLATFORMS
          </Text>
          <Flex wrap="wrap" gap={2}>
            {skillsData.tools.map(skill => (
              <Badge key={skill} colorScheme="teal" fontSize="sm" px={3} py={1}>
                {skill}
              </Badge>
            ))}
          </Flex>
        </Box>

        {/* Learning - Wide */}
        <Box
          gridColumn={{ base: "1", md: "1 / 7" }}
          gridRow={{ base: "auto", md: "3 / 4" }}
          bg={cardBg}
          p={6}
          borderRadius="xl"
          borderWidth="1px"
          borderColor={borderColor}
          position="relative"
          overflow="hidden"
          _before={{
            content: '""',
            position: 'absolute',
            inset: 0,
            bgGradient: 'gradients.jewel',
            opacity: 0.05
          }}
        >
          <Text fontSize="sm" fontWeight="bold" color="brand.400" mb={3} position="relative" zIndex={1}>
            CURRENTLY LEARNING
          </Text>
          <Flex wrap="wrap" gap={2} position="relative" zIndex={1}>
            {skillsData.learning.map(skill => (
              <Badge key={skill} colorScheme="orange" fontSize="sm" px={3} py={1}>
                {skill} 🌱
              </Badge>
            ))}
          </Flex>
        </Box>
      </Box>
    </VStack>
  );
};

/**
 * LAYOUT 3: Ticker Tape Animation
 * Continuous horizontal scroll effect
 */
const scroll ={
  initial:{ x: 0 },
  animate:{ x: '-50%' },
  transition:{ duration: 1, ease: 'linear' }

}
;

export const TechSkillsTicker = () => {
  return (
    <VStack spacing={10} align="stretch" overflow="hidden">
      <Box textAlign="center" px={4}>
        <Heading size="2xl" mb={3} bgGradient="gradients.jewel" bgClip="text">
          Skills in Motion
        </Heading>
        <Text color="text.muted" fontSize="lg">
          Hover to pause • Click a skill to highlight
        </Text>
      </Box>

      {/* Row 1 - Scrolling Right */}
      <Box
        position="relative"
        overflow="hidden"
        py={4}
        _before={{
          content: '""',
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: '100px',
          bgGradient: 'linear(to-r, bg.secondary, transparent)',
          zIndex: 1,
          pointerEvents: 'none'
        }}
        _after={{
          content: '""',
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: '100px',
          bgGradient: 'linear(to-l, bg.secondary, transparent)',
          zIndex: 1,
          pointerEvents: 'none'
        }}
      >
        <Flex
          gap={4}
          sx={{
            animation: `${scroll} 30s linear infinite`,
            '&:hover': { animationPlayState: 'paused' }
          }}
        >
          {[...allSkills, ...allSkills].map((skill, idx) => (
            <Badge
              key={idx}
              px={6}
              py={3}
              borderRadius="full"
              fontSize="lg"
              fontWeight="bold"
              bg="surface.card"
              borderWidth="2px"
              borderColor="border.primary"
              whiteSpace="nowrap"
              cursor="pointer"
              transition="all 0.3s"
              _hover={{
                borderColor: 'brand.400',
                transform: 'scale(1.1)',
                bgGradient: 'gradients.jewel',
                color: 'white'
              }}
            >
              {skill.name}
            </Badge>
          ))}
        </Flex>
      </Box>

      {/* Row 2 - Scrolling Left (opposite direction) */}
      <Box
        position="relative"
        overflow="hidden"
        py={4}
        _before={{
          content: '""',
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: '100px',
          bgGradient: 'linear(to-r, bg.secondary, transparent)',
          zIndex: 1,
          pointerEvents: 'none'
        }}
        _after={{
          content: '""',
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: '100px',
          bgGradient: 'linear(to-l, bg.secondary, transparent)',
          zIndex: 1,
          pointerEvents: 'none'
        }}
      >
        <Flex
          gap={4}
          sx={{
            animation: `${scroll} 25s linear infinite reverse`,
            '&:hover': { animationPlayState: 'paused' }
          }}
        >
          {[...allSkills.reverse(), ...allSkills].map((skill, idx) => (
            <Badge
              key={idx}
              px={6}
              py={3}
              borderRadius="full"
              fontSize="lg"
              fontWeight="bold"
              bg="surface.card"
              borderWidth="2px"
              borderColor="border.primary"
              whiteSpace="nowrap"
              cursor="pointer"
              transition="all 0.3s"
              _hover={{
                borderColor: 'brand.400',
                transform: 'scale(1.1)',
                bgGradient: 'gradients.jewel',
                color: 'white'
              }}
            >
              {skill.name}
            </Badge>
          ))}
        </Flex>
      </Box>
    </VStack>
  );
};

/**
 * LAYOUT 4: Minimal List with Expand on Hover
 * Clean, space-efficient, elegant
 */
export const TechSkillsMinimal = () => {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  return (
    <VStack spacing={12} align="stretch" maxW="800px" mx="auto">
      <Box textAlign="center">
        <Heading size="2xl" mb={3} bgGradient="gradients.jewel" bgClip="text">
          What I Work With
        </Heading>
        <Text color="text.muted" fontSize="lg">
          Hover to explore each category
        </Text>
      </Box>

      <VStack spacing={1} align="stretch">
        {Object.entries(skillsData).map(([category, skills]) => (
          <Box
            key={category}
            onMouseEnter={() => setHoveredCategory(category)}
            onMouseLeave={() => setHoveredCategory(null)}
            borderRadius="xl"
            overflow="hidden"
            transition="all 0.3s"
            bg={hoveredCategory === category ? 'surface.card' : 'transparent'}
            borderWidth="1px"
            borderColor={hoveredCategory === category ? 'brand.400' : 'transparent'}
          >
            <HStack
              p={6}
              justify="space-between"
              cursor="pointer"
              spacing={4}
            >
              <HStack spacing={4} flex={1}>
                <Box
                  w={2}
                  h={2}
                  borderRadius="full"
                  bg="brand.400"
                  transition="all 0.3s"
                  transform={hoveredCategory === category ? 'scale(1.5)' : 'scale(1)'}
                />
                <Text
                  fontSize="2xl"
                  fontWeight="bold"
                  textTransform="uppercase"
                  letterSpacing="wide"
                  transition="all 0.3s"
                  color={hoveredCategory === category ? 'brand.400' : 'text.primary'}
                >
                  {category}
                </Text>
                <Badge
                  colorScheme="blue"
                  borderRadius="full"
                  px={3}
                  opacity={hoveredCategory === category ? 1 : 0.5}
                  transition="all 0.3s"
                >
                  {skills.length}
                </Badge>
              </HStack>

              <motion.div
                initial={false}
                animate={{
                  width: hoveredCategory === category ? 'auto' : 0,
                  opacity: hoveredCategory === category ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
              >
                <Flex gap={2} pr={hoveredCategory === category ? 0 : 4}>
                  {skills.map((skill, idx) => (
                    <motion.div
                      key={skill}
                      initial={false}
                      animate={{
                        opacity: hoveredCategory === category ? 1 : 0,
                        x: hoveredCategory === category ? 0 : -20
                      }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <Badge
                        px={3}
                        py={1}
                        borderRadius="full"
                        fontSize="sm"
                        bg="bg.accent"
                        color="text.primary"
                        whiteSpace="nowrap"
                      >
                        {skill}
                      </Badge>
                    </motion.div>
                  ))}
                </Flex>
              </motion.div>
            </HStack>
          </Box>
        ))}
      </VStack>
    </VStack>
  );
};

/**
 * LAYOUT 5: Word Cloud (Scattered by Importance)
 * Visual hierarchy through size and position
 */
export const TechSkillsWordCloud = () => {
  // Define importance (size) for each skill
  const skillImportance = {
    'React': 5,
    'JavaScript': 5,
    'Node.js': 4,
    'Chakra UI': 4,
    'MongoDB': 3,
    'Express': 3,
    'HTML/CSS': 4,
    'Framer Motion': 3,
    'Git': 4,
    'VS Code': 2,
    'Figma': 3,
    'npm': 2,
    'TypeScript': 3,
    'Next.js': 3,
    'GraphQL': 2
  };

  const positions = [
    { top: '10%', left: '15%' },
    { top: '15%', left: '60%' },
    { top: '25%', left: '35%' },
    { top: '30%', left: '75%' },
    { top: '40%', left: '20%' },
    { top: '45%', left: '55%' },
    { top: '50%', left: '80%' },
    { top: '55%', left: '10%' },
    { top: '60%', left: '45%' },
    { top: '65%', left: '70%' },
    { top: '70%', left: '25%' },
    { top: '75%', left: '60%' },
    { top: '80%', left: '40%' },
    { top: '85%', left: '15%' },
    { top: '85%', left: '75%' }
  ];

  return (
    <VStack spacing={8} align="stretch">
      <Box textAlign="center">
        <Heading size="2xl" mb={3} bgGradient="gradients.jewel" bgClip="text">
          Skills Universe
        </Heading>
        <Text color="text.muted" fontSize="lg">
          Size reflects proficiency • Hover to highlight
        </Text>
      </Box>

      <Box
        position="relative"
        h={{ base: '500px', md: '600px' }}
        bg="surface.card"
        borderRadius="2xl"
        borderWidth="1px"
        borderColor="border.primary"
        overflow="hidden"
      >
        {allSkills.map((skill, idx) => {
          const importance = skillImportance[skill.name] || 3;
          const fontSize = `${importance * 0.5}rem`;
          const position = positions[idx % positions.length];

          return (
            <motion.div
              key={skill.name}
              style={{
                position: 'absolute',
                ...position
              }}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, type: 'spring' }}
              whileHover={{ scale: 1.2, zIndex: 10 }}
            >
              <Badge
                px={4}
                py={2}
                borderRadius="full"
                fontSize={fontSize}
                fontWeight="bold"
                bg="bg.accent"
                borderWidth="2px"
                borderColor="transparent"
                color="text.primary"
                cursor="pointer"
                transition="all 0.3s"
                _hover={{
                  borderColor: 'brand.400',
                  bgGradient: 'gradients.jewel',
                  color: 'white',
                  shadow: 'xl'
                }}
              >
                {skill.name}
              </Badge>
            </motion.div>
          );
        })}
      </Box>
    </VStack>
  );
};


// Default export - choose your favorite!
export default TechSkillsDenseRow;