/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-unused-expressions */
import React from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
function Header (props) {
  return (

    <div className='App'>
      <nav>
        <div class='nav-wrapper'>
          <a href='#!' class='brand-logo'>Logo</a>
          <a href='#' data-target='mobile-demo' class='sidenav-trigger'><i class='material-icons'>menu</i></a >
                              <ul class='right hide-on-med-and-down'>
                                <li>
                      <Link to='user'>
                    User
    </Link>
    </li>
                              <li>
                                 <Link to='signup'>
                    Signup Form
    </Link>
    </li>
                      <li>
                        <a href='collapsible.html'>Javascript</a>
          </li>
          <li>
            <a href='mobile.html'>Mobile</a>
          </li>
          </ul>
        </div>
      </nav>
      <ul class='sidenav' id='mobile-demo'>
        <li>
          <Link to='user'> User
          </Link>
        </li>
        <li>
          <Link to='signup'> Signup Form
          </Link>
        </li>
        <li>
          <a href='collapsible.html'>Javascript</a>
        </li>
        <li>
          <a href='mobile.html'>Mobile</a>
        </li>
      </ul>
    </div>
  )
}

export default Header
