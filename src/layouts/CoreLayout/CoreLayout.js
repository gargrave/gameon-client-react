import React from 'react'
import PropTypes from 'prop-types'
import { Container } from 'semantic-ui-react'

import Header from '../../components/Header'

import '../../styles/main.scss'

export const CoreLayout = ({ children }) => (
  <Container
    className='main-content-area'
    textAlign='center'>
    <Header />
    <div className='core-layout__viewport'>
      {children}
    </div>
  </Container>
)

CoreLayout.propTypes = {
  children : PropTypes.element.isRequired
}

export default CoreLayout
