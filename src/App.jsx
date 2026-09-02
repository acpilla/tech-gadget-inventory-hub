import { useEffect, useMemo, useState } from 'react'
import { AppBar, Container, Paper, Toolbar, Typography } from '@mui/material'
import GadgetForm from './components/GadgetForm.jsx'
import GadgetTable, { PAGE_SIZE } from './components/GadgetTable.jsx'
import GadgetProfile from './components/GadgetProfile.jsx'
import FilterControls from './components/FilterControls.jsx'
import styles from './App.module.css'

/**
 * Tech Gadget Inventory Hub — application root.
 *
 * Styling: MUI components + CSS Modules for scoped layout.
 *
 * Shared application state (local React state):
 *  - gadgets:          the registry of submitted gadget records
 *  - selectedGadgetId: the id of the currently selected row
 *  - activeGadget:     the resolved active gadget (synced from selection)
 *  - roleFilter:       All / Engineer / Tester filter for the table
 *  - pagination:       controlled TanStack pagination (5 rows per page)
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

  // The rows shown in the table after applying the role filter.
  const filteredGadgets = useMemo(() => {
    if (roleFilter === 'All') return gadgets
    return gadgets.filter((g) => g.userRole === roleFilter)
  }, [gadgets, roleFilter])

  const handleAddGadget = (record) => {
    // Newest first so a freshly registered gadget is immediately visible.
    setGadgets((prev) => [record, ...prev])
    // Show the new gadget: reset filter + jump to the first page.
    setRoleFilter('All')
    setPagination((prev) => ({ ...prev, pageIndex: 0 }))
  }

  const handleSelectGadget = (id) => setSelectedGadgetId(id)

  const handleFilterChange = (next) => {
    setRoleFilter(next)
    // Filtering changes the row set, so return to the first page.
    setPagination((prev) => ({ ...prev, pageIndex: 0 }))
  }

  const hasGadgets = gadgets.length > 0

  return (
    <div className={styles.page}>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <Typography variant="h6" component="h1">
            Tech Gadget Inventory Hub
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" className={styles.container}>
        <div className={styles.stack}>
          <GadgetForm onAddGadget={handleAddGadget} />

          {/* Dynamic conditional rendering: empty state vs. registry + profile */}
          {!hasGadgets ? (
            <Paper variant="outlined" className={styles.emptyState}>
              <Typography variant="h6" component="h2" className={styles.emptyTitle}>
                No gadgets registered yet
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Use the form above to register your first gadget. It will appear
                in the registry once submitted.
              </Typography>
            </Paper>
          ) : (
            <>
              <FilterControls value={roleFilter} onChange={handleFilterChange} />
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
    </div>
  )
}

export default App
