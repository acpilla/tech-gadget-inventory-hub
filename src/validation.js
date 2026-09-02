// Validation rules for the gadget registration form.
// Each validator returns an error string, or '' when the value is valid.
// Centralizing them keeps GadgetForm lean and makes the rules easy to reason about.

import { CATEGORIES, USER_ROLES } from './constants.js'

export function validateField(field, value) {
  const v = typeof value === 'string' ? value.trim() : value

  switch (field) {
    case 'name':
      if (!v) return 'Gadget name is required.'
      if (v.length < 3) return 'Gadget name must be at least 3 characters.'
      return ''

    case 'category':
      if (!v) return 'Category is required.'
      if (!CATEGORIES.includes(v)) return 'Please select a valid category.'
      return ''

    case 'subCategory':
      if (!v) return 'Sub-category / genre is required.'
      return ''

    case 'manufacturer':
      if (!v) return 'Manufacturer is required.'
      return ''

    case 'healthRating': {
      if (v === '' || v === null || v === undefined)
        return 'Health rating is required.'
      // Reject anything that is not a clean number (e.g. "12abc", "  ", "1.5.2").
      if (!/^-?\d+(\.\d+)?$/.test(String(v)))
        return 'Health rating must be a number.'
      const n = Number(v)
      if (Number.isNaN(n)) return 'Health rating must be a number.'
      if (n < 1 || n > 100) return 'Health rating must be between 1 and 100.'
      return ''
    }

    case 'techBrand':
      if (!v) return 'Tech brand / company name is required.'
      return ''

    case 'userRole':
      if (!v) return 'Please select a user role.'
      if (!USER_ROLES.includes(v)) return 'Please select a valid user role.'
      return ''

    default:
      return ''
  }
}

// Validate every field of a form object. Returns an { field: errorMessage }
// map containing only the fields that currently have an error.
export function validateForm(values) {
  const errors = {}
  Object.keys(values).forEach((field) => {
    const message = validateField(field, values[field])
    if (message) errors[field] = message
  })
  return errors
}
