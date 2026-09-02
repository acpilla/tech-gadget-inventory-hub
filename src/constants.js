// Shared domain constants for the Tech Gadget Inventory Hub.
// Kept in one module so the form, table, and filters stay in sync.

export const CATEGORIES = ['Smartphone', 'Laptop', 'Wearable', 'Audio']

export const USER_ROLES = ['Engineer', 'Tester']

// Blank form values used to initialize and reset the registration form.
export const EMPTY_FORM = {
  name: '',
  category: '',
  manufacturer: '',
  healthRating: '',
  techBrand: '',
  userRole: '',
}
