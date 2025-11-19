import React from "react"
import {  
  Box,
  Container,
  Button,
  HStack,
  Text,
  Code,
  Heading,
  Image,
  Grid,
  GridItem
} from '@chakra-ui/react'
import { motion } from 'framer-motion';
import Error from "./assets/Error404.gif"
import { useNavigate } from "react-router-dom";

// Create motion components
const MotionBox = motion.create(Box);
const MotionButton = motion.create(Button);
const MotionImage = motion.create(Image);
const MotionText = motion.create(Text);
const MotionHeading = motion.create(Heading);

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};


function NotFound(){
  const navigate = useNavigate();
  const handleProjectsClick = ()  => {
    navigate('/');
    setTimeout(() =>{
      const projectsSection = document.getElementById('projects');
      if (projectsSection){
        projectsSection.scrollIntoView({behavior: 'smooth',block: 'start'});
      }
    },100);
  };
    return (
        <Box 
          id="notFound" 
          bg="bg.secondary" 
          minH="100vh"
          display="flex"
          alignItems="center"
          py={{ base: 12, md: 20 }}
        >
            <Container maxW="container.md" position="relative" zIndex={1}>
                <MotionBox
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    position="relative"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    textAlign="center"
                    >
                    {/* 404 Header */}
                    <MotionHeading
                      as="h1"
                      fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
                      fontWeight="bold"
                      color="brand.400"
                      mb={4}
                      variants={fadeInUp}
                    >
                      404: Null Pointer Exception
                    </MotionHeading>

                    {/* Error Image with float animation */}
                    <Grid
                              templateColumns={{ base: '1fr', lg: '1fr 1fr' }}
                              gap={{ base: 8, lg: 12 }}
                              alignItems="center"
                            >
                      <GridItem>
                    <MotionImage
                      src={Error}
                      alt="Error 404"
                      boxSize={{ base: "100px", md: "180px", lg: "250px" }}
                      variants={scaleIn}
                      animate={{
                        y: [0, -15, 0]
                      }}
                      transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut"
                      }}
                      filter="drop-shadow(0 10px 30px rgba(20, 184, 166, 0.3))"
                      mb={8}
                    />
                  </GridItem>
                    {/* Code Block */}
                    <GridItem>
                    <MotionBox
                      variants={fadeInUp}
                      bg="bg.primary"
                      p={{ base: 4, md: 6 }}
                      borderRadius="xl"
                      border="2px solid"
                      borderColor="border.primary"
                      mb={8}
                      maxW="500px"
                      w="full"
                      fontFamily="'Courier New', monospace"
                      fontSize={{ base: 'sm', md: 'md' }}
                      color="text.primary"
                      textAlign="left"
                      _hover={{
                        borderColor: 'brand.400',
                        boxShadow: '0 0 20px rgba(20, 184, 166, 0.2)'
                      }}
                      transition="all 0.3s"
                    >
                      <Code 
                        bg="transparent" 
                        color="brand.400" 
                        fontSize="inherit"
                        fontFamily="inherit"
                      >
                        try &#123;
                      </Code>
                      <br />
                      <Code 
                        bg="transparent" 
                        color="text.secondary" 
                        fontSize="inherit"
                        fontFamily="inherit"
                        pl={4}
                      >
                        findPage(requestedURL);
                      </Code>
                      <br />
                      <Code 
                        bg="transparent" 
                        color="brand.400" 
                        fontSize="inherit"
                        fontFamily="inherit"
                      >
                        &#125; catch
                      </Code>
                      <Code 
                        bg="transparent" 
                        color="#ff6b6b" 
                        fontSize="inherit"
                        fontFamily="inherit"
                      >
                      (PageNotFoundException e) &#123;
                      </Code>
                      <br />
                      <Code 
                        bg="transparent" 
                        color="gray.400" 
                        fontSize="inherit"
                        fontFamily="inherit"
                        pl={4}
                      >
                        // TODO: Maybe create this page?
                      </Code>
                      <br />
                      <Code 
                        bg="transparent" 
                        color="text.secondary" 
                        fontSize="inherit"
                        fontFamily="inherit"
                        pl={4}
                      >
                        return "Let's get you somewhere that exists";
                      </Code>
                      <br />
                      <Code 
                        bg="transparent" 
                        color="#ff6b6b" 
                        fontSize="inherit"
                        fontFamily="inherit"
                      >
                        &#125;
                      </Code>
                    </MotionBox>
                    </GridItem>
                  </Grid>

                    {/* Action Buttons */}
                    <MotionBox variants={fadeInUp}>
                      <HStack spacing={4} w="full" flexWrap="wrap" justify="center">
                        <MotionButton
                          as="a"
                          href="/"
                          bg = "brand.400"
                          color="white"
                          size="lg"
                          px={10}
                          py={6}
                          fontSize="md"
                          fontWeight="600"
                          w={{ base: "full", sm: "auto" }}
                          whileHover={{ 
                            scale: 1.05,
                            boxShadow: '0 8px 25px rgba(20, 184, 166, 0.4)'
                          }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                        >
                          Return to Home
                        </MotionButton>

                        <MotionButton
                          onClick={handleProjectsClick}
                          variant="outline"
                          size="lg"
                          px={10}
                          py={6}
                          fontSize="md"
                          fontWeight="600"
                          borderColor="border.secondary"
                          color="text.primary"
                          w={{ base: "full", sm: "auto" }}
                          _hover={{
                            borderColor: 'brand.400',
                            color: 'brand.400',
                            bg: 'bg.accent'
                          }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                        >
                          View Projects
                        </MotionButton>
                      </HStack>
                    </MotionBox>

                    {/* Footer Note */}
                    <MotionText
                      variants={fadeInUp}
                      fontSize="xs"
                      color="text.muted"
                      mt={12}
                      fontStyle="italic"
                    >
                      Error code: 404 | Status: Page not compiled
                    </MotionText>
                </MotionBox>
            </Container>
        </Box>
    )
}

export default NotFound;
