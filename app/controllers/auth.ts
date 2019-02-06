const jwt = require("jwt-simple");
// const secret = "thesecretkey";
const secret = process.env.SECRET;
const encode = (user: object) => {
  try {
    const token = jwt.encode(user, secret);
    return token;
  } catch (error) {
    return error;
  }
};
const decodeToken = (token: any) => {
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
