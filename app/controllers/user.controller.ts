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

interface UserData {
  name: string;
  email: string;
  password: string;
  photo: string;
  id: number;
  token: string;
}

router.get("/", async (req: Request, res: Response) => {
  // Print a randomly generated name:
  const allUsers = await dbHelper.getAllUsers();
  const dbData = Object.assign({}, allUsers[0]);
  res.send(`Hello, You're now in the user controller!
        Here are all the users: ${Object.entries(dbData)}
  
  `);
});

router.get("/:id", async (request: Request, response: Response) => {
  const { id }: UserData = request.params;
  const oneUserData = await dbHelper.getUserById(id);
  const dbData = Object.assign({}, oneUserData[0]);
  response.status(200).send(dbData);
});

router.put("/", async (request: Request, response: Response) => {
  const { id, name, email, password, photo, token }: UserData = request.body;
  const oneUserData = await dbHelper.updateUser(
    id,
    name,
    email,
    password,
    photo,
    token
  );
  const dbData = Object.assign({}, oneUserData[0]);
  response.status(200).send(`Result from Update: ${Object.entries(dbData)}`);
});

router.post(
  "/signup",
  upload.single("file"),
  async (request: Request, response: Response) => {
    const { name, email, password }: UserData = request.body;
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
      return;
    }

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
    const photo = UPLOAD_PATH + email + "/" + request.file.originalname;
    const user = await dbHelper.createUser(name, email, password, photo);
    const addedUserData = Object.assign({}, user[0]);
    response
      .status(201)
      .send(`The user was added ${Object.entries(addedUserData)}`);
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
    return;
  }

  try {
    const userLogin = await dbHelper.loginUser(email, password);
    const userLogInData = await dbHelper.getUserByEmail(email);
    return response
      .status(201)
      .send(
        `Here's the user's Data: email: ${
          userLogInData[0].email
        }, token: ${userLogin}`
      );
  } catch (error) {
    return response.status(401).json({
      message: "Authentication failed"
    });
  }
});

router.put("/passwordUpdate", async (request: Request, response: Response) => {
  const { token, id, oldPassword, newPassword1, newPassword2 } = request.body;
  if (!token) {
    response.status(401).send("please send over a token");
    return;
  }

  if (newPassword1 !== newPassword2) {
    response.status(401).send("The passwords must match, please try again");
    return;
  }

  const oneUserData = await dbHelper.getUserById(id);
  const hashedPasswordFromDB = oneUserData[0].password;
  const match = await bcrypt.compare(oldPassword, hashedPasswordFromDB);
  if (match) {
    const updatePasswordResult = await dbHelper.passwordUpdate(
      id,
      newPassword1
    );
    response.status(201).send("your password has been updated");
  } else {
    response.status(401).send("your current password is not valid");
  }
});

// need more love
router.delete("/:id/:token", async (request: Request, response: Response) => {
  const { id, token }: UserData = request.params;
  var stringId = parseInt(id);
  if (!token) {
    console.log("no token was specified");
    return { message: "No token was specified" };
  }

  const decoded = await authHelper.decodeToken(token);
  if (!decoded.id) {
    // return [];
    response
      .status(401)
      .send({ message: "A valid token is required for this request" });
    return;
  } else if (decoded.id == stringId) {
    const deletedResponse = await dbHelper.deleteUserById(stringId);
    console.log("deletedresponse", deletedResponse);
    response.status(200).send(`The user with id ${id} was deleted `);
  } else {
    console.log("match is here ", decoded.id == stringId);
    response
      .status(401)
      .send({ message: "A valid token is required for this user ID" });
    return;
  }
});

export const userController: Router = router;
