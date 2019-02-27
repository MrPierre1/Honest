/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-unused-expressions */
import axios from "axios";
import React, { Component } from "react";
import TaskTable from "./taskTable";
import ActionSelector from "./actionSelector";
import Modal from "./modal";

class TaskList extends Component {
  state = {
    tasks: [],
    datatasks: []
  };

  componentDidMount() {
    // try {
    // const tasks = axios("http://localhost:3000/user/all");
    // console.log("tasks, should ho here");
    axios
      .get("http://localhost:3000/task/all")
      .then(response => {
        // let currentComponent = this;
        // handle success
        // console.log(response);
        // var data = response
        // this.setState({tasks: response})
        this.setState({
          tasks: response.data,
          datatasks: response
        });
        // console.log("data its the data", response.data);
      })
      .catch(error => {
        // handle error
        console.log(error);
      });
  }
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
