"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
// import jwt from "jsonwebtoken";
// import exjwt from "express-jwt";
var secret = process.env.SECRET;
var cors = require("cors");
var controllers_1 = require("./controllers");
// const jwtMW = exjwt({
//   secret
// });
var app = express_1.default();
app.use(express_1.default.static("uploads"));
var port = process.env.PORT || 3000;
app.use(cors());
app.get("/", function (req, res) {
    res.send("I'm in the app");
});
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use("/user", controllers_1.userController);
app.use("/task", controllers_1.taskController);
app.use("/usertask", controllers_1.usertaskController);
app.use("/feedback", controllers_1.feedbackController);
app.use("/event", controllers_1.eventController);
app.listen(port, function () {
    console.log("Listening at http://localhost:" + port + "/");
});
