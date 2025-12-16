import DotGrid from './components/assets/DotGrid/DotGrid'
import NotFound from './components/NotFound'
import Header from './components/Header'
import Hero  from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import ContributionMap from './components/ContributionMap'
import Resume from './components/Resume'
import Footer from './components/Footer'
import CommandPalette from './components/CommandPalette'
import ScrollToTop from './components/ScrollToTop'
import Learning from './components/Learning';
import Certificates from './components/Certificates';
import { useColorMode, useDisclosure } from '@chakra-ui/react';

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
              baseColor={isLight ? "#d4dadc" : "#272727"}     
              activeColor={isLight ? "#14b8a6" : "#5fffea"}   
              proximity={85}
              shockRadius={250}
              shockStrength={5}
              resistance={750}
              returnDuration={1.5}/> 
              <Header/>
              <Hero />
              <About />
              <Learning/>
              <Certificates/>
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
// TODO: Add a glimplse of github profile 
// TODO: Better layout design and make it multi page
// TODO: Make security better for contact form
// TODO: Have separate pages and have like buttons with tech skills or stuff for like when clicked tge projects with those tech skills in tags will be displayed
// TODO: MotionBox Works for about, learning, certificates,skills,resume but not for hero, contribution map, contact and projects test again and modify the code 
// TODO: Direct mailto: in contact.jsx is unsafe check that out
// TODO: add keyboard shortcuts to toggle theme with ctrl+t
// TODO: migrate resume to a drive link all assets
// TODO: Change up the look with good fonts



  )
}

export default App;