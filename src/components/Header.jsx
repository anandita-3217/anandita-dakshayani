
// // import React, { useState, useEffect } from "react";
// // import {
// //   Box,
// //   Flex,
// //   HStack,
// //   IconButton,
// //   Image,
// //   Kbd,
// //   VStack,
// //   useDisclosure,
// //   useColorMode,
// //   useColorModeValue,
// //   Tooltip ,
// // } from "@chakra-ui/react";
// // import { motion, AnimatePresence } from "framer-motion";
// // import { Link as RouterLink, useLocation } from "react-router-dom";
// // import DevGif from "./assets/developer.gif";
// // import CommandPalette from "./CommandPalette";
// // import {
// //   Menu,
// //   X,
// //   Sun,
// //   Moon,
// //   Command,
// //   ChevronDown
// // } from "lucide-react";
// // import { FaStar, FaCodeBranch } from "react-icons/fa";

// // // Chakra + Motion wrapper
// // const MotionBox = motion.create(Box);
// // const MotionFlex = motion.create(Flex);

// // export default function Header(){
// //   const { colorMode, toggleColorMode } = useColorMode();
// //   const [isScrolled, setIsScrolled] = useState(false);
// //   const location = useLocation();
// //   const { isOpen, onToggle, onClose } = useDisclosure(); // Mobile menu
// //   const { 
// //     isOpen: isCmdOpen, 
// //     onOpen: onCmdOpen, 
// //     onClose: onCmdClose 
// //   } = useDisclosure(); 

// //   // ALL useColorModeValue hooks MUST be at the top, before any conditional logic
// //   const bgScrolled = useColorModeValue(
// //     "rgba(255, 255, 255, 0.7)",
// //     "rgba(26, 26, 26, 0.7)"
// //   );
// //   const bgTop = useColorModeValue(
// //     "rgba(255, 255, 255, 0.3)",
// //     "rgba(26, 26, 26, 0.3)"
// //   );
// //   const borderColor = useColorModeValue("gray.200", "whiteAlpha.200");
// //   const linkColor = useColorModeValue("gray.700", "gray.300");
// //   const activeLinkBg = useColorModeValue("#f5d0fe", "#c026d3");
// //   const TooltipBg = useColorModeValue("#bf26d392","#f5d0fe" );
// //   const hoverLink = useColorModeValue("#c026d3", "#86198f");
// //   const iconHoverBg = useColorModeValue("gray.100", "whiteAlpha.200");
// //   const mobileDropdownBg = useColorModeValue("white", "gray.900");
// //   const shadowColor = colorMode === "dark"
// //     ? "0 8px 32px rgba(255,255,255,0.05)"
// //     : "0 8px 32px rgba(0,0,0,0.1)";
// //   const activeLinkColor = useColorModeValue("#86198f", "#fdf4ff");

// //   const links = [
// //     { name: "Home", href: "/" },
// //     { name: "About", href: "/about" },
// //     { name: "Work", href: "/work" },
// //     { name: "More", href: "#" }, // TODO: on hover show GuestBook and BucketList
// //   ];

// //   // TODO: Divde commandpallete into Pages, Connect,Legal and Resources - inspo : https://aayushbharti.in/


// //   // Handle scroll behavior
// //   useEffect(() => {
// //     const handleScroll = () => {
// //       const currentScrollY = window.scrollY;
// //       setIsScrolled(currentScrollY > 20);
// //     };

// //     window.addEventListener("scroll", handleScroll);
// //     return () => window.removeEventListener("scroll", handleScroll);
// //   }, []);

// //   // Keyboard shortcut for command palette
// //   useEffect(() => {
// //     const handleKeyDown = (e) => {
// //       if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
// //         e.preventDefault();
// //         onCmdOpen();
// //       }
// //     };
// //     window.addEventListener('keydown', handleKeyDown);
// //     return () => window.removeEventListener('keydown', handleKeyDown);
// //   }, [onCmdOpen]);

// //   // Check if link is active
// //   const isLinkActive = (href) => {
// //     if (href === "/") {
// //       return location.pathname === "/";
// //     }
// //     if (href.startsWith("/#")) {
// //       return location.pathname === "/" && location.hash === href.slice(1);
// //     }
// //     return location.pathname === href;
// //   };

// //   // Animation variants
// //   const itemVariants = {
// //     hidden: { opacity: 0, y: -10 },
// //     visible: (i) => ({
// //       opacity: 1,
// //       y: 0,
// //       transition: {
// //         delay: i * 0.05,
// //         duration: 0.3,
// //       },
// //     }),
// //   };

// //   const handleCommandPalette = () => {
// //     onCmdOpen();
// //   };

// //   return (
// //     <>
// //       {/* Main Navigation Bar */}
// //       <MotionFlex
// //         as="nav"
// //         position="fixed"
// //         top="16px"
// //         left="0"
// //         right="0"
// //         mx="auto"
// //         w="90%"
// //         maxW="6xl"
// //         zIndex={50}
// //         bg={isScrolled ? bgScrolled : bgTop}
// //         backdropFilter="blur(12px)"
// //         borderRadius="xl"
// //         border="1px solid"
// //         borderColor={borderColor}
// //         boxShadow={shadowColor}
// //         px={{ base: 3, sm: 4 }}
// //         py={3}
// //         align="center"
// //         justify="space-between"
// //         initial={{ opacity: 0, y: -20 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         transition={{ duration: 0.5 }}
// //       >
// //         {/* Logo - Fixed Width */}
// //         <Box w={{ base: "auto", md: "160px" }}>
// //           <Box
// //             as={RouterLink}
// //             to="/"
// //             _hover={{ opacity: 0.8 }}
// //             transition="0.2s ease"
// //             display="block"
// //           >
// //             <Image src={DevGif} alt="Developer" boxSize="50px" />
// //           </Box>
// //         </Box>

// //         {/* Desktop Links - Centered */}
// //         <HStack
// //           spacing={1}
// //           display={{ base: "none", md: "flex" }}
// //           flex={1}
// //           justify="center"
// //         >
// //           {links.map(({ name, href }, i) => (
// //             <MotionBox
// //               key={name}
// //               custom={i}
// //               variants={itemVariants}
// //               initial="hidden"
// //               animate="visible"
// //               whileHover={{ scale: 1.05 }}
// //               whileTap={{ scale: 0.95 }}
// //             >


// //               <Box
// //                 as={RouterLink}
// //                 to={href}
// //                 display="flex"
// //                 alignItems="center"
// //                 gap={2}
// //                 px={4}
// //                 py={2}
// //                 borderRadius="md"
// //                 fontSize="sm"
// //                 fontWeight="medium"
// //                 bg={"transparent"}
// //                 color={isLinkActive(href) ? hoverLink : linkColor}
// //                 _hover={{
// //                   color: hoverLink,
// //                   textDecoration: "none",
// //                 }}
// //                 transition="all 0.2s ease"
// //               >
// //                 {name}

// // {name.trim() === "More" && 
// //   (<ChevronDown size={14} style={{ marginLeft: "-2px" }} />)
// // }    
// //               </Box>
// //             </MotionBox>
// //           ))}
// //           <Box
// //             as="a"
// //             href="https://github.com/anandita-3217/anandita-dakshayani"
// //             target="_blank"
// //             rel="noopener noreferrer"
// //             display="flex"
// //             alignItems="center"
// //             gap={1}
// //             px={4}
// //             py={2}
// //             borderRadius="md"
// //             fontSize="sm"
// //             fontWeight="medium"
// //             bg={useColorModeValue("#d946ef", "#c026d3")}
// //             color="white"
// //             _hover={{
// //               bg: useColorModeValue("#c026d3", "#d946ef"),
// //               textDecoration: "none",
// //               transform: "scale(1.02)",
// //             }}
// //             transition="all 0.2s ease"
// //           >
// //             <FaStar size={14} />
// //             <Box as="span">or</Box>
// //             <FaCodeBranch size={14} />
// //           </Box>
// //         </HStack>

// //         {/* Theme Toggle & Mobile Menu - Fixed Width */}
// //         <Flex
// //           w={{ base: "auto", md: "160px" }}
// //           justify="flex-end"
// //           align="center"
// //           gap={2}
// //         >
// //           {/* Command Palette Button */}
// //             <Tooltip bg = {TooltipBg}
// //   label={
// //     <Flex align="center" gap={1}>
// //       <Kbd fontSize="10px" borderRadius="5px" color={hoverLink} >ctrl</Kbd>
// //       <Box as="span" fontSize="10px" color={hoverLink}>+</Box>
// //       <Kbd fontSize="10px" borderRadius="5px" color={hoverLink} >K</Kbd>
// //     </Flex>
// //   }
// //   placement="bottom"
// //   openDelay={300}
// //   borderRadius="8px"
// //   px={2}
// //   py={1.5}
// // >
// //           <MotionBox
// //             initial={{ opacity: 0, scale: 0 }}
// //             animate={{ opacity: 1, scale: 1 }}
// //             transition={{ delay: 0.2, type: "spring" }}
// //             display={{ base: "none", md: "block" }}
// //           >
// //             <IconButton
// //               aria-label="Command palette"
// //               icon={<Command size={20} />}
// //               onClick={handleCommandPalette}
// //               variant="ghost"
// //               borderRadius="full"
// //               size="md"
// //               _hover={{
// //                 bg: iconHoverBg,
// //               }}
// //             />
// //           </MotionBox>

// //           </Tooltip>
        

// //           {/* Theme Toggle */}
// //             <Tooltip bg = {TooltipBg}
// //   label={
// //     <Flex align="center" gap={1}>
// //       <Kbd fontSize="10px" borderRadius="5px" color={hoverLink}>ctrl</Kbd>
// //       <Box as="span" fontSize="10px" color={hoverLink}>+</Box>
// //       <Kbd fontSize="10px" borderRadius="5px" color={hoverLink}>shift</Kbd>
// //       <Box as="span" fontSize="10px" color={hoverLink}>+</Box>
// //       <Kbd fontSize="10px" borderRadius="5px" color={hoverLink}>K</Kbd>
// //     </Flex>
// //   }
// //   placement="bottom"
// //   openDelay={300}
// //   borderRadius="8px"
// //   px={2}
// //   py={1.5}
// // >

// //           <MotionBox
// //             initial={{ opacity: 0, scale: 0 }}
// //             animate={{ opacity: 1, scale: 1 }}
// //             transition={{ delay: 0.3, type: "spring" }}
// //           >

// //             <IconButton
// //               aria-label="Toggle theme"
// //               icon={colorMode === "light" ? <Moon size={20} /> : <Sun size={20} />}
// //               onClick={toggleColorMode}
// //               variant="ghost"
// //               borderRadius="full"
// //               size="md"
// //               _hover={{
// //                 bg: iconHoverBg,
// //               }}
// //             />
// //           </MotionBox>
// //             </Tooltip>
            

// //           {/* Mobile Menu Toggle */}
// //           <IconButton
// //             aria-label="Menu"
// //             icon={isOpen ? <X size={24} /> : <Menu size={24} />}
// //             display={{ base: "flex", md: "none" }}
// //             variant="ghost"
// //             borderRadius="full"
// //             onClick={onToggle}
// //             _hover={{
// //               bg: iconHoverBg,
// //             }}
// //           />
// //         </Flex>

// //         {/* Mobile Dropdown */}
// //         <AnimatePresence>
// //           {isOpen && (
// //             <MotionBox
// //               initial={{ opacity: 0, y: -20 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               exit={{ opacity: 0, y: -20 }}
// //               transition={{ duration: 0.3 }}
// //               position="absolute"
// //               top="calc(100% + 8px)"
// //               left={0}
// //               right={0}
// //               display={{ md: "none" }}
// //               bg={mobileDropdownBg}
// //               borderRadius="xl"
// //               border="1px solid"
// //               borderColor={borderColor}
// //               backdropFilter="blur(12px)"
// //               boxShadow={shadowColor}
// //               overflow="hidden"
// //             >
// //               <VStack py={4} spacing={1} align="stretch">
// //                 {links.map(({ name, href }, i) => (
// //                   <MotionBox
// //                     key={name}
// //                     initial={{ opacity: 0, x: -10 }}
// //                     animate={{ opacity: 1, x: 0 }}
// //                     transition={{ delay: 0.1 * i }}
// //                   >
// //                     <Box
// //                       as={RouterLink}
// //                       to={href}
// //                       display="flex"
// //                       alignItems="center"
// //                       gap={3}
// //                       px={6}
// //                       py={3}
// //                       fontSize="lg"
// //                       fontWeight="medium"
// //                       bg={"transparent"}
// //                       color={isLinkActive(href) ? hoverLink : linkColor}
// //                       _hover={{
// //                         color: hoverLink,
// //                         textDecoration: "none",
// //                       }}
// //                       transition="all 0.2s ease"
// //                       onClick={onClose}
// //                     >
// //                       {name}
// //                     </Box>
// //                   </MotionBox>
// //                 ))}
// //                 <MotionBox
// //                   initial={{ opacity: 0, x: -10 }}
// //                   animate={{ opacity: 1, x: 0 }}
// //                   transition={{ delay: 0.1 * links.length }}
// //                   px={6}
// //                   py={2}
// //                 >
// //                   <Box
// //                     as="a"
// //                     href="https://github.com/anandita-3217/anandita-dakshayani"
// //                     target="_blank"
// //                     rel="noopener noreferrer"
// //                     display="flex"
// //                     alignItems="center"
// //                     gap={1}
// //                     px={4}
// //                     py={2}
// //                     borderRadius="md"
// //                     fontSize="sm"
// //                     fontWeight="medium"
// //                     bg={useColorModeValue("brand.500", "brand.400")}
// //                     color="white"
// //                     _hover={{
// //                       bg: useColorModeValue("brand.600", "brand.500"),
// //                       textDecoration: "none",
// //                       transform: "scale(1.02)",
// //                     }}
// //                     transition="all 0.2s ease"
// //                   >
// //                     <FaStar size={14} />
// //                     <Box as="span">or</Box>
// //                     <FaCodeBranch size={14} />
// //                   </Box>
// //                 </MotionBox>
// //               </VStack>
// //             </MotionBox>
// //           )}
// //         </AnimatePresence>
// //       </MotionFlex>
      
// //       {/* Command Palette */}
// //       <CommandPalette isOpen={isCmdOpen} onClose={onCmdClose} />
// //     </>
// //   );
// // };



// // Header.jsx
// // ─── Three layouts from one component ────────────────────────────────────────
// // Desktop  (md+)   → floating pill nav (unchanged)
// // Tablet   (sm→md) → fixed 180px left sidebar, logo at top, links + icons
// // Mobile   (base)  → fixed bottom bar, icons only, active dot indicator
// //
// // TODO: "More" link → hover dropdown showing GuestBook and BucketList
// // TODO: Divide CommandPalette into Pages, Connect, Legal, Resources

// import React, { useState, useEffect } from "react";
// import {
//   Box, Flex, HStack, VStack, IconButton,
//   Image, Kbd, useDisclosure, useColorMode,
//   useColorModeValue, Tooltip, Text,
// } from "@chakra-ui/react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Link as RouterLink, useLocation } from "react-router-dom";
// import DevGif from "./assets/developer.gif";
// import CommandPalette from "./CommandPalette";
// import {
//   Menu, X, Sun, Moon, Command, ChevronDown,
//   Home, User, Briefcase, MoreHorizontal, Terminal,
// } from "lucide-react";
// import { FaStar, FaCodeBranch } from "react-icons/fa";

// const MotionBox = motion.create(Box);
// const MotionFlex = motion.create(Flex);

// // ── Link icon map ─────────────────────────────────────────────────────────────
// const LINK_ICONS = {
//   Home:    Home,
//   About:   User,
//   Work:    Briefcase,
//   More:    MoreHorizontal,
// };

// const LINKS = [
//   { name: "Home",  href: "/" },
//   { name: "About", href: "/about" },
//   { name: "Work",  href: "/work" },
//   { name: "More",  href: "#" },
// ];

// // ─────────────────────────────────────────────────────────────────────────────
// export default function Header() {
//   const { colorMode, toggleColorMode } = useColorMode();
//   const [isScrolled, setIsScrolled] = useState(false);
//   const location = useLocation();
//   const { isOpen, onToggle, onClose } = useDisclosure();
//   const { isOpen: isCmdOpen, onOpen: onCmdOpen, onClose: onCmdClose } = useDisclosure();

//   // ── Colors ─────────────────────────────────────────────────────────────────
//   const bgScrolled    = useColorModeValue("rgba(255,255,255,0.75)", "rgba(26,26,26,0.75)");
//   const bgTop         = useColorModeValue("rgba(255,255,255,0.3)",  "rgba(26,26,26,0.3)");
//   const borderColor   = useColorModeValue("gray.200", "whiteAlpha.200");
//   const linkColor     = useColorModeValue("gray.700", "gray.300");
//   const hoverLink     = useColorModeValue("#c026d3", "#86198f");
//   const activeLinkColor = useColorModeValue("#86198f", "#fdf4ff");
//   const iconHoverBg   = useColorModeValue("gray.100", "whiteAlpha.200");
//   const tooltipBg     = useColorModeValue("#bf26d392", "#f5d0fe");
//   const shadowColor   = colorMode === "dark"
//     ? "0 8px 32px rgba(255,255,255,0.05)"
//     : "0 8px 32px rgba(0,0,0,0.1)";

//   // Sidebar colors
//   const sidebarBg     = useColorModeValue("rgba(255,255,255,0.85)", "rgba(16,16,20,0.9)");
//   const sidebarBorder = useColorModeValue("rgba(0,0,0,0.08)", "rgba(255,255,255,0.07)");
//   const sidebarActive = useColorModeValue("#f5d0fe", "rgba(192,38,211,0.2)");

//   // Bottom bar colors
//   const bottomBg      = useColorModeValue("rgba(255,255,255,0.92)", "rgba(12,12,16,0.95)");
//   const bottomBorder  = useColorModeValue("rgba(0,0,0,0.08)", "rgba(255,255,255,0.07)");

//   // ── Scroll listener ────────────────────────────────────────────────────────
//   useEffect(() => {
//     const h = () => setIsScrolled(window.scrollY > 20);
//     window.addEventListener("scroll", h);
//     return () => window.removeEventListener("scroll", h);
//   }, []);

//   // ── Cmd+K ──────────────────────────────────────────────────────────────────
//   useEffect(() => {
//     const h = (e) => {
//       if ((e.ctrlKey || e.metaKey) && e.key === "k") { e.preventDefault(); onCmdOpen(); }
//     };
//     window.addEventListener("keydown", h);
//     return () => window.removeEventListener("keydown", h);
//   }, [onCmdOpen]);

//   // ── Active check ───────────────────────────────────────────────────────────
//   const isActive = (href) => {
//     if (href === "/") return location.pathname === "/";
//     if (href.startsWith("/#")) return location.pathname === "/" && location.hash === href.slice(1);
//     return location.pathname === href;
//   };

//   // ── Animation variants ─────────────────────────────────────────────────────
//   const itemVariants = {
//     hidden:  { opacity: 0, y: -10 },
//     visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.3 } }),
//   };

//   // ── Tooltip label helper ───────────────────────────────────────────────────
//   const KbdLabel = ({ keys }) => (
//     <Flex align="center" gap={1}>
//       {keys.map((k, i) => (
//         <React.Fragment key={k}>
//           {i > 0 && <Box as="span" fontSize="10px" color={hoverLink}>+</Box>}
//           <Kbd fontSize="10px" borderRadius="5px" color={hoverLink}>{k}</Kbd>
//         </React.Fragment>
//       ))}
//     </Flex>
//   );

//   // ─────────────────────────────────────────────────────────────────────────
//   return (
//     <>
//       {/* ══════════════════════════════════════════════════════════════════
//           DESKTOP (md+) — floating pill nav (original, unchanged)
//       ══════════════════════════════════════════════════════════════════ */}
//       <MotionFlex
//         as="nav"
//         display={{ base: "none", sm: "none", md: "flex" }}
//         position="fixed"
//         top="16px"
//         left="0"
//         right="0"
//         mx="auto"
//         w="90%"
//         maxW="6xl"
//         zIndex={100}
//         bg={isScrolled ? bgScrolled : bgTop}
//         backdropFilter="blur(12px)"
//         borderRadius="xl"
//         border="1px solid"
//         borderColor={borderColor}
//         boxShadow={shadowColor}
//         px={4}
//         py={3}
//         align="center"
//         justify="space-between"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         {/* Logo */}
//         <Box w="160px">
//           <Box as={RouterLink} to="/" _hover={{ opacity: 0.8 }}
//             transition="0.2s ease" display="block">
//             <Image src={DevGif} alt="Developer" boxSize="50px" />
//           </Box>
//         </Box>

//         {/* Links */}
//         <HStack spacing={1} flex={1} justify="center">
//           {LINKS.map(({ name, href }, i) => (
//             <MotionBox key={name} custom={i} variants={itemVariants}
//               initial="hidden" animate="visible"
//               whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//               <Box as={RouterLink} to={href}
//                 display="flex" alignItems="center" gap={1.5}
//                 px={4} py={2} borderRadius="md"
//                 fontSize="sm" fontWeight="medium"
//                 bg="transparent"
//                 color={isActive(href) ? activeLinkColor : linkColor}
//                 _hover={{ color: hoverLink, textDecoration: "none" }}
//                 transition="all 0.2s ease">
//                 {name}
//                 {name === "More" && <ChevronDown size={14} />}
//               </Box>
//             </MotionBox>
//           ))}

//           {/* GitHub star */}
//           <Box as="a" href="https://github.com/anandita-3217/anandita-dakshayani"
//             target="_blank" rel="noopener noreferrer"
//             display="flex" alignItems="center" gap={1}
//             px={4} py={2} borderRadius="md" fontSize="sm" fontWeight="medium"
//             bg={useColorModeValue("#d946ef", "#c026d3")} color="white"
//             _hover={{ bg: useColorModeValue("#c026d3", "#d946ef"), textDecoration: "none", transform: "scale(1.02)" }}
//             transition="all 0.2s ease">
//             <FaStar size={14} />
//             <Box as="span">or</Box>
//             <FaCodeBranch size={14} />
//           </Box>
//         </HStack>

//         {/* Right controls */}
//         <Flex w="160px" justify="flex-end" align="center" gap={2}>
//           <Tooltip bg={tooltipBg} label={<KbdLabel keys={["ctrl", "K"]} />}
//             placement="bottom" openDelay={300} borderRadius="8px" px={2} py={1.5}>
//             <MotionBox initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
//               transition={{ delay: 0.2, type: "spring" }}>
//               <IconButton aria-label="Command palette" icon={<Command size={20} />}
//                 onClick={onCmdOpen} variant="ghost" borderRadius="full" size="md"
//                 _hover={{ bg: iconHoverBg }} />
//             </MotionBox>
//           </Tooltip>

//           <Tooltip bg={tooltipBg} label={<KbdLabel keys={["ctrl", "shift", "L"]} />}
//             placement="bottom" openDelay={300} borderRadius="8px" px={2} py={1.5}>
//             <MotionBox initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
//               transition={{ delay: 0.3, type: "spring" }}>
//               <IconButton aria-label="Toggle theme"
//                 icon={colorMode === "light" ? <Moon size={20} /> : <Sun size={20} />}
//                 onClick={toggleColorMode} variant="ghost" borderRadius="full" size="md"
//                 _hover={{ bg: iconHoverBg }} />
//             </MotionBox>
//           </Tooltip>
//         </Flex>
//       </MotionFlex>

//       {/* ══════════════════════════════════════════════════════════════════
//           TABLET (sm) — fixed 180px left sidebar
//       ══════════════════════════════════════════════════════════════════ */}
//       <MotionBox
//         display={{ base: "none", sm: "flex", md: "none" }}
//         as="nav"
//         position="fixed"
//         top={0}
//         left={0}
//         bottom={0}
//         w="180px"
//         zIndex={100}
//         bg={sidebarBg}
//         backdropFilter="blur(16px)"
//         borderRight="1px solid"
//         borderColor={sidebarBorder}
//         flexDirection="column"
//         initial={{ x: -180, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
//       >
//         {/* Top hairline accent */}
//         <Box position="absolute" top={0} left={0} right={0} h="2px"
//           bgGradient="linear(to-r, #c026d3, #7c3aed)" />

//         {/* Logo */}
//         <Box px={4} pt={6} pb={4}>
//           <Box as={RouterLink} to="/" _hover={{ opacity: 0.8 }}
//             transition="0.2s ease" display="inline-block">
//             <Image src={DevGif} alt="Developer" boxSize="44px" />
//           </Box>
//         </Box>

//         {/* Divider */}
//         <Box mx={4} h="1px" bg={sidebarBorder} mb={4} />

//         {/* Nav links */}
//         <VStack spacing={1} align="stretch" px={3} flex={1}>
//           {LINKS.map(({ name, href }, i) => {
//             const LinkIcon = LINK_ICONS[name];
//             const active = isActive(href);
//             return (
//               <MotionBox key={name}
//                 initial={{ opacity: 0, x: -16 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: i * 0.06, duration: 0.35 }}>
//                 <Box as={RouterLink} to={href}
//                   display="flex" alignItems="center" gap={3}
//                   px={3} py={2.5} borderRadius="10px"
//                   bg={active ? sidebarActive : "transparent"}
//                   color={active ? activeLinkColor : linkColor}
//                   fontWeight={active ? 600 : 400}
//                   fontSize="sm"
//                   _hover={{ bg: sidebarActive, color: activeLinkColor, textDecoration: "none" }}
//                   transition="all 0.18s ease">
//                   {LinkIcon && (
//                     <Box color={active ? activeLinkColor : "inherit"}>
//                       <LinkIcon size={16} />
//                     </Box>
//                   )}
//                   <Text flex={1}>{name}</Text>
//                   {name === "More" && <ChevronDown size={13} />}
//                 </Box>
//               </MotionBox>
//             );
//           })}
//         </VStack>

//         {/* Bottom controls */}
//         <Box px={3} pb={6}>
//           <Box mx={0} h="1px" bg={sidebarBorder} mb={4} />

//           {/* GitHub */}
//           <Box as="a" href="https://github.com/anandita-3217/anandita-dakshayani"
//             target="_blank" rel="noopener noreferrer"
//             display="flex" alignItems="center" gap={2}
//             px={3} py={2.5} borderRadius="10px" fontSize="sm" fontWeight="medium"
//             bg={useColorModeValue("#d946ef18", "rgba(192,38,211,0.15)")}
//             color={useColorModeValue("#86198f", "#d946ef")}
//             _hover={{ bg: useColorModeValue("#d946ef28", "rgba(192,38,211,0.25)"), textDecoration: "none" }}
//             transition="all 0.18s ease" mb={2}>
//             <FaStar size={14} />
//             <Text fontSize="sm">Star repo</Text>
//           </Box>

//           {/* Theme + Cmd row */}
//           <Flex gap={2} px={1}>
//             <Tooltip bg={tooltipBg} label={<KbdLabel keys={["ctrl", "K"]} />}
//               placement="right" openDelay={300} borderRadius="8px">
//               <IconButton aria-label="Command palette" icon={<Command size={16} />}
//                 onClick={onCmdOpen} variant="ghost" borderRadius="lg" size="sm"
//                 flex={1} _hover={{ bg: iconHoverBg }} />
//             </Tooltip>
//             <Tooltip bg={tooltipBg} label={<KbdLabel keys={["ctrl", "shift", "L"]} />}
//               placement="right" openDelay={300} borderRadius="8px">
//               <IconButton aria-label="Toggle theme"
//                 icon={colorMode === "light" ? <Moon size={16} /> : <Sun size={16} />}
//                 onClick={toggleColorMode} variant="ghost" borderRadius="lg" size="sm"
//                 flex={1} _hover={{ bg: iconHoverBg }} />
//             </Tooltip>
//           </Flex>
//         </Box>
//       </MotionBox>

//       {/* ══════════════════════════════════════════════════════════════════
//           MOBILE (base) — fixed bottom bar, icons only
//       ══════════════════════════════════════════════════════════════════ */}
//       <MotionBox
//         display={{ base: "flex", sm: "none" }}
//         as="nav"
//         position="fixed"
//         bottom={0}
//         left={0}
//         right={0}
//         zIndex={100}
//         bg={bottomBg}
//         backdropFilter="blur(20px)"
//         borderTop="1px solid"
//         borderColor={bottomBorder}
//         px={2}
//         pb="env(safe-area-inset-bottom, 8px)"
//         pt={2}
//         align="center"
//         justify="space-around"
//         initial={{ y: 80, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
//       >
//         {/* Top accent line */}
//         <Box position="absolute" top={0} left={0} right={0} h="1px"
//           bgGradient="linear(to-r, transparent, #c026d3, #7c3aed, transparent)" />

//         {LINKS.map(({ name, href }) => {
//           const LinkIcon = LINK_ICONS[name];
//           const active = isActive(href);
//           return (
//             <Box key={name} as={RouterLink} to={href}
//               display="flex" flexDirection="column" alignItems="center"
//               justifyContent="center"
//               px={4} py={2} borderRadius="12px" minW="52px"
//               position="relative"
//               color={active ? activeLinkColor : linkColor}
//               _hover={{ color: hoverLink, textDecoration: "none" }}
//               transition="all 0.18s ease">
//               {/* Active pill indicator */}
//               {active && (
//                 <MotionBox
//                   layoutId="mobile-active"
//                   position="absolute"
//                   top={0} left="50%" transform="translateX(-50%)"
//                   w="20px" h="2px" borderRadius="2px"
//                   bgGradient="linear(to-r, #c026d3, #7c3aed)"
//                   initial={false}
//                   transition={{ type: "spring", stiffness: 400, damping: 30 }}
//                 />
//               )}
//               {LinkIcon && <LinkIcon size={22} strokeWidth={active ? 2.2 : 1.8} />}
//             </Box>
//           );
//         })}

//         {/* Theme toggle in bottom bar */}
//         <Box
//           display="flex" flexDirection="column" alignItems="center"
//           justifyContent="center"
//           px={4} py={2} borderRadius="12px" minW="52px"
//           color={linkColor}
//           onClick={toggleColorMode}
//           cursor="pointer"
//           _hover={{ color: hoverLink }}
//           transition="all 0.18s ease">
//           {colorMode === "light" ? <Moon size={22} strokeWidth={1.8} /> : <Sun size={22} strokeWidth={1.8} />}
//         </Box>

//         {/* Command palette in bottom bar */}
//         <Box
//           display="flex" flexDirection="column" alignItems="center"
//           justifyContent="center"
//           px={4} py={2} borderRadius="12px" minW="52px"
//           color={linkColor}
//           onClick={onCmdOpen}
//           cursor="pointer"
//           _hover={{ color: hoverLink }}
//           transition="all 0.18s ease">
//           <Command size={22} strokeWidth={1.8} />
//         </Box>
//       </MotionBox>

//       {/* Command Palette */}
//       <CommandPalette isOpen={isCmdOpen} onClose={onCmdClose} />
//     </>
//   );
// }
// // TODO: make sidebar collapseble - in tablet view



// Header.jsx
// ─── Three layouts from one component ────────────────────────────────────────
// Desktop  (md+)   → floating pill nav (unchanged)
// Tablet   (sm→md) → fixed 180px left sidebar, logo at top, links + icons
// Mobile   (base)  → fixed bottom bar, icons only, active dot indicator
//
// TODO: "More" link → hover dropdown showing GuestBook and BucketList
// TODO: Divide CommandPalette into Pages, Connect, Legal, Resources
// TODO: In mobile view - refine the thumbs or just get rid of them and make the current make the current section look darker
// TODO: The tablet - sidebar needs to appear some where - i cant see it
import React, { useState, useEffect } from "react";
import {
  Box, Flex, HStack, VStack, IconButton,
  Image, Kbd, useDisclosure, useColorMode,
  useColorModeValue, Tooltip, Text,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { Link as RouterLink, useLocation } from "react-router-dom";
import DevGif from "./assets/developer.gif";
import CommandPalette from "./CommandPalette";
import {
  Menu, X, Sun, Moon, Command, ChevronDown,
  Home, User, Briefcase, MoreHorizontal, Terminal,
} from "lucide-react";
import { FaStar, FaCodeBranch } from "react-icons/fa";

const MotionBox = motion.create(Box);
const MotionFlex = motion.create(Flex);

// ── Link icon map ─────────────────────────────────────────────────────────────
const LINK_ICONS = {
  Home:    Home,
  About:   User,
  Work:    Briefcase,
  More:    MoreHorizontal,
};

const LINKS = [
  { name: "Home",  href: "/" },
  { name: "About", href: "/about" },
  { name: "Work",  href: "/work" },
  { name: "More",  href: "#" },
];

// ─────────────────────────────────────────────────────────────────────────────
export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { isOpen, onToggle, onClose } = useDisclosure();
  const { isOpen: isCmdOpen, onOpen: onCmdOpen, onClose: onCmdClose } = useDisclosure();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // ── Colors ─────────────────────────────────────────────────────────────────
  const bgScrolled    = useColorModeValue("rgba(255,255,255,0.75)", "rgba(26,26,26,0.75)");
  const bgTop         = useColorModeValue("rgba(255,255,255,0.3)",  "rgba(26,26,26,0.3)");
  const borderColor   = useColorModeValue("gray.200", "whiteAlpha.200");
  const linkColor     = useColorModeValue("gray.700", "gray.300");
  const hoverLink     = useColorModeValue("#c026d3", "#86198f");
  const activeLinkColor = useColorModeValue("#86198f", "#fdf4ff");
  const iconHoverBg   = useColorModeValue("gray.100", "whiteAlpha.200");
  const tooltipBg     = useColorModeValue("#bf26d392", "#f5d0fe");
  const shadowColor   = colorMode === "dark"
    ? "0 8px 32px rgba(255,255,255,0.05)"
    : "0 8px 32px rgba(0,0,0,0.1)";

  // Sidebar colors
  const sidebarBg     = useColorModeValue("rgba(255,255,255,0.85)", "rgba(16,16,20,0.9)");
  const sidebarBorder = useColorModeValue("rgba(0,0,0,0.08)", "rgba(255,255,255,0.07)");
  const sidebarActive = useColorModeValue("#f5d0fe", "rgba(192,38,211,0.2)");

  // Bottom bar colors
  const bottomBg      = useColorModeValue("rgba(255,255,255,0.92)", "rgba(12,12,16,0.95)");
  const bottomBorder  = useColorModeValue("rgba(0,0,0,0.08)", "rgba(255,255,255,0.07)");

  // ── Scroll listener ────────────────────────────────────────────────────────
  useEffect(() => {
    const h = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  // ── Cmd+K ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    const h = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") { e.preventDefault(); onCmdOpen(); }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onCmdOpen]);

  // ── Active check ───────────────────────────────────────────────────────────
  const isActive = (href) => {
    if (href === "/") return location.pathname === "/";
    if (href.startsWith("/#")) return location.pathname === "/" && location.hash === href.slice(1);
    return location.pathname === href;
  };

  // ── Animation variants ─────────────────────────────────────────────────────
  const itemVariants = {
    hidden:  { opacity: 0, y: -10 },
    visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.3 } }),
  };

  // ── Tooltip label helper ───────────────────────────────────────────────────
  const KbdLabel = ({ keys }) => (
    <Flex align="center" gap={1}>
      {keys.map((k, i) => (
        <React.Fragment key={k}>
          {i > 0 && <Box as="span" fontSize="10px" color={hoverLink}>+</Box>}
          <Kbd fontSize="10px" borderRadius="5px" color={hoverLink}>{k}</Kbd>
        </React.Fragment>
      ))}
    </Flex>
  );

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <>
      {/* ══════════════════════════════════════════════════════════════════
          DESKTOP (md+) — floating pill nav (original, unchanged)
      ══════════════════════════════════════════════════════════════════ */}
      <MotionFlex
        as="nav"
        display={{ base: "none", sm: "none", md: "flex" }}
        position="fixed"
        top="16px"
        left="0"
        right="0"
        mx="auto"
        w="90%"
        maxW="6xl"
        zIndex={100}
        bg={isScrolled ? bgScrolled : bgTop}
        backdropFilter="blur(12px)"
        borderRadius="xl"
        border="1px solid"
        borderColor={borderColor}
        boxShadow={shadowColor}
        px={4}
        py={3}
        align="center"
        justify="space-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo */}
        <Box w="160px">
          <Box as={RouterLink} to="/" _hover={{ opacity: 0.8 }}
            transition="0.2s ease" display="block">
            <Image src={DevGif} alt="Developer" boxSize="50px" />
          </Box>
        </Box>

        {/* Links */}
        <HStack spacing={1} flex={1} justify="center">
          {LINKS.map(({ name, href }, i) => (
            <MotionBox key={name} custom={i} variants={itemVariants}
              initial="hidden" animate="visible"
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Box as={RouterLink} to={href}
                display="flex" alignItems="center" gap={1.5}
                px={4} py={2} borderRadius="md"
                fontSize="sm" fontWeight="medium"
                bg="transparent"
                color={isActive(href) ? activeLinkColor : linkColor}
                _hover={{ color: hoverLink, textDecoration: "none" }}
                transition="all 0.2s ease">
                {name}
                {name === "More" && <ChevronDown size={14} />}
              </Box>
            </MotionBox>
          ))}

          {/* GitHub star */}
          <Box as="a" href="https://github.com/anandita-3217/anandita-dakshayani"
            target="_blank" rel="noopener noreferrer"
            display="flex" alignItems="center" gap={1}
            px={4} py={2} borderRadius="md" fontSize="sm" fontWeight="medium"
            bg={useColorModeValue("#d946ef", "#c026d3")} color="white"
            _hover={{ bg: useColorModeValue("#c026d3", "#d946ef"), textDecoration: "none", transform: "scale(1.02)" }}
            transition="all 0.2s ease">
            <FaStar size={14} />
            <Box as="span">or</Box>
            <FaCodeBranch size={14} />
          </Box>
        </HStack>

        {/* Right controls */}
        <Flex w="160px" justify="flex-end" align="center" gap={2}>
          <Tooltip bg={tooltipBg} label={<KbdLabel keys={["ctrl", "K"]} />}
            placement="bottom" openDelay={300} borderRadius="8px" px={2} py={1.5}>
            <MotionBox initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}>
              <IconButton aria-label="Command palette" icon={<Command size={20} />}
                onClick={onCmdOpen} variant="ghost" borderRadius="full" size="md"
                _hover={{ bg: iconHoverBg }} />
            </MotionBox>
          </Tooltip>

          <Tooltip bg={tooltipBg} label={<KbdLabel keys={["ctrl", "shift", "L"]} />}
            placement="bottom" openDelay={300} borderRadius="8px" px={2} py={1.5}>
            <MotionBox initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}>
              <IconButton aria-label="Toggle theme"
                icon={colorMode === "light" ? <Moon size={20} /> : <Sun size={20} />}
                onClick={toggleColorMode} variant="ghost" borderRadius="full" size="md"
                _hover={{ bg: iconHoverBg }} />
            </MotionBox>
          </Tooltip>
        </Flex>
      </MotionFlex>

      {/* ══════════════════════════════════════════════════════════════════
          TABLET (sm) — collapsible left sidebar
          Expanded: 180px — icon + label
          Collapsed:  60px — icon only + tooltips
      ══════════════════════════════════════════════════════════════════ */}
      <MotionBox
        display={{ base: "none", sm: "flex", md: "none" }}
        as="nav"
        position="fixed"
        top={0}
        left={0}
        bottom={0}
        zIndex={100}
        bg={sidebarBg}
        backdropFilter="blur(16px)"
        borderRight="1px solid"
        borderColor={sidebarBorder}
        flexDirection="column"
        overflow="hidden"
        animate={{ width: sidebarOpen ? "180px" : "60px" }}
        initial={{ x: -180, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
        // on mount slide in
        onAnimationComplete={() => {}}
      >
        {/* Top hairline accent */}
        <Box position="absolute" top={0} left={0} right={0} h="2px"
          bgGradient="linear(to-r, #c026d3, #7c3aed)" />

        {/* Logo + collapse toggle row */}
        <Flex px={sidebarOpen ? 4 : 0} pt={6} pb={4}
          align="center" justify={sidebarOpen ? "space-between" : "center"}>
          <AnimatePresence>
            {sidebarOpen && (
              <MotionBox
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}>
                <Box as={RouterLink} to="/" _hover={{ opacity: 0.8 }}
                  transition="0.2s ease" display="inline-block">
                  <Image src={DevGif} alt="Developer" boxSize="36px" />
                </Box>
              </MotionBox>
            )}
          </AnimatePresence>

          {/* Collapse / expand button */}
          <Tooltip
            label={sidebarOpen ? "Collapse" : "Expand"}
            placement="right"
            openDelay={400}
            isDisabled={sidebarOpen}
            bg={tooltipBg}
            borderRadius="8px"
          >
            <Box
              as="button"
              onClick={() => setSidebarOpen((o) => !o)}
              display="flex" alignItems="center" justifyContent="center"
              w="28px" h="28px" borderRadius="8px"
              border="1px solid" borderColor={sidebarBorder}
              bg="transparent" color={linkColor} cursor="pointer"
              flexShrink={0}
              style={{ transition: "all 0.18s ease" }}
              _hover={{ bg: sidebarActive, color: activeLinkColor }}
            >
              <motion.div
                animate={{ rotate: sidebarOpen ? 0 : 180 }}
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                style={{ display: "flex", alignItems: "center" }}
              >
                <ChevronDown size={14} style={{ transform: "rotate(90deg)" }} />
              </motion.div>
            </Box>
          </Tooltip>
        </Flex>

        {/* Divider */}
        <Box mx={sidebarOpen ? 4 : 2} h="1px" bg={sidebarBorder} mb={4}
          style={{ transition: "margin 0.3s ease" }} />

        {/* Nav links */}
        <VStack spacing={1} align="stretch" px={sidebarOpen ? 3 : 1.5} flex={1}
          style={{ transition: "padding 0.3s ease" }}>
          {LINKS.map(({ name, href }, i) => {
            const LinkIcon = LINK_ICONS[name];
            const active = isActive(href);
            return (
              <MotionBox key={name}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06, duration: 0.35 }}>
                <Tooltip
                  label={name}
                  placement="right"
                  openDelay={200}
                  isDisabled={sidebarOpen}
                  bg={tooltipBg}
                  borderRadius="8px"
                >
                  <Box as={RouterLink} to={href}
                    display="flex" alignItems="center"
                    gap={sidebarOpen ? 3 : 0}
                    px={sidebarOpen ? 3 : 0}
                    py={2.5}
                    borderRadius="10px"
                    justify="center"
                    bg={active ? sidebarActive : "transparent"}
                    color={active ? activeLinkColor : linkColor}
                    fontWeight={active ? 600 : 400}
                    fontSize="sm"
                    _hover={{ bg: sidebarActive, color: activeLinkColor, textDecoration: "none" }}
                    transition="all 0.18s ease"
                    style={{ justifyContent: sidebarOpen ? "flex-start" : "center" }}
                  >
                    {LinkIcon && (
                      <Box color={active ? activeLinkColor : "inherit"} flexShrink={0}>
                        <LinkIcon size={17} />
                      </Box>
                    )}
                    <AnimatePresence>
                      {sidebarOpen && (
                        <MotionBox
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "auto" }}
                          exit={{ opacity: 0, width: 0 }}
                          transition={{ duration: 0.2 }}
                          overflow="hidden"
                          display="flex" alignItems="center" flex={1}
                          style={{ whiteSpace: "nowrap" }}
                        >
                          <Text flex={1} ml={0}>{name}</Text>
                          {name === "More" && <ChevronDown size={13} />}
                        </MotionBox>
                      )}
                    </AnimatePresence>
                  </Box>
                </Tooltip>
              </MotionBox>
            );
          })}
        </VStack>

        {/* Bottom controls */}
        <Box px={sidebarOpen ? 3 : 1.5} pb={6}
          style={{ transition: "padding 0.3s ease" }}>
          <Box h="1px" bg={sidebarBorder} mb={4} />

          {/* GitHub — hidden when collapsed */}
          <AnimatePresence>
            {sidebarOpen && (
              <MotionBox
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                overflow="hidden"
                mb={2}
              >
                <Box as="a" href="https://github.com/anandita-3217/anandita-dakshayani"
                  target="_blank" rel="noopener noreferrer"
                  display="flex" alignItems="center" gap={2}
                  px={3} py={2.5} borderRadius="10px" fontSize="sm" fontWeight="medium"
                  bg={useColorModeValue("#d946ef18", "rgba(192,38,211,0.15)")}
                  color={useColorModeValue("#86198f", "#d946ef")}
                  _hover={{ bg: useColorModeValue("#d946ef28", "rgba(192,38,211,0.25)"), textDecoration: "none" }}
                  transition="all 0.18s ease">
                  <FaStar size={14} />
                  <Text fontSize="sm" whiteSpace="nowrap">Star repo</Text>
                </Box>
              </MotionBox>
            )}
          </AnimatePresence>

          {/* Theme + Cmd — stacked when collapsed, row when expanded */}
          <Flex gap={2} px={0}
            direction={sidebarOpen ? "row" : "column"}
            align="center"
            style={{ transition: "flex-direction 0.3s ease" }}>
            <Tooltip bg={tooltipBg} label={<KbdLabel keys={["ctrl", "K"]} />}
              placement="right" openDelay={300} borderRadius="8px">
              <IconButton aria-label="Command palette" icon={<Command size={16} />}
                onClick={onCmdOpen} variant="ghost" borderRadius="lg" size="sm"
                flex={sidebarOpen ? 1 : "none"}
                w={sidebarOpen ? "auto" : "36px"}
                _hover={{ bg: iconHoverBg }} />
            </Tooltip>
            <Tooltip bg={tooltipBg} label={<KbdLabel keys={["ctrl", "shift", "L"]} />}
              placement="right" openDelay={300} borderRadius="8px">
              <IconButton aria-label="Toggle theme"
                icon={colorMode === "light" ? <Moon size={16} /> : <Sun size={16} />}
                onClick={toggleColorMode} variant="ghost" borderRadius="lg" size="sm"
                flex={sidebarOpen ? 1 : "none"}
                w={sidebarOpen ? "auto" : "36px"}
                _hover={{ bg: iconHoverBg }} />
            </Tooltip>
          </Flex>
        </Box>
      </MotionBox>

      {/* ══════════════════════════════════════════════════════════════════
          MOBILE (base) — fixed bottom bar, icons only
      ══════════════════════════════════════════════════════════════════ */}
      <MotionBox
        display={{ base: "flex", sm: "none" }}
        as="nav"
        position="fixed"
        bottom={0}
        left={0}
        right={0}
        zIndex={100}
        bg={bottomBg}
        backdropFilter="blur(20px)"
        borderTop="1px solid"
        borderColor={bottomBorder}
        px={2}
        pb="env(safe-area-inset-bottom, 8px)"
        pt={2}
        align="center"
        justify="space-around"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      >
        {/* Top accent line */}
        <Box position="absolute" top={0} left={0} right={0} h="1px"
          bgGradient="linear(to-r, transparent, #c026d3, #7c3aed, transparent)" />

        {LINKS.map(({ name, href }) => {
          const LinkIcon = LINK_ICONS[name];
          const active = isActive(href);
          return (
            <Box key={name} as={RouterLink} to={href}
              display="flex" flexDirection="column" alignItems="center"
              justifyContent="center"
              px={4} py={2} borderRadius="12px" minW="52px"
              position="relative"
              color={active ? activeLinkColor : linkColor}
              _hover={{ color: hoverLink, textDecoration: "none" }}
              transition="all 0.18s ease">
              {/* Active pill indicator */}
              {active && (
                <MotionBox
                  layoutId="mobile-active"
                  position="absolute"
                  top={0} left="50%" transform="translateX(-50%)"
                  w="20px" h="2px" borderRadius="2px"
                  bgGradient="linear(to-r, #c026d3, #7c3aed)"
                  initial={false}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              {LinkIcon && <LinkIcon size={22} strokeWidth={active ? 2.2 : 1.8} />}
            </Box>
          );
        })}

        {/* Theme toggle in bottom bar */}
        <Box
          display="flex" flexDirection="column" alignItems="center"
          justifyContent="center"
          px={4} py={2} borderRadius="12px" minW="52px"
          color={linkColor}
          onClick={toggleColorMode}
          cursor="pointer"
          _hover={{ color: hoverLink }}
          transition="all 0.18s ease">
          {colorMode === "light" ? <Moon size={22} strokeWidth={1.8} /> : <Sun size={22} strokeWidth={1.8} />}
        </Box>

        {/* Command palette in bottom bar */}
        <Box
          display="flex" flexDirection="column" alignItems="center"
          justifyContent="center"
          px={4} py={2} borderRadius="12px" minW="52px"
          color={linkColor}
          onClick={onCmdOpen}
          cursor="pointer"
          _hover={{ color: hoverLink }}
          transition="all 0.18s ease">
          <Command size={22} strokeWidth={1.8} />
        </Box>
      </MotionBox>

      {/* Command Palette */}
      <CommandPalette isOpen={isCmdOpen} onClose={onCmdClose} />
    </>
  );
}