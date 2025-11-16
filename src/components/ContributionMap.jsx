// import React from "react";
// import GitHubCalendar from "react-github-calendar";

// import {
//   Box,Container,Heading,Text,Button,VStack,HStack,SimpleGrid,Icon
// } from '@chakra-ui/react';
// import { motion } from 'framer-motion';

// const MotionBox = motion.create(Box);
// const MotionHeading = motion.create(Heading);
// const fadeInUp = {
//   hidden: { opacity: 0, y: 30 },
//   visible: { 
//     opacity: 1, 
//     y: 0,
//     transition: { duration: 0.6, ease: "easeOut" }
//   }
// };

// const ContributionMap = () => {
//   const labels = {
//     months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
//     weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
//     totalCount: '{{count}} contributions in 2024', 
//     legend: {
//       less: 'Less',
//       more: 'More',
//     },
//   };

//   return (
//     <MotionBox width={"80%"} margin={"0 auto"} padding={"20px"}>
//         <MotionHeading
//                     as="h2"
//                     fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
//                     fontWeight="bold"
//                     textAlign="center"
//                     mb={4}
//                     variants={fadeInUp}
//                   >
//                     <Text as="span" color="#14b8a6">My Github Contributions </Text>
//                   </MotionHeading>
//         <Box w={"100%"} display="flex" justifyContent={"center"} overflowX={"auto"}>
//           <Box width="100%" display="flex" justifyContent={"center"}>
//             <GitHubCalendar
//               username="anandita-3217"
//               blockSize={18}
//               fontSize={16}
//               theme={{
//                 light: ["#1e1e1e", "#c4ede8", "#89dbd2", "#4ec9bc", "#14b8a6"],
//                 dark: ["#1e1e1e", "#c4ede8", "#89dbd2", "#4ec9bc", "#14b8a6"],
//               }}
//               labels={labels}
//             />
//           </Box>
//         </Box>
//     </MotionBox>
//   );
// };

// export default ContributionMap;

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

const MotionBox = motion.create(Box);
const MotionHeading = motion.create(Heading);

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
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

const ContributionMap = () => {
  const { colorMode } = useColorMode();
  
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
      id="contributions"
      bg="transparent"
      color="text.primary"
      py={{ base: 16, md: 20 }}
      position="relative"
      overflow="hidden"
    >
      {/* Background decoration */}
      <MotionBox
        position="absolute"
        top="30%"
        right="10%"
        w="200px"
        h="200px"
        bg="rgba(20, 184, 166, 0.03)"
        borderRadius="full"
        filter="blur(50px)"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 7,
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
          {/* Section Title */}
          <MotionHeading
            as="h2"
            fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
            fontWeight="bold"
            textAlign="center"
            mb={4}
            variants={fadeInUp}
          >
            <Text as="span" color="brand.400">My GitHub Contributions</Text>
          </MotionHeading>

          <MotionBox
            variants={fadeInUp}
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
            variants={fadeInUp}
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
        </MotionBox>
      </Container>
    </Box>
  );
};

export default ContributionMap;