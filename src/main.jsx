// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import React from 'react'
// import ReactDOM from 'react-dom/client'

// import './index.css'
// import { ChakraProvider } from '@chakra-ui/react'
// import App from './App.jsx'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <ChakraProvider>
//       <App />
//     </ChakraProvider>
//   </React.StrictMode>,
// )
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import App from './App.jsx'
import theme from '../theme.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
)

