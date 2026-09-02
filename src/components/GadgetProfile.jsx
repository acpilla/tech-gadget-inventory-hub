import { Chip, Divider, Paper, Typography } from '@mui/material'
import styles from './GadgetProfile.module.css'

/**
 * GadgetProfile — the "active gadget" detail card.
 *
 * Receives the resolved active gadget (synchronized from the table selection
 * via a useEffect in App). Shows every field, with the User Role rendered as a
 * clear MUI Chip/Badge. Falls back to a guidance message when nothing is
 * selected.
 */
function GadgetProfile({ gadget }) {
  if (!gadget) {
    return (
      <Paper variant="outlined" className={styles.emptyProfile}>
        <Typography variant="body1" color="text.secondary">
          Select a gadget from the registry to view its details.
        </Typography>
      </Paper>
    )
  }

  const fields = [
    ['Category', gadget.category],
    ['Sub-category', gadget.subCategory],
    ['Manufacturer', gadget.manufacturer],
    ['Health Rating', `${gadget.healthRating} / 100`],
    ['Tech Brand / Company', gadget.techBrand],
  ]

  return (
    <Paper variant="outlined" className={styles.profile}>
      <div className={styles.profileHeader}>
        <div>
          <Typography variant="overline" color="text.secondary">
            Active Gadget
          </Typography>
          <Typography variant="h5" component="h2">
            {gadget.name}
          </Typography>
        </div>
        <Chip
          label={gadget.userRole.toUpperCase()}
          color={gadget.userRole === 'Engineer' ? 'primary' : 'secondary'}
        />
      </div>

      <Divider className={styles.divider} />

      <dl className={styles.fields}>
        {fields.map(([label, value]) => (
          <div key={label} className={styles.field}>
            <dt className={styles.fieldLabel}>{label}</dt>
            <dd className={styles.fieldValue}>{value}</dd>
          </div>
        ))}
      </dl>
    </Paper>
  )
}

export default GadgetProfile
