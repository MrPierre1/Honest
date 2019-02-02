import { Router, Request, Response } from "express";
const multer = require("multer");
const pool = require("../db");
const dbHelper = require("../queries");
const router: Router = Router();

const UPLOAD_PATH = "../uploads";
const upload = multer({ dest: `${UPLOAD_PATH}/` }); // multer configuration

interface UserData {
  name: string;
  email: string;
  password: string;
  photo: string;
  id: number;
  token: any;
}

router.get("/", async (req: Request, res: Response) => {
  res.send(`Hello, You're now in the user controller!`);
});

router.get("/:id", async (request: Request, response: Response) => {
  const { id }: UserData = request.params;
  const oneUserData = await dbHelper.getUserById(id);
  const dbData = Object.assign({}, oneUserData[0]);
  response.status(200).send(dbData);
});

router.put("/", async (request: Request, response: Response) => {
  const { id, name, email, password, photo }: UserData = request.body;
  const oneUserData = await dbHelper.updateUser(
    id,
    name,
    email,
    password,
    photo
  );
  const dbData = Object.assign({}, oneUserData[0]);
  response.status(200).send(`User modified:${Object.entries(dbData)}`);
});

router.post(
  "/",
  upload.single("photo"),
  async (request: Request, response: Response) => {
    const { name, email, password, photo }: UserData = request.body;
    //if user info is not passed in return
    if (!name || !email || !password) {
      response
        .status(401)
        .send("please send over username, email and password");
      return;
    }

    const oneUserData = await dbHelper.getUserByEmail(email);
    const dbData = Object.assign({}, oneUserData[0]);
    const dbEmail = dbData.email;
    if (email === dbEmail) {
      response
        .status(401)
        .send(`A user with the email: ${email} already exist in our system`);
    } else {
      const user = await dbHelper.createUser(name, email, password, photo);
      const addedUserData = Object.assign({}, user[0]);
      response
        .status(201)
        .send(`The user was added ${Object.entries(addedUserData)}`);
    }
  }
);

router.post("/login", async (request: Request, response: Response) => {
  const { email, password }: UserData = request.body;
  //if user info is not passed in return
  if (!email || !password) {
    response.status(401).send("please send over username, email and password");
    return;
  }
  //   console.log("user info ush", email, password);
  var userLogin = await dbHelper.loginUser(email, password);
  console.log("user info ush from router", email, password, userLogin);

  response.status(201).send(`The is signed in ${userLogin}`);
  //   }
});

router.delete("/:id", async (request: Request, response: Response) => {
  const { id }: UserData = request.params;
  const deletedResponse = await dbHelper.deleteUserById(id);
  console.log("deletedresponse", deletedResponse);
  response.status(200).send(`The user with id ${id} was deleted `);
});

export const userController: Router = router;
