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

export function compare (a, b) {
  let match = true

  if ((a.id && b.id) && (Number(a.id) !== Number(b.id))) {
    match = false
  }

  if ((a.title.trim() !== b.title.trim())) {
    match = false
  }

  return match
}
