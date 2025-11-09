import React from "react";
import { Container, Button, Box, VStack, Heading } from '@chakra-ui/react';
import pdf from "./assets/Anandita_Dakshayani_Garimella.pdf";
import { AiOutlineDownload } from "react-icons/ai";

function Resume() {
  return (
    <Box bg="transparent" minH="100vh" py={20} id="resume">
      <Container maxW="container.xl">
        <VStack spacing={8}>
          <Heading color="white" size="2xl">Resume</Heading>
          
          <Button
            as="a"
            href={pdf}
            download="Anandita_Dakshayani_Resume.pdf"
            bg="#14b8a6"
            color="white"
            size="lg"
            leftIcon={<AiOutlineDownload />}
            _hover={{
              bg: '#0d9488',
              transform: 'translateY(-2px)'
            }}
            transition="all 0.3s"
          >
            Download CV
          </Button>

          {/* Simple iframe - works everywhere */}
          <Box
            as="iframe"
            src={`${pdf}#toolbar=0`}
            width="100%"
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