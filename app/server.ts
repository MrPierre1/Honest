import express from "express";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import exjwt from "express-jwt";
const secret = process.env.SECRET;

import {
  userController,
  taskController,
  feedbackController,
  eventController
} from "./controllers";

const jwtMW = exjwt({
  secret
});

const app: express.Application = express();
app.use(express.static("uploads"));

const port: number = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send(`I'm in the app`);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/user", userController);
app.use("/task", taskController);
app.use("/feedback", feedbackController);
app.use("/event", eventController);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});
