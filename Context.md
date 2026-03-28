DESIGN SYSTEM: Dark-first cinematic portfolio

FONTS (non-negotiable):
- Orbitron — all headings, eyebrows, stat numbers, tab labels, button text
- Sora — body copy, tag pills, secondary descriptions
- JetBrains Mono — metadata, timestamps, version strings, form labels, counters, monospace UI

COLOR PALETTE:
- Primary gradient: #1e40af → #7c3aed → #ec4899 (used on headings, progress bars, dividers)
- Teal accent: #14b8a6 (primary action color, badges, active states, glow dots)
- Purple: #7c3aed (buttons, stars, hover borders, cursor)
- Pink: #ec4899 (gradient endpoint, eyebrow dividers)
- Coral: #f4845f (DevOps category, warning pace)
- Amber: #e8c547 (Design category)
- Background dark: #0a0a0a
- Background light: #f7f7f8
- All surfaces use rgba() with opacity — never solid opaque fills

SURFACE PATTERN (glass morphism):
- Dark mode card: rgba(10,10,10,0.82) or rgba(0,0,0,0.6)
- Light mode card: rgba(247,247,248,0.92) or rgba(255,255,255,0.85)
- Always: backdropFilter blur(10px–20px)
- Always: 1px solid border with rgba(255,255,255,0.06–0.10) dark / rgba(0,0,0,0.08–0.12) light
- Top hairline accent: linear-gradient(to right, transparent, rgba(124,58,237,0.35), transparent)
- Corner bracket marks: 14×14px boxes, border on two sides only, rgba(124,58,237,0.25)

HEADER PATTERN (every section uses this exact structure):
1. Eyebrow row: 24px gradient line (ec4899→7c3aed) + 9px Orbitron uppercase text, letterSpacing 0.3em, color text.subdued
2. Line 1: gradient text (bgGradient linear #1e40af→#7c3aed→#ec4899, bgClip text, display inline-block, w fit-content)
3. Line 2: same font/size but color text.subdued (rgba(255,255,255,0.18) dark / #2a2a2a light)
- Font: Orbitron, fontWeight 900, fontSize clamp(26px, 4vw, 40px), letterSpacing -0.02em, lineHeight 1.05

STAT NUMBERS:
- Plain color (not gradient text-fill) matching the accent color
- Orbitron, fontWeight 800, fontSize 28–36px
- _groupHover: textShadow 0 0 20px {color}
- Label below: Sora, 11px, letterSpacing 0.12em, uppercase, color text.statLabel

BUTTONS / INTERACTIVE ELEMENTS:
- No Chakra colorScheme — all custom Box as="button"
- Pattern: bg rgba(124,58,237,0.10), border 1px solid rgba(124,58,237,0.35), color #7c3aed
- Font: JetBrains Mono, 9px, letterSpacing 0.18em, textTransform uppercase
- Hover: bg rgba(124,58,237,0.18), translateY(-1px)
- Border radius: 8–10px
- Destructive: rgba(239,68,68,0.1) bg / rgba(239,68,68,0.3) border

TABS:
- variant="unstyled"
- Font: JetBrains Mono, 9px, letterSpacing 0.22em, uppercase
- Inactive: text.subdued color
- Active: text.primary + ::after pseudo with 2px gradient underline (same primary gradient)
- No background fill on active tab

BADGES / TAGS / CATEGORY PILLS:
- Custom Box (not Chakra Badge)
- px 2–3, py 0.5–1, borderRadius 5–6px
- bg: {accent}10–18, border: {accent}28–45, color: accent
- Font: JetBrains Mono, 8–10px, letterSpacing 0.12–0.22em, uppercase

FORM LABELS:
- Always JetBrains Mono, 8px, letterSpacing 0.2em, uppercase, color whiteAlpha.400 / gray.400

DIVIDERS / RULES:
- hairline h="1px" with gradient (transparent → accent → transparent)
- Never solid color dividers

MOTION:
- Entrance: opacity 0→1, y 24→0, duration 0.55s
- Stagger children: 0.04–0.12s delay increments
- Spring hovers: cubic-bezier(0.23, 1, 0.32, 1)
- Scroll-driven: useInView from react-intersection-observer, triggerOnce true
- Framer Motion throughout — motion.div, AnimatePresence for exits

COLOR MODE:
- Every color uses useColorModeValue(lightValue, darkValue)
- Light mode is a real first-class design (not just inverted dark)
- Semantic tokens: text.primary, text.subdued, text.dim, text.eyebrow, border.subdued, bg.badge etc.

LAYOUT PATTERN:
- maxW 1100–1200px, mx auto
- Outer Box: display flex, justifyContent center, px {base:5, md:12, lg:20}, py {base:20, md:16}
- Inner Flex: direction column, align flex-start, w full, maxW 1200px, gap 8
- No centered text blocks — everything left-aligned
- Full-bleed elements (carousels) use negative mx to break out of padding,
  then re-apply matching px on the inner track

SPACING VOCABULARY:
- Section gap: mb 10–12 (between header and content)
- Card padding: px 5–10, py 5–8
- Between eyebrow and heading: mb 3
- Between heading lines: lineHeight 1.05 (they almost touch)
- Stat row: spacing 8–14 between items

WHAT THIS AESTHETIC IS NOT:
- No rounded pill buttons with colorScheme
- No Chakra default shadows (no boxShadow "md" etc.)
- No system fonts (Inter, Arial, system-ui)
- No centered hero text
- No solid opaque card backgrounds
- No orange, green, red colorSchemes anywhere
- No emoji in UI (only in copy/content)
- No gradients as background fills — only as text clips, hairlines, progress bars


--- Context for ai coding agents