const pool = require("./../../db");

const getFeedbackByID = function(feedback_id: number) {
  return pool
    .query(`SELECT * FROM feedback WHERE feedback_id = ${feedback_id}`)
    .then((res: any) => {
      return res.rows;
    })
    .catch((err: any) => {
      return err;
    });
};

// const createTask = (
//   type: string,
//   taskTitle: string,
//   task: string,
//   assignedTo: number,
//   createdBy: number
// ) => {
//   return pool
//     .query(
//       "INSERT INTO tasks (type, taskTitle, task, assignedTo, createdBy) VALUES ($1, $2, $3, $4, $5) returning type, taskTitle, task",
//       [type, taskTitle, task, assignedTo, createdBy]
//     )
//     .then(function(res: any) {
//       return res.rows;
//     })
//     .catch((error: any) => {
//       throw error;
//     });
// };

// const updateTask = (
//   task_id: number,
//   type: string,
//   taskTitle: string,
//   task: string,
//   assignedTo: number
// ) => {
//   console.log("task data11", task_id, taskTitle);
//   return pool
//     .query(
//       "UPDATE tasks SET type = $1, taskTitle = $2, task = $3, assignedTo = $4, modified_date = NOW() WHERE task_id = $5 returning taskTitle, task_id",
//       [type, taskTitle, task, assignedTo, task_id]
//     )
//     .then((res: any) => {
//       return res.rows;
//     })
//     .catch((err: any) => {
//       return err;
//     });
// };

// const deleteTaskById = (task_id: number) => {
//   console.log("id is here from queries", task_id);
//   return pool
//     .query(`DELETE FROM tasks WHERE task_id = ${task_id}`)
//     .then((res: any) => {
//       console.log("delete by id,", res.rows);
//       return res;
//     })
//     .catch((err: any) => {
//       console.log("error/", err);
//       return err;
//     });
// };

module.exports = {
  getFeedbackByID
  // createTask,
  // updateTask,
  // deleteTaskById
};
