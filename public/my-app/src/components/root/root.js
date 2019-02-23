/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-unused-expressions */
import React from 'react'
// import { Route } from 'react-router'
// import { BrowserRouter, Link } from 'react-router-dom'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import SignUpForm from './../signup/signup'
import User from './../users/user'

function Root (props) {
  return (
    <div>
      <div>
        <nav>
          <div className='nav-wrapper'>
            <a href='#!' className='brand-logo'>1 One 1</a>
            <a href='#' data-target='mobile-demo' className='sidenav-trigger'><i className='material-icons'>menu</i></a >
                                                        <ul className='right hide-on-med-and-down'>
                                                        <li>
                                                        <Link to={'/User'}>
                                                        User
    </Link>
    </li>
                                                                                                                  <li>
                                                                                                                    <a href='badges.html'>Components</a>
            </li>
            <li>
              <a href='collapsible.html'>Javascript</a>
            </li>
            <li>
              <Link to={'/signup'}> Signup
              </Link>
            </li>
            </ul>
          </div>
        </nav>
        <ul className='sidenav' id='mobile-demo'>
          <li>
            <a href='sass.html'>Sass</a>
          </li>
          <li>
            <a href='badges.html'>Components</a>
          </li>
          <li>
            <a href='collapsible.html'>Javascript</a>
          </li>
          <li>
            <a href='mobile.html'>Mobile</a>
          </li>
        </ul>
      </div>
      <div>
        <div>
          {props.children}
        </div>
      </div>
      <div>
        <footer className='page-footer'>
          <div className='container'>
            <div className='row'>
              <div className='col l6 s12'>
                <h5 className='white-text'>Footer Content</h5>
                <p className='grey-text text-lighten-4'>
                  You can use rows and columns here to organize your footer content.
                </p>
              </div>
              <div className='col l4 offset-l2 s12'>
                <h5 className='white-text'>Links</h5>
                <ul>
                  <li>
                    <a className='grey-text text-lighten-3' href='#!'>Link 1</a>
                  </li>
                  <li>
                    <a className='grey-text text-lighten-3' href='#!'>Link 2</a>
                  </li>
                  <li>
                    <a className='grey-text text-lighten-3' href='#!'>Link 3</a>
                  </li>
                  <li>
                    <a className='grey-text text-lighten-3' href='#!'>Link 4</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className='footer-copyright'>
            <div className='container'>
              © 2014 Copyright Text
              <a className='grey-text text-lighten-4 right' href='#!'>More Links</a>
            </div>
          </div>
        </footer>
      </div>
    </div>

  )
}

export default Root
