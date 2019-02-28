/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-unused-expressions */
import axios from "axios";
import React, { Component } from "react";

class EventsList extends Component {
  state = {
    events: [],
    dataevents: [],
    isAuthenticated: "",
  };

  componentWillMount() {
    var token = localStorage.getItem("token");
    var item = JSON.parse(token);
    this.setState({
      isAuthenticated: item,
    });

    console.log(
      "data its the data1111",
      item,
      "state",
      this.state.isAuthenticated
    );

    if (!item) {
      this.props.history.push("/");
    }
  }
  componentDidMount() {
    var token = localStorage.getItem("token");
    var item = JSON.parse(token);
    this.setState({
      isAuthenticated: item,
    });

    console.log("data its the data", item, this.state.isAuthenticated);

    if (!this.state.isAuthenticated) {
      this.props.history.push("/");
    }

    // try {
    // const events = axios("http://localhost:3000/user/all");
    // console.log("events, should ho here");
    axios
      .get("http://localhost:3000/user/all")
      .then(response => {
        // let currentComponent = this;
        // handle success
        // console.log(response);
        // var data = response
        // this.setState({events: response})
        this.setState({
          events: response.data,
          dataevents: response,
        });
        // console.log("data its the data", response.data);
      })
      .catch(error => {
        // handle error
        console.log(error);
      });
  }
  render() {
    const userD = this.state.events.map(data => (
      <li key={data.user_id} value={data.name}>
        {data.user_id}
        <br />
        {data.name}
      </li>
    ));

    return <div>{userD}</div>;
  }
}

export default EventsList;
