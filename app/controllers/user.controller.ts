import { Router, Request, Response } from "express";
const multer = require("multer");
import dbHelper from "./../services/userQueries";
const fs = require("fs");
const requestCall = require("request");
const helpers = require("./helpers");
const router: Router = Router();
const UPLOAD_PATH = "uploads/";
const upload = multer({ dest: `${UPLOAD_PATH}` });
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const exjwt = require("express-jwt");
const secret = process.env.SECRET || "thesecretkey";
import { UserDataRequest, UserParamsRequest, UserData } from "./interfaces";

const jwtMW = exjwt({
  secret
});

router.get("/", async (req: Request, res: Response) => {
  res.status(201).send("re now in the user controller!");
});
router.get("/all", async (req: Request, res: Response) => {
  const allUsers: UserData = await dbHelper.getAllUsers();
  res.status(201).json(allUsers);
});

router.get(
  "/email/:email",

  async (request: Request, response: Response) => {
    try {
      const { email } = request.params;
      const oneUserData = await dbHelper.getUserByEmail(email);

      console.log("oneuser data email", response);
      // const dbData = Object.assign({}, oneUserData[0]);
      return response.status(200).json(oneUserData);
    } catch (error) {
      return response.status(401).json(error);
    }
  }
);

//@login
router.get(
  "/:id",

  async (request: UserParamsRequest, response: Response) => {
    try {
      const { id } = request.params;
      const oneUserData: UserData = await dbHelper.getUserById(id);

      console.log("oneuser data", response);
      // const dbData = Object.assign({}, oneUserData[0]);
      return response.status(200).json(oneUserData);
    } catch (error) {
      return response.status(401).json(error);
    }
  }
);

router.put("/", jwtMW, async (request: UserDataRequest, response: Response) => {
  try {
    const { name, email, photo } = request.body;
    const userLogInData = await dbHelper.getUserByEmail(request.user.email);
    const { id } = userLogInData;
    const oneUserData = await dbHelper.updateUser(id, name, email, photo);
    // const dbData = Object.assign({}, oneUserData);
    response.status(200).json(oneUserData);
  } catch (error) {
    response.status(200).json(error);
  }
});

router.post(
  "/signup",
  upload.single("file"),
  async (request: Request, response: Response) => {
    console.log("redbod", request.body);
    const { name, email, password } = request.body;
    // if (!helpers.checkValues(name, email, password)) {
    if (!name || !email || !password) {
      return response
        .status(401)
        .json({ message: "please send over name, email and password" });
    }

    const oneUserData = await dbHelper.getUserByEmail(email);
    const dbData = Object.assign({}, oneUserData);
    const dbEmail = dbData.email;
    if (email === dbEmail) {
      return response.status(401).json(email);
    }

    if (!request.file) {
      console.log("No file received");
      return response
        .status(402)
        .json({ message: `Please attach a file to the call` });
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
      // const photo = UPLOAD_PATH + email + "/" + request.file.originalname;
      const user = await dbHelper.createUser(
        name,
        email,
        password,
        request.file.filename
      );
      console.log(user, "user was added", user.userdata[0]);

      if (user.userdata[0].user_id) {
        var req = requestCall.post("http://localhost:3000/manager/", {
          json: {
            manager_id: 1,
            direct_reports: 90
          }
        });
        console.log("redddddqqqq", req);
      }

      return response.status(201).send({ user });
    } catch (error) {
      return response
        .status(401)
        .json({ err: error, message: "please provide a valid userID" });
    }
  }
);

router.post("/create_reports", async (request: Request, response: Response) => {
  const { manager_id, direct_reports } = request.body;

  try {
    const user = await dbHelper.createReports(manager_id, direct_reports);
    // const userData = await dbHelper.getUserByEmail(email);
    console.log("youser logingdata", user, Object.keys(user).length);

    if (Object.keys(user).length < 5) {
      return response.status(401).json({
        message: " failed"
      });
    }

    var returnedData = { user };
    return response.status(201).json(returnedData);
  } catch (error) {
    console.log(error);
    return response.status(403).json({
      message: " failed",
      error: error
    });
  }
});

router.post("/login", async (request: UserDataRequest, response: Response) => {
  const { email, password } = request.body;

  const isValidEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  //if user info is not passed in return
  if (!email || !password) {
    return response
      .status(401)
      .json("please json over username, email and password");
  }

  if (!isValidEmail(email)) {
    return response.status(401).json({ message: "email is not valid" });
  }

  try {
    const userLogin = await dbHelper.loginUser(email, password);
    const userLogInData = await dbHelper.getUserByEmail(email);
    console.log("youser logingdata", userLogin, Object.keys(userLogin).length);

    if (Object.keys(userLogin).length < 5) {
      return response.status(401).json({
        message: "Authentication failed"
      });
    }

    var returnedData = { token: userLogin, userData: userLogInData };
    return response.status(201).json(returnedData);
  } catch (error) {
    console.log(error);
    return response.status(403).json({
      message: "Authentication failed",
      error: error
    });
  }
});

//@login implement login decorator
router.put(
  "/passwordUpdate",
  jwtMW,
  async (request: UserDataRequest, response: Response) => {
    const { token, id, oldPassword, newPassword1, newPassword2 } = request.body;
    if (!token) {
      response.status(401).json({ message: "please json over a token" });
      return;
    }

    if (newPassword1 !== newPassword2) {
      response.status(401).json("The passwords must match, please try again");
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
        response.status(201).json("your password has been updated");
      }
    } catch (error) {
      response.status(401).json(error);
    }
  }
);

router.delete("/", jwtMW, async (request: Request, response: Response) => {
  console.log(request.user);
  try {
    const userLogInData = await dbHelper.deleteUserByEmail(request.user.email);
    response.status(200).json(userLogInData);
  } catch (error) {
    response.status(401).json({
      message: "A valid token is required for this request",
      error: error
    });
  }
});

export const userController: Router = router;
