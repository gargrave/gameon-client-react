import React from 'react'
import PropTypes from 'prop-types'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

const ConfirmModal = (props) => (
  <Modal
    basic
    size='small'
    open={props.showing}>

    {props.headerText &&
      <Header icon='trash' content={props.headerText} />
    }

    {props.contentText &&
      <Modal.Content>
        <p>{props.contentText}</p>
      </Modal.Content>
    }

    <Modal.Actions>
      <Button
        basic
        color='red'
        inverted
        onClick={e => props.onCancel(e)}>
        <Icon name='remove' /> No
      </Button>
      <Button
        color='green'
        inverted
        onClick={e => props.onConfirm(e)}>
        <Icon name='checkmark' /> Yes
      </Button>
    </Modal.Actions>
  </Modal>
)

ConfirmModal.propTypes = {
  headerText: PropTypes.string,
  contentText: PropTypes.string,
  showing: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
}

export default ConfirmModal
