import React, { useState } from "react";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Image,
  VStack,
  Link,
  useDisclosure,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import DevGif from "./assets/developer.gif";
import {
  Menu,
  X,
  Home,
  User,
  File ,
  FolderGit2,
  Mail,
} from "lucide-react";

// Chakra + Motion wrapper
const MotionBox = motion.create(Box);

const Header = () => {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const links = [
    { name: "Home", icon: Home, href: "#hero" },
    { name: "About", icon: User, href: "#about" },
    { name: "Projects", icon: FolderGit2, href: "#projects" },
    // { name: "Experience", icon: Briefcase, href: "#experience" },
    { name: "Contact", icon: Mail, href: "#contact" },
    { name: "Resume", icon: File , href: "#resume" },
  ];

  return (
    <Box
      as="nav"
      position="fixed"
      top={0}
      left={0}
      w="100%"
      zIndex={50}
      bg="rgba(0,0,0,0.4)"
      backdropFilter="blur(10px)"
      color="white"
    >
      {/* Desktop Header */}
      <Flex
        maxW="7xl"
        mx="auto"
        align="center"
        justify="space-between"
        px={6}
        py={4}
      >
        {/* Logo - Clickable to Hero */}
        <Link href="#hero" _hover={{ opacity: 0.8 }} transition="0.2s ease">
          <Image src={DevGif} alt="Developer" boxSize="50px" />
        </Link>

        {/* Desktop Links */}
        <HStack spacing={8} display={{ base: "none", md: "flex" }}>
          {links.map(({ name, icon: Icon, href }) => (
            <Link
              key={name}
              href={href}
              display="flex"
              alignItems="center"
              gap={2}
              _hover={{ color: "#14b8a6" }}
              transition="0.2s ease"
            >
              <Icon size={18} /> {name}
            </Link>
          ))}
        </HStack>

        {/* Mobile Menu Toggle */}
        <IconButton
          aria-label="Menu"
          icon={isOpen ? <X size={26} /> : <Menu size={26} />}
          display={{ base: "flex", md: "none" }}
          variant="ghost"
          color="white"
          onClick={onToggle}
        />
      </Flex>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <MotionBox
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            display={{ md: "none" }}
            bg="rgba(0,0,0,0.9)"
            backdropFilter="blur(12px)"
          >
            <VStack py={6} spacing={6}>
              {links.map(({ name, icon: Icon, href }) => (
                <Link
                  key={name}
                  href={href}
                  display="flex"
                  alignItems="center"
                  gap={3}
                  _hover={{ color: "#14b8a6" }}
                  transition="0.2s ease"
                  onClick={onClose}
                >
                  <Icon size={20} /> {name}
                </Link>
              ))}
            </VStack>
          </MotionBox>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default Header;
// components/Navbar.jsx
// import { useState, useEffect } from "react";
// import { Link as RouterLink, useLocation } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import DevGif from "./assets/developer.gif";
// import {
//   Box,
//   Flex,
//   Link,
//   IconButton,
//   useColorMode,
//   useColorModeValue,
//   useDisclosure,
//   VStack,
//   Drawer,
//   DrawerBody,
//   DrawerOverlay,
//   DrawerContent,
//   DrawerHeader,
//   DrawerCloseButton,
//   Button,
//   Text,
// } from "@chakra-ui/react";

// import { PiSun,PiMoon } from "react-icons/pi";
// import { RxHamburgerMenu } from "react-icons/rx";

// const navItems = [
//   { title: "Home", href: "/" },
//   { title: "About", href: "#about" },
//   // { title: "Skill", href: "#skills" },
//   { title: "Projects", href: "#projects" },
//   { title: "Resume", href: "#resume" },
//   { title: "Contact", href: "#contact" },
// ];

// export default function Header() {
//   const { colorMode, toggleColorMode } = useColorMode();
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isVisible, setIsVisible] = useState(true);
//   const [lastScrollY, setLastScrollY] = useState(0);
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const location = useLocation();
//   const [activeSection, setActiveSection] = useState(location.pathname);

//   useEffect(() => {
//     const handleScroll = () => {
//       const currentY = window.scrollY;
//       if (currentY > lastScrollY && currentY > 100) setIsVisible(false);
//       else setIsVisible(true);
//       setIsScrolled(currentY > 20);
//       setLastScrollY(currentY);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [lastScrollY]);

//   const navbarVariants = {
//     hidden: { y: -100, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: { type: "spring", stiffness: 300, damping: 20 },
//     },
//     exit: { y: -100, opacity: 0, transition: { duration: 0.2 } },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: -10 },
//     visible: (i) => ({
//       opacity: 1,
//       y: 0,
//       transition: { delay: i * 0.05 },
//     }),
//   };

//   const bgScrolled = useColorModeValue(
//     "rgba(255, 255, 255, 0.6)",
//     "rgba(26, 26, 26, 0.6)"
//   );
//   const bgTop = useColorModeValue(
//     "rgba(255, 255, 255, 0.3)",
//     "rgba(26, 26, 26, 0.3)"
//   );
//   const borderColor = useColorModeValue("gray.200", "whiteAlpha.200");

//   return (
//     <>
//       <AnimatePresence>
//         {isVisible && (
//           <motion.header
//             variants={navbarVariants}
//             initial="hidden"
//             animate="visible"
//             exit="exit"
//           >
//             <Flex
//               position="fixed"
//               top="4"
//               left="50%"
//               transform="translateX(-50%)"
//               w="95%"
//               maxW="6xl"
//               px={4}
//               py={3}
//               rounded="xl"
//               justify="space-between"
//               align="center"
//               zIndex={50}
//               bg={isScrolled ? bgScrolled : bgTop}
//               backdropFilter="blur(10px)"
//               border="1px solid"
//               borderColor={borderColor}
//               boxShadow={
//                 colorMode === "dark"
//                   ? "0 8px 32px rgba(255,255,255,0.05)"
//                   : "0 8px 32px rgba(0,0,0,0.1)"
//               }
//               transition="all 0.3s ease"
//             >
//               {/* Logo */}
//               <Link href="#hero" _hover={{ opacity: 0.8 }} transition="0.2s ease">
//           <Image src={DevGif} alt="Developer" boxSize="50px" />
//         </Link>

//               {/* Desktop Nav */}
//               <Flex display={{ base: "none", md: "flex" }} gap={3}>
//                 {navItems.map((item, i) => (
//                   <motion.div
//                     key={item.href}
//                     custom={i}
//                     variants={itemVariants}
//                     initial="hidden"
//                     animate="visible"
//                   >
//                     <Link
//                       as={RouterLink}
//                       to={item.href}
//                       px={4}
//                       py={2}
//                       rounded="md"
//                       fontSize="sm"
//                       fontWeight="medium"
//                       bg={
//                         activeSection === item.href
//                           ? useColorModeValue("teal.50", "teal.900")
//                           : "transparent"
//                       }
//                       color={
//                         activeSection === item.href
//                           ? "teal.400"
//                           : useColorModeValue("gray.700", "gray.300")
//                       }
//                       _hover={{
//                         bg: useColorModeValue("teal.50", "teal.900"),
//                         color: "teal.400",
//                       }}
//                       onClick={() => setActiveSection(item.href)}
//                     >
//                       {item.title}
//                     </Link>
//                   </motion.div>
//                 ))}
//               </Flex>

//               {/* Theme + Mobile Menu */}
//               <Flex align="center" gap={2}>
//                 <IconButton
//                   aria-label="Toggle theme"
//                   icon={colorMode === "light" ? <PiMoon /> : <PiSun />}
//                   onClick={toggleColorMode}
//                   variant="ghost"
//                   rounded="full"
//                 />
//                 <IconButton
//                   aria-label="Open menu"
//                   icon={<RxHamburgerMenu />}
//                   onClick={onOpen}
//                   display={{ base: "inline-flex", md: "none" }}
//                   variant="ghost"
//                   rounded="full"
//                 />
//               </Flex>
//             </Flex>
//           </motion.header>
//         )}
//       </AnimatePresence>

//       {/* Mobile Drawer */}
//       <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
//         <DrawerOverlay />
//         <DrawerContent bg={useColorModeValue("white", "gray.900")}>
//           <DrawerCloseButton />
//           <DrawerHeader borderBottomWidth="1px">Achyut Katiyar</DrawerHeader>
//           <DrawerBody>
//             <VStack spacing={3} mt={4} align="stretch">
//               {navItems.map((item) => (
//                 <Button
//                   key={item.href}
//                   as={RouterLink}
//                   to={item.href}
//                   variant="ghost"
//                   justifyContent="flex-start"
//                   onClick={() => {
//                     setActiveSection(item.href);
//                     onClose();
//                   }}
//                 >
//                   {item.title}
//                 </Button>
//               ))}
//             </VStack>
//           </DrawerBody>
//         </DrawerContent>
//       </Drawer>
//     </>
//   );
// }
