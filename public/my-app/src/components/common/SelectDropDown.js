import axios from "axios";

import React, { Component } from "react";

class SelectDropDown extends Component {
  state = {
    selectedValue: [],
    userData: [],
  };
  componentDidMount() {
    axios
      .get("http://localhost:3000/user/all")
      .then(response => {
        console.log("dropdown data", response);
        this.setState({
          userData: response.data,
        });
        console.log("data its the data", this.state.userData);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="App">
        <div className="input-field col s12">
          <select multiple>
            <option value="" disabled selected>
              Choose your option
            </option>
            {this.props.data.map(user => {
              return (
                <option key={user.user_id} value={user.user_id}>
                  {user.name}
                </option>
              );
            })}
          </select>
          <label>Selct a User</label>
        </div>
      </div>
    );
  }
}

export default SelectDropDown;
