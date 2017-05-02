import React from 'react'
import PropTypes from 'prop-types'
import { Message, Segment } from 'semantic-ui-react'
import validator from 'validator'

import { valErrs } from '../../../../../globals/errors'
import { localUrls } from '../../../../../globals/urls'

import PlatformForm from '../../../components/PlatformForm'

class PlatformCreatePage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      platformData: {
        title: ''
      },
      validationErrors: {
        title: ''
      }
    }
  }

  handleChange (event) {
    event.preventDefault()
    let platformData = Object.assign({}, this.state.platformData)
    const key = event.target.name
    const value = event.target.value

    if (platformData.hasOwnProperty(key)) {
      platformData[key] = value
      this.setState({ platformData })
    }
  }

  handleSubmit (event) {
    event.preventDefault()
    if (this.isValid()) {
      console.log('Valid Platform! Dispatch the action to send it to the API.')
    }
  }

  handleCancel (event) {
    event.preventDefault()
    this.props.router.push(localUrls.platformsList)
  }

  isValid () {
    let valid = true
    let platformData = Object.assign({}, this.state.platformData)
    let validationErrors = { title: '' }

    // validate title -> required
    validationErrors.title = ''
    if (validator.isEmpty(platformData.title)) {
      validationErrors.title = valErrs.required
      valid = false
    }

    this.setState({ validationErrors })
    return valid
  }

  render () {
    return (
      <Segment className='segment-card'>
        <h2 className='page-title'>Add a Platform</h2>

        {this.props.apiError &&
          <Message negative className='platform-api-error'>
            <Message.Header>Error</Message.Header>
            <p>{this.props.apiError}</p>
          </Message>
        }

        <PlatformForm
          working={this.props.ajaxPending}
          platformData={this.state.platformData}
          errors={this.state.validationErrors}
          onChange={e => this.handleChange(e)}
          onSubmit={e => this.handleSubmit(e)}
          onCancel={e => this.handleCancel(e)}
        />
      </Segment>
    )
  }
}

PlatformCreatePage.propTypes = {
  router: PropTypes.object,
  actions: PropTypes.object.isRequired,
  apiError: PropTypes.string.isRequired,
  ajaxPending: PropTypes.bool.isRequired,
  readyToLoad: PropTypes.bool.isRequired
}

export default PlatformCreatePage
