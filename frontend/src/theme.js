import { createTheme } from '@mui/material/styles'

// HerCare palette — Baby Pink / Pink / White / Soft Red / Light Grey
const palette = {
  mode: 'light',
  primary: {
    main: '#E75480', // Pink
    light: '#F7C6D9', // Baby Pink
    dark: '#B03B5F',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#F45B69', // Soft Red
    light: '#FFD9DE',
    dark: '#C43E4B',
    contrastText: '#FFFFFF',
  },
  error: {
    main: '#E4572E',
  },
  warning: {
    main: '#F2A65A',
  },
  success: {
    main: '#4CAF8D',
  },
  info: {
    main: '#5B8DEF',
  },
  background: {
    default: '#FFF7F9',
    paper: '#FFFFFF',
  },
  text: {
    primary: '#3A2E33',
    secondary: '#7A6A70',
  },
  divider: '#F1E3E8',
  grey: {
    50: '#FAFAFA',
    100: '#F4F1F2',
    200: '#E9E3E5',
    300: '#D8CFD2',
  },
}

const theme = createTheme({
  palette,
  shape: {
    borderRadius: 16,
  },
  typography: {
    fontFamily: '"Inter", "Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontFamily: '"Poppins", sans-serif', fontWeight: 700 },
    h2: { fontFamily: '"Poppins", sans-serif', fontWeight: 700 },
    h3: { fontFamily: '"Poppins", sans-serif', fontWeight: 600 },
    h4: { fontFamily: '"Poppins", sans-serif', fontWeight: 600 },
    h5: { fontFamily: '"Poppins", sans-serif', fontWeight: 600 },
    h6: { fontFamily: '"Poppins", sans-serif', fontWeight: 600 },
    button: { fontWeight: 600, textTransform: 'none' },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          paddingLeft: 20,
          paddingRight: 20,
        },
        containedPrimary: {
          boxShadow: '0 6px 16px rgba(231, 84, 128, 0.25)',
          '&:hover': {
            boxShadow: '0 8px 20px rgba(231, 84, 128, 0.35)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        rounded: {
          borderRadius: 18,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          boxShadow: '0 4px 18px rgba(231, 84, 128, 0.08)',
          border: '1px solid #F5E6EC',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          borderRadius: 8,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 12px rgba(231, 84, 128, 0.08)',
        },
      },
    },
  },
})

export default theme
