// ContactTerminal.jsx
// Fake terminal UI — typewriter responses, blinking cursor, message "send"
// Stack: React 18 + Chakra UI v2 + Framer Motion + GSAP

import { useState, useRef, useEffect, useCallback } from "react";
import { Box, Flex, Text, Input, useColorModeValue } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";

const MotionBox = motion.create(Box);

// ── Terminal state machine ────────────────────────────────────────────────────
const PROMPTS = [
  {
    key: "name",
    question: "What's your name?",
    placeholder: "e.g. Ada Lovelace",
    validate: (v) => v.trim().length >= 2 || "Name must be at least 2 characters",
    response: (v) => `Nice to meet you, ${v.trim()}. Let's keep going.`,
  },
  {
    key: "email",
    question: "Your email address?",
    placeholder: "you@example.com",
    validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || "That doesn't look like an email.",
    response: (v) => `Got it — I'll reply to ${v.trim()}.`,
  },
  {
    key: "subject",
    question: "What's this about?",
    placeholder: "e.g. Freelance project, Job opportunity, Collab...",
    validate: (v) => v.trim().length >= 3 || "Give me a hint at least.",
    response: (v) => `"${v.trim()}" — sounds interesting.`,
  },
  {
    key: "message",
    question: "Write your message:",
    placeholder: "Tell me what you need...",
    validate: (v) => v.trim().length >= 10 || "A bit more detail would help.",
    response: () => "Perfect. Compiling your message...",
  },
];

const MOTD = [
  "Terminal v2.4.1 — secure message relay",
  "Connection: encrypted · TLS 1.3",
  "Type your response and press ↵ to continue",
];

// ── Typewriter hook ──────────────────────────────────────────────────────────
function useTypewriter(text, speed = 22, enabled = true) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!enabled || !text) return;
    setDisplayed("");
    setDone(false);
    let i = 0;
    const tick = () => {
      if (i <= text.length) {
        setDisplayed(text.slice(0, i));
        i++;
        ref.current = setTimeout(tick, speed);
      } else {
        setDone(true);
      }
    };
    ref.current = setTimeout(tick, 80);
    return () => clearTimeout(ref.current);
  }, [text, speed, enabled]);

  return { displayed, done };
}

// ── Sub-components ───────────────────────────────────────────────────────────
function Cursor({ accent }) {
  return (
    <Box
      as="span"
      display="inline-block"
      w="8px"
      h="15px"
      bg={accent}
      ml="2px"
      verticalAlign="middle"
      style={{ animation: "blink 1.1s step-end infinite" }}
    />
  );
}

function TerminalLine({ prefix, text, color, mono = true, dim = false, indent = false }) {
  const textColor = useColorModeValue(
    dim ? "#9ca3af" : color || "#1a1a1a",
    dim ? "rgba(255,255,255,0.28)" : color || "rgba(255,255,255,0.88)"
  );
  return (
    <Flex align="flex-start" gap={2} pl={indent ? 4 : 0}>
      {prefix && (
        <Text
          fontFamily="'JetBrains Mono', monospace"
          fontSize="12px"
          color={color || "rgba(124,58,237,0.8)"}
          flexShrink={0}
          lineHeight={1.6}
        >
          {prefix}
        </Text>
      )}
      <Text
        fontFamily={mono ? "'JetBrains Mono', monospace" : "'Sora', sans-serif"}
        fontSize="12px"
        color={textColor}
        lineHeight={1.6}
        whiteSpace="pre-wrap"
        wordBreak="break-word"
      >
        {text}
      </Text>
    </Flex>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
export default function ContactTerminal() {
  const [step, setStep] = useState(0); // which prompt
  const [formData, setFormData] = useState({});
  const [inputVal, setInputVal] = useState("");
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]); // [{type, text}]
  const [phase, setPhase] = useState("motd"); // motd | prompt | typing-response | done | sent
  const [activeQuestion, setActiveQuestion] = useState("");
  const [typing, setTyping] = useState(false);
  const inputRef = useRef(null);
  const scrollRef = useRef(null);
  const panelRef = useRef(null);

  const accent = "#14b8a6";
  const purpleAccent = "#7c3aed";
  const cardBg = useColorModeValue("rgba(245,245,247,0.95)", "rgba(6,6,8,0.96)");
  const borderColor = useColorModeValue("rgba(0,0,0,0.10)", "rgba(255,255,255,0.07)");
  const dimColor = useColorModeValue("#9ca3af", "rgba(255,255,255,0.3)");
  const textColor = useColorModeValue("#111", "rgba(255,255,255,0.88)");
  const inputBg = useColorModeValue("rgba(255,255,255,0.6)", "rgba(255,255,255,0.04)");

  // Boot sequence
  useEffect(() => {
    let t1, t2;
    t1 = setTimeout(() => {
      setHistory([
        { type: "motd", text: MOTD[0] },
        { type: "motd", text: MOTD[1] },
        { type: "motd", text: MOTD[2] },
      ]);
    }, 400);
    t2 = setTimeout(() => {
      setPhase("prompt");
      setActiveQuestion(PROMPTS[0].question);
    }, 900);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, activeQuestion, phase]);

  // Focus input
  useEffect(() => {
    if (phase === "prompt") {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [phase, step]);

  // GSAP shake on error
  const shakeInput = useCallback(() => {
    if (!inputRef.current) return;
    gsap.fromTo(
      inputRef.current,
      { x: -8 },
      { x: 0, duration: 0.4, ease: "elastic.out(1, 0.3)", clearProps: "x" }
    );
  }, []);

  const handleSubmit = () => {
    if (phase !== "prompt") return;
    const current = PROMPTS[step];
    const validation = current.validate(inputVal);

    if (validation !== true) {
      setError(validation);
      shakeInput();
      return;
    }
    setError("");

    const userEntry = { type: "user", key: current.key, text: inputVal.trim() };
    const newFormData = { ...formData, [current.key]: inputVal.trim() };
    setFormData(newFormData);
    setInputVal("");

    // Add user input to history
    setHistory((h) => [...h, userEntry]);
    setPhase("typing-response");

    // Simulate typing delay then show response
    const responseText = current.response(inputVal.trim());
    setTimeout(() => {
      setHistory((h) => [...h, { type: "system", text: responseText }]);

      setTimeout(() => {
        const nextStep = step + 1;
        if (nextStep < PROMPTS.length) {
          setStep(nextStep);
          setActiveQuestion(PROMPTS[nextStep].question);
          setPhase("prompt");
        } else {
          // All done
          setPhase("sending");
          setTimeout(() => {
            setHistory((h) => [
              ...h,
              { type: "success", text: "Message encrypted and queued for delivery." },
              { type: "success", text: `Expect a reply at ${newFormData.email} within 24h.` },
            ]);
            setPhase("done");
          }, 1400);
        }
      }, responseText.length * 22 + 300);
    }, 200);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  const reset = () => {
    setStep(0);
    setFormData({});
    setInputVal("");
    setError("");
    setPhase("motd");
    setHistory([]);
    setActiveQuestion("");
    setTimeout(() => {
      setHistory([
        { type: "motd", text: MOTD[0] },
        { type: "motd", text: MOTD[1] },
        { type: "motd", text: MOTD[2] },
      ]);
      setTimeout(() => {
        setPhase("prompt");
        setActiveQuestion(PROMPTS[0].question);
      }, 500);
    }, 300);
  };

  const current = PROMPTS[step] || PROMPTS[PROMPTS.length - 1];

  return (
    <>
      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
      <Box
        as="section"
        bg="transparent"
        px={{ base: 5, md: 12, lg: 20 }}
        py={{ base: 20, md: 16 }}
      >
        <Flex direction="column" align="flex-start" w="full" maxW="1200px" mx="auto" gap={8}>
          {/* Section Header */}
          <Box mb={4}>
            <Flex align="center" gap={3} mb={3}>
              <Box w="24px" h="1px" bgGradient="linear(to-r, #ec4899, #7c3aed)" />
              <Text fontFamily="'JetBrains Mono', monospace" fontSize="9px"
                letterSpacing="0.3em" textTransform="uppercase" color={dimColor}>
                Contact
              </Text>
            </Flex>
            <Text fontFamily="'Orbitron', sans-serif" fontWeight={900}
              fontSize={{ base: "26px", md: "clamp(26px,4vw,40px)" }}
              letterSpacing="-0.02em" lineHeight={1.05}
              bgGradient="linear(to-r, #1e40af, #7c3aed, #ec4899)"
              bgClip="text" display="inline-block" w="fit-content">
              Say hello
            </Text>
            <Text fontFamily="'Orbitron', sans-serif" fontWeight={900}
              fontSize={{ base: "26px", md: "clamp(26px,4vw,40px)" }}
              letterSpacing="-0.02em" lineHeight={1.05}
              color={useColorModeValue("#2a2a2a", "rgba(255,255,255,0.18)")}>
              via the terminal.
            </Text>
          </Box>

          {/* Terminal panel */}
          <Box
            ref={panelRef}
            w="full"
            maxW="720px"
            bg={cardBg}
            backdropFilter="blur(24px)"
            border="1px solid"
            borderColor={borderColor}
            borderRadius="16px"
            overflow="hidden"
            boxShadow="0 24px 60px rgba(0,0,0,0.35)"
          >
            {/* Title bar */}
            <Flex
              align="center"
              gap={3}
              px={5}
              py={3}
              borderBottom="1px solid"
              borderColor={borderColor}
              bg={useColorModeValue("rgba(247,247,248,0.6)", "rgba(0,0,0,0.4)")}
            >
              {/* Traffic lights */}
              {["#ff5f57", "#febc2e", "#28c840"].map((c, i) => (
                <Box key={i} w="11px" h="11px" borderRadius="50%" bg={c} opacity={0.8} />
              ))}
              <Box flex={1} />
              <Text fontFamily="'JetBrains Mono', monospace" fontSize="10px"
                letterSpacing="0.18em" color={dimColor}>
                contact.sh
              </Text>
              <Box flex={1} />
              {/* Progress dots */}
              <Flex gap={1.5}>
                {PROMPTS.map((_, i) => (
                  <Box key={i} w="5px" h="5px" borderRadius="50%"
                    bg={i < step ? accent : i === step && phase !== "done" ? purpleAccent : "rgba(255,255,255,0.15)"}
                    style={{ transition: "background 0.3s ease" }} />
                ))}
              </Flex>
            </Flex>

            {/* Terminal body */}
            <Box
              ref={scrollRef}
              px={5}
              py={5}
              minH="300px"
              maxH={{ base: "380px", md: "440px" }}
              overflowY="auto"
              fontFamily="'JetBrains Mono', monospace"
              css={{
                "&::-webkit-scrollbar": { width: "4px" },
                "&::-webkit-scrollbar-track": { background: "transparent" },
                "&::-webkit-scrollbar-thumb": { background: "rgba(124,58,237,0.3)", borderRadius: "4px" },
              }}
            >
              {/* History */}
              <Flex direction="column" gap={1.5}>
                {history.map((line, i) => (
                  <MotionBox
                    key={i}
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {line.type === "motd" && (
                      <TerminalLine prefix=">" text={line.text} color="rgba(124,58,237,0.7)" dim />
                    )}
                    {line.type === "user" && (
                      <TerminalLine prefix="$" text={line.text} color={accent} />
                    )}
                    {line.type === "system" && (
                      <TerminalLine prefix="↳" text={line.text} color={dimColor} mono={false} />
                    )}
                    {line.type === "success" && (
                      <TerminalLine prefix="✓" text={line.text} color={accent} />
                    )}
                  </MotionBox>
                ))}

                {/* Divider after MOTD */}
                {history.some((h) => h.type === "motd") && (
                  <Box my={2} h="1px" bgGradient="linear(to-r, transparent, rgba(124,58,237,0.25), transparent)" />
                )}

                {/* Active prompt */}
                {(phase === "prompt" || phase === "typing-response") && activeQuestion && (
                  <MotionBox
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <TerminalLine prefix="?" text={activeQuestion} color={purpleAccent} />
                  </MotionBox>
                )}

                {/* Sending animation */}
                {phase === "sending" && (
                  <MotionBox
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    display="flex" alignItems="center" gap={2} mt={2}
                  >
                    {[0, 1, 2].map((i) => (
                      <Box
                        key={i}
                        w="6px" h="6px" borderRadius="50%" bg={accent}
                        style={{
                          animation: `blink 1s ease-in-out ${i * 0.2}s infinite`,
                        }}
                      />
                    ))}
                    <Text fontFamily="'JetBrains Mono', monospace" fontSize="11px" color={accent}>
                      Sending...
                    </Text>
                  </MotionBox>
                )}

                {/* Done state */}
                {phase === "done" && (
                  <MotionBox
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    mt={3}
                  >
                    <Box
                      px={4} py={3} borderRadius="10px"
                      border="1px solid" borderColor={`${accent}35`}
                      bg={`${accent}08`}
                    >
                      <Text fontFamily="'JetBrains Mono', monospace" fontSize="11px"
                        color={accent} letterSpacing="0.1em">
                        ✓ Message sent successfully
                      </Text>
                    </Box>
                  </MotionBox>
                )}
              </Flex>
            </Box>

            {/* Input row */}
            <Box borderTop="1px solid" borderColor={borderColor}>
              <AnimatePresence>
                {error && (
                  <MotionBox
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    px={5}
                    py={2}
                    bg="rgba(239,68,68,0.08)"
                    borderBottom="1px solid rgba(239,68,68,0.2)"
                  >
                    <Text fontFamily="'JetBrains Mono', monospace" fontSize="10px"
                      color="rgba(239,68,68,0.8)" letterSpacing="0.1em">
                      ✗ {error}
                    </Text>
                  </MotionBox>
                )}
              </AnimatePresence>

              {phase === "prompt" ? (
                <Flex align="center" px={5} py={4} gap={3}>
                  <Text fontFamily="'JetBrains Mono', monospace" fontSize="12px"
                    color={accent} flexShrink={0}>$</Text>
                  <Input
                    ref={inputRef}
                    value={inputVal}
                    onChange={(e) => { setInputVal(e.target.value); setError(""); }}
                    onKeyDown={handleKeyDown}
                    placeholder={current.placeholder}
                    variant="unstyled"
                    fontFamily="'JetBrains Mono', monospace"
                    fontSize="12px"
                    color={textColor}
                    flex={1}
                    _placeholder={{ color: dimColor, fontSize: "11px" }}
                    autoComplete="off"
                    spellCheck={false}
                  />
                  <Box
                    as="button"
                    onClick={handleSubmit}
                    px={3} py={1.5} borderRadius="7px"
                    border="1px solid" borderColor={`${accent}35`}
                    bg={`${accent}10`} color={accent}
                    fontFamily="'JetBrains Mono', monospace"
                    fontSize="9px" letterSpacing="0.18em" textTransform="uppercase"
                    cursor="pointer" flexShrink={0}
                    style={{ transition: "all 0.15s ease" }}
                    _hover={{ bg: `${accent}20` }}
                  >
                    ↵ Send
                  </Box>
                </Flex>
              ) : phase === "done" ? (
                <Flex px={5} py={4} justify="space-between" align="center">
                  <Text fontFamily="'JetBrains Mono', monospace" fontSize="10px"
                    letterSpacing="0.12em" color={dimColor}>
                    Session complete
                  </Text>
                  <Box
                    as="button"
                    onClick={reset}
                    px={3} py={1.5} borderRadius="7px"
                    border="1px solid" borderColor="rgba(124,58,237,0.3)"
                    bg="rgba(124,58,237,0.08)" color={purpleAccent}
                    fontFamily="'JetBrains Mono', monospace"
                    fontSize="9px" letterSpacing="0.18em" textTransform="uppercase"
                    cursor="pointer"
                    style={{ transition: "all 0.15s ease" }}
                    _hover={{ bg: "rgba(124,58,237,0.16)" }}
                  >
                    New session
                  </Box>
                </Flex>
              ) : (
                <Flex px={5} py={4} align="center" gap={2}>
                  <Cursor accent={accent} />
                  <Text fontFamily="'JetBrains Mono', monospace" fontSize="11px" color={dimColor}>
                    processing...
                  </Text>
                </Flex>
              )}
            </Box>
          </Box>

          {/* Hint */}
          <Text fontFamily="'JetBrains Mono', monospace" fontSize="9px"
            letterSpacing="0.15em" textTransform="uppercase" color={dimColor} opacity={0.5}>
            Press ↵ to confirm each field
          </Text>
        </Flex>
      </Box>
    </>
  );
}