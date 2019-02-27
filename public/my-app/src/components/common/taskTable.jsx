import MaterialTable from "material-table";
import React, { Component } from "react";
import axios from "axios";
class TaskTable extends Component {
  state = {
    tasks: []
  };
  componentDidMount() {
    console.log("props", this.props.data);

    axios
      .get("http://localhost:3000/task/all")
      .then(response => {
        // let currentComponent = this;
        // handle success
        // console.log(response);
        // var data = response
        // this.setState({tasks: response})
        this.setState({
          tasks: response.data
        });
        console.log("data its the data", ...this.state.tasks);
      })
      .catch(error => {
        // handle error
        console.log(error);
      });
  }
  render() {
    return (
      <div style={{ maxWidth: "100%" }}>
        <MaterialTable
          columns={[
            { title: "Name", field: "name" },
            { title: "Task title", field: "surname" },
            { title: "Due Date", field: "birthYear", type: "numeric" }
          ]}
          data={[
            ...this.state.tasks
            // {
            //   name: "Mehmet",
            //   surname: "Baran",
            //   birthYear: 1987,
            //   birthCity: 63
            // },
            // {
            //   name: "this.state.tasks[0]",
            //   surname: "two",
            //   birthYear: 1987,
            //   birthCity: 73
            // }
          ]}
          title="Tasks List"
        />
      </div>
    );
  }
}

export default TaskTable;
