import React, { Component } from "react";
// import { Link } from "react-router-dom";
import PeopleContainer from "./peopleContainer";
import Person from "./person.jsx";
import UserDetails from "./userDetails";

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

        <div className="row">
          <div className="col s3">
            <PeopleContainer />
          </div>
          <div className="col s9 blue">
            6-columns (one-half)
            <UserDetails />
          </div>
        </div>
      </div>
    );
  }
}

export default UserContainer;
