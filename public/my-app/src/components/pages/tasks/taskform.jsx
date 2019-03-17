import axios from "axios";
import React, { Component } from "react";

import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";
import UserSelectDropDown from "../../common/dropdown";

class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task_title: "",
      task: "",
      date: "",
      users: [],
      dataUsers: [],
      data: "",
      userTask: [],
      addedTask: "",
      assignedUsers: [],
      userList: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleData = this.handleData.bind(this);
    this.handleDateChnage = this.handleDateChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillMount() {
    var options = {
      autoClose: true,
      disableWeekends: true
    };

    var elems = document.querySelectorAll("select");
    M.FormSelect.init(elems, options);

    M.AutoInit();
  }
  componentDidMount = async () => {
    try {
      const userList = await axios.get("http://localhost:3000/user/all");

      this.setState({
        task_title: "",
        task: "",
        date: ""
      });

      this.setState({
        userList: userList.data
      });

      var userDetails = localStorage.getItem("user");
      var jsonData = JSON.parse(userDetails);

      console.log(userList, "jsonData2", jsonData);
    } catch (error) {
      console.log("error is here", error);
    }

    var options = {
      autoClose: true,
      onSelect: (date, otherData) => {
        this.setState({ date: date });
        console.log("date is found", date);
      }
    };

    var elems = document.querySelectorAll(".modal");
    M.Modal.init(elems);

    var elems3 = document.querySelectorAll(".dropdown-trigger");
    M.Dropdown.init(elems3);

    var elemsselect = document.querySelectorAll("select");
    M.FormSelect.init(elemsselect);

    var elems2 = document.querySelectorAll(".datepicker");
    M.Datepicker.init(elems2, options);
  };

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  activeSelect = {
    color: "pink",
    textDecoration: "none"
  };

  async handleSubmit(e) {
    e.preventDefault();
    var uniqUsers = [...new Set(this.state.assignedUsers)];

    // console.log("users assigned", uniqUsers, uniqUsers.length);

    const userTask = {
      task_title: this.state.task_title,
      task: this.state.task,
      // date: this.state.date
      date: new Date().toISOString().slice(0, 10)
    };

    try {
      const addTask = await axios.post("http://localhost:3000/task", userTask);

      console.log("added task data", addTask.data.task_title);
      const taskId = addTask.data.task_title;

      for (let i = 0; i <= uniqUsers.length - 1; i++) {
        await axios.post("http://localhost:3000/usertask", {
          task_id: taskId,
          user_id: uniqUsers[i]
        });
      }

      M.toast({
        html: `Task ${this.state.task_title} was added`,
        classes: "rounded center closerToCenter"
      });

      // const elems = document.querySelectorAll(".modal");
      // var instanceModal = M.Modal.getInstance(elems);

      // instanceModal.close();
    } catch (error) {
      console.log("There were errors adding the task", error);
    }
  }

  handleData(e) {
    this.state.assignedUsers.push(e);
  }

  handleDateChange(e) {
    console.log("date time", e);
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

            <input
              type="text"
              className="datepicker"
              id="date"
              name="date"
              placeholder="Due date"
              onChange={this.handleDateChange}
              value={this.state.date}
              required
            />

            <UserSelectDropDown
              handleDPData={this.handleData}
              data={this.state.userList}
            />

            <button
              type="submit"
              className="modal-close btn waves-effect waves-light "
            >
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
