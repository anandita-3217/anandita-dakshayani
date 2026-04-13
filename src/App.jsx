// // TODO: https://www.achyutkatiyar.com/ use this as a base s 
// // TODO: https://sarayoussry.com/
// // TODO: https://aayushbharti.in/ -- layout
// // TODO: Make security better for contact form
// // TODO: Have separate pages and have like buttons with tech skills or stuff for like when clicked tge projects with those tech skills in tags will be displayed
// // TODO: Redo contact and test again and modify the code 
// // TODO: Direct mailto: in contact.jsx is unsafe check that out
// // TODO: migrate resume to a drive link all assets
// // TODO: Add guest book inspired by https://aayushbharti.in/ 
// // TODO: Add bucketlist inspired by https://aayushbharti.in/ 
// // TODO: For the main projects think of a better layout and add filters and sorts option
// // TODO: Maybe add a picture of whatever hubble is seeing in the hobbies section?
// // TODO: maybe https://www.framer.com/marketplace/components/eyes-follow-cursor/ https://www.framer.com/marketplace/components/interactive-gradient/
// TODO: Add a cool loading screen
//   )
// }

// export default App;


// TODO: disable dev tools in prod
import { useColorMode, useDisclosure, useColorModeValue } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';

// Import new components
import DotGrid from './components/assets/DotGrid/DotGrid';
import Header from './components/Header';
import Footer from './components/Footer';
import CommandPalette from './components/CommandPalette';
import ScrollToTop from './components/ScrollToTop';
// Custom hooks
import useKeyboardShortcuts from './components/hooks/useKeyboardShortcuts';

// Page to route to when not found
import NotFound from './components/NotFound'
// Components on display
import Hero from './components/Hero'; 
import Projects from './components/Projects'; 
import About from './components/About';
import Contact from './components/Contact';
import Resume from './components/Resume';


// Pages
import ProjectsPage from './pages/ProjectsPage'; 
import AboutPage from './pages/AboutPage';


import TechStack from './components/ui/TechStack';


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
            <About />
            {/* <TechStack/> maybe??? */}
            <Projects /> 
              <Contact />
              <Resume />
            
              {/* <Options/> */}
            <Footer />
          </>
        } />
        {/* <PageTransition />    */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/work" element={<ProjectsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
    
// return (
//   <motion.div ref={ref} style={{ clipPath }}>
//     <img src="/photo.jpg" alt="Revealed image" />
//   </motion.div>
// ) 

// minor projects:  in projects page
// const containerRef = useRef(null)
// const { scrollYProgress } = useScroll({
//   target: containerRef,
//   offset: ["start start", "end end"]
// })

// const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"])

// return (
//   <div ref={containerRef} style={{ height: "300vh" }}>
//     <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
//       <motion.div style={{ x, display: "flex", gap: 20 }}>
//         {items.map(item => (
//           <div key={item.id} style={{ flexShrink: 0, width: 400 }}>
//             {item.content}
//           </div>
//         ))}
//       </motion.div>
//     </div>
//   </div>
// )
// TODO: Add a favicon
  );
}

export default App;