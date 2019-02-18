import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
  ReactDOM.unmountComponentAtNode(div)
})

// drop table assignee
// drop table tasks

// CREATE TABLE public.tasks
// (
//     task_id integer NOT NULL DEFAULT nextval('task_id'::regclass),
//     tasktitle text COLLATE pg_catalog."default" NOT NULL,
//     CONSTRAINT tasks_pkey PRIMARY KEY (task_id)

// )

// CREATE TABLE public.assignee
// (
//     task_id integer NOT NULL DEFAULT nextval('assignee_id'::regclass),
//     user_id integer NOT NULL,
//     CONSTRAINT assignee_pkey PRIMARY KEY (task_id, user_id),
//     CONSTRAINT fk_assignee FOREIGN KEY (user_id)
//         REFERENCES public.users (user_id) MATCH SIMPLE,
//     CONSTRAINT fk_taskid FOREIGN KEY (task_id)
//         REFERENCES public.tasks (task_id) MATCH SIMPLE
// )



// CREATE TABLE tasks (
//     task_id integer PRIMARY KEY,
// 	task_type text,
// 	tast_title text,
// 	task_body text, 
// 	assigned integer[],
//     name text,
//     price numeric
// )

// CREATE TABLE tasks (
//     order_id integer PRIMARY KEY,
//     shipping_address text
// )

// CREATE TABLE order_items (
//     product_no integer REFERENCES products ON DELETE RESTRICT,
//     order_id integer REFERENCES orders ON DELETE CASCADE,
//     quantity integer,
//     PRIMARY KEY (product_no, order_id)
// )

// insert into order_items values(2, 3, 70)

// drop table weather
// drop table cities

// CREATE TABLE cities (
//         city int,
//         user_id integer[] unique
// )

// CREATE TABLE weather (
//         city_weather text ,
//         user_id   integer[] references cities(user_id),
//         temp_hi   int
// )

// INSERT INTO cities VALUES (1, 1,2)
