import { Container,Box,Heading  } from '@chakra-ui/react'
import Header from './components/Header'
import Hero  from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Resume from './components/Resume'
import NeonLinesBackground from './components/Background'
import NotFound from './components/NotFound'

function App() {
  return (
    <Container maxW="full" p={0} >

      <NeonLinesBackground>
      <Header></Header>
      <Hero></Hero>
      <About></About>
      <Projects></Projects>
      <Contact></Contact>
      <Resume></Resume>
    <NotFound></NotFound>
      </NeonLinesBackground>
    </Container>
// TODO: added new assets and Notfound page. 
// TODO: work on learning and cerificates sections.
//  Need towork on how to inegrate the NotFound page and Look for better interactive backgrounds

  )
}

export default App
