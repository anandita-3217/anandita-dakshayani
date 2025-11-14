import React from "react";
import GitHubCalendar from "react-github-calendar";
import "./contribution_map.css";
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
    <MotionBox>
      <Box className="contribution-map">
        <MotionHeading color = "#14b8a6">My Github Contributions</MotionHeading>
        <Box className="react-github-calendar">
          <Box className="calendar-wrapper">
            <GitHubCalendar
              username="anandita-3217"
              blockSize={18}
              fontSize={16}
              labels={labels}
            />
          </Box>
        </Box>
      </Box>
    </MotionBox>
  );
};

export default ContributionMap;