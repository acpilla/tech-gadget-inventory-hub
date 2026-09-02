import { createTheme } from '@mui/material/styles'

// Central MUI theme for the Tech Gadget Inventory Hub.
// Keeping it in one place makes the visual language consistent across components.
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1976d2' },
    secondary: { main: '#7b1fa2' },
    success: { main: '#2e7d32' },
    background: { default: '#f4f6f8' },
  },
  shape: { borderRadius: 10 },
  typography: {
    fontFamily: [
      'Inter',
      'Roboto',
      '"Segoe UI"',
      'Arial',
      'sans-serif',
    ].join(','),
    h4: { fontWeight: 700 },
    h6: { fontWeight: 600 },
  },
})

export default theme
