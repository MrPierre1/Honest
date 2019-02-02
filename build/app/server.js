"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var controllers_1 = require("./controllers");
// const db = require("./queries");
//
var app = express_1.default();
var port = 3001;
app.get("/", function (req, res) {
    res.send("Hi");
});
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use("/user", controllers_1.userController);
app.listen(port, function () {
    console.log("Listening at http://localhost:" + port + "/");
});
