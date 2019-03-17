/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-unused-expressions */
import React from 'react'
// import { Route } from 'react-router'
import { BrowserRouter, Route, Link } from 'react-router-dom'
// import SignUpForm from './../signup/signup'

import Login from '../login/login'
// import SignUpForm from '../signup/signup'

function Added (props) {
  var divStyle = {
    'marginTop': '200px',
    'textAlign': 'center'
  }
  return (
    <div>
      <div className='container'>
        Task Added
        <button className='btn btn-primary'>
          Add another
        </button>
      </div>
    </div>

  )
}

export default Added
