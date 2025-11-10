// Contact Section Component
import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  SimpleGrid,
  Icon,
  Link,
  useColorModeValue
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { 
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaFileDownload,
  FaCode,
  FaBrain
} from 'react-icons/fa';

const MotionBox = motion.create(Box);
const MotionHeading = motion.create(Heading);
const MotionText = motion.create(Text);
// Animation variants
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
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};


function Contact() {
  const contactLinks = [
    {
      name: 'Email',
      icon: FaEnvelope,
      href: 'mailto:ananditad21@gmail.com',
      label: 'ananditad21@gmail.com',
      color: '#14b8a6'
    },
    {
      name: 'LinkedIn',
      icon: FaLinkedin,
      href: 'https://linkedin.com/in/anandita-dakshayani',
      label: 'linkedin.com/in/anandita-dakshayani',
      color: '#0077B5'
    },
    {
      name: 'GitHub',
      icon: FaGithub,
      href: 'https://github.com/anandita-3217',
      label: 'github.com/anandita-3217',
      color: '#fff'
    }
  ];

  return (
    <Box
      id="contact"
      bg="transparent"
      color="white"
      py={{ base: 16, md: 24 }}
      position="relative"
      overflow="hidden"
    >
      {/* Background decoration */}
      <MotionBox
        position="absolute"
        bottom="10%"
        right="10%"
        w="300px"
        h="300px"
        bg="rgba(20, 184, 166, 0.05)"
        borderRadius="full"
        filter="blur(60px)"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <Container maxW="container.md" position="relative" zIndex={1}>
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
            <Text as="span" color="#14b8a6">Let's Connect</Text>
          </MotionHeading>

          <MotionText
            textAlign="center"
            color="#b0b0b0"
            fontSize={{ base: 'md', md: 'lg' }}
            mb={12}
            maxW="600px"
            mx="auto"
            lineHeight="1.8"
            variants={fadeInUp}
          >
            I'm currently seeking software development opportunities. 
            Feel free to reach out if you'd like to work together or just chat about tech!
          </MotionText>

          {/* Contact Cards */}
          <VStack spacing={6} mb={10}>
            {contactLinks.map((contact, index) => (
              <MotionBox
                key={contact.name}
                variants={fadeInUp}
                w="full"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href={contact.href}
                  isExternal
                  _hover={{ textDecoration: 'none' }}
                  w="full"
                >
                  <HStack
                    bg="#1a1a1a"
                    p={6}
                    borderRadius="xl"
                    border="2px solid"
                    borderColor="#2a2a2a"
                    spacing={4}
                    w="full"
                    _hover={{
                      borderColor: '#14b8a6',
                      bg: '#222',
                      boxShadow: '0 8px 25px rgba(20, 184, 166, 0.2)'
                    }}
                    transition="all 0.3s"
                  >
                    <Icon 
                      as={contact.icon} 
                      boxSize={{ base: 6, md: 8 }}
                      color="#14b8a6"
                    />
                    <VStack align="start" spacing={1} flex={1}>
                      <Text 
                        fontWeight="700" 
                        fontSize={{ base: 'md', md: 'lg' }}
                        color="#fff"
                      >
                        {contact.name}
                      </Text>
                      <Text 
                        fontSize={{ base: 'xs', md: 'sm' }}
                        color="#b0b0b0"
                      >
                        {contact.label}
                      </Text>
                    </VStack>
                    <Icon 
                      as={FaCode} 
                      boxSize={4}
                      color="#14b8a6"
                      transform="rotate(-45deg)"
                    />
                  </HStack>
                </Link>
              </MotionBox>
            ))}
          </VStack>

          {/* Resume Download Button */}


          {/* Optional: Additional CTA */}
          <MotionText
            textAlign="center"
            color="#b0b0b0"
            fontSize="sm"
            mt={8}
            variants={fadeInUp}
          >
            Available for full-time opportunities starting immediately
          </MotionText>
        </MotionBox>
      </Container>
    </Box>
  );
}
export default Contact;