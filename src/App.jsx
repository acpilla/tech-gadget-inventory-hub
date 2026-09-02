import { useEffect, useMemo, useState } from 'react'
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
import GadgetProfile from './components/GadgetProfile.jsx'
import FilterControls from './components/FilterControls.jsx'
import { USER_ROLES } from './constants.js'
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
 *  - selectedGadgetId: the id of the currently selected row
 *  - activeGadget:     the resolved active gadget (synced from selection)
 *  - roleFilter:       All / Engineer / Tester filter for the table
 *  - pagination:       controlled TanStack pagination (5 rows per page)
 *  - snackbar:         success feedback after a registration
 */
function App() {
  const [gadgets, setGadgets] = useState([])
  const [selectedGadgetId, setSelectedGadgetId] = useState(null)
  const [activeGadget, setActiveGadget] = useState(null)
  const [roleFilter, setRoleFilter] = useState('All')
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: PAGE_SIZE,
  })
  const [snackbar, setSnackbar] = useState({ open: false, message: '' })

  /**
   * Selection synchronization (the required useEffect).
   *
   *   table row selection → selectedGadgetId → [useEffect] → activeGadget → profile
   *
   * Whenever the selected id changes (a row click) — or the underlying gadget
   * list changes — resolve the matching record into `activeGadget`, which the
   * profile card renders.
   */
  useEffect(() => {
    const match = gadgets.find((g) => g.id === selectedGadgetId) || null
    setActiveGadget(match)
  }, [selectedGadgetId, gadgets])

  // Role counts drive the filter labels (All (6), Engineer (3), Tester (3)).
  const counts = useMemo(() => {
    const base = { All: gadgets.length }
    USER_ROLES.forEach((role) => {
      base[role] = gadgets.filter((g) => g.userRole === role).length
    })
    return base
  }, [gadgets])

  // The rows shown in the table after applying the role filter.
  const filteredGadgets = useMemo(() => {
    if (roleFilter === 'All') return gadgets
    return gadgets.filter((g) => g.userRole === roleFilter)
  }, [gadgets, roleFilter])

  const handleAddGadget = (record) => {
    setGadgets((prev) => [record, ...prev])
    setSelectedGadgetId(record.id)
    // A new gadget always belongs to "All"; reset filter + page so it's visible.
    setRoleFilter('All')
    setPagination((prev) => ({ ...prev, pageIndex: 0 }))
    setSnackbar({
      open: true,
      message: `"${record.name}" registered successfully.`,
    })
  }

  const handleSelectGadget = (id) => setSelectedGadgetId(id)

  const handleFilterChange = (next) => {
    setRoleFilter(next)
    // Filtering changes the row set, so return to the first page.
    setPagination((prev) => ({ ...prev, pageIndex: 0 }))
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

          {/* Dynamic conditional rendering: empty state vs. registry + profile */}
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
            <>
              <FilterControls
                value={roleFilter}
                onChange={handleFilterChange}
                counts={counts}
              />
              <GadgetTable
                gadgets={filteredGadgets}
                selectedGadgetId={selectedGadgetId}
                onSelectGadget={handleSelectGadget}
                pagination={pagination}
                onPaginationChange={setPagination}
                emptyMessage={`No ${roleFilter} gadgets found.`}
              />
              <GadgetProfile gadget={activeGadget} />
            </>
          )}
        </div>
      </Container>

      <footer className={styles.footer}>
        <Typography variant="caption" color="text.secondary">
          Tech Gadget Inventory Hub · Built with React, Vite, MUI &amp; TanStack
          Table
        </Typography>
      </footer>

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
