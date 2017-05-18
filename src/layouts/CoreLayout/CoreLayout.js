import React from 'react'
import PropTypes from 'prop-types'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import Header from '../../components/Header'
import Initializer from '../../routes/Initializer'

import '../../styles/main.scss'

export const CoreLayout = ({ children }) => (
  <MuiThemeProvider>
    <div className='columns'>
      <Initializer />

      <div className='column main-content-area'>
        <Header />
        <div className='core-layout__viewport'>
          {children}
        </div>
      </div>

    </div>
  </MuiThemeProvider>
)

CoreLayout.propTypes = {
  children : PropTypes.element.isRequired
}

export default CoreLayout
