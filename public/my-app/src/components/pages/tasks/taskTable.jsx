import MaterialTable from "material-table";
import React, { Component } from "react";
import axios from "axios";
class TaskTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      taskData: [],
      userTask: []
    };
  }

  componentDidMount = async () => {
    console.log("props", this.props);
    var userDetail = localStorage.getItem("user");
    var userD = JSON.parse(userDetail);

    try {
      const taskUserData = await axios.get(
        `http://localhost:3000/usertask/user/${userD.user_id}`
      );

      console.log("taskuserdata", taskUserData);

      this.setState({ taskData: taskUserData.data });
      let result = this.state.taskData.map(task => task.task_id);

      for (let i = 0; i <= result.length - 1; i++) {
        const thisUserTasks = await axios.get(
          `http://localhost:3000/task/${result[i]}`
        );

        this.setState({ userTask: [...this.state.userTask, thisUserTasks] });
      }

      let serverUserTask = this.state.userTask.map(task => task.data);
      this.setState({ tasks: serverUserTask });

      // console.log(this.state.taskData, "taskdata", taskUserData);
    } catch (error) {
      console.log("error is here", error);
    }
  };
  render() {
    return (
      <div style={{ maxWidth: "100%" }}>
        <MaterialTable
          columns={[
            { title: "Name", field: "task_title" },
            { title: "Task title", field: "task" },
            { title: "Due Date", field: "date", type: "date" }
          ]}
          data={this.state.tasks}
          // Look a tthe date coluns and data being passed
          title="Tasks List"
        />
      </div>
    );
  }
}

export default TaskTable;
