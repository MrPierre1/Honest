"use strict";
// Create Task Table
var createTaskTable = "CREATE TABLE IF NOT EXISTS\n      tasks(\n        id UUID PRIMARY KEY,\n        type: text NOT NULL,\n        taskTitle TEXT NOT NULL,\n        tasK TEXT NOT NULL,\n        assignedTo TEXT NOT NULL,\n        createdBy TEXT NOT NULL,\n        created_date TIMESTAMP,\n        modified_date TIMESTAMP,\n\n      )";
//Create User Table
var createUserTable = "CREATE TABLE IF NOT EXISTS\n      users(\n        id SERIAL UUID PRIMARY KEY,\n        email VARCHAR(128) UNIQUE NOT NULL,\n        name VARCHAR(128) NOT NULL,\n        password VARCHAR(128) NOT NULL,\n        photo VARCHAR(128) NOT NULL,\n        created_date TIMESTAMP,\n        modified_date TIMESTAMP\n      )";
