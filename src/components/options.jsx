import React, { useState } from 'react';
import { Box, VStack, HStack, Text, Heading, Icon, Button, Container } from '@chakra-ui/react';
import { ExternalLink } from 'lucide-react';

// Social data
const socials = [
  {
    name: 'GitHub',
    icon: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
    url: 'https://github.com',
    color: '#fff',
    label: '@yourusername'
  },
  {
    name: 'LinkedIn',
    icon: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    url: 'https://linkedin.com',
    color: '#0077b5',
    label: '/in/yourusername'
  },
  {
    name: 'Twitter',
    icon: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
    url: 'https://twitter.com',
    color: '#1DA1F2',
    label: '@yourusername'
  },
];

// ============================================
// STYLE 1: HORIZONTAL ICON PILLS
// ============================================
const StylePills = () => (
  <Box>
    <Heading size="sm" mb={4} color="purple.400">Style 1: Icon Pills</Heading>
    <HStack spacing={3} flexWrap="wrap">
      {socials.map((social, i) => (
        <Box
          key={i}
          as="a"
          href={social.url}
          target="_blank"
          p={3}
          bg="rgba(255, 255, 255, 0.05)"
          borderRadius="full"
          border="2px solid"
          borderColor="rgba(255, 255, 255, 0.1)"
          transition="all 0.3s"
          cursor="pointer"
          _hover={{
            borderColor: social.color,
            bg: `${social.color}20`,
            transform: 'scale(1.1) rotate(5deg)',
          }}
        >
          <Box color={social.color}>
            <social.icon />
          </Box>
        </Box>
      ))}
    </HStack>
  </Box>
);

// ============================================
// STYLE 2: FLOATING CARDS
// ============================================
const StyleFloating = () => (
  <Box>
    <Heading size="sm" mb={4} color="blue.400">Style 2: Floating Cards</Heading>
    <VStack spacing={3}>
      {socials.map((social, i) => (
        <Box
          key={i}
          as="a"
          href={social.url}
          target="_blank"
          w="100%"
          bg={`${social.color}10`}
          backdropFilter="blur(10px)"
          borderRadius="2xl"
          p={4}
          border="1px solid"
          borderColor={`${social.color}30`}
          transition="all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)"
          cursor="pointer"
          position="relative"
          overflow="hidden"
          _hover={{
            transform: 'translateY(-8px)',
            boxShadow: `0 20px 40px ${social.color}40`,
          }}
          _before={{
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bg: `linear-gradient(135deg, ${social.color}00, ${social.color}30)`,
            opacity: 0,
            transition: 'opacity 0.3s',
          }}
          _hover_before={{
            opacity: 1,
          }}
        >
          <HStack spacing={4} position="relative" zIndex={1}>
            <Box 
              p={2} 
              bg={`${social.color}20`} 
              borderRadius="lg"
              color={social.color}
            >
              <social.icon />
            </Box>
            <VStack align="start" spacing={0} flex={1}>
              <Text fontSize="md" fontWeight="bold" color="white">
                {social.name}
              </Text>
              <Text fontSize="xs" color="whiteAlpha.700">
                {social.label}
              </Text>
            </VStack>
            <Icon as={ExternalLink} boxSize={4} color="whiteAlpha.600" />
          </HStack>
        </Box>
      ))}
    </VStack>
  </Box>
);

// ============================================
// STYLE 3: NEON GLOW BUTTONS
// ============================================
const StyleNeon = () => (
  <Box>
    <Heading size="sm" mb={4} color="cyan.400">Style 3: Neon Glow</Heading>
    <VStack spacing={3}>
      {socials.map((social, i) => (
        <Box
          key={i}
          as="a"
          href={social.url}
          target="_blank"
          w="100%"
          bg="rgba(0, 0, 0, 0.4)"
          borderRadius="lg"
          p={4}
          border="2px solid"
          borderColor={social.color}
          transition="all 0.3s"
          cursor="pointer"
          position="relative"
          _hover={{
            bg: `${social.color}10`,
            boxShadow: `0 0 30px ${social.color}, inset 0 0 20px ${social.color}30`,
            transform: 'scale(1.02)',
          }}
        >
          <HStack spacing={4}>
            <Box 
              color={social.color}
              filter="drop-shadow(0 0 10px currentColor)"
            >
              <social.icon />
            </Box>
            <VStack align="start" spacing={0} flex={1}>
              <Text 
                fontSize="md" 
                fontWeight="bold" 
                color={social.color}
                style={{ textShadow: `0 0 10px ${social.color}` }}
              >
                {social.name}
              </Text>
              <Text fontSize="xs" color="whiteAlpha.700">
                {social.label}
              </Text>
            </VStack>
          </HStack>
        </Box>
      ))}
    </VStack>
  </Box>
);

// ============================================
// STYLE 4: MINIMAL LINKS
// ============================================
const StyleMinimal = () => (
  <Box>
    <Heading size="sm" mb={4} color="green.400">Style 4: Minimal</Heading>
    <VStack spacing={2} align="stretch">
      {socials.map((social, i) => (
        <Box
          key={i}
          as="a"
          href={social.url}
          target="_blank"
          p={3}
          borderRadius="md"
          transition="all 0.2s"
          cursor="pointer"
          borderBottom="1px solid"
          borderColor="rgba(255, 255, 255, 0.05)"
          _hover={{
            bg: 'rgba(255, 255, 255, 0.05)',
            paddingLeft: 6,
          }}
        >
          <HStack spacing={3} justify="space-between">
            <HStack spacing={3}>
              <Box color={social.color}>
                <social.icon />
              </Box>
              <Text fontSize="sm" fontWeight="600" color="white">
                {social.name}
              </Text>
            </HStack>
            <Icon as={ExternalLink} boxSize={3} color="whiteAlpha.500" />
          </HStack>
        </Box>
      ))}
    </VStack>
  </Box>
);

// ============================================
// STYLE 5: GRID CARDS
// ============================================
const StyleGrid = () => (
  <Box>
    <Heading size="sm" mb={4} color="pink.400">Style 5: Grid Cards</Heading>
    <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={3}>
      {socials.map((social, i) => (
        <Box
          key={i}
          as="a"
          href={social.url}
          target="_blank"
          bg="rgba(255, 255, 255, 0.03)"
          borderRadius="xl"
          p={4}
          border="1px solid"
          borderColor="rgba(255, 255, 255, 0.1)"
          transition="all 0.3s"
          cursor="pointer"
          textAlign="center"
          _hover={{
            bg: `${social.color}15`,
            borderColor: social.color,
            transform: 'translateY(-4px)',
          }}
        >
          <VStack spacing={2}>
            <Box color={social.color}>
              <social.icon />
            </Box>
            <Text fontSize="xs" fontWeight="600" color="white" noOfLines={1}>
              {social.name}
            </Text>
          </VStack>
        </Box>
      ))}
    </Box>
  </Box>
);

// ============================================
// MAIN COMPONENT
// ============================================
export default function SocialLinksStyles() {
  const [activeStyle, setActiveStyle] = useState('pills');

  const styles = [
    { id: 'pills', name: 'Icon Pills', component: StylePills },
    { id: 'floating', name: 'Floating Cards', component: StyleFloating },
    { id: 'neon', name: 'Neon Glow', component: StyleNeon },
    { id: 'minimal', name: 'Minimal', component: StyleMinimal },
    { id: 'grid', name: 'Grid Cards', component: StyleGrid },
  ];

  const ActiveComponent = styles.find(s => s.id === activeStyle)?.component || StylePills;

  return (
    <Container maxW="container.md" py={12}>
      <VStack spacing={8} align="stretch">
        <VStack spacing={4}>
          <Heading color="white">Social Links - Style Options 🎨</Heading>
          <Text color="whiteAlpha.700" textAlign="center">
            Choose your favorite style for social media links
          </Text>
        </VStack>

        {/* Style Switcher */}
        <HStack spacing={2} flexWrap="wrap" justify="center">
          {styles.map(style => (
            <Button
              key={style.id}
              size="sm"
              onClick={() => setActiveStyle(style.id)}
              colorScheme={activeStyle === style.id ? 'purple' : 'gray'}
              variant={activeStyle === style.id ? 'solid' : 'outline'}
            >
              {style.name}
            </Button>
          ))}
        </HStack>

        {/* Active Style Preview */}
        <Box
          bg="rgba(255, 255, 255, 0.02)"
          p={6}
          borderRadius="2xl"
          border="1px solid"
          borderColor="rgba(255, 255, 255, 0.1)"
          minH="300px"
        >
          <ActiveComponent />
        </Box>

        {/* Instructions */}
        <Box
          bg="rgba(100, 200, 255, 0.1)"
          p={4}
          borderRadius="xl"
          border="1px solid"
          borderColor="rgba(100, 200, 255, 0.3)"
        >
          <Text fontSize="sm" color="whiteAlpha.800">
            💡 <strong>Tip:</strong> Click the buttons above to preview different styles. 
            Copy the style you like into your About.jsx Bottom Left card!
          </Text>
        </Box>
      </VStack>
    </Container>
  );
}