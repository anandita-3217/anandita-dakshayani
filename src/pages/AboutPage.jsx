import React from 'react';
import AboutPart from '../components/AboutPageBits/AboutPart'
import Hobbies from '../components/AboutPageBits/Hobbies';
import Certificates from '../components/AboutPageBits/Certificates';
import TechSkills from '../components/AboutPageBits/TechSkills';
import ContributionMap from '../components/AboutPageBits/ContributionMap';
import Learning from '../components/AboutPageBits/Learning';
import Resume from '../components/Resume';
// import CommandPalette from '../components/CommandPalette';
// import ScrollToTop from './components/ScrollToTop'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import DotGrid from '../components/assets/DotGrid/DotGrid';
import NotFound from '../components/NotFound';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {motion,useScroll} from 'framer-motion'
import { useColorMode,useDisclosure, useColorModeValue } from '@chakra-ui/react';
import useKeyboardShortcuts from '../components/hooks/useKeyboardShortcuts';
function AboutPage() {
  const {scrollYProgress}= useScroll();
  const {colorMode,toggleColorMode} = useColorMode();

  const{
    isOpen: isCommandPaletteOpen,
    onOpen: onCommandPaletteOpen,
    onClose: onCommandPaletteClose
  } = useDisclosure();
  // const isLight = colorMode = "light";
  useKeyboardShortcuts({onCommandPaletteOpen,onThemeToggle:toggleColorMode});
  const gradientColors=useColorModeValue(

    ['#ff0080', '#6366f1', '#3b82f6'], // light mode: pink → indigo → blue
    ['#ff00ff', '#8000ff', '#0080ff']  // dark mode: lighter versions
  );
  const baseColor = useColorModeValue("#d4dadc", '#1a1a1a');
  return (
    <>
    <Router >
      <motion.div
      style={{
        scaleX: scrollYProgress,
        position: 'fixed',
        top: 0,
        left: 0,
        right:'4px',
        background: 'linear(to-r, #059669, #2563eb, #9333ea)',
        transformOrigin: '0%',
        zIndex: 9999
      }}/>
      
      <Routes>
        <Route path="/about" element={
          <>
            <DotGrid
            dotSize={5}
            gap={15}
            baseColor={baseColor}
            activeColor={gradientColors}
            proximity={85}
            shockRadius={170}
            shockStrength={3}
            resistance={750}
            returnDuration={1.5}/>
            <Header/>
            <AboutPart />
            <Hobbies />
            <Certificates />
            <TechSkills />
            <Learning/>
            <ContributionMap />
            <Resume />
            <Footer/>
          </>
        }/>
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </Router>
    </>
  );
}
// Add contacts here
export default AboutPage;