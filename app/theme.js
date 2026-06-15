import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#581f18',
      light: '#8d281f',
      dark: '#3a1313',
    },
    action: {
      hover: '#f2e49f91',
    },
    secondary: {
      main: '#9b780d',
      light: '#f2e49f',
      dark: '#8b6f1b',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#000000',
      secondary: '#666666',
      tertiary: '#f7e8bc',
      light: '#ffffff',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    primaryFont: {
      fontFamily: '"Inter", "Helvetica Neue", sans-serif',
      fontWeight: 500,
      color: '#000000',
    },
    secondaryFont: {
      fontFamily: '"Poppins", "Arial", sans-serif',
      fontWeight: 400,
      color: '#666666',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: (theme) => ({
        '*::-webkit-scrollbar': {
          width: '8px',
          height: '8px',
          borderRadius: '1rem',
        },
        '*::-webkit-scrollbar-track': {
          backgroundColor: theme.palette.background.default,
          borderRadius: '1rem',
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: theme.palette.secondary.light,
          borderRadius: '1rem',
        },
        '*::-webkit-scrollbar-thumb:hover': {
          backgroundColor: theme.palette.secondary.main,
        },
      }),
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          textTransform: 'none',
          fontSize: '1rem',
          fontWeight: 500,
        },
        outlined: {
          textTransform: 'none',
          fontSize: '1rem',
        },
      },
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#803226',
      light: '#8d281f',
      dark: '#3a1313',
    },
    secondary: {
      main: '#f0cf6b',
      light: '#f2e49f',
      dark: '#8b6f1b',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0b0b0',
      tertiary: '#f7e8bc',
      light: '#ffffff',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    primaryFont: {
      fontFamily: '"Inter", "Helvetica Neue", sans-serif',
      fontWeight: 500,
      color: '#ffffff',
    },
    secondaryFont: {
      fontFamily: '"Poppins", "Arial", sans-serif',
      fontWeight: 400,
      color: '#b0b0b0',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: (theme) => ({
        '*::-webkit-scrollbar': {
          width: '8px',
          height: '8px',
          borderRadius: '1rem',
        },
        '*::-webkit-scrollbar-track': {
          backgroundColor: theme.palette.background.default,
          borderRadius: '1rem',
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: theme.palette.secondary.light,
          borderRadius: '1rem',
        },
        '*::-webkit-scrollbar-thumb:hover': {
          backgroundColor: theme.palette.secondary.main,
        },
      }),
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          textTransform: 'none',
          fontSize: '1rem',
          fontWeight: 500,
        },
        outlined: {
          textTransform: 'none',
          fontSize: '1rem',
        },
      },
    },
  },
});

export { lightTheme, darkTheme };
