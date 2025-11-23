import { useState,useEffect } from 'react';
import {
      Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Badge,
  IconButton,
  Flex,
  Spinner,
  Link
} from '@chakra-ui/react';
import { ChevronLeft, ChevronRight, ExternalLink, Github } from 'lucide-react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
const MotionBox = motion.create(Box);
const MotionHeading = motion.create(Heading);



export default function Learning(){
    return(
        <Box bg="transparent"
        color="text.primary"
        py={{base: 16, md: 20}}
        minH = "100vh"
        id='learning'>

        </Box>
    );
}