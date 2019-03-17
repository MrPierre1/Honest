import express from "express";
import bodyParser from "body-parser";
// import jwt from "jsonwebtoken";
// import exjwt from "express-jwt";
// import { managerController } from './controllers/user.controller.1';
const secret = process.env.SECRET;
var cors = require("cors");

import {
  userController,
  taskController,
  eventController,
  usertaskController,
  managerController
} from "./controllers";

// const jwtMW = exjwt({
//   secret
// });

const app: express.Application = express();
app.use(express.static("uploads"));

const port: number = process.env.PORT || 3000;

app.use(cors());

app.get("/", (req, res) => {
  res.send(`I'm in the app`);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/user", userController);
app.use("/task", taskController);
app.use("/usertask", usertaskController);
app.use("/event", eventController);
app.use("/manager", managerController);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});
