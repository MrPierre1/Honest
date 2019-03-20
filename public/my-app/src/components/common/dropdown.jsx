// import axios from "axios";
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
    console.log("props to drowndow", this.props);
    M.AutoInit();
  };

  handleChange(e) {
    var elems = document.querySelectorAll(".datepicker");
    M.Datepicker.init(elems);

    this.setState({
      values: [...e.target.selectedOptions].map(o =>
        this.props.handleDPData(o.value)
      )
    });
  }

  render() {
    const userOption = this.props.data.map(user => (
      <option key={user.user_id} value={user.user_id}>
        {user.name}
      </option>
    ));

    return (
      <div className="input-field col s12">
        <select multiple onChange={this.handleChange}>
          <option value={this.state.values} disabled>
            Choose your option
          </option>
          {userOption}
        </select>
        <label>Assign to a user</label>
      </div>
    );
  }
}

export default UserSelectDropDown;
