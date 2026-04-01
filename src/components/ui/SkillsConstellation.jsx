// SkillsConstellation.jsx
// D3 force-graph — skill nodes sized by XP, linked to projects
// Click a node → filters projects (fires onFilterChange callback)
// Stack: React 18 + Chakra UI v2 + Framer Motion + D3 (via CDN or npm install d3)

import { useEffect, useRef, useState, useCallback } from "react";
import { Box, Flex, Text, useColorModeValue, useBreakpointValue } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import * as d3 from "d3";

const MotionBox = motion(Box);

// ── Data ─────────────────────────────────────────────────────────────────────
const SKILLS = [
  // Core — big nodes
  { id: "react", label: "React", level: 95, category: "frontend", accent: "#14b8a6" },
  { id: "ts", label: "TypeScript", level: 90, category: "frontend", accent: "#14b8a6" },
  { id: "nextjs", label: "Next.js", level: 88, category: "frontend", accent: "#14b8a6" },
  { id: "go", label: "Go", level: 80, category: "backend", accent: "#7c3aed" },
  { id: "rust", label: "Rust", level: 72, category: "backend", accent: "#7c3aed" },
  { id: "python", label: "Python", level: 85, category: "backend", accent: "#7c3aed" },
  { id: "docker", label: "Docker", level: 88, category: "devops", accent: "#f4845f" },
  { id: "k8s", label: "Kubernetes", level: 78, category: "devops", accent: "#f4845f" },
  { id: "ai", label: "LLM / AI", level: 82, category: "ai", accent: "#ec4899" },
  { id: "wasm", label: "WebAssembly", level: 65, category: "systems", accent: "#e8c547" },
  // Supporting
  { id: "d3", label: "D3.js", level: 70, category: "frontend", accent: "#14b8a6" },
  { id: "postgres", label: "Postgres", level: 80, category: "backend", accent: "#7c3aed" },
  { id: "redis", label: "Redis", level: 75, category: "backend", accent: "#7c3aed" },
  { id: "gsap", label: "GSAP", level: 78, category: "frontend", accent: "#14b8a6" },
  { id: "figma", label: "Figma", level: 70, category: "design", accent: "#e8c547" },
  { id: "grpc", label: "gRPC", level: 68, category: "backend", accent: "#7c3aed" },
  { id: "github", label: "GitHub CI", level: 85, category: "devops", accent: "#f4845f" },
];

const LINKS = [
  { source: "react", target: "ts" }, { source: "react", target: "nextjs" },
  { source: "react", target: "d3" }, { source: "react", target: "gsap" },
  { source: "go", target: "grpc" }, { source: "go", target: "docker" },
  { source: "rust", target: "wasm" }, { source: "rust", target: "grpc" },
  { source: "python", target: "ai" }, { source: "python", target: "postgres" },
  { source: "docker", target: "k8s" }, { source: "docker", target: "github" },
  { source: "k8s", target: "grpc" }, { source: "ai", target: "wasm" },
  { source: "postgres", target: "redis" }, { source: "figma", target: "nextjs" },
  { source: "ts", target: "react" }, { source: "nextjs", target: "postgres" },
];

const CATEGORY_LABELS = {
  frontend: "Frontend", backend: "Backend", devops: "DevOps",
  ai: "AI / ML", systems: "Systems", design: "Design",
};

// ─────────────────────────────────────────────────────────────────────────────
export default function SkillsConstellation({ onFilterChange }) {
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const simRef = useRef(null);
  const [selected, setSelected] = useState(null);
  const [hovered, setHovered] = useState(null);
  const isDark = useColorModeValue(false, true);
  const isMobile = useBreakpointValue({ base: true, md: false });

  const textColor = useColorModeValue("#1a1a1a", "rgba(255,255,255,0.88)");
  const dimColor = useColorModeValue("#9ca3af", "rgba(255,255,255,0.28)");
  const borderColor = useColorModeValue("rgba(0,0,0,0.08)", "rgba(255,255,255,0.06)");

  const H = isMobile ? 360 : 480;

  const draw = useCallback(() => {
    const container = containerRef.current;
    if (!container || !svgRef.current) return;
    const W = container.offsetWidth;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    svg.attr("viewBox", `0 0 ${W} ${H}`).attr("width", W).attr("height", H);

    // Defs
    const defs = svg.append("defs");
    SKILLS.forEach((s) => {
      const grad = defs.append("radialGradient")
        .attr("id", `glow-${s.id}`)
        .attr("cx", "50%").attr("cy", "50%").attr("r", "50%");
      grad.append("stop").attr("offset", "0%").attr("stop-color", s.accent).attr("stop-opacity", 0.9);
      grad.append("stop").attr("offset", "100%").attr("stop-color", s.accent).attr("stop-opacity", 0.1);
    });

    const linkData = LINKS.map((l) => ({ ...l }));
    const nodeData = SKILLS.map((s) => ({ ...s }));

    const rScale = d3.scaleLinear().domain([60, 95]).range(isMobile ? [14, 30] : [18, 38]);

    // Simulation
    simRef.current = d3.forceSimulation(nodeData)
      .force("link", d3.forceLink(linkData).id((d) => d.id).distance(isMobile ? 70 : 90).strength(0.4))
      .force("charge", d3.forceManyBody().strength(isMobile ? -180 : -260))
      .force("center", d3.forceCenter(W / 2, H / 2))
      .force("collision", d3.forceCollide().radius((d) => rScale(d.level) + 8));

    // Links
    const linkSel = svg.append("g").selectAll("line")
      .data(linkData)
      .join("line")
      .attr("stroke", "rgba(124,58,237,0.15)")
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", "3 4");

    // Node groups
    const nodeG = svg.append("g").selectAll("g")
      .data(nodeData)
      .join("g")
      .style("cursor", "pointer")
      .call(
        d3.drag()
          .on("start", (event, d) => {
            if (!event.active) simRef.current.alphaTarget(0.3).restart();
            d.fx = d.x; d.fy = d.y;
          })
          .on("drag", (event, d) => { d.fx = event.x; d.fy = event.y; })
          .on("end", (event, d) => {
            if (!event.active) simRef.current.alphaTarget(0);
            d.fx = null; d.fy = null;
          })
      );

    // Outer glow ring
    nodeG.append("circle")
      .attr("r", (d) => rScale(d.level) + 8)
      .attr("fill", "none")
      .attr("stroke", (d) => d.accent)
      .attr("stroke-width", 1)
      .attr("stroke-opacity", 0)
      .attr("class", "glow-ring");

    // Main circle
    nodeG.append("circle")
      .attr("r", (d) => rScale(d.level))
      .attr("fill", (d) => `${d.accent}18`)
      .attr("stroke", (d) => d.accent)
      .attr("stroke-width", 1.5)
      .attr("stroke-opacity", 0.55);

    // Label
    nodeG.append("text")
      .text((d) => d.label)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("font-family", "'Orbitron', sans-serif")
      .attr("font-size", (d) => Math.max(rScale(d.level) * 0.32, 7))
      .attr("font-weight", 700)
      .attr("fill", (d) => d.accent)
      .attr("pointer-events", "none");

    // Level text
    nodeG.append("text")
      .text((d) => `${d.level}%`)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("dy", (d) => rScale(d.level) * 0.38)
      .attr("font-family", "'JetBrains Mono', monospace")
      .attr("font-size", (d) => Math.max(rScale(d.level) * 0.24, 6))
      .attr("fill", (d) => d.accent)
      .attr("opacity", 0.55)
      .attr("pointer-events", "none");

    // Hover + click
    nodeG
      .on("mouseenter", function (event, d) {
        setHovered(d.id);
        d3.select(this).select(".glow-ring")
          .transition().duration(200)
          .attr("stroke-opacity", 0.4);
        d3.select(this).select("circle:nth-child(2)")
          .transition().duration(200)
          .attr("fill", `${d.accent}30`)
          .attr("stroke-opacity", 1);
        // Highlight connected links
        linkSel
          .transition().duration(150)
          .attr("stroke", (l) =>
            l.source.id === d.id || l.target.id === d.id
              ? `${d.accent}60`
              : "rgba(124,58,237,0.06)"
          )
          .attr("stroke-width", (l) =>
            l.source.id === d.id || l.target.id === d.id ? 1.5 : 0.5
          );
      })
      .on("mouseleave", function (event, d) {
        setHovered(null);
        d3.select(this).select(".glow-ring")
          .transition().duration(300).attr("stroke-opacity", 0);
        d3.select(this).select("circle:nth-child(2)")
          .transition().duration(300)
          .attr("fill", `${d.accent}18`)
          .attr("stroke-opacity", 0.55);
        linkSel
          .transition().duration(200)
          .attr("stroke", "rgba(124,58,237,0.15)")
          .attr("stroke-width", 1);
      })
      .on("click", (event, d) => {
        setSelected((prev) => {
          const next = prev === d.id ? null : d.id;
          onFilterChange?.(next ? d.label : null);
          return next;
        });
      });

    // Tick
    simRef.current.on("tick", () => {
      linkSel
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);
      nodeG.attr("transform", (d) => `translate(${d.x},${d.y})`);
    });

    return () => simRef.current?.stop();
  }, [H, isMobile]);

  useEffect(() => {
    const cleanup = draw();
    const ro = new ResizeObserver(draw);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => { ro.disconnect(); cleanup?.(); };
  }, [draw]);

  // Highlight selected node
  useEffect(() => {
    if (!svgRef.current) return;
    d3.select(svgRef.current)
      .selectAll("g > circle:nth-child(2)")
      .transition().duration(250)
      .attr("stroke-width", (d) => (selected && d.id === selected ? 3 : 1.5))
      .attr("stroke-opacity", (d) => (selected && d.id !== selected ? 0.2 : 0.55))
      .attr("fill", (d) =>
        selected && d.id === selected ? `${d.accent}35` : `${d.accent}18`
      );
  }, [selected]);

  const selectedSkill = SKILLS.find((s) => s.id === selected);
  const hoveredSkill = SKILLS.find((s) => s.id === hovered);
  const activeSkill = hoveredSkill || selectedSkill;

  return (
    <Box
      as="section"
      bg="transparent"
      px={{ base: 5, md: 12, lg: 20 }}
      py={{ base: 16, md: 12 }}
    >
      <Flex direction="column" align="flex-start" w="full" maxW="1200px" mx="auto" gap={8}>
        {/* Header */}
        <Box mb={2}>
          <Flex align="center" gap={3} mb={3}>
            <Box w="24px" h="1px" bgGradient="linear(to-r, #ec4899, #7c3aed)" />
            <Text fontFamily="'JetBrains Mono', monospace" fontSize="9px" letterSpacing="0.3em" textTransform="uppercase" color={dimColor}>
              Skill Graph
            </Text>
          </Flex>
          <Text fontFamily="'Orbitron', sans-serif" fontWeight={900} fontSize={{ base: "26px", md: "clamp(26px,4vw,40px)" }} letterSpacing="-0.02em" lineHeight={1.05} bgGradient="linear(to-r, #1e40af, #7c3aed, #ec4899)" bgClip="text" display="inline-block" w="fit-content">
            Skills &
          </Text>
          <Text fontFamily="'Orbitron', sans-serif" fontWeight={900} fontSize={{ base: "26px", md: "clamp(26px,4vw,40px)" }} letterSpacing="-0.02em" lineHeight={1.05} color={useColorModeValue("#2a2a2a", "rgba(255,255,255,0.18)")}>
            Constellation.
          </Text>
        </Box>

        {/* Legend */}
        <Flex flexWrap="wrap" gap={3}>
          {Object.entries(CATEGORY_LABELS).map(([cat, label]) => {
            const skill = SKILLS.find((s) => s.category === cat);
            return (
              <Flex key={cat} align="center" gap={1.5}>
                <Box w="6px" h="6px" borderRadius="50%" bg={skill?.accent} />
                <Text fontFamily="'JetBrains Mono', monospace" fontSize="8px" letterSpacing="0.15em" textTransform="uppercase" color={dimColor}>
                  {label}
                </Text>
              </Flex>
            );
          })}
        </Flex>

        {/* Canvas */}
        <Box
          ref={containerRef}
          w="full"
          bg={useColorModeValue("rgba(247,247,248,0.90)", "rgba(10,10,10,0.80)")}
          backdropFilter="blur(16px)"
          border="1px solid"
          borderColor={borderColor}
          borderRadius="16px"
          overflow="hidden"
          position="relative"
        >
          <Box h="1px" bgGradient="linear(to-r, transparent, rgba(124,58,237,0.35), transparent)" />
          <svg ref={svgRef} style={{ display: "block", width: "100%" }} />

          {/* Tooltip overlay */}
          <AnimatePresence>
            {activeSkill && (
              <MotionBox
                key={activeSkill.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                position="absolute"
                bottom={4}
                left={4}
                px={4}
                py={3}
                borderRadius="10px"
                bg={useColorModeValue("rgba(247,247,248,0.96)", "rgba(10,10,10,0.94)")}
                border="1px solid"
                borderColor={`${activeSkill.accent}35`}
                backdropFilter="blur(12px)"
                pointerEvents="none"
              >
                <Text fontFamily="'Orbitron', sans-serif" fontWeight={800} fontSize="13px" color={activeSkill.accent}>
                  {activeSkill.label}
                </Text>
                <Flex align="center" gap={2} mt={1}>
                  <Box flex={1} h="2px" borderRadius="2px" bg={useColorModeValue("rgba(0,0,0,0.08)", "rgba(255,255,255,0.06)")}>
                    <MotionBox
                      h="full"
                      borderRadius="2px"
                      bg={activeSkill.accent}
                      initial={{ width: 0 }}
                      animate={{ width: `${activeSkill.level}%` }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                  </Box>
                  <Text fontFamily="'JetBrains Mono', monospace" fontSize="10px" color={activeSkill.accent}>
                    {activeSkill.level}%
                  </Text>
                </Flex>
                <Text fontFamily="'JetBrains Mono', monospace" fontSize="8px" letterSpacing="0.12em" textTransform="uppercase" color={dimColor} mt={1}>
                  {CATEGORY_LABELS[activeSkill.category]}
                </Text>
              </MotionBox>
            )}
          </AnimatePresence>

          {/* Hint */}
          {!activeSkill && (
            <Box position="absolute" bottom={4} right={4}>
              <Text fontFamily="'JetBrains Mono', monospace" fontSize="8px" letterSpacing="0.12em" textTransform="uppercase" color={dimColor} opacity={0.5}>
                Click to filter · Drag to explore
              </Text>
            </Box>
          )}

          {/* Selected badge */}
          <AnimatePresence>
            {selected && (
              <MotionBox
                key="sel"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                position="absolute"
                top={4}
                right={4}
                px={3}
                py={1.5}
                borderRadius="8px"
                bg={`${selectedSkill?.accent}12`}
                border="1px solid"
                borderColor={`${selectedSkill?.accent}35`}
                display="flex"
                alignItems="center"
                gap={2}
              >
                <Box w="5px" h="5px" borderRadius="50%" bg={selectedSkill?.accent} />
                <Text fontFamily="'JetBrains Mono', monospace" fontSize="9px" letterSpacing="0.15em" textTransform="uppercase" color={selectedSkill?.accent}>
                  {selectedSkill?.label} selected
                </Text>
                <Box
                  as="button"
                  onClick={() => { setSelected(null); onFilterChange?.(null); }}
                  fontFamily="'JetBrains Mono', monospace"
                  fontSize="10px"
                  color={selectedSkill?.accent}
                  opacity={0.6}
                  cursor="pointer"
                  ml={1}
                  _hover={{ opacity: 1 }}
                >
                  ✕
                </Box>
              </MotionBox>
            )}
          </AnimatePresence>
        </Box>

        <Text fontFamily="'Sora', sans-serif" fontSize="12px" color={dimColor} lineHeight={1.7} maxW="540px">
          Node size reflects proficiency. Click any skill to highlight connections. Drag nodes to explore relationships.
        </Text>
      </Flex>
    </Box>
  );
}