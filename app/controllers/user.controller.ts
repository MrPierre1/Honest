import { Router, Request, Response } from "express";
const multer = require("multer");
const dbHelper = require("./controllerHelpers/userQueries");
const authHelper = require("./auth");
const fs = require("fs");
const helpers = require("./helpers");
const router: Router = Router();
const UPLOAD_PATH = "uploads/";
const upload = multer({ dest: `${UPLOAD_PATH}` });
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const exjwt = require("express-jwt");
const secret = process.env.SECRET || "thesecretkey";
const interfaces = require("./interfaces");
export interface UserData {
  name: string;
  email: string;
  password: string;
  photo: string;
  id: number;
  token: string;
}

interface UserDataRequest extends Request {
  body: UserData;
}

const jwtMW = exjwt({
  secret
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const allUsers = await dbHelper.getAllUsers();
    const dbData = Object.assign({}, allUsers);
    res.send(` Hello, You're now in the user controller! ${Object.entries(
      dbData
    )}  
  `);
  } catch (error) {
    res.status(200).send(error);
  }
});

//@login
router.get(
  "/:id",

  async (request: Request, response: Response) => {
    try {
      const { id }: UserData = request.params;
      const oneUserData = await dbHelper.getUserById(id);
      const dbData = Object.assign({}, oneUserData[0]);
      response.status(200).send(dbData);
    } catch (error) {
      response.status(401).send(error);
    }
  }
);

router.put("/", jwtMW, async (request: Request, response: Response) => {
  try {
    const { name, email, photo }: UserData = request.body;
    const userLogInData = await dbHelper.getUserByEmail(request.user.email);
    const { id } = userLogInData;
    const oneUserData = await dbHelper.updateUser(id, name, email, photo);
    const dbData = Object.assign({}, oneUserData);
    response.status(200).send(`Result from Update: ${Object.entries(dbData)}`);
  } catch (error) {
    response.status(200).send(error);
  }
});

router.post(
  "/signup",
  upload.single("file"),
  async (request: UserDataRequest, response: Response) => {
    const { name, email, password } = request.body;

    //if user info is not passed in return
    if (!name || !email || !password) {
      response
        .status(401)
        .send("please send over username, email and password");
      return;
    }

    const oneUserData: UserData = await dbHelper.getUserByEmail(email);
    const dbData = Object.assign({}, oneUserData);
    const dbEmail = dbData.email;
    if (email === dbEmail) {
      response
        .status(401)
        .send(`A user with the email: ${email} already exist in our system`);
      return;
    }

    // load filename with guid in db, save guid in database
    //reference upload folder with guid
    if (!request.file) {
      console.log("No file received");
      throw Error;
    } else {
      console.log("file received", request.file);
      const imagePath = request.file.path;
      const targetPath = UPLOAD_PATH;
      const originalImageName = request.file.originalname;
      var imageUploaded = helpers.imageUpload(
        imagePath,
        targetPath,
        originalImageName,
        email
      );
    }

    try {
      const photo = UPLOAD_PATH + email + "/" + request.file.originalname;
      const user = await dbHelper.createUser(name, email, password, photo);
      console.log("user was added", user);
      // const addedUserData = Object.assign({}, user[0]);
      response.status(201).send(`The user was added ${user}`);
    } catch (error) {
      response
        .status(401)
        .send({ err: error, message: "please provide a valid userID" });
    }
  }
);

router.post("/login", async (request: Request, response: Response) => {
  const { email, password }: UserData = request.body;

  const isValidEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  //if user info is not passed in return
  if (!email || !password) {
    response.status(401).send("please send over username, email and password");
    return;
  }

  if (!isValidEmail(email)) {
    response.status(401).send("email is not valid");
    return;
  }

  try {
    const userLogin = await dbHelper.loginUser(email, password);
    const userLogInData = await dbHelper.getUserByEmail(email);
    console.log(userLogInData, "data2", userLogin);
    return response.status(201).send(userLogin);
  } catch (error) {
    return response.status(401).json({
      message: "Authentication failed",
      error: error
    });
  }
});

//@login implement login decorator
router.put(
  "/passwordUpdate",
  jwtMW,
  async (request: Request, response: Response) => {
    const { token, id, oldPassword, newPassword1, newPassword2 } = request.body;
    if (!token) {
      response.status(401).send("please send over a token");
      return;
    }

    if (newPassword1 !== newPassword2) {
      response.status(401).send("The passwords must match, please try again");
      return;
    }

    try {
      const oneUserData = await dbHelper.getUserById(id);
      const hashedPasswordFromDB = oneUserData[0].password;
      const match = await bcrypt.compare(oldPassword, hashedPasswordFromDB);
      if (match) {
        const updatePasswordResult = await dbHelper.passwordUpdate(
          id,
          newPassword1
        );
        response.status(201).send("your password has been updated");
      }
    } catch (error) {
      response.status(401).send(error);
    }
  }
);

router.delete("/", jwtMW, async (request: Request, response: Response) => {
  console.log(request.user);
  try {
    const userLogInData = await dbHelper.deleteUserByEmail(request.user.email);
    response.status(200).send(userLogInData);
  } catch (error) {
    response.status(401).send({
      message: "A valid token is required for this request",
      error: error
    });
  }
});

export const userController: Router = router;
