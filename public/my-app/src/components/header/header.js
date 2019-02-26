import React from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
function Header (props) {
  return (
    <div className='App'>
      <nav>
        <div className='nav-wrapper'>
          <Link to='/' className='brand-logo'> Logo
          </Link>
          <a href='#' data-target='mobile-demo' className='sidenav-trigger'><i className='material-icons'>menu</i></a>
          <ul className='right hide-on-med-and-down'>
            <li>
              <Link to='home'> Home
              </Link>
            </li>
            <li>
              <Link to='tasklist'> Task List
              </Link>
            </li>
            <li>
              <Link to='eventlist'> Event List
              </Link>
            </li>
            <li>
              <a href='mobile.html'>Mobile</a>
            </li>
          </ul>
        </div>
      </nav>
      <ul className='sidenav' id='mobile-demo'>
        <li>
          <Link to='home'> Home
          </Link>
        </li>
        <li>
          <Link to='tasklist'> Task List
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
