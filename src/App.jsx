import {
  AppBar,
  Box,
  Container,
  Paper,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material'
import MemoryIcon from '@mui/icons-material/Memory'

/**
 * Tech Gadget Inventory Hub — application shell.
 *
 * Checkpoint 1 establishes the project foundation: Vite + React + MUI theme
 * and the top-level layout. The registration form, registry table, and gadget
 * profile are implemented in the following checkpoints.
 */
function App() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <MemoryIcon sx={{ mr: 1.5 }} />
          <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
            Tech Gadget Inventory Hub
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.85 }}>
            Gadget Registry
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper variant="outlined" sx={{ p: 4, textAlign: 'center' }}>
          <Stack spacing={1.5} alignItems="center">
            <MemoryIcon color="primary" sx={{ fontSize: 56 }} />
            <Typography variant="h4" component="h2">
              Welcome to the Inventory Hub
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 560 }}>
              Register, browse, and inspect your tech gadgets. The registration
              form and gadget registry will appear here as the project is built
              out across the upcoming checkpoints.
            </Typography>
          </Stack>
        </Paper>
      </Container>
    </Box>
  )
}

export default App
