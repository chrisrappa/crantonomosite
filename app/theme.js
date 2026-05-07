import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#581f18',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#dc004e',
      light: '#f73378',
      dark: '#9a0036',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#000000',
      secondary: '#666666',
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
      light: '#b3e5fc',
      dark: '#1565c0',
    },
    secondary: {
      main: '#f48fb1',
      light: '#f8bbd0',
      dark: '#c2185b',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0b0b0',
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
