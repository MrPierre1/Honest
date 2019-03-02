import axios from "axios";
import React, { Component } from "react";

import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";
import UserSelectDropDown from "../common/dropdown";

class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task_title: "",
      task: "",
      date: "",
      users: [],
      dataUsers: [],
      userList: "",
      data: "",
      userTask: [],
      addedTask: "",
      assignedUsers: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleData = this.handleData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillMount() {
    var options = {
      autoClose: true,
      disableWeekends: true
    };
    document.addEventListener("DOMContentLoaded", function() {
      var elems = document.querySelectorAll("select");
      M.FormSelect.init(elems, options);
    });
    M.AutoInit();
  }
  componentDidMount() {
    // try {
    console.log("props from", this.props);
    var options = {
      onOpenStart: function() {
        console.log("Imcalled now");
      }
    };
    // var options2 = {
    //   autoClose: true,
    //   disableWeekends: true
    // };
    document.addEventListener("DOMContentLoaded", function() {
      var elems = document.querySelectorAll(".modal");
      var instances = M.Modal.init(elems, options);

      // var elems2 = document.querySelectorAll(".datepicker");
      // var instances2 = M.Datepicker.init(elems2, options2);

      var elems3 = document.querySelectorAll(".dropdown-trigger");
      var instances3 = M.Dropdown.init(elems3);

      var elemsselect = document.querySelectorAll("select");
      var instances5 = M.FormSelect.init(elemsselect);

      console.log("elemes", instances, instances3, instances5);
    });
    M.AutoInit();
  }

  handleChange(e) {
    console.log("its E DATA ----------", e);
    this.setState({ [e.target.name]: e.target.value });
  }

  activeSelect = {
    color: "pink",
    textDecoration: "none"
  };

  async handleSubmit(e) {
    e.preventDefault();
    var uniqUsers = [...new Set(this.state.assignedUsers)];

    console.log("users assigned", uniqUsers, uniqUsers.length);

    const userTask = {
      task_title: this.state.task_title,
      task: this.state.task,
      date: "12-12-12"
    };

    try {
      const addTask = await axios.post("http://localhost:3000/task", userTask);

      console.log("added task data", addTask.data.task_title);
      const taskId = addTask.data.task_title;

      for (let i = 0; i <= uniqUsers.length - 1; i++) {
        // console.log("I'm in the oop", i, uniqUsers[i]);
        const associateUserWithTask = await axios.post(
          "http://localhost:3000/usertask",
          { task_id: taskId, user_id: uniqUsers[i] }
        );
      }

      M.toast({
        html: `Task ${this.state.task_title} was added`,
        classes: "rounded center closerToCenter"
      });

      // this.setState({ task_title: "", task: "", assignedUsers: [] });
    } catch (error) {
      console.log("There were errors adding the task", error);
    }
  }

  handleData(e) {
    this.state.assignedUsers.push(e);
  }
  render() {
    return (
      <div>
        <div>
          <h1 className="center-align">Task {this.state.users}</h1>

          <form onSubmit={this.handleSubmit} className="container">
            <input
              type="text"
              id="task_title"
              name="task_title"
              placeholder="task_title"
              onChange={this.handleChange}
              value={this.state.task_title}
              required
            />

            <input
              type="text"
              id="task"
              name="task"
              placeholder="task"
              onChange={this.handleChange}
              value={this.state.task}
              required
            />

            {/* <input
              type="text"
              className="datepicker"
              id="date"
              name="date"
              placeholder="Due date"
              onChange={this.handleChange}
              value={this.state.date}
              required
            /> */}

            <UserSelectDropDown handleDPData={this.handleData} />

            <button type="submit" className="btn waves-effect waves-light ">
              Submit
              <i className="material-icons right">send</i>
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default TaskForm;
