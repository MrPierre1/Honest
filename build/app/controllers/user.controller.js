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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var multer = require("multer");
// const pool = require("../db");
var dbHelper = require("../queries");
var authHelper = require("./auth");
var router = express_1.Router();
var UPLOAD_PATH = "../uploads";
var upload = multer({ dest: UPLOAD_PATH + "/" }); // multer configuration
router.get("/", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.send("Hello, You're now in the user controller!");
        return [2 /*return*/];
    });
}); });
router.get("/:id", function (request, response) { return __awaiter(_this, void 0, void 0, function () {
    var id, oneUserData, dbData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = request.params.id;
                return [4 /*yield*/, dbHelper.getUserById(id)];
            case 1:
                oneUserData = _a.sent();
                dbData = Object.assign({}, oneUserData[0]);
                response.status(200).send(dbData);
                return [2 /*return*/];
        }
    });
}); });
router.put("/", function (request, response) { return __awaiter(_this, void 0, void 0, function () {
    var _a, id, name, email, password, photo, oneUserData, dbData;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = request.body, id = _a.id, name = _a.name, email = _a.email, password = _a.password, photo = _a.photo;
                return [4 /*yield*/, dbHelper.updateUser(id, name, email, password, photo)];
            case 1:
                oneUserData = _b.sent();
                dbData = Object.assign({}, oneUserData[0]);
                response.status(200).send("User modified:" + Object.entries(dbData));
                return [2 /*return*/];
        }
    });
}); });
router.post("/", upload.single("photo"), function (request, response) { return __awaiter(_this, void 0, void 0, function () {
    var _a, name, email, password, photo, oneUserData, dbData, dbEmail, user, addedUserData;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = request.body, name = _a.name, email = _a.email, password = _a.password, photo = _a.photo;
                //if user info is not passed in return
                if (!name || !email || !password) {
                    response
                        .status(401)
                        .send("please send over username, email and password");
                    return [2 /*return*/];
                }
                return [4 /*yield*/, dbHelper.getUserByEmail(email)];
            case 1:
                oneUserData = _b.sent();
                dbData = Object.assign({}, oneUserData[0]);
                dbEmail = dbData.email;
                if (!(email === dbEmail)) return [3 /*break*/, 2];
                response
                    .status(401)
                    .send("A user with the email: " + email + " already exist in our system");
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, dbHelper.createUser(name, email, password, photo)];
            case 3:
                user = _b.sent();
                addedUserData = Object.assign({}, user[0]);
                response
                    .status(201)
                    .send("The user was added " + Object.entries(addedUserData));
                _b.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); });
router.post("/login", function (request, response) { return __awaiter(_this, void 0, void 0, function () {
    var _a, email, password, isValidEmail, userLogin, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = request.body, email = _a.email, password = _a.password;
                isValidEmail = function (email) {
                    return /\S+@\S+\.\S+/.test(email);
                };
                //if user info is not passed in return
                if (!email || !password) {
                    response.status(401).send("please send over username, email and password");
                    return [2 /*return*/];
                }
                if (!isValidEmail(email)) {
                    return [2 /*return*/];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, dbHelper.loginUser(email, password)];
            case 2:
                userLogin = _b.sent();
                //  return userLogin;
                console.log("userlogin11", userLogin);
                // if(userLogin){
                //   authHelper
                // }
                return [2 /*return*/, response.status(201).send("The is signed in " + userLogin)];
            case 3:
                error_1 = _b.sent();
                return [2 /*return*/, response.status(401).json({
                        message: "Authentication failed"
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.delete("/:id", function (request, response) { return __awaiter(_this, void 0, void 0, function () {
    var id, deletedResponse;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = request.params.id;
                return [4 /*yield*/, dbHelper.deleteUserById(id)];
            case 1:
                deletedResponse = _a.sent();
                console.log("deletedresponse", deletedResponse);
                response.status(200).send("The user with id " + id + " was deleted ");
                return [2 /*return*/];
        }
    });
}); });
exports.userController = router;
