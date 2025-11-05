// import { useState } from 'react'
// import './App.css'
// import { Button } from '@chakra-ui/react'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div style={{ padding: '2rem' }}>
//       <Button colorScheme="teal">Hello Chakra UI</Button>
//     </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App

import { Button } from '@chakra-ui/react'
import { Container,Box,Heading  } from '@chakra-ui/react'
import Hero  from './components/Hero'
import ProjectCarousel from './components/ProjectCarousel'

function App() {
  return (
    <Container maxW="full" p={0} >
      <Hero></Hero>
      <ProjectCarousel></ProjectCarousel>
    </Container>


  )
}

export default App
