/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-unused-expressions */
import axios from "axios";
import React, { Component } from "react";
import TaskTable from "./taskTable";
import ActionSelector from "../../common/actionSelector";
import Modal from "../../common/modal.js";
import "materialize-css/dist/css/materialize.min.css";

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      datatasks: [],
      isAuthenticated: "",
      taskData: ""
    };
  }

  componentWillMount() {
    var token = localStorage.getItem("token");
    if (!token) {
      console.log("there was no token");
      this.props.history.push("/");
    } else {
      this.setState({
        isAuthenticated: true
      });
    }
  }

  componentDidMount = async () => {
    try {
      const taskData = await axios.get(
        "http://localhost:3000/usertask/user/137"
      );

      this.setState({ tasks: taskData.data });
    } catch (error) {
      console.log("error is here", error);
    }
  };
  render() {
    return (
      <div>
        <TaskTable data={this.state.tasks} />;
        <div id="modal1" className="modal">
          <Modal />
        </div>
        <div className="fixed-action-btn">
          <ActionSelector />
        </div>
      </div>
    );
  }
}

export default TaskList;
