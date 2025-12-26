import React from "react";
import { Container, Button, Box, VStack, Heading, Text, transition } from '@chakra-ui/react';
import pdf from "./assets/Anandita_Dakshayani_Garimella.pdf";
import { motion } from 'framer-motion';
import { FaFileDownload } from 'react-icons/fa';
import { useInView } from "react-intersection-observer";

// Motion components
const MotionBox = motion.create(Box);
const MotionHeading = motion.create(Heading);
// TODO: make the source come from google drive no direct assets

const headerVariants = {
  hidden: {opacity:0, y: 40},
  visible:{
    opacity: 1,
    y: 0,
    transition: {duration: 0.7}
  }
}

const resumeVariants = {
  hidden: {opacity:0, y: -40},
  visible:{
    opacity: 1,
    y: 0,
    transition: {duration: 0.7}
  }
}

function Resume() {
  const [headerRef, headerInView] = useInView({ 
    triggerOnce: false,
    threshold: 0.2
  });
  const [resumeRef, resumeInView] = useInView({ 
    triggerOnce: false,
    threshold: 0.2
  });
  
  return (
    <Box bg="transparent" minH="100vh" py={20} id="resume">
      <Container maxW="container.xl">
        <VStack spacing={8}>
          <MotionHeading 
            ref={headerRef}
            color="brand.400" 
            size="2xl"
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
            variants={headerVariants}
          >
            Resume
          </MotionHeading>
          
          <MotionBox 
            ref={resumeRef}
            textAlign="center"
            initial="hidden"
            viewport={{ once: true }}
            animate={resumeInView ? "visible" : "hidden"}
            variants={resumeVariants}
          >
            <Button
              as="a"
              href={pdf}
              download
              size="lg"
              bg="brand.400"
              color="white"
              px={10}
              py={7}
              fontSize="md"
              fontWeight="600"
              leftIcon={<FaFileDownload />}
              _hover={{
                bg: 'brand.500',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 25px rgba(20, 184, 166, 0.4)'
              }}
              transition="all 0.3s"
            >
              Download Resume
            </Button>
          </MotionBox>
          

          {/* Simple iframe - works everywhere */}
          <Box
            as="iframe"
            src={`${pdf}#toolbar=0`}
            width="60%"
            height="800px"
            border="none"
            borderRadius="lg"
            bg="white"
          />
        </VStack>
      </Container>
    </Box>
  );
}

export default Resume;