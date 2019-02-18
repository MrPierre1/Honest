import React, { Component } from "react";
import "./App.css";
import Header from "./components/header/header";
import UserList from "./components/users/userlist";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      currentState: "not-panic",
      userData: [],
      userPhoto: [],
      data: [],
    };
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

      console.log("this.data", json[0], json[0].id);
    } catch (error) {
      console.log(error);
    }
  }

  // fetch("https://jsonplaceholder.typicode.com/users/")
  //       .then(response => response.json())
  //       .then(json => {
  //         this.setState({ userData: json })

  //         fetch("https://jsonplaceholder.typicode.com/todos/")
  //           .then(response => response.json())
  //           .then(json2 => {
  //             this.setState({ userPhoto: json2 })
  //             console.log("data todos", this.state.userPhoto)
  //             // fetch("https://jsonplaceholder.typicode.com/users/")
  //           })
  //           .catch(err => {
  //             console.log(err)
  //           })
  //       })
  //       .catch(err => {
  //         console.log(err)
  //       })
  //   }
  // }

  render() {
    return (
      <div>
        <Header />
        <div className="parent">
          <div className="left">
            {this.state.data.map(user => {
              return (
                <UserList
                  key={user.id}
                  userPhone={user.phone}
                  userName={user.name}
                  userEmail={user.email}
                />
              );
            })}
          </div>

          <div className="right">
            {this.state.data.map(user => {
              return (
                <UserList
                  key={user.id}
                  userId={user.id}
                  userName={user.name}
                  userEmail={user.email}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
