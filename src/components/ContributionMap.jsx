import React from "react";
import GitHubCalendar from "react-github-calendar";

import {
  Box,Container,Heading,Text,Button,VStack,HStack,SimpleGrid,Icon
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

const ContributionMap = () => {
  const labels = {
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    totalCount: '{{count}} contributions in 2024', 
    legend: {
      less: 'Less',
      more: 'More',
    },
  };

  return (
    <MotionBox width={"80%"} margin={"0 auto"} padding={"20px"}>
        <MotionHeading
                    as="h2"
                    fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
                    fontWeight="bold"
                    textAlign="center"
                    mb={4}
                    variants={fadeInUp}
                  >
                    <Text as="span" color="#14b8a6">My Github Contributions </Text>
                  </MotionHeading>
        <Box w={"100%"} display="flex" justifyContent={"center"} overflowX={"auto"}>
          <Box width="100%" display="flex" justifyContent={"center"}>
            <GitHubCalendar
              username="anandita-3217"
              blockSize={18}
              fontSize={16}
              theme={{
                light: ["#1e1e1e", "#c4ede8", "#89dbd2", "#4ec9bc", "#14b8a6"],
                dark: ["#1e1e1e", "#c4ede8", "#89dbd2", "#4ec9bc", "#14b8a6"],
              }}
              labels={labels}
            />
          </Box>
        </Box>
    </MotionBox>
  );
};

export default ContributionMap;