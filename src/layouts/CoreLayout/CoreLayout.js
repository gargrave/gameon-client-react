import React from 'react'
import PropTypes from 'prop-types'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Container } from 'semantic-ui-react'

import Header from '../../components/Header'
import Initializer from '../../routes/Initializer'

import '../../styles/main.scss'

export const CoreLayout = ({ children }) => (
  <MuiThemeProvider>
    <Container
      className='main-content-area'
      textAlign='center'>
      <Initializer />
      <Header />
      <div className='core-layout__viewport'>
        {children}
      </div>
    </Container>
  </MuiThemeProvider>
)

CoreLayout.propTypes = {
  children : PropTypes.element.isRequired
}

export default CoreLayout
