// ProjectsFilterBar.jsx
// Collapsible ecommerce-style filter bar — drop-in for the filter region in Projects.jsx
// Dropdowns for Tech Stack, Use Case, Type + Sort control + active filter chips
// Stack: React 18 + Chakra UI v2 + Framer Motion
// TODO: Doesnt work well the the drop downs arent showinf wnything - the search bar isnt suggesting anything
// TODO: Get rid of the code for icons svgs just call icons from some ui lib
import { useState, useRef, useEffect, useCallback } from "react";
import { Box, Flex, Text, Input, InputGroup, InputLeftElement, useColorModeValue } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";

const MotionBox = motion.create(Box);

// ── Icons (inline SVG — no extra dep) ────────────────────────────────────────
const Icon = {
  Search: () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M9.5 9.5L12 12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  ),
  ChevronDown: ({ flipped }) => (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
      style={{ transform: flipped ? "rotate(180deg)" : "none", transition: "transform 0.2s ease" }}>
      <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Filter: () => (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path d="M1 2.5h11M3 6.5h7M5 10.5h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  ),
  Sort: () => (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path d="M1 3h8M1 6.5h5.5M1 10h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M10 2v9M10 11l2-2M10 11l-2-2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  X: () => (
    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
      <path d="M1 1l6 6M7 1L1 7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  ),
  Check: () => (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path d="M1.5 5l2.5 2.5L8.5 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Clock: () => (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
      <circle cx="5.5" cy="5.5" r="4.5" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M5.5 3v2.5l1.5 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
  Stack: () => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M6 1L11 3.5L6 6L1 3.5L6 1Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M1 6l5 2.5L11 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M1 8.5l5 2.5 5-2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
  Tag: () => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M1 1h4.5l5.5 5.5-4.5 4.5L1 5.5V1Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
      <circle cx="3.5" cy="3.5" r="1" fill="currentColor"/>
    </svg>
  ),
  Grid: () => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <rect x="1" y="1" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.2"/>
      <rect x="7" y="1" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.2"/>
      <rect x="1" y="7" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.2"/>
      <rect x="7" y="7" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.2"/>
    </svg>
  ),
};

const SORT_OPTIONS = [
  { value: "latest",   label: "Latest first",  icon: "↓" },
  { value: "oldest",   label: "Oldest first",  icon: "↑" },
  { value: "az",       label: "A → Z",         icon: "Az" },
];

// ── Dropdown component ────────────────────────────────────────────────────────
function FilterDropdown({ label, icon, options, selected, onChange, accent }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const bg        = useColorModeValue("rgba(247,247,248,0.98)", "rgba(10,10,10,0.98)");
  const borderCol = useColorModeValue("rgba(0,0,0,0.09)", "rgba(255,255,255,0.07)");
  const textColor = useColorModeValue("#111", "rgba(255,255,255,0.88)");
  const dimColor  = useColorModeValue("#6b7280", "rgba(255,255,255,0.35)");
  const hoverBg   = useColorModeValue("rgba(124,58,237,0.05)", "rgba(124,58,237,0.10)");
  const btnBg     = useColorModeValue("rgba(247,247,248,0.92)", "rgba(10,10,10,0.82)");

  // Click-away
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const hasActive = selected.length > 0;

  const toggle = (opt) => {
    onChange(selected.includes(opt)
      ? selected.filter((x) => x !== opt)
      : [...selected, opt]
    );
  };

  return (
    <Box ref={ref} position="relative">
      {/* Trigger button */}
      <Flex
        as="button"
        align="center"
        gap={2}
        px={3}
        py={2}
        borderRadius="9px"
        border="1px solid"
        borderColor={hasActive ? `${accent}50` : borderCol}
        bg={hasActive ? `${accent}0e` : btnBg}
        backdropFilter="blur(10px)"
        color={hasActive ? accent : dimColor}
        cursor="pointer"
        onClick={() => setOpen((o) => !o)}
        style={{ transition: "all 0.18s ease" }}
        _hover={{ borderColor: `${accent}40`, color: accent }}
        whiteSpace="nowrap"
      >
        <Box color={hasActive ? accent : dimColor} display="flex" alignItems="center">
          {icon}
        </Box>
        <Text fontFamily="'JetBrains Mono', monospace" fontSize="9px"
          letterSpacing="0.16em" textTransform="uppercase">
          {label}
        </Text>
        {hasActive && (
          <Flex
            w="16px" h="16px" borderRadius="50%"
            bg={accent} color="white"
            align="center" justify="center"
            fontFamily="'JetBrains Mono', monospace" fontSize="8px"
            fontWeight={700}
          >
            {selected.length}
          </Flex>
        )}
        <Icon.ChevronDown flipped={open} />
      </Flex>

      {/* Dropdown panel */}
      <AnimatePresence>
        {open && (
          <MotionBox
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }}
            position="absolute"
            top="calc(100% + 6px)"
            left={0}
            zIndex={200}
            minW="200px"
            maxW="260px"
            bg={bg}
            backdropFilter="blur(20px)"
            border="1px solid"
            borderColor={borderCol}
            borderRadius="12px"
            overflow="hidden"
            boxShadow="0 12px 40px rgba(0,0,0,0.28)"
          >
            {/* Top accent */}
            <Box h="1px" bgGradient={`linear(to-r, transparent, ${accent}55, transparent)`} />

            {/* Clear row */}
            {hasActive && (
              <Flex
                px={3} py={2}
                borderBottom="1px solid"
                borderColor={borderCol}
                justify="space-between"
                align="center"
              >
                <Text fontFamily="'JetBrains Mono', monospace" fontSize="8px"
                  letterSpacing="0.15em" textTransform="uppercase" color={dimColor}>
                  {selected.length} selected
                </Text>
                <Box
                  as="button"
                  onClick={() => onChange([])}
                  fontFamily="'JetBrains Mono', monospace"
                  fontSize="8px" letterSpacing="0.12em" textTransform="uppercase"
                  color="rgba(239,68,68,0.7)" cursor="pointer"
                  _hover={{ color: "rgba(239,68,68,1)" }}
                  style={{ transition: "color 0.15s ease" }}
                >
                  Clear
                </Box>
              </Flex>
            )}

            {/* Options list */}
            <Box maxH="220px" overflowY="auto"
              css={{
                "&::-webkit-scrollbar": { width: "3px" },
                "&::-webkit-scrollbar-thumb": { background: `${accent}40`, borderRadius: "3px" },
              }}
            >
              {options.map((opt, i) => {
                const active = selected.includes(opt);
                return (
                  <Flex
                    key={opt}
                    as="button"
                    align="center"
                    gap={3}
                    px={3} py={2.5}
                    w="full"
                    cursor="pointer"
                    bg={active ? `${accent}0e` : "transparent"}
                    borderBottom={i < options.length - 1 ? "1px solid" : "none"}
                    borderColor={borderCol}
                    onClick={() => toggle(opt)}
                    style={{ transition: "background 0.12s ease" }}
                    _hover={{ bg: active ? `${accent}16` : hoverBg }}
                  >
                    {/* Checkbox */}
                    <Flex
                      w="14px" h="14px" borderRadius="4px"
                      border="1px solid"
                      borderColor={active ? accent : borderCol}
                      bg={active ? accent : "transparent"}
                      align="center" justify="center"
                      flexShrink={0}
                      color="white"
                      style={{ transition: "all 0.15s ease" }}
                    >
                      {active && <Icon.Check />}
                    </Flex>
                    <Text
                      fontFamily="'Sora', sans-serif"
                      fontSize="12px"
                      color={active ? accent : textColor}
                      style={{ transition: "color 0.15s ease" }}
                      flex={1}
                      textAlign="left"
                    >
                      {opt}
                    </Text>
                  </Flex>
                );
              })}
            </Box>
          </MotionBox>
        )}
      </AnimatePresence>
    </Box>
  );
}

// ── Sort dropdown ─────────────────────────────────────────────────────────────
function SortDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const bg        = useColorModeValue("rgba(247,247,248,0.98)", "rgba(10,10,10,0.98)");
  const borderCol = useColorModeValue("rgba(0,0,0,0.09)", "rgba(255,255,255,0.07)");
  const textColor = useColorModeValue("#111", "rgba(255,255,255,0.88)");
  const dimColor  = useColorModeValue("#6b7280", "rgba(255,255,255,0.35)");
  const hoverBg   = useColorModeValue("rgba(20,184,166,0.05)", "rgba(20,184,166,0.10)");
  const btnBg     = useColorModeValue("rgba(247,247,248,0.92)", "rgba(10,10,10,0.82)");
  const accent    = "#14b8a6";

  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const current = SORT_OPTIONS.find((s) => s.value === value) || SORT_OPTIONS[0];

  return (
    <Box ref={ref} position="relative">
      <Flex
        as="button"
        align="center"
        gap={2}
        px={3} py={2}
        borderRadius="9px"
        border="1px solid"
        borderColor={borderCol}
        bg={btnBg}
        backdropFilter="blur(10px)"
        color={dimColor}
        cursor="pointer"
        onClick={() => setOpen((o) => !o)}
        style={{ transition: "all 0.18s ease" }}
        _hover={{ borderColor: `${accent}40`, color: accent }}
        whiteSpace="nowrap"
      >
        <Box display="flex" alignItems="center"><Icon.Sort /></Box>
        <Text fontFamily="'JetBrains Mono', monospace" fontSize="9px"
          letterSpacing="0.16em" textTransform="uppercase">
          {current.label}
        </Text>
        <Icon.ChevronDown flipped={open} />
      </Flex>

      <AnimatePresence>
        {open && (
          <MotionBox
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }}
            position="absolute"
            top="calc(100% + 6px)"
            right={0}
            zIndex={200}
            minW="170px"
            bg={bg}
            backdropFilter="blur(20px)"
            border="1px solid"
            borderColor={borderCol}
            borderRadius="12px"
            overflow="hidden"
            boxShadow="0 12px 40px rgba(0,0,0,0.28)"
          >
            <Box h="1px" bgGradient={`linear(to-r, transparent, ${accent}55, transparent)`} />
            {SORT_OPTIONS.map((opt, i) => {
              const active = value === opt.value;
              return (
                <Flex
                  key={opt.value}
                  as="button"
                  align="center"
                  gap={3}
                  px={3} py={2.5}
                  w="full"
                  cursor="pointer"
                  bg={active ? `${accent}0e` : "transparent"}
                  borderBottom={i < SORT_OPTIONS.length - 1 ? "1px solid" : "none"}
                  borderColor={borderCol}
                  onClick={() => { onChange(opt.value); setOpen(false); }}
                  style={{ transition: "background 0.12s ease" }}
                  _hover={{ bg: hoverBg }}
                >
                  <Text
                    fontFamily="'JetBrains Mono', monospace"
                    fontSize="10px"
                    color={active ? accent : dimColor}
                    w="18px" textAlign="center"
                    flexShrink={0}
                  >
                    {opt.icon}
                  </Text>
                  <Text
                    fontFamily="'Sora', sans-serif"
                    fontSize="12px"
                    color={active ? accent : textColor}
                    style={{ transition: "color 0.12s ease" }}
                  >
                    {opt.label}
                  </Text>
                  {active && (
                    <Box ml="auto" color={accent}><Icon.Check /></Box>
                  )}
                </Flex>
              );
            })}
          </MotionBox>
        )}
      </AnimatePresence>
    </Box>
  );
}

// ── Active filter chips ───────────────────────────────────────────────────────
function ActiveChips({ techFilters, useCaseFilters, typeFilters, query,
  setTechFilters, setUseCaseFilters, setTypeFilters, setQuery }) {

  const dimColor = useColorModeValue("#6b7280", "rgba(255,255,255,0.35)");
  const chips = [
    ...techFilters.map((v)     => ({ label: v, accent: "#14b8a6", onRemove: () => setTechFilters((p) => p.filter((x) => x !== v)) })),
    ...useCaseFilters.map((v)  => ({ label: v, accent: "#7c3aed", onRemove: () => setUseCaseFilters((p) => p.filter((x) => x !== v)) })),
    ...typeFilters.map((v)     => ({ label: v, accent: "#ec4899", onRemove: () => setTypeFilters((p) => p.filter((x) => x !== v)) })),
    ...(query ? [{ label: `"${query}"`, accent: "#e8c547", onRemove: () => setQuery("") }] : []),
  ];

  if (!chips.length) return null;

  return (
    <MotionBox
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      overflow="hidden"
    >
      <Flex align="center" gap={2} flexWrap="wrap" pt={3}>
        <Text fontFamily="'JetBrains Mono', monospace" fontSize="8px"
          letterSpacing="0.18em" textTransform="uppercase" color={dimColor} flexShrink={0}>
          Active:
        </Text>
        {chips.map((chip) => (
          <MotionBox
            key={chip.label}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            layout
          >
            <Flex
              align="center" gap={1.5}
              px={2.5} py={1}
              borderRadius="6px"
              border="1px solid"
              borderColor={`${chip.accent}35`}
              bg={`${chip.accent}0e`}
            >
              <Text fontFamily="'JetBrains Mono', monospace" fontSize="9px"
                letterSpacing="0.1em" textTransform="uppercase" color={chip.accent}>
                {chip.label}
              </Text>
              <Box
                as="button"
                onClick={chip.onRemove}
                color={`${chip.accent}80`}
                cursor="pointer"
                display="flex"
                alignItems="center"
                _hover={{ color: chip.accent }}
                style={{ transition: "color 0.12s ease" }}
              >
                <Icon.X />
              </Box>
            </Flex>
          </MotionBox>
        ))}

        {/* Clear all */}
        <Box
          as="button"
          onClick={() => {
            setTechFilters([]); setUseCaseFilters([]);
            setTypeFilters([]); setQuery("");
          }}
          px={2.5} py={1}
          borderRadius="6px"
          border="1px solid rgba(239,68,68,0.25)"
          bg="rgba(239,68,68,0.06)"
          color="rgba(239,68,68,0.7)"
          fontFamily="'JetBrains Mono', monospace"
          fontSize="8px" letterSpacing="0.15em" textTransform="uppercase"
          cursor="pointer"
          style={{ transition: "all 0.15s ease" }}
          _hover={{ bg: "rgba(239,68,68,0.12)", color: "rgba(239,68,68,1)" }}
        >
          Clear all
        </Box>
      </Flex>
    </MotionBox>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
export default function ProjectsFilterBar({
  // Search
  query, setQuery,
  suggestions, showSuggestions, setShowSuggestions,
  onSelectSuggestion,
  // Filters
  techFilters, setTechFilters,
  useCaseFilters, setUseCaseFilters,
  typeFilters, setTypeFilters,
  allTech, allUseCases, allTypes,
  // Sort
  sortOrder, setSortOrder,
  // Results
  resultCount,
}) {
  const [filtersOpen, setFiltersOpen] = useState(true);
  const searchRef = useRef(null);

  const cardBg      = useColorModeValue("rgba(247,247,248,0.90)", "rgba(10,10,10,0.80)");
  const borderColor = useColorModeValue("rgba(0,0,0,0.08)", "rgba(255,255,255,0.06)");
  const inputBg     = useColorModeValue("rgba(255,255,255,0.85)", "rgba(255,255,255,0.04)");
  const inputBorderColor = useColorModeValue("rgba(0,0,0,0.09)", "rgba(255,255,255,0.07)");
  const textColor   = useColorModeValue("#111", "rgba(255,255,255,0.88)");
  const dimColor    = useColorModeValue("#6b7280", "rgba(255,255,255,0.35)");
  const placeholderColor = useColorModeValue("#9ca3af", "rgba(255,255,255,0.22)");
  const suggBg      = useColorModeValue("rgba(247,247,248,0.98)", "rgba(10,10,10,0.98)");

  const activeFilterCount = techFilters.length + useCaseFilters.length + typeFilters.length + (query ? 1 : 0);

  // Click-away for suggestions
  useEffect(() => {
    const h = (e) => { if (searchRef.current && !searchRef.current.contains(e.target)) setShowSuggestions(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [setShowSuggestions]);

  return (
    <Box
      bg={cardBg}
      backdropFilter="blur(16px)"
      border="1px solid"
      borderColor={borderColor}
      borderRadius="16px"
      overflow="visible"
      position="relative"
      mb={6}
    >
      {/* Top hairline */}
      <Box position="absolute" top={0} left={0} right={0} h="1px" borderRadius="16px 16px 0 0"
        bgGradient="linear(to-r, transparent, rgba(124,58,237,0.35), transparent)" />

      {/* ── Top bar: search + controls ── */}
      <Flex align="center" gap={3} px={{ base: 4, md: 5 }} py={4} flexWrap="wrap">

        {/* Search */}
        <Box ref={searchRef} flex={1} minW="200px" position="relative">
          <Flex
            align="center"
            gap={2.5}
            px={3.5} py={2.5}
            borderRadius="10px"
            border="1px solid"
            borderColor={inputBorderColor}
            bg={inputBg}
            backdropFilter="blur(8px)"
            style={{ transition: "border-color 0.18s ease, box-shadow 0.18s ease" }}
            _focusWithin={{
              borderColor: "rgba(124,58,237,0.5)",
              boxShadow: "0 0 0 1px rgba(124,58,237,0.2)",
            }}
          >
            <Box color={placeholderColor} display="flex" alignItems="center" flexShrink={0}>
              <Icon.Search />
            </Box>
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => suggestions?.length && setShowSuggestions(true)}
              placeholder="Search projects, tech, use case…"
              variant="unstyled"
              fontFamily="'Sora', sans-serif"
              fontSize="13px"
              color={textColor}
              _placeholder={{ color: placeholderColor, fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "0.06em" }}
            />
            {query && (
              <Box
                as="button"
                onClick={() => setQuery("")}
                color={placeholderColor}
                display="flex" alignItems="center"
                cursor="pointer"
                _hover={{ color: textColor }}
                style={{ transition: "color 0.12s ease" }}
              >
                <Icon.X />
              </Box>
            )}
          </Flex>

          {/* Suggestions dropdown */}
          <AnimatePresence>
            {showSuggestions && suggestions?.length > 0 && (
              <MotionBox
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15 }}
                position="absolute"
                top="calc(100% + 6px)"
                left={0} right={0}
                zIndex={300}
                bg={suggBg}
                backdropFilter="blur(20px)"
                border="1px solid"
                borderColor={inputBorderColor}
                borderRadius="12px"
                overflow="hidden"
                boxShadow="0 12px 40px rgba(0,0,0,0.25)"
              >
                <Box h="1px" bgGradient="linear(to-r, transparent, #7c3aed55, transparent)" />
                {suggestions.map((s, i) => (
                  <Flex
                    key={s.id}
                    align="center" gap={3}
                    px={4} py={3}
                    cursor="pointer"
                    borderBottom={i < suggestions.length - 1 ? "1px solid" : "none"}
                    borderColor={inputBorderColor}
                    onClick={() => onSelectSuggestion(s)}
                    style={{ transition: "background 0.12s ease" }}
                    _hover={{ bg: useColorModeValue("rgba(124,58,237,0.05)", "rgba(124,58,237,0.10)") }}
                  >
                    <Box
                      w="6px" h="6px" borderRadius="50%"
                      bg={s.accent} flexShrink={0}
                    />
                    <Box flex={1} minW={0}>
                      <Text fontFamily="'Orbitron', sans-serif" fontWeight={700}
                        fontSize="11px" color={textColor} noOfLines={1}>
                        {s.title}
                      </Text>
                      <Text fontFamily="'Sora', sans-serif" fontSize="10px"
                        color={dimColor} noOfLines={1}>{s.tagline}</Text>
                    </Box>
                    <Box px={2} py={0.5} borderRadius="4px"
                      border="1px solid" borderColor={`${s.accent}35`}
                      bg={`${s.accent}0e`} color={s.accent}
                      fontFamily="'JetBrains Mono', monospace"
                      fontSize="7px" letterSpacing="0.12em" textTransform="uppercase"
                      flexShrink={0}>
                      {s.type}
                    </Box>
                  </Flex>
                ))}
              </MotionBox>
            )}
          </AnimatePresence>
        </Box>

        {/* Divider */}
        <Box w="1px" h="28px" bg={borderColor} display={{ base: "none", md: "block" }} flexShrink={0} />

        {/* Filter toggle button */}
        <Flex
          as="button"
          align="center" gap={2}
          px={3} py={2}
          borderRadius="9px"
          border="1px solid"
          borderColor={filtersOpen ? "rgba(124,58,237,0.4)" : borderColor}
          bg={filtersOpen ? "rgba(124,58,237,0.08)" : "transparent"}
          color={filtersOpen ? "#7c3aed" : dimColor}
          cursor="pointer"
          onClick={() => setFiltersOpen((o) => !o)}
          style={{ transition: "all 0.18s ease" }}
          _hover={{ borderColor: "rgba(124,58,237,0.35)", color: "#7c3aed" }}
          whiteSpace="nowrap"
          flexShrink={0}
        >
          <Icon.Filter />
          <Text fontFamily="'JetBrains Mono', monospace" fontSize="9px"
            letterSpacing="0.16em" textTransform="uppercase">
            Filters
          </Text>
          {activeFilterCount > 0 && (
            <Flex w="16px" h="16px" borderRadius="50%"
              bg="#7c3aed" color="white"
              align="center" justify="center"
              fontFamily="'JetBrains Mono', monospace" fontSize="8px" fontWeight={700}>
              {activeFilterCount}
            </Flex>
          )}
          <Icon.ChevronDown flipped={filtersOpen} />
        </Flex>

        {/* Sort dropdown — always visible */}
        <Box flexShrink={0}>
          <SortDropdown value={sortOrder} onChange={setSortOrder} />
        </Box>

        {/* Result count */}
        <Flex align="baseline" gap={1} ml={{ base: 0, md: "auto" }} flexShrink={0}>
          <Text fontFamily="'Orbitron', sans-serif" fontWeight={800}
            fontSize="20px" color="#14b8a6">
            {resultCount}
          </Text>
          <Text fontFamily="'Sora', sans-serif" fontSize="10px"
            letterSpacing="0.12em" textTransform="uppercase" color={dimColor}>
            {resultCount === 1 ? "project" : "projects"}
          </Text>
        </Flex>
      </Flex>

      {/* ── Collapsible filter panel ── */}
      <AnimatePresence initial={false}>
        {filtersOpen && (
          <MotionBox
            key="filters"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
            overflow="hidden"
          >
            <Box
              borderTop="1px solid"
              borderColor={borderColor}
              px={{ base: 4, md: 5 }}
              py={4}
            >
              <Flex align="center" gap={3} flexWrap="wrap">
                {/* Filter dropdowns */}
                <FilterDropdown
                  label="Tech Stack"
                  icon={<Icon.Stack />}
                  options={allTech}
                  selected={techFilters}
                  onChange={setTechFilters}
                  accent="#14b8a6"
                />
                <FilterDropdown
                  label="Use Case"
                  icon={<Icon.Tag />}
                  options={allUseCases}
                  selected={useCaseFilters}
                  onChange={setUseCaseFilters}
                  accent="#7c3aed"
                />
                <FilterDropdown
                  label="Type"
                  icon={<Icon.Grid />}
                  options={allTypes}
                  selected={typeFilters}
                  onChange={setTypeFilters}
                  accent="#ec4899"
                />
              </Flex>

              {/* Active chips */}
              <AnimatePresence>
                {activeFilterCount > 0 && (
                  <ActiveChips
                    techFilters={techFilters}
                    useCaseFilters={useCaseFilters}
                    typeFilters={typeFilters}
                    query={query}
                    setTechFilters={setTechFilters}
                    setUseCaseFilters={setUseCaseFilters}
                    setTypeFilters={setTypeFilters}
                    setQuery={setQuery}
                  />
                )}
              </AnimatePresence>
            </Box>
          </MotionBox>
        )}
      </AnimatePresence>
    </Box>
  );
}

// ── Integration into Projects.jsx ─────────────────────────────────────────────
//
// 1. Add sortOrder state:
//    const [sortOrder, setSortOrder] = useState("latest");
//
// 2. Add sort to your filter chain:
//    const filteredProjects = PROJECTS
//      .filter(p => { ...existing logic... })
//      .sort((a, b) => {
//        if (sortOrder === "latest") return parseInt(b.year) - parseInt(a.year);
//        if (sortOrder === "oldest") return parseInt(a.year) - parseInt(b.year);
//        if (sortOrder === "az")     return a.title.localeCompare(b.title);
//        return 0;
//      });
//
// 3. Replace your existing filter Box with:
//    <ProjectsFilterBar
//      query={query}                 setQuery={setQuery}
//      suggestions={suggestions}     showSuggestions={showSuggestions}
//      setShowSuggestions={setShowSuggestions}
//      onSelectSuggestion={handleSelectSuggestion}
//      techFilters={techFilters}     setTechFilters={setTechFilters}
//      useCaseFilters={useCaseFilters} setUseCaseFilters={setUseCaseFilters}
//      typeFilters={typeFilters}     setTypeFilters={setTypeFilters}
//      allTech={ALL_TECH}            allUseCases={ALL_USECASES}
//      allTypes={ALL_TYPES}
//      sortOrder={sortOrder}         setSortOrder={setSortOrder}
//      resultCount={filteredProjects.length}
//    />
//
// 4. Remove the old result count row — it's now inside the bar.