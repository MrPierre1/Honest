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
var pool = require("./../db");
var bcrypt = require("bcrypt");
var salt = bcrypt.genSaltSync(10);
// import { UserData } from '../user.controller';
var jwt = require("jsonwebtoken");
var secret = process.env.SECRET;
var results = function (queryResult) {
    return queryResult.rows.length < 1
        ? Error("Your query did not produce any valid results")
        : queryResult.rows[0];
};
var getUserById = function (user_id) { return __awaiter(_this, void 0, void 0, function () {
    var res, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, pool.query("SELECT * FROM users WHERE user_id = " + user_id)];
            case 1:
                res = _a.sent();
                console.log("res", res);
                return [2 /*return*/, results(res)];
            case 2:
                error_1 = _a.sent();
                return [2 /*return*/, error_1];
            case 3: return [2 /*return*/];
        }
    });
}); };
var getAllUsers = function () { return __awaiter(_this, void 0, void 0, function () {
    var getAll, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, pool.query("SELECT * FROM users LIMIT 5")];
            case 1:
                getAll = _a.sent();
                return [2 /*return*/, getAll.rows.length < 1 ? null : getAll.rows];
            case 2:
                error_2 = _a.sent();
                return [2 /*return*/, error_2];
            case 3: return [2 /*return*/];
        }
    });
}); };
var getUserByEmail = function (email) { return __awaiter(_this, void 0, void 0, function () {
    var res, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, pool.query("SELECT * FROM users WHERE email like '%" + email + "'")];
            case 1:
                res = _a.sent();
                return [2 /*return*/, results(res)];
            case 2:
                error_3 = _a.sent();
                return [2 /*return*/, error_3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var createUser = function (name, email, password, photo, manager) { return __awaiter(_this, void 0, void 0, function () {
    var hashPass, user, token, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, bcrypt.hash(password, salt)];
            case 1:
                hashPass = _a.sent();
                return [4 /*yield*/, pool.query("INSERT INTO users (name, email, password, photo, manager) VALUES ($1, $2, $3, $4, $5) returning user_id, name, email", [name, email, hashPass, photo, manager])];
            case 2:
                user = _a.sent();
                return [4 /*yield*/, jwt.sign({ name: name, email: email, password: password, photo: photo, manager: manager }, secret, {
                        expiresIn: 129600
                    })];
            case 3:
                token = _a.sent();
                return [2 /*return*/, { userdata: user.rows, token: token }];
            case 4:
                error_4 = _a.sent();
                return [2 /*return*/, error_4];
            case 5: return [2 /*return*/];
        }
    });
}); };
var loginUser = function (email, password) { return __awaiter(_this, void 0, void 0, function () {
    var userInfo, hashedPassword, match, token, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                return [4 /*yield*/, getUserByEmail(email)];
            case 1:
                userInfo = _a.sent();
                hashedPassword = userInfo.password;
                return [4 /*yield*/, bcrypt.compare(password, hashedPassword)];
            case 2:
                match = _a.sent();
                if (!match) return [3 /*break*/, 4];
                return [4 /*yield*/, jwt.sign({ email: email, password: password }, secret, {
                        expiresIn: 129600
                    })];
            case 3:
                token = _a.sent();
                return [2 /*return*/, token];
            case 4: return [3 /*break*/, 6];
            case 5:
                error_5 = _a.sent();
                return [2 /*return*/, error_5];
            case 6: return [2 /*return*/];
        }
    });
}); };
var createReports = function (manager_id, directReports) { return __awaiter(_this, void 0, void 0, function () {
    var error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, pool.query("INSERT INTO manage_direct_reports (manager_id, directReports) VALUES ($1, $2) returning manager_id", [manager_id, directReports])];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                error_6 = _a.sent();
                return [2 /*return*/, error_6];
            case 3: return [2 /*return*/];
        }
    });
}); };
var updateUser = function (user_id, name, email, photo) { return __awaiter(_this, void 0, void 0, function () {
    var res, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, pool.query("UPDATE users SET name = $1, email = $2, photo = $3 WHERE user_id = $4 returning name, email, photo", [name, email, photo, user_id])];
            case 1:
                res = _a.sent();
                return [2 /*return*/, results(res)];
            case 2:
                error_7 = _a.sent();
                return [2 /*return*/, error_7];
            case 3: return [2 /*return*/];
        }
    });
}); };
var passwordUpdate = function (user_id, newPassword1) { return __awaiter(_this, void 0, void 0, function () {
    var passReset;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, bcrypt.hash(newPassword1, salt)];
            case 1:
                passReset = _a.sent();
                return [2 /*return*/, passReset];
        }
    });
}); };
var deleteUserById = function (user_id) { return __awaiter(_this, void 0, void 0, function () {
    var res, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, pool.query("DELETE FROM users WHERE user_id = " + user_id)];
            case 1:
                res = _a.sent();
                return [2 /*return*/, results(res)];
            case 2:
                error_8 = _a.sent();
                return [2 /*return*/, error_8];
            case 3: return [2 /*return*/];
        }
    });
}); };
var deleteUserByEmail = function (email) { return __awaiter(_this, void 0, void 0, function () {
    var res, error_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, pool.query("DELETE FROM users WHERE email like '%" + email + "'")];
            case 1:
                res = _a.sent();
                console.log("iser is deleted", res);
                return [2 /*return*/, res.rowCount < 1 ? "user not deleted" : "user deleted"];
            case 2:
                error_9 = _a.sent();
                console.log("err", error_9);
                return [2 /*return*/, error_9];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.default = {
    getUserById: getUserById,
    getAllUsers: getAllUsers,
    getUserByEmail: getUserByEmail,
    loginUser: loginUser,
    createUser: createUser,
    updateUser: updateUser,
    deleteUserById: deleteUserById,
    deleteUserByEmail: deleteUserByEmail,
    passwordUpdate: passwordUpdate,
    createReports: createReports
};
