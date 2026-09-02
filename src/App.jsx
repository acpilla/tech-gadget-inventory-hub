import { useState } from 'react'
import {
  Alert,
  AppBar,
  Chip,
  Container,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Snackbar,
  Toolbar,
  Typography,
} from '@mui/material'
import MemoryIcon from '@mui/icons-material/Memory'
import Inventory2Icon from '@mui/icons-material/Inventory2'
import GadgetForm from './components/GadgetForm.jsx'
import styles from './App.module.css'

/**
 * Tech Gadget Inventory Hub — application root.
 *
 * Styling approach:
 *  - MUI components provide the UI widgets + accessibility.
 *  - MUI ThemeProvider (theme.js) sets the global brand palette/typography.
 *  - CSS Modules (App.module.css) own layout, spacing, and custom visuals.
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
    <div className={styles.page}>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <MemoryIcon className={styles.brandIcon} />
          <Typography variant="h6" component="h1" className={styles.brandTitle}>
            Tech Gadget Inventory Hub
          </Typography>
          <span className={styles.headerBadge}>{gadgets.length} registered</span>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" className={styles.container}>
        <div className={styles.stack}>
          <GadgetForm onAddGadget={handleAddGadget} />

          {/* Dynamic conditional rendering: empty state vs. registered summary */}
          {!hasGadgets ? (
            <Paper variant="outlined" className={styles.emptyState}>
              <span className={styles.emptyIcon}>
                <Inventory2Icon fontSize="inherit" />
              </span>
              <Typography variant="h6" component="h2" className={styles.emptyTitle}>
                No gadgets registered yet
              </Typography>
              <Typography variant="body2">
                Use the form above to register your first gadget. It will appear
                here once submitted.
              </Typography>
            </Paper>
          ) : (
            <Paper variant="outlined" className={styles.summaryPaper}>
              <div className={styles.summaryHeader}>
                <Typography variant="h6" component="h2">
                  Registered Gadgets
                </Typography>
                <Chip
                  label={`${gadgets.length} total`}
                  color="primary"
                  size="small"
                />
              </div>
              <Typography
                variant="body2"
                color="text.secondary"
                className={styles.summaryNote}
              >
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
        </div>
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
          className={styles.alert}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default App
