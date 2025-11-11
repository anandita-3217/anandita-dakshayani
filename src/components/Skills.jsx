// import React from "react"
// import {  
//   Box,
//   Container,
//   Text,
//   VStack,
//   Heading,
//   SimpleGrid,
//   Icon
// } from '@chakra-ui/react'
// import { motion } from 'framer-motion';
// import { 
//   FaReact, 
//   FaPython, 
//   FaCode,
//   FaBrain
// } from 'react-icons/fa';
// import { 
//   SiDjango, 
//   SiJavascript, 
//   SiElectron,
//   SiTensorflow,
//   SiMongodb,
//   SiSqlite 
// } from 'react-icons/si';

// const MotionBox = motion.create(Box);
// const MotionHeading = motion.create(Heading);
// const scaleIn = {
//   hidden: { opacity: 0, scale: 0.8 },
//   visible: { 
//     opacity: 1, 
//     scale: 1,
//     transition: { duration: 0.4, ease: "easeOut" }
//   }
// };
// const fadeInUp = {
//   hidden: { opacity: 0, y: 30 },
//   visible: { 
//     opacity: 1, 
//     y: 0,
//     transition: { duration: 0.6, ease: "easeOut" }
//   }
// };
// const staggerContainer = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.2,
//       delayChildren: 0.1
//     }
//   }
// };
// function Skills(){
//     const skills = [
//       { name: 'React', icon: FaReact, color: '#61DAFB' },
//       { name: 'Django', icon: SiDjango, color: '#092E20' },
//       { name: 'Python', icon: FaPython, color: '#3776AB' },
//       { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
//       { name: 'Electron', icon: SiElectron, color: '#3178C6' },
//       { name: 'TensorFlow', icon: SiTensorflow, color: '#FF6F00' },
//       { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
//       { name: 'Sqlite', icon: SiSqlite , color: '#4169E1' },
//     ];
//       return (
//         <Box
//           id="skills"
//           bg="transparent"
//           color="white"
//           py={{ base: 16, md: 24 }}
//           position="relative"
//           overflow="hidden"
//           padding={30}
//         >
//           {/* Background decoration */}
//           <MotionBox
//             position="absolute"
//             top="20%"
//             left="5%"
//             w="200px"
//             h="200px"
//             bg="rgba(20, 184, 166, 0.03)"
//             borderRadius="full"
//             filter="blur(40px)"
//             animate={{
//               scale: [1, 1.2, 1],
//               opacity: [0.3, 0.5, 0.3]
//             }}
//             transition={{
//               duration: 6,
//               repeat: Infinity,
//               ease: "easeInOut"
//             }}
//           />
    
//           <Container maxW="container.xl" position="relative" zIndex={1}>
//             <MotionBox
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: true, margin: "-100px" }}
//               variants={staggerContainer}
//             >
//               {/* Skills Section */}
//               <MotionHeading
//                 as="h3"
//                 fontSize={{ base: '2xl', md: '3xl' }}
//                 fontWeight="bold"
//                 textAlign="center"
//                 mb={8}
//                 variants={fadeInUp}
//               >
//                  <Text as="span" color="#14b8a6">Technical Skills</Text>
//               </MotionHeading>
    
//               <SimpleGrid
//                 columns={{ base: 2, sm: 3, md: 4 }}
//                 spacing={6}
//                 variants={staggerContainer}
//               >
//                 {skills.map((skill, index) => (
//                   <MotionBox
//                     key={skill.name}
//                     variants={scaleIn}
//                     whileHover={{ 
//                       scale: 1.1,
//                       y: -5
//                     }}
//                     transition={{ duration: 0.2 }}
//                   >
//                     <VStack
//                       bg="#222"
//                       p={6}
//                       borderRadius="xl"
//                       border="2px solid"
//                       borderColor="#2a2a2a"
//                       spacing={3}
//                       cursor="pointer"
//                       _hover={{
//                         borderColor: '#14b8a6',
//                         bg: '#2a2a2a',
//                         boxShadow: '0 8px 25px rgba(20, 184, 166, 0.15)'
//                       }}
//                       transition="all 0.3s"
//                     >
//                       <Icon 
//                         as={skill.icon} 
//                         boxSize={{ base: 8, md: 10 }} 
//                         color="#14b8a6"
//                       />
//                       <Text 
//                         fontWeight="600" 
//                         fontSize={{ base: 'sm', md: 'md' }}
//                         color="#e0e0e0"
//                       >
//                         {skill.name}
//                       </Text>
//                     </VStack>
//                   </MotionBox>
//                 ))}
//               </SimpleGrid>
//             </MotionBox>
//           </Container>
//         </Box>
//       );
// }
// export default Skills;
// components/SkillsShowcase.jsx
import React, { useState } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  SimpleGrid,
  Badge,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import SkillIcon from "./SkillIcons";

const MotionBox = motion(Box);

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState("Languages");

  const skills = {
    Languages: [
      { name: "JavaScript", icon: "code" },
      { name: "Python", icon: "coffee" },
      { name: "TypeScript", icon: "type" },
    ],
    Frameworks: [
      { name: "React", icon: "layout" },
      { name: "Django", icon: "server" },
      { name: "TensorFlow", icon: "brain" },
    ],
    Databases: [
      { name: "MongoDB", icon: "database" },
      { name: "SQLite", icon: "database" },
      { name: "PostgreSQL", icon: "cloud-cog" },
    ],
    DevOps: [
      { name: "Docker", icon: "container" },
      { name: "GitHub Actions", icon: "git-branch" },
      { name: "AWS", icon: "cloud" },
    ],
  };

  const categories = Object.keys(skills);

  const bgMuted = useColorModeValue("gray.100", "gray.800");
  const accent = useColorModeValue("#14b8a6", "#5eead4");

  return (
    <Box py={{ base: 12, md: 24 }}>
      <Container maxW="6xl" textAlign="center">
        {/* Heading Section */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          mb={8}
        >
          <Heading
            as="h2"
            size="2xl"
            mb={2}
            fontWeight="bold"
            color={useColorModeValue("gray.900", "white")}
          >
            Technical Skills
          </Heading>
          <Text
            color={useColorModeValue("gray.600", "gray.400")}
            fontSize="lg"
            maxW="700px"
            mx="auto"
          >
            My expertise across various technologies and tools
          </Text>
        </MotionBox>

        {/* Tabs */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Tabs
            variant="soft-rounded"
            colorScheme="teal"
            align="center"
            onChange={(index) => setSelectedCategory(categories[index])}
          >
            <TabList
              flexWrap="wrap"
              justifyContent="center"
              gap={2}
              mb={6}
            >
              {categories.map((category) => (
                <Tab
                  key={category}
                  _selected={{
                    color: "white",
                    bg: accent,
                    boxShadow: `0 0 10px ${accent}`,
                  }}
                >
                  {category}
                </Tab>
              ))}
            </TabList>

            <TabPanels>
              {categories.map((category) => (
                <TabPanel key={category}>
                  <Box
                    bg={bgMuted}
                    p={8}
                    borderRadius="xl"
                    border="1px solid"
                    borderColor={useColorModeValue("gray.300", "gray.700")}
                    backdropFilter="blur(8px)"
                  >
                    <SimpleGrid
                      columns={{ base: 2, sm: 3, md: 4, lg: 5 }}
                      spacing={6}
                      justifyItems="center"
                    >
                      {skills[category].map((skill, index) => (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                          <Badge
                            px={4}
                            py={3}
                            borderRadius="lg"
                            variant="outline"
                            borderColor={accent}
                            bg="transparent"
                            display="flex"
                            alignItems="center"
                            gap={2}
                            fontSize="md"
                            color={accent}
                            transition="all 0.2s"
                            _hover={{
                              bg: useColorModeValue(
                                "teal.50",
                                "rgba(20, 184, 166, 0.1)"
                              ),
                              transform: "translateY(-4px)",
                            }}
                          >
                            <SkillIcon name={skill.icon} size={20} color={accent} />
                            {skill.name}
                          </Badge>
                        </motion.div>
                      ))}
                    </SimpleGrid>
                  </Box>
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        </MotionBox>
      </Container>
    </Box>
  );
}
