
import React from 'react';
import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  SimpleGrid,
  Icon
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { 
  FaCode,
  FaBrain
} from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
// Motion components
const MotionBox = motion.create(Box);
const MotionHeading = motion.create(Heading);
const MotionGridItem = motion.create(GridItem);

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


// About Section Component
function About() {
  const [headerRef, headerInView] = useInView({ 
      triggerOnce: false,
      threshold: 0.2
    });
    
  const [topLeftRef, topLeftInView] = useInView({ 
    triggerOnce: false,
    threshold: 0.2
  });

  const [middleRef, middleInView] = useInView({ 
    triggerOnce: false,
    threshold: 0.2
  });

  const [topRightRef, topRightInView] = useInView({ 
    triggerOnce: false,
    threshold: 0.2
  });

  const [bottomLeftRef, bottomLeftInView] = useInView({ 
    triggerOnce: false,
    threshold: 0.2
  });

  const [bottomRightRef, bottomRightInView] = useInView({ 
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
      p={90}
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
            ref={headerRef}
            as="h2"
            fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
            fontWeight="bold"
            textAlign="center"
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
            variants={headerVariants}
            mb={12}
          >
            <Text as="span" color="brand.400">About Me</Text>
          </MotionHeading>
          <Grid
               templateColumns="repeat(3, 1fr)"
               templateRows="repeat(5, 1fr)"
               gap={4}
               w="100%"
               h="100vh"
               p={4}
             >
               {/* Top Left - 3 rows */}
               <MotionGridItem
                 ref={topLeftRef}
                 rowSpan={2}
                 colSpan={1}
                 bg="surface.card"
                 borderRadius="xl"
                 border="1px solid"
                 borderColor="border.primary"
                 p={6}
                 initial="hidden"
                 animate={topLeftInView ? "visible" : "hidden"}
                 variants={cardVariants}
                 _hover={{
                   borderColor: 'brand.400',
                   boxShadow: '0 0 30px rgba(20, 184, 166, 0.2)'
                 }}
                 transition="all 0.3s"
               >
                 <VStack spacing={4} align="stretch" h="100%">
           <Heading
             as="h3"
             fontSize={{ base: 'xl', md: '2xl' }}
             fontWeight="bold"
             color="brand.400"
           >
             About Me
           </Heading>
         
           <Text
             fontSize={{ base: 'sm', md: 'md' }}
             color="text.primary"
             lineHeight="1.6"
             noOfLines={4}
           >
             Hi! I'm a <Text as="span" color="brand.400" fontWeight="600">Computer Science graduate</Text> specializing 
             in full-stack web development and machine learning. I'm passionate about building 
             practical solutions to real-world problems.
           </Text>
         
           <HStack spacing={3} pt={2} flexWrap="wrap">
             <HStack spacing={1} color="brand.400" fontSize="sm">
               <Icon as={FaCode} boxSize={4} />
               <Text fontWeight="600">Full-Stack</Text>
             </HStack>
             <HStack spacing={1} color="brand.400" fontSize="sm">
               <Icon as={FaBrain} boxSize={4} />
               <Text fontWeight="600">ML</Text>
             </HStack>
           </HStack>
         </VStack>
               </MotionGridItem>
         
               {/* Middle - 5 rows */}
               <MotionGridItem
                 ref={middleRef}
                 rowSpan={5}
                 colSpan={1}
                 bg="surface.card"
                 borderRadius="xl"
                 border="1px solid"
                 borderColor="border.primary"
                 p={6}
                 initial="hidden"
                 animate={middleInView ? "visible" : "hidden"}
                 variants={cardVariants}
                 _hover={{
                   borderColor: 'brand.400',
                   boxShadow: '0 0 30px rgba(20, 184, 166, 0.2)'
                 }}
                 transition="all 0.3s"
               >
                 <Box>Middle (5 rows)</Box>
               </MotionGridItem>
         
               {/* Top Right - 3 rows */}
               <MotionGridItem
                 ref={topRightRef}
                 rowSpan={3}
                 colSpan={1}
                 bg="surface.card"
                 borderRadius="xl"
                 border="1px solid"
                 borderColor="border.primary"
                 p={6}
                 initial="hidden"
                 animate={topRightInView ? "visible" : "hidden"}
                 variants={cardVariants}
                 _hover={{
                   borderColor: 'brand.400',
                   boxShadow: '0 0 30px rgba(20, 184, 166, 0.2)'
                 }}
                 transition="all 0.3s"
                 overflow="hidden"
               >
                 <Box>Top Right (3 rows) </Box>
               </MotionGridItem>
         
               {/* Bottom Left - 2 rows */}
               <MotionGridItem
                 ref={bottomLeftRef}
                 rowSpan={3}
                 colSpan={1}
                 bg="surface.card"
                 borderRadius="xl"
                 border="1px solid"
                 borderColor="border.primary"
                 p={6}
                 initial="hidden"
                 animate={bottomLeftInView ? "visible" : "hidden"}
                 variants={cardVariants}
                 _hover={{
                   borderColor: 'brand.400',
                   boxShadow: '0 0 30px rgba(20, 184, 166, 0.2)'
                 }}
                 transition="all 0.3s"
               >
                 <Box>Bottom Right (3 rows)</Box>
               </MotionGridItem>
         
               {/* Bottom Right - 3 rows */}
               <MotionGridItem
                 ref={bottomRightRef}
                 rowSpan={3}
                 colSpan={1}
                 bg="surface.card"
                 borderRadius="xl"
                 border="1px solid"
                 borderColor="border.primary"
                 p={6}
                 initial="hidden"
                 animate={bottomRightInView ? "visible" : "hidden"}
                 variants={cardVariants}
                 _hover={{
                   borderColor: 'brand.400',
                   boxShadow: '0 0 30px rgba(20, 184, 166, 0.2)'
                 }}
                 transition="all 0.3s"
               >
                 <Box>Bottom Left (2 rows)</Box>
               </MotionGridItem>
             </Grid>
        </MotionBox>
      </Container> 
    </Box>
  );
}

export default About;