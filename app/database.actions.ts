// Create Task Table
/*
const createTaskTable = `CREATE TABLE IF NOT EXISTS
tasks(
  task_id SERIAL NOT NULL,
  type TEXT NOT NULL,
  taskTitle TEXT NOT NULL,
  tasK TEXT NOT NULL,
  assignedTo array NOT NULL,
  createdBy int[],
  due_date  date NOT NULL,
  due_time time NOT NULL,
  created_date TIMESTAMP DEFAULT now(),
  modified_date TIMESTAMP,
  PRIMARY KEY (task_id),
  CONSTRAINT fk_assignee FOREIGN KEY (assignedTo) REFERENCES users (id),
  CONSTRAINT fk_created FOREIGN KEY (createdBy) REFERENCES users (id)
)`;

const createEventsTable = `CREATE TABLE IF NOT EXISTS
events(
  event_id SERIAL NOT NULL,
  event_type TEXT NOT NULL,
  event_title TEXT NOT NULL,
  event TEXT NOT NULL,
  event_date date NOT NULL,
  event_time time NOT NULL
  reminder_frequency text NOT NULL,
  participants integer[],
  created_date TIMESTAMP DEFAULT now(),
  modified_date TIMESTAMP,
  PRIMARY KEY (event_id),
  CONSTRAINT fk_participants FOREIGN KEY (participants) REFERENCES users (id),
)`;


//create feedback table
const createFeedbackTable = `CREATE TABLE IF NOT EXISTS
feedback(
  feedback_id SERIAL NOT NULL,
  feedbackTitle TEXT NOT NULL,
  feedback TEXT NOT NULL,
  assignedTo int NOT NULL,
  createdBy int NOT NULL,
  created_date TIMESTAMP DEFAULT now(),
  modified_date TIMESTAMP,
  PRIMARY KEY (feedback_id),
  CONSTRAINT fk_assignee FOREIGN KEY (assignedTo) REFERENCES users (id),
  CONSTRAINT fk_created FOREIGN KEY (createdBy) REFERENCES users (id)
)`;

//Create User Table

const createUserTable = `CREATE TABLE IF NOT EXISTS
      users(
        id SERIAL UUID PRIMARY KEY,
        email VARCHAR(128) UNIQUE NOT NULL,
        name VARCHAR(128) NOT NULL,
        password VARCHAR(128) NOT NULL,
        photo VARCHAR(128) NOT NULL,
        created_date TIMESTAMP DEFAULT now(),
        modified_date TIMESTAMP
      )`;


trigger
      CREATE TRIGGER updateCreatedTask BEFORE UPDATE ON task FOR EACH ROW EXECUTE PROCEDURE  update_modified_column();

*/
