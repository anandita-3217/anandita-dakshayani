// // import { extendTheme } from '@chakra-ui/react';

// // const theme = extendTheme({
// //   config: {
// //     initialColorMode: 'dark',
// //     useSystemColorMode: false,
// //   },
// //   colors: {
// //     brand: {
// //       50: '#e6fffa',
// //       100: '#b2f5ea',
// //       200: '#81e6d9',
// //       300: '#4fd1c5',
// //       400: '#14b8a6', // Your teal color
// //       500: '#0d9488',
// //       600: '#0f766e',
// //       700: '#115e59',
// //       800: '#134e4a',
// //       900: '#0f3d3a',
// //     },
// //   },
// //   semanticTokens: {
// //     colors: {
// //       // Text colors
// //       'text.primary': {
// //         default: 'gray.900',
// //         _dark: 'white',
// //       },
// //       'text.secondary': {
// //         default: 'gray.600',
// //         _dark: 'gray.400',
// //       },
// //       // Background colors
// //       'bg.primary': {
// //         default: 'white',
// //         _dark: 'gray.800',
// //       },
// //       'bg.secondary': {
// //         default: 'gray.50',
// //         _dark: 'gray.900',
// //       },
// //       'bg.hover': {
// //         default: 'gray.100',
// //         _dark: 'gray.600',
// //       },
// //       // Border colors
// //       'border.primary': {
// //         default: 'gray.200',
// //         _dark: 'gray.600',
// //       },
// //       'border.secondary': {
// //         default: 'gray.300',
// //         _dark: 'gray.700',
// //       },
// //     },
// //   },
// //   styles: {
// //     global: (props) => ({
// //       body: {
// //         bg: props.colorMode === 'dark' ? 'gray.900' : 'white',
// //         color: props.colorMode === 'dark' ? 'white' : 'gray.900',
// //       },
// //     }),
// //   },
// // });

// // export default theme;

// import { extendTheme } from '@chakra-ui/react';

// const theme = extendTheme({
//   config: {
//     initialColorMode: 'dark',
//     useSystemColorMode: false,
//   },
//   colors: {
//     brand: {
//       50: '#e6fffa',
//       100: '#b2f5ea',
//       200: '#81e6d9',
//       300: '#4fd1c5',
//       400: '#14b8a6', // Primary teal
//       500: '#0d9488',
//       600: '#0f766e',
//       700: '#115e59',
//       800: '#134e4a',
//       900: '#0f3d3a',
//     },
//   },
//   semanticTokens: {
//     colors: {
//       // Text colors
//       'text.primary': {
//         default: 'gray.800',
//         _dark: 'white',
//       },
//       'text.secondary': {
//         default: 'gray.600',
//         _dark: 'gray.400',
//       },
//       'text.muted': {
//         default: 'gray.500',
//         _dark: 'gray.500',
//       },
//       // Background colors
//       'bg.primary': {
//         default: 'white',
//         _dark: 'gray.800',
//       },
//       'bg.secondary': {
//         default: 'gray.50',
//         _dark: 'gray.900',
//       },
//       'bg.tertiary': {
//         default: 'gray.100',
//         _dark: '#1a1a1a',
//       },
//       'bg.hover': {
//         default: 'gray.100',
//         _dark: 'gray.700',
//       },
//       'bg.accent': {
//         default: 'brand.50',
//         _dark: 'rgba(20, 184, 166, 0.1)',
//       },
//       // Border colors
//       'border.primary': {
//         default: 'gray.200',
//         _dark: 'gray.700',
//       },
//       'border.secondary': {
//         default: 'gray.300',
//         _dark: 'gray.600',
//       },
//       'border.accent': {
//         default: 'brand.200',
//         _dark: 'brand.700',
//       },
//       // Surface colors for cards
//       'surface.card': {
//         default: 'white',
//         _dark: '#1f1f1f',
//       },
//       'surface.elevated': {
//         default: 'white',
//         _dark: '#2a2a2a',
//       },
//     },
//   },
//   styles: {
//     global: (props) => ({
//       body: {
//         bg: props.colorMode === 'dark' ? '#0a0a0a' : 'gray.50',
//         color: props.colorMode === 'dark' ? 'white' : 'gray.800',
//         transition: 'background-color 0.3s ease, color 0.3s ease',
//       },
//       // Scrollbar styling
//       '*::-webkit-scrollbar': {
//         width: '10px',
//         height: '10px',
//       },
//       '*::-webkit-scrollbar-track': {
//         bg: props.colorMode === 'dark' ? 'gray.900' : 'gray.100',
//       },
//       '*::-webkit-scrollbar-thumb': {
//         bg: props.colorMode === 'dark' ? 'gray.700' : 'gray.400',
//         borderRadius: 'full',
//       },
//       '*::-webkit-scrollbar-thumb:hover': {
//         bg: props.colorMode === 'dark' ? 'gray.600' : 'gray.500',
//       },
//     }),
//   },
//   components: {
//     Button: {
//       variants: {
//         solid: (props) => ({
//           bg: props.colorMode === 'dark' ? 'brand.400' : 'brand.500',
//           color: 'white',
//           _hover: {
//             bg: props.colorMode === 'dark' ? 'brand.500' : 'brand.600',
//           },
//         }),
//         outline: (props) => ({
//           borderColor: props.colorMode === 'dark' ? 'border.secondary' : 'border.primary',
//           color: props.colorMode === 'dark' ? 'text.primary' : 'text.primary',
//           _hover: {
//             borderColor: 'brand.400',
//             color: 'brand.400',
//             bg: props.colorMode === 'dark' ? 'rgba(20, 184, 166, 0.1)' : 'brand.50',
//           },
//         }),
//       },
//     },
//     Input: {
//       variants: {
//         outline: (props) => ({
//           field: {
//             bg: props.colorMode === 'dark' ? 'bg.secondary' : 'white',
//             borderColor: props.colorMode === 'dark' ? 'border.primary' : 'gray.300',
//             _hover: {
//               borderColor: 'brand.400',
//             },
//             _focus: {
//               borderColor: 'brand.400',
//               boxShadow: `0 0 0 1px ${props.colorMode === 'dark' ? '#14b8a6' : '#0d9488'}`,
//             },
//           },
//         }),
//       },
//     },
//     Textarea: {
//       variants: {
//         outline: (props) => ({
//           bg: props.colorMode === 'dark' ? 'bg.secondary' : 'white',
//           borderColor: props.colorMode === 'dark' ? 'border.primary' : 'gray.300',
//           _hover: {
//             borderColor: 'brand.400',
//           },
//           _focus: {
//             borderColor: 'brand.400',
//             boxShadow: `0 0 0 1px ${props.colorMode === 'dark' ? '#14b8a6' : '#0d9488'}`,
//           },
//         }),
//       },
//     },
//     Card: {
//       baseStyle: (props) => ({
//         container: {
//           bg: props.colorMode === 'dark' ? 'surface.card' : 'white',
//           borderColor: props.colorMode === 'dark' ? 'border.primary' : 'gray.200',
//         },
//       }),
//     },
//   },
// });

// export default theme;
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
      400: '#14b8a6', // teal
      500: '#0d9488',
      600: '#0f766e',
      700: '#115e59',
      800: '#134e4a',
      900: '#0f3d3a',
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
