import DotGrid from './components/assets/DotGrid/DotGrid'
import Header from './components/Header'
import Footer from './components/Footer'
import NotFound from './components/NotFound'
import Hero  from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
// import ContributionMap from './components/ContributionMap'
import Resume from './components/Resume'
import CommandPalette from './components/CommandPalette'
import ScrollToTop from './components/ScrollToTop'
import Learning from './components/Learning';
import Hobbies from './components/AboutPageBits/Hobbies'
import Certificates from './components/AboutPageBits/Certificates'
import ContributionMap from './components/AboutPageBits/ContributionMap'
import { useColorMode, useDisclosure, useColorModeValue } from '@chakra-ui/react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { motion, useScroll } from 'framer-motion'

import useKeyboardShortcuts from './components/hooks/useKeyboardShortcuts'
function App() {
  const { scrollYProgress } = useScroll();
  const { colorMode, toggleColorMode } = useColorMode();
  const isLight = colorMode === "light";

  const {
    isOpen : isCommandPaletteOpen,
    onOpen : onCommandPaletteOpen,
    onClose : onCommandPaletteClose
  } = useDisclosure();
  
  useKeyboardShortcuts({onCommandPaletteOpen,onThemeToggle: toggleColorMode});
const baseColor = useColorModeValue("#d4dadc", '#1a1a1a');
  const gradientColors = useColorModeValue(
    ['#ff0080', '#6366f1', '#3b82f6'], // light mode: pink → indigo → blue
    ['#ff00ff', '#8000ff', '#0080ff']  // dark mode: lighter versions
    //  ['#1e40af', '#7c3aed','#ec4899'],
    //  ['#1e40af', '#7c3aed','#ec4899']
     
  );

  return (
    <Router>
        <motion.div
        style={{
          scaleX: scrollYProgress,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #14b8a6, #0d9488)',
          transformOrigin: '0%',
          zIndex: 9999,
        }}
      />
      <CommandPalette 
        isOpen={isCommandPaletteOpen}
        onClose={onCommandPaletteClose}
      />
       <ScrollToTop />
        <Routes>
          <Route path="/" element={
            <>
              <DotGrid
              dotSize={5}
              gap={15}
              // baseColor={isLight ? "#d4dadc" : "#272727"}     
  baseColor={baseColor}
  activeColor={gradientColors} 
              proximity={85}
              shockRadius={250}
              shockStrength={4}
              resistance={750}
              returnDuration={1.5}/> 
              <Header/>
              <Hero />
              <About />
              {/* <Hobbies/> */}
              <Certificates/>
              <Learning/>
              <Skills/>
              <ContributionMap/>
              <Projects /> 
              <Contact />
              <Resume/>
              <Footer/>
            </>
          } />

          {/* 404 page for all other routes */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>

// TODO: https://www.achyutkatiyar.com/ use this as a base s 
// TODO: https://sarayoussry.com/
// TODO: https://aayushbharti.in/ -- layout
// TODO: https://www.muhammadaamirmalik.com/
// TODO: Add a glimplse of github profile 
// TODO: Better layout design and make it multi page
// TODO: Make security better for contact form
// TODO: Have separate pages and have like buttons with tech skills or stuff for like when clicked tge projects with those tech skills in tags will be displayed
// TODO: MotionBox Works for about, learning, certificates,skills,resume , projects , hero but not for  contribution map, contact and test again and modify the code 
// TODO: Direct mailto: in contact.jsx is unsafe check that out
// TODO: add keyboard shortcuts to toggle theme with ctrl+t
// TODO: migrate resume to a drive link all assets
// TODO: Change up the look with good fonts
// TODO: Learn to make routes and setup separate pages 
// TODO: Add guest book inspired by https://aayushbharti.in/ 
// TODO: Add bucketlist inspired by https://aayushbharti.in/ 
// TODO: In techSkills remove the name of the tech and add it as a tooltip inspired by https://aayushbharti.in/  https://v2.chakra-ui.com/docs/components/tooltip
// TODO: For the main projects think of a better layout and add filters and sorts option
// TODO: https://aayushbharti.in/about layout for new about page https://reactbits.dev/components/dome-gallery or https://reactbits.dev/components/masonry or https://reactbits.dev/components/stack or https://reactbits.dev/components/circular-gallery for rightside asset
// TODO: https://reactbits.dev/text-animations/scroll-velocity works for other assets for the home page's about https://reactbits.dev/animations/logo-loop combine these
// TODO: https://reactbits.dev/text-animations/split-text for separate contact page
// TODO: https://github.com/aarabii/An/blob/master/src/components/sections/Skills.tsx for having a ribbon of tech skills in the home page> about section> bento box layout one of the bento boxes
  )
}

export default App;