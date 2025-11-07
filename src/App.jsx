import { Container,Box,Heading  } from '@chakra-ui/react'
import Hero  from './components/Hero'
import Projects from './components/Projects'
import Header from './components/Header'

function App() {
  return (
    <Container maxW="full" p={0} >
      <Header></Header>
      <Hero></Hero>
      <Projects></Projects>
    </Container>
// TODO: Properly use motion box for better ui/ux

  )
}

export default App
