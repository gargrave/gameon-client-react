/* ============================================
 = Validation Errors
 ============================================= */

export const valErrs = {
  required: 'This field is required.',
  email: 'Must be a valid email address.',
  passwordConfirm: 'Passwords do not match.',
  length: (min) => `Must be at least ${min} characters long.`
}
