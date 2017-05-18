import React from 'react'
import PropTypes from 'prop-types'

import Paper from 'material-ui/Paper'

import { localUrls } from '../../../../../globals/urls'
import { validate } from '../../../utils/platformValidator'

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

    if (key in platformData) {
      platformData[key] = value
      this.setState({ platformData })
    }
  }

  handleSubmit (event) {
    event.preventDefault()
    const platform = this.state.platformData
    const val = validate(platform)
    this.setState({ validationErrors: val.errors })

    if (val.valid) {
      this.props.actions.createPlatform(platform)
        .then(platform => {
          this.props.router.push(`${localUrls.platformsList}/${platform.id}`)
        }, () => {
        })
    }
  }

  handleCancel (event) {
    event.preventDefault()
    this.props.router.push(localUrls.platformsList)
  }

  render () {
    return (
      <Paper className='go-paper'>
        <h2 className='page-title'>Add a Platform</h2>

        {this.props.apiError &&
          <div id='platform-api-error'>
            <p>Error</p>
            <p>{this.props.apiError}</p>
          </div>
        }

        <PlatformForm
          working={this.props.ajaxPending}
          platformData={this.state.platformData}
          errors={this.state.validationErrors}
          onChange={e => this.handleChange(e)}
          onSubmit={e => this.handleSubmit(e)}
          onCancel={e => this.handleCancel(e)}
        />
      </Paper>
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
