// import { useState, useEffect } from 'react';
// import {
//   Box, Text, VStack, HStack, Button, Grid,
//   Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton,
//   Flex, Input, Select, useDisclosure, Spinner,
//   Tabs, TabList, TabPanels, Tab, TabPanel,
//   useColorModeValue,
// } from '@chakra-ui/react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { ExternalLink, CheckCircle, Clock, ArrowUpRight, Search } from 'lucide-react';
// import { GraduationCap, DatabaseZap } from 'lucide-react';
// import { DiReact, DiJavascript1, DiNodejsSmall, DiPython, DiCode } from 'react-icons/di';
// import { BsGlobe } from 'react-icons/bs';
// import { FaChartBar, FaChartLine } from 'react-icons/fa';
// import { useInView } from 'react-intersection-observer';

// // ── Icons ─────────────────────────────────────────────────────────────────────
// const iconMap = { GraduationCap, DiReact, BsGlobe, DiJavascript1, DiNodejsSmall, DatabaseZap, DiPython, DiCode, FaChartLine, FaChartBar };
// const getIcon = (type, color) => { const C = iconMap[type]; return C ? <C color={color} size={22} /> : null; };


// const catMeta = {
//   degree:        { label: 'DEGREE', accent: '#a855f7' },
//   certification: { label: 'CERT',   accent: '#3b82f6' },
//   course:        { label: 'COURSE', accent: '#14b8a6'      },
// };

// // ─────────────────────────────────────────────────────────────────────────────
// // LEDGER ROW — grid/list view
// // ─────────────────────────────────────────────────────────────────────────────
// const LedgerRow = ({ cert, index, onViewDetails }) => {
//   const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });
//   const [hov, setHov] = useState(false);
//   const meta = catMeta[cert.category] || catMeta.course;

//   const borderCol = useColorModeValue('rgba(0,0,0,0.09)',  'rgba(255,255,255,0.07)');
//   const rowBg     = useColorModeValue(hov ? '#f0f0f2' : 'transparent', hov ? 'rgba(255,255,255,0.035)' : 'transparent');
//   const numColor  = useColorModeValue('rgba(0,0,0,0.13)', 'rgba(255,255,255,0.07)');
//   const titleCol  = useColorModeValue('gray.800',          'rgba(255,255,255,0.88)');
//   const metaCol   = useColorModeValue('gray.400',          'rgba(255,255,255,0.35)');
//   const tagBg     = useColorModeValue('rgba(0,0,0,0.04)',  'rgba(255,255,255,0.04)');
//   const tagBorder = useColorModeValue('rgba(0,0,0,0.08)',  'rgba(255,255,255,0.07)');

//   return (
//     <motion.div
//       ref={ref}
//       initial={{ opacity: 0, x: -10 }}
//       animate={inView ? { opacity: 1, x: 0 } : {}}
//       transition={{ duration: 0.36, delay: Math.min(index * 0.05, 0.4), ease: 'easeOut' }}
//     >
//       <Box
//         position="relative"
//         borderBottom="1px solid" borderColor={borderCol}
//         bg={rowBg} px={4} py={4}
//         cursor="pointer" transition="background 0.18s"
//         onMouseEnter={() => setHov(true)}
//         onMouseLeave={() => setHov(false)}
//         onClick={() => onViewDetails(cert)}
//         _first={{ borderTop: '1px solid', borderTopColor: borderCol }}
//       >
//         {/* Left accent bar */}
//         <Box position="absolute" left={0} top={0} bottom={0} w="2px" bg={meta.accent}
//           transform={hov ? 'scaleY(1)' : 'scaleY(0)'} transformOrigin="top" transition="transform 0.22s ease" />

//         <Grid templateColumns="32px 1fr auto" gap={4} alignItems="center">
//           {/* Row number */}
//           <Text fontFamily="monospace" fontSize="10px" color={numColor} textAlign="right" userSelect="none">
//             {String(index + 1).padStart(2, '0')}
//           </Text>

//           <Box minW={0}>
//             <HStack spacing={3} mb={1}>
//               <Text fontFamily="monospace" fontSize="8px" letterSpacing="0.22em" color={meta.accent}>
//                 [{meta.label}]
//               </Text>
//               <Text fontFamily="monospace" fontSize="9px" color={metaCol}>{cert.dateEarned}</Text>
//               <HStack spacing={1} color={metaCol}>
//                 <Clock size={9} />
//                 <Text fontFamily="monospace" fontSize="9px">{cert.duration}</Text>
//               </HStack>
//             </HStack>

//             <Text fontFamily="Orbitron" fontSize="12px" fontWeight="700" color={titleCol}
//               noOfLines={1} letterSpacing="0.01em" mb={0.5}>{cert.title}</Text>

//             <Text fontFamily="Sora" fontSize="11px" color={meta.accent} fontWeight="600" noOfLines={1} mb={2}>
//               {cert.institution}
//             </Text>

//             <Flex flexWrap="wrap" gap={1}>
//               {cert.skills.slice(0, 4).map((s, i) => (
//                 <Box key={i} px={2} py={0.5} borderRadius="3px" bg={tagBg} border="1px solid" borderColor={tagBorder}>
//                   <Text fontFamily="monospace" fontSize="8px" color={metaCol} letterSpacing="0.03em">{s}</Text>
//                 </Box>
//               ))}
//               {cert.skills.length > 4 && (
//                 <Box px={2} py={0.5} borderRadius="3px" bg={tagBg} border="1px solid" borderColor={tagBorder}>
//                   <Text fontFamily="monospace" fontSize="8px" color={metaCol}>+{cert.skills.length - 4}</Text>
//                 </Box>
//               )}
//             </Flex>
//           </Box>

//           {/* Arrow */}
//           <Box color={meta.accent} opacity={hov ? 1 : 0}
//             transform={hov ? 'translate(0,0)' : 'translate(-5px,5px)'}
//             transition="all 0.2s ease" flexShrink={0}>
//             <ArrowUpRight size={15} />
//           </Box>
//         </Grid>
//       </Box>
//     </motion.div>
//   );
// };

// // ─────────────────────────────────────────────────────────────────────────────
// // TIMELINE ENTRY
// // ─────────────────────────────────────────────────────────────────────────────
// const TimelineEntry = ({ cert, index, onViewDetails }) => {
//   const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });
//   const [hov, setHov] = useState(false);
//   const meta    = catMeta[cert.category] || catMeta.course;
//   const isLeft  = index % 2 === 0;

//   const lineCol   = useColorModeValue('rgba(0,0,0,0.09)',  'rgba(255,255,255,0.08)');
//   const cardBg    = useColorModeValue(hov ? '#fff' : 'rgba(0,0,0,0.02)', hov ? 'rgba(255,255,255,0.045)' : 'rgba(255,255,255,0.018)');
//   const cardBord  = useColorModeValue(hov ? `${meta.accent}50` : 'rgba(0,0,0,0.08)', hov ? `${meta.accent}40` : 'rgba(255,255,255,0.06)');
//   const titleCol  = useColorModeValue('gray.800',          'rgba(255,255,255,0.88)');
//   const metaCol   = useColorModeValue('gray.400',          'rgba(255,255,255,0.35)');
//   const tagBg     = useColorModeValue('rgba(0,0,0,0.04)',  'rgba(255,255,255,0.04)');
//   const tagBorder = useColorModeValue('rgba(0,0,0,0.08)',  'rgba(255,255,255,0.06)');

//   const Card = () => (
//     <Box
//       bg={cardBg} border="1px solid" borderColor={cardBord} borderRadius="12px" p={4}
//       cursor="pointer" transition="all 0.22s"
//       onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
//       onClick={() => onViewDetails(cert)}
//       boxShadow={hov ? `0 6px 24px ${meta.accent}14` : 'none'}
//     >
//       <HStack justify="space-between" align="start" mb={2}>
//         <HStack spacing={2}>
//           <Box color={meta.accent} opacity={0.8}>{cert.logo}</Box>
//           <VStack align="start" spacing={0}>
//             <HStack spacing={2}>
//               <Text fontFamily="monospace" fontSize="8px" letterSpacing="0.2em" color={meta.accent}>[{meta.label}]</Text>
//               <Text fontFamily="monospace" fontSize="9px" color={metaCol}>{cert.dateEarned}</Text>
//             </HStack>
//             <Text fontFamily="Orbitron" fontSize="11.5px" fontWeight="700" color={titleCol}
//               letterSpacing="0.01em" noOfLines={2}>{cert.title}</Text>
//           </VStack>
//         </HStack>
//         <Box color={meta.accent} opacity={hov ? 1 : 0.25} transition="opacity 0.2s" flexShrink={0} mt={0.5}>
//           <ArrowUpRight size={13} />
//         </Box>
//       </HStack>

//       <Text fontFamily="Sora" fontSize="11px" color={meta.accent} fontWeight="600" mb={1}>{cert.institution}</Text>

//       <HStack spacing={3} color={metaCol} mb={2}>
//         <HStack spacing={1}><Clock size={9}/><Text fontFamily="monospace" fontSize="9px">{cert.duration}</Text></HStack>
//         {cert.grade && <Text fontFamily="monospace" fontSize="9px">{cert.grade}</Text>}
//       </HStack>

//       <Flex flexWrap="wrap" gap={1}>
//         {cert.skills.slice(0, 3).map((s, i) => (
//           <Box key={i} px={1.5} py={0.5} borderRadius="3px" bg={tagBg} border="1px solid" borderColor={tagBorder}>
//             <Text fontFamily="monospace" fontSize="8px" color={metaCol}>{s}</Text>
//           </Box>
//         ))}
//         {cert.skills.length > 3 && (
//           <Box px={1.5} py={0.5} borderRadius="3px" bg={tagBg} border="1px solid" borderColor={tagBorder}>
//             <Text fontFamily="monospace" fontSize="8px" color={metaCol}>+{cert.skills.length - 3}</Text>
//           </Box>
//         )}
//       </Flex>
//     </Box>
//   );

//   return (
//     <motion.div ref={ref}
//       initial={{ opacity: 0, y: 16 }}
//       animate={inView ? { opacity: 1, y: 0 } : {}}
//       transition={{ duration: 0.4, delay: Math.min(index * 0.06, 0.45) }}>
//       <Grid templateColumns={{ base: '1fr', md: '1fr 40px 1fr' }} gap={0} alignItems="start" mb={4}>
//         {/* Left slot */}
//         <Box display={{ base: 'none', md: 'block' }} pr={5} pt={2}>
//           {isLeft && <Card />}
//         </Box>
//         {/* Spine */}
//         <Box display={{ base: 'none', md: 'flex' }} flexDir="column" alignItems="center">
//           <Box w="1px" h="10px" bg={lineCol} />
//           <Box w="9px" h="9px" borderRadius="full" border="2px solid" borderColor={meta.accent}
//             bg={hov ? meta.accent : 'transparent'} transition="background 0.2s" flexShrink={0} />
//           <Box w="1px" flex={1} bg={lineCol} minH="32px" />
//         </Box>
//         {/* Right slot */}
//         <Box pl={{ base: 0, md: 5 }} pt={{ base: 0, md: 2 }}>
//           <Box display={{ base: 'block', md: isLeft ? 'none' : 'block' }}>
//             <Card />
//           </Box>
//         </Box>
//       </Grid>
//     </motion.div>
//   );
// };

// // ─────────────────────────────────────────────────────────────────────────────
// // DETAIL MODAL
// // ─────────────────────────────────────────────────────────────────────────────
// const CertificateDetailModal = ({ isOpen, onClose, cert }) => {
//   const [showPdf, setShowPdf] = useState(false);
//   if (!cert) return null;
//   const hasPdf = cert.certificatePdfUrl?.toLowerCase().endsWith('.pdf');
//   const meta   = catMeta[cert.category] || catMeta.course;

//   const modalBg      = useColorModeValue('#f9f9fb',                   'rgba(8,8,8,0.97)');
//   const modalBorder  = useColorModeValue('rgba(0,0,0,0.09)',          'rgba(255,255,255,0.08)');
//   const headerBorder = useColorModeValue('rgba(0,0,0,0.06)',          'rgba(255,255,255,0.06)');
//   const titleCol     = useColorModeValue('gray.800',                  'rgba(255,255,255,0.92)');
//   const fieldBg      = useColorModeValue('rgba(0,0,0,0.025)',         'rgba(255,255,255,0.025)');
//   const fieldBorder  = useColorModeValue('rgba(0,0,0,0.08)',          'rgba(255,255,255,0.06)');
//   const monoCol      = useColorModeValue('gray.500',                  'rgba(255,255,255,0.42)');

//   return (
//     <Modal isOpen={isOpen} onClose={onClose} size={hasPdf && showPdf ? '6xl' : 'xl'} isCentered>
//       <ModalOverlay bg="rgba(0,0,0,0.72)" backdropFilter="blur(14px)" />
//       <ModalContent
//         maxW={hasPdf && showPdf ? '90vw' : '600px'}
//         maxH={hasPdf && showPdf ? '90vh' : 'auto'}
//         bg={modalBg} border="1px solid" borderColor={modalBorder}
//         borderRadius="16px" mx={4} boxShadow="0 40px 80px rgba(0,0,0,0.5)" overflow="hidden">

//         {/* Accent top stripe */}
//         <Box h="2px" style={{ background: `linear-gradient(to right, ${meta.accent}, ${meta.accent}33, transparent)` }} />

//         <ModalHeader borderBottom="1px solid" borderColor={headerBorder} pb={4} pt={5}>
//           <HStack justify="space-between" align="start">
//             <HStack spacing={3} flex={1} minW={0}>
//               <Box color={meta.accent} flexShrink={0}>{cert.logo}</Box>
//               <VStack align="start" spacing={0.5} minW={0}>
//                 <HStack spacing={2}>
//                   <Text fontFamily="monospace" fontSize="8px" letterSpacing="0.22em" color={meta.accent}>[{meta.label}]</Text>
//                   <Text fontFamily="monospace" fontSize="9px" color={monoCol}>{cert.dateEarned}</Text>
//                 </HStack>
//                 <Text fontFamily="Orbitron" fontSize="13px" fontWeight="700" color={titleCol} noOfLines={2}>{cert.title}</Text>
//                 <Text fontFamily="Sora" fontSize="12px" color={meta.accent} fontWeight="600">{cert.subtitle}</Text>
//               </VStack>
//             </HStack>
//             {hasPdf && (
//               <Button size="xs" fontFamily="monospace" fontSize="8px" letterSpacing="0.15em" px={3} flexShrink={0}
//                 bg={showPdf ? `${meta.accent}12` : 'transparent'} color={showPdf ? meta.accent : monoCol}
//                 border="1px solid" borderColor={showPdf ? `${meta.accent}35` : fieldBorder}
//                 _hover={{ borderColor: meta.accent, color: meta.accent }}
//                 onClick={() => setShowPdf(!showPdf)}>
//                 {showPdf ? 'DETAILS' : 'PDF'}
//               </Button>
//             )}
//           </HStack>
//         </ModalHeader>

//         <ModalCloseButton color={monoCol} _hover={{ color: titleCol, bg: fieldBg }} borderRadius="8px" top={4} right={4} />

//         <ModalBody py={5} overflow={hasPdf && showPdf ? 'hidden' : 'auto'}>
//           {hasPdf && showPdf ? (
//             <Box w="100%" h="calc(90vh - 130px)" borderRadius="8px" overflow="hidden"
//               border="1px solid" borderColor={fieldBorder}>
//               <iframe src={cert.certificatePdfUrl} width="100%" height="100%" style={{ border: 'none' }} title={cert.title} />
//             </Box>
//           ) : (
//             <VStack align="stretch" spacing={4}>
//               <Grid templateColumns="repeat(2,1fr)" gap={2.5}>
//                 {[['Institution', cert.institution], ['Date Earned', cert.dateEarned],
//                   ['Duration', cert.duration], ...(cert.grade ? [['Grade', cert.grade]] : [])
//                 ].map(([label, value]) => (
//                   <Box key={label} bg={fieldBg} border="1px solid" borderColor={fieldBorder} borderRadius="8px" p={3}>
//                     <Text fontFamily="monospace" fontSize="8px" letterSpacing="0.22em" textTransform="uppercase" color={monoCol} mb={1}>{label}</Text>
//                     <Text fontFamily="Sora" fontSize="13px" fontWeight="600" color={titleCol}>{value}</Text>
//                   </Box>
//                 ))}
//               </Grid>

//               <Box bg={fieldBg} border="1px solid" borderColor={fieldBorder} borderRadius="8px" p={3}>
//                 <Text fontFamily="monospace" fontSize="8px" letterSpacing="0.22em" textTransform="uppercase" color={monoCol} mb={1}>Credential ID</Text>
//                 <Text fontFamily="monospace" fontSize="11px" color={monoCol} letterSpacing="0.05em">{cert.credentialId}</Text>
//               </Box>

//               <Box>
//                 <Text fontFamily="monospace" fontSize="8px" letterSpacing="0.22em" textTransform="uppercase" color={monoCol} mb={2}>Skills Acquired</Text>
//                 <Flex flexWrap="wrap" gap={1.5}>
//                   {cert.skills.map((s, i) => (
//                     <Box key={i} px={2.5} py={1} borderRadius="4px"
//                       bg={`${meta.accent}0e`} border="1px solid" borderColor={`${meta.accent}28`}>
//                       <Text fontFamily="monospace" fontSize="10px" color={meta.accent} letterSpacing="0.04em">{s}</Text>
//                     </Box>
//                   ))}
//                 </Flex>
//               </Box>

//               <VStack spacing={2} pt={1}>
//                 {(hasPdf || cert.certificateUrl) && (
//                   <Button as="a" href={hasPdf ? cert.certificatePdfUrl : cert.certificateUrl}
//                     target="_blank" download={hasPdf}
//                     leftIcon={<ExternalLink size={12} />} w="full"
//                     fontFamily="monospace" fontSize="9px" letterSpacing="0.18em" textTransform="uppercase"
//                     bg={`${meta.accent}10`} color={meta.accent}
//                     border="1px solid" borderColor={`${meta.accent}28`}
//                     _hover={{ bg: `${meta.accent}1e`, transform: 'translateY(-1px)' }} transition="all 0.18s">
//                     {hasPdf ? 'Download Certificate' : 'View Certificate'}
//                   </Button>
//                 )}
//                 {cert.verificationUrl && (
//                   <Button as="a" href={cert.verificationUrl} target="_blank"
//                     leftIcon={<CheckCircle size={11} />} variant="ghost" w="full"
//                     fontFamily="monospace" fontSize="9px" letterSpacing="0.15em" textTransform="uppercase"
//                     color={monoCol} _hover={{ color: '#14b8a6', bg: `$"14b8a6"08` }}>
//                     Verify on {cert.institution}
//                   </Button>
//                 )}
//               </VStack>
//             </VStack>
//           )}
//         </ModalBody>
//       </ModalContent>
//     </Modal>
//   );
// };

// // ─────────────────────────────────────────────────────────────────────────────
// // MAIN COMPONENT
// // ─────────────────────────────────────────────────────────────────────────────
// export default function Certificates() {
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [selectedCert, setSelectedCert]         = useState(null);
//   const [searchQuery, setSearchQuery]           = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [certificatesData, setCertificatesData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError]     = useState(null);

//   // Semantic tokens
//   const ruleBorder   = useColorModeValue('rgba(0,0,0,0.09)',  'rgba(255,255,255,0.07)');
//   const subColor     = useColorModeValue('gray.500',           'rgba(255,255,255,0.38)');
//   const titleColor   = useColorModeValue('gray.800',           'rgba(255,255,255,0.92)');
//   const inputBg      = useColorModeValue('rgba(0,0,0,0.03)',   'rgba(255,255,255,0.03)');
//   const inputBorder  = useColorModeValue('rgba(0,0,0,0.09)',   'rgba(255,255,255,0.07)');
//   const tabColor     = useColorModeValue('gray.400',           'rgba(255,255,255,0.35)');
//   const tabSel       = useColorModeValue('gray.700',           'rgba(255,255,255,0.88)');
//   const emptyColor   = useColorModeValue('gray.400',           'rgba(255,255,255,0.28)');
//   const eyebrowColor = useColorModeValue('gray.500',           'whiteAlpha.400');
//   const inputFocus   = { borderColor: '#14b8a6', boxShadow: `0 0 0 1px $"14b8a6"` };

//   useEffect(() => {
//     (async () => {
//       try {
//         setLoading(true);
//         const res  = await fetch('/certificates.json');
//         if (!res.ok) throw new Error('Failed to load certificates');
//         const data = await res.json();
//         setCertificatesData(data.map(c => ({ ...c, logo: getIcon(c.logoType, c.logoColor) })));
//       } catch (err) { setError(err.message); }
//       finally { setLoading(false); }
//     })();
//   }, []);

//   const handleViewDetails = cert => { setSelectedCert(cert); onOpen(); };

//   const filteredCerts = certificatesData
//     .filter(c => {
//       const q = searchQuery.toLowerCase();
//       return (c.title.toLowerCase().includes(q) || c.institution.toLowerCase().includes(q) || c.skills.some(s => s.toLowerCase().includes(q)))
//         && (selectedCategory === 'all' || c.category === selectedCategory);
//     })
//     .sort((a, b) => {
//       const o = { degree: 1, course: 2, certification: 3 };
//       const d = o[a.category] - o[b.category];
//       if (d) return d;
//       const yr = s => { const m = s.match(/\d{4}/); return m ? +m[0] : 0; };
//       return yr(b.dateEarned) - yr(a.dateEarned);
//     });

//   const stats = {
//     total:   certificatesData.length,
//     degrees: certificatesData.filter(c => c.category === 'degree').length,
//     courses: certificatesData.filter(c => c.category === 'course').length,
//   };

//   if (loading) return (
//     <Box py={24} textAlign="center">
//       <Spinner size="md" color="14b8a6" thickness="1px" />
//       <Text mt={4} fontFamily="monospace" fontSize="10px" letterSpacing="0.2em" color={subColor}>
//         loading records...
//       </Text>
//     </Box>
//   );

//   if (error) return (
//     <Box py={24} textAlign="center">
//       <Text fontFamily="monospace" fontSize="9px" letterSpacing="0.2em" color="red.400" mb={2}>ERR // LOAD_FAILED</Text>
//       <Text fontFamily="Sora" fontSize="13px" color={subColor} mb={5}>{error}</Text>
//       <Button onClick={() => window.location.reload()} fontFamily="monospace" fontSize="9px" letterSpacing="0.2em"
//         bg="transparent" color="red.400" border="1px solid rgba(239,68,68,0.3)"
//         _hover={{ bg: 'rgba(239,68,68,0.08)' }}>RETRY</Button>
//     </Box>
//   );

//   return (
//     <Box bg="transparent" py={{ base: 4, md: 6 }} position="relative" maxW="1100px" mx="auto">

//       {/* ── Header — plain motion.div, no inView dependency ─────────── */}
//       <motion.div
//         initial={{ opacity: 0, y: 24 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.55 }}
//       >
//         {/* Eyebrow */}
//         <HStack spacing={3} mb={3}>
//           <Box w="24px" h="1px"
//             style={{ background: 'linear-gradient(to right, #ec4899, #7c3aed)' }} />
//           <Text fontFamily="Orbitron" fontSize="9px" letterSpacing="0.3em"
//             textTransform="uppercase" color={eyebrowColor}>
//             Credentials
//           </Text>
//         </HStack>
//         <Text
//           fontFamily="Orbitron" fontWeight="900" fontSize={{ base: '26px', md: '40px' }}
//           letterSpacing="-0.02em" lineHeight={1.05}
//           bgGradient="linear(to-r, #1e40af, #7c3aed, #ec4899)"
//           bgClip="text" display="inline-block" w="fit-content"
//         >
//           Credentials
//         </Text>
//         <Text
//           fontFamily="Orbitron" fontWeight="900" fontSize={{ base: '26px', md: '40px' }}
//           letterSpacing="-0.02em" lineHeight={1.05}
//           color="text.subdued" mb={10}
//         >
//           &amp; Achievements
//         </Text>
//       </motion.div>

//       {/* ── Search + Filter ─────────────────────────────────────────── */}
//       <motion.div
//         initial={{ opacity: 0, y: 8 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.35, duration: 0.38 }}
//       >
//         <HStack spacing={3} mb={8} flexWrap="wrap">
//           <Box flex={1} minW="200px" position="relative">
//             <Box position="absolute" left={3} top="50%" transform="translateY(-50%)"
//               color={subColor} pointerEvents="none" zIndex={1}>
//               <Search size={13} />
//             </Box>
//             <Input pl={9} placeholder="Search credentials, skills, institutions..."
//               value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
//               size="md" bg={inputBg} border="1px solid" borderColor={inputBorder}
//               color={titleColor} fontFamily="monospace" fontSize="12px" borderRadius="8px"
//               _placeholder={{ color: subColor, fontFamily: "monospace" }}
//               _hover={{ borderColor: 'rgba(255,255,255,0.13)' }}
//               _focus={inputFocus} />
//           </Box>
//           <Select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}
//             w={{ base: '100%', md: '150px' }} size="md"
//             bg={inputBg} border="1px solid" borderColor={inputBorder}
//             color={titleColor} fontFamily="monospace" fontSize="11px" borderRadius="8px"
//             _focus={inputFocus}>
//             <option value="all">ALL</option>
//             <option value="degree">DEGREES</option>
//             <option value="certification">CERTS</option>
//             <option value="course">COURSES</option>
//           </Select>
//         </HStack>
//       </motion.div>

//       {/* ── Tabs ────────────────────────────────────────────────────── */}
//       <Tabs variant="unstyled">
//         <TabList mb={6} gap={6} borderBottom="1px solid" borderColor={ruleBorder} pb={3}>
//           {['Grid View', 'Timeline View'].map(label => (
//             <Tab key={label}
//               fontFamily="monospace" fontSize="9px" letterSpacing="0.22em" textTransform="uppercase"
//               color={tabColor} pb={3} px={0} position="relative" transition="color 0.18s"
//               _selected={{ color: tabSel }}
//               sx={{
//                 '&[aria-selected=true]::after': {
//                   content: '""', position: 'absolute', bottom: '-12px', left: 0, right: 0,
//                   height: '2px', background: 'linear-gradient(135deg, #1e40af, #7c3aed, #ec4899)',
//                 }
//               }}>
//               {label}
//             </Tab>
//           ))}
//           <Box ml="auto" display="flex" alignItems="center">
//             <Text fontFamily="monospace" fontSize="12px" color='rgba(20,184,166,0.7)' letterSpacing="0.15em">
//               {String(filteredCerts.length).padStart(2, '0')} records
//             </Text>
//           </Box>
//         </TabList>

//         <TabPanels>
//           {/* Ledger list */}
//           <TabPanel px={0} pt={0}>
//             <AnimatePresence mode="popLayout">
//               <VStack spacing={0} align="stretch">
//                 {filteredCerts.map((cert, i) => (
//                   <LedgerRow key={cert.id} cert={cert} index={i} onViewDetails={handleViewDetails} />
//                 ))}
//               </VStack>
//             </AnimatePresence>
//           </TabPanel>

//           {/* Timeline */}
//           <TabPanel px={0} pt={2}>
//             <VStack spacing={0} align="stretch" maxW="860px" mx="auto">
//               {filteredCerts.map((cert, i) => (
//                 <TimelineEntry key={cert.id} cert={cert} index={i} onViewDetails={handleViewDetails} />
//               ))}
//             </VStack>
//           </TabPanel>
//         </TabPanels>
//       </Tabs>

//       {filteredCerts.length === 0 && (
//         <Box textAlign="center" py={14} borderTop="1px solid" borderColor={ruleBorder}>
//           <Text fontFamily="monospace" fontSize="10px" letterSpacing="0.22em" color={emptyColor}>
//             NO RECORDS FOUND
//           </Text>
//         </Box>
//       )}

//       <CertificateDetailModal isOpen={isOpen} onClose={onClose} cert={selectedCert} />
//     </Box>
//   );
// }

import { useState, useEffect } from 'react';
import {
  Box, Text, VStack, HStack, Button, Grid,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton,
  Flex, Input, Select, useDisclosure, Spinner,
  Tabs, TabList, TabPanels, Tab, TabPanel,
  useColorModeValue,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, CheckCircle, Clock, ArrowUpRight, Search } from 'lucide-react';
import { GraduationCap, DatabaseZap } from 'lucide-react';
import { DiReact, DiJavascript1, DiNodejsSmall, DiPython, DiCode } from 'react-icons/di';
import { BsGlobe } from 'react-icons/bs';
import { FaChartBar, FaChartLine } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';

// ── Icons ─────────────────────────────────────────────────────────────────────
const iconMap = { GraduationCap, DiReact, BsGlobe, DiJavascript1, DiNodejsSmall, DatabaseZap, DiPython, DiCode, FaChartLine, FaChartBar };
const getIcon = (type, color) => { const C = iconMap[type]; return C ? <C color={color} size={22} /> : null; };

const catMeta = {
  degree:        { label: 'DEGREE', accent: '#a855f7' },
  certification: { label: 'CERT',   accent: '#3b82f6' },
  course:        { label: 'COURSE', accent: '#14b8a6' },
};

// ─────────────────────────────────────────────────────────────────────────────
// LEDGER ROW
// ─────────────────────────────────────────────────────────────────────────────
const LedgerRow = ({ cert, index, onViewDetails }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });
  const [hov, setHov] = useState(false);
  const meta = catMeta[cert.category] || catMeta.course;

  const borderCol = useColorModeValue('rgba(0,0,0,0.09)',  'rgba(255,255,255,0.07)');
  const rowBg     = useColorModeValue(hov ? '#f0f0f2' : 'transparent', hov ? 'rgba(255,255,255,0.035)' : 'transparent');
  const numColor  = useColorModeValue('rgba(0,0,0,0.13)', 'rgba(255,255,255,0.07)');
  const titleCol  = useColorModeValue('gray.800',          'rgba(255,255,255,0.88)');
  const metaCol   = useColorModeValue('gray.400',          'rgba(255,255,255,0.35)');
  const tagBg     = useColorModeValue('rgba(0,0,0,0.04)',  'rgba(255,255,255,0.04)');
  const tagBorder = useColorModeValue('rgba(0,0,0,0.08)',  'rgba(255,255,255,0.07)');

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -10 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.36, delay: Math.min(index * 0.05, 0.4), ease: 'easeOut' }}
    >
      <Box
        position="relative"
        borderBottom="1px solid" borderColor={borderCol}
        bg={rowBg} px={4} py={4}
        cursor="pointer" transition="background 0.18s"
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        onClick={() => onViewDetails(cert)}
        _first={{ borderTop: '1px solid', borderTopColor: borderCol }}
      >
        <Box position="absolute" left={0} top={0} bottom={0} w="2px" bg={meta.accent}
          transform={hov ? 'scaleY(1)' : 'scaleY(0)'} transformOrigin="top" transition="transform 0.22s ease" />
        <Grid templateColumns="32px 1fr auto" gap={4} alignItems="center">
          <Text fontFamily="monospace" fontSize="10px" color={numColor} textAlign="right" userSelect="none">
            {String(index + 1).padStart(2, '0')}
          </Text>
          <Box minW={0}>
            <HStack spacing={3} mb={1}>
              <Text fontFamily="monospace" fontSize="8px" letterSpacing="0.22em" color={meta.accent}>
                [{meta.label}]
              </Text>
              <Text fontFamily="monospace" fontSize="9px" color={metaCol}>{cert.dateEarned}</Text>
              <HStack spacing={1} color={metaCol}>
                <Clock size={9} />
                <Text fontFamily="monospace" fontSize="9px">{cert.duration}</Text>
              </HStack>
            </HStack>
            <Text fontFamily="Orbitron" fontSize="12px" fontWeight="700" color={titleCol}
              noOfLines={1} letterSpacing="0.01em" mb={0.5}>{cert.title}</Text>
            <Text fontFamily="Sora" fontSize="11px" color={meta.accent} fontWeight="600" noOfLines={1} mb={2}>
              {cert.institution}
            </Text>
            <Flex flexWrap="wrap" gap={1}>
              {cert.skills.slice(0, 4).map((s, i) => (
                <Box key={i} px={2} py={0.5} borderRadius="3px" bg={tagBg} border="1px solid" borderColor={tagBorder}>
                  <Text fontFamily="monospace" fontSize="8px" color={metaCol} letterSpacing="0.03em">{s}</Text>
                </Box>
              ))}
              {cert.skills.length > 4 && (
                <Box px={2} py={0.5} borderRadius="3px" bg={tagBg} border="1px solid" borderColor={tagBorder}>
                  <Text fontFamily="monospace" fontSize="8px" color={metaCol}>+{cert.skills.length - 4}</Text>
                </Box>
              )}
            </Flex>
          </Box>
          <Box color={meta.accent} opacity={hov ? 1 : 0}
            transform={hov ? 'translate(0,0)' : 'translate(-5px,5px)'}
            transition="all 0.2s ease" flexShrink={0}>
            <ArrowUpRight size={15} />
          </Box>
        </Grid>
      </Box>
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// TIMELINE ENTRY
// ─────────────────────────────────────────────────────────────────────────────
const TimelineEntry = ({ cert, index, onViewDetails }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });
  const [hov, setHov] = useState(false);
  const meta   = catMeta[cert.category] || catMeta.course;
  const isLeft = index % 2 === 0;

  const lineCol   = useColorModeValue('rgba(0,0,0,0.09)',  'rgba(255,255,255,0.08)');
  const cardBg    = useColorModeValue(hov ? '#fff' : 'rgba(0,0,0,0.02)', hov ? 'rgba(255,255,255,0.045)' : 'rgba(255,255,255,0.018)');
  const cardBord  = useColorModeValue(hov ? `${meta.accent}50` : 'rgba(0,0,0,0.08)', hov ? `${meta.accent}40` : 'rgba(255,255,255,0.06)');
  const titleCol  = useColorModeValue('gray.800',          'rgba(255,255,255,0.88)');
  const metaCol   = useColorModeValue('gray.400',          'rgba(255,255,255,0.35)');
  const tagBg     = useColorModeValue('rgba(0,0,0,0.04)',  'rgba(255,255,255,0.04)');
  const tagBorder = useColorModeValue('rgba(0,0,0,0.08)',  'rgba(255,255,255,0.06)');

  const Card = () => (
    <Box
      bg={cardBg} border="1px solid" borderColor={cardBord} borderRadius="12px" p={4}
      cursor="pointer" transition="all 0.22s"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      onClick={() => onViewDetails(cert)}
      boxShadow={hov ? `0 6px 24px ${meta.accent}14` : 'none'}
    >
      <HStack justify="space-between" align="start" mb={2}>
        <HStack spacing={2}>
          <Box color={meta.accent} opacity={0.8}>{cert.logo}</Box>
          <VStack align="start" spacing={0}>
            <HStack spacing={2}>
              <Text fontFamily="monospace" fontSize="8px" letterSpacing="0.2em" color={meta.accent}>[{meta.label}]</Text>
              <Text fontFamily="monospace" fontSize="9px" color={metaCol}>{cert.dateEarned}</Text>
            </HStack>
            <Text fontFamily="Orbitron" fontSize="11.5px" fontWeight="700" color={titleCol}
              letterSpacing="0.01em" noOfLines={2}>{cert.title}</Text>
          </VStack>
        </HStack>
        <Box color={meta.accent} opacity={hov ? 1 : 0.25} transition="opacity 0.2s" flexShrink={0} mt={0.5}>
          <ArrowUpRight size={13} />
        </Box>
      </HStack>
      <Text fontFamily="Sora" fontSize="11px" color={meta.accent} fontWeight="600" mb={1}>{cert.institution}</Text>
      <HStack spacing={3} color={metaCol} mb={2}>
        <HStack spacing={1}><Clock size={9}/><Text fontFamily="monospace" fontSize="9px">{cert.duration}</Text></HStack>
        {cert.grade && <Text fontFamily="monospace" fontSize="9px">{cert.grade}</Text>}
      </HStack>
      <Flex flexWrap="wrap" gap={1}>
        {cert.skills.slice(0, 3).map((s, i) => (
          <Box key={i} px={1.5} py={0.5} borderRadius="3px" bg={tagBg} border="1px solid" borderColor={tagBorder}>
            <Text fontFamily="monospace" fontSize="8px" color={metaCol}>{s}</Text>
          </Box>
        ))}
        {cert.skills.length > 3 && (
          <Box px={1.5} py={0.5} borderRadius="3px" bg={tagBg} border="1px solid" borderColor={tagBorder}>
            <Text fontFamily="monospace" fontSize="8px" color={metaCol}>+{cert.skills.length - 3}</Text>
          </Box>
        )}
      </Flex>
    </Box>
  );

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: Math.min(index * 0.06, 0.45) }}>
      <Grid templateColumns={{ base: '1fr', md: '1fr 40px 1fr' }} gap={0} alignItems="start" mb={4}>
        <Box display={{ base: 'none', md: 'block' }} pr={5} pt={2}>
          {isLeft && <Card />}
        </Box>
        <Box display={{ base: 'none', md: 'flex' }} flexDir="column" alignItems="center">
          <Box w="1px" h="10px" bg={lineCol} />
          <Box w="9px" h="9px" borderRadius="full" border="2px solid" borderColor={meta.accent}
            bg={hov ? meta.accent : 'transparent'} transition="background 0.2s" flexShrink={0} />
          <Box w="1px" flex={1} bg={lineCol} minH="32px" />
        </Box>
        <Box pl={{ base: 0, md: 5 }} pt={{ base: 0, md: 2 }}>
          <Box display={{ base: 'block', md: isLeft ? 'none' : 'block' }}>
            <Card />
          </Box>
        </Box>
      </Grid>
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// DETAIL MODAL
// ─────────────────────────────────────────────────────────────────────────────
const CertificateDetailModal = ({ isOpen, onClose, cert }) => {
  const [showPdf, setShowPdf] = useState(false);
  if (!cert) return null;
  const hasPdf = cert.certificatePdfUrl?.toLowerCase().endsWith('.pdf');
  const meta   = catMeta[cert.category] || catMeta.course;

  const modalBg      = useColorModeValue('#f9f9fb',                   'rgba(8,8,8,0.97)');
  const modalBorder  = useColorModeValue('rgba(0,0,0,0.09)',          'rgba(255,255,255,0.08)');
  const headerBorder = useColorModeValue('rgba(0,0,0,0.06)',          'rgba(255,255,255,0.06)');
  const titleCol     = useColorModeValue('gray.800',                  'rgba(255,255,255,0.92)');
  const fieldBg      = useColorModeValue('rgba(0,0,0,0.025)',         'rgba(255,255,255,0.025)');
  const fieldBorder  = useColorModeValue('rgba(0,0,0,0.08)',          'rgba(255,255,255,0.06)');
  const monoCol      = useColorModeValue('gray.500',                  'rgba(255,255,255,0.42)');

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={hasPdf && showPdf ? '6xl' : 'xl'} isCentered>
      <ModalOverlay bg="rgba(0,0,0,0.72)" backdropFilter="blur(14px)" />
      <ModalContent
        maxW={hasPdf && showPdf ? '90vw' : '600px'}
        maxH={hasPdf && showPdf ? '90vh' : 'auto'}
        bg={modalBg} border="1px solid" borderColor={modalBorder}
        borderRadius="16px" mx={4} boxShadow="0 40px 80px rgba(0,0,0,0.5)" overflow="hidden">
        <Box h="2px" style={{ background: `linear-gradient(to right, ${meta.accent}, ${meta.accent}33, transparent)` }} />
        <ModalHeader borderBottom="1px solid" borderColor={headerBorder} pb={4} pt={5}>
          <HStack justify="space-between" align="start">
            <HStack spacing={3} flex={1} minW={0}>
              <Box color={meta.accent} flexShrink={0}>{cert.logo}</Box>
              <VStack align="start" spacing={0.5} minW={0}>
                <HStack spacing={2}>
                  <Text fontFamily="monospace" fontSize="8px" letterSpacing="0.22em" color={meta.accent}>[{meta.label}]</Text>
                  <Text fontFamily="monospace" fontSize="9px" color={monoCol}>{cert.dateEarned}</Text>
                </HStack>
                <Text fontFamily="Orbitron" fontSize="13px" fontWeight="700" color={titleCol} noOfLines={2}>{cert.title}</Text>
                <Text fontFamily="Sora" fontSize="12px" color={meta.accent} fontWeight="600">{cert.subtitle}</Text>
              </VStack>
            </HStack>
            {hasPdf && (
              <Button size="xs" fontFamily="monospace" fontSize="8px" letterSpacing="0.15em" px={3} flexShrink={0}
                bg={showPdf ? `${meta.accent}12` : 'transparent'} color={showPdf ? meta.accent : monoCol}
                border="1px solid" borderColor={showPdf ? `${meta.accent}35` : fieldBorder}
                _hover={{ borderColor: meta.accent, color: meta.accent }}
                onClick={() => setShowPdf(!showPdf)}>
                {showPdf ? 'DETAILS' : 'PDF'}
              </Button>
            )}
          </HStack>
        </ModalHeader>
        <ModalCloseButton color={monoCol} _hover={{ color: titleCol, bg: fieldBg }} borderRadius="8px" top={4} right={4} />
        <ModalBody py={5} overflow={hasPdf && showPdf ? 'hidden' : 'auto'}>
          {hasPdf && showPdf ? (
            <Box w="100%" h="calc(90vh - 130px)" borderRadius="8px" overflow="hidden"
              border="1px solid" borderColor={fieldBorder}>
              <iframe src={cert.certificatePdfUrl} width="100%" height="100%" style={{ border: 'none' }} title={cert.title} />
            </Box>
          ) : (
            <VStack align="stretch" spacing={4}>
              <Grid templateColumns="repeat(2,1fr)" gap={2.5}>
                {[['Institution', cert.institution], ['Date Earned', cert.dateEarned],
                  ['Duration', cert.duration], ...(cert.grade ? [['Grade', cert.grade]] : [])
                ].map(([label, value]) => (
                  <Box key={label} bg={fieldBg} border="1px solid" borderColor={fieldBorder} borderRadius="8px" p={3}>
                    <Text fontFamily="monospace" fontSize="8px" letterSpacing="0.22em" textTransform="uppercase" color={monoCol} mb={1}>{label}</Text>
                    <Text fontFamily="Sora" fontSize="13px" fontWeight="600" color={titleCol}>{value}</Text>
                  </Box>
                ))}
              </Grid>
              <Box bg={fieldBg} border="1px solid" borderColor={fieldBorder} borderRadius="8px" p={3}>
                <Text fontFamily="monospace" fontSize="8px" letterSpacing="0.22em" textTransform="uppercase" color={monoCol} mb={1}>Credential ID</Text>
                <Text fontFamily="monospace" fontSize="11px" color={monoCol} letterSpacing="0.05em">{cert.credentialId}</Text>
              </Box>
              <Box>
                <Text fontFamily="monospace" fontSize="8px" letterSpacing="0.22em" textTransform="uppercase" color={monoCol} mb={2}>Skills Acquired</Text>
                <Flex flexWrap="wrap" gap={1.5}>
                  {cert.skills.map((s, i) => (
                    <Box key={i} px={2.5} py={1} borderRadius="4px"
                      bg={`${meta.accent}0e`} border="1px solid" borderColor={`${meta.accent}28`}>
                      <Text fontFamily="monospace" fontSize="10px" color={meta.accent} letterSpacing="0.04em">{s}</Text>
                    </Box>
                  ))}
                </Flex>
              </Box>
              <VStack spacing={2} pt={1}>
                {(hasPdf || cert.certificateUrl) && (
                  <Button as="a" href={hasPdf ? cert.certificatePdfUrl : cert.certificateUrl}
                    target="_blank" download={hasPdf}
                    leftIcon={<ExternalLink size={12} />} w="full"
                    fontFamily="monospace" fontSize="9px" letterSpacing="0.18em" textTransform="uppercase"
                    bg={`${meta.accent}10`} color={meta.accent}
                    border="1px solid" borderColor={`${meta.accent}28`}
                    _hover={{ bg: `${meta.accent}1e`, transform: 'translateY(-1px)' }} transition="all 0.18s">
                    {hasPdf ? 'Download Certificate' : 'View Certificate'}
                  </Button>
                )}
                {cert.verificationUrl && (
                  <Button as="a" href={cert.verificationUrl} target="_blank"
                    leftIcon={<CheckCircle size={11} />} variant="ghost" w="full"
                    fontFamily="monospace" fontSize="9px" letterSpacing="0.15em" textTransform="uppercase"
                    color={monoCol} _hover={{ color: '#14b8a6', bg: `$"14b8a6"08` }}>
                    Verify on {cert.institution}
                  </Button>
                )}
              </VStack>
            </VStack>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function Certificates() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCert, setSelectedCert]         = useState(null);
  const [searchQuery, setSearchQuery]           = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [certificatesData, setCertificatesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  const ruleBorder   = useColorModeValue('rgba(0,0,0,0.09)',  'rgba(255,255,255,0.07)');
  const subColor     = useColorModeValue('gray.500',           'rgba(255,255,255,0.38)');
  const titleColor   = useColorModeValue('gray.800',           'rgba(255,255,255,0.92)');
  const inputBg      = useColorModeValue('rgba(0,0,0,0.03)',   'rgba(255,255,255,0.03)');
  const inputBorder  = useColorModeValue('rgba(0,0,0,0.09)',   'rgba(255,255,255,0.07)');
  const tabColor     = useColorModeValue('gray.400',           'rgba(255,255,255,0.35)');
  const tabSel       = useColorModeValue('gray.700',           'rgba(255,255,255,0.88)');
  const emptyColor   = useColorModeValue('gray.400',           'rgba(255,255,255,0.28)');
  const eyebrowColor = useColorModeValue('gray.500',           'whiteAlpha.400');
  const inputFocus   = { borderColor: '#14b8a6', boxShadow: `0 0 0 1px $"14b8a6"` };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res  = await fetch('/certificates.json');
        if (!res.ok) throw new Error('Failed to load certificates');
        const data = await res.json();
        setCertificatesData(data.map(c => ({ ...c, logo: getIcon(c.logoType, c.logoColor) })));
      } catch (err) { setError(err.message); }
      finally { setLoading(false); }
    })();
  }, []);

  const handleViewDetails = cert => { setSelectedCert(cert); onOpen(); };

  const filteredCerts = certificatesData
    .filter(c => {
      const q = searchQuery.toLowerCase();
      return (c.title.toLowerCase().includes(q) || c.institution.toLowerCase().includes(q) || c.skills.some(s => s.toLowerCase().includes(q)))
        && (selectedCategory === 'all' || c.category === selectedCategory);
    })
    .sort((a, b) => {
      const o = { degree: 1, course: 2, certification: 3 };
      const d = o[a.category] - o[b.category];
      if (d) return d;
      const yr = s => { const m = s.match(/\d{4}/); return m ? +m[0] : 0; };
      return yr(b.dateEarned) - yr(a.dateEarned);
    });

  if (loading) return (
    <Box
      minH="1100px"
      bg="transparent"
      position="relative"
      overflow="hidden"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={{ base: 5, md: 12, lg: 20 }}
      py={{ base: 20, md: 0 }}
      fontFamily="'Sora', sans-serif"
      transition="background-color 0.3s ease"
    >
      <VStack spacing={4}>
        <Spinner size="md" color="14b8a6" thickness="1px" />
        <Text fontFamily="monospace" fontSize="10px" letterSpacing="0.2em" color={subColor}>
          loading records...
        </Text>
      </VStack>
    </Box>
  );

  if (error) return (
    <Box
      minH="1100px"
      bg="transparent"
      position="relative"
      overflow="hidden"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={{ base: 5, md: 12, lg: 20 }}
      py={{ base: 20, md: 0 }}
      fontFamily="'Sora', sans-serif"
      transition="background-color 0.3s ease"
    >
      <VStack spacing={4}>
        <Text fontFamily="monospace" fontSize="9px" letterSpacing="0.2em" color="red.400">ERR // LOAD_FAILED</Text>
        <Text fontFamily="Sora" fontSize="13px" color={subColor}>{error}</Text>
        <Button onClick={() => window.location.reload()} fontFamily="monospace" fontSize="9px" letterSpacing="0.2em"
          bg="transparent" color="red.400" border="1px solid rgba(239,68,68,0.3)"
          _hover={{ bg: 'rgba(239,68,68,0.08)' }}>RETRY</Button>
      </VStack>
    </Box>
  );

  return (
    <Box
      minH="1100px"
      bg="transparent"
      position="relative"
      overflow="hidden"
      display="flex"
      justifyContent="center"
      px={{ base: 5, md: 12, lg: 20 }}
      py={{ base: 20, md: 0 }}
      fontFamily="'Sora', sans-serif"
      transition="background-color 0.3s ease"
    >
      {/* ── Constrained inner column — matches TechSkills ── */}
      <Flex
        direction="column"
        align="flex-start"
        w="full"
        maxW="1200px"
        mx="auto"
        gap={8}
        position="relative"
        zIndex={1}
        alignSelf="center"
      >

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          style={{ width: '100%' }}
        >
          <Box>
            <HStack spacing={3} mb={3}>
              <Box w="24px" h="1px" bgGradient="linear(to-r, #ec4899, #7c3aed)" />
              <Text fontFamily="Orbitron" fontSize="9px" letterSpacing="0.3em"
                textTransform="uppercase" color={eyebrowColor}>
                Credentials
              </Text>
            </HStack>
            <Text
              fontFamily="Orbitron" fontWeight="900" fontSize="clamp(26px, 4vw, 40px)"
              letterSpacing="-0.02em" lineHeight={1.05}
              bgGradient="linear(to-r, #1e40af, #7c3aed, #ec4899)"
              bgClip="text" display="inline-block" w="fit-content"
            >
              Credentials
            </Text>
            <Text
              fontFamily="Orbitron" fontWeight="900" fontSize="clamp(26px, 4vw, 40px)"
              letterSpacing="-0.02em" lineHeight={1.05}
              color="text.subdued"
            >
              &amp; Achievements
            </Text>
          </Box>
        </motion.div>

        {/* ── Search + Filter ── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.38 }}
          style={{ width: '100%' }}
        >
          <HStack spacing={3} flexWrap="wrap" w="full">
            <Box flex={1} minW="200px" position="relative">
              <Box position="absolute" left={3} top="50%" transform="translateY(-50%)"
                color={subColor} pointerEvents="none" zIndex={1}>
                <Search size={13} />
              </Box>
              <Input pl={9} placeholder="Search credentials, skills, institutions..."
                value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                size="md" bg={inputBg} border="1px solid" borderColor={inputBorder}
                color={titleColor} fontFamily="monospace" fontSize="12px" borderRadius="8px"
                _placeholder={{ color: subColor, fontFamily: "monospace" }}
                _hover={{ borderColor: 'rgba(255,255,255,0.13)' }}
                _focus={inputFocus} />
            </Box>
            <Select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}
              w={{ base: '100%', md: '150px' }} size="md"
              bg={inputBg} border="1px solid" borderColor={inputBorder}
              color={titleColor} fontFamily="monospace" fontSize="11px" borderRadius="8px"
              _focus={inputFocus}>
              <option value="all">ALL</option>
              <option value="degree">DEGREES</option>
              <option value="certification">CERTS</option>
              <option value="course">COURSES</option>
            </Select>
          </HStack>
        </motion.div>

        {/* ── Tabs ── */}
        <Box w="full">
          <Tabs variant="unstyled">
            <TabList mb={6} gap={6} borderBottom="1px solid" borderColor={ruleBorder} pb={3}>
              {['Grid View', 'Timeline View'].map(label => (
                <Tab key={label}
                  fontFamily="monospace" fontSize="9px" letterSpacing="0.22em" textTransform="uppercase"
                  color={tabColor} pb={3} px={0} position="relative" transition="color 0.18s"
                  _selected={{ color: tabSel }}
                  sx={{
                    '&[aria-selected=true]::after': {
                      content: '""', position: 'absolute', bottom: '-12px', left: 0, right: 0,
                      height: '2px', background: 'linear-gradient(135deg, #1e40af, #7c3aed, #ec4899)',
                    }
                  }}>
                  {label}
                </Tab>
              ))}
              <Box ml="auto" display="flex" alignItems="center">
                <Text fontFamily="monospace" fontSize="12px" color='rgba(20,184,166,0.7)' letterSpacing="0.15em">
                  {String(filteredCerts.length).padStart(2, '0')} records
                </Text>
              </Box>
            </TabList>

            <TabPanels>
              <TabPanel px={0} pt={0}>
                <AnimatePresence mode="popLayout">
                  <VStack spacing={0} align="stretch">
                    {filteredCerts.map((cert, i) => (
                      <LedgerRow key={cert.id} cert={cert} index={i} onViewDetails={handleViewDetails} />
                    ))}
                  </VStack>
                </AnimatePresence>
              </TabPanel>
              <TabPanel px={0} pt={2}>
                <VStack spacing={0} align="stretch" maxW="860px" mx="auto">
                  {filteredCerts.map((cert, i) => (
                    <TimelineEntry key={cert.id} cert={cert} index={i} onViewDetails={handleViewDetails} />
                  ))}
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>

          {filteredCerts.length === 0 && (
            <Box textAlign="center" py={14} borderTop="1px solid" borderColor={ruleBorder}>
              <Text fontFamily="monospace" fontSize="10px" letterSpacing="0.22em" color={emptyColor}>
                NO RECORDS FOUND
              </Text>
            </Box>
          )}
        </Box>

      </Flex>

      <CertificateDetailModal isOpen={isOpen} onClose={onClose} cert={selectedCert} />
    </Box>
  );
}