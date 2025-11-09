import { Container,Box,Heading  } from '@chakra-ui/react'
import Header from './components/Header'
import Hero  from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Resume from './components/Resume'
import InteractiveGridBackground from './components/Background'

function App() {
  return (
    <Container maxW="full" p={0} >

      <InteractiveGridBackground>
      <Header></Header>
      <Hero></Hero>
      <About></About>
      <Projects></Projects>
      <Contact></Contact>
      <Resume></Resume>

      </InteractiveGridBackground>
    </Container>
// TODO: 

  )
}

export default App
