import React from 'react'
import PropTypes from 'prop-types'

import RaisedButton from 'material-ui/RaisedButton'

class PlatformDetailView extends React.Component {
  render () {
    const { platform, onEditClick, onBackClick } = this.props

    return (
      <div>
        <p><strong>Title: </strong>{platform.title}</p>
        <p><strong>Added on: </strong>{platform.created}</p>

        <hr />

        <RaisedButton
          primary
          className='go-btn'
          label='Edit'
          onClick={onEditClick}
        />

        <RaisedButton
          className='go-btn'
          label='Back'
          onClick={onBackClick}
        />
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
