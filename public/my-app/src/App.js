import axios from "axios";
import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import "./App.css";
import EventList from "./components/common/eventlist";
import TaskList from "./components/common/tasklist.jsx";

import Footer from "./components/footer/footer";
import Header from "./components/header/header";
import Home from "./components/home/home";
import Login from "./components/login/login";
import Root from "./components/root/root";
import SignUpForm from "./components/signup/signup";
import TaskForm from "./components/taskform/taskform";

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
    // this.setState({
    //   fromChild: data,
    // })

    // this.setState(state => {
    //   return { formChild: data }
    // })

    this.setState((prevState, data) => {
      return { fromChild: prevState.fromChild, postData: data };
    });
    // console.log("2m the child ", typeof data)

    //

    // // debugger
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
      const userList = await axios.get("http://localhost:3000/user/all");

      this.setState({
        userList: userList.data,
      });
    } catch (error) {
      console.log("error is here", error);
    }

    // .then(response => {
    //   console.log('dropdown dataresponse', response)
    //   this.setState({
    //     userData: response.data
    //   })
    //   console.log('DROPDOWN juice', this.state.userData)
    // })
    // .catch(error => {
    //   console.log('I saw errors dued', error)
    // })

    // try {
    //   const response = await fetch(
    //     `https://jsonplaceholder.typicode.com/users/`
    //   )
    //   if (!response.ok) {
    //     throw Error(response.statusText)
    //   }
    //   var json = await response.json()
    //   this.setState({ data: json })
    //   const posts = await fetch(`https://jsonplaceholder.typicode.com/posts/`)
    //   var jsonPosts = await posts.json()
    //   this.setState({ posts: jsonPosts })
    //   console.log("this.posts", jsonPosts, jsonPosts.id)
    // } catch (error) {
    //   console.log(error)
    // }
  }

  render() {
    // const isAuthenticated = this.state.isAuthenticated
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Route path="/" exact component={Root} />
          <Route path="/home" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUpForm} />

          {/**
           * 
           <Route
            path="/task"
            component={TaskForm}
            logged={true}
            data={this.state.userList}
            <Route path="/tasks" something={"here"} component={{ TaskForm }} />
          />
           */}

          <Route
            path="/task"
            component={props => (
              <TaskForm data={this.state.userList}>{props.children}</TaskForm>
            )}
          />

          <Route path="/tasklist" component={TaskList} />
          <Route path="/eventlist" component={EventList} />
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
