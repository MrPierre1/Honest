var express = require('express')
var router = express.Router()
const multer = require("multer");
var dbHelper = require("./../services/userQueries.js");
const fs = require("fs");
const requestCall = require("request");
const helpers = require("./helpers");
// const router = Router();
const UPLOAD_PATH = "uploads/";
const upload = multer({ dest: `${UPLOAD_PATH}` });
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const exjwt = require("express-jwt");
var nodeMailer = require("nodemailer");
const sendmail = require("sendmail")();
const secret = process.env.SECRET || "thesecretkey";
// var { UserDataRequest, UserParamsRequest, UserData } from "./interfaces";

const jwtMW = exjwt({
  secret
});

var sendEmail = () => {
  sendmail(
    {
      from: "nneal@friendshipchristian.net",
      to: "jpieree1fchd@gmail.com",
      subject: `test sendmail ${Date.now()}`,
      html: `
      <table border="0" cellpadding="0" cellspacing="0" class="btn btn-primary" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; box-sizing: border-box; min-width: 100% !varant;" width="100%">
        <tr>
          <td align="center" style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;" valign="top">
            <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: auto;">
              <tr>
                <td style="font-family: sans-serif; font-size: 14px; vertical-align: top; background-color: #3498db; border-radius: 5px; text-align: center;" valign="top" bgcolor="#3498db" align="center">
                <a href="http://localhost:3001/signup" class="btn btn-primary">Click Here To Create An Account</a>
                 </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      `
    },
    function (err, reply) {
      if (err) {
        console.log("error from sending email", err);
      }

      // console.dir(reply);
    }
  );
};

// router.use(function timeLog(req, res, next) {
//   console.log('Time: ', Date.now())
//   next()
// })



// exports.getParent = function (req, res) {
router.get("/", async (req, res) => {
  res.status(201).send("re now in the user controller!");
});
// };



router.get("/all", async (req, res) => {
  const allUsers = await dbHelper.getAllUsers();
  res.status(201).json(allUsers);
});

router.get(
  "/email/:email",

  async (request, response) => {
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

  async (request, response) => {
    try {
      const { id } = request.params;
      const oneUserData = await dbHelper.getUserById(id);

      console.log("oneuser data", response);
      // const dbData = Object.assign({}, oneUserData[0]);
      return response.status(200).json(oneUserData);
    } catch (error) {
      return response.status(401).json(error);
    }
  }
);

router.put("/", jwtMW, async (requestRequest, response) => {
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
  "/signup/:managerID?",
  upload.single("file"),
  async (request, response) => {
    // console.log("redbod", request.body);
    // var direct_reports;
    let managerIDNUMBER;
    const { name, email, password, manager, direct_reports } = request.body;
    // if (manager) {
    //   var { direct_reports } = request.body;
    console.log(
      "request managerID: ",
      request.managerID,
      "directi reports",
      direct_reports,
      request.headers.referer
    );

    if (manager === "false") {
      console.log("not a amnager");
      var findnumber = "([^/]+$)";
      var result = request.headers.referer.match(findnumber);
      console.log("foind the number yeaaa", result[0], typeof result[0]);
      managerIDNUMBER = result[0];
    }

    // }

    if (!managerIDNUMBER && manager == "false") {
      console.log("manageriD params", request.params);
      return response
        .status(403)
        .json({ message: "Ask your manager for an invite" });
    }

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
      console.log(process.env.USER, "file received", request.file);
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
      console.log("Im getting ready to add a user", manager);
      // const photo = UPLOAD_PATH + email + "/" + request.file.originalname;
      const user = await dbHelper.createUser(
        name,
        email,
        password,
        request.file.filename,
        manager
      );
      console.log(
        user,
        "user was added",
        typeof manager,
        direct_reports,
        typeof direct_reports
      );

      //create a function for this and pass in the number of diurec reports so it can iterate thorugh the number o fusers and add it to the db
      if (manager !== "false") {
        console.log(
          "are you in here manager",
          manager,
          direct_reports,
          typeof direct_reports,
          JSON.parse(direct_reports),
          typeof JSON.parse(direct_reports)
        );

        // const { direct_reports } = request.body;
        console.log("your direct reports are here");
        var dr = JSON.parse(direct_reports);
        for (let index = 0; index < dr.length; index++) {
          let email = dr[index];
          helpers.sendEmail(email, user.userdata[0].user_id);
          console.log("sending email 1", email);
        }
        // helpers.sendEmail(direct_reports);
      } else {
        console.log("log the manager ID number", managerIDNUMBER, user);
        if (managerIDNUMBER) {
          helpers.createDirectReports(
            managerIDNUMBER,
            user.userdata[0].user_id
          );
        }
      }

      return response.status(201).send({ user });
    } catch (error) {
      console.log("server Error: ", error);
      return response.status(401).json({ err: error, message: "you failed" });
    }
  }
);

router.post("/create_reports", async (request, response) => {
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

router.post("/login", async (requestRequest, response) => {
  const { email, password } = request.body;

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  //if user info is not passed in return
  if (!email || !password) {
    return response
      .status(401)
      .json({ message: "please json over username, email and password" });
  }

  if (!isValidEmail(email)) {
    return response.status(401).json({ message: "email is not valid" });
  }

  try {
    const userLogin = await dbHelper.loginUser(email, password);
    // const userLogInData = await dbHelper.getUserByEmail(email);
    const userLogInData = await dbHelper.getUserById(userLogin.user_id);

    console.log(
      userLogInData,
      "youser logingdata",
      userLogin,
      Object.keys(userLogin.token).length
    );

    if (Object.keys(userLogin.token).length < 5) {
      console.log("token length was short");
      return response.status(401).json({
        message: "Authentication failed"
      });
    }

    var returnedData = { token: userLogin.token, userData: userLogInData };
    return response.status(201).json(returnedData);
  } catch (error) {
    console.log("there were errors logging the user in", error);
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
  async (requestRequest, response) => {
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

router.delete("/", jwtMW, async (request, response) => {
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

module.exports = router;

// module.exports = router