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
var bcrypt = require("bcrypt");
var salt = bcrypt.genSaltSync(10);
var authHelper = require("./../auth");
//users
var getUserById = function (id) {
    return pool
        .query("SELECT * FROM users WHERE id = " + id)
        .then(function (res) {
        return res.rows;
    })
        .catch(function (err) {
        return err;
    });
};
var getAllUsers = function (id) {
    return pool
        .query("SELECT * FROM users")
        .then(function (res) {
        console.log("rest", res);
        return res.rows;
    })
        .catch(function (err) {
        return err;
    });
};
var getUserByEmail = function (email) {
    var emailString = email;
    return pool
        .query("SELECT * FROM users WHERE email like '%" + emailString + "'")
        .then(function (res) {
        return res.rows;
    })
        .catch(function (err) {
        return err;
    });
};
var createUser = function (name, email, password, photo) {
    return bcrypt
        .hash(password, salt)
        .then(function (hash) {
        return pool.query("INSERT INTO users (name, email, password, photo) VALUES ($1, $2, $3, $4) returning name, email, photo", [name, email, hash, photo]);
    })
        .then(function (res) {
        return res.rows;
    })
        .catch(function (error) {
        throw error;
    });
};
var loginUser = function (email, password) { return __awaiter(_this, void 0, void 0, function () {
    var userInfo, hashedPassword, match, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getUserByEmail(email)];
            case 1:
                userInfo = _a.sent();
                hashedPassword = userInfo[0].password;
                return [4 /*yield*/, bcrypt.compare(password, hashedPassword)];
            case 2:
                match = _a.sent();
                if (!match) return [3 /*break*/, 4];
                return [4 /*yield*/, authHelper.encode(userInfo[0])];
            case 3:
                token = _a.sent();
                return [2 /*return*/, token];
            case 4: return [2 /*return*/, match];
        }
    });
}); };
var updateUser = function (id, name, email, password, photo, token) {
    console.log("user data11", id, name, email, password, photo);
    return pool
        .query("UPDATE users SET name = $1, email = $2, password = $3, photo = $4 WHERE id = $5 returning name, email, photo", [name, email, password, photo, id])
        .then(function (res) {
        return res.rows;
    })
        .catch(function (err) {
        return err;
    });
};
var deleteUserById = function (id) {
    console.log("id is here from queries", id);
    return pool
        .query("DELETE FROM users WHERE id = " + id)
        .then(function (res) {
        console.log("delete by id,", res.rows);
        return res;
    })
        .catch(function (err) {
        console.log("error/", err);
        return err;
    });
};
//tasks
var getTaskByID = function (task_id) {
    return pool
        .query("SELECT * FROM tasks WHERE task_id = " + task_id)
        .then(function (res) {
        return res.rows;
    })
        .catch(function (err) {
        return err;
    });
};
var createTask = function (type, taskTitle, task, assignedTo, createdBy) {
    return pool
        .query("INSERT INTO tasks (type, taskTitle, task, assignedTo, createdBy) VALUES ($1, $2, $3, $4, $5) returning type, taskTitle, task", [type, taskTitle, task, assignedTo, createdBy])
        .then(function (res) {
        return res.rows;
    })
        .catch(function (error) {
        throw error;
    });
};
var updateTask = function (task_id, type, taskTitle, task, assignedTo) {
    console.log("task data11", task_id, taskTitle);
    return pool
        .query("UPDATE tasks SET type = $1, taskTitle = $2, task = $3, assignedTo = $4, modified_date = NOW() WHERE task_id = $5 returning taskTitle, task_id", [type, taskTitle, task, assignedTo, task_id])
        .then(function (res) {
        return res.rows;
    })
        .catch(function (err) {
        return err;
    });
};
var deleteTaskById = function (task_id) {
    console.log("id is here from queries", task_id);
    return pool
        .query("DELETE FROM tasks WHERE task_id = " + task_id)
        .then(function (res) {
        console.log("delete by id,", res.rows);
        return res;
    })
        .catch(function (err) {
        console.log("error/", err);
        return err;
    });
};
module.exports = {
    //   users
    getUserById: getUserById,
    getAllUsers: getAllUsers,
    getUserByEmail: getUserByEmail,
    loginUser: loginUser,
    createUser: createUser,
    updateUser: updateUser,
    deleteUserById: deleteUserById,
    //tasks
    getTaskByID: getTaskByID,
    createTask: createTask,
    updateTask: updateTask,
    deleteTaskById: deleteTaskById
};
