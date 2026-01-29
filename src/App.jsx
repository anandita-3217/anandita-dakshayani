// import DotGrid from './components/assets/DotGrid/DotGrid'
// import Header from './components/Header'
// import Footer from './components/Footer'
// import NotFound from './components/NotFound'
// import Hero  from './components/Hero'
// import AboutPage from './pages/AboutPage'
// import About from './components/About'
// // import Skills from './components/Skills'
// import Projects from './components/Projects'
// import Contact from './components/Contact'
// import Resume from './components/Resume'
// import CommandPalette from './components/CommandPalette'
// import ScrollToTop from './components/ScrollToTop'
// // import Skills from './components/options'
// import Certificates from './components/AboutPageBits/Certificates'
// import ContributionMap from './components/AboutPageBits/ContributionMap'
// import Learning from './components/AboutPageBits/Learning'
// import { useColorMode, useDisclosure, useColorModeValue } from '@chakra-ui/react';

// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// import { motion, useScroll } from 'framer-motion'

// import useKeyboardShortcuts from './components/hooks/useKeyboardShortcuts'
// import TechSkills from './components/AboutPageBits/TechSkills'
// function App() {
//   const { scrollYProgress } = useScroll();
//   const { colorMode, toggleColorMode } = useColorMode();
//   const isLight = colorMode === "light";

//   const {
//     isOpen : isCommandPaletteOpen,
//     onOpen : onCommandPaletteOpen,
//     onClose : onCommandPaletteClose
//   } = useDisclosure();
  
//   useKeyboardShortcuts({onCommandPaletteOpen,onThemeToggle: toggleColorMode});
// const baseColor = useColorModeValue("#d4dadc", '#1a1a1a');
//   const gradientColors = useColorModeValue(
//     ['#ff0080', '#6366f1', '#3b82f6'], // light mode: pink → indigo → blue
//     ['#ff00ff', '#8000ff', '#0080ff']  // dark mode: lighter versions
//     //  ['#1e40af', '#7c3aed','#ec4899'],
//     //  ['#1e40af', '#7c3aed','#ec4899']
     
//   );

//   return (
//     <Router>
//         <motion.div
//         style={{
//           scaleX: scrollYProgress,
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           right: 0,
//           height: '4px',
//           background: 'linear-gradient(90deg,#059669, #2563eb, #9333ea)',
//           transformOrigin: '0%',
//           zIndex: 9999,
//         }}
//       />
//       <CommandPalette 
//         isOpen={isCommandPaletteOpen}
//         onClose={onCommandPaletteClose}
//       />
//        <ScrollToTop />
//         <Routes>
//           <Route path="/" element={
//             <>
//               <DotGrid
//               dotSize={5}
//               gap={15}
//               // baseColor={isLight ? "#d4dadc" : "#272727"}     
//   baseColor={baseColor}
//   activeColor={gradientColors} 
//               proximity={85}
//               shockRadius={170}
//               shockStrength={3}
//               resistance={750}
//               returnDuration={1.5}/> 
//               <Header/>
//               <Hero />
//               <About />
//               <Projects /> 
//               <Contact />
//               <Resume/>
//               <Footer/>
//             </>
//           } />


//           <Route path="/about" element={<AboutPage />} />
//           {/* 404 page for all other routes */}
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </Router>

// // TODO: https://www.achyutkatiyar.com/ use this as a base s 
// // TODO: https://sarayoussry.com/
// // TODO: https://aayushbharti.in/ -- layout
// // TODO: https://www.muhammadaamirmalik.com/
// //  TODO: should i just get rid of tech skills in  About?
// // TODO: Add a glimplse of github profile 
// // TODO: Better layout design and make it multi page
// // TODO: Make security better for contact form
// // TODO: Have separate pages and have like buttons with tech skills or stuff for like when clicked tge projects with those tech skills in tags will be displayed
// // TODO: Redo contact and test again and modify the code 
// // TODO: Direct mailto: in contact.jsx is unsafe check that out
// // TODO: migrate resume to a drive link all assets
// // TODO: Learn to make routes and setup separate pages 
// // TODO: Add guest book inspired by https://aayushbharti.in/ 
// // TODO: Add bucketlist inspired by https://aayushbharti.in/ 
// // TODO: In techSkills remove the name of the tech and add it as a tooltip inspired by https://aayushbharti.in/  https://v2.chakra-ui.com/docs/components/tooltip
// // TODO: For the main projects think of a better layout and add filters and sorts option
// // TODO: https://aayushbharti.in/about layout for new about page https://reactbits.dev/components/dome-gallery or https://reactbits.dev/components/masonry or https://reactbits.dev/components/stack or https://reactbits.dev/components/circular-gallery for rightside asset
// // TODO: https://reactbits.dev/text-animations/scroll-velocity works for other assets for the home page's about https://reactbits.dev/animations/logo-loop combine these
// // TODO: https://reactbits.dev/text-animations/split-text for separate contact page
// // TODO: Add  a an AI chatbot or whatev 
// // TODO: Maybe add a picture of whatever hubble is seeing in the hobbies section?
// // TODO: maybe https://www.framer.com/marketplace/components/eyes-follow-cursor/ https://www.framer.com/marketplace/components/interactive-gradient/
// TODO: Add a cool loading screen
// TODO: Change hero section buttons with better cta
//  TODO: On scroll away from the current component and component can become smaller and smaller and then the next component can pop up 
//   )
// }

// export default App;

import { useColorMode, useDisclosure, useColorModeValue } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';

// Import new components
import DotGrid from './components/assets/DotGrid/DotGrid';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero'; // Updated with parallax
import Projects from './components/Projects'; // Updated with parallax
import About from './components/About';
import AboutPage from './pages/AboutPage';
import Contact from './components/Contact';
import Resume from './components/Resume';
import CommandPalette from './components/CommandPalette';
import ScrollToTop from './components/ScrollToTop';
import NotFound from './components/NotFound'
import useKeyboardShortcuts from './components/hooks/useKeyboardShortcuts';

import Options from './components/options';

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress,{
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })
  const { colorMode, toggleColorMode } = useColorMode();
  const isLight = colorMode === "light";

  const {
    isOpen: isCommandPaletteOpen,
    onOpen: onCommandPaletteOpen,
    onClose: onCommandPaletteClose
  } = useDisclosure();
  
  useKeyboardShortcuts({
    onCommandPaletteOpen,
    onThemeToggle: toggleColorMode
  });

  const baseColor = useColorModeValue("#d4dadc", '#1a1a1a');
  const gradientColors = useColorModeValue(
    ['#ff0080', '#6366f1', '#3b82f6'],
    ['#ff00ff', '#8000ff', '#0080ff']
  );

  return (
    <Router>
      {/* Progress Bar */}
      <motion.div
        style={{
          scaleX,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #ec4899, #a855f7, #6366f1)',
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
              baseColor={baseColor}
              activeColor={gradientColors} 
              proximity={85}
              shockRadius={170}
              shockStrength={3}
              resistance={750}
              returnDuration={1.5}
            /> 
            
            <Header />
            <Hero />
            {/* <Options/> */}
            <About />
            {/* Projects with enhanced parallax */}
            <Projects /> 
              <Contact />
              <Resume />
            
            <Footer />
          </>
        } />

        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;