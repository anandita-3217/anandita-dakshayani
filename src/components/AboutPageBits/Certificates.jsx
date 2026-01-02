import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  Badge,
  Grid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Flex,
  Input,
  Select,
  useDisclosure,
  Spinner,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { 
  GraduationCap, 
  ExternalLink, 
  CheckCircle,
  Calendar,
  Clock,
  DatabaseZap,
} from 'lucide-react';
import { DiReact, DiJavascript1, DiNodejsSmall } from "react-icons/di";
import { BsGlobe } from "react-icons/bs";

const MotionBox = motion(Box);

// Icon mapping helper
const iconMap = {
  GraduationCap: GraduationCap,
  DiReact: DiReact,
  BsGlobe: BsGlobe,
  DiJavascript1: DiJavascript1,
  DiNodejsSmall: DiNodejsSmall,
  DatabaseZap: DatabaseZap,
};

const getIcon = (iconType, color) => {
  const IconComponent = iconMap[iconType];
  return IconComponent ? <IconComponent color={color} size={32} /> : null;
};

// Certificate Card Component with Bento styling
const CertificateCard = ({ cert, onViewDetails }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [8, -8]);
  const rotateY = useTransform(x, [-100, 100], [-8, 8]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <MotionBox
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      onClick={() => onViewDetails(cert)}
      cursor="pointer"
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Box
        bg="rgba(255, 255, 255, 0.02)"
        backdropFilter="blur(20px)"
        borderRadius="32px"
        border="2px solid"
        borderColor={isHovered ? cert.color : 'rgba(255, 255, 255, 0.08)'}
        p={6}
        h="100%"
        minH="320px"
        position="relative"
        overflow="hidden"
        transition="all 0.4s cubic-bezier(0.23, 1, 0.32, 1)"
        boxShadow={isHovered ? `0 30px 80px ${cert.color}40` : 'none'}
      >
        {/* Animated gradient background */}
        <Box
          position="absolute"
          top="-100px"
          right="-100px"
          w="300px"
          h="300px"
          bgGradient={`radial(circle, ${cert.color}, transparent)`}
          opacity={isHovered ? 0.3 : 0.15}
          transition="opacity 0.6s"
          pointerEvents="none"
          filter="blur(40px)"
        />

        {/* Decorative corner pattern */}
        <Box
          position="absolute"
          top={0}
          right={0}
          w="120px"
          h="120px"
          opacity={0.05}
          pointerEvents="none"
        >
          <Box
            w="100%"
            h="100%"
            bgGradient={`linear(to-br, ${cert.color}, ${cert.color})`}
            clipPath="polygon(100% 0, 100% 100%, 0 0)"
          />
        </Box>

        {/* Shimmer effect on hover */}
        <Box
          position="absolute"
          top={0}
          left="-100%"
          w="50%"
          h="100%"
          bgGradient="linear(to-r, transparent, rgba(255,255,255,0.1), transparent)"
          transform={isHovered ? 'translateX(300%)' : 'translateX(0)'}
          transition="transform 0.8s"
          pointerEvents="none"
        />

        <VStack align="stretch" spacing={4} h="100%" position="relative" zIndex={1}>
          {/* Logo and Category Badge */}
          <HStack justify="space-between" align="start">
            <Box
              bg={`${cert.color}15`}
              p={3}
              borderRadius="lg"
              transition="transform 0.3s"
              transform={isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)'}
            >
              {cert.logo}
            </Box>
            
            <Badge
              colorScheme={
                cert.category === 'degree' ? 'purple' : 
                cert.category === 'certification' ? 'blue' : 
                'green'
              }
              fontSize="xs"
              px={2}
              py={1}
              borderRadius="md"
              textTransform="capitalize"
            >
              {cert.category}
            </Badge>
          </HStack>

          {/* Title and Subtitle */}
          <VStack align="stretch" spacing={1} flex={1}>
            <Heading
              as="h3"
              size="md"
              color="text.primary"
              noOfLines={2}
              lineHeight="1.3"
            >
              {cert.title}
            </Heading>
            
            <Text
              color={cert.color}
              fontSize="sm"
              fontWeight="600"
              noOfLines={1}
            >
              {cert.subtitle}
            </Text>

            <HStack spacing={2} fontSize="sm" color="text.secondary" pt={1}>
              <Text fontWeight="500">{cert.institution}</Text>
            </HStack>

            {/* Date and Duration */}
            <HStack spacing={4} pt={2} fontSize="xs" color="text.muted">
              <HStack spacing={1}>
                <Calendar size={14} />
                <Text>{cert.dateEarned}</Text>
              </HStack>
              <HStack spacing={1}>
                <Clock size={14} />
                <Text>{cert.duration}</Text>
              </HStack>
            </HStack>

            {/* Grade if available */}
            {cert.grade && (
              <Badge
                bg="rgba(255, 255, 255, 0.1)"
                color="text.primary"
                fontSize="xs"
                px={3}
                py={1}
                borderRadius="md"
                w="fit-content"
                mt={2}
              >
                {cert.grade}
              </Badge>
            )}
          </VStack>

          {/* Skills Tags */}
          <Flex flexWrap="wrap" gap={2}>
            {cert.skills.slice(0, 3).map((skill, i) => (
              <Badge
                key={i}
                fontSize="10px"
                px={2}
                py={1}
                borderRadius="md"
                bg="rgba(255, 255, 255, 0.05)"
                color="text.secondary"
                borderWidth="1px"
                borderColor="rgba(255, 255, 255, 0.1)"
              >
                {skill}
              </Badge>
            ))}
            {cert.skills.length > 3 && (
              <Badge
                fontSize="10px"
                px={2}
                py={1}
                borderRadius="md"
                bg="rgba(255, 255, 255, 0.1)"
                color="text.secondary"
                fontWeight="500"
              >
                +{cert.skills.length - 3}
              </Badge>
            )}
          </Flex>

          {/* View Details Hint */}
          {isHovered && (
            <HStack
              spacing={1}
              fontSize="xs"
              color={cert.color}
              fontWeight="semibold"
              justify="center"
              opacity={isHovered ? 1 : 0}
              transition="opacity 0.3s"
            >
              <Text>View Details</Text>
              <ExternalLink size={12} />
            </HStack>
          )}
        </VStack>
      </Box>
    </MotionBox>
  );
};

// Certificate Detail Modal
const CertificateDetailModal = ({ isOpen, onClose, cert }) => {
  if (!cert) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
      <ModalOverlay bg="blackAlpha.700" backdropFilter="blur(10px)" />
      <ModalContent 
        maxW="700px" 
        borderRadius="xl" 
        mx={4}
        bg="surface.card"
        border="1px solid"
        borderColor="border.primary"
      >
        <ModalHeader
          borderBottom="1px solid"
          borderColor="border.primary"
          pb={4}
        >
          <HStack spacing={3}>
            <Box>{cert.logo}</Box>
            <VStack align="start" spacing={0}>
              <Text fontSize="xl" fontWeight="bold" color="text.primary">
                {cert.title}
              </Text>
              <Text fontSize="sm" color={cert.color} fontWeight="600">
                {cert.subtitle}
              </Text>
            </VStack>
          </HStack>
        </ModalHeader>
        <ModalCloseButton color="text.primary" />
        
        <ModalBody py={6}>
          <VStack align="stretch" spacing={6}>
            {/* Institution and Dates */}
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              <Box>
                <Text fontSize="xs" color="text.muted" mb={1}>Institution</Text>
                <Text fontWeight="600" color="text.primary">{cert.institution}</Text>
              </Box>
              <Box>
                <Text fontSize="xs" color="text.muted" mb={1}>Date Earned</Text>
                <Text fontWeight="600" color="text.primary">{cert.dateEarned}</Text>
              </Box>
              <Box>
                <Text fontSize="xs" color="text.muted" mb={1}>Duration</Text>
                <Text fontWeight="600" color="text.primary">{cert.duration}</Text>
              </Box>
              {cert.grade && (
                <Box>
                  <Text fontSize="xs" color="text.muted" mb={1}>Grade</Text>
                  <Text fontWeight="600" color="text.primary">{cert.grade}</Text>
                </Box>
              )}
            </Grid>

            {/* Credential ID */}
            <Box
              bg="rgba(255, 255, 255, 0.02)"
              p={3}
              borderRadius="md"
              border="1px solid"
              borderColor="border.primary"
            >
              <Text fontSize="xs" color="text.muted" mb={1}>Credential ID</Text>
              <Text fontSize="sm" fontFamily="mono" fontWeight="600" color="text.primary">
                {cert.credentialId}
              </Text>
            </Box>

            {/* Skills Acquired */}
            <Box>
              <Text fontSize="sm" color="text.muted" mb={2} fontWeight="600">
                Skills Acquired
              </Text>
              <Flex flexWrap="wrap" gap={2}>
                {cert.skills.map((skill, i) => (
                  <Badge
                    key={i}
                    fontSize="xs"
                    px={3}
                    py={1}
                    borderRadius="md"
                    bg={`${cert.color}15`}
                    color={cert.color}
                    borderWidth="1px"
                    borderColor={`${cert.color}30`}
                    fontWeight="600"
                  >
                    {skill}
                  </Badge>
                ))}
              </Flex>
            </Box>

            {/* Action Buttons */}
            <HStack spacing={3}>
              <Button
                leftIcon={<ExternalLink size={16} />}
                colorScheme="blue"
                variant="solid"
                size="md"
                flex={1}
                as="a"
                href={cert.certificateUrl}
                target="_blank"
              >
                View Certificate
              </Button>
            </HStack>

            {/* Verification Link */}
            {cert.verificationUrl && (
              <Button
                leftIcon={<CheckCircle size={16} />}
                colorScheme="green"
                variant="ghost"
                size="sm"
                as="a"
                href={cert.verificationUrl}
                target="_blank"
                w="full"
              >
                Verify on {cert.institution} Website
              </Button>
            )}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

// Main Component
const Certificates = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCert, setSelectedCert] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [certificatesData, setCertificatesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch certificates data on component mount
  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        setLoading(true);
        const response = await fetch('/certificates.json');
        
        if (!response.ok) {
          throw new Error('Failed to load certificates');
        }
        
        const data = await response.json();
        
        // Transform data to include icon components
        const transformedData = data.map(cert => ({
          ...cert,
          logo: getIcon(cert.logoType, cert.logoColor)
        }));
        
        setCertificatesData(transformedData);
        setError(null);
      } catch (err) {
        console.error('Error loading certificates:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  const handleViewDetails = (cert) => {
    setSelectedCert(cert);
    onOpen();
  };

  // Filter certificates
  const filteredCerts = certificatesData.filter(cert => {
    const matchesSearch = cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         cert.institution.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         cert.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || cert.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Calculate stats
  const stats = {
    total: certificatesData.length,
    degrees: certificatesData.filter(c => c.category === 'degree').length,
    certifications: certificatesData.filter(c => c.category === 'certification').length,
    courses: certificatesData.filter(c => c.category === 'course').length,
  };

  // Loading state
  if (loading) {
    return (
      <Box bg="transparent" minH="100vh" py={{ base: 12, md: 20 }}>
        <Container maxW="container.xl">
          <VStack spacing={8} align="center" justify="center" minH="50vh">
            <Spinner size="xl" color="brand.500" thickness="4px" />
            <Text color="text.secondary" fontSize="lg">
              Loading certificates...
            </Text>
          </VStack>
        </Container>
      </Box>
    );
  }

  // Error state
  if (error) {
    return (
      <Box bg="transparent" minH="100vh" py={{ base: 12, md: 20 }}>
        <Container maxW="container.xl">
          <VStack spacing={4} align="center" justify="center" minH="50vh">
            <Text color="red.500" fontSize="xl" fontWeight="bold">
              Error loading certificates
            </Text>
            <Text color="text.secondary">
              {error}
            </Text>
            <Button
              colorScheme="blue"
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
          </VStack>
        </Container>
      </Box>
    );
  }

  return (
    <Box bg="transparent" minH="100vh" py={{ base: 12, md: 20 }}>
      <Container maxW="container.xl">
        <VStack spacing={12} align="stretch">
          {/* Header Section */}
          <VStack spacing={6} textAlign="center">
            <Heading
              as="h2"
              fontSize={{ base: '3xl', md: '5xl' }}
              fontWeight="bold"
              color="text.primary"
            >
              <Text as="span" color="brand.400">Credentials & Achievements</Text>
            </Heading>
            
            <Text
              fontSize="lg"
              color="text.secondary"
              maxW="600px"
            >
              My academic journey and professional certifications showcasing continuous learning
            </Text>

            {/* Stats Summary */}
            <HStack 
              spacing={{ base: 4, md: 8 }} 
              pt={4} 
              flexWrap="wrap" 
              justify="center"
            >
              <VStack spacing={1}>
                <Heading size="xl" color="brand.400">
                  {stats.total}
                </Heading>
                <Text fontSize="sm" color="text.secondary">
                  Total Credentials
                </Text>
              </VStack>
              
              <VStack spacing={1}>
                <Heading size="xl" color="purple.400">
                  {stats.degrees}
                </Heading>
                <Text fontSize="sm" color="text.secondary">
                  Degrees
                </Text>
              </VStack>
              
              <VStack spacing={1}>
                <Heading size="xl" color="blue.400">
                  {stats.certifications}
                </Heading>
                <Text fontSize="sm" color="text.secondary">
                  Certifications
                </Text>
              </VStack>
            </HStack>
          </VStack>

          {/* Search and Filter Section */}
          <HStack spacing={4} flexWrap="wrap">
            <Box flex={1} minW="250px">
              <Input
                placeholder="Search certificates, skills, or institutions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                size="lg"
                bg="rgba(255, 255, 255, 0.02)"
                borderColor="rgba(255, 255, 255, 0.08)"
                _hover={{ borderColor: "rgba(255, 255, 255, 0.15)" }}
                _focus={{ borderColor: "brand.400" }}
              />
            </Box>
            
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              w={{ base: '100%', md: '200px' }}
              size="lg"
              bg="rgba(255, 255, 255, 0.02)"
              borderColor="rgba(255, 255, 255, 0.08)"
              _hover={{ borderColor: "rgba(255, 255, 255, 0.15)" }}
              _focus={{ borderColor: "brand.400" }}
            >
              <option value="all">All Categories</option>
              <option value="degree">Degrees</option>
              <option value="certification">Certifications</option>
              <option value="course">Courses</option>
            </Select>
          </HStack>

          {/* Tabs for Grid and Timeline Views */}
          <Tabs variant="soft-rounded" colorScheme="blue">
            <TabList mb={8} justifyContent="center" flexWrap="wrap" gap={2}>
              <Tab 
                color="text.secondary" 
                _selected={{ color: 'brand.400', bg: 'rgba(20, 184, 166, 0.1)' }}
              >
                Grid View
              </Tab>
              <Tab 
                color="text.secondary"
                _selected={{ color: 'brand.400', bg: 'rgba(20, 184, 166, 0.1)' }}
              >
                Timeline View
              </Tab>
            </TabList>

            <TabPanels>
              {/* Grid View */}
              <TabPanel px={0}>
                <Grid
                  templateColumns={{
                    base: '1fr',
                    md: 'repeat(2, 1fr)',
                    lg: 'repeat(3, 1fr)',
                  }}
                  gap={6}
                >
                  {filteredCerts.map((cert) => (
                    <CertificateCard
                      key={cert.id}
                      cert={cert}
                      onViewDetails={handleViewDetails}
                    />
                  ))}
                </Grid>
              </TabPanel>

              {/* Timeline View */}
              <TabPanel px={0}>
                <VStack spacing={8} align="stretch" maxW="900px" mx="auto">
                  {filteredCerts.map((cert, index) => (
                    <HStack
                      key={cert.id}
                      align="start"
                      spacing={6}
                      flexDir={{ base: 'column', md: index % 2 === 0 ? 'row' : 'row-reverse' }}
                    >
                      {/* Timeline line */}
                      <Box
                        w={{ base: '2px', md: '4px' }}
                        minH="100%"
                        bg={cert.color}
                        borderRadius="full"
                        display={{ base: 'none', md: 'block' }}
                        position="relative"
                        alignSelf="stretch"
                      >
                        {/* Timeline dot */}
                        <Box
                          position="absolute"
                          top="20px"
                          left="50%"
                          transform="translateX(-50%)"
                          w="16px"
                          h="16px"
                          bg={cert.color}
                          borderRadius="full"
                          border="3px solid"
                          borderColor="surface.card"
                          boxShadow={`0 0 20px ${cert.color}50`}
                        />
                      </Box>

                      {/* Card */}
                      <Box flex={1} w="100%">
                        <CertificateCard
                          cert={cert}
                          onViewDetails={handleViewDetails}
                        />
                      </Box>
                    </HStack>
                  ))}
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>

          {/* No Results Message */}
          {filteredCerts.length === 0 && !loading && (
            <Box textAlign="center" py={12}>
              <Text fontSize="lg" color="text.muted">
                No certificates found matching your criteria
              </Text>
            </Box>
          )}
        </VStack>
      </Container>

      {/* Certificate Detail Modal */}
      <CertificateDetailModal
        isOpen={isOpen}
        onClose={onClose}
        cert={selectedCert}
      />
    </Box>
  );
};

export default Certificates;