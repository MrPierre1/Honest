import React, { Component } from "react";
// import { Link } from "react-router-dom";
import Person from 'person.jsx'

import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";


class UserContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { isAuthenticated: false };
    // this.logout = this.logout.bind(this)
  }

  componentDidUpdate() {
    // if (!this.state.isAuthenticated) {
    //   var token = localStorage.getItem('token')
    //   if (!token) {
    //     console.log('there was no token')
    //   }else if (token) {
    //     this.setState({
    //       isAuthenticated: true
    //     })
    //   }
    //   console.log('state is here', this.state.isAuthenticated)
    // }
  }

  // logout () {
  //   localStorage.removeItem('token')
  //   localStorage.removeItem('user')

  //   this.props.history.push('/')

  //   M.toast({ html: "You're Logged Out", classes: 'rounded' })
  // }
  render() {
    // const isAuthenticated = this.state.isAuthenticated
    // console.log('isuathenticated', isAuthenticated)
    // const logoStyle = {
    //   color: 'white',
    //   fontFamily: 'Snell Roundhand, cursive',
    //   fontWeight: 900,
    //   fontSize: 70,
    //   margin: 'auto'
    // }

    return (
      <div className="usercontainer">
        <h1>USER CONTAINER</h1>
        <div>
          <table className="centered highlighted">
            <thead>
              <tr>
                <th>Name</th>
                <hr style={{width: '1px', height: '10px', display: 'inline', marginLeft: '2px', marginRight:' 2px'}}/>
                <th>Item Name</th>
                <th>Item Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
            <Person></Person>
                <td>Eclair</td>
                <td>$0.87</td>
              </tr>
              <tr>
                <td>Alan</td>
                <td>Jellybean</td>
                <td>$3.76</td>
              </tr>
              <tr>
                <td>Jonathan</td>
                <td>Lollipop</td>
                <td>$7.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default UserContainer;
