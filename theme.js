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
      // Soft romantic pink to purple
      rose: 'linear(to-r, #fecaca, #fda4af, #f472b6)',
        
      // Hot pink to magenta
      hotPink: 'linear(to-r, #ff1493, #ff69b4, #ff85c1)',
        
      // Pink to coral
      coral: 'linear(to-r, #ff6b9d, #ff8fab, #ffa8b8)',
        
      // Sunset pink to orange
      pinkSunset: 'linear(to-r, #ff6ec7, #ff8976, #ffa94d)',
        
      // Bubblegum pink
      bubblegum: 'linear(to-r, #ff9a9e, #fecfef, #ffd8f4)',
        
      // Neon pink to purple
      neonPink: 'linear(to-r, #ff0080, #ff00ff, #8000ff)',
        
      // Rose gold
      roseGold: 'linear(to-r, #f4c4c4, #e8b4b4, #daa5a5)',
        
      // Pink to teal (complementary)
      pinkTeal: 'linear(to-r, #ec4899, #14b8a6)',
        
      // Candy pink
      candy: 'linear(to-r, #ff6b95, #ff8db3, #ffb3d1)',
        
      // Vibrant pink to blue
      pinkBlue: 'linear(to-r, #ec4899, #8b5cf6, #3b82f6)',
        
      // Pastel pink dream
      pastelPink: 'linear(to-r, #ffc2d1, #ffb3c1, #ffa4b0)',
        
      // Electric pink
      electric: 'linear(to-r, #ff0099, #ff33cc, #ff66ff)',

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
