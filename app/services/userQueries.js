const pool = require("./../db");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);
// import { UserData } from '../user.controller';
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;
// var  { UserData } from "./../interfaces";

const results = (queryResult) => {
  return queryResult.rows.length < 1
    ? Error("Your query did not produce any valid results")
    : queryResult.rows[0];
};

const getUserById = async (user_id) => {
  try {
    const res = await pool.query(
      `SELECT user_id, email, name, manager FROM users WHERE user_id = ${user_id}`
    );
    console.log("res", res);
    return results(res);
  } catch (error) {
    return error;
  }
};

const getAllUsers = async () => {
  console.log('trying to get users')
  try {
    const getAll = await pool.query(`SELECT * FROM users LIMIT 5`);
    return getAll.rows.length < 1 ? null : getAll.rows;
  } catch (error) {
    return error;
  }
};

const getUserByEmail = async (email) => {
  try {
    const res = await pool.query(
      `SELECT * FROM users WHERE email like '%${email}'`
    );
    return results(res);
  } catch (error) {
    return error;
  }
};

const createUser = async (
  name,
  email,
  password,
  photo,
  manager
) => {
  try {
    const hashPass = await bcrypt.hash(password, salt);
    const user = await pool.query(
      "INSERT INTO users (name, email, password, photo, manager) VALUES ($1, $2, $3, $4, $5) returning user_id, name, email, manager",
      [name, email, hashPass, photo, manager]
    );
    const token = await jwt.sign(
      { name, email, password, photo, manager },
      secret,
      {
        expiresIn: 129600
      }
    );

    return { userdata: user.rows, token };
  } catch (error) {
    return error;
  }
};

const loginUser = async (email, password) => {
  try {
    const userInfo = await getUserByEmail(email);
    // console.log("I know the user ID: ", userInfo);
    const hashedPassword = userInfo.password;

    const match = await bcrypt.compare(password, hashedPassword);
    if (match) {
      const token = await jwt.sign({ email, password }, secret, {
        expiresIn: 129600
      });
      return { token, user_id: userInfo.user_id };
    }
  } catch (error) {
    console.log("I couldnot log the user in", error);
    return error;
  }
};

const createReports = async (manager_id, directReports) => {
  try {
    await pool.query(
      "INSERT INTO manage_direct_reports (manager_id, directReports) VALUES ($1, $2) returning manager_id",
      [manager_id, directReports]
    );
  } catch (error) {
    return error;
  }
};

const updateUser = async (
  user_id,
  name,
  email,
  photo
) => {
  try {
    const res = await pool.query(
      "UPDATE users SET name = $1, email = $2, photo = $3 WHERE user_id = $4 returning name, email, photo",
      [name, email, photo, user_id]
    );
    return results(res);
  } catch (error) {
    return error;
  }
};

const passwordUpdate = async (user_id, newPassword1) => {
  const passReset = await bcrypt.hash(newPassword1, salt);
  return passReset;
};

const deleteUserById = async (user_id) => {
  try {
    const res = await pool.query(
      `DELETE FROM users WHERE user_id = ${user_id}`
    );
    return results(res);
  } catch (error) {
    return error;
  }
};

const deleteUserByEmail = async (email) => {
  try {
    const res = await pool.query(
      `DELETE FROM users WHERE email like '%${email}'`
    );
    console.log("iser is deleted", res);
    return res.rowCount < 1 ? "user not deleted" : "user deleted";
  } catch (error) {
    console.log("err", error);
    return error;
  }
};

module.exports = {
  getUserById,
  getAllUsers,
  getUserByEmail,
  loginUser,
  createUser,
  updateUser,
  deleteUserById,
  deleteUserByEmail,
  passwordUpdate,
  createReports
};
