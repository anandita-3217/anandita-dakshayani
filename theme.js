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
    brand: { // Try to avoid if possible 
      50: '#e6fffa',
      400: '#14b8a6', // teal
      500: '#0d9488',
      600: '#0f766e',
    },
  
    gradients: {
      most: 'linear(to-r, #1e40af, #7c3aed,#ec4899)', // most used
      primary: 'linear(to-r, #10b981, #3b82f6, #8b5cf6)',
      accent: 'linear(to-r, #f093fb, #667eea, #4facfe)',
      rainbow: 'linear(to-r, #14b8a6, #667eea, #f093fb, #4facfe)',
      ruby: 'linear(to-r, #dc2626, #c026d3, #7c3aed)',
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
      'text.subdued': {
        default: 'gray.500',
        _dark: 'whiteAlpha.400',
      },
      // Row number (big faded number behind each project)
        'text.ghost': {
          default: 'gray.200',
          _dark: 'rgba(255,255,255,0.06)',
        },
      // Default description text
      'text.dim': {
        default: 'gray.400',
        _dark: 'rgba(255,255,255,0.28)',
      },

      // Hovered description text
      'text.dimHover': {
        default: 'gray.600',
        _dark: 'rgba(255,255,255,0.6)',
      },

      // Default title text
      'text.strong': {
        default: 'gray.700',
        _dark: 'rgba(255,255,255,0.8)',
      },

      // Tech stack badge text (default)
      'text.badge': {
        default: 'gray.400',
        _dark: 'rgba(255,255,255,0.22)',
      },

      // Tech stack badge text (hovered)
      'text.badgeHover': {
        default: 'gray.600',
        _dark: 'rgba(255,255,255,0.5)',
      },
      // Divider slash between Code / Demo links
      'text.slash': {
        default: 'gray.300',
        _dark: 'rgba(255,255,255,0.1)',
      },

      // Default Code/Demo link text
      'text.link': {
        default: 'gray.400',
        _dark: 'rgba(255,255,255,0.2)',
      },

      // Project count "6 projects" label
      'text.counter': {
        default: 'gray.400',
        _dark: 'whiteAlpha.200',
      },

      // "Side quests" label
      'text.eyebrow': {
        default: 'gray.400',
        _dark: 'whiteAlpha.400',
      },

      // Stats labels (PROJECTS, THINGS LEARNED etc.)
      'text.statLabel': {
        default: 'gray.400',
        _dark: 'whiteAlpha.350',
      },

      // CTA subtitle
      'text.ctaSubtitle': {
        default: 'gray.500',
        _dark: 'whiteAlpha.400',
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
      'bg.subdued': {
      default: 'gray.100',
      _dark: 'gray.900',
    },
    // Tech stack badge background
    'bg.badge': {
      default: 'gray.100',
      _dark: 'rgba(255,255,255,0.04)',
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
        default: '#81e6d9',
        _dark: '#115e59',
      },
      'border.subdued': {
        default: 'gray.200',
        _dark: 'rgba(255,255,255,0.08)',
      },
      // Tech stack badge border
      'border.badge': {
        default: 'gray.200',
        _dark: 'rgba(255,255,255,0.07)',
      },
      
      // Row divider line (center of gradient)
      'border.row': {
        default: 'gray.200',
        _dark: 'rgba(255,255,255,0.05)',
      },
      

      // -------------------------
      // BORDERS
      // -------------------------

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
      // Glassmorphic surfaces
      'surface.glass': {
        default: 'rgba(255, 255, 255, 0.7)',
        _dark: 'rgba(255, 255, 255, 0.02)',
      },
      'surface.glassElevated': {
        default: 'rgba(255, 255, 255, 0.9)',
        _dark: 'rgba(255, 255, 255, 0.05)',
      },
        // Darker variant for contrast
      'surface.darker': {
        default: '#e5e7eb',
        _dark: '#0f0f0f',
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
