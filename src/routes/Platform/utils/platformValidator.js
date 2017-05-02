import validator from 'validator'

import { valErrs } from '../../../globals/errors'

export function validate (data) {
  let valid = true
  let testData = Object.assign({}, data)
  let errors = {
    title: ''
  }

  // validate title -> required
  if (validator.isEmpty(testData.title)) {
    errors.title = valErrs.required
    valid = false
  }

  return { valid, errors }
}

