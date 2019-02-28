import axios from "axios";
import React, { Component } from "react";

import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";
import UserSelectDropDown from "../common/dropdown";
import MySelectDropDown from "../common/MySelectDropDown";
import $ from "jquery";
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
      data: ""
    };

    // var data = ;
    this.handleChange = this.handleChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.passDataToParent = this.passDataToParent.bind(this);
  }
  componentWillMount() {
    var options = {
      autoClose: true,
      disableWeekends: true
    };
    document.addEventListener("DOMContentLoaded", function() {
      var elems = document.querySelectorAll("select");
      var instances = M.FormSelect.init(elems, options);
      console.log("instate", instances);
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
    var options2 = {
      autoClose: true,
      disableWeekends: true
    };
    document.addEventListener("DOMContentLoaded", function() {
      var elems = document.querySelectorAll(".modal");
      var instances = M.Modal.init(elems, options);

      var elems2 = document.querySelectorAll(".datepicker");
      var instances2 = M.Datepicker.init(elems2, options2);

      var elems3 = document.querySelectorAll(".dropdown-trigger");
      var instances3 = M.Dropdown.init(elems3);

      var elemsselect = document.querySelectorAll("select");
      var instances5 = M.FormSelect.init(elemsselect);

      console.log("elemes", instances, instances2, instances3, instances5);
    });
    M.AutoInit();
  }

  passDataToParent(mydata) {
    console.log("teh data is froom the child select dropdown ");

    // this.setState((prevState, data) => {
    //   return { fromChild: prevState.fromChild, postData: data };
    // });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  activeSelect = {
    color: "pink",
    textDecoration: "none"
  };

  handleSubmit(e) {
    e.preventDefault();
    const userTask = {
      task_title: this.state.task_title,
      task: this.state.task,
      date: this.state.date
    };
    console.log("sending data to parent", userTask, this.state.task_title);

    axios({
      method: "post",
      url: "http://localhost:3000/task",
      data: {
        task_title: this.state.task_title,
        task: this.state.task,
        date: this.state.date
      }
      // config: { headers: { 'Content-Type': 'json/application' } }
    })
      .then(response => {
        console.log("server response returned for task", response);
        if (response.status === 201) {
          localStorage.setItem("token", response.data);
          this.setState({ isAuthenticated: true });
          // this.props.history.push('/welcome')
        }
      })
      .catch(error => {
        console.log("There were errors", error);
      });

    // this.props.onClick(userTask)
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
              onChange={this.handleChange}
              value={this.state.date}
              required
            />

            {/**
             *  <MySelectDropDown />
             */}
            {/* <a class="dropdown-trigger btn" href="#" data-target="dropdown1">
              Assign to a user
            </a> */}

            <UserSelectDropDown />

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
