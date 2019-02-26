import axios from "axios";
import React, { Component } from "react";
import SelectDropdown from "../common/SelectDropDown";
import "materialize-css/dist/css/materialize.min.css";

import M from "materialize-css/dist/js/materialize.min.js";
class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task_title: "",
      task: "",
      date: "",
      users: [],
      dataUsers: [],
      data: [
        {
          user_id: 6,
          email: "jekaoolln9@ltest.com",
          name: "steve",
          password: "plllekllase91",
          photo: "photkollll94",
        },
        {
          user_id: 7,
          email: "jt@ltest.com",
          name: "Kevin",
          password: "password2",
          photo: "photo1",
        },
        {
          user_id: 9,
          email: "jtppe@ltest.com",
          name: "Tevor",
          password: "{}",
          photo: "phoppto901",
        },
        {
          user_id: 10,
          email: "jtppooe@ltest.com",
          name: "jessica",
          password: "{}",
          photo: "phopoopto901",
        },
        {
          user_id: 11,
          email: "jtpp00ooe@ltest.com",
          name: "julius",
          password: "{}",
          photo: "phopoo00pto901",
        },
      ],
    };

    // var data = ;
    this.handleChange = this.handleChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.passDataToParent = this.passDataToParent.bind(this);
  }

  componentDidMount() {
    // try {
    var options = {
      onOpenStart: function() {
        console.log("Imcalled now");
      },
    };
    document.addEventListener("DOMContentLoaded", function() {
      var elems = document.querySelectorAll(".modal");
      var instances = M.Modal.init(elems, options);
      console.log("elemes", elems);
    });

    const users = axios("http://localhost:3000/user/all");
    console.log("users, should ho here");

    axios
      .get("http://localhost:3000/user/all")
      .then(function(response) {
        // handle success
        console.log(response);
        // var data = response
        // this.setState({users: response})
        this.setState({
          users: response.data,
          dataUsers: response,
        });
        console.log("data its the data", response.data);
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  }

  passDataToParent(data) {
    console.log("teh data is froom the child select dropdown ", data);

    // this.setState((prevState, data) => {
    //   return { fromChild: prevState.fromChild, postData: data };
    // });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  activeSelect = {
    color: "pink",
    textDecoration: "none",
  };

  handleSubmit(e) {
    e.preventDefault();
    const userTask = {
      task_title: this.state.task_title,
      task: this.state.task,
      date: this.state.date,
    };
    console.log("sending data to parent", userTask, this.state.task_title);

    axios({
      method: "post",
      url: "http://localhost:3000/task",
      data: {
        task_title: this.state.task_title,
        task: this.state.task,
        date: this.state.date,
      },
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
              id="date"
              name="date"
              placeholder="Due date"
              onChange={this.handleChange}
              value={this.state.date}
              required
            />

            <SelectDropdown
              type="multiple"
              data={this.state.data}
              handleFromParent={this.passDataToParent}
            />

            <button type="submit" className="btn waves-effect waves-light">
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
