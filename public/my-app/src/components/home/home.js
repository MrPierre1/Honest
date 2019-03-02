/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-unused-expressions */
import React, { Component } from "react";
import ActionSelector from "../common/actionSelector";
import Modal from "../common/modal";
// import M from 'materialize-css'
// M.AutoInit()

class Home extends Component {
  state = { isAuthenticated: false };
  componentWillMount() {
    var token = localStorage.getItem("token");
    if (!token) {
      console.log("there was no token");
      this.props.history.push("/");
    } else {
      this.setState({
        isAuthenticated: true,
      });
    }
    // var item = JSON.parse(token);
  }
  render() {
    return (
      <div>
        <div>
          <h1>I'm on the Home page</h1>
          <div id="modal1" className="modal">
            <Modal />
          </div>
        </div>
        <div className="fixed-action-btn">
          <ActionSelector />
        </div>
      </div>
    );
  }
}

export default Home;
