const jwt = require("jwt-simple");
const secret = "thesecretkey";
// const pool = require("../db");

const encode = (user: object) => {
  try {
    const token = jwt.encode(user, secret);
    // console.log("va", token instanceof Promise);
    return token;
  } catch (error) {
    return error;
  }
};
const decodeToken = async (token: any) => {
  //   const token = req.headers["x-access-token"];
  if (!token) {
    console.log("no token was specified");
    return { message: "No token was specified" };
  }
  try {
    const decoded = jwt.decode(token, secret);
    return decoded;
  } catch (error) {
    return error;
  }
};

module.exports = {
  encode,
  decodeToken
};
