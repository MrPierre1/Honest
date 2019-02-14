import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      currentState: "not-panic",
      userData: [],
      userPhoto: [],
    };
  }

  componentDidMount = () => {
    fetch("https://jsonplaceholder.typicode.com/users/")
      .then(response => response.json())
      .then(json => {
        this.setState({ userData: json });

        fetch("https://jsonplaceholder.typicode.com/todos/")
          .then(response => response.json())
          .then(json2 => {
            this.setState({ userPhoto: json2 });
            console.log("data todos", this.state.userPhoto);
            // fetch("https://jsonplaceholder.typicode.com/users/")
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const loadUser = () => {
      console.log("user was clicked");
    };

    console.log(this.state.currentState, "loge", this.state.userData);
    return (
      <div className="App">
        <header className="App-header">
          <h1> Header</h1>
        </header>
        <div className="parent">
          <div className="left">
            <ul>
              {this.state.userData.map(function(user) {
                return (
                  <div className="left">
                    <ul>
                      <li key={user.id} style={{ listStyleType: "none" }}>
                        <a
                          onClick={loadUser}
                          style={{ color: "white", textDecoration: "none" }}
                          href="#"
                        >
                          {user.name}
                        </a>
                        <hr />
                      </li>
                    </ul>
                  </div>
                );
              })}
            </ul>
          </div>
          <div className="right">
            <ul>
              {this.state.userPhoto.map(function(photo) {
                return (
                  <li key={photo.id} style={{ listStyleType: "none" }}>
                    <a
                      style={{ color: "white", textDecoration: "none" }}
                      href="#"
                    >
                      {photo.title}
                    </a>

                    <hr />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
