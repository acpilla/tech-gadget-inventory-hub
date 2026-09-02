import { useState } from 'react'
import {
  Alert,
  AppBar,
  Box,
  Chip,
  Container,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Snackbar,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material'
import MemoryIcon from '@mui/icons-material/Memory'
import Inventory2Icon from '@mui/icons-material/Inventory2'
import GadgetForm from './components/GadgetForm.jsx'

/**
 * Tech Gadget Inventory Hub — application root.
 *
 * Holds the shared application state:
 *  - gadgets:  the registry of submitted gadget records (local React state)
 *  - snackbar: success feedback after a registration
 *
 * Checkpoint 2 adds the registration form + validation and demonstrates
 * conditional rendering (empty state vs. a registered-gadgets summary).
 * The TanStack registry table replaces the temporary summary in Checkpoint 3.
 */
function App() {
  const [gadgets, setGadgets] = useState([])
  const [snackbar, setSnackbar] = useState({ open: false, message: '' })

  const handleAddGadget = (record) => {
    // Newest first so a freshly registered gadget is immediately visible.
    setGadgets((prev) => [record, ...prev])
    setSnackbar({
      open: true,
      message: `"${record.name}" registered successfully.`,
    })
  }

  const handleCloseSnackbar = (_event, reason) => {
    if (reason === 'clickaway') return
    setSnackbar((prev) => ({ ...prev, open: false }))
  }

  const hasGadgets = gadgets.length > 0

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <MemoryIcon sx={{ mr: 1.5 }} />
          <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
            Tech Gadget Inventory Hub
          </Typography>
          <Chip
            label={`${gadgets.length} registered`}
            color="default"
            size="small"
            sx={{ bgcolor: 'rgba(255,255,255,0.18)', color: '#fff' }}
          />
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Stack spacing={3}>
          <GadgetForm onAddGadget={handleAddGadget} />

          {/* Dynamic conditional rendering: empty state vs. registered summary */}
          {!hasGadgets ? (
            <Paper
              variant="outlined"
              sx={{ p: 4, textAlign: 'center', color: 'text.secondary' }}
            >
              <Inventory2Icon sx={{ fontSize: 48, opacity: 0.5 }} />
              <Typography variant="h6" component="h2" sx={{ mt: 1 }}>
                No gadgets registered yet
              </Typography>
              <Typography variant="body2">
                Use the form above to register your first gadget. It will appear
                here once submitted.
              </Typography>
            </Paper>
          ) : (
            <Paper variant="outlined" sx={{ p: { xs: 2.5, sm: 3 } }}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ mb: 1 }}
              >
                <Typography variant="h6" component="h2">
                  Registered Gadgets
                </Typography>
                <Chip
                  label={`${gadgets.length} total`}
                  color="primary"
                  size="small"
                />
              </Stack>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                A sortable, paginated registry table will replace this list in the
                next checkpoint.
              </Typography>
              <Divider />
              <List dense>
                {gadgets.map((g) => (
                  <ListItem key={g.id} disableGutters>
                    <ListItemText
                      primary={`${g.name} — ${g.category}`}
                      secondary={`${g.manufacturer} · Health ${g.healthRating} · ${g.userRole}`}
                    />
                    <Chip
                      label={g.userRole}
                      size="small"
                      color={g.userRole === 'Engineer' ? 'primary' : 'secondary'}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          )}
        </Stack>
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default App
