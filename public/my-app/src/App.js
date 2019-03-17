import axios from "axios";
import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import "./App.css";
import EventList from "./components/common/eventlist";
import Footer from "./components/common/footer.jsx";

import Header from "./components/common/header.js";
import Root from "./components/common/root.jsx";
import Home from "./components/pages/home/home.jsx";
import Login from "./components/pages/login/login.jsx";
import ManagerSignUpForm from "./components/pages/signup/managerSignup.jsx";
import SignUpForm from "./components/pages/signup/signup.jsx";

import TaskList from "./components/pages/tasks/tasklist.jsx";
import "materialize-css/dist/css/materialize.min.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      currentState: "not-panic",
      userData: [],
      userPhoto: [],
      data: [],
      posts: [],
      fromChild: "",
      postData: "",
      isAuthenticated: true,
      userList: "",
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleData = this.handleData.bind(this);
  }

  handleData(data) {
    console.log("teh data is froom the child ", data);

    this.setState((prevState, data) => {
      return { fromChild: prevState.fromChild, postData: data };
    });
  }

  handleFormSubmit(data) {
    this.setState((prevState, data) => {
      return { fromChild: prevState.fromChild, postData: data };
    });

    var formInfo = new FormData();
    formInfo.append("name", data.name);
    formInfo.append("email", data.email);
    formInfo.append("password", data.password);
    formInfo.append("file", data.file);
    axios({
      method: "post",
      url: "http://localhost:3000/user/signup",
      data: formInfo,
      config: { headers: { "Content-Type": "multipart/form-data" } },
    })
      .then(response => {
        console.log("server response returned", response);
        if (response.status === 201) {
          localStorage.setItem("token", response.data);
          this.setState({ isAuthenticated: true });
        }
      })
      .catch(error => {
        console.log("There were errors", error);
      });
  }

  // componentDidMount () {
  componentDidMount = async () => {
    try {
      const userList = await axios.get("http://localhost:3000/user/all");
      this.setState({
        userList: userList.data,
      });
    } catch (error) {
      console.log("error is here", error);
    }
  };

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Route path="/" exact component={Root} />
          <Route path="/home" component={Home} isAuthenticated={false} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUpForm} />
          <Route path="/manager" component={ManagerSignUpForm} />

          <Route path="/tasklist" component={TaskList} isAuthenticated={true} />
          <Route
            path="/eventlist"
            component={EventList}
            isAuthenticated={true}
          />
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
