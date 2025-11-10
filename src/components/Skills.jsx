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

function Skills(){
      return (
        <Box
          id="about"
          bg="transparent"
          color="white"
          py={{ base: 16, md: 24 }}
          position="relative"
          overflow="hidden"
          padding={30}
        >
          {/* Background decoration */}
          <MotionBox
            position="absolute"
            top="20%"
            left="5%"
            w="200px"
            h="200px"
            bg="rgba(20, 184, 166, 0.03)"
            borderRadius="full"
            filter="blur(40px)"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 6,
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
              {/* Skills Section */}
              <MotionHeading
                as="h3"
                fontSize={{ base: '2xl', md: '3xl' }}
                fontWeight="bold"
                textAlign="center"
                mb={8}
                variants={fadeInUp}
              >
                 <Text as="span" color="#14b8a6">Technical Skills</Text>
              </MotionHeading>
    
              <SimpleGrid
                columns={{ base: 2, sm: 3, md: 4 }}
                spacing={6}
                variants={staggerContainer}
              >
                {skills.map((skill, index) => (
                  <MotionBox
                    key={skill.name}
                    variants={scaleIn}
                    whileHover={{ 
                      scale: 1.1,
                      y: -5
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <VStack
                      bg="#222"
                      p={6}
                      borderRadius="xl"
                      border="2px solid"
                      borderColor="#2a2a2a"
                      spacing={3}
                      cursor="pointer"
                      _hover={{
                        borderColor: '#14b8a6',
                        bg: '#2a2a2a',
                        boxShadow: '0 8px 25px rgba(20, 184, 166, 0.15)'
                      }}
                      transition="all 0.3s"
                    >
                      <Icon 
                        as={skill.icon} 
                        boxSize={{ base: 8, md: 10 }} 
                        color="#14b8a6"
                      />
                      <Text 
                        fontWeight="600" 
                        fontSize={{ base: 'sm', md: 'md' }}
                        color="#e0e0e0"
                      >
                        {skill.name}
                      </Text>
                    </VStack>
                  </MotionBox>
                ))}
              </SimpleGrid>
            </MotionBox>
          </Container>
        </Box>
      );
}
export default Skills;