import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    custom: {
      transitions: {
        smooth: string;
      };
      shadows: {
        card: string;
        button: string;
      };
    };
  }
  interface ThemeOptions {
    custom?: {
      transitions?: {
        smooth?: string;
      };
      shadows?: {
        card?: string;
        button?: string;
      };
    };
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: '#2C2F33', // Charcoal gray - a sophisticated neutral
      light: '#44474F', // Ash gray - for subtle accents
      dark: '#191C20', // Deep charcoal - for depth and contrast
    },
    secondary: {
      main: '#C49F6C', // Gold - luxurious and elegant
      light: '#DAB991', // Light gold - accents and highlights
      dark: '#8C6D3F', // Bronze gold - warm contrast
    },
    background: {
      default: '#F5F5F5', // Off-white for a soft, luxurious background
      paper: '#FFFFFF', // Clean white for cards and dialogs
    },
    error: {
      main: '#E63946', // Refined crimson
      light: '#F38C8D',
      dark: '#A12029',
    },
    warning: {
      main: '#FFB703', // Golden amber
      light: '#FFD166',
      dark: '#B67200',
    },
    success: {
      main: '#50C878', // Emerald green
      light: '#81E1A5',
      dark: '#338C5C',
    },
    info: {
      main: '#4A90E2', // Royal blue
      light: '#74A9F3',
      dark: '#2F5C99',
    },
    text: {
      primary: '#2B2D33', // Dark slate gray for main text
      secondary: '#6C727A', // Soft gray for secondary text
    },
    grey: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',
    },
  },
  typography: {
    fontFamily: '"Playfair Display", "Poppins", "Roboto", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '3rem',
      letterSpacing: '-0.02em',
      color: '#2C2F33',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2.25rem',
      letterSpacing: '-0.015em',
    },
    h3: {
      fontWeight: 500,
      fontSize: '1.75rem',
      color: '#C49F6C',
    },
    h4: {
      fontWeight: 500,
      fontSize: '1.5rem',
    },
    h5: {
      fontWeight: 400,
      fontSize: '1.25rem',
    },
    h6: {
      fontWeight: 400,
      fontSize: '1rem',
    },
    subtitle1: {
      fontSize: '1.15rem',
      lineHeight: 1.5,
      color: '#6C727A',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.7,
      color: '#2B2D33',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      fontSize: '1rem',
    },
  },
  shape: {
    borderRadius: 10, // Slightly rounded corners for modernity
  },
  shadows: [
    'none',
    '0px 3px 6px rgba(0, 0, 0, 0.1)',
    '0px 5px 10px rgba(0, 0, 0, 0.12)',
    '0px 8px 16px rgba(0, 0, 0, 0.15)',
    '0px 12px 20px rgba(0, 0, 0, 0.18)',
    '0px 16px 24px rgba(0, 0, 0, 0.2)',
    '0px 20px 28px rgba(0, 0, 0, 0.22)',
    '0px 24px 32px rgba(0, 0, 0, 0.24)',
    '0px 28px 36px rgba(0, 0, 0, 0.26)',
    '0px 32px 40px rgba(0, 0, 0, 0.28)',
    '0px 36px 44px rgba(0, 0, 0, 0.3)',
    '0px 40px 48px rgba(0, 0, 0, 0.32)',
    '0px 44px 52px rgba(0, 0, 0, 0.34)',
    '0px 48px 56px rgba(0, 0, 0, 0.36)',
    '0px 52px 60px rgba(0, 0, 0, 0.38)',
    '0px 56px 64px rgba(0, 0, 0, 0.4)',
    '0px 60px 68px rgba(0, 0, 0, 0.42)',
    '0px 64px 72px rgba(0, 0, 0, 0.44)',
    '0px 68px 76px rgba(0, 0, 0, 0.46)',
    '0px 72px 80px rgba(0, 0, 0, 0.48)',
    '0px 76px 84px rgba(0, 0, 0, 0.5)',
    '0px 80px 88px rgba(0, 0, 0, 0.52)',
    '0px 84px 92px rgba(0, 0, 0, 0.54)',
    '0px 88px 96px rgba(0, 0, 0, 0.56)',
    '0px 92px 100px rgba(0, 0, 0, 0.58)',
  ],
  custom: {
    transitions: {
      smooth: 'all 0.4s cubic-bezier(0.4, 0.0, 0.2, 1)',
    },
    shadows: {
      card: '0px 4px 16px rgba(0, 0, 0, 0.12)',
      button: '0px 2px 8px rgba(0, 0, 0, 0.15)',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 10,
          padding: '10px 28px',
          transition: 'all 0.4s ease',
          backgroundColor: '#C49F6C',
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#8C6D3F',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 15,
          boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.4s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
          },
        },
      },
    },
  },
});
