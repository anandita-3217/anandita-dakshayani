// import React, { useRef, useState, useEffect } from 'react';
// import { Box } from '@chakra-ui/react';
// import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

// const CursorMaskReveal = ({ 
//   children, 
//   revealContent,
//   maskSize = 200,
//   springConfig = { damping: 25, stiffness: 200 }
// }) => {
//   const containerRef = useRef(null);
//   const [isHovered, setIsHovered] = useState(false);
  
//   const mouseX = useMotionValue(0);
//   const mouseY = useMotionValue(0);
  
//   const smoothX = useSpring(mouseX, springConfig);
//   const smoothY = useSpring(mouseY, springConfig);

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       if (!containerRef.current) return;
      
//       const rect = containerRef.current.getBoundingClientRect();
//       mouseX.set(e.clientX - rect.left);
//       mouseY.set(e.clientY - rect.top);
//     };

//     const container = containerRef.current;
//     if (container) {
//       container.addEventListener('mousemove', handleMouseMove);
//       return () => container.removeEventListener('mousemove', handleMouseMove);
//     }
//   }, [mouseX, mouseY]);

//   return (
//     <Box
//       ref={containerRef}
//       position="relative"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       overflow="hidden"
//       cursor="none"
//     >
//       {/* Base content */}
//       <Box position="relative" zIndex={1}>
//         {children}
//       </Box>

//       {/* Revealed content with mask */}
//       <motion.div
//         style={{
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           zIndex: 2,
//           pointerEvents: 'none',
//           opacity: isHovered ? 1 : 0,
//         }}
//         animate={{
//           opacity: isHovered ? 1 : 0,
//         }}
//         transition={{ duration: 0.3 }}
//       >
//         <motion.div
//           style={{
//             position: 'absolute',
//             width: '100%',
//             height: '100%',
//             WebkitMaskImage: useTransform(
//               [smoothX, smoothY],
//               ([x, y]) => `radial-gradient(circle ${maskSize}px at ${x}px ${y}px, black, transparent)`
//             ),
//             maskImage: useTransform(
//               [smoothX, smoothY],
//               ([x, y]) => `radial-gradient(circle ${maskSize}px at ${x}px ${y}px, black, transparent)`
//             ),
//           }}
//         >
//           {revealContent}
//         </motion.div>
//       </motion.div>

//       {/* Custom cursor */}
//       {isHovered && (
//         <motion.div
//           style={{
//             position: 'absolute',
//             width: maskSize * 2,
//             height: maskSize * 2,
//             border: '2px solid rgba(236, 72, 153, 0.5)',
//             borderRadius: '50%',
//             pointerEvents: 'none',
//             zIndex: 3,
//             x: smoothX,
//             y: smoothY,
//             translateX: '-50%',
//             translateY: '-50%',
//           }}
//         />
//       )}
//     </Box>
//   );
// };

// export default CursorMaskReveal;
// import React, { useRef, useState, useEffect } from 'react';
// import { Box } from '@chakra-ui/react';
// import { motion, useMotionValue, useSpring } from 'framer-motion';

// const CursorMaskReveal = ({ 
//   children, 
//   revealContent,
//   maskSize = 200,
//   springConfig = { damping: 25, stiffness: 200 }
// }) => {
//   const containerRef = useRef(null);
//   const [isHovered, setIsHovered] = useState(false);
//   const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
//   const mouseX = useMotionValue(0);
//   const mouseY = useMotionValue(0);
  
//   const smoothX = useSpring(mouseX, springConfig);
//   const smoothY = useSpring(mouseY, springConfig);

//   useEffect(() => {
//     const updateDimensions = () => {
//       if (containerRef.current) {
//         const rect = containerRef.current.getBoundingClientRect();
//         setDimensions({ width: rect.width, height: rect.height });
//       }
//     };

//     updateDimensions();
//     window.addEventListener('resize', updateDimensions);
//     return () => window.removeEventListener('resize', updateDimensions);
//   }, []);

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       if (!containerRef.current) return;
      
//       const rect = containerRef.current.getBoundingClientRect();
//       const x = e.clientX - rect.left;
//       const y = e.clientY - rect.top;
      
//       mouseX.set(x);
//       mouseY.set(y);
//     };

//     const container = containerRef.current;
//     if (container) {
//       container.addEventListener('mousemove', handleMouseMove);
//       return () => container.removeEventListener('mousemove', handleMouseMove);
//     }
//   }, [mouseX, mouseY]);

//   const [currentX, setCurrentX] = useState(0);
//   const [currentY, setCurrentY] = useState(0);

//   useEffect(() => {
//     const unsubX = smoothX.on('change', (v) => setCurrentX(v));
//     const unsubY = smoothY.on('change', (v) => setCurrentY(v));
    
//     return () => {
//       unsubX();
//       unsubY();
//     };
//   }, [smoothX, smoothY]);

//   return (
//     <Box
//       ref={containerRef}
//       position="relative"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       overflow="hidden"
//       w="full"
//       h="full"
//     >
//       {/* Base content */}
//       <Box position="relative" zIndex={1} w="full" h="full">
//         {children}
//       </Box>

//       {/* Revealed content with mask */}
//       <Box
//         position="absolute"
//         top="0"
//         left="0"
//         right="0"
//         bottom="0"
//         zIndex={2}
//         pointerEvents="none"
//         opacity={isHovered ? 1 : 0}
//         transition="opacity 0.3s ease"
//         style={{
//           maskImage: `radial-gradient(circle ${maskSize}px at ${currentX}px ${currentY}px, black, transparent)`,
//           WebkitMaskImage: `radial-gradient(circle ${maskSize}px at ${currentX}px ${currentY}px, black, transparent)`,
//         }}
//       >
//         {revealContent}
//       </Box>

//       {/* Custom cursor ring */}
//       {isHovered && (
//         <Box
//           position="absolute"
//           w={`${maskSize * 2}px`}
//           h={`${maskSize * 2}px`}
//           border="2px solid"
//           borderColor="rgba(236, 72, 153, 0.6)"
//           borderRadius="full"
//           pointerEvents="none"
//           zIndex={3}
//           left={`${currentX}px`}
//           top={`${currentY}px`}
//           transform="translate(-50%, -50%)"
//           transition="none"
//           boxShadow="0 0 20px rgba(236, 72, 153, 0.3), inset 0 0 20px rgba(236, 72, 153, 0.2)"
//         />
//       )}
//     </Box>
//   );
// };

// export default CursorMaskReveal;
import React, { useState } from 'react';
import { ChakraProvider, Box, Text } from '@chakra-ui/react';

const CursorMaskReveal = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <ChakraProvider>
      <Box
        position="relative"
        width="100vw"
        height="100vh"
        overflow="hidden"
        onMouseMove={handleMouseMove}
        bg="black"
      >
        {/* Base layer - visible text */}
        <Box
          position="absolute"
          inset="0"
          display="flex"
          alignItems="center"
          justifyContent="center"
          padding="4"
        >
          <Text
            fontSize={{ base: '3xl', md: '6xl', lg: '8xl' }}
            fontWeight="bold"
            color="white"
            textAlign="center"
            lineHeight="1.2"
          >
            Hover to reveal
            <br />
            the magic
          </Text>
        </Box>

        {/* Mask layer - revealed on hover */}
        <Box
          position="absolute"
          inset="0"
          display="flex"
          alignItems="center"
          justifyContent="center"
          padding="4"
          style={{
            maskImage: `radial-gradient(circle 150px at ${mousePosition.x}px ${mousePosition.y}px, black 0%, transparent 100%)`,
            WebkitMaskImage: `radial-gradient(circle 150px at ${mousePosition.x}px ${mousePosition.y}px, black 0%, transparent 100%)`,
          }}
        >
          <Text
            fontSize={{ base: '3xl', md: '6xl', lg: '8xl' }}
            fontWeight="bold"
            bgGradient="linear(to-r, cyan.400, purple.500, pink.500)"
            bgClip="text"
            textAlign="center"
            lineHeight="1.2"
          >
            Hover to reveal
            <br />
            the magic
          </Text>
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default CursorMaskReveal;