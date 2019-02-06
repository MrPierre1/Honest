import { Router, Request, Response } from "express";
const dbHelper = require("./controllerHelpers/eventQueries");
const router: Router = Router();

interface EventData {
  event_type: string;
  event_title: string;
  event: string;
  event_date: number;
  event_time: number;
  reminder_frequency: string;
  participants: number;
}

router.get("/", async (req: Request, res: Response) => {
  res.send(`Hello, You're now in the Event controller!`);
});

router.get("/:event_id", async (request: Request, response: Response) => {
  const { event_id }: EventData = request.params;
  const oneEventData = await dbHelper.getEventById(event_id);
  const dbData = Object.assign({}, oneEventData[0]);
  response.status(200).send(dbData);
});

router.post("/create", async (request: Request, response: Response) => {
  const {
    event_type,
    event_title,
    event,
    event_date,
    event_time,
    reminder_frequency,
    participants
  }: EventData = request.body;
  // console.log("EventData", request.body);

  if (!event_type || !event_title || !event) {
    response.status(401)
      .send(`please send over an object with these properties {
        type,
        eventTitle,
        event
      } `);
    return;
  }

  // console.log("data for events", request.body);
  const createdEvent = await dbHelper.createEvent(
    event_type,
    event_title,
    event,
    event_date,
    event_time,
    reminder_frequency,
    participants
  );
  console.log("createdevent", createdEvent);
  const addedEventData = Object.assign({}, createdEvent[0]);
  response
    .status(201)
    .send(`The event was added ${Object.entries(addedEventData)}`);
});

// router.put("/update", async (request: Request, response: Response) => {
//   const { event_id, eventTitle }: EventData = request.body;
//   const oneEventData = await dbHelper.updateevent(event_id, eventTitle);
//   const dbData = Object.assign({}, oneEventData[0]);
//   response.status(200).send(`event modified:${Object.entries(dbData)}`);
// });

// router.delete("/:event_id", async (request: Request, response: Response) => {
//   const { event_id }: EventData = request.params;
//   console.log("id of event", event_id);
//   const deletedResponse = await dbHelper.deleteeventById(event_id);
//   // console.log("deletedresponse", deletedResponse);
//   response.status(200).send(`The event with id ${event_id} was deleted `);
// });

export const eventController: Router = router;
