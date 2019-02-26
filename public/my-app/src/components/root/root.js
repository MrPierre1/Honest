/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-unused-expressions */
import React from 'react'
// import { Route } from 'react-router'
import { BrowserRouter, Route, Link } from 'react-router-dom'
// import SignUpForm from './../signup/signup'

import Login from '../login/login'
// import SignUpForm from '../signup/signup'

function Root (props) {
  var divStyle = {
    'marginTop': '200px',
    'textAlign': 'center'
  }
  return (
    <div>
      <div className='container'>
        <div className='row' style={divStyle}>
          <div className='col s6'>
            <Link to='login'>
            <button className='waves-effect waves-light btn-large red lighten-1' name='action'>
              Login <i className='material-icons right'>send</i>
            </button>
            </Link>
          </div>
          <div className='col s6'>
            <Link to='signup'>
            <button className='waves-effect waves-light btn-large red lighten-1' name='action'>
              Signup<i className='material-icons right'>send</i>
            </button>
            </Link>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Root
