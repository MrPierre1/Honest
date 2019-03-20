/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-unused-expressions */
import React from "react";

import { Link } from "react-router-dom";

function Root(props) {
  var divStyle = {
    marginTop: "200px"
    // textAlign: "center"
    // width: "50%",
    // backgroundColor: "blue"
  };

  const buttonStyle = {
    // width: "10%"
  };
  var isAuthenticated = false;
  var token = localStorage.getItem("token");

  if (!token) {
    console.log("there was no token");

    isAuthenticated = false;
  } else {
    console.log("the user has a token");
    isAuthenticated = true;
  }

  return (
    <div>
      {isAuthenticated ? (
        <Link to="home">
          Home<i className="material-icons right">home</i>
        </Link>
      ) : (
        <div className="container">
          <div className="row" style={divStyle}>
            <div className="col s6 col-content">
              <Link to="login">
                <button
                  className="waves-effect waves-light btn-large red lighten-1 col-content"
                  name="action"
                >
                  Login <i className="material-icons right">send</i>
                </button>
              </Link>
            </div>
            <div className="col s6 col-content" style={buttonStyle}>
              <Link to="manager">
                <button
                  className="waves-effect waves-light btn-large red lighten-1 col-content"
                  name="action"
                >
                  Manager Signup <i className="material-icons right">send</i>
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Root;
