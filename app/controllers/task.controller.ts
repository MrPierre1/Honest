import { Router, Request, Response } from "express";
const dbHelper = require("./controllerHelpers/taskQueries");
const router: Router = Router();

interface TaskData {
  email: string;
  task_id: number;
  type: string;
  taskTitle: string;
  task: string;
  assignedTo: number;
  createdBy: number;
  due_date: number;
  due_time: number;
}

router.get("/", async (req: Request, res: Response) => {
  res.send(`Hello, You're now in the task controller!`);
});

router.get("/:task_id", async (request: Request, response: Response) => {
  const { task_id }: taskData = request.params;
  const onetaskData = await dbHelper.getTaskByID(task_id);
  const dbData = Object.assign({}, onetaskData[0]);
  response.status(200).send(dbData);
});

router.post("/create", async (request: Request, response: Response) => {
  const {
    type,
    taskTitle,
    task,
    assignedTo,
    createdBy,
    due_date,
    due_time
  }: TaskData = request.body;
  // console.log("taskdata", request.body);

  if (!type || !taskTitle || !task || !assignedTo) {
    response.status(401)
      .send(`please send over an object with these properties {
        type,
        taskTitle,
        task,
        assignedTo
      } `);
    return;
  }

  // console.log("data for tasks", request.body);
  const createdTask = await dbHelper.createTask(
    type,
    taskTitle,
    task,
    assignedTo,
    createdBy,
    due_date,
    due_time
  );
  console.log("createdTAsk", createdTask);
  const addedUserData = Object.assign({}, createdTask[0]);
  response
    .status(201)
    .send(`The task was added ${Object.entries(addedUserData)}`);
});

router.put("/update", async (request: Request, response: Response) => {
  const { task_id, taskTitle }: TaskData = request.body;
  const onetaskData = await dbHelper.updateTask(task_id, taskTitle);
  const dbData = Object.assign({}, onetaskData[0]);
  response.status(200).send(`task modified:${Object.entries(dbData)}`);
});

router.delete("/:task_id", async (request: Request, response: Response) => {
  const { task_id }: taskData = request.params;
  console.log("id of task", task_id);
  const deletedResponse = await dbHelper.deleteTaskById(task_id);
  // console.log("deletedresponse", deletedResponse);
  response.status(200).send(`The task with id ${task_id} was deleted `);
});

export const taskController: Router = router;
