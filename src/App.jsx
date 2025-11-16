// import Background from './components/Background''
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
import theme from '../theme'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
        <Routes>
          {/* Main portfolio page */}
          <Route path="/" element={
            <>
            {/* <Background> */}
     <DotGrid
    dotSize={5}
    gap={15}
    baseColor="#272727"
    activeColor="#14b8a6"
    proximity={85}
    shockRadius={250}
    shockStrength={5}
    resistance={750}
    returnDuration={1.5}
  /> 
              <Header/>
              <Hero />
              <About />
              <Skills/>
              <ContributionMap/>
              <Projects /> 
              <Contact />
              <Resume/>
              <Footer/>
             
              {/* </Background> */}
            </>
          } />

          {/* 404 page for all other routes */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>

// TODO: https://www.achyutkatiyar.com/ use this as a base s 
// TODO: work on learning and cerificates sections.
// TODO: WOrk on light and dark theme and stuff
// TODO: MotionBox is still shit 
// TODO: Add formspree so that the mails thing will actually work 
// TODO: Keyboard Shortcuts
// TODO: ISTG the colors for the light theme have to change esp for the dotgrid





  )
}

export default App
