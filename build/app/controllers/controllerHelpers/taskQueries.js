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
var pool = require("./../../db");
var results = function (queryResult) {
    return queryResult.rows.length < 1
        ? "Your query did not produce any valid results"
        : queryResult.rows[0];
};
var getAllTasks = function () { return __awaiter(_this, void 0, void 0, function () {
    var res, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, pool.query("SELECT * FROM tasks")];
            case 1:
                res = _a.sent();
                console.log("res", res);
                return [2 /*return*/, res.rows];
            case 2:
                error_1 = _a.sent();
                return [2 /*return*/, error_1];
            case 3: return [2 /*return*/];
        }
    });
}); };
var getTaskById = function (task_id) { return __awaiter(_this, void 0, void 0, function () {
    var res, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, pool.query("SELECT * FROM tasks WHERE task_id = " + task_id)];
            case 1:
                res = _a.sent();
                console.log("res", res);
                return [2 /*return*/, results(res)];
            case 2:
                error_2 = _a.sent();
                return [2 /*return*/, error_2];
            case 3: return [2 /*return*/];
        }
    });
}); };
var createTask = function (task_title, task, date) { return __awaiter(_this, void 0, void 0, function () {
    var res, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, pool.query("INSERT INTO tasks (task_title, task, date) VALUES ($1, $2, $3) returning task_id  task_title, task", [task_title, task, date])];
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
var updateTask = function (task_id, task_title, task, date) { return __awaiter(_this, void 0, void 0, function () {
    var d, res, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("task data11", task_id, task_title);
                d = new Date();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, pool.query("UPDATE tasks SET task_title = $1, task = $2, date = $3, modified_date = NOW() WHERE task_id = $4 returning task_title, task_id", [task_title, task, d.toLocaleString(), task_id])];
            case 2:
                res = _a.sent();
                return [2 /*return*/, results(res)];
            case 3:
                error_4 = _a.sent();
                console.log("there are errors", error_4);
                return [2 /*return*/, error_4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var deleteTaskById = function (task_id) { return __awaiter(_this, void 0, void 0, function () {
    var res, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("task data11", task_id);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                console.log("inside the try");
                return [4 /*yield*/, pool.query("DELETE FROM tasks WHERE task_id =" + task_id)];
            case 2:
                res = _a.sent();
                console.log("done createing res", res);
                return [2 /*return*/, results(res)];
            case 3:
                error_5 = _a.sent();
                console.log("found the error its, here", error_5);
                return [2 /*return*/, console.log("error for the delete", error_5)];
            case 4: return [2 /*return*/];
        }
    });
}); };
module.exports = {
    getTaskById: getTaskById,
    getAllTasks: getAllTasks,
    createTask: createTask,
    updateTask: updateTask,
    deleteTaskById: deleteTaskById
};
