import { useState } from 'react'
import {
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import { CATEGORIES, EMPTY_FORM, USER_ROLES } from '../constants.js'
import { validateField, validateForm } from '../validation.js'
import styles from './GadgetForm.module.css'

/**
 * GadgetForm — polished MUI registration form with real-time inline validation.
 *
 * State (useState):
 *  - values:  current field values
 *  - errors:  { field: message } for invalid fields
 *  - touched: which fields the user has interacted with (drives when to show errors)
 *
 * On a valid submit it calls onAddGadget(record) and resets itself.
 */
function GadgetForm({ onAddGadget }) {
  const [values, setValues] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  // Show a field's error only once the user has touched it (or after a submit attempt).
  const showError = (field) => Boolean(touched[field] && errors[field])

  const handleChange = (field) => (event) => {
    const value = event.target.value
    setValues((prev) => ({ ...prev, [field]: value }))

    // Real-time validation: re-check the field as the user types, but only
    // surface the message if they've already touched it.
    setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }))
  }

  const handleBlur = (field) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    setErrors((prev) => ({ ...prev, [field]: validateField(field, values[field]) }))
  }

  const handleReset = () => {
    setValues(EMPTY_FORM)
    setErrors({})
    setTouched({})
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const nextErrors = validateForm(values)
    setErrors(nextErrors)

    // Mark every field touched so all inline errors become visible at once.
    setTouched(
      Object.keys(EMPTY_FORM).reduce((acc, key) => ({ ...acc, [key]: true }), {}),
    )

    // Block submission while any error remains.
    if (Object.keys(nextErrors).length > 0) return

    const record = {
      id:
        typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID()
          : `gadget-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      name: values.name.trim(),
      category: values.category,
      subCategory: values.subCategory.trim(),
      manufacturer: values.manufacturer.trim(),
      healthRating: Number(values.healthRating),
      techBrand: values.techBrand.trim(),
      userRole: values.userRole,
    }

    onAddGadget(record)
    handleReset()
  }

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      noValidate
      variant="outlined"
      className={styles.formPaper}
    >
      <div className={styles.formHeader}>
        <Typography variant="h6" component="h2">
          Register a Gadget
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Fill in the details below. Fields validate as you type.
        </Typography>
      </div>

      <div className={styles.grid}>
        {/* Gadget Name */}
        <TextField
          label="Gadget Name"
          required
          fullWidth
          value={values.name}
          onChange={handleChange('name')}
          onBlur={handleBlur('name')}
          error={showError('name')}
          helperText={showError('name') ? errors.name : ' '}
          inputProps={{ 'aria-label': 'Gadget Name' }}
        />

        {/* Category */}
        <FormControl fullWidth required error={showError('category')}>
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            label="Category"
            value={values.category}
            onChange={handleChange('category')}
            onBlur={handleBlur('category')}
          >
            {CATEGORIES.map((c) => (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>
            {showError('category') ? errors.category : ' '}
          </FormHelperText>
        </FormControl>

        {/* Sub-category / Genre */}
        <TextField
          label="Sub-category / Genre"
          required
          fullWidth
          value={values.subCategory}
          onChange={handleChange('subCategory')}
          onBlur={handleBlur('subCategory')}
          error={showError('subCategory')}
          helperText={showError('subCategory') ? errors.subCategory : ' '}
        />

        {/* Manufacturer */}
        <TextField
          label="Manufacturer"
          required
          fullWidth
          value={values.manufacturer}
          onChange={handleChange('manufacturer')}
          onBlur={handleBlur('manufacturer')}
          error={showError('manufacturer')}
          helperText={showError('manufacturer') ? errors.manufacturer : ' '}
        />

        {/* Health Rating */}
        <TextField
          label="Health Rating (1–100)"
          required
          fullWidth
          type="number"
          value={values.healthRating}
          onChange={handleChange('healthRating')}
          onBlur={handleBlur('healthRating')}
          error={showError('healthRating')}
          helperText={showError('healthRating') ? errors.healthRating : ' '}
          inputProps={{ min: 1, max: 100, step: 1 }}
        />

        {/* Tech Brand / Company */}
        <TextField
          label="Tech Brand / Company Name"
          required
          fullWidth
          value={values.techBrand}
          onChange={handleChange('techBrand')}
          onBlur={handleBlur('techBrand')}
          error={showError('techBrand')}
          helperText={showError('techBrand') ? errors.techBrand : ' '}
        />
      </div>

      {/* User Role radio group */}
      <FormControl
        component="fieldset"
        required
        error={showError('userRole')}
        className={styles.roleControl}
      >
        <FormLabel component="legend">User Role</FormLabel>
        <RadioGroup
          row
          name="userRole"
          value={values.userRole}
          onChange={handleChange('userRole')}
          onBlur={handleBlur('userRole')}
        >
          {USER_ROLES.map((role) => (
            <FormControlLabel
              key={role}
              value={role}
              control={<Radio />}
              label={role}
            />
          ))}
        </RadioGroup>
        <FormHelperText>
          {showError('userRole') ? errors.userRole : ' '}
        </FormHelperText>
      </FormControl>

      <div className={styles.actions}>
        <Button
          type="submit"
          variant="contained"
          size="large"
          startIcon={<AddCircleOutlineIcon />}
        >
          Register Gadget
        </Button>
        <Button
          type="button"
          variant="outlined"
          size="large"
          startIcon={<RestartAltIcon />}
          onClick={handleReset}
        >
          Reset
        </Button>
      </div>
    </Paper>
  )
}

export default GadgetForm
