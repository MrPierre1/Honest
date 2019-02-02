// Create Task Table

const createTaskTable = `CREATE TABLE IF NOT EXISTS
      tasks(
        id UUID PRIMARY KEY,
        type: text NOT NULL,
        taskTitle TEXT NOT NULL,
        tasK TEXT NOT NULL,
        assignedTo TEXT NOT NULL,
        createdBy TEXT NOT NULL,
        created_date TIMESTAMP,
        modified_date TIMESTAMP,

      )`;

//Create User Table

const createUserTable = `CREATE TABLE IF NOT EXISTS
      users(
        id SERIAL UUID PRIMARY KEY,
        email VARCHAR(128) UNIQUE NOT NULL,
        name VARCHAR(128) NOT NULL,
        password VARCHAR(128) NOT NULL,
        photo VARCHAR(128) NOT NULL,
        created_date TIMESTAMP,
        modified_date TIMESTAMP
      )`;
