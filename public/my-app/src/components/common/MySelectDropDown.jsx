import axios from "axios";
import React, { Component } from "react";

import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";
class MySelectDropDown extends Component {
  state = {
    selectedValue: [],
    juice: [],
    test: "",
    userList: []
  };

  componentWillMount() {
    var options = {
      autoClose: true,
      disableWeekends: true
    };
    document.addEventListener("DOMContentLoaded", function() {
      var elems = document.querySelectorAll("select");
      var instances = M.FormSelect.init(elems, options);
      console.log("instate", instances);
    });
  }
  componentDidMount = async () => {
    // var options = {
    //   autoClose: true,
    //   disableWeekends: true
    // };
    // document.addEventListener("DOMContentLoaded", function() {
    //   var elems = document.querySelectorAll("select");
    //   var instances = M.FormSelect.init(elems, options);
    //   console.log("instate", instances);
    // });

    console.log("props are here", this.props, this.state);
    console.log("props data for drowpdown", this.props.data);
    try {
      const userList = await axios.get("http://localhost:3000/user/all");

      this.setState({
        userList: userList.data
      });
      console.log("user list", this.state.userList);
    } catch (error) {
      console.log("error is here", error);
    }
  };

  render() {
    const userOption = this.state.userList.map(user => (
      <option key={user.user_id} value={user.name}>
        {user.name}
      </option>
    ));

    return (
      <div className="">
        <div className="">
          <select multiple className="browser-default">
            <option disabled defaultValue>
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

export default MySelectDropDown;
