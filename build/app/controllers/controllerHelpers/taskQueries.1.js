"use strict";
var pool = require("./../../db");
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
var createTask = function (type, taskTitle, task, assignedTo, createdBy, due_date, due_time) {
    return pool
        .query("INSERT INTO tasks (type, taskTitle, task, assignedTo, createdBy, due_date, due_time) VALUES ($1, $2, $3, $4, $5, $6, $7) returning type, taskTitle, task", [type, taskTitle, task, assignedTo, createdBy, due_date, due_time])
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
    getTaskByID: getTaskByID,
    createTask: createTask,
    updateTask: updateTask,
    deleteTaskById: deleteTaskById
};
