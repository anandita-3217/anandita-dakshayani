import React, { useState } from 'react';
import { Box, Text, VStack, useColorMode } from '@chakra-ui/react';
import GitHubCalendar from 'react-github-calendar';

const GlassGitHubContributions = ({ username = 'torvalds' }) => {
  const { colorMode } = useColorMode();
  const [clickedCell, setClickedCell] = useState(null);

  // Custom theme matching your brand colors
  const customTheme = {
    light: [
      'rgba(20, 184, 166, 0.05)',   // Level 0 - no contributions
      'rgba(20, 184, 166, 0.2)',    // Level 1
      'rgba(20, 184, 166, 0.4)',    // Level 2
      'rgba(13, 148, 136, 0.6)',    // Level 3
      'rgba(13, 148, 136, 0.8)',    // Level 4 - most contributions
    ],
    dark: [
      'rgba(255, 255, 255, 0.05)',
      'rgba(20, 184, 166, 0.25)',
      'rgba(20, 184, 166, 0.45)',
      'rgba(20, 184, 166, 0.65)',
      'rgba(20, 184, 166, 0.85)',
    ],
  };

  return (
    <VStack spacing={6} align="stretch" p={6}>
      <Box>
        <Text 
          fontSize="xl" 
          fontWeight="bold" 
          mb={2}
          bgGradient="linear(to-r, brand.400, brand.600)"
          bgClip="text"
        >
          GitHub Contributions
        </Text>
        <Text fontSize="sm" color="text.secondary" mb={4}>
          @{username}'s activity over the past year
        </Text>
      </Box>

      {/* Glassmorphism container */}
      <Box
        position="relative"
        p={3}
        borderRadius="16px"
        bg={colorMode === 'dark' 
          ? 'rgba(255, 255, 255, 0.03)' 
          : 'rgba(255, 255, 255, 0.7)'}
        backdropFilter="blur(20px)"
        border="1px solid"
        borderColor={colorMode === 'dark'
          ? 'rgba(255, 255, 255, 0.1)'
          : 'rgba(20, 184, 166, 0.15)'}
        boxShadow={colorMode === 'dark'
          ? '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          : '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)'}
        overflow="hidden"
      >
        {/* Frost texture overlay */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          pointerEvents="none"
          opacity={0.3}
          backgroundImage={`radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)`}
        />

        {/* GitHub Calendar with custom styling */}
        <Box
          position="relative"
          zIndex={1}
          sx={{
            // Increase block size
            '& .react-activity-calendar__scroll-container': {
              overflow: 'visible !important',
            },
            '& .react-activity-calendar': {
              width: '100%',
            },
            // Style the contribution blocks
            '& rect[data-level]': {
              // Larger blocks
              rx: '3px', // rounded corners
              strokeWidth: '1px',
              stroke: colorMode === 'dark' 
                ? 'rgba(255, 255, 255, 0.1)' 
                : 'rgba(20, 184, 166, 0.2)',
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer',
              // Glass effect on hover
              '&:hover': {
                transform: 'scale(1.15)',
                filter: `drop-shadow(0 0 8px ${colorMode === 'dark' ? 'rgba(20, 184, 166, 0.5)' : 'rgba(20, 184, 166, 0.4)'})`,
                strokeWidth: '1.5px',
              },
              // Ripple effect on click (using animation)
              '&:active': {
                animation: 'ripple 0.6s ease-out',
              },
            },
            // Style month labels
            '& .react-activity-calendar__months text': {
              fill: colorMode === 'dark' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
              fontSize: '11px',
            },
            // Style day labels
            '& .react-activity-calendar__days text': {
              fill: colorMode === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
              fontSize: '10px',
            },
            // Style legend
            '& .react-activity-calendar__legend': {
              '& text': {
                fill: colorMode === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
                fontSize: '11px',
              },
              '& rect': {
                rx: '2px',
                strokeWidth: '1px',
                stroke: colorMode === 'dark' 
                  ? 'rgba(255, 255, 255, 0.1)' 
                  : 'rgba(20, 184, 166, 0.2)',
              },
            },
            // Ripple animation keyframes
            '@keyframes ripple': {
              '0%': {
                boxShadow: '0 0 0 0 rgba(20, 184, 166, 0.7)',
              },
              '100%': {
                boxShadow: '0 0 0 10px rgba(20, 184, 166, 0)',
              },
            },
          }}
        >
          <GitHubCalendar
            username="torvalds"
            theme={customTheme}
            colorScheme={colorMode}
            blockSize={14}           // Larger blocks (default is 10)
            blockMargin={4}          // Reduced padding between blocks (default is 4)
            fontSize={12}
            hideColorLegend={false}
            hideMonthLabels={false}
            hideTotalCount={false}
            loading={
              <Box textAlign="center" py={10}>
                <Text color="text.secondary">Loading contributions...</Text>
              </Box>
            }
            errorMessage={
              <Box textAlign="center" py={10}>
                <Text color="red.400">Failed to load contributions</Text>
              </Box>
            }
          />
        </Box>
      </Box>

      {/* Instructions */}
      <Box
        p={4}
        borderRadius="12px"
        bg={colorMode === 'dark' ? 'rgba(20, 184, 166, 0.05)' : 'rgba(20, 184, 166, 0.08)'}
        border="1px solid"
        borderColor={colorMode === 'dark' ? 'rgba(20, 184, 166, 0.2)' : 'rgba(20, 184, 166, 0.15)'}
      >
        <Text fontSize="sm" fontWeight="semibold" mb={2} color="brand.400">
          Installation
        </Text>
        <Text fontSize="xs" color="text.secondary" fontFamily="mono" mb={3}>
          npm install react-github-calendar
        </Text>
        <Text fontSize="sm" fontWeight="semibold" mb={2} color="brand.400">
          Usage
        </Text>
        <Text fontSize="xs" color="text.secondary" lineHeight="1.6">
          Replace 'YOUR_GITHUB_USERNAME' with your actual GitHub username.
          <br />Adjust blockSize (default: 10, current: 14) for larger/smaller blocks.
          <br />Adjust blockMargin (default: 4, current: 4) for spacing between blocks.
          <br />Set hideColorLegend, hideMonthLabels, hideTotalCount to true/false as needed.
        </Text>
      </Box>
    </VStack>
  );
};

export default GlassGitHubContributions;