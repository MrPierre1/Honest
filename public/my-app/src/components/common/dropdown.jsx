import axios from "axios";
import React, { Component } from "react";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";

class UserSelectDropDown extends Component {
  constructor(props) {
    super();
    this.state = {
      selectedValue: [],
      juice: [],
      test: "",
      userList: [],
      values: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    var options = {
      autoClose: true,
      disableWeekends: true
    };
    var elems = document.querySelectorAll("select");
    M.FormSelect.init(elems, options);
  }

  componentDidMount = async () => {
    // document.addEventListener("DOMContentLoaded", function() {
    //   var elemsg = document.querySelectorAll("select");
    //   var instancese = M.FormSelect.init(elemsg);

    //   console.log("instate", instancese, "value ");
    // });

    try {
      const userList = await axios.get("http://localhost:3000/user/all");

      this.setState({
        userList: userList.data,
        test: userList.data[0]
      });
      // console.log("user list", this.state.userList[0], "test", this.state.test);
    } catch (error) {
      console.log("error is here", error);
    }
    M.AutoInit();
  };

  handleChange(e) {
    console.log("options23", e.target.options);
    console.log("options25", e.target.selectedOptions);

    this.setState({
      values: [...e.target.selectedOptions].map(o =>
        this.props.handleDPData(o.value)
      )
    });

    // this.props.handleDPData([...e.target.selectedOptions]);
  }

  render() {
    const userOption = this.state.userList.map(user => (
      <option key={user.user_id} value={user.user_id}>
        {user.name}
      </option>
    ));

    console.log("datafromvalueee--", this.state.values);
    return (
      <div className="input-field col s12">
        <select multiple onChange={this.handleChange}>
          <option value={this.state.values} disabled>
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
