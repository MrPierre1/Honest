import express from "express";
import bodyParser from "body-parser";

import { userController } from "./controllers";
// const db = require("./queries");
//
const app: express.Application = express();
const port: number = 3001;

app.get("/", (req, res) => {
  res.send("Hi");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/user", userController);
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});
