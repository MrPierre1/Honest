import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";

class ManagerSignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: "",
      email: "",
      name: "",
      password: "",
      manager: "",
      user: "",
      result: [],
      obj: [],
      userEmails: [],
      file: "",
      isAuthenticated: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSelectedFile = this.handleSelectedFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSelectedFile(event) {
    this.setState({
      file: event.target.files[0]
    });
    // console.log(event.target.files[0], "files", this.state.file);
  }

  handleSubmit = async e => {
    e.preventDefault();
    // console.log("files", this.state.file);

    var userData = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      file: this.state.file
    };

    var elems12 = document.querySelectorAll(".chips");
    var chipData = elems12[0].M_Chips.chipsData;

    let result = chipData.map(chip => chip.tag);
    // var instance = M.Chips.init(elems12);
    for (var email of result) {
      var myuser = this.state.user.find(x => x.email === email);
      // console.log(myuser, "found the user", email);
      // this.setState({ [e.target.name]: e.target.value });
      this.state.userEmails.push(myuser);
    }

    try {
      var formInfo = new FormData();
      formInfo.append("name", userData.name);
      formInfo.append("email", userData.email);
      formInfo.append("password", userData.password);
      formInfo.append("file", userData.file);

      const loginUser = await axios({
        method: "post",
        url: "http://localhost:3000/user/signup",
        data: formInfo,
        config: { headers: { "Content-Type": "multipart/form-data" } }
      });
      console.log("login ", loginUser);
      if (loginUser.status === 201 && loginUser.data.user.token.length > 10) {
        localStorage.setItem(
          "token",
          JSON.stringify(loginUser.data.user.token)
        );
        localStorage.setItem(
          "user",
          JSON.stringify(loginUser.data.user.userdata[0])
        );

        this.setState({ isAuthenticated: true });
        this.props.history.push("/home");
        this.setState({
          userDetails: loginUser
        });

        M.toast({ html: "Welcome, You're Logged In!", classes: "rounded" });
      } else {
        this.props.history.push("/login");
      }
    } catch (error) {
      console.log("error is here", error);
    }
  };

  componentDidMount = async () => {
    try {
      const userList = await axios.get("http://localhost:3000/user/all");

      this.setState({
        user: userList.data
      });

      // var result = this.state.user.map(user => user.name);

      // console.log("user list", this.state.user);
      // var myuser = this.state.user.find(x => x.user_id === 10);
      // console.log("my user", myuser);
    } catch (error) {
      console.log("error is here", error);
    }

    var users = this.state.user.map(user => user.email);
    this.setState(users);
    Object.keys(users)
      .filter(users.hasOwnProperty.bind(users))
      .reduce((obj, key) => {
        obj[users[key]] = key;
        this.setState({ obj: obj });
        return obj;
      }, {});

    var options00 = {
      autocompleteOptions: {
        data: { ...this.state.obj }
      },
      placeholder: "Add a direct report",
      secondaryPlaceholder: "add additional direct report"
    };

    var elems1 = document.querySelectorAll(".chips");
    M.Chips.init(elems1, options00);
  };
  render() {
    return (
      <div>
        <div>
          <h1 className="center-align">
            Manager SignUp
            <button className="btn waves-effect waves-light btn-large white-text">
              <Link to="/login" className="white-text">
                Login
              </Link>
            </button>
          </h1>
          <form onSubmit={this.handleSubmit} className="container">
            <input
              type="text"
              id="user_id"
              name="user_id"
              placeholder="UserName"
              onChange={this.handleChange}
              value={this.state.user_id}
            />
            <label>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              onChange={this.handleChange}
              value={this.state.email}
            />
            <label>Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              onChange={this.handleChange}
              value={this.state.name}
            />
            <label>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              onChange={this.handleChange}
              value={this.state.password}
            />

            <div className="file-field input-field">
              <div className="btn">
                <span>File</span>
                <input
                  type="file"
                  name="file"
                  id="file"
                  onChange={this.handleSelectedFile}
                />
              </div>
              <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
              </div>
            </div>

            <div className="chips chips-autocomplete" />

            <button
              className="btn waves-effect waves-light"
              type="submit"
              name="action"
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

export default ManagerSignUpForm;
