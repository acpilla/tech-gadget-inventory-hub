import { useState } from 'react'
import {
  Alert,
  AppBar,
  Container,
  Paper,
  Snackbar,
  Toolbar,
  Typography,
} from '@mui/material'
import MemoryIcon from '@mui/icons-material/Memory'
import Inventory2Icon from '@mui/icons-material/Inventory2'
import GadgetForm from './components/GadgetForm.jsx'
import GadgetTable, { PAGE_SIZE } from './components/GadgetTable.jsx'
import styles from './App.module.css'

/**
 * Tech Gadget Inventory Hub — application root.
 *
 * Styling approach:
 *  - MUI components provide the UI widgets + accessibility.
 *  - MUI ThemeProvider (theme.js) sets the global brand palette/typography.
 *  - CSS Modules (App.module.css) own layout, spacing, and custom visuals.
 *
 * Shared application state (local React state):
 *  - gadgets:          the registry of submitted gadget records
 *  - selectedGadgetId: the currently selected row / active gadget
 *  - pagination:       controlled TanStack pagination (5 rows per page)
 *  - snackbar:         success feedback after a registration
 *
 * Checkpoint 3 adds the TanStack registry table (pagination + row selection)
 * and keeps the conditional rendering (empty state vs. registry table).
 */
function App() {
  const [gadgets, setGadgets] = useState([])
  const [selectedGadgetId, setSelectedGadgetId] = useState(null)
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: PAGE_SIZE,
  })
  const [snackbar, setSnackbar] = useState({ open: false, message: '' })

  const handleAddGadget = (record) => {
    // Newest first so a freshly registered gadget is immediately visible.
    setGadgets((prev) => [record, ...prev])
    // Auto-select the new gadget and jump to the first page where it appears.
    setSelectedGadgetId(record.id)
    setPagination((prev) => ({ ...prev, pageIndex: 0 }))
    setSnackbar({
      open: true,
      message: `"${record.name}" registered successfully.`,
    })
  }

  const handleSelectGadget = (id) => setSelectedGadgetId(id)

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

          {/* Dynamic conditional rendering: empty state vs. registry table */}
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
                in the registry once submitted.
              </Typography>
            </Paper>
          ) : (
            <GadgetTable
              gadgets={gadgets}
              selectedGadgetId={selectedGadgetId}
              onSelectGadget={handleSelectGadget}
              pagination={pagination}
              onPaginationChange={setPagination}
            />
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
