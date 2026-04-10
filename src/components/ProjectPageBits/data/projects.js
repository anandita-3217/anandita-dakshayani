// const PROJECTS = [
//   {
//     id: 1,
//     title: "NeuralDraft",
//     tagline: "AI-powered writing assistant for engineers",
//     description:
//       "A real-time document editor with GPT-4 integration, contextual completions, and collaborative cursors. Designed for dev teams shipping fast.",
//     techStack: ["React", "TypeScript", "OpenAI", "Socket.io", "Redis", "Postgres"],
//     useCase: ["Productivity", "AI", "Collaboration"],
//     type: "Web App",
//     category: "AI",
//     accent: "#14b8a6",
//     status: "Live",
//     year: "2024",
//     url: "#",
//     metrics: [
//       { label: "Active Users", value: "2.4K" },
//       { label: "Tokens/Day", value: "18M" },
//     ],
//   },
//   {
//     id: 2,
//     title: "OrbitCI",
//     tagline: "Visual pipeline builder for CI/CD workflows",
//     description:
//       "Drag-and-drop CI/CD pipeline orchestrator with YAML export, multi-cloud runners, and real-time log streaming. Zero config by default.",
//     techStack: ["Vue 3", "Go", "Docker", "Kubernetes", "GitHub Actions"],
//     useCase: ["DevOps", "Automation", "Infrastructure"],
//     type: "Dev Tool",
//     category: "DevOps",
//     accent: "#f4845f",
//     status: "Beta",
//     year: "2024",
//     url: "#",
//     metrics: [
//       { label: "Pipelines", value: "340+" },
//       { label: "Deploy Time", value: "-62%" },
//     ],
//   },
//   {
//     id: 3,
//     title: "Spectral UI",
//     tagline: "Design system generator from Figma tokens",
//     description:
//       "Converts Figma design tokens into production-ready Chakra, MUI, or Tailwind themes. Supports dark mode, typography scales, and component overrides.",
//     techStack: ["Next.js", "Figma API", "Tailwind", "Node.js", "PostCSS"],
//     useCase: ["Design", "Frontend", "Automation"],
//     type: "Library",
//     category: "Design",
//     accent: "#e8c547",
//     status: "OSS",
//     year: "2023",
//     url: "#",
//     metrics: [
//       { label: "GitHub Stars", value: "1.1K" },
//       { label: "Themes Built", value: "870+" },
//     ],
//   },
//   {
//     id: 4,
//     title: "Echelon",
//     tagline: "Real-time sports analytics dashboard",
//     description:
//       "High-frequency sports data platform with WebSocket feeds, predictive models, and exportable PDF reports. Built for analysts, not fans.",
//     techStack: ["React", "D3.js", "FastAPI", "TimescaleDB", "WebSockets"],
//     useCase: ["Analytics", "Data Viz", "Sports"],
//     type: "Dashboard",
//     category: "Data",
//     accent: "#7c3aed",
//     status: "Live",
//     year: "2023",
//     url: "#",
//     metrics: [
//       { label: "Events/Sec", value: "12K" },
//       { label: "Accuracy", value: "94.3%" },
//     ],
//   },
//   {
//     id: 5,
//     title: "Phoneme",
//     tagline: "Browser-native audio transcription SDK",
//     description:
//       "Lightweight WASM-powered transcription library using Whisper distilled models. Works fully offline. Sub-200ms latency on modern hardware.",
//     techStack: ["TypeScript", "WebAssembly", "Rust", "Whisper", "Web Workers"],
//     useCase: ["Accessibility", "Audio", "SDK"],
//     type: "Library",
//     category: "AI",
//     accent: "#14b8a6",
//     status: "OSS",
//     year: "2024",
//     url: "#",
//     metrics: [
//       { label: "NPM Downloads", value: "48K" },
//       { label: "Bundle Size", value: "3.2MB" },
//     ],
//   },
//   {
//     id: 6,
//     title: "Terrarium",
//     tagline: "Sandboxed code execution for LLM apps",
//     description:
//       "Secure, isolated execution environment for running AI-generated code. Supports Python, JS, and Bash with resource quotas and audit logs.",
//     techStack: ["Rust", "gVisor", "Python", "gRPC", "Firecracker"],
//     useCase: ["Security", "Infrastructure", "AI"],
//     type: "Backend",
//     category: "DevOps",
//     accent: "#f4845f",
//     status: "Beta",
//     year: "2024",
//     url: "#",
//     metrics: [
//       { label: "Exec Latency", value: "38ms" },
//       { label: "Sandbox Limit", value: "∞" },
//     ],
//   },
// ];

// src/data/projects.js
// ─── Single source of truth for all project data ─────────────────────────────
// Used by: Projects.jsx, ProjectsConstellation.jsx, ProjectsIntro.jsx,
//          CommandPalette.jsx, StatsTicker.jsx
//
// To add a project: copy one block, fill it in, done.
// Accent colors: teal #14b8a6 · purple #7c3aed · pink #ec4899
//                amber #e8c547 · coral #f4845f


// TODO: REDUCE THE DESCRIPTION


export const PROJECTS = [
  {
    id: 1,
    title: "FloraNet",
    tagline: "A shared island where strangers plant hand-drawn flowers",
    description:
      "Collaborative full-stack web app where anyone can draw a flower on a canvas and plant it on a shared SVG island. Positions persist per-browser via localStorage; drawings live in PostgreSQL so the garden grows across all visitors. Built to learn full-stack patterns end-to-end — data flow, optimistic UI updates, and API design.",
    techStack: ["Next.js", "TypeScript", "Tailwind", "PostgreSQL", "Canvas API"],
    useCase: ["Creative", "Full-stack", "Collaborative"],
    type: "Web App",
    category: "Full-stack",
    accent: "#14b8a6",
    status: "LIVE",
    year: "2026",
    url: "#",
    github: "https://github.com/anandita-3217/experimental-garden",
    metrics: [
      { label: "API Routes", value: "3" },
      { label: "Storage Layers", value: "2" },
    ],
    learnt:
      "How to keep two storage systems (localStorage + Postgres) in sync without losing optimistic updates.",
  },

  {
    id: 2,
    title: "SplitEasy",
    tagline: "Debt-minimising expense splitter with meme reminders",
    description:
      "Flask web app for splitting group expenses — trips, dinners, anything shared. Uses a greedy net-balance algorithm to minimise the number of transactions needed to settle up. Overdue debts trigger in-app meme nudges at 3 and 7 days. Paying off a debt fires confetti. Built in 3 days for a CS50 final project.",
    techStack: ["Python", "Flask", "SQLite", "Bootstrap", "JavaScript"],
    useCase: ["Finance", "Productivity", "Social"],
    type: "Web App",
    category: "Full-stack",
    accent: "#7c3aed",
    status: "Live",
    year: "2025",
    url: "#",
    github: "https://github.com/anandita-3217/CS50xFinalProject",
    metrics: [
      { label: "Built In", value: "3 days" },
      { label: "Transactions ↓", value: "Greedy algo" },
    ],
    learnt:
      "Greedy debt-minimisation algorithms and why scope management is as important as code quality.",
  },

  {
    id: 3,
    title: "Noracle",
    tagline: "The chatbot that respectfully declines everything",
    description:
      "A deadpan chatbot powered by the no-as-a-service API — it responds to every message with a creative, contextual 'no'. Includes client-side gibberish detection (vowel ratio, keyboard pattern matching, repeated character detection) to avoid wasting API calls. Zero data collection by design — no DB, no localStorage, no analytics. Hit refresh and it forgets you existed.",
    techStack: ["Next.js", "TypeScript", "Tailwind", "Material UI", "Framer Motion", "Express"],
    useCase: ["Humour", "API Integration", "Frontend"],
    type: "Web App",
    category: "Frontend",
    accent: "#ec4899",
    status: "Live",
    year: "2025",
    url: "#",
    github: "https://github.com/anandita-3217/Noracle",
    metrics: [
      { label: "Data Collected", value: "Zero" },
      { label: "Answer", value: "Always no" },
    ],
    learnt:
      "Client-side heuristics for input validation, and how to build something genuinely fun while keeping the codebase clean.",
  },

  {
    id: 4,
    title: "GhostLens",
    tagline: "Catching AI faces in the frequency domain",
    description:
      "ML research project detecting deepfake images using two approaches: frequency-domain SVM (GANs leave artifacts in Fourier space) and DenseNet transfer learning. The SVM pipeline applies DFT → magnitude spectrum → azimuthal averaging to produce a 1D texture fingerprint per image. Achieved up to 99.7% detection accuracy on CelebA-derived datasets. Built to understand why deepfakes matter, not just how to detect them.",
    techStack: ["Python", "Keras", "scikit-learn", "Jupyter", "NumPy"],
    useCase: ["AI Safety", "Machine Learning", "Research"],
    type: "ML Research",
    category: "AI",
    accent: "#e8c547",
    status: "OSS",
    year: "2023",
    url: "#",
    github: "https://github.com/anandita/DeepFakeDetectionProject",
    metrics: [
      { label: "Accuracy", value: "99.7%" },
      { label: "Approaches", value: "2 (SVM + DenseNet)" },
    ],
    learnt:
      "How GANs leave frequency-domain fingerprints, and how to explain a technical project so non-ML people actually care about it.",
  },
];

// ─── Derived helpers ──────────────────────────────────────────────────────────
// These are pre-computed so filter UIs don't recalculate on every render.

export const ALL_TECH = [
  ...new Set(PROJECTS.flatMap((p) => p.techStack)),
].sort();

export const ALL_USECASES = [
  ...new Set(PROJECTS.flatMap((p) => p.useCase)),
].sort();

export const ALL_TYPES = [...new Set(PROJECTS.map((p) => p.type))].sort();

// ─── Stats for StatsTicker / ProjectsIntro ────────────────────────────────────
export const PROJECT_STATS = {
  total: PROJECTS.length,
  totalTech: ALL_TECH.length,
  liveCount: PROJECTS.filter((p) => p.status === "Live").length,
  ossCount: PROJECTS.filter((p) => p.status === "OSS").length,
};