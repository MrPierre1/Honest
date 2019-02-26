/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-unused-expressions */
import axios from "axios";
import React, { Component } from "react";

class TaskList extends Component {
  state = {
    tasks: [],
    datatasks: [],
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
          datatasks: response,
        });
        // console.log("data its the data", response.data);
      })
      .catch(error => {
        // handle error
        console.log(error);
      });
  }
  render() {
    const userD = this.state.tasks.map(data => (
      <li key={data.task_id} value={data.task_title}>
        {data.task_id}
        <br />
        {data.task_title}
      </li>
    ));

    return <div>{userD}</div>;
  }
}

export default TaskList;
