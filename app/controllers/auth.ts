const jwt = require("jwt-simple");
const secret = "thesecretkey";
// const pool = require("../db");

const encode = function(user: object) {
  try {
    const token = jwt.encode(user, secret);
    // console.log("va", token instanceof Promise);
    return token;
  } catch (error) {
    return error;
  }
};
const decodeToken = async function async(token) {
  //   const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(400).send({ message: "Token is not provided" });
  }
  try {
    const decoded = await jwt.decode(token, secret);
    return decoded;
  } catch (error) {
    return error;
  }
};

module.exports = {
  encode,
  decodeToken
};
