// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Container,
//   Heading,
//   Tabs,
//   TabList,
//   TabPanels,
//   Tab,
//   TabPanel,
//   Flex,
//   Badge,
//   Image,
//   Spinner,
//   Center,
//   transition,
// } from "@chakra-ui/react";
// import { motion } from "framer-motion";
// import { Code } from "lucide-react";
// import { useInView } from "react-intersection-observer";

// const MotionBox = motion.create(Box);
// const MotionHeading = motion.create(Heading);
// const MotionBadge = motion.create(Badge);

// const headerVariants = {
//   hidden: {opacity:0,y:40},
//   visible:{
//     opacity:1,
//     y:0,
//     transition: {duration:0.7}
//   }
// }

// const skillsVariants = {
//   hidden: {opacity:0,y:-40},
//   visible:{
//     opacity:1,
//     y:0,
//     transition: {duration:0.7}
//   }
// }

// // TechIcon Component
// function TechIcon({ logoKey, name, size = 20 }) {
//   const [imageError, setImageError] = useState(false);
  
//   const getIconUrl = () => {
//     if (logoKey === 'nextjs') return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg';
//     if (logoKey === 'huggingface') return 'https://img.icons8.com/?size=100&id=sop9ROXku5bb&format=png&color=000000';
//     return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${logoKey}/${logoKey}-original.svg`;
//   };
  
//   const getFallbackUrl = () => {
//     return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${logoKey}/${logoKey}-plain.svg`;
//   };
  
//   if (imageError) {
//     return (
//       <Box 
//         display="flex" 
//         alignItems="center" 
//         justifyContent="center" 
//         bg="teal.100" 
//         color="teal.600"
//         borderRadius="sm"
//         w={`${size}px`}
//         h={`${size}px`}
//       >
//         <Code size={size * 0.6} />
//       </Box>
//     );
//   }
  
//   return (
//     <Image 
//       src={getIconUrl()}
//       alt={`${name} logo`}
//       w={`${size}px`}
//       h={`${size}px`}
//       objectFit="contain"
//       onError={(e) => {
//         const target = e.currentTarget;
//         if (target.src !== getFallbackUrl()) {
//           target.src = getFallbackUrl();
//         } else {
//           setImageError(true);
//         }
//       }}
//     />
//   );
// }

// export default function Skills() {
//   const [selectedCategory, setSelectedCategory] = useState("Languages");
//   const [skills, setSkills] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [headerRef,headerInView] = useInView({
//     triggerOnce: false,
//     threshold: 0.2
//   });
//   const [skillsRef,skillsInView] = useInView({
//     triggerOnce: false,
//     threshold: 0.2
//   });
//   useEffect(() => {
//     // Load skills from JSON file
//     fetch('../data/skills.json')
//       .then(response => response.json())
//       .then(data => {
//         setSkills(data.skills || {});
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('Error loading skills:', error);
//         setLoading(false);
//       });
//   }, []);

//   const categories = Object.keys(skills);

//   if (loading) {
//     return (
//       <Box as="section" py={{ base: 12, md: 24 }}>
//         <Container maxW="6xl" px={{ base: 4, md: 6 }} mx="auto">
//           <Center h="400px">
//             <Spinner size="xl" color="teal.400" thickness="4px" />
//           </Center>
//         </Container>
//       </Box>
//     );
//   }

//   return (
//     <Box as="section" py={{ base: 12, md: 24 }}>
//       <Container maxW="6xl" px={{ base: 4, md: 6 }} mx="auto">
//         <MotionBox
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.5 }}
//           textAlign="center"
//           mb={8}
//         >
//           <MotionHeading
//             ref={headerRef}
//             as="h2"
//             fontSize={{ base: "3xl", sm: "4xl", md: "5xl" }}
//             fontWeight="bold"
//             letterSpacing="tight"
//             initial="hidden"
//             animate={headerInView ? "visible" : "hidden"}
//             variants={headerVariants}
//             color="#14b8a6"
//             mb={4}
//           >
//             Technical Skills
//           </MotionHeading>
//         </MotionBox>

//         <MotionBox
//           viewport={{ once: true }}
//           mt={{ base: 8, md: 12 }}
//           ref={skillsRef}
//           initial="hidden"
//           animate={skillsInView?"visible":"hidden"}
//           variants={skillsVariants}
//         >
//           <Tabs
//             variant="unstyled"
//             index={categories.indexOf(selectedCategory)}
//             onChange={(index) => setSelectedCategory(categories[index])}
//           >
//             <Flex justify="center" mb={8}>
//               <TabList
//                 display="flex"
//                 flexWrap="wrap"
//                 gap={2}
//                 h="auto"
//                 bg="transparent"
//                 backdropFilter="blur(10px)"
//                 p={1}
//                 borderRadius="lg"
//               >
//                 {categories.map((category, i) => (
//                   <MotionBox
//                     key={category}
//                     initial={{ opacity: 0, y: -10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{
//                       delay: i * 0.05,
//                       duration: 0.3,
//                     }}
//                     as={motion.div}
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                   >
//                     <Tab
//                       px={4}
//                       py={2}
//                       fontSize="sm"
//                       fontWeight="medium"
//                       borderRadius="md"
//                       color="text.secondary"
//                       bg="teal.900"
//                       _selected={{
//                         bg: "teal.400",
//                         color: "text.primary",
//                         boxShadow: "sm",
//                       }}
//                       transition="all 0.2s"
//                     >
//                       {category}
//                     </Tab>
//                   </MotionBox>
//                 ))}
//               </TabList>
//             </Flex>

//             <TabPanels>
//               {categories.map((category) => (
//                 <TabPanel key={category} p={0}>
//                   <Box
//                     bg="transparent"
//                     backdropFilter="blur(10px)"
//                     borderRadius="lg"
//                     p={6}
//                   >
//                     <Flex
//                       flexWrap="wrap"
//                       gap={3}
//                       justify="center"
//                     >
//                       {skills[category]?.map((skill, index) => (
//                         <MotionBadge
//                           key={`${category}-${skill.name}`}
//                           initial={{ opacity: 0, y: 20, scale: 0.8 }}
//                           animate={{ opacity: 1, y: 0, scale: 1 }}
//                           whileHover={{ scale: 1.05 }}
//                           _hover={{ bg: "bg.hover" }}
//                           transition={{ 
//                             duration: 0.4, 
//                             delay: index * 0.1,
//                             ease: "easeOut"
//                           }}
//                           fontSize="sm"
//                           py={2}
//                           px={4}
//                           bg="teal.900"
//                           border="1px solid"
//                           borderColor="border.primary"
//                           borderRadius="md"
//                           display="flex"
//                           alignItems="center"
//                           gap={2}
//                           cursor="pointer"
//                         >
//                           <TechIcon logoKey={skill.logoKey} name={skill.name} size={20} />
//                           {skill.name}
//                         </MotionBadge>
//                       ))}
//                     </Flex>
//                   </Box>
//                 </TabPanel>
//               ))}
//             </TabPanels>
//           </Tabs>
//         </MotionBox>
//       </Container>
//     </Box>
//   );
// }

import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Container,
  Heading,
  VStack,
  HStack,
  Badge,
  Image,
  Spinner,
  Center,
  Icon,
  Text,
  Grid,
} from "@chakra-ui/react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Code, Sparkles } from "lucide-react";
import { useInView } from "react-intersection-observer";

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionBadge = motion(Badge);

const headerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7 }
  }
};

// Category colors with gradients
const categoryColors = {
  Languages: { color: '#f093fb', gradient: 'linear(to-r, #f093fb, #f5576c)' },
  Frameworks: { color: '#667eea', gradient: 'linear(to-r, #667eea, #764ba2)' },
  Tools: { color: '#4facfe', gradient: 'linear(to-r, #4facfe, #00f2fe)' },
  Databases: { color: '#68d391', gradient: 'linear(to-r, #68d391, #38a169)' },
  Cloud: { color: '#fbd38d', gradient: 'linear(to-r, #fbd38d, #ed8936)' },
};

// TechIcon Component
function TechIcon({ logoKey, name, size = 24 }) {
  const [imageError, setImageError] = useState(false);
  
  const getIconUrl = () => {
    if (logoKey === 'nextjs') return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg';
    if (logoKey === 'huggingface') return 'https://img.icons8.com/?size=100&id=sop9ROXku5bb&format=png&color=000000';
    return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${logoKey}/${logoKey}-original.svg`;
  };
  
  const getFallbackUrl = () => {
    return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${logoKey}/${logoKey}-plain.svg`;
  };
  
  if (imageError) {
    return (
      <Box 
        display="flex" 
        alignItems="center" 
        justifyContent="center" 
        bg="rgba(20, 184, 166, 0.2)" 
        color="brand.400"
        borderRadius="md"
        w={`${size}px`}
        h={`${size}px`}
      >
        <Code size={size * 0.6} />
      </Box>
    );
  }
  
  return (
    <Image 
      src={getIconUrl()}
      alt={`${name} logo`}
      w={`${size}px`}
      h={`${size}px`}
      objectFit="contain"
      filter="drop-shadow(0 0 8px rgba(255, 255, 255, 0.3))"
      onError={(e) => {
        const target = e.currentTarget;
        if (target.src !== getFallbackUrl()) {
          target.src = getFallbackUrl();
        } else {
          setImageError(true);
        }
      }}
    />
  );
}

// Skill Card with 3D tilt
function SkillCard({ skill, index, categoryColor }) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

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
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
      }}
    >
      <Box
        bg="rgba(255, 255, 255, 0.02)"
        backdropFilter="blur(20px)"
        borderRadius="xl"
        border="2px solid"
        borderColor={isHovered ? categoryColor : 'rgba(255, 255, 255, 0.08)'}
        p={4}
        cursor="pointer"
        position="relative"
        overflow="hidden"
        transition="all 0.3s cubic-bezier(0.23, 1, 0.32, 1)"
        boxShadow={isHovered ? `0 20px 60px ${categoryColor}40` : 'none'}
        _hover={{
          borderColor: categoryColor,
        }}
      >
        {/* Gradient background */}
        <Box
          position="absolute"
          top="-50px"
          right="-50px"
          w="150px"
          h="150px"
          bgGradient={`radial(circle, ${categoryColor}, transparent)`}
          opacity={isHovered ? 0.3 : 0.1}
          transition="opacity 0.3s"
          pointerEvents="none"
          filter="blur(30px)"
        />

        {/* Shimmer effect */}
        <Box
          position="absolute"
          top={0}
          left="-100%"
          w="50%"
          h="100%"
          bgGradient="linear(to-r, transparent, rgba(255,255,255,0.1), transparent)"
          transform={isHovered ? 'translateX(300%)' : 'translateX(0)'}
          transition="transform 0.6s"
          pointerEvents="none"
        />

        <HStack spacing={3} position="relative" zIndex={1}>
          <Box
            p={2}
            bg={`${categoryColor}15`}
            borderRadius="lg"
            transition="transform 0.3s"
            transform={isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1)'}
          >
            <TechIcon logoKey={skill.logoKey} name={skill.name} size={24} />
          </Box>
          <Text
            fontSize="sm"
            fontWeight="600"
            color="text.primary"
          >
            {skill.name}
          </Text>
        </HStack>
      </Box>
    </MotionBox>
  );
}

// Category Section
function CategorySection({ category, skills, color, index }) {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1
  });

  return (
    <MotionBox
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <VStack align="stretch" spacing={4}>
        {/* Category Header */}
        <HStack spacing={3}>
          <Box
            w="40px"
            h="2px"
            bgGradient={categoryColors[category]?.gradient || 'linear(to-r, brand.400, purple.400)'}
          />
          <Heading
            size="md"
            color={color}
            display="flex"
            alignItems="center"
            gap={2}
          >
            {category}
            <Icon as={Sparkles} boxSize={4} />
          </Heading>
          <Badge
            colorScheme="purple"
            fontSize="xs"
            px={2}
            py={1}
            borderRadius="full"
          >
            {skills.length}
          </Badge>
        </HStack>

        {/* Skills Grid */}
        <Grid
          templateColumns={{
            base: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)',
          }}
          gap={3}
        >
          {skills.map((skill, i) => (
            <SkillCard
              key={`${category}-${skill.name}`}
              skill={skill}
              index={i}
              categoryColor={color}
            />
          ))}
        </Grid>
      </VStack>
    </MotionBox>
  );
}

export default function Skills() {
  const [skills, setSkills] = useState({});
  const [loading, setLoading] = useState(true);
  const [headerRef, headerInView] = useInView({
    triggerOnce: false,
    threshold: 0.2
  });

  useEffect(() => {
    fetch('../data/skills.json')
      .then(response => response.json())
      .then(data => {
        setSkills(data.skills || {});
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading skills:', error);
        setLoading(false);
      });
  }, []);

  const categories = Object.keys(skills);

  if (loading) {
    return (
      <Box as="section" py={{ base: 12, md: 24 }} bg="transparent">
        <Container maxW="container.xl">
          <Center h="400px">
            <Spinner size="xl" color="brand.400" thickness="4px" />
          </Center>
        </Container>
      </Box>
    );
  }

  return (
    <Box 
      as="section" 
      py={{ base: 12, md: 24 }}
      bg="transparent"
      position="relative"
      overflow="hidden"
    >
      {/* Background decoration */}
      <MotionBox
        position="absolute"
        top="10%"
        right="5%"
        w="300px"
        h="300px"
        bgGradient="radial(circle, purple.400, transparent)"
        opacity={0.1}
        filter="blur(80px)"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <Container maxW="container.xl">
        {/* Header */}
        <VStack spacing={6} textAlign="center" mb={16}>
          <MotionBox
            ref={headerRef}
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
            variants={headerVariants}
          >
            <Heading
              as="h2"
              fontSize={{ base: '3xl', md: '5xl' }}
              fontWeight="bold"
              mb={3}
            >
              {"Technical Arsenal".split('').map((char, i) => (
                <motion.span
                  key={i}
                  style={{
                    display: 'inline-block',
                    transformOrigin: 'center bottom',
                    perspective: '1000px',
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
                    delay: i * 0.03,
                    ease: [0.23, 1, 0.32, 1]
                  }}
                >
                  <Box
                    as="span"
                    bgGradient="linear(to-r, #059669, #2563eb, #9333ea)"
                    bgClip="text"
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </Box>
                </motion.span>
              ))}
            </Heading>

            <Text
              fontSize="lg"
              color="text.secondary"
              maxW="600px"
              mx="auto"
            >
              Tools and technologies I use to bring ideas to life
            </Text>
          </MotionBox>

          {/* Stats */}
          <HStack spacing={8} pt={4}>
            <VStack spacing={0}>
              <Heading size="xl" color="brand.400">
                {Object.values(skills).flat().length}
              </Heading>
              <Text fontSize="sm" color="text.muted">
                Total Skills
              </Text>
            </VStack>
            <VStack spacing={0}>
              <Heading size="xl" color="purple.400">
                {categories.length}
              </Heading>
              <Text fontSize="sm" color="text.muted">
                Categories
              </Text>
            </VStack>
          </HStack>
        </VStack>

        {/* Skills by Category */}
        <VStack spacing={12} align="stretch">
          {categories.map((category, index) => (
            <CategorySection
              key={category}
              category={category}
              skills={skills[category]}
              color={categoryColors[category]?.color || '#14b8a6'}
              index={index}
            />
          ))}
        </VStack>
      </Container>
    </Box>
  );
}