var express = require("express");
var bodyParser = require("body-parser");
// var jwt = ("jsonwebtoken";
// var exjwt = ("express-jwt";
// var { managerController } = ('./controllers/user.controller';
const secret = process.env.SECRET;
var cors = require("cors");

// var {
//   userController,
//   // taskController,
//   // eventController,
//   // usertaskController,
//   // managerController
// } = require("./controllers/user.controller");

// const jwtMW = exjwt({
//   secret
// });

var userController = require('./controllers/user.controller')

// .
const app = express();

app.use('/user', userController)


app.use(express.static("uploads"));

const port = process.env.PORT || 3000;

app.use(cors());

app.get("/", (req, res) => {
  res.send(`I'm in the app`);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/user", userController);
// app.use("/task", taskController);
// app.use("/usertask", usertaskController);
// app.use("/event", eventController);
// app.use("/manager", managerController);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});
