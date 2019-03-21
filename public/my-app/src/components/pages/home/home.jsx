/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-unused-expressions */
import React, { Component } from "react";
import ActionSelector from "../../common/actionSelector";
import Modal from "../../common/modal";
import EventCalendar from "../../common/calendar";
import "materialize-css/dist/css/materialize.min.css";
import UserContainer from "../managerView/userContainer.jsx";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { isAuthenticated: false, manager: false };
  }

  componentWillMount() {
    console.log("this is being passed from login", this.props.location);

    var token = localStorage.getItem("token");
    var user = localStorage.getItem("user");
    // console.log("let me see the manager",
    var parseData = JSON.parse(user).manager;

    this.setState({ manager: parseData });

    if (!token) {
      console.log("there was no token");
      this.props.history.push("/");
    } else {
      // this.setState({
      //   isAuthenticated: true,
      //   manager: this.props.location.state.manager
      // });
    }
  }

  render() {
    var divStyle = {
      marginTop: "200px"
      // textAlign: "center"
      // width: "50%",
      // backgroundColor: "blue"
    };

    const isManager = this.state.manager;

    console.log(this.state.manager, "ismanager, ", isManager);
    return (
      <div>
        {this.state.manager ? (
          <UserContainer />
        ) : (
          <div className="row center-align" style={divStyle}>
            <div className="col s3">
              <a
                href="#modal1"
                className="waves-effect waves-light btn-large center-align modal-trigger"
              >
                Add A Task{" "}
              </a>
            </div>
            <div className="col s3">
              <a href="#modal1" className="waves-effect waves-light btn-large">
                Schedule An Event
              </a>
            </div>
            <div className="col s3">
              <a href="#modal1" className="waves-effect waves-light btn-large">
                Review My Items
              </a>
            </div>

            <div className="col s3">
              <a href="#modal1" className="waves-effect waves-light btn-large">
                Add New Direct Reports
              </a>
            </div>

            <div id="modal1" className="modal">
              <Modal />
            </div>

            <div className="fixed-action-btn">
              <ActionSelector />
            </div>
          </div>
        )}

        {/* <div>
          <div className="row center-align" style={divStyle}>
            <div className="col s3">
              <a
                href="#modal1"
                className="waves-effect waves-light btn-large center-align modal-trigger"
              >
                Add A Task{" "}
              </a>
            </div>
            <div className="col s3">
              <a href="#modal1" className="waves-effect waves-light btn-large">
                Schedule An Event
              </a>
            </div>
            <div className="col s3">
              <a href="#modal1" className="waves-effect waves-light btn-large">
                Review My Items
              </a>
            </div>

            <div className="col s3">
              <a href="#modal1" className="waves-effect waves-light btn-large">
                Add New Direct Reports
              </a>
            </div>
          </div>

          <div id="modal1" className="modal">
            <Modal />
          </div>
        </div>
        <div className="fixed-action-btn">
          <ActionSelector />
        </div> */}
      </div>
    );
  }
}

export default Home;
