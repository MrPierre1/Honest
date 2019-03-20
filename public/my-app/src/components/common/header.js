import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css/dist/js/materialize.min.js'

class Header extends Component {
  constructor (props) {
    super(props)
    this.state = { isAuthenticated: false }
    this.logout = this.logout.bind(this)
  }

  componentDidUpdate () {
    if (!this.state.isAuthenticated) {
      var token = localStorage.getItem('token')

      if (!token) {
        console.log('there was no token')
      }else if (token) {
        this.setState({
          isAuthenticated: true
        })
      }

      console.log('state is here', this.state.isAuthenticated)
    }
  }

  logout () {
    localStorage.removeItem('token')
    localStorage.removeItem('user')

    this.props.history.push('/')

    M.toast({ html: "You're Logged Out", classes: 'rounded' })
  }
  render () {
    const isAuthenticated = this.state.isAuthenticated
    console.log('isuathenticated', isAuthenticated)
    const logoStyle = {
      color: 'white',
      fontFamily: 'Snell Roundhand, cursive',
      fontWeight: 900,
      fontSize: 70,
      margin: 'auto'
    }

    return (

      <div className='App'>
        {isAuthenticated ? (
           <div>
             <nav>
               <div className='nav-wrapper'>
                 <Link to='/home' className='brand-logo left' style={logoStyle}> Honest
                 </Link>
                 <a href='#!' data-target='mobile-demo' className='sidenav-trigger'><i className='material-icons'>menu</i></a>
                 <ul className='left hide-on-med-and-down' style={{ width: '30%'}}>
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
                     <Link to='root' onClick={this.logout}> Logout
                     </Link>
                   </li>
                 </ul>
               </div>
             </nav>
             <div>
               <ul id='slide-out' className='sidenav'>
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
                   <Link to='eventlist'> Event List
                   </Link>
                 </li>
               </ul>
             </div>
           </div>
           ) : (
           <nav>
             <div className='nav-wrapper'>
               <Link to='/' className='brand-logo left' style={logoStyle}> Honest
               </Link>
               <a href='home' data-target='mobile-demo' className='sidenav-trigger'><i className='material-icons'>menu</i></a>
               <ul className='left hide-on-med-and-down'>
               </ul>
             </div>
           </nav>
           )}
      </div>
    )
  }
}

export default Header
