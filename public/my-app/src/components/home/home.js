/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-unused-expressions */
import React, { Component } from "react";
import ActionSelector from "../common/actionSelector";
import Modal from "../common/modal";
// import M from 'materialize-css'
// M.AutoInit()

class Home extends Component {
  state = { isAuthenticated: "" };
  componentWillMount() {
    var token = localStorage.getItem("token");
    var item = JSON.parse(token);
    this.setState({
      isAuthenticated: item,
    });

    console.log(
      "data its the data1111",
      item,
      "state",
      this.state.isAuthenticated
    );

    if (!item) {
      this.props.history.push("/");
    }
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
