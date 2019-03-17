"use strict";
var pool = require("./../db");
var getEventById = function (event_id) {
    return pool
        .query("SELECT * FROM events WHERE event_id = " + event_id)
        .then(function (res) {
        return res.rows;
    })
        .catch(function (err) {
        return err;
    });
};
var createEvent = function (event_type, event_title, event, event_date, event_time, reminder_frequency, participants) {
    return pool
        .query("INSERT INTO events (event_type, event_title, event, event_date, event_time, reminder_frequency, participants) VALUES ($1, $2, $3, $4, $5, $6, $7) returning event_title, event, participants", [
        event_type,
        event_title,
        event,
        event_date,
        event_time,
        reminder_frequency,
        participants
    ])
        .then(function (res) {
        return res.rows;
    })
        .catch(function (error) {
        throw error;
    });
};
// const updateevent = (
//   event_id: number,
//   type: string,
//   eventTitle: string,
//   event: string,
//   assignedTo: number
// ) => {
//   console.log("event data11", event_id, eventTitle);
//   return pool
//     .query(
//       "UPDATE events SET type = $1, eventTitle = $2, event = $3, assignedTo = $4, modified_date = NOW() WHERE event_id = $5 returning eventTitle, event_id",
//       [type, eventTitle, event, assignedTo, event_id]
//     )
//     .then((res: any) => {
//       return res.rows;
//     })
//     .catch((err: any) => {
//       return err;
//     });
// };
// const deleteeventById = (event_id: number) => {
//   console.log("id is here from queries", event_id);
//   return pool
//     .query(`DELETE FROM events WHERE event_id = ${event_id}`)
//     .then((res: any) => {
//       console.log("delete by id,", res.rows);
//       return res;
//     })
//     .catch((err: any) => {
//       console.log("error/", err);
//       return err;
//     });
// };
module.exports = {
    getEventById: getEventById,
    createEvent: createEvent
    // updateevent,
    // deleteeventById
};
