import axios from "axios";
import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import "./App.css";
import Footer from "./components/footer/footer";
import Header from "./components/header/header";

import SignUpForm from "./components/signup/signup";
import User from "./components/users/user";

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
      isAuthenticated: false,
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleData = this.handleData.bind(this);
  }

  handleData(data) {
    console.log("teh data is froom the child ", data);
    // this.setState({
    //   fromChild: data,
    // });

    // this.setState(state => {
    //   return { formChild: data };
    // });

    this.setState((prevState, data) => {
      return { fromChild: prevState.fromChild, postData: data };
    });
    // console.log("2m the child ", typeof data);

    //

    // // debugger;
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
  async componentDidMount() {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/`
      );
      if (!response.ok) {
        throw Error(response.statusText);
      }
      var json = await response.json();
      this.setState({ data: json });

      const posts = await fetch(`https://jsonplaceholder.typicode.com/posts/`);

      var jsonPosts = await posts.json();
      this.setState({ posts: jsonPosts });

      console.log("this.posts", jsonPosts, jsonPosts.id);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const isAuthenticated = this.state.isAuthenticated;
    return (
      <BrowserRouter>
        <div>
          <Header />
          <div>
            <Route path="/user" component={User} />
            <Route path="/signup" component={SignUpForm} />
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
