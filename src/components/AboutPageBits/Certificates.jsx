import React, { useState, useEffect, useRef } from 'react';
import {
  Box, Text, VStack, HStack, Button, Badge, Grid,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton,
  Flex, Input, Select, useDisclosure, Spinner,
  Tabs, TabList, TabPanels, Tab, TabPanel,
} from '@chakra-ui/react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { GraduationCap, ExternalLink, CheckCircle, Calendar, Clock, DatabaseZap } from 'lucide-react';
import { DiReact, DiJavascript1, DiNodejsSmall, DiPython, DiCode } from 'react-icons/di';
import { BsGlobe } from 'react-icons/bs';
import { FaChartBar, FaChartLine } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';

const MotionBox = motion.create(Box);

// ── Icons ─────────────────────────────────────────────────────────────────────
const iconMap = { GraduationCap, DiReact, BsGlobe, DiJavascript1, DiNodejsSmall, DatabaseZap, DiPython, DiCode, FaChartLine, FaChartBar };
const getIcon = (type, color) => { const C = iconMap[type]; return C ? <C color={color} size={28} /> : null; };

// ── Design tokens ─────────────────────────────────────────────────────────────
const CARD_BG     = 'rgba(255,255,255,0.03)';
const CARD_BORDER = 'rgba(255,255,255,0.07)';
const BLUR        = 'blur(18px)';
const H           = 'Orbitron, sans-serif';   // heading font
const B           = 'Sora, sans-serif';        // body font
const GRAD        = 'linear(to-r, #1e40af, #7c3aed, #ec4899)';
const TEAL        = '#14b8a6';

const catStyle = {
  degree:        { bg: 'rgba(168,85,247,0.12)',  color: '#a855f7', border: 'rgba(168,85,247,0.3)'  },
  certification: { bg: 'rgba(59,130,246,0.12)',   color: '#3b82f6', border: 'rgba(59,130,246,0.3)'  },
  course:        { bg: 'rgba(20,184,166,0.12)',    color: TEAL,      border: 'rgba(20,184,166,0.3)'  },
};

const FieldLabel = ({ children }) => (
  <Text fontFamily={H} fontSize="9px" letterSpacing="0.25em" textTransform="uppercase" color="whiteAlpha.350" mb={1}>
    {children}
  </Text>
);

// ─────────────────────────────────────────────────────────────────────────────
// Certificate Card
// ─────────────────────────────────────────────────────────────────────────────
const CertificateCard = ({ cert, onViewDetails }) => {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const mx = useMotionValue(0); const my = useMotionValue(0);
  const rotateX = useTransform(my, [-100, 100], [6, -6]);
  const rotateY = useTransform(mx, [-100, 100], [-6, 6]);

  const onMove  = e => { if (!cardRef.current) return; const r = cardRef.current.getBoundingClientRect(); mx.set(e.clientX - (r.left + r.width / 2)); my.set(e.clientY - (r.top + r.height / 2)); };
  const onLeave = () => { mx.set(0); my.set(0); setHovered(false); };
  const cs = catStyle[cert.category] || catStyle.course;

  return (
    <MotionBox
      ref={cardRef} onMouseMove={onMove} onMouseLeave={onLeave} onMouseEnter={() => setHovered(true)}
      onClick={() => onViewDetails(cert)} cursor="pointer" h="100%"
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <Box
        h="100%" minH="290px"
        bg={hovered ? 'rgba(255,255,255,0.05)' : CARD_BG}
        backdropFilter={BLUR}
        borderRadius="18px"
        border="1px solid"
        borderColor={hovered ? cert.color : CARD_BORDER}
        p={5} position="relative" overflow="hidden"
        transition="all 0.35s cubic-bezier(0.23,1,0.32,1)"
        boxShadow={hovered ? `0 20px 56px ${cert.color}25` : '0 2px 16px rgba(0,0,0,0.3)'}
      >
        {/* Glow */}
        <Box position="absolute" top="-70px" right="-70px" w="200px" h="200px"
          bgGradient={`radial(circle, ${cert.color}, transparent)`}
          opacity={hovered ? 0.2 : 0.07} filter="blur(50px)" transition="opacity 0.5s" pointerEvents="none" />

        {/* Top accent line */}
        <Box position="absolute" top={0} left="12%" right="12%" h="1px"
          bgGradient={`linear(to-r, transparent, ${cert.color}55, transparent)`}
          opacity={hovered ? 1 : 0} transition="opacity 0.35s" />

        {/* Shimmer */}
        <Box position="absolute" top={0} left="-100%" w="50%" h="100%"
          bgGradient="linear(to-r, transparent, rgba(255,255,255,0.05), transparent)"
          transform={hovered ? 'translateX(300%)' : 'translateX(0)'} transition="transform 0.9s" pointerEvents="none" />

        <VStack align="stretch" spacing={4} h="100%" position="relative" zIndex={1}>

          {/* Header */}
          <HStack justify="space-between" align="start">
            <Box bg={`${cert.color}14`} border="1px solid" borderColor={`${cert.color}28`}
              p={2.5} borderRadius="10px"
              transition="transform 0.3s" transform={hovered ? 'scale(1.1) rotate(6deg)' : 'scale(1)'}>
              {cert.logo}
            </Box>
            <Badge fontFamily={H} fontSize="8px" letterSpacing="0.15em" px={2} py={1}
              borderRadius="6px" textTransform="uppercase"
              bg={cs.bg} color={cs.color} border="1px solid" borderColor={cs.border}>
              {cert.category}
            </Badge>
          </HStack>

          {/* Text */}
          <VStack align="stretch" spacing={1} flex={1}>
            <Text fontFamily={H} fontSize="13px" fontWeight="700" color="white" noOfLines={2} lineHeight="1.4">
              {cert.title}
            </Text>
            <Text fontFamily={B} fontSize="12px" fontWeight="600" color={cert.color} noOfLines={1}>
              {cert.subtitle}
            </Text>
            <Text fontFamily={B} fontSize="11px" color="whiteAlpha.450">{cert.institution}</Text>

            <HStack spacing={3} pt={1} color="whiteAlpha.380">
              <HStack spacing={1}><Calendar size={11} /><Text fontFamily={B} fontSize="10px">{cert.dateEarned}</Text></HStack>
              <HStack spacing={1}><Clock size={11} /><Text fontFamily={B} fontSize="10px">{cert.duration}</Text></HStack>
            </HStack>

            {cert.grade && (
              <Badge mt={1} w="fit-content" fontFamily={H} fontSize="9px" letterSpacing="0.1em"
                px={2} py={0.5} borderRadius="6px"
                bg="rgba(255,255,255,0.05)" border="1px solid rgba(255,255,255,0.09)" color="whiteAlpha.600">
                {cert.grade}
              </Badge>
            )}
          </VStack>

          {/* Skill tags */}
          <Flex flexWrap="wrap" gap={1.5}>
            {cert.skills.slice(0, 3).map((s, i) => (
              <Badge key={i} fontFamily={B} fontSize="9px" px={2} py={0.5} borderRadius="5px"
                bg="rgba(255,255,255,0.04)" color="whiteAlpha.450" border="1px solid rgba(255,255,255,0.07)">
                {s}
              </Badge>
            ))}
            {cert.skills.length > 3 && (
              <Badge fontFamily={H} fontSize="9px" px={2} py={0.5} borderRadius="5px"
                bg="rgba(255,255,255,0.07)" color="whiteAlpha.380">
                +{cert.skills.length - 3}
              </Badge>
            )}
          </Flex>

          {/* CTA */}
          <HStack justify="center" spacing={1}
            opacity={hovered ? 1 : 0} transform={hovered ? 'translateY(0)' : 'translateY(4px)'} transition="all 0.3s">
            <Text fontFamily={H} fontSize="9px" letterSpacing="0.2em" textTransform="uppercase" color={cert.color}>
              View Details
            </Text>
            <ExternalLink size={10} color={cert.color} />
          </HStack>

        </VStack>
      </Box>
    </MotionBox>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Modal
// ─────────────────────────────────────────────────────────────────────────────
const CertificateDetailModal = ({ isOpen, onClose, cert }) => {
  const [showPdf, setShowPdf] = useState(false);
  if (!cert) return null;
  const hasPdf = cert.certificatePdfUrl?.toLowerCase().endsWith('.pdf');
  const cs = catStyle[cert.category] || catStyle.course;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={hasPdf && showPdf ? '6xl' : 'xl'} isCentered>
      <ModalOverlay bg="rgba(0,0,0,0.85)" backdropFilter="blur(20px)" />
      <ModalContent
        maxW={hasPdf && showPdf ? '90vw' : '660px'}
        maxH={hasPdf && showPdf ? '90vh' : 'auto'}
        bg="rgba(8,8,8,0.96)" backdropFilter="blur(32px)"
        border="1px solid rgba(255,255,255,0.08)" borderRadius="20px" mx={4}
        boxShadow="0 40px 100px rgba(0,0,0,0.7)">

        <ModalHeader borderBottom="1px solid rgba(255,255,255,0.06)" pb={4}>
          <HStack justify="space-between">
            <HStack spacing={3} flex={1} minW={0}>
              <Box flexShrink={0}>{cert.logo}</Box>
              <VStack align="start" spacing={0} minW={0}>
                <Text fontFamily={H} fontSize="13px" fontWeight="700" color="white" noOfLines={1}>{cert.title}</Text>
                <Text fontFamily={B} fontSize="12px" color={cert.color} fontWeight="600">{cert.subtitle}</Text>
              </VStack>
            </HStack>
            {hasPdf && (
              <Button size="xs" fontFamily={H} fontSize="8px" letterSpacing="0.15em" px={3}
                bg={showPdf ? cs.bg : 'rgba(255,255,255,0.04)'}
                color={showPdf ? cs.color : 'whiteAlpha.500'}
                border="1px solid" borderColor={showPdf ? cs.border : 'rgba(255,255,255,0.09)'}
                _hover={{ borderColor: cs.color, color: cs.color }}
                onClick={() => setShowPdf(!showPdf)}>
                {showPdf ? 'Details' : 'PDF'}
              </Button>
            )}
          </HStack>
        </ModalHeader>

        <ModalCloseButton color="whiteAlpha.500" _hover={{ color: 'white', bg: 'rgba(255,255,255,0.06)' }} borderRadius="8px" />

        <ModalBody py={6} overflow={hasPdf && showPdf ? 'hidden' : 'auto'}>
          {hasPdf && showPdf ? (
            <Box w="100%" h="calc(90vh - 120px)" borderRadius="12px" overflow="hidden" border="1px solid rgba(255,255,255,0.06)">
              <iframe src={cert.certificatePdfUrl} width="100%" height="100%" style={{ border: 'none' }} title={cert.title} />
            </Box>
          ) : (
            <VStack align="stretch" spacing={4}>

              <Grid templateColumns="repeat(2, 1fr)" gap={3}>
                {[['Institution', cert.institution], ['Date Earned', cert.dateEarned], ['Duration', cert.duration], ...(cert.grade ? [['Grade', cert.grade]] : [])].map(([label, value]) => (
                  <Box key={label} bg="rgba(255,255,255,0.02)" border="1px solid rgba(255,255,255,0.06)" borderRadius="10px" p={3}>
                    <FieldLabel>{label}</FieldLabel>
                    <Text fontFamily={B} fontSize="13px" fontWeight="600" color="white">{value}</Text>
                  </Box>
                ))}
              </Grid>

              <Box bg="rgba(255,255,255,0.02)" border="1px solid rgba(255,255,255,0.06)" borderRadius="10px" p={3}>
                <FieldLabel>Credential ID</FieldLabel>
                <Text fontFamily="'JetBrains Mono', monospace" fontSize="12px" color="whiteAlpha.550" letterSpacing="0.04em">
                  {cert.credentialId}
                </Text>
              </Box>

              <Box>
                <FieldLabel>Skills Acquired</FieldLabel>
                <Flex flexWrap="wrap" gap={2} mt={2}>
                  {cert.skills.map((s, i) => (
                    <Badge key={i} fontFamily={B} fontSize="11px" px={3} py={1} borderRadius="8px"
                      bg={`${cert.color}12`} color={cert.color} border="1px solid" borderColor={`${cert.color}30`}>
                      {s}
                    </Badge>
                  ))}
                </Flex>
              </Box>

              <VStack spacing={2} pt={1}>
                {(hasPdf || cert.certificateUrl) && (
                  <Button as="a" href={hasPdf ? cert.certificatePdfUrl : cert.certificateUrl}
                    target="_blank" download={hasPdf}
                    leftIcon={<ExternalLink size={13} />} w="full"
                    fontFamily={H} fontSize="10px" letterSpacing="0.15em"
                    bg={`${cert.color}14`} color={cert.color}
                    border="1px solid" borderColor={`${cert.color}35`}
                    _hover={{ bg: `${cert.color}24`, transform: 'translateY(-1px)' }} transition="all 0.2s">
                    {hasPdf ? 'Download Certificate' : 'View Certificate'}
                  </Button>
                )}
                {cert.verificationUrl && (
                  <Button as="a" href={cert.verificationUrl} target="_blank"
                    leftIcon={<CheckCircle size={12} />} variant="ghost" w="full"
                    fontFamily={H} fontSize="9px" letterSpacing="0.15em"
                    color="whiteAlpha.380" _hover={{ color: TEAL, bg: 'rgba(20,184,166,0.06)' }}>
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

// ── Animation variants ────────────────────────────────────────────────────────
const headerVariants = { hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const statsVariants  = { hidden: { opacity: 0, scale: 0.82 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: 'backOut' } } };
const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } } };

// ─────────────────────────────────────────────────────────────────────────────
// Main export
// ─────────────────────────────────────────────────────────────────────────────
export default function Certificates() {
  const [headerRef, headerInView] = useInView({ triggerOnce: false, threshold: 0.15 });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCert, setSelectedCert]         = useState(null);
  const [searchQuery, setSearchQuery]           = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [certificatesData, setCertificatesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

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

  const stats = {
    total:          certificatesData.length,
    degrees:        certificatesData.filter(c => c.category === 'degree').length,
    certifications: certificatesData.filter(c => c.category === 'certification').length,
  };

  const inputSx = {
    bg: CARD_BG, border: '1px solid', borderColor: CARD_BORDER, color: 'white',
    fontFamily: B, fontSize: '13px', borderRadius: '10px',
    _placeholder: { color: 'whiteAlpha.300', fontFamily: B },
    _hover: { borderColor: 'rgba(255,255,255,0.14)' },
    _focus: { borderColor: TEAL, boxShadow: `0 0 0 1px ${TEAL}` },
  };

  if (loading) return (
    <Box py={24} textAlign="center">
      <Spinner size="lg" color={TEAL} thickness="2px" />
      <Text mt={4} fontFamily={B} fontSize="13px" color="whiteAlpha.400">Loading certificates...</Text>
    </Box>
  );

  if (error) return (
    <Box py={24} textAlign="center">
      <Text fontFamily={H} fontSize="11px" letterSpacing="0.2em" color="red.400" mb={2}>Error</Text>
      <Text fontFamily={B} fontSize="13px" color="whiteAlpha.400" mb={5}>{error}</Text>
      <Button onClick={() => window.location.reload()} fontFamily={H} fontSize="9px" letterSpacing="0.2em"
        bg="rgba(239,68,68,0.1)" color="red.400" border="1px solid rgba(239,68,68,0.25)" _hover={{ bg: 'rgba(239,68,68,0.18)' }}>
        Retry
      </Button>
    </Box>
  );

  return (
    <Box bg="transparent" py={{ base: 4, md: 6 }} maxW="1100px" position="relative" mx="auto">
      <VStack spacing={12} align="stretch">

        {/* Header */}
        <VStack spacing={6} textAlign="center">
          <MotionBox ref={headerRef} initial="hidden" animate={headerInView ? 'visible' : 'hidden'} variants={headerVariants}>
            <Text
              fontFamily={H}
              fontSize={{ base: '26px', md: '44px' }}
              fontWeight="900"
              letterSpacing="-0.02em"
              lineHeight={1.1}
              bgGradient={GRAD}
              bgClip="text"
            >
              Credentials &amp; Achievements
            </Text>
          </MotionBox>

          <MotionBox initial={{ opacity: 0, y: 14 }} animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{ duration: 0.5, delay: 0.65 }}>
            <Text fontFamily={B} fontSize="14px" color="whiteAlpha.400" maxW="460px" mx="auto">
              Academic journey and professional certifications — a record of continuous learning.
            </Text>
          </MotionBox>

          {/* Stats */}
          <MotionBox as={HStack} spacing={{ base: 8, md: 14 }} pt={2} flexWrap="wrap" justify="center"
            initial="hidden" animate={headerInView ? 'visible' : 'hidden'} variants={staggerContainer}>
            {[
              { value: stats.total,          label: 'Total',          color: TEAL      },
              { value: stats.degrees,         label: 'Degrees',        color: '#a855f7' },
              { value: stats.certifications,  label: 'Certifications', color: '#3b82f6' },
            ].map(({ value, label, color }) => (
              <MotionBox key={label} variants={statsVariants}>
                <VStack spacing={0}>
                  <Text fontFamily={H} fontSize={{ base: '30px', md: '40px' }} fontWeight="900" lineHeight={1}
                    style={{ background: `linear-gradient(135deg, ${color}, ${color}55)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    {value}
                  </Text>
                  <Text fontFamily={H} fontSize="9px" letterSpacing="0.2em" textTransform="uppercase"
                    color="whiteAlpha.380" mt={1}>{label}</Text>
                </VStack>
              </MotionBox>
            ))}
          </MotionBox>
        </VStack>

        {/* Search + Filter */}
        <HStack spacing={3} flexWrap="wrap">
          <Box flex={1} minW="200px">
            <Input placeholder="Search certificates, skills, institutions..." value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)} size="md" {...inputSx} />
          </Box>
          <Select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}
            w={{ base: '100%', md: '170px' }} size="md" {...inputSx}>
            <option value="all"           style={{ background: '#0a0a0a' }}>All Categories</option>
            <option value="degree"        style={{ background: '#0a0a0a' }}>Degrees</option>
            <option value="certification" style={{ background: '#0a0a0a' }}>Certifications</option>
            <option value="course"        style={{ background: '#0a0a0a' }}>Courses</option>
          </Select>
        </HStack>

        {/* Tabs */}
        <Tabs variant="unstyled">
          <TabList mb={8} justifyContent="center" gap={3}>
            {['Grid View', 'Timeline View'].map(label => (
              <Tab key={label} fontFamily={H} fontSize="9px" letterSpacing="0.2em" textTransform="uppercase"
                px={5} py={2} borderRadius="8px" border="1px solid" borderColor={CARD_BORDER}
                color="whiteAlpha.400" transition="all 0.2s"
                _selected={{ color: TEAL, bg: 'rgba(20,184,166,0.08)', borderColor: 'rgba(20,184,166,0.32)' }}>
                {label}
              </Tab>
            ))}
          </TabList>

          <TabPanels>
            <TabPanel px={0}>
              <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={5}>
                {filteredCerts.map(cert => <CertificateCard key={cert.id} cert={cert} onViewDetails={handleViewDetails} />)}
              </Grid>
            </TabPanel>

            <TabPanel px={0}>
              <VStack spacing={5} align="stretch" maxW="820px" mx="auto">
                {filteredCerts.map((cert, idx) => (
                  <HStack key={cert.id} align="start" spacing={5}
                    flexDir={{ base: 'column', md: idx % 2 === 0 ? 'row' : 'row-reverse' }}>
                    <Box display={{ base: 'none', md: 'block' }} w="2px" alignSelf="stretch"
                      bg={`${cert.color}28`} borderRadius="full" position="relative" flexShrink={0}>
                      <Box position="absolute" top="20px" left="50%" transform="translateX(-50%)"
                        w="9px" h="9px" bg={cert.color} borderRadius="full"
                        boxShadow={`0 0 8px ${cert.color}`} />
                    </Box>
                    <Box flex={1} w="100%">
                      <CertificateCard cert={cert} onViewDetails={handleViewDetails} />
                    </Box>
                  </HStack>
                ))}
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>

        {filteredCerts.length === 0 && (
          <Box textAlign="center" py={12}>
            <Text fontFamily={B} fontSize="13px" color="whiteAlpha.300">No certificates found.</Text>
          </Box>
        )}

      </VStack>
      <CertificateDetailModal isOpen={isOpen} onClose={onClose} cert={selectedCert} />
    </Box>
  );
}