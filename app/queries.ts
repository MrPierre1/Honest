// const pool = require("./db");
// const bcrypt = require("bcrypt");
// const salt = bcrypt.genSaltSync(10);
// const authHelper = require("./controllers/auth");

// //users

// const getUserById = function(id: number) {
//   return pool
//     .query(`SELECT * FROM users WHERE id = ${id}`)
//     .then((res: any) => {
//       return res.rows;
//     })
//     .catch((err: any) => {
//       return err;
//     });
// };

// const getAllUsers = function(id: number) {
//   return pool
//     .query(`SELECT * FROM users`)
//     .then((res: any) => {
//       console.log("rest", res);
//       return res.rows;
//     })
//     .catch((err: any) => {
//       return err;
//     });
// };

// const getUserByEmail = function(email: string) {
//   const emailString: string = email;

//   return pool
//     .query(`SELECT * FROM users WHERE email like '%${emailString}'`)
//     .then((res: any) => {
//       return res.rows;
//     })
//     .catch((err: any) => {
//       return err;
//     });
// };

// const createUser = (
//   name: string,
//   email: string,
//   password: string,
//   photo: string
// ) => {
//   return bcrypt
//     .hash(password, salt)
//     .then(function(hash) {
//       return pool.query(
//         "INSERT INTO users (name, email, password, photo) VALUES ($1, $2, $3, $4) returning name, email, photo",
//         [name, email, hash, photo]
//       );
//     })
//     .then(function(res: any) {
//       return res.rows;
//     })
//     .catch((error: any) => {
//       throw error;
//     });
// };

// const loginUser = async (email: string, password: string) => {
//   const userInfo = await getUserByEmail(email);
//   var hashedPassword = userInfo[0].password;

//   const match = await bcrypt.compare(password, hashedPassword);

//   if (match) {
//     const token = await authHelper.encode(userInfo[0]);
//     return token;
//   } else {
//     return match;
//   }
// };

// const updateUser = (
//   id: string,
//   name: string,
//   email: string,
//   password: string,
//   photo: string,
//   token: string
// ) => {
//   console.log("user data11", id, name, email, password, photo);
//   return pool
//     .query(
//       "UPDATE users SET name = $1, email = $2, password = $3, photo = $4 WHERE id = $5 returning name, email, photo",
//       [name, email, password, photo, id]
//     )
//     .then((res: any) => {
//       return res.rows;
//     })
//     .catch((err: any) => {
//       return err;
//     });
// };

// const deleteUserById = (id: number) => {
//   console.log("id is here from queries", id);
//   return pool
//     .query(`DELETE FROM users WHERE id = ${id}`)
//     .then((res: any) => {
//       console.log("delete by id,", res.rows);
//       return res;
//     })
//     .catch((err: any) => {
//       console.log("error/", err);
//       return err;
//     });
// };
// //tasks

// const getTaskByID = function(task_id: number) {
//   return pool
//     .query(`SELECT * FROM tasks WHERE task_id = ${task_id}`)
//     .then((res: any) => {
//       return res.rows;
//     })
//     .catch((err: any) => {
//       return err;
//     });
// };

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

// module.exports = {
//   //   users
//   getUserById,
//   getAllUsers,
//   getUserByEmail,
//   loginUser,
//   createUser,
//   updateUser,
//   deleteUserById,
//   //tasks
//   getTaskByID,
//   createTask,
//   updateTask,
//   deleteTaskById
// };
