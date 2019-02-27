import axios from "axios";
import React, { Component, useState } from "react";
class SelectDropDown extends Component {
  state = {
    selectedValue: [],
    juice: [],
    test: "",
    userList: []
  };
  async componentDidMount() {
    console.log("props are here", this.props, this.state);
    console.log("props data for drowpdown", this.props.data);
    try {
      const userList = await axios.get("http://localhost:3000/user/all");

      this.setState({
        userList
      });
      console.log("user list".this.state.userList);
    } catch (error) {
      console.log("error is here", error);
    }
  }

  render() {
    const userOption = this.state.userList.map(user => (
      <option key={user.user_id} value={user.name}>
        {user.name}
      </option>
    ));

    return (
      <div className="App">
        <div className="input-field col s12">
          <select multiple>
            <option disabled selected>
              Choose your option
            </option>
            {userOption}
          </select>
          <label>Select a User</label>
        </div>
      </div>
    );
  }
}

export default SelectDropDown;
