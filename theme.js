import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  colors: {
    brand: {
      50: '#e6fffa',
      100: '#b2f5ea',
      200: '#81e6d9',
      300: '#4fd1c5',
      400: '#14b8a6', // Your teal color
      500: '#0d9488',
      600: '#0f766e',
      700: '#115e59',
      800: '#134e4a',
      900: '#0f3d3a',
    },
  },
  semanticTokens: {
    colors: {
      // Text colors
      'text.primary': {
        default: 'gray.900',
        _dark: 'white',
      },
      'text.secondary': {
        default: 'gray.600',
        _dark: 'gray.400',
      },
      // Background colors
      'bg.primary': {
        default: 'white',
        _dark: 'gray.800',
      },
      'bg.secondary': {
        default: 'gray.50',
        _dark: 'gray.900',
      },
      'bg.hover': {
        default: 'gray.100',
        _dark: 'gray.600',
      },
      // Border colors
      'border.primary': {
        default: 'gray.200',
        _dark: 'gray.600',
      },
      'border.secondary': {
        default: 'gray.300',
        _dark: 'gray.700',
      },
    },
  },
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'gray.900' : 'white',
        color: props.colorMode === 'dark' ? 'white' : 'gray.900',
      },
    }),
  },
});

export default theme;