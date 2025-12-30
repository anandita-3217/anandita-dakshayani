import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
  Badge,
  Image,
  Spinner,
  Center,
  transition,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Code } from "lucide-react";
import { useInView } from "react-intersection-observer";

const MotionBox = motion.create(Box);
const MotionHeading = motion.create(Heading);
const MotionBadge = motion.create(Badge);

const headerVariants = {
  hidden: {opacity:0,y:40},
  visible:{
    opacity:1,
    y:0,
    transition: {duration:0.7}
  }
}

const skillsVariants = {
  hidden: {opacity:0,y:-40},
  visible:{
    opacity:1,
    y:0,
    transition: {duration:0.7}
  }
}

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

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState("Languages");
  const [skills, setSkills] = useState({});
  const [loading, setLoading] = useState(true);
  const [headerRef,headerInView] = useInView({
    triggerOnce: false,
    threshold: 0.2
  });
  const [skillsRef,skillsInView] = useInView({
    triggerOnce: false,
    threshold: 0.2
  });
  useEffect(() => {
    // Load skills from JSON file
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
      <Box as="section" py={{ base: 12, md: 24 }}>
        <Container maxW="6xl" px={{ base: 4, md: 6 }} mx="auto">
          <Center h="400px">
            <Spinner size="xl" color="teal.400" thickness="4px" />
          </Center>
        </Container>
      </Box>
    );
  }

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
          <MotionHeading
            ref={headerRef}
            as="h2"
            fontSize={{ base: "3xl", sm: "4xl", md: "5xl" }}
            fontWeight="bold"
            letterSpacing="tight"
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
            variants={headerVariants}
            color="#14b8a6"
            mb={4}
          >
            Technical Skills
          </MotionHeading>
        </MotionBox>

        <MotionBox
          viewport={{ once: true }}
          mt={{ base: 8, md: 12 }}
          ref={skillsRef}
          initial="hidden"
          animate={skillsInView?"visible":"hidden"}
          variants={skillsVariants}
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
                {categories.map((category, i) => (
                  <MotionBox
                    key={category}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: i * 0.05,
                      duration: 0.3,
                    }}
                    as={motion.div}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Tab
                      px={4}
                      py={2}
                      fontSize="sm"
                      fontWeight="medium"
                      borderRadius="md"
                      color="text.secondary"
                      bg="teal.900"
                      _selected={{
                        bg: "teal.400",
                        color: "text.primary",
                        boxShadow: "sm",
                      }}
                      transition="all 0.2s"
                    >
                      {category}
                    </Tab>
                  </MotionBox>
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
                      {skills[category]?.map((skill, index) => (
                        <MotionBadge
                          key={`${category}-${skill.name}`}
                          initial={{ opacity: 0, y: 20, scale: 0.8 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          whileHover={{ scale: 1.05 }}
                          _hover={{ bg: "bg.hover" }}
                          transition={{ 
                            duration: 0.4, 
                            delay: index * 0.1,
                            ease: "easeOut"
                          }}
                          fontSize="sm"
                          py={2}
                          px={4}
                          bg="teal.900"
                          border="1px solid"
                          borderColor="border.primary"
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
