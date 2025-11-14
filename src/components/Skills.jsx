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
  Flex,
  Badge,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Code } from "lucide-react";

const MotionBox = motion(Box);
const MotionBadge = motion(Badge);

// TechIcon Component
function TechIcon({ logoKey, name, size = 20 }) {
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
        bg="teal.100" 
        color="teal.600"
        borderRadius="sm"
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

export default function SkillsShowcase() {
  const [selectedCategory, setSelectedCategory] = useState("Languages");

  const skills = {
    Languages: [
      { name: "Python", logoKey: "python" },
      { name: "Java", logoKey: "java" },
      { name: "JavaScript", logoKey: "javascript" },
      { name: "HTML", logoKey: "html5" },
      { name: "CSS", logoKey: "css3" },
      { name: "R", logoKey: "r" }
    ],
    Frameworks: [
      { name: "React", logoKey: "react" },
      { name: "Node.js", logoKey: "nodejs" },
      { name: "Electron", logoKey: "electron" },
      { name: "Express", logoKey: "express" },
      { name: "Nextjs", logoKey: "nextjs" },
      { name: "Nextjs", logoKey: "nodejs" },
      { name: "Django", logoKey: "django" },
      { name: "Flask", logoKey: "flask" },
      { name: "Tkinter", logoKey: "tkinter" },
      { name: "Kivy", logoKey: "kivy" },
    ],
        UIFrameworks: [
      { name: "BootStrap", logoKey: "bootstrap" },
      { name: "TailwindCss", logoKey: "tailwindcss" },
      { name: "Chakra UI", logoKey: "chakraui" },
      { name: "Material UI", logoKey: "materialui" },
    ],
    Databases: [
      { name: "MongoDB", logoKey: "mongodb" },
      { name: "MySQL", logoKey: "mysql" },
      { name: "SQLite", logoKey: "sqlite" },
    ],
    MachineLearning: [
      { name: "Numpy", logoKey: "numpy" },
      { name: "ScikitLearn", logoKey: "scikitlearn" },
      { name: "pandas", logoKey: "pandas" },
      { name: "TensorFlow", logoKey: "tensorflow" },
      { name: "HuggingFace", logoKey: "huggingface" },
    ],

  };

  const categories = Object.keys(skills);
  const textPrimary = useColorModeValue("gray.900", "white");
  const textSecondary = useColorModeValue("gray.600", "gray.400");
  const badgeHoverBg = useColorModeValue("gray.100", "gray.600");

  return (
    <Box as="section" py={{ base: 12, md: 24 }}>
      <Container maxW="6xl" px={{ base: 4, md: 6 }} mx="auto">
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          textAlign="center"
          mb={8}
        >
          <Heading
            as="h2"
            fontSize={{ base: "3xl", sm: "4xl", md: "5xl" }}
            fontWeight="bold"
            letterSpacing="tight"
            color={textPrimary}
            mb={4}
          >
            Technical Skills
          </Heading>
        </MotionBox>

        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          mt={{ base: 8, md: 12 }}
        >
          <Tabs
            variant="unstyled"
            index={categories.indexOf(selectedCategory)}
            onChange={(index) => setSelectedCategory(categories[index])}
          >
            <Flex justify="center" mb={8}>
              <TabList
                display="flex"
                flexWrap="wrap"
                gap={2}
                h="auto"
                bg="transparent"
                backdropFilter="blur(10px)"
                p={1}
                borderRadius="lg"
              >
                {categories.map((category) => (
                  <Tab
                    key={category}
                    px={4}
                    py={2}
                    fontSize="sm"
                    fontWeight="medium"
                    borderRadius="md"
                    color={textSecondary}
                    bg="teal.900"
                    _selected={{
                      bg: "teal.400",
                      color: textPrimary,
                      boxShadow: "sm",
                    }}
                    transition="all 0.2s"
                  >
                    {category}
                  </Tab>
                ))}
              </TabList>
            </Flex>

            <TabPanels>
              {categories.map((category) => (
                <TabPanel key={category} p={0}>
                  <Box
                    bg="transparent"
                backdropFilter="blur(10px)"
                    borderRadius="lg"
                    p={6}
                  >
                    <Flex
                      flexWrap="wrap"
                      gap={3}
                      justify="center"
                    >
                      {/* {skills[category].map((skill, index) => (
                        <MotionBadge
                          key={skill.name}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          whileHover={{ backgroundColor: badgeHoverBg }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          fontSize="sm"
                          py={2}
                          px={4}
                          bg= "teal.900"
                          border="1px solid"
                          borderColor={useColorModeValue("gray.200", "gray.600")}
                          borderRadius="md"
                          display="flex"
                          alignItems="center"
                          gap={2}
                          cursor="pointer"
                        >
                          <TechIcon logoKey={skill.logoKey} name={skill.name} size={20} />
                          {skill.name}
                        </MotionBadge>
                      ))} */}
                      {skills[category].map((skill, index) => (
                        <MotionBadge
                          key={`${category}-${skill.name}`}
                          initial={{ opacity: 0, y: 20, scale: 0.8 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          whileHover={{ scale: 1.05, backgroundColor: badgeHoverBg }}
                          transition={{ 
                            duration: 0.4, 
                            delay: index * 0.1,
                            ease: "easeOut"
                          }}
                          fontSize="sm"
                          py={2}
                          px={4}
                          bg= "teal.900"
                          border="1px solid"
                          borderColor={useColorModeValue("gray.200", "gray.600")}
                          borderRadius="md"
                          display="flex"
                          alignItems="center"
                          gap={2}
                          cursor="pointer"
                        >
                          <TechIcon logoKey={skill.logoKey} name={skill.name} size={20} />
                          {skill.name}
                        </MotionBadge>
                      ))}
                    </Flex>
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