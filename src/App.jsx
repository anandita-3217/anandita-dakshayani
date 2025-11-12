import { Container,Box,Heading  } from '@chakra-ui/react'
import Background from './components/Background'
import NotFound from './components/NotFound'
import Header from './components/Header'
import Hero  from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Resume from './components/Resume'
import Footer from './components/Footer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    // <Container maxW="full" p={0} >

    //   <NeonLinesBackground>
    //   <Header></Header>
    //   <Hero></Hero>
    //   <About></About>
    //   <Projects></Projects>
    //   <Contact></Contact>
    //   <Resume></Resume>
    // <NotFound></NotFound>
    //   </NeonLinesBackground>
    // </Container>
    <Router>
        <Routes>
          {/* Main portfolio page */}
          <Route path="/" element={
            <>
            <Background>
              <Header/>
              <Hero />
              <About />
              <Skills/>
              <Projects /> 
              <Contact />
              <Resume/>
              <Footer/>
              </Background>
            </>
          } />

          {/* 404 page for all other routes */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>

// TODO: https://www.achyutkatiyar.com/ use this as a base for nav bar and technical skills 
// TODO: work on learning and cerificates sections.
//  Need to work on better interactive backgrounds
// TODO: INSTEAD OF A CURSOR INTERACTIVE BACKGROUND HAVE A NORMAL BACKGROUND WITH MOTION
// TODO: IMPROVE THE CURSOR SO IT LEAVES A TRAIL OF PARTICLES


  )
}

export default App
