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
    datatasks: [],
    isAuthenticated: ""
  };

  componentWillMount() {
    var token = localStorage.getItem("token");
    var item = JSON.parse(token);
    this.setState({
      isAuthenticated: item
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
        // var token = localStorage.getItem("token");
        // var item = JSON.parse(token);
        // this.setState({
        //   isAuthenticated: item
        // });

        // console.log("data its the data", item, this.state.isAuthenticated);

        // if (!this.state.isAuthenticated) {
        //   this.props.history.push("/");
        // }
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
