'use client'

import { createTheme } from "@mui/material";
import { blue, red } from "@mui/material/colors";

const theme = createTheme({
  typography: {
    fontFamily: [
      "Poppins",
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  palette: {
    primary: {
      main: blue[500]
    },
    text: {
      primary: '#333',
    },
    background: {
      paper: '#f9f9f9',
      default: '#f4f4f4'
    }
  },
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          fontWeight: 'bold',
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#aaa',
        }
      }
    },    
  }
});

export default theme;