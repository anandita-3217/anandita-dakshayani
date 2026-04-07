// Projects.jsx — Dark-first cinematic portfolio component
// Stack: React 18 + Chakra UI v2 + Framer Motion + GSAP
// Search For now is ok but optimize it
import { useState, useRef, useEffect, useCallback } from "react";
import {
  Box,
  Flex,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  useColorModeValue,
  Portal,
} from "@chakra-ui/react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { gsap } from "gsap";

import { PROJECTS, ALL_TECH, ALL_USECASES, ALL_TYPES } from "./data/projects";


// ─── Motion primitives ───────────────────────────────────────────────────────
const MotionBox = motion.create(Box);

// TODO: On opening the page it auto scrolls to the bottom why?
const STATUS_META = {
  Live: { bg: "rgba(20,184,166,0.12)", border: "rgba(20,184,166,0.35)", color: "#14b8a6" },
  Beta: { bg: "rgba(232,197,71,0.12)", border: "rgba(232,197,71,0.35)", color: "#e8c547" },
  OSS: { bg: "rgba(124,58,237,0.12)", border: "rgba(124,58,237,0.35)", color: "#7c3aed" },
};

// ─── Sub-components ──────────────────────────────────────────────────────────

function SectionHeader({ eyebrow, line1, line2 }) {
  const eyebrowColor = useColorModeValue("#9ca3af", "rgba(255,255,255,0.35)");
  const line2Color = useColorModeValue("#2a2a2a", "rgba(255,255,255,0.18)");

  return (
    <Box mb={10}>
      {/* Eyebrow */}
      <Flex align="center" gap={3} mb={3}>
        <Box w="24px" h="1px" bgGradient="linear(to-r, #ec4899, #7c3aed)" flexShrink={0} />
        <Text
          fontFamily="'JetBrains Mono', monospace"
          fontSize="9px"
          letterSpacing="0.3em"
          textTransform="uppercase"
          color={eyebrowColor}
        >
          {eyebrow}
        </Text>
      </Flex>

      {/* Heading line 1 — gradient */}
      <Text
        fontFamily="'Orbitron', sans-serif"
        fontWeight={900}
        fontSize={{ base: "26px", md: "clamp(26px, 4vw, 40px)" }}
        letterSpacing="-0.02em"
        lineHeight={1.05}
        bgGradient="linear(to-r, #1e40af, #7c3aed, #ec4899)"
        bgClip="text"
        display="inline-block"
        w="fit-content"
      >
        {line1}
      </Text>

      {/* Heading line 2 — muted */}
      <Text
        fontFamily="'Orbitron', sans-serif"
        fontWeight={900}
        fontSize={{ base: "26px", md: "clamp(26px, 4vw, 40px)" }}
        letterSpacing="-0.02em"
        lineHeight={1.05}
        color={line2Color}
      >
        {line2}
      </Text>
    </Box>
  );
}

function FilterPill({ label, active, onClick, accent = "#7c3aed" }) {
  return (
    <MotionBox
      as="button"
      onClick={onClick}
      px={3}
      py={1}
      borderRadius="6px"
      border="1px solid"
      borderColor={active ? accent : "rgba(255,255,255,0.08)"}
      bg={active ? `${accent}18` : "rgba(255,255,255,0.03)"}
      color={accent}
      fontFamily="'JetBrains Mono', monospace"
      fontSize="9px"
      letterSpacing="0.18em"
      textTransform="uppercase"
      cursor="pointer"

      whiteSpace="nowrap"
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.15 }}
      style={{ transition: "all 0.18s cubic-bezier(0.23,1,0.32,1)" }}
      _hover={{
        borderColor: accent,
        color: accent,
        bg: `${accent}18`,
        transform: "translateY(-1px)",
      }}
    >
      {label}
    </MotionBox>
  );
}

function SuggestionDropdown({ suggestions, query, onSelect }) {
  const bg = useColorModeValue("rgba(247,247,248,0.97)", "rgba(10,10,10,0.97)");
  const borderColor = useColorModeValue("rgba(0,0,0,0.10)", "rgba(255,255,255,0.08)");
  const hoverBg = useColorModeValue("rgba(124,58,237,0.06)", "rgba(124,58,237,0.12)");
  const textColor = useColorModeValue("#1a1a1a", "rgba(255,255,255,0.85)");
  const dimColor = useColorModeValue("#6b7280", "rgba(255,255,255,0.35)");

  if (!suggestions.length || !query) return null;

  return (
    <AnimatePresence>
      <MotionBox
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.18 }}
        position="absolute"
        top="calc(100% + 6px)"
        left={0}
        right={0}
        zIndex={200}
        bg={bg}
        backdropFilter="blur(18px)"
        border="1px solid"
        borderColor={borderColor}
        borderRadius="12px"
        overflow="hidden"
        boxShadow="0 16px 40px rgba(0,0,0,0.35)"
      >
        {/* Top hairline */}
        <Box h="1px" bgGradient="linear(to-r, transparent, #7c3aed, transparent)" />

        {suggestions.map((s, i) => (
          <MotionBox
            key={s.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
            px={4}
            py={3}
            cursor="pointer"
            borderBottom={i < suggestions.length - 1 ? "1px solid" : "none"}
            borderColor={borderColor}
            _hover={{ bg: hoverBg }}
            onClick={() => onSelect(s)}
            style={{ transition: "background 0.15s ease" }}
          >
            <Flex justify="space-between" align="center">
              <Box>
                <Text
                  fontFamily="'Orbitron', sans-serif"
                  fontSize="11px"
                  fontWeight={700}
                  color={textColor}
                  letterSpacing="0.02em"
                >
                  {s.title}
                </Text>
                <Text
                  fontFamily="'Sora', sans-serif"
                  fontSize="11px"
                  color={dimColor}
                  mt={0.5}
                >
                  {s.tagline}
                </Text>
              </Box>
              <Box
                px={2}
                py={0.5}
                borderRadius="5px"
                border="1px solid"
                borderColor={`${s.accent}45`}
                bg={`${s.accent}10`}
                color={s.accent}
                fontFamily="'JetBrains Mono', monospace"
                fontSize="8px"
                letterSpacing="0.12em"
                textTransform="uppercase"
                flexShrink={0}
                ml={3}
              >
                {s.type}
              </Box>
            </Flex>
          </MotionBox>
        ))}
      </MotionBox>
    </AnimatePresence>
  );
}

function ProjectCard({ project, index, isHighlighted }) {
  const ref = useRef(null);
  // const glowRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const cardBg = useColorModeValue("rgba(247,247,248,0.92)", "rgba(10,10,10,0.82)");
  const borderColor = useColorModeValue("rgba(0,0,0,0.08)", "rgba(255,255,255,0.06)");
  const textColor = useColorModeValue("#1a1a1a", "rgba(255,255,255,0.88)");
  const descColor = useColorModeValue("#4b5563", "rgba(255,255,255,0.5)");
  const statLabelColor = useColorModeValue("#9ca3af", "rgba(255,255,255,0.3)");
  const cornerColor = "rgba(124,58,237,0.25)";

  

  const status = STATUS_META[project.status] || STATUS_META.Live;

  return (
    <MotionBox
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.23, 1, 0.32, 1] }}
      style={{ transformStyle: "preserve-3d" }}
      position="relative"
      role="group"
    >
      <Box
        position="relative"
        bg={cardBg}
        backdropFilter="blur(16px)"
        border="1px solid"
        borderColor={isHighlighted ? project.accent : borderColor}
        borderRadius="16px"
        overflow="hidden"
        p={{ base: 5, md: 6 }}
        h="full"
        style={{
          transition: "border-color 0.25s ease, box-shadow 0.25s ease",
          boxShadow: isHighlighted ? `0 0 0 1px ${project.accent}40` : "none",
        }}
        _groupHover={{
          borderColor: project.accent,
          boxShadow: `0 0 32px ${project.accent}20`,
        }}
      >
        {/* Top hairline */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          h="1px"
          bgGradient={`linear(to-r, transparent, ${project.accent}55, transparent)`}
        />

        {/* Corner brackets */}
        {[
          { top: "10px", left: "10px", borderTop: "2px solid", borderLeft: "2px solid" },
          { top: "10px", right: "10px", borderTop: "2px solid", borderRight: "2px solid" },
          { bottom: "10px", left: "10px", borderBottom: "2px solid", borderLeft: "2px solid" },
          { bottom: "10px", right: "10px", borderBottom: "2px solid", borderRight: "2px solid" },
        ].map((style, i) => (
          <Box
            key={i}
            position="absolute"
            w="14px"
            h="14px"
            borderColor={cornerColor}
            opacity={0}
            _groupHover={{ opacity: 1 }}
            style={{ transition: "opacity 0.2s ease", ...style }}
          />
        ))}

        {/* Header row */}
        <Flex justify="space-between" align="flex-start" mb={4}>
          <Box>
            {/* Live dot + Status */}
            <Flex align="center" gap={2} mb={2}>
              <Box
                w="6px"
                h="6px"
                borderRadius="50%"
                bg={project.accent}
                boxShadow={`0 0 6px ${project.accent}`}
              />
              <Box
                px={2}
                py={0.5}
                borderRadius="5px"
                border="1px solid"
                borderColor={status.border}
                bg={status.bg}
                color={status.color}
                fontFamily="'JetBrains Mono', monospace"
                fontSize="8px"
                letterSpacing="0.18em"
                textTransform="uppercase"
              >
                {project.status}
              </Box>
              <Text
                fontFamily="'JetBrains Mono', monospace"
                fontSize="9px"
                color={statLabelColor}
                letterSpacing="0.12em"
              >
                {project.year}
              </Text>
            </Flex>

            <Text
              fontFamily="'Orbitron', sans-serif"
              fontWeight={800}
              fontSize={{ base: "15px", md: "17px" }}
              letterSpacing="-0.01em"
              color={textColor}
              _groupHover={{ color: project.accent }}
              style={{ transition: "color 0.2s ease" }}
            >
              {project.title}
            </Text>
            <Text
              fontFamily="'Sora', sans-serif"
              fontSize="11px"
              color={descColor}
              mt={0.5}
            >
              {project.tagline}
            </Text>
          </Box>

          {/* Type badge */}
          <Box
            px={2.5}
            py={1}
            borderRadius="6px"
            border="1px solid"
            borderColor={`${project.accent}35`}
            bg={`${project.accent}10`}
            color={project.accent}
            fontFamily="'JetBrains Mono', monospace"
            fontSize="8px"
            letterSpacing="0.2em"
            textTransform="uppercase"
            flexShrink={0}
            ml={2}
          >
            {project.type}
          </Box>
        </Flex>

        {/* Description */}
        <Text
          fontFamily="'Sora', sans-serif"
          fontSize={{ base: "12px", md: "13px" }}
          color={descColor}
          lineHeight={1.7}
          mb={5}
        >
          {project.description}
        </Text>

        {/* Metrics */}
        <Flex gap={6} mb={5}>
          {project.metrics.map((m) => (
            <Box key={m.label}>
              <Text
                fontFamily="'Orbitron', sans-serif"
                fontWeight={800}
                fontSize={{ base: "18px", md: "22px" }}
                color={project.accent}
                _groupHover={{ textShadow: `0 0 20px ${project.accent}` }}
                style={{ transition: "text-shadow 0.25s ease" }}
              >
                {m.value}
              </Text>
              <Text
                fontFamily="'Sora', sans-serif"
                fontSize="10px"
                letterSpacing="0.12em"
                textTransform="uppercase"
                color={statLabelColor}
              >
                {m.label}
              </Text>
            </Box>
          ))}
        </Flex>

        {/* Divider */}
        <Box h="1px" bgGradient="linear(to-r, transparent, rgba(124,58,237,0.35), transparent)" mb={4} />

        {/* Tech Stack pills */}
        <Flex flexWrap="wrap" gap={1.5} mb={4}>
          {project.techStack.map((t) => (
            <Box
              key={t}
              px={2}
              py={0.5}
              borderRadius="5px"
              border="1px solid"
              borderColor="rgba(255,255,255,0.08)"
              bg="rgba(255,255,255,0.04)"
              color={descColor}
              fontFamily="'JetBrains Mono', monospace"
              fontSize="8px"
              letterSpacing="0.12em"
              textTransform="uppercase"
            >
              {t}
            </Box>
          ))}
        </Flex>

        {/* Use case pills */}
        <Flex flexWrap="wrap" gap={1.5} mb={5}>
          {project.useCase.map((u) => (
            <Box
              key={u}
              px={2}
              py={0.5}
              borderRadius="5px"
              border="1px solid"
              borderColor={`${project.accent}28`}
              bg={`${project.accent}08`}
              color={project.accent}
              fontFamily="'JetBrains Mono', monospace"
              fontSize="8px"
              letterSpacing="0.12em"
              textTransform="uppercase"
            >
              {u}
            </Box>
          ))}
        </Flex>

        {/* CTA */}
        <MotionBox
          as="a"
          href={project.url}
          display="inline-flex"
          alignItems="center"
          gap={2}
          px={4}
          py={2}
          borderRadius="8px"
          border="1px solid"
          borderColor={`${project.accent}35`}
          bg={`${project.accent}10`}
          color={project.accent}
          fontFamily="'JetBrains Mono', monospace"
          fontSize="9px"
          letterSpacing="0.18em"
          textTransform="uppercase"
          cursor="pointer"
          textDecoration="none"
          whileHover={{ y: -1, backgroundColor: `${project.accent}20` }}
          whileTap={{ scale: 0.97 }}
          style={{ transition: "all 0.18s cubic-bezier(0.23,1,0.32,1)" }}
        >
          <Box as="span">View Project</Box>
          <Box as="span" fontSize="12px">→</Box>
        </MotionBox>
      </Box>
    </MotionBox>
  );
}

// ─── Tab Group ────────────────────────────────────────────────────────────────
function FilterTabGroup({ label, options, active, onChange, accent }) {
  const dividerColor = useColorModeValue("rgba(0,0,0,0.06)", "rgba(255,255,255,0.06)");
  // const labelColor = useColorModeValue("#9ca3af", "rgba(255,255,255,0.28)");
  const labelColor = useColorModeValue("#9ca3af", "rgba(255,255,255,0.28)");

  return (
    <Box>
      <Text
        fontFamily="'JetBrains Mono', monospace"
        fontSize="8px"
        letterSpacing="0.2em"
        textTransform="uppercase"
        color={labelColor}
        mb={2}
      >
        {label}
      </Text>
      <Flex flexWrap="wrap" gap={1.5}>
        <FilterPill
          label="All"
          active={active.length === 0}
          onClick={() => onChange([])}
          accent={accent}
        />
        {options.map((o) => (
          <FilterPill
            key={o}
            label={o}
            active={active.includes(o)}
            onClick={() =>
              onChange(active.includes(o) ? active.filter((x) => x !== o) : [...active, o])
            }
            accent={accent}
          />
        ))}
      </Flex>
    </Box>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Projects() {
  const [query, setQuery] = useState("");
  const [techFilters, setTechFilters] = useState([]);
  const [useCaseFilters, setUseCaseFilters] = useState([]);
  const [typeFilters, setTypeFilters] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedId, setHighlightedId] = useState(null);
  const searchRef = useRef(null);
  const counterRef = useRef(null);
  const prevCount = useRef(0);

  const inputBg = useColorModeValue("rgba(247,247,248,0.92)", "rgba(10,10,10,0.82)");
  const inputBorder = useColorModeValue("rgba(0,0,0,0.10)", "rgba(255,255,255,0.08)");
  const inputColor = useColorModeValue("#1a1a1a", "rgba(255,255,255,0.85)");
  const placeholderColor = useColorModeValue("#9ca3af", "rgba(255,255,255,0.25)");
  const filterBg = useColorModeValue("rgba(247,247,248,0.90)", "rgba(10,10,10,0.76)");
  const filterBorder = useColorModeValue("rgba(0,0,0,0.08)", "rgba(255,255,255,0.06)");

  // Search logic
  const getSuggestions = useCallback((q) => {
    if (!q || q.length < 2) return [];
    const lower = q.toLowerCase();
    return PROJECTS.filter(
      (p) =>
        p.title.toLowerCase().includes(lower) ||
        p.description.toLowerCase().includes(lower) ||
        p.tagline.toLowerCase().includes(lower) ||
        p.techStack.some((t) => t.toLowerCase().includes(lower)) ||
        p.useCase.some((u) => u.toLowerCase().includes(lower))
    );
  }, []);

  const filteredProjects = PROJECTS.filter((p) => {
    const q = query.toLowerCase();
    const matchesQuery =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tagline.toLowerCase().includes(q) ||
      p.techStack.some((t) => t.toLowerCase().includes(q)) ||
      p.useCase.some((u) => u.toLowerCase().includes(q));

    const matchesTech = techFilters.length === 0 || techFilters.every((t) => p.techStack.includes(t));
    const matchesUse = useCaseFilters.length === 0 || useCaseFilters.some((u) => p.useCase.includes(u));
    const matchesType = typeFilters.length === 0 || typeFilters.includes(p.type);

    return matchesQuery && matchesTech && matchesUse && matchesType;
  });

  // GSAP counter animation on result count change
  useEffect(() => {
    if (!counterRef.current) return;
    const target = filteredProjects.length;
    gsap.fromTo(
      counterRef.current,
      { textContent: prevCount.current },
      {
        textContent: target,
        duration: 0.5,
        ease: "power2.out",
        snap: { textContent: 1 },
        onUpdate() {
          if (counterRef.current) {
            counterRef.current.textContent = Math.round(
              parseFloat(counterRef.current.textContent)
            );
          }
        },
      }
    );
    prevCount.current = target;
  }, [filteredProjects.length]);

  const handleQueryChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    const s = getSuggestions(val);
    setSuggestions(s);
    setShowSuggestions(true);
    setHighlightedId(null);
  };

  const handleSelectSuggestion = (project) => {
    setQuery(project.title);
    setShowSuggestions(false);
    setHighlightedId(project.id);
    setTimeout(() => setHighlightedId(null), 2000);
  };

  // Click-away
  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const activeFilterCount =
    techFilters.length + useCaseFilters.length + typeFilters.length;

  return (
    <Box
      as="section"
      bg="transparent"
      px={{ base: 5, md: 12, lg: 20 }}
      py={{ base: 20, md: 16 }}
    >
      <Flex direction="column" align="flex-start" w="full" maxW="1200px" mx="auto" gap={8}>
        {/* ── Section Header ── */}
        <SectionHeader
          eyebrow="Selected Work"
          line1="Projects that"
          line2="ship and scale."
        />

        {/* ── Search + Filters ── */}
        <Box
          w="full"
          bg={filterBg}
          backdropFilter="blur(16px)"
          border="1px solid"
          borderColor={filterBorder}
          borderRadius="16px"
          p={{ base: 4, md: 6 }}
          position="relative"
        >
          {/* Top hairline */}
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            h="1px"
            borderRadius="16px 16px 0 0"
            bgGradient="linear(to-r, transparent, rgba(124,58,237,0.35), transparent)"
          />

          {/* Search Bar */}
          <Box position="relative" ref={searchRef} mb={6}>
            <InputGroup>
              <InputLeftElement pointerEvents="none" h="full" pl={4}>
                <Text fontSize="14px" color={placeholderColor}>⌕</Text>
              </InputLeftElement>
              <Input
                value={query}
                onChange={handleQueryChange}
                onFocus={() => query.length >= 2 && setShowSuggestions(true)}
                placeholder="Search by title, tech, use case…"
                bg={inputBg}
                backdropFilter="blur(8px)"
                border="1px solid"
                borderColor={inputBorder}
                borderRadius="10px"
                color={inputColor}
                fontFamily="'Sora', sans-serif"
                fontSize="13px"
                h="46px"
                pl={10}
                _placeholder={{ color: placeholderColor, fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", letterSpacing: "0.08em" }}
                _focus={{ borderColor: "rgba(124,58,237,0.5)", boxShadow: "0 0 0 1px rgba(124,58,237,0.25)", outline: "none" }}
                _hover={{ borderColor: "rgba(124,58,237,0.3)" }}
              />
            </InputGroup>

            {showSuggestions && (
              <SuggestionDropdown
                suggestions={suggestions}
                query={query}
                onSelect={handleSelectSuggestion}
              />
            )}
          </Box>

          {/* Filter Groups */}
          <Flex direction="column" gap={5}>
            <FilterTabGroup
              label="Tech Stack"
              options={ALL_TECH}
              active={techFilters}
              onChange={setTechFilters}
              color={inputColor}
              accent="#14b8a6"
            />
            <FilterTabGroup
              label="Use Case"
              options={ALL_USECASES}
              active={useCaseFilters}
              onChange={setUseCaseFilters}
              accent="#7c3aed"
            />
            <FilterTabGroup
              label="Type"
              options={ALL_TYPES}
              active={typeFilters}
              onChange={setTypeFilters}
              accent="#ec4899"
            />
          </Flex>

          {/* Clear all */}
          <AnimatePresence>
            {activeFilterCount > 0 && (
              <MotionBox
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                mt={4}
              >
                <MotionBox
                  as="button"
                  onClick={() => {
                    setTechFilters([]);
                    setUseCaseFilters([]);
                    setTypeFilters([]);
                    setQuery("");
                  }}
                  px={3}
                  py={1}
                  borderRadius="6px"
                  border="1px solid rgba(239,68,68,0.3)"
                  bg="rgba(239,68,68,0.08)"
                  color="rgba(239,68,68,0.8)"
                  fontFamily="'JetBrains Mono', monospace"
                  fontSize="9px"
                  letterSpacing="0.18em"
                  textTransform="uppercase"
                  cursor="pointer"
                  whileTap={{ scale: 0.96 }}
                  style={{ transition: "all 0.18s ease" }}
                  _hover={{ bg: "rgba(239,68,68,0.14)" }}
                >
                  Clear {activeFilterCount} filter{activeFilterCount > 1 ? "s" : ""}
                </MotionBox>
              </MotionBox>
            )}
          </AnimatePresence>
        </Box>

        {/* ── Results Meta ── */}
        <Flex align="center" gap={4} w="full">
          <Flex align="baseline" gap={1.5}>
            <Text
              ref={counterRef}
              fontFamily="'Orbitron', sans-serif"
              fontWeight={800}
              fontSize="28px"
              color="#14b8a6"
            >
              {filteredProjects.length}
            </Text>
            <Text
              fontFamily="'Sora', sans-serif"
              fontSize="11px"
              letterSpacing="0.12em"
              textTransform="uppercase"
              color="rgba(255,255,255,0.3)"
            >
              {filteredProjects.length === 1 ? "project" : "projects"}
            </Text>
          </Flex>
          <Box flex={1} h="1px" bgGradient="linear(to-r, rgba(124,58,237,0.3), transparent)" />
        </Flex>

        {/* ── Project Grid ── */}
        <AnimatePresence mode="wait">
          {filteredProjects.length > 0 ? (
            <SimpleGrid
              key="grid"
              columns={{ base: 1, md: 2, xl: 3 }}
              spacing={{ base: 4, md: 5 }}
              w="full"
            >
              {filteredProjects.map((p, i) => (
                <ProjectCard
                  key={p.id}
                  project={p}
                  index={i}
                  isHighlighted={p.id === highlightedId}
                />
              ))}
            </SimpleGrid>
          ) : (
            <MotionBox
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              w="full"
              py={20}
              textAlign="center"
            >
              <Text
                fontFamily="'Orbitron', sans-serif"
                fontSize="13px"
                letterSpacing="0.15em"
                color="rgba(255,255,255,0.18)"
                textTransform="uppercase"
              >
                No projects match those filters
              </Text>
              <Text
                fontFamily="'JetBrains Mono', monospace"
                fontSize="10px"
                color="rgba(255,255,255,0.1)"
                mt={2}
                letterSpacing="0.1em"
              >
                try clearing some filters
              </Text>
            </MotionBox>
          )}
        </AnimatePresence>
      </Flex>
    </Box>
  );
}