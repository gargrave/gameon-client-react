import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'semantic-ui-react'

class PlatformDetailView extends React.Component {
  render () {
    const { platform, onEditClick, onBackClick } = this.props

    return (
      <div>
        <p><strong>Title: </strong>{platform.title}</p>
        <p><strong>Added on: </strong>{platform.created}</p>

        <hr />
        <Button primary onClick={onEditClick}>Edit</Button>
        <Button onClick={onBackClick}>Back</Button>
      </div>
    )
  }
}

PlatformDetailView.propTypes = {
  platform: PropTypes.object.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onBackClick: PropTypes.func.isRequired
}

export default PlatformDetailView
