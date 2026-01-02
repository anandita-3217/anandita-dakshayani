import React from "react";
import GitHubCalendar from "react-github-calendar";
import {
  Box,
  Container,
  Heading,
  Text,
  useColorMode
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useInView } from "react-intersection-observer";
const MotionBox = motion.create(Box);
const MotionHeading = motion.create(Heading);

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6}
  }
};
const mapVariants = {
  hidden: { opacity: 0, y: -40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6}
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

function ContributionMap()  {
  const { colorMode } = useColorMode();
  const [headerRef,headerInView] = useInView({
    triggerOnce: false,
    threshold: 0.2
  });
  const [mapRef, mapInView] = useInView({
    triggerOnce: false,
    threshold: 0.2
  });
  const labels = {
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    totalCount: '{{count}} contributions in {{year}}', 
    legend: {
      less: 'Less',
      more: 'More',
    },
  };

  // Theme-aware color schemes
  const lightTheme = ["#ebedf0", "#c4ede8", "#89dbd2", "#4ec9bc", "#14b8a6"];
  const darkTheme = ["#1e1e1e", "#c4ede8", "#89dbd2", "#4ec9bc", "#14b8a6"];

  return (
    <Box
      as="section"
      id="contributions"
      bg="transparent"
      color="text.primary"
      py={{ base: 16, md: 20 }}
      px={{ base: 4, md: 8, lg: 16 }}
      position="relative"
      overflow="hidden"

    >
      {/* Background decoration */}
      {/* <MotionBox
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        textAlign="center"
        mb={8}
      /> */}
          <MotionHeading
            // ref={headerRef}
            as="h2"
            fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
            fontWeight="bold"
            textAlign="center"
            mb={4}
            initial="hidden"
            // animate={headerInView ? "hidden":"visible"}
            // variants={headerVariants}
          >
            <Text as="span" color="brand.400">My GitHub Contributions</Text>
          </MotionHeading>

          <MotionBox
            ref={mapRef}
            initial="hidden"
            animate={mapInView ? "hidden":"visible"}
            variants={mapVariants}
            textAlign="center"
            mb={12}
          >
            <Text 
              color="text.secondary" 
              fontSize={{ base: 'sm', md: 'md' }}
              maxW="600px"
              mx="auto"
            >
              A visualization of my coding activity and contributions on GitHub
            </Text>
          </MotionBox>

          {/* GitHub Calendar Container */}
          <MotionBox
            // variants={fadeInUp}
            w="full"
            display="flex"
            justifyContent="center"
            overflowX="auto"
            bg="bg.primary"
            borderRadius="xl"
            border="1px solid"
            borderColor="border.primary"
            p={{ base: 4, md: 8 }}
            _hover={{
              borderColor: 'brand.400',
              boxShadow: '0 8px 25px rgba(20, 184, 166, 0.1)'
            }}
            transition="all 0.3s"
          >
            <Box 
              width="100%" 
              display="flex" 
              justifyContent="center"
              sx={{
                // Style the calendar labels
                '.react-activity-calendar__legend-label': {
                  color: 'text.secondary',
                },
                '.react-activity-calendar__count': {
                  color: 'text.secondary',
                },
                // Ensure proper spacing
                'svg': {
                  maxWidth: '100%',
                  height: 'auto',
                }
              }}
            >
              <GitHubCalendar
                username="anandita-3217"
                blockSize={18}
                fontSize={16}
                theme={{
                  light: lightTheme,
                  dark: darkTheme,
                }}
                colorScheme={colorMode}
                labels={labels}
              />
            </Box>
          </MotionBox>
    </Box>
  );
};

export default ContributionMap;