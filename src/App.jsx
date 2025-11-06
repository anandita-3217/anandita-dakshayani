import { Container,Box,Heading  } from '@chakra-ui/react'
import Hero  from './components/Hero'
import ProjectCarousel from './components/ProjectCarousel'
import Header from './components/Header'

function App() {
  return (
    <Container maxW="full" p={0} >
      <Header></Header>
      <Hero></Hero>
      <ProjectCarousel></ProjectCarousel>
    </Container>
// TODO: Properly use motion box for better ui/ux

  )
}

export default App
