import { Router, Request, Response } from "express";
const dbHelper = require("./usertaskQueries");
const router: Router = Router();

interface UserTaskData {
  task_id: number;
  user_id: number;
}

router.get("/", async (req: Request, res: Response) => {
  res.send(`Hello, You're now in the usertask controller!`);
});

router.get("/task/:task_id", async (request: Request, response: Response) => {
  const { task_id } = request.params;
  const onetaskData = await dbHelper.getUserTaskByTaskId(task_id);
  response.status(200).send(onetaskData);
});

router.get("/user/:user_id", async (request: Request, response: Response) => {
  const { user_id } = request.params;
  const onetaskData = await dbHelper.getUserTaskByUserId(user_id);
  response.status(200).send(onetaskData);
});

router.post("/", async (request: Request, response: Response) => {
  const { task_id, user_id } = request.body;
  console.log("user task data, ", task_id, user_id);
  const createdAssociation = await dbHelper.associateUserWithTask(
    task_id,
    user_id
  );
  response.status(201).send(createdAssociation);
});

// router.put("/", async (request: Request, response: Response) => {
//   const { task_id, task_title, task, date } = request.body;
//   const onetaskData = await dbHelper.updateTask(
//     task_id,
//     task_title,
//     task,
//     date
//   );
//   response.status(200).json(onetaskData);
// });

// router.delete("/:task_id", async (request: Request, response: Response) => {
//   const { task_id } = request.params;
//   console.log("id of task", task_id);
//   const deletedResponse = await dbHelper.deleteTaskById(task_id);
//   // console.log("deletedresponse", deletedResponse);
//   response.status(200).send(deletedResponse);
// });

export const usertaskController: Router = router;
