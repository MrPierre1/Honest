import React from 'react'
import { Link } from 'react-router-dom'
function Header (props) {
  return (
    <div className='App'>
      <nav>
        <div className='nav-wrapper'>
          <Link to='/' className='brand-logo left'> One On One
          </Link>
          <a href='#' data-target='mobile-demo' className='sidenav-trigger'><i className='material-icons'>menu</i></a>
          <ul className='left hide-on-med-and-down'>
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
      </ul>
    </div>
  )
}

export default Header
