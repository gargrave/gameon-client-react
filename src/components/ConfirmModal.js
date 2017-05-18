import React from 'react'
import PropTypes from 'prop-types'

import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'

class ConfirmModal extends React.Component {
  render () {
    const { content, open, title } = this.props
    const { handleClose, handleConfirm } = this.props

    const actions = [
      <RaisedButton
        keyboardFocused
        className='go-btn'
        label='Cancel'
        onTouchTap={handleClose}
      />,
      <RaisedButton
        secondary
        className='go-btn'
        label='Confirm'
        onTouchTap={handleConfirm}
      />
    ]

    return (
      <Dialog
        title={title}
        actions={actions}
        modal={false}
        open={open}
        onRequestClose={handleClose}
      >
        {content}
      </Dialog>
    )
  }
}
ConfirmModal.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  open: PropTypes.bool.isRequired,
  handleConfirm: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired
}

export default ConfirmModal
