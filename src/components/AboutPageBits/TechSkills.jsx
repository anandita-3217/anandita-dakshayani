// import React from 'react';
// import {
//   Box,
//   Heading,
//   Text,
//   SimpleGrid,
//   HStack,
//   VStack,
//   Icon,
//   useColorModeValue,
//   Badge,
//   Flex,
// } from '@chakra-ui/react';
// import { motion } from 'framer-motion';

// // Example icons - replace with actual tech icons
// const SkillIcon = () => <Box w={8} h={8} bg="blue.400" borderRadius="md" />;

// /**
//  * LAYOUT OPTION 1: Categorized Grid (Best for portfolios)
//  * Good for: Showing progression (beginner → advanced)
//  * Impact: High - Shows depth and breadth
//  */
// const TechSkillsOption1 = () => {
//   const bgColor = useColorModeValue('white', 'gray.800');
//   const borderColor = useColorModeValue('gray.200', 'gray.700');

//   const skillCategories = [
//     {
//       title: 'Frontend',
//       skills: [
//         { name: 'React', level: 'Advanced', yearsUsed: '2+ years' },
//         { name: 'JavaScript', level: 'Advanced', yearsUsed: '2+ years' },
//         { name: 'Chakra UI', level: 'Intermediate', yearsUsed: '1 year' },
//         { name: 'HTML/CSS', level: 'Advanced', yearsUsed: '2+ years' },
//       ],
//     },
//     {
//       title: 'Backend',
//       skills: [
//         { name: 'Node.js', level: 'Intermediate', yearsUsed: '1 year' },
//         { name: 'Express', level: 'Intermediate', yearsUsed: '1 year' },
//         { name: 'MongoDB', level: 'Beginner', yearsUsed: '6 months' },
//       ],
//     },
//     {
//       title: 'Tools & Others',
//       skills: [
//         { name: 'Git', level: 'Intermediate', yearsUsed: '1+ years' },
//         { name: 'VS Code', level: 'Advanced', yearsUsed: '2+ years' },
//         { name: 'Figma', level: 'Beginner', yearsUsed: '6 months' },
//       ],
//     },
//   ];

//   const levelColor = (level) => {
//     switch (level) {
//       case 'Advanced': return 'green';
//       case 'Intermediate': return 'blue';
//       case 'Beginner': return 'purple';
//       default: return 'gray';
//     }
//   };

//   return (
//     <VStack spacing={12} align="stretch">
//       <Box textAlign="center">
//         <Heading size="2xl" mb={4}>
//           Technical Skills
//         </Heading>
//         <Text fontSize="lg" color="gray.600" maxW="2xl" mx="auto">
//           Technologies I work with to build scalable and user-friendly applications
//         </Text>
//       </Box>

//       <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
//         {skillCategories.map((category, idx) => (
//           <motion.div
//             key={category.title}
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ delay: idx * 0.1 }}
//             viewport={{ once: true }}
//           >
//             <Box
//               bg={bgColor}
//               p={6}
//               borderRadius="xl"
//               borderWidth="1px"
//               borderColor={borderColor}
//               h="full"
//               _hover={{ shadow: 'lg', transform: 'translateY(-4px)' }}
//               transition="all 0.3s"
//             >
//               <Heading size="md" mb={4} color="blue.500">
//                 {category.title}
//               </Heading>
//               <VStack align="stretch" spacing={3}>
//                 {category.skills.map((skill) => (
//                   <Box key={skill.name}>
//                     <HStack justify="space-between" mb={1}>
//                       <Text fontWeight="semibold">{skill.name}</Text>
//                       <Badge colorScheme={levelColor(skill.level)}>
//                         {skill.level}
//                       </Badge>
//                     </HStack>
//                     <Text fontSize="sm" color="gray.500">
//                       {skill.yearsUsed}
//                     </Text>
//                   </Box>
//                 ))}
//               </VStack>
//             </Box>
//           </motion.div>
//         ))}
//       </SimpleGrid>
//     </VStack>
//   );
// };

// /**
//  * LAYOUT OPTION 2: Visual Proficiency Bars
//  * Good for: Quick scanning, visual impact
//  * Impact: Medium-High - Easy to understand at a glance
//  */
// const TechSkillsOption2 = () => {
//   const skills = [
//     { name: 'React', proficiency: 85, category: 'Frontend' },
//     { name: 'JavaScript', proficiency: 80, category: 'Frontend' },
//     { name: 'Chakra UI', proficiency: 70, category: 'Frontend' },
//     { name: 'Node.js', proficiency: 65, category: 'Backend' },
//     { name: 'MongoDB', proficiency: 55, category: 'Backend' },
//     { name: 'Git', proficiency: 75, category: 'Tools' },
//   ];

//   const barBg = useColorModeValue('gray.200', 'gray.700');

//   return (
//     <VStack spacing={12} align="stretch" maxW="4xl" mx="auto">
//       <Box textAlign="center">
//         <Heading size="2xl" mb={4}>
//           Technical Proficiency
//         </Heading>
//         <Text fontSize="lg" color="gray.600">
//           Self-assessed skill levels based on project experience
//         </Text>
//       </Box>

//       <VStack spacing={6} align="stretch">
//         {skills.map((skill, idx) => (
//           <motion.div
//             key={skill.name}
//             initial={{ opacity: 0, x: -20 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ delay: idx * 0.05 }}
//             viewport={{ once: true }}
//           >
//             <Box>
//               <HStack justify="space-between" mb={2}>
//                 <HStack>
//                   <Text fontWeight="bold" fontSize="lg">
//                     {skill.name}
//                   </Text>
//                   <Badge colorScheme="blue" fontSize="xs">
//                     {skill.category}
//                   </Badge>
//                 </HStack>
//                 <Text fontWeight="semibold" color="blue.500">
//                   {skill.proficiency}%
//                 </Text>
//               </HStack>
//               <Box h={3} bg={barBg} borderRadius="full" overflow="hidden">
//                 <motion.div
//                   initial={{ width: 0 }}
//                   whileInView={{ width: `${skill.proficiency}%` }}
//                   transition={{ duration: 0.8, delay: idx * 0.05 }}
//                   viewport={{ once: true }}
//                   style={{
//                     height: '100%',
//                     background: 'linear-gradient(to right, #3182ce, #805ad5)',
//                     borderRadius: '999px',
//                   }}
//                 />
//               </Box>
//             </Box>
//           </motion.div>
//         ))}
//       </VStack>
//     </VStack>
//   );
// };

// /**
//  * LAYOUT OPTION 3: Icon Grid (Best for visual impact)
//  * Good for: Modern portfolios, showing tech stack
//  * Impact: Very High - Memorable, scannable
//  */
// const TechSkillsOption3 = () => {
//   const cardBg = useColorModeValue('white', 'gray.800');
//   const borderColor = useColorModeValue('gray.200', 'gray.700');

//   const techStack = [
//     { name: 'React', description: 'Component-based UI', level: 'Advanced' },
//     { name: 'JavaScript', description: 'Core language', level: 'Advanced' },
//     { name: 'Chakra UI', description: 'Component library', level: 'Intermediate' },
//     { name: 'Node.js', description: 'Backend runtime', level: 'Intermediate' },
//     { name: 'Git', description: 'Version control', level: 'Intermediate' },
//     { name: 'MongoDB', description: 'NoSQL database', level: 'Beginner' },
//   ];

//   return (
//     <VStack spacing={12} align="stretch">
//       <Box textAlign="center">
//         <Heading size="2xl" mb={4}>
//           My Tech Stack
//         </Heading>
//         <Text fontSize="lg" color="gray.600" maxW="2xl" mx="auto">
//           Tools and technologies I use to bring ideas to life
//         </Text>
//       </Box>

//       <SimpleGrid columns={{ base: 2, md: 3, lg: 6 }} spacing={6}>
//         {techStack.map((tech, idx) => (
//           <motion.div
//             key={tech.name}
//             initial={{ opacity: 0, scale: 0.9 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             transition={{ delay: idx * 0.05 }}
//             viewport={{ once: true }}
//             whileHover={{ scale: 1.05 }}
//           >
//             <VStack
//               bg={cardBg}
//               p={6}
//               borderRadius="xl"
//               borderWidth="2px"
//               borderColor={borderColor}
//               spacing={3}
//               h="full"
//               _hover={{ borderColor: 'blue.400', shadow: 'xl' }}
//               transition="all 0.3s"
//             >
//               <SkillIcon />
//               <Text fontWeight="bold" fontSize="lg" textAlign="center">
//                 {tech.name}
//               </Text>
//               <Text fontSize="sm" color="gray.500" textAlign="center">
//                 {tech.description}
//               </Text>
//               <Badge colorScheme="blue" fontSize="xs">
//                 {tech.level}
//               </Badge>
//             </VStack>
//           </motion.div>
//         ))}
//       </SimpleGrid>
//     </VStack>
//   );
// };

// // Export all options for comparison
// export default TechSkillsOption3;
// export { TechSkillsOption1, TechSkillsOption2 };

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