import React from 'react';
import {
  Box,
  Text,
  VStack,
  Heading,
} from '@chakra-ui/react';


export default function AboutPart() {
  return (

      <Box maxW="800px" mx="auto" py={20} px={6}>
        <VStack align="start" spacing={8}>
          <Heading
            as="h2"
            fontSize={{ base: '3xl', md: '5xl' }}
            fontWeight="bold"
            bgGradient='linear(to-r, #059669, #2563eb, #9333ea)'
            bgClip="text"
            letterSpacing="tight"
          >
            About Me
          </Heading>

          <VStack align="start" spacing={6} fontSize="xl" lineHeight="1.8">
            <Text color="text.secondary">
              I can't draw on paper. Never could. My sketches look like a
              toddler's refrigerator art.
            </Text>
            <Text color="text.secondary">
              But when I discovered web design, everything clicked.{' '}
              <Text
                as="span"
                fontWeight="600"
                color="text.primary"
                position="relative"
                _after={{
                  content: '""',
                  position: 'absolute',
                  bottom: '0.1em',
                  left: 0,
                  right: 0,
                  height: '0.3em',
                  bgGradient: 'gradients.jewel',
                  opacity: 0.3,
                  zIndex: -1,
                }}
              >
                Code became my canvas.
              </Text>{' '}
              CSS became my paintbrush. Suddenly, I could build the things I
              visualized in my head.
            </Text>
            <Text color="text.secondary">
              Now I'm obsessed with creating websites that feel{' '}
              <Text
                as="span"
                fontWeight="600"
                color="text.primary"
                position="relative"
                _after={{
                  content: '""',
                  position: 'absolute',
                  bottom: '0.1em',
                  left: 0,
                  right: 0,
                  height: '0.3em',
                  bgGradient: 'gradients.jewel',
                  opacity: 0.3,
                  zIndex: -1,
                }}
              >
                alive
              </Text>{' '}
              — where animations enhance the story, where layouts break
              expectations, and where users discover something new with every
              scroll.
            </Text>
          </VStack>
        </VStack>
      </Box>

  );
}