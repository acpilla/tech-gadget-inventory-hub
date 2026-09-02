import {
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material'
import { USER_ROLES } from '../constants.js'
import styles from './FilterControls.module.css'

/**
 * FilterControls — role filter toggle (All / Engineer / Tester).
 *
 * Controlled by App via `value` / `onChange`. Exclusive selection means exactly
 * one option is always active; clicking the active one is ignored so the filter
 * can never end up in an empty state.
 */
function FilterControls({ value, onChange, counts }) {
  const handleChange = (_event, next) => {
    // ToggleButtonGroup emits null when the active button is clicked again.
    if (next !== null) onChange(next)
  }

  return (
    <Paper variant="outlined" className={styles.bar}>
      <Typography variant="subtitle2" component="span" className={styles.label}>
        Filter by role
      </Typography>
      <ToggleButtonGroup
        value={value}
        exclusive
        onChange={handleChange}
        size="small"
        color="primary"
        aria-label="filter gadgets by user role"
      >
        <ToggleButton value="All">All ({counts.All})</ToggleButton>
        {USER_ROLES.map((role) => (
          <ToggleButton key={role} value={role}>
            {role} ({counts[role]})
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Paper>
  )
}

export default FilterControls
