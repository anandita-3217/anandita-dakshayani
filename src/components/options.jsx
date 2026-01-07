import React, { useRef, useEffect } from "react";
import GitHubCalendar from "react-github-calendar";
import {
  Box,
  Heading,
  Text,
  useColorMode
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useInView } from "react-intersection-observer";
import gsap from 'gsap';

const MotionBox = motion.create(Box);
const MotionHeading = motion.create(Heading);

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6}
  }
};

const mapVariants = {
  hidden: { opacity: 0, y: -40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6}
  }
};

function ContributionMap()  {
  const { colorMode } = useColorMode();
  const [mapRef, mapInView] = useInView({
    triggerOnce: false,
    threshold: 0.2
  });
  const calendarRef = useRef(null);

  // Setup GSAP hover and click effects
  useEffect(() => {
    if (!calendarRef.current) return;

    const cells = calendarRef.current.querySelectorAll('rect[data-level]');

    cells.forEach(cell => {
      // Hover in - subtle glow
      const handleMouseEnter = () => {
        gsap.to(cell, {
          attr: { 'stroke-width': 2 },
          filter: 'brightness(1.3)',
          duration: 0.2,
          ease: "power1.out"
        });
      };

      // Hover out - return to normal
      const handleMouseLeave = () => {
        gsap.to(cell, {
          attr: { 'stroke-width': 1 },
          filter: 'brightness(1)',
          duration: 0.3,
          ease: "power1.out"
        });
      };

      // Click - quick pulse effect
      const handleClick = () => {
        gsap.timeline()
          .to(cell, {
            scale: 1.3,
            duration: 0.15,
            ease: "power2.out",
            transformOrigin: "center"
          })
          .to(cell, {
            scale: 1,
            duration: 0.15,
            ease: "power2.in"
          });
      };

      cell.addEventListener('mouseenter', handleMouseEnter);
      cell.addEventListener('mouseleave', handleMouseLeave);
      cell.addEventListener('click', handleClick);

      // Cleanup
      cell._gsapCleanup = () => {
        cell.removeEventListener('mouseenter', handleMouseEnter);
        cell.removeEventListener('mouseleave', handleMouseLeave);
        cell.removeEventListener('click', handleClick);
      };
    });

    return () => {
      cells.forEach(cell => {
        if (cell._gsapCleanup) cell._gsapCleanup();
      });
    };
  }, [mapInView]);

  const labels = {
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    totalCount: '{{count}} contributions in {{year}}', 
    legend: {
      less: 'Less',
      more: 'More',
    },
  };

  // Glassmorphism color schemes with transparency
  const lightTheme = [
    "rgba(20, 184, 166, 0.08)",   // Level 0
    "rgba(20, 184, 166, 0.25)",   // Level 1
    "rgba(20, 184, 166, 0.45)",   // Level 2
    "rgba(13, 148, 136, 0.65)",   // Level 3
    "rgba(13, 148, 136, 0.85)",   // Level 4
  ];
  
  const darkTheme = [
    "rgba(255, 255, 255, 0.05)",  // Level 0
    "rgba(20, 184, 166, 0.25)",   // Level 1
    "rgba(20, 184, 166, 0.45)",   // Level 2
    "rgba(20, 184, 166, 0.65)",   // Level 3
    "rgba(20, 184, 166, 0.85)",   // Level 4
  ];

  return (
    <Box
      as="section"
      id="contributions"
      bg="transparent"
      color="text.primary"
      py={{ base: 16, md: 20 }}
      px={{ base: 4, md: 8, lg: 16 }}
      position="relative"
      overflow="hidden"
    >
      <MotionHeading
        as="h2"
        fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
        fontWeight="bold"
        textAlign="center"
        mb={4}
        initial="hidden"
        animate="visible"
        variants={headerVariants}
      >
        <Text as="span" color="brand.400">My GitHub Contributions</Text>
      </MotionHeading>

      <MotionBox
        ref={mapRef}
        initial="hidden"
        animate={mapInView ? "visible" : "hidden"}
        variants={mapVariants}
        textAlign="center"
        mb={12}
      >
        <Text 
          color="text.secondary" 
          fontSize={{ base: 'sm', md: 'md' }}
          maxW="600px"
          mx="auto"
        >
          A visualization of my coding activity on GitHub
        </Text>
      </MotionBox>

      {/* GLASSMORPHISM CONTAINER */}
      <MotionBox
        w="full"
        display="flex"
        justifyContent="center"
        overflowX="auto"
        position="relative"
        // Glassmorphism styling
        bg={colorMode === 'dark' 
          ? 'rgba(255, 255, 255, 0.03)' 
          : 'rgba(255, 255, 255, 0.7)'}
        backdropFilter="blur(20px)"
        WebkitBackdropFilter="blur(20px)" // Safari support
        borderRadius="xl"
        border="1px solid"
        borderColor={colorMode === 'dark'
          ? 'rgba(255, 255, 255, 0.1)'
          : 'rgba(20, 184, 166, 0.2)'}
        boxShadow={colorMode === 'dark'
          ? '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          : '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)'}
        p={{ base: 4, md: 8 }}
        _hover={{
          borderColor: colorMode === 'dark' ? 'brand.400' : 'brand.500',
          boxShadow: colorMode === 'dark'
            ? '0 12px 40px rgba(20, 184, 166, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
            : '0 12px 40px rgba(20, 184, 166, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.9)'
        }}
        transition="all 0.4s ease"
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
          borderRadius="xl"
          backgroundImage={`radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)`}
        />

        <Box 
          ref={calendarRef}
          width="100%" 
          display="flex" 
          justifyContent="center"
          position="relative"
          zIndex={1}
          sx={{
            // ROUNDED SQUARES + GLASS EFFECT
            '& rect[data-level]': {
              rx: '4px',
              ry: '4px',
              strokeWidth: '1px',
              stroke: colorMode === 'dark' 
                ? 'rgba(255, 255, 255, 0.15)' 
                : 'rgba(20, 184, 166, 0.25)',
              cursor: 'pointer',
              transformOrigin: 'center center',
              transformBox: 'fill-box',
              // Remove all CSS transitions - GSAP handles everything
            },
            
            // Style labels
            '.react-activity-calendar__legend-label': {
              color: 'text.secondary',
              fontSize: '12px',
            },
            '.react-activity-calendar__count': {
              color: 'text.secondary',
              fontWeight: '500',
            },
            'svg text': {
              fill: colorMode === 'dark' 
                ? 'rgba(255, 255, 255, 0.6)' 
                : 'rgba(0, 0, 0, 0.6)',
            },
            'svg': {
              maxWidth: '100%',
              height: 'auto',
            }
          }}
        >
          <GitHubCalendar
            username="anandita-3217"
            blockSize={18}        // Larger blocks
            blockMargin={5}       // Space between blocks
            fontSize={16}
            theme={{
              light: lightTheme,
              dark: darkTheme,
            }}
            colorScheme={colorMode}
            labels={labels}
          />
        </Box>
      </MotionBox>

      {/* Optional: Info card below */}
      <Box
        mt={6}
        p={4}
        borderRadius="lg"
        bg={colorMode === 'dark' ? 'rgba(20, 184, 166, 0.05)' : 'rgba(20, 184, 166, 0.08)'}
        border="1px solid"
        borderColor={colorMode === 'dark' ? 'rgba(20, 184, 166, 0.2)' : 'rgba(20, 184, 166, 0.15)'}
        textAlign="center"
      >
      </Box>
    </Box>
  );
};

export default ContributionMap;