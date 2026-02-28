import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
fonts: {
    heading: `'Orbitron', sans-serif`,
    body: `'Sora', sans-serif`,
  },

  colors: {
    brand: {
      50: '#e6fffa',
      100: '#b2f5ea',
      200: '#81e6d9',
      300: '#4fd1c5',
      400: '#14b8a6', // teal
      500: '#0d9488',
      600: '#0f766e',
      700: '#115e59',
      800: '#134e4a',
      900: '#0f3d3a',
    },
      pink: {
    50: '#fef1f7',
    100: '#fee5ef',
    200: '#fccce0',
    300: '#faa2c8',
    400: '#f472b6',  // Main hot pink
    500: '#ec4899',  // Vibrant magenta
    600: '#db2777',
    700: '#be185d',
    800: '#9d174d',
    900: '#831843',
  },
  
  // ROSE PALETTE - Softer, elegant pink
  rose: {
    50: '#fff1f2',
    100: '#ffe4e6',
    200: '#fecdd3',
    300: '#fda4af',
    400: '#fb7185',  // Main rose
    500: '#f43f5e',  // Deep rose
    600: '#e11d48',
    700: '#be123c',
    800: '#9f1239',
    900: '#881337',
  },
  
  // FUCHSIA PALETTE - Purple-leaning pink
  fuchsia: {
    50: '#fdf4ff',
    100: '#fae8ff',
    200: '#f5d0fe',
    300: '#f0abfc',
    400: '#e879f9',  // Main fuchsia
    500: '#d946ef',  // Vibrant fuchsia
    600: '#c026d3',
    700: '#a21caf',
    800: '#86198f',
    900: '#701a75',
  },
  
  // CORAL PALETTE - Pink-orange blend
  coral: {
    50: '#fff5f5',
    100: '#ffe8e8',
    200: '#ffd0d0',
    300: '#ffb3b3',
    400: '#ff8a8a',  // Main coral
    500: '#ff6b6b',  // Vibrant coral
    600: '#ff4757',
    700: '#ee2c3c',
    800: '#d62839',
    900: '#b91f2f',
  },
  accent: {        // Add pink as accent
    50: '#fef1f7',
    100: '#fee5ef',
    200: '#fccce0',
    300: '#faa2c8',
    400: '#f472b6',  // Use this for highlights
    500: '#ec4899',
    600: '#db2777',
    700: '#be185d',
    800: '#9d174d',
    900: '#831843',
  },


    gradients: {
      primary: 'linear(to-r, #10b981, #3b82f6, #8b5cf6)',
      brand: 'linear(to-r, #14b8a6, #667eea)',
      accent: 'linear(to-r, #f093fb, #667eea, #4facfe)',
      rainbow: 'linear(to-r, #14b8a6, #667eea, #f093fb, #4facfe)',
      ruby: 'linear(to-r, #dc2626, #c026d3, #7c3aed)',
      jewel: 'linear(to-r, #059669, #2563eb, #9333ea)', // Top choice
      warm: 'linear(to-r, #f59e0b, #ef4444, #dc2626)',
      royal: 'linear(to-r, #1d4ed8, #7c3aed, #be123c)',
      sunset: 'linear(to-r, #059669, #f59e0b, #dc2626)',
      ocean: 'linear(to-r, #0891b2, #1e40af, #6b21a8)',
      tropical: 'linear(to-r, #06b6d4, #ec4899, #f97316)',
      galaxy: 'linear(to-r, #9333ea, #ec4899, #3b82f6)',
      fire: 'linear(to-r, #fb923c, #ef4444, #ec4899)',
      classic: 'linear(to-r, #059669, #2563eb, #9333ea)',
      deep: 'linear(to-r, #047857, #1e40af, #7c3aed)',
      vibrant: 'linear(to-r, #10b981, #06b6d4, #3b82f6, #8b5cf6, #ec4899)',
      royalDeep: 'linear(to-r, #1e3a8a, #6b21a8, #be185d)',
},
  },

  semanticTokens: {
    colors: {
      // -------------------------
      // TEXT
      // -------------------------
      'text.primary': {
        default: 'gray.700', // softer than gray.900
        _dark: 'white',
      },
      'text.secondary': {
        default: 'gray.600',
        _dark: 'gray.400',
      },
      'text.muted': {
        default: 'gray.500',
        _dark: 'gray.500',
      },

      // -------------------------
      // BACKGROUNDS
      // softer light theme colors
      // -------------------------
      'bg.primary': {
        default: '#f7f7f8', // soft neutral instead of white
        _dark: 'gray.800',
      },
      'bg.secondary': {
        default: '#ececee', // light but not bright
        _dark: 'gray.900',
      },
      'bg.tertiary': {
        default: '#e5e7eb', // calm gray (Tailwind gray-200 equiv)
        _dark: '#1a1a1a',
      },
      'bg.hover': {
        default: '#e2e4e7', // softer hover
        _dark: 'gray.700',
      },
      'bg.accent': {
        default: 'rgba(20, 184, 166, 0.08)', // subtle teal tint
        _dark: 'rgba(20, 184, 166, 0.1)',
      },

      // -------------------------
      // BORDERS
      // -------------------------
      'border.primary': {
        default: '#d4d4d8', // calm border (gray-300ish)
        _dark: 'gray.700',
      },
      'border.secondary': {
        default: '#c8c8cc',
        _dark: 'gray.600',
      },
      'border.accent': {
        default: 'brand.200',
        _dark: 'brand.700',
      },
      'button.primary.bg': {
      default: 'black',      // Light mode: black button
      _dark: 'white',        // Dark mode: white button
    },
    'button.primary.text': {
      default: 'white',      // Light mode: white text
      _dark: 'black',        // Dark mode: black text
    },
      'button.secondary.bg': {
      default: 'white',      // Light mode: black button
      _dark: 'black',        // Dark mode: white button
    },
    'button.secondary.text': {
      default: 'black',      // Light mode: white text
      _dark: 'white',        // Dark mode: black text
    },

      // -------------------------
      // SURFACES
      // -------------------------
      'surface.card': {
        default: '#ffffff', // card still white for contrast
        _dark: '#1f1f1f',
      },
      'surface.elevated': {
        default: '#fafafa', // slightly elevated
        _dark: '#2a2a2a',
      },
      // NEW SURFACE OPTIONS:
    
    // Glassmorphic surfaces
    'surface.glass': {
      default: 'rgba(255, 255, 255, 0.7)',
      _dark: 'rgba(255, 255, 255, 0.02)',
    },
    'surface.glassElevated': {
      default: 'rgba(255, 255, 255, 0.9)',
      _dark: 'rgba(255, 255, 255, 0.05)',
    },
    
    // Tinted surfaces
    'surface.teal': {
      default: 'rgba(20, 184, 166, 0.03)',
      _dark: 'rgba(20, 184, 166, 0.05)',
    },
    'surface.pink': {
      default: 'rgba(236, 72, 153, 0.03)',
      _dark: 'rgba(236, 72, 153, 0.05)',
    },
    'surface.purple': {
      default: 'rgba(139, 92, 246, 0.03)',
      _dark: 'rgba(139, 92, 246, 0.05)',
    },
    
    // Subtle gradient surfaces
    'surface.gradientSubtle': {
      default: 'linear-gradient(135deg, rgba(20, 184, 166, 0.05), rgba(236, 72, 153, 0.05))',
      _dark: 'linear-gradient(135deg, rgba(20, 184, 166, 0.08), rgba(236, 72, 153, 0.08))',
    },
    
    // Darker variants for contrast
    'surface.darker': {
      default: '#e5e7eb',
      _dark: '#0f0f0f',
    },
    'surface.darkest': {
      default: '#d1d5db',
      _dark: '#050505',
    },
    
    // Frosted glass effect
    'surface.frosted': {
      default: 'rgba(247, 247, 248, 0.8)',
      _dark: 'rgba(31, 31, 31, 0.8)',
    },
    
    // Overlay surfaces
    'surface.overlay': {
      default: 'rgba(0, 0, 0, 0.5)',
      _dark: 'rgba(0, 0, 0, 0.7)',
    },
    'surface.overlayLight': {
      default: 'rgba(0, 0, 0, 0.3)',
      _dark: 'rgba(0, 0, 0, 0.5)',
    },
    
    // Highlight surfaces
    'surface.highlight': {
      default: 'rgba(20, 184, 166, 0.1)',
      _dark: 'rgba(20, 184, 166, 0.15)',
    },
    'surface.highlightPink': {
      default: 'rgba(236, 72, 153, 0.1)',
      _dark: 'rgba(236, 72, 153, 0.15)',
    },
    
    // Subtle depth variants
    'surface.sunken': {
      default: '#f1f1f3',
      _dark: '#161616',
    },
    'surface.raised': {
      default: '#ffffff',
      _dark: '#2d2d2d',
    },
    },
  },

  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === 'dark' ? '#0a0a0a' : '#f7f7f8',
        color: props.colorMode === 'dark' ? 'white' : 'gray.700',
        transition: 'background-color 0.3s ease, color 0.3s ease',
      },

      // Scrollbars
      '*::-webkit-scrollbar': {
        width: '10px',
        height: '10px',
      },
      '*::-webkit-scrollbar-track': {
        bg: props.colorMode === 'dark' ? 'gray.900' : '#ececee',
      },
      '*::-webkit-scrollbar-thumb': {
        bg: props.colorMode === 'dark' ? 'gray.700' : '#bdbdc2',
        borderRadius: 'full',
      },
      '*::-webkit-scrollbar-thumb:hover': {
        bg: props.colorMode === 'dark' ? 'gray.600' : '#a8a8ad',
      },
    }),
  },

  components: {
    Button: {
      variants: {
        solid: (props) => ({
          bg: props.colorMode === 'dark' ? 'brand.400' : 'brand.500',
          color: 'white',
          _hover: {
            bg: props.colorMode === 'dark' ? 'brand.500' : 'brand.600',
          },
        }),
        outline: (props) => ({
          borderColor:
            props.colorMode === 'dark' ? 'border.secondary' : 'border.primary',
          color: 'text.primary',
          _hover: {
            borderColor: 'brand.400',
            color: 'brand.500',
            bg: props.colorMode === 'dark'
              ? 'rgba(20, 184, 166, 0.1)'
              : 'rgba(20, 184, 166, 0.08)',
          },
        }),
      },
    },

    Input: {
      variants: {
        outline: (props) => ({
          field: {
            bg: props.colorMode === 'dark' ? 'bg.secondary' : '#ffffff',
            borderColor:
              props.colorMode === 'dark' ? 'border.primary' : '#ccc',
            _hover: {
              borderColor: 'brand.400',
            },
            _focus: {
              borderColor: 'brand.400',
              boxShadow: `0 0 0 1px ${
                props.colorMode === 'dark' ? '#14b8a6' : '#0d9488'
              }`,
            },
          },
        }),
      },
    },

    Textarea: {
      variants: {
        outline: (props) => ({
          bg: props.colorMode === 'dark' ? 'bg.secondary' : '#ffffff',
          borderColor:
            props.colorMode === 'dark' ? 'border.primary' : '#ccc',
          _hover: {
            borderColor: 'brand.400',
          },
          _focus: {
            borderColor: 'brand.400',
            boxShadow: `0 0 0 1px ${
              props.colorMode === 'dark' ? '#14b8a6' : '#0d9488'
            }`,
          },
        }),
      },
    },

    Card: {
      baseStyle: (props) => ({
        container: {
          bg: props.colorMode === 'dark' ? 'surface.card' : '#ffffff',
          borderColor:
            props.colorMode === 'dark' ? 'border.primary' : '#d4d4d8',
        },
      }),
    },
  },
});

export default theme;
