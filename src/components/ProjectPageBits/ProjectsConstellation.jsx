// ProjectsConstellation.jsx
// Project nodes arranged organically in SVG — no D3, pure React math.
// Edges = shared technologies between projects.
// "Skill Map" button on each project card → highlights that node's connections.
// Clicking an edge tech label → fires onTechFilter(tech) to filter Projects grid.
//
// Stack: React 18 + Chakra UI v2 + Framer Motion + GSAP

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";

const MotionBox = motion(Box);

// ── Project data — keep in sync with your Projects.jsx PROJECTS array ─────────
const PROJECTS = [
  {
    id: 1,
    title: "NeuralDraft",
    type: "Web App",
    accent: "#14b8a6",
    techStack: ["React", "TypeScript", "OpenAI", "Socket.io", "Redis", "PostgreSQL"],
    tagline: "AI-powered writing assistant",
  },
  {
    id: 2,
    title: "OrbitCI",
    type: "Dev Tool",
    accent: "#f4845f",
    techStack: ["Vue 3", "Go", "Docker", "Kubernetes", "GitHub Actions"],
    tagline: "Visual CI/CD pipeline builder",
  },
  {
    id: 3,
    title: "Spectral UI",
    type: "Library",
    accent: "#e8c547",
    techStack: ["Next.js", "TypeScript", "Tailwind", "Node.js", "PostCSS"],
    tagline: "Design system from Figma tokens",
  },
  {
    id: 4,
    title: "Echelon",
    type: "Dashboard",
    accent: "#7c3aed",
    techStack: ["React", "D3.js", "FastAPI", "PostgreSQL", "WebSockets"],
    tagline: "Real-time sports analytics",
  },
  {
    id: 5,
    title: "Phoneme",
    type: "Library",
    accent: "#14b8a6",
    techStack: ["TypeScript", "WebAssembly", "Rust", "Node.js"],
    tagline: "Browser-native transcription SDK",
  },
  {
    id: 6,
    title: "Terrarium",
    type: "Backend",
    accent: "#f4845f",
    techStack: ["Rust", "Go", "Docker", "gRPC", "Python"],
    tagline: "Sandboxed code execution",
  },
];

// ── Compute edges: pairs of projects sharing ≥1 tech ─────────────────────────
function computeEdges(projects) {
  const edges = [];
  for (let i = 0; i < projects.length; i++) {
    for (let j = i + 1; j < projects.length; j++) {
      const shared = projects[i].techStack.filter((t) =>
        projects[j].techStack.includes(t)
      );
      if (shared.length > 0) {
        edges.push({
          id: `${projects[i].id}-${projects[j].id}`,
          source: projects[i].id,
          target: projects[j].id,
          shared,
        });
      }
    }
  }
  return edges;
}

// ── Organic circle positions with seeded offsets ──────────────────────────────
function computeNodePositions(count, cx, cy, r) {
  // Slight organic offsets — deterministic so they don't jump on re-render
  const jitter = [
    { dx: 18, dy: -12 },
    { dx: -14, dy: 20 },
    { dx: 22, dy: 8 },
    { dx: -18, dy: -16 },
    { dx: 12, dy: 22 },
    { dx: -20, dy: 6 },
    { dx: 8, dy: -20 },
    { dx: -10, dy: 14 },
  ];
  return Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * 2 * Math.PI - Math.PI / 2;
    const j = jitter[i % jitter.length];
    return {
      x: cx + r * Math.cos(angle) + j.dx,
      y: cy + r * Math.sin(angle) + j.dy,
    };
  });
}

// ── Edge midpoint for label placement ────────────────────────────────────────
function midpoint(x1, y1, x2, y2, offset = 0) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  if (offset === 0) return { x: mx, y: my };
  // Perpendicular offset so labels don't overlap the line
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  return {
    x: mx + (-dy / len) * offset,
    y: my + (dx / len) * offset,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
export default function ProjectsConstellation({ onTechFilter }) {
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const [dims, setDims] = useState({ w: 700, h: 500 });
  const [activeNode, setActiveNode] = useState(null); // project id
  const [hoveredEdge, setHoveredEdge] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);

  const edges = useMemo(() => computeEdges(PROJECTS), []);

  // Responsive SVG size
  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        const w = containerRef.current.offsetWidth;
        const h = Math.max(380, Math.min(520, w * 0.65));
        setDims({ w, h });
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const NODE_R = dims.w < 500 ? 32 : 42;
  const ORBIT_R = Math.min(dims.w, dims.h) * 0.34;
  const cx = dims.w / 2;
  const cy = dims.h / 2;

  const positions = useMemo(
    () => computeNodePositions(PROJECTS.length, cx, cy, ORBIT_R),
    [cx, cy, ORBIT_R]
  );

  // Map project id → position
  const posMap = useMemo(() => {
    const m = {};
    PROJECTS.forEach((p, i) => { m[p.id] = positions[i]; });
    return m;
  }, [positions]);

  // Which edges are active (connected to activeNode)
  const activeEdgeIds = useMemo(() => {
    if (!activeNode) return new Set();
    return new Set(
      edges
        .filter((e) => e.source === activeNode || e.target === activeNode)
        .map((e) => e.id)
    );
  }, [activeNode, edges]);

  // Which nodes are connected to activeNode
  const connectedNodeIds = useMemo(() => {
    if (!activeNode) return new Set();
    const s = new Set([activeNode]);
    edges.forEach((e) => {
      if (e.source === activeNode) s.add(e.target);
      if (e.target === activeNode) s.add(e.source);
    });
    return s;
  }, [activeNode, edges]);

  // GSAP: pulse active node glow on selection
  useEffect(() => {
    if (!activeNode || !svgRef.current) return;
    const el = svgRef.current.querySelector(`[data-node="${activeNode}"] circle.glow`);
    if (!el) return;
    gsap.fromTo(el, { r: NODE_R + 4, opacity: 0.6 }, {
      r: NODE_R + 14,
      opacity: 0,
      duration: 0.9,
      ease: "power2.out",
    });
  }, [activeNode, NODE_R]);

  const dimColor    = useColorModeValue("#9ca3af", "rgba(255,255,255,0.28)");
  const cardBg      = useColorModeValue("rgba(247,247,248,0.93)", "rgba(10,10,10,0.84)");
  const borderColor = useColorModeValue("rgba(0,0,0,0.08)", "rgba(255,255,255,0.06)");
  const textColor   = useColorModeValue("#111", "rgba(255,255,255,0.88)");
  const line2Color  = useColorModeValue("#2a2a2a", "rgba(255,255,255,0.18)");
  const svgBg       = useColorModeValue("rgba(247,247,248,0.88)", "rgba(6,6,10,0.82)");
  const edgeDefault = useColorModeValue("rgba(0,0,0,0.08)", "rgba(255,255,255,0.07)");

  const handleSkillMap = useCallback((projectId) => {
    setActiveNode((prev) => (prev === projectId ? null : projectId));
  }, []);

  const handleEdgeLabelClick = useCallback((tech) => {
    onTechFilter?.(tech);
  }, [onTechFilter]);

  // Multiple shared techs per edge — pick primary for label, show count
  const getEdgeLabel = (edge) =>
    edge.shared.length === 1
      ? edge.shared[0]
      : `${edge.shared[0]} +${edge.shared.length - 1}`;

  return (
    <Box
      as="section"
      bg="transparent"
      px={{ base: 5, md: 12, lg: 20 }}
      py={{ base: 16, md: 12 }}
    >
      <Flex direction="column" align="flex-start" w="full" maxW="1200px" mx="auto" gap={8}>

        {/* ── Header ── */}
        <Box>
          <Flex align="center" gap={3} mb={3}>
            <Box w="24px" h="1px" bgGradient="linear(to-r, #ec4899, #7c3aed)" />
            <Text fontFamily="'JetBrains Mono', monospace" fontSize="9px"
              letterSpacing="0.3em" textTransform="uppercase" color={dimColor}>
              Skill Map
            </Text>
          </Flex>
          <Text fontFamily="'Orbitron', sans-serif" fontWeight={900}
            fontSize={{ base: "26px", md: "clamp(26px,4vw,40px)" }}
            letterSpacing="-0.02em" lineHeight={1.05}
            bgGradient="linear(to-r, #1e40af, #7c3aed, #ec4899)"
            bgClip="text" display="inline-block" w="fit-content">
            How projects
          </Text>
          <Text fontFamily="'Orbitron', sans-serif" fontWeight={900}
            fontSize={{ base: "26px", md: "clamp(26px,4vw,40px)" }}
            letterSpacing="-0.02em" lineHeight={1.05} color={line2Color}>
            connect.
          </Text>
          <Text fontFamily="'Sora', sans-serif" fontSize="13px" color={dimColor}
            lineHeight={1.8} maxW="480px" mt={3}>
            Lines between projects = shared technologies. Click{" "}
            <Box as="span" fontFamily="'JetBrains Mono', monospace"
              fontSize="10px" color="#7c3aed">Skill Map</Box>{" "}
            on any project card to highlight its connections. Click a tech label to filter projects.
          </Text>
        </Box>

        {/* ── SVG Canvas ── */}
        <Box
          ref={containerRef}
          w="full"
          bg={svgBg}
          backdropFilter="blur(16px)"
          border="1px solid"
          borderColor={borderColor}
          borderRadius="20px"
          overflow="hidden"
          position="relative"
        >
          {/* Top hairline */}
          <Box position="absolute" top={0} left={0} right={0} h="1px"
            bgGradient="linear(to-r, transparent, #7c3aed55, transparent)" />

          {/* Reset button */}
          <AnimatePresence>
            {activeNode && (
              <MotionBox
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                position="absolute"
                top={4} right={4}
                zIndex={10}
              >
                <Box
                  as="button"
                  onClick={() => setActiveNode(null)}
                  px={3} py={1.5}
                  borderRadius="8px"
                  border="1px solid rgba(239,68,68,0.3)"
                  bg="rgba(239,68,68,0.08)"
                  color="rgba(239,68,68,0.8)"
                  fontFamily="'JetBrains Mono', monospace"
                  fontSize="9px" letterSpacing="0.18em" textTransform="uppercase"
                  cursor="pointer"
                  style={{ transition: "all 0.15s ease" }}
                  _hover={{ bg: "rgba(239,68,68,0.14)" }}
                >
                  ✕ Clear map
                </Box>
              </MotionBox>
            )}
          </AnimatePresence>

          {/* Hint */}
          {!activeNode && (
            <Box position="absolute" bottom={4} right={4} pointerEvents="none">
              <Text fontFamily="'JetBrains Mono', monospace" fontSize="8px"
                letterSpacing="0.12em" textTransform="uppercase" color={dimColor} opacity={0.45}>
                Click "Skill Map" on a card below
              </Text>
            </Box>
          )}

          <svg
            ref={svgRef}
            width={dims.w}
            height={dims.h}
            viewBox={`0 0 ${dims.w} ${dims.h}`}
            style={{ display: "block" }}
          >
            <defs>
              {/* Glow filter */}
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Per-project radial gradients */}
              {PROJECTS.map((p) => (
                <radialGradient key={p.id} id={`node-grad-${p.id}`} cx="50%" cy="35%" r="65%">
                  <stop offset="0%" stopColor={p.accent} stopOpacity={0.35} />
                  <stop offset="100%" stopColor={p.accent} stopOpacity={0.05} />
                </radialGradient>
              ))}
            </defs>

            {/* ── Edges ── */}
            {edges.map((edge) => {
              const s = posMap[edge.source];
              const t = posMap[edge.target];
              if (!s || !t) return null;

              const isActive = activeNode
                ? activeEdgeIds.has(edge.id)
                : true;
              const isHov = hoveredEdge === edge.id;

              // Slight curve — quadratic bezier with midpoint offset
              const offsetAmt = 18;
              const mid = midpoint(s.x, s.y, t.x, t.y, offsetAmt);
              const pathD = `M ${s.x} ${s.y} Q ${mid.x} ${mid.y} ${t.x} ${t.y}`;

              // Source project accent for active edges
              const srcProject = PROJECTS.find((p) => p.id === edge.source);
              const edgeColor = isActive
                ? (isHov ? srcProject?.accent : `${srcProject?.accent}70`)
                : edgeDefault;

              // Label position — midpoint of bezier ≈ Q midpoint
              const labelPos = midpoint(s.x, s.y, t.x, t.y, offsetAmt * 1.1);

              return (
                <g key={edge.id}>
                  {/* Edge path */}
                  <path
                    d={pathD}
                    fill="none"
                    stroke={edgeColor}
                    strokeWidth={isHov ? 2 : isActive ? 1.5 : 0.8}
                    strokeDasharray={isActive ? "none" : "4 6"}
                    style={{ transition: "stroke 0.25s ease, stroke-width 0.2s ease" }}
                  />

                  {/* Tech label — clickable */}
                  {isActive && (
                    <g
                      style={{ cursor: "pointer" }}
                      onMouseEnter={() => setHoveredEdge(edge.id)}
                      onMouseLeave={() => setHoveredEdge(null)}
                      onClick={() => handleEdgeLabelClick(edge.shared[0])}
                    >
                      {/* Label pill background */}
                      <rect
                        x={labelPos.x - 28}
                        y={labelPos.y - 9}
                        width={56}
                        height={18}
                        rx={5}
                        fill={isHov ? `${srcProject?.accent}22` : "rgba(10,10,10,0.7)"}
                        stroke={isHov ? srcProject?.accent : "rgba(124,58,237,0.25)"}
                        strokeWidth={0.8}
                        style={{ transition: "fill 0.15s ease" }}
                      />
                      <text
                        x={labelPos.x}
                        y={labelPos.y + 4}
                        textAnchor="middle"
                        fontFamily="'JetBrains Mono', monospace"
                        fontSize={dims.w < 500 ? 7 : 8}
                        fill={isHov ? srcProject?.accent : "rgba(255,255,255,0.45)"}
                        letterSpacing="0.5"
                        style={{ transition: "fill 0.15s ease", userSelect: "none" }}
                      >
                        {getEdgeLabel(edge)}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}

            {/* ── Nodes ── */}
            {PROJECTS.map((project, i) => {
              const pos = positions[i];
              if (!pos) return null;

              const isActive = !activeNode || connectedNodeIds.has(project.id);
              const isSelected = activeNode === project.id;
              const isHov = hoveredNode === project.id;
              const opacity = isActive ? 1 : 0.2;

              return (
                <g
                  key={project.id}
                  data-node={project.id}
                  transform={`translate(${pos.x}, ${pos.y})`}
                  style={{
                    cursor: "default",
                    opacity,
                    transition: "opacity 0.3s ease",
                  }}
                  onMouseEnter={() => setHoveredNode(project.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  {/* Glow pulse ring — shown when selected */}
                  {isSelected && (
                    <circle
                      className="glow"
                      r={NODE_R + 8}
                      fill="none"
                      stroke={project.accent}
                      strokeWidth={1.5}
                      opacity={0.3}
                    />
                  )}

                  {/* Outer ring */}
                  <circle
                    r={NODE_R + (isSelected ? 5 : isHov ? 3 : 0)}
                    fill="none"
                    stroke={project.accent}
                    strokeWidth={isSelected ? 2 : 1}
                    strokeOpacity={isSelected ? 0.7 : 0.25}
                    strokeDasharray={isSelected ? "none" : "3 5"}
                    style={{ transition: "all 0.25s ease" }}
                  />

                  {/* Main circle */}
                  <circle
                    r={NODE_R}
                    fill={`url(#node-grad-${project.id})`}
                    stroke={project.accent}
                    strokeWidth={isSelected ? 2 : 1.5}
                    strokeOpacity={isSelected ? 1 : isHov ? 0.8 : 0.5}
                    filter={isSelected || isHov ? "url(#glow)" : undefined}
                    style={{ transition: "all 0.2s ease" }}
                  />

                  {/* Project title */}
                  <text
                    textAnchor="middle"
                    dominantBaseline="middle"
                    y={-6}
                    fontFamily="'Orbitron', sans-serif"
                    fontSize={dims.w < 500 ? 8 : 9}
                    fontWeight={700}
                    fill={project.accent}
                    style={{ userSelect: "none" }}
                  >
                    {project.title.length > 9
                      ? project.title.slice(0, 8) + "…"
                      : project.title}
                  </text>

                  {/* Type label */}
                  <text
                    textAnchor="middle"
                    dominantBaseline="middle"
                    y={7}
                    fontFamily="'JetBrains Mono', monospace"
                    fontSize={dims.w < 500 ? 6 : 7}
                    fill={`${project.accent}90`}
                    style={{ userSelect: "none" }}
                  >
                    {project.type}
                  </text>

                  {/* Tech count badge */}
                  <text
                    textAnchor="middle"
                    dominantBaseline="middle"
                    y={18}
                    fontFamily="'JetBrains Mono', monospace"
                    fontSize={6}
                    fill={`${project.accent}60`}
                    style={{ userSelect: "none" }}
                  >
                    {project.techStack.length} tech
                  </text>
                </g>
              );
            })}
          </svg>
        </Box>

        {/* ── Project cards with Skill Map button ── */}
        <Box w="full">
          <Flex align="center" gap={3} mb={5}>
            <Text fontFamily="'JetBrains Mono', monospace" fontSize="9px"
              letterSpacing="0.25em" textTransform="uppercase" color={dimColor}>
              Projects
            </Text>
            <Box flex={1} h="1px" bgGradient="linear(to-r, rgba(124,58,237,0.3), transparent)" />
            <Text fontFamily="'JetBrains Mono', monospace" fontSize="9px"
              letterSpacing="0.12em" color={dimColor}>
              {PROJECTS.length} total
            </Text>
          </Flex>

          <Box
            display="grid"
            gridTemplateColumns={{ base: "1fr", sm: "1fr 1fr", lg: "repeat(3, 1fr)" }}
            gap={4}
          >
            {PROJECTS.map((project, i) => {
              const isActive = !activeNode || connectedNodeIds.has(project.id);
              const isSelected = activeNode === project.id;

              return (
                <MotionBox
                  key={project.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: isActive ? 1 : 0.3, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05, ease: [0.23, 1, 0.32, 1] }}
                  style={{ transition: "opacity 0.3s ease" }}
                >
                  <Box
                    bg={cardBg}
                    backdropFilter="blur(14px)"
                    border="1px solid"
                    borderColor={isSelected ? project.accent : borderColor}
                    borderRadius="14px"
                    px={4}
                    py={4}
                    h="full"
                    position="relative"
                    overflow="hidden"
                    style={{
                      transition: "border-color 0.25s ease, box-shadow 0.25s ease",
                      boxShadow: isSelected ? `0 0 28px ${project.accent}20` : "none",
                    }}
                  >
                    {/* Top hairline */}
                    <Box position="absolute" top={0} left={0} right={0} h="1px"
                      bgGradient={`linear(to-r, transparent, ${project.accent}${isSelected ? "70" : "30"}, transparent)`}
                      style={{ transition: "opacity 0.2s ease" }}
                    />

                    {/* Header */}
                    <Flex justify="space-between" align="flex-start" mb={3}>
                      <Box>
                        <Flex align="center" gap={1.5} mb={1}>
                          <Box w="5px" h="5px" borderRadius="50%"
                            bg={project.accent}
                            boxShadow={isSelected ? `0 0 8px ${project.accent}` : "none"}
                          />
                          <Text fontFamily="'JetBrains Mono', monospace" fontSize="8px"
                            letterSpacing="0.15em" textTransform="uppercase"
                            color={`${project.accent}90`}>
                            {project.type}
                          </Text>
                        </Flex>
                        <Text fontFamily="'Orbitron', sans-serif" fontWeight={700}
                          fontSize="13px" letterSpacing="0.01em"
                          color={isSelected ? project.accent : textColor}
                          style={{ transition: "color 0.2s ease" }}>
                          {project.title}
                        </Text>
                        <Text fontFamily="'Sora', sans-serif" fontSize="11px"
                          color={dimColor} mt={0.5}>{project.tagline}</Text>
                      </Box>
                    </Flex>

                    {/* Tech pills — first 3 */}
                    <Flex flexWrap="wrap" gap={1} mb={4}>
                      {project.techStack.slice(0, 3).map((t) => (
                        <Box key={t} px={1.5} py={0.5} borderRadius="4px"
                          border="1px solid" borderColor="rgba(255,255,255,0.07)"
                          bg="rgba(255,255,255,0.03)"
                          fontFamily="'JetBrains Mono', monospace" fontSize="7px"
                          letterSpacing="0.1em" textTransform="uppercase"
                          color={dimColor}>
                          {t}
                        </Box>
                      ))}
                      {project.techStack.length > 3 && (
                        <Box px={1.5} py={0.5} borderRadius="4px"
                          border="1px solid" borderColor={`${project.accent}25`}
                          bg={`${project.accent}08`}
                          fontFamily="'JetBrains Mono', monospace" fontSize="7px"
                          letterSpacing="0.1em" color={`${project.accent}90`}>
                          +{project.techStack.length - 3}
                        </Box>
                      )}
                    </Flex>

                    {/* Skill Map button */}
                    <MotionBox
                      as="button"
                      onClick={() => handleSkillMap(project.id)}
                      display="inline-flex"
                      alignItems="center"
                      gap={2}
                      px={3}
                      py={1.5}
                      borderRadius="7px"
                      border="1px solid"
                      borderColor={isSelected ? project.accent : `${project.accent}35`}
                      bg={isSelected ? `${project.accent}18` : `${project.accent}0a`}
                      color={project.accent}
                      fontFamily="'JetBrains Mono', monospace"
                      fontSize="8px"
                      letterSpacing="0.18em"
                      textTransform="uppercase"
                      cursor="pointer"
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.97 }}
                      style={{ transition: "all 0.18s cubic-bezier(0.23,1,0.32,1)" }}
                    >
                      {/* Hexagon icon */}
                      <svg width="10" height="10" viewBox="0 0 10 10">
                        <polygon
                          points="5,0.5 9,2.75 9,7.25 5,9.5 1,7.25 1,2.75"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1"
                        />
                      </svg>
                      {isSelected ? "Clear map" : "Skill map"}
                    </MotionBox>
                  </Box>
                </MotionBox>
              );
            })}
          </Box>
        </Box>

        {/* ── Active node detail strip ── */}
        <AnimatePresence>
          {activeNode && (() => {
            const proj = PROJECTS.find((p) => p.id === activeNode);
            const connEdges = edges.filter(
              (e) => e.source === activeNode || e.target === activeNode
            );
            const allShared = [...new Set(connEdges.flatMap((e) => e.shared))];

            return (
              <MotionBox
                key="detail"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.35 }}
                w="full"
                bg={cardBg}
                backdropFilter="blur(14px)"
                border="1px solid"
                borderColor={`${proj?.accent}35`}
                borderRadius="14px"
                px={{ base: 4, md: 6 }}
                py={4}
                position="relative"
                overflow="hidden"
              >
                <Box position="absolute" top={0} left={0} right={0} h="1px"
                  bgGradient={`linear(to-r, transparent, ${proj?.accent}55, transparent)`} />

                <Flex justify="space-between" align="flex-start" flexWrap="wrap" gap={4}>
                  <Box>
                    <Text fontFamily="'JetBrains Mono', monospace" fontSize="8px"
                      letterSpacing="0.2em" textTransform="uppercase" color={dimColor} mb={1}>
                      Skill map · {proj?.title}
                    </Text>
                    <Text fontFamily="'Orbitron', sans-serif" fontWeight={800}
                      fontSize="14px" color={proj?.accent}>
                      {connEdges.length} connection{connEdges.length !== 1 ? "s" : ""} · {allShared.length} shared technologies
                    </Text>
                  </Box>

                  {/* Shared tech chips — each clickable to filter */}
                  <Flex flexWrap="wrap" gap={2} align="center">
                    {allShared.map((tech) => (
                      <Box
                        key={tech}
                        as="button"
                        onClick={() => handleEdgeLabelClick(tech)}
                        px={2.5} py={1}
                        borderRadius="6px"
                        border="1px solid"
                        borderColor={`${proj?.accent}35`}
                        bg={`${proj?.accent}0e`}
                        color={proj?.accent}
                        fontFamily="'JetBrains Mono', monospace"
                        fontSize="9px"
                        letterSpacing="0.14em"
                        textTransform="uppercase"
                        cursor="pointer"
                        style={{ transition: "all 0.15s ease" }}
                        _hover={{ bg: `${proj?.accent}20`, transform: "translateY(-1px)" }}
                        title={`Filter projects by ${tech}`}
                      >
                        {tech} ↗
                      </Box>
                    ))}
                  </Flex>
                </Flex>
              </MotionBox>
            );
          })()}
        </AnimatePresence>

      </Flex>
    </Box>
  );
}

// ── Usage ─────────────────────────────────────────────────────────────────────
// import ProjectsConstellation from "./ProjectsConstellation";
//
// // In your Projects page — pass a setter that updates your tech filter state:
// const [techFilter, setTechFilter] = useState(null);
//
// <ProjectsConstellation onTechFilter={(tech) => setTechFilter(tech)} />
// <Projects activeTechFilter={techFilter} />   ← wire into Projects search/filter
//
// ── Keeping data in sync ──────────────────────────────────────────────────────
// Move PROJECTS[] to a shared file (e.g. src/data/projects.js) and import it
// in both ProjectsConstellation.jsx and Projects.jsx so they always match.