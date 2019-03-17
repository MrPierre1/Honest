"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var multer = require("multer");
// const dbHelper = require("./controllerHelpers/userQueries");
// import dbHelper from "./controllerHelpers/managerQueries";
var managerQueries_1 = __importDefault(require("../services/managerQueries"));
// const authHelper = require("./auth");
var fs = require("fs");
var helpers = require("./helpers");
var router = express_1.Router();
var nodeMailer = require("nodemailer");
var UPLOAD_PATH = "uploads/";
var upload = multer({ dest: "" + UPLOAD_PATH });
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var exjwt = require("express-jwt");
var secret = process.env.SECRET || "thesecretkey";
var jwtMW = exjwt({
    secret: secret
});
router.post("/", function (request, response) { return __awaiter(_this, void 0, void 0, function () {
    var _a, manager_id, direct_reports, createDirectReport, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = request.body, manager_id = _a.manager_id, direct_reports = _a.direct_reports;
                console.log("calling manager router, ", manager_id, direct_reports);
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, managerQueries_1.default.createReports(manager_id, direct_reports)];
            case 2:
                createDirectReport = _b.sent();
                console.log("youser logingdata", createDirectReport.rows[0]);
                if (createDirectReport.rows[0].manager_id) {
                    console.log("I saw the managerID");
                    // var transporter = nodeMailer.createTransport({
                    //   service: "gmail",
                    //   host: "smtp.gmail.com",
                    //   port: 465,
                    //   secure: true,
                    //   auth: {
                    //     user: process.env.USER,
                    //     pass: process.env.PASSWORD
                    //   }
                    // });
                    // var mailOptions = {
                    //   from: "youremail@gmail.com",
                    //   to: "myfriend@yahoo.com",
                    //   subject: "Sending Email using Node.js",
                    //   text: "That was easy!"
                    // };
                    // transporter.sendMail(mailOptions, function(error, info) {
                    //   if (error) {
                    //     console.log(error);
                    //   } else {
                    //     console.log("Email sent: " + info.response);
                    //   }
                    // });
                }
                return [2 /*return*/, response.status(201).json(createDirectReport)];
            case 3:
                error_1 = _b.sent();
                console.log(error_1);
                return [2 /*return*/, response.status(403).json({
                        message: " failed",
                        error: error_1
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); });
// router.get("/", async (req: Request, res: Response) => {
//   res.status(201).send("re now in the user controller!");
// });
// router.get("/all", async (req: Request, res: Response) => {
//   const allUsers: UserData = await dbHelper.getAllUsers();
//   res.status(201).json(allUsers);
// });
// router.get(
//   "/email/:email",
//   async (request: Request, response: Response) => {
//     try {
//       const { email } = request.params;
//       const oneUserData = await dbHelper.getUserByEmail(email);
//       console.log("oneuser data email", response);
//       // const dbData = Object.assign({}, oneUserData[0]);
//       return response.status(200).json(oneUserData);
//     } catch (error) {
//       return response.status(401).json(error);
//     }
//   }
// );
// //@login
// router.get(
//   "/:id",
//   async (request: UserParamsRequest, response: Response) => {
//     try {
//       const { id } = request.params;
//       const oneUserData: UserData = await dbHelper.getUserById(id);
//       console.log("oneuser data", response);
//       // const dbData = Object.assign({}, oneUserData[0]);
//       return response.status(200).json(oneUserData);
//     } catch (error) {
//       return response.status(401).json(error);
//     }
//   }
// );
// router.put("/", jwtMW, async (request: UserDataRequest, response: Response) => {
//   try {
//     const { name, email, photo } = request.body;
//     const userLogInData = await dbHelper.getUserByEmail(request.user.email);
//     const { id } = userLogInData;
//     const oneUserData = await dbHelper.updateUser(id, name, email, photo);
//     // const dbData = Object.assign({}, oneUserData);
//     response.status(200).json(oneUserData);
//   } catch (error) {
//     response.status(200).json(error);
//   }
// });
// router.post(
//   "/signup",
//   upload.single("file"),
//   async (request: UserDataRequest, response: Response) => {
//     const { name, email, password } = request.body;
//     if (!helpers.checkValues(name, email, password)) {
//       return response
//         .status(401)
//         .json({ message: "please json over username, email and password" });
//     }
//     const oneUserData = await dbHelper.getUserByEmail(email);
//     const dbData = Object.assign({}, oneUserData);
//     const dbEmail = dbData.email;
//     if (email === dbEmail) {
//       return response.status(401).json(email);
//     }
//     if (!request.file) {
//       console.log("No file received");
//       return response
//         .status(402)
//         .json({ message: `Please attach a file to the call` });
//     } else {
//       console.log("file received", request.file);
//       const imagePath = request.file.path;
//       const targetPath = UPLOAD_PATH;
//       const originalImageName = request.file.originalname;
//       var imageUploaded = helpers.imageUpload(
//         imagePath,
//         targetPath,
//         originalImageName,
//         email
//       );
//     }
//     try {
//       // const photo = UPLOAD_PATH + email + "/" + request.file.originalname;
//       const user = await dbHelper.createUser(
//         name,
//         email,
//         password,
//         request.file.filename
//       );
//       console.log("user was added", user);
//       return response.status(201).json(`${user}`);
//     } catch (error) {
//       return response
//         .status(401)
//         .json({ err: error, message: "please provide a valid userID" });
//     }
//   }
// );
// router.post("/login", async (request: UserDataRequest, response: Response) => {
//   const { email, password } = request.body;
//   const isValidEmail = (email: string) => {
//     return /\S+@\S+\.\S+/.test(email);
//   };
//   //if user info is not passed in return
//   if (!email || !password) {
//     return response
//       .status(401)
//       .json("please json over username, email and password");
//   }
//   if (!isValidEmail(email)) {
//     return response.status(401).json({ message: "email is not valid" });
//   }
//   try {
//     const userLogin = await dbHelper.loginUser(email, password);
//     const userLogInData = await dbHelper.getUserByEmail(email);
//     console.log("youser logingdata", userLogin, Object.keys(userLogin).length);
//     if (Object.keys(userLogin).length < 5) {
//       return response.status(401).json({
//         message: "Authentication failed"
//       });
//     }
//     var returnedData = { token: userLogin, userData: userLogInData };
//     return response.status(201).json(returnedData);
//   } catch (error) {
//     console.log(error);
//     return response.status(403).json({
//       message: "Authentication failed",
//       error: error
//     });
//   }
// });
// //@login implement login decorator
// router.put(
//   "/passwordUpdate",
//   jwtMW,
//   async (request: UserDataRequest, response: Response) => {
//     const { token, id, oldPassword, newPassword1, newPassword2 } = request.body;
//     if (!token) {
//       response.status(401).json({ message: "please json over a token" });
//       return;
//     }
//     if (newPassword1 !== newPassword2) {
//       response.status(401).json("The passwords must match, please try again");
//       return;
//     }
//     try {
//       const oneUserData = await dbHelper.getUserById(id);
//       const hashedPasswordFromDB = oneUserData[0].password;
//       const match = await bcrypt.compare(oldPassword, hashedPasswordFromDB);
//       if (match) {
//         const updatePasswordResult = await dbHelper.passwordUpdate(
//           id,
//           newPassword1
//         );
//         response.status(201).json("your password has been updated");
//       }
//     } catch (error) {
//       response.status(401).json(error);
//     }
//   }
// );
// router.delete("/", jwtMW, async (request: Request, response: Response) => {
//   console.log(request.user);
//   try {
//     const userLogInData = await dbHelper.deleteUserByEmail(request.user.email);
//     response.status(200).json(userLogInData);
//   } catch (error) {
//     response.status(401).json({
//       message: "A valid token is required for this request",
//       error: error
//     });
//   }
// });
exports.managerController = router;
