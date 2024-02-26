'use client'

import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

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
  }
  //palette: {
  //  primary: {
  //    main: red[500],
  //  },
  //  text: {
  //    primary: 'red'
  //  },
  //  background: {
  //    paper: 'orange'
  //  }
  //},
});

export default theme;