import { Container,Box,Heading  } from '@chakra-ui/react'
import Header from './components/Header'
import Hero  from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
function App() {
  return (
    <Container maxW="full" p={0} >
      <Header></Header>
      <Hero></Hero>
      <About></About>
      <Projects></Projects>
      <Contact></Contact>
    </Container>
// TODO: 

  )
}

export default App
