const pool = require("./../db");

const results = (queryResult: any) => {
  return queryResult.rows.length < 1
    ? "Your query did not produce any valid results"
    : queryResult.rows[0];
};

const getAllTasks = async () => {
  try {
    const res = await pool.query(`SELECT * FROM tasks`);
    console.log("res", res);
    return res.rows;
  } catch (error) {
    return error;
  }
};
const getTaskById = async (task_id: number) => {
  try {
    const res = await pool.query(
      `SELECT * FROM tasks WHERE task_id = ${task_id}`
    );
    console.log("res", res);
    return results(res);
  } catch (error) {
    return error;
  }
};

const createTask = async (task_title: string, task: string, date: number) => {
  try {
    const res = await pool.query(
      "INSERT INTO tasks (task_title, task, date) VALUES ($1, $2, $3) returning task_id  task_title",
      [task_title, task, date]
    );

    return results(res);
  } catch (error) {
    return error;
  }
};

const updateTask = async (
  task_id: number,
  task_title: string,
  task: string,
  date: number
) => {
  console.log("task data11", task_id, task_title);
  const d = new Date();
  try {
    const res = await pool.query(
      "UPDATE tasks SET task_title = $1, task = $2, date = $3, modified_date = NOW() WHERE task_id = $4 returning task_title, task_id",
      [task_title, task, d.toLocaleString(), task_id]
    );
    return results(res);
  } catch (error) {
    console.log("there are errors", error);
    return error;
  }
};

const deleteTaskById = async (task_id: number) => {
  console.log("task data11", task_id);
  try {
    console.log("inside the try");
    const res = await pool.query(`DELETE FROM tasks WHERE task_id =${task_id}`);
    console.log("done createing res", res);
    return results(res);
  } catch (error) {
    console.log("found the error its, here", error);
    return console.log("error for the delete", error);
  }
};

module.exports = {
  getTaskById,
  getAllTasks,
  createTask,
  updateTask,
  deleteTaskById
};
