import { Router, Request, Response } from "express";
const dbHelper = require("./taskQueries");
const router: Router = Router();

interface TaskData {
  task_id: number;
  task_title: string;
  task: string;
  date: number;
}

router.get("/", async (req: Request, res: Response) => {
  res.send(`Hello, You're now in the task controller!`);
});

router.get("/all", async (req: Request, res: Response) => {
  const allTaskData = await dbHelper.getAllTasks();
  console.log("all task data", allTaskData);
  res.status(200).send(allTaskData);
});

router.get("/:task_id", async (request: Request, response: Response) => {
  const { task_id } = request.params;
  const onetaskData = await dbHelper.getTaskById(task_id);
  response.status(200).send(onetaskData);
});

router.post("/", async (request: Request, response: Response) => {
  const { task_title, task, date } = request.body;
  console.log(
    "task data in the server, ",
    task_title,
    task,
    date,
    request.body
  );
  const createdTask = await dbHelper.createTask(task_title, task, date);
  console.log(createdTask, "YES it's studdff", Object.entries(createdTask));
  if (createdTask.name === "error") {
    response.status(501).send(createdTask.name);
  }
  response.status(201).send(createdTask);
});

router.put("/", async (request: Request, response: Response) => {
  const { task_id, task_title, task, date } = request.body;
  const onetaskData = await dbHelper.updateTask(
    task_id,
    task_title,
    task,
    date
  );
  response.status(200).json(onetaskData);
});

router.delete("/:task_id", async (request: Request, response: Response) => {
  const { task_id } = request.params;
  console.log("id of task", task_id);
  const deletedResponse = await dbHelper.deleteTaskById(task_id);
  // console.log("deletedresponse", deletedResponse);
  response.status(200).send(deletedResponse);
});

export const taskController: Router = router;
