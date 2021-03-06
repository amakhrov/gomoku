import React from 'react'
import './CoreLayout.scss'
import '../../styles/core.scss'

export const CoreLayout = ({children}) => (
  <div className='container text-center'>
    <div className='core-layout__viewport'>
      {children}
    </div>
  </div>
)

CoreLayout.propTypes = {
  // children : React.PropTypes.element.isRequired
  children : React.PropTypes.element
}

export default CoreLayout
