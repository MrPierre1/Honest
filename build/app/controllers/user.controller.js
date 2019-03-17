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
var userQueries_1 = __importDefault(require("./../services/userQueries"));
var fs = require("fs");
var requestCall = require("request");
var helpers = require("./helpers");
var router = express_1.Router();
var UPLOAD_PATH = "uploads/";
var upload = multer({ dest: "" + UPLOAD_PATH });
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var exjwt = require("express-jwt");
var secret = process.env.SECRET || "thesecretkey";
var jwtMW = exjwt({
    secret: secret
});
router.get("/", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.status(201).send("re now in the user controller!");
        return [2 /*return*/];
    });
}); });
router.get("/all", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var allUsers;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, userQueries_1.default.getAllUsers()];
            case 1:
                allUsers = _a.sent();
                res.status(201).json(allUsers);
                return [2 /*return*/];
        }
    });
}); });
router.get("/email/:email", function (request, response) { return __awaiter(_this, void 0, void 0, function () {
    var email, oneUserData, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                email = request.params.email;
                return [4 /*yield*/, userQueries_1.default.getUserByEmail(email)];
            case 1:
                oneUserData = _a.sent();
                console.log("oneuser data email", response);
                // const dbData = Object.assign({}, oneUserData[0]);
                return [2 /*return*/, response.status(200).json(oneUserData)];
            case 2:
                error_1 = _a.sent();
                return [2 /*return*/, response.status(401).json(error_1)];
            case 3: return [2 /*return*/];
        }
    });
}); });
//@login
router.get("/:id", function (request, response) { return __awaiter(_this, void 0, void 0, function () {
    var id, oneUserData, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = request.params.id;
                return [4 /*yield*/, userQueries_1.default.getUserById(id)];
            case 1:
                oneUserData = _a.sent();
                console.log("oneuser data", response);
                // const dbData = Object.assign({}, oneUserData[0]);
                return [2 /*return*/, response.status(200).json(oneUserData)];
            case 2:
                error_2 = _a.sent();
                return [2 /*return*/, response.status(401).json(error_2)];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.put("/", jwtMW, function (request, response) { return __awaiter(_this, void 0, void 0, function () {
    var _a, name_1, email, photo, userLogInData, id, oneUserData, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = request.body, name_1 = _a.name, email = _a.email, photo = _a.photo;
                return [4 /*yield*/, userQueries_1.default.getUserByEmail(request.user.email)];
            case 1:
                userLogInData = _b.sent();
                id = userLogInData.id;
                return [4 /*yield*/, userQueries_1.default.updateUser(id, name_1, email, photo)];
            case 2:
                oneUserData = _b.sent();
                // const dbData = Object.assign({}, oneUserData);
                response.status(200).json(oneUserData);
                return [3 /*break*/, 4];
            case 3:
                error_3 = _b.sent();
                response.status(200).json(error_3);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.post("/signup", upload.single("file"), function (request, response) { return __awaiter(_this, void 0, void 0, function () {
    var _a, name, email, password, oneUserData, dbData, dbEmail, imagePath, targetPath, originalImageName, imageUploaded, user, req, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                console.log("redbod", request.body);
                _a = request.body, name = _a.name, email = _a.email, password = _a.password;
                // if (!helpers.checkValues(name, email, password)) {
                if (!name || !email || !password) {
                    return [2 /*return*/, response
                            .status(401)
                            .json({ message: "please send over name, email and password" })];
                }
                return [4 /*yield*/, userQueries_1.default.getUserByEmail(email)];
            case 1:
                oneUserData = _b.sent();
                dbData = Object.assign({}, oneUserData);
                dbEmail = dbData.email;
                if (email === dbEmail) {
                    return [2 /*return*/, response.status(401).json(email)];
                }
                if (!request.file) {
                    console.log("No file received");
                    return [2 /*return*/, response
                            .status(402)
                            .json({ message: "Please attach a file to the call" })];
                }
                else {
                    console.log("file received", request.file);
                    imagePath = request.file.path;
                    targetPath = UPLOAD_PATH;
                    originalImageName = request.file.originalname;
                    imageUploaded = helpers.imageUpload(imagePath, targetPath, originalImageName, email);
                }
                _b.label = 2;
            case 2:
                _b.trys.push([2, 4, , 5]);
                return [4 /*yield*/, userQueries_1.default.createUser(name, email, password, request.file.filename)];
            case 3:
                user = _b.sent();
                console.log(user, "user was added", user.userdata[0]);
                if (user.userdata[0].user_id) {
                    req = requestCall.post("http://localhost:3000/manager/", {
                        json: {
                            manager_id: 1,
                            direct_reports: 90
                        }
                    });
                    console.log("redddddqqqq", req);
                }
                return [2 /*return*/, response.status(201).send({ user: user })];
            case 4:
                error_4 = _b.sent();
                return [2 /*return*/, response
                        .status(401)
                        .json({ err: error_4, message: "please provide a valid userID" })];
            case 5: return [2 /*return*/];
        }
    });
}); });
router.post("/create_reports", function (request, response) { return __awaiter(_this, void 0, void 0, function () {
    var _a, manager_id, direct_reports, user, returnedData, error_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = request.body, manager_id = _a.manager_id, direct_reports = _a.direct_reports;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, userQueries_1.default.createReports(manager_id, direct_reports)];
            case 2:
                user = _b.sent();
                // const userData = await dbHelper.getUserByEmail(email);
                console.log("youser logingdata", user, Object.keys(user).length);
                if (Object.keys(user).length < 5) {
                    return [2 /*return*/, response.status(401).json({
                            message: " failed"
                        })];
                }
                returnedData = { user: user };
                return [2 /*return*/, response.status(201).json(returnedData)];
            case 3:
                error_5 = _b.sent();
                console.log(error_5);
                return [2 /*return*/, response.status(403).json({
                        message: " failed",
                        error: error_5
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.post("/login", function (request, response) { return __awaiter(_this, void 0, void 0, function () {
    var _a, email, password, isValidEmail, userLogin, userLogInData, returnedData, error_6;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = request.body, email = _a.email, password = _a.password;
                isValidEmail = function (email) {
                    return /\S+@\S+\.\S+/.test(email);
                };
                //if user info is not passed in return
                if (!email || !password) {
                    return [2 /*return*/, response
                            .status(401)
                            .json("please json over username, email and password")];
                }
                if (!isValidEmail(email)) {
                    return [2 /*return*/, response.status(401).json({ message: "email is not valid" })];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, userQueries_1.default.loginUser(email, password)];
            case 2:
                userLogin = _b.sent();
                return [4 /*yield*/, userQueries_1.default.getUserByEmail(email)];
            case 3:
                userLogInData = _b.sent();
                console.log("youser logingdata", userLogin, Object.keys(userLogin).length);
                if (Object.keys(userLogin).length < 5) {
                    return [2 /*return*/, response.status(401).json({
                            message: "Authentication failed"
                        })];
                }
                returnedData = { token: userLogin, userData: userLogInData };
                return [2 /*return*/, response.status(201).json(returnedData)];
            case 4:
                error_6 = _b.sent();
                console.log(error_6);
                return [2 /*return*/, response.status(403).json({
                        message: "Authentication failed",
                        error: error_6
                    })];
            case 5: return [2 /*return*/];
        }
    });
}); });
//@login implement login decorator
router.put("/passwordUpdate", jwtMW, function (request, response) { return __awaiter(_this, void 0, void 0, function () {
    var _a, token, id, oldPassword, newPassword1, newPassword2, oneUserData, hashedPasswordFromDB, match, updatePasswordResult, error_7;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = request.body, token = _a.token, id = _a.id, oldPassword = _a.oldPassword, newPassword1 = _a.newPassword1, newPassword2 = _a.newPassword2;
                if (!token) {
                    response.status(401).json({ message: "please json over a token" });
                    return [2 /*return*/];
                }
                if (newPassword1 !== newPassword2) {
                    response.status(401).json("The passwords must match, please try again");
                    return [2 /*return*/];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, , 7]);
                return [4 /*yield*/, userQueries_1.default.getUserById(id)];
            case 2:
                oneUserData = _b.sent();
                hashedPasswordFromDB = oneUserData[0].password;
                return [4 /*yield*/, bcrypt.compare(oldPassword, hashedPasswordFromDB)];
            case 3:
                match = _b.sent();
                if (!match) return [3 /*break*/, 5];
                return [4 /*yield*/, userQueries_1.default.passwordUpdate(id, newPassword1)];
            case 4:
                updatePasswordResult = _b.sent();
                response.status(201).json("your password has been updated");
                _b.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                error_7 = _b.sent();
                response.status(401).json(error_7);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
router.delete("/", jwtMW, function (request, response) { return __awaiter(_this, void 0, void 0, function () {
    var userLogInData, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log(request.user);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, userQueries_1.default.deleteUserByEmail(request.user.email)];
            case 2:
                userLogInData = _a.sent();
                response.status(200).json(userLogInData);
                return [3 /*break*/, 4];
            case 3:
                error_8 = _a.sent();
                response.status(401).json({
                    message: "A valid token is required for this request",
                    error: error_8
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.userController = router;
