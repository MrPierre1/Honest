import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: "",
      email: "",
      name: "",
      password: "",
      file: "",
      userDetails: "",
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
  }

  async handleSubmit(e) {
    e.preventDefault();
    const userData = {
      user_id: this.state.user_id,
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      file: this.state.file
    };

    console.log("this user", userData.email, "other", this.state.password);
    try {
      const loginUser = await axios.post("http://localhost:3000/user/login", {
        email: this.state.email,
        password: this.state.password
      });

      console.log("login ", loginUser);
      if (loginUser.status === 201 && loginUser.data.token.length > 10) {
        localStorage.setItem("token", JSON.stringify(loginUser.data.token));
        localStorage.setItem("user", JSON.stringify(loginUser.data.userData));

        this.setState({ isAuthenticated: true });
        this.props.history.push("/home");
        // this.setState({
        //   userDetails: loginUser
        // });

        M.toast({ html: "Welcome, You're Logged In!", classes: "rounded" });
      } else {
        this.props.history.push("/login");
      }
    } catch (error) {
      console.log("error is here", error);
    }
  }
  render() {
    return (
      <div>
        <div>
          <h1 className="center-align">
            Login{" "}
            <button className="btn waves-effect waves-light btn-large white-text">
              {" "}
              <Link to="/manager" className="white-text">
                {" "}
                Signup{" "}
              </Link>{" "}
            </button>
          </h1>
          <form onSubmit={this.handleSubmit} className="container">
            <label>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              onChange={this.handleChange}
              value={this.state.email}
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
            <button
              className="waves-effect waves-light btn-large red lighten-1"
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

export default LoginForm;
