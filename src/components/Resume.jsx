// import React, { useState, useEffect } from "react";
// // import { Container, Flex } from "react-bootstrap";
// // import Button from "react-bootstrap/Button";
// // import Particle from "../Particle";
// import {Container,Flex,Button} from '@chakra-ui/react';
// import pdf from "./assets/Anandita_Dakshayani_Garimella.pdf";
// import { AiOutlineDownload } from "react-icons/ai";
// import { Document, Page } from "react-pdf";
// // import "react-pdf/dist/esm/Page/AnnotationLayer.css";


// function Resume() {
//   const [width, setWidth] = useState(1200);

//   useEffect(() => {
//     setWidth(window.innerWidth);
//   }, []);

//   return (
//     <div>
//       <Container fluid className="resume-section">
        
//         <Flex style={{ justifyContent: "center", position: "relative" }}>
//           <Button
//             variant="primary"
//             href={pdf}
//             target="_blank"
//             style={{ maxWidth: "250px" }}
//           >
//             <AiOutlineDownload />
//             &nbsp;Download CV
//           </Button>
//         </Flex>

//         <Flex className="resume">
//           <Document file={pdf} className="d-flex justify-content-center">
//             <Page pageNumber={1} scale={width > 786 ? 1.7 : 0.6} />
//           </Document>
//         </Flex>

//         <Flex style={{ justifyContent: "center", position: "relative" }}>
//           <Button
//             variant="primary"
//             href={pdf}
//             target="_blank"
//             style={{ maxWidth: "250px" }}
//           >
//             <AiOutlineDownload />
//             &nbsp;Download CV
//           </Button>
//         </Flex>
//       </Container>
//     </div>
//   );
// }

// export default Resume;
import React from "react";
import { Container, Button, Box, VStack, Heading } from '@chakra-ui/react';
import pdf from "./assets/Anandita_Dakshayani_Garimella.pdf";
import { AiOutlineDownload } from "react-icons/ai";

function Resume() {
  return (
    <Box bg="#0a0a0a" minH="100vh" py={20} id="resume">
      <Container maxW="container.xl">
        <VStack spacing={8}>
          <Heading color="white" size="2xl">Resume</Heading>
          
          <Button
            as="a"
            href={pdf}
            download="Anandita_Dakshayani_Resume.pdf"
            bg="#14b8a6"
            color="white"
            size="lg"
            leftIcon={<AiOutlineDownload />}
            _hover={{
              bg: '#0d9488',
              transform: 'translateY(-2px)'
            }}
            transition="all 0.3s"
          >
            Download CV
          </Button>

          {/* Simple iframe - works everywhere */}
          <Box
            as="iframe"
            src={`${pdf}#toolbar=0`}
            width="100%"
            height="800px"
            border="none"
            borderRadius="lg"
            bg="white"
          />
        </VStack>
      </Container>
    </Box>
  );
}

export default Resume;