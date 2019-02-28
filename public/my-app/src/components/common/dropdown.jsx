import axios from "axios";
import React, { Component } from "react";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";
import $ from "jquery";
class UserSelectDropDown extends Component {
  state = {
    selectedValue: [],
    juice: [],
    test: "",
    userList: []
  };

  componentWillMount() {
    // var optionsr = {
    //   autoClose: true,
    //   disableWeekends: true
    // };
    // document.addEventListener("DOMContentLoaded", function() {
    //   var elemsr = document.querySelectorAll("select");
    //   var instancesr = M.FormSelect.init(elemsr);
    //   console.log("instate", instancesr);
    // });
  }

  componentDidMount = async () => {
    document.addEventListener("DOMContentLoaded", function() {
      var elemsg = document.querySelectorAll("select");
      var instancese = M.FormSelect.init(elemsg);
      console.log("instate", instancese);
    });

    console.log("props are here", this.props, this.state);
    console.log("props data for drowpdown", this.props.data);
    try {
      const userList = await axios.get("http://localhost:3000/user/all");

      this.setState({
        userList: userList.data,
        test: userList.data[0]
      });
      console.log("user list", this.state.userList[0], "test", this.state.test);
    } catch (error) {
      console.log("error is here", error);
    }
    M.AutoInit();
  };

  render() {
    const userOption = this.state.userList.map(user => (
      <option key={user.user_id} value={user.name}>
        {user.name}
      </option>
    ));

    return (
      <div className="input-field col s12">
        <select multiple>
          <option value="" disabled>
            Choose your option
          </option>
          {userOption}
        </select>
        <label>Select a user</label>
      </div>
    );
  }
}

export default UserSelectDropDown;
