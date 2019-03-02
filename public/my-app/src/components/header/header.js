import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
  state = { isAuthenticated: false };

  componentWillMount() {
    var token = localStorage.getItem("token");
    if (!token) {
      console.log("there was no token");
    } else {
      this.setState({
        isAuthenticated: true,
      });
    }
    // var item = JSON.parse(token);
  }
  render() {
    const isAuthenticated = this.state.isAuthenticated;
    return (
      <div className="App">
        {isAuthenticated ? (
          <nav>
            <div className="nav-wrapper">
              <Link to="/" className="brand-logo left">
                {" "}
                One On One
              </Link>
              <a href="#" data-target="mobile-demo" className="sidenav-trigger">
                <i className="material-icons">menu</i>
              </a>
              <ul className="left hide-on-med-and-down">
                <li>
                  <Link to="home"> Home</Link>
                </li>
                <li>
                  <Link to="tasklist"> Task List</Link>
                </li>
                <li>
                  <Link to="eventlist"> Event List</Link>
                </li>
              </ul>
            </div>
          </nav>
        ) : (
          <nav>
            <div className="nav-wrapper">
              <Link to="/" className="brand-logo left">
                {" "}
                One On One
              </Link>
              <a href="#" data-target="mobile-demo" className="sidenav-trigger">
                <i className="material-icons">menu</i>
              </a>
              <ul className="left hide-on-med-and-down">
                {/**
                 * 
                 li>
                  <Link to="home"> Home</Link>
                </li>
                 */}
              </ul>
            </div>
          </nav>
        )}
      </div>
    );
  }
}

export default Header;
