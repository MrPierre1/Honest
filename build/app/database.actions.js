"use strict";
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





CREATE TABLE public.users
(
    user_id integer NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    email character varying(128) COLLATE pg_catalog."default" NOT NULL,
    name character varying(128) COLLATE pg_catalog."default" NOT NULL,
    password character varying(250) COLLATE pg_catalog."default" NOT NULL,
    photo character varying(128) COLLATE pg_catalog."default" NOT NULL,
    manager: boolean,
    created_date timestamp without time zone,
    modified_date timestamp without time zone,
    CONSTRAINT users_pkey PRIMARY KEY (user_id),
    CONSTRAINT users_email_key UNIQUE (email)
)


CREATE TABLE public.tasks
(
    task_id integer NOT NULL,
    task_title text COLLATE pg_catalog."default" NOT NULL,
    task text COLLATE pg_catalog."default" NOT NULL,
    date date,
    assignee integer[],
    PRIMARY KEY (task_id)
)


CREATE TABLE public.assignee
(
    user_id integer NOT NULL,
    task_id integer,
    CONSTRAINT fk_user_id REFERENCES users (id)
    CONSTRAINT fk_task_id REFERENCES tasks (task_id)
    PRIMARY KEY (user_id, task_id)
)




CREATE TABLE public.events
(
    event_id serial,
    event_title text COLLATE pg_catalog."default" NOT NULL,
    event text COLLATE pg_catalog."default" NOT NULL,
    event_due_date date,
    participants integer[],
    PRIMARY KEY (event_id)
);


CREATE TABLE public.user_task
(
    user_id integer NOT NULL,
    event_id integer NOT NULL,
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users (user_id),
    CONSTRAINT fk_event_id FOREIGN KEY (event_id) REFERENCES events (event_id),
    PRIMARY KEY (user_id, event_id)
);


CREATE TABLE public.managers
(
    manager_id integer NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    email character varying(128) COLLATE pg_catalog."default" NOT NULL,
    name character varying(128) COLLATE pg_catalog."default" NOT NULL,
    password character varying(250) COLLATE pg_catalog."default" NOT NULL,
    reports integer[] NOT NULL,
    created_date timestamp without time zone,
    modified_date timestamp without time zone,
        PRIMARY KEY manager_id
    CONSTRAINT fk_reports_id REFERENCES users (user_id)
   
)

*/
