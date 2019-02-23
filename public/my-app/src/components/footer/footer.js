/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-unused-expressions */
import React from 'react'
function Footer (props) {
  var divStyle = {
    background: 'red',
    'marginTop': '200px'
  }

  return (
    <div className='App ' style={divStyle}>
      <footer class='page-footer'>
        <div class='footer-copyright marginforfooter'>
          <div class='container'>
            © 2014 Copyright Text
            <a class='grey-text text-lighten-4 right' href='#!'>More Links</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
