const pool = require("./../../db");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);
import { UserData } from "../user.controller";
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

const getUserById = async (id: number) => {
  try {
    const res = await pool.query(`SELECT * FROM users WHERE id = ${id}`);
    return res.rows.length < 1 ? null : res.rows[0];
  } catch (error) {
    return error;
  }
};

const getAllUsers = async (id: number) => {
  try {
    const getAll = await pool.query(`SELECT * FROM users`);
    return getAll.rows.length < 1 ? null : getAll.rows;
  } catch (error) {
    return error;
  }
};

const getUserByEmail = async (email: string): Promise<UserData | null> => {
  try {
    const res = await pool.query(
      `SELECT * FROM users WHERE email like '%${email}'`
    );
    return res.rows.length < 1 ? null : res.rows[0];
  } catch (error) {
    return error;
  }
};

const createUser = async (
  name: string,
  email: string,
  password: string,
  photo: string
) => {
  try {
    const hashPass = await bcrypt.hash(password, salt);
    const dbInsert = await pool.query(
      "INSERT INTO users (name, email, password, photo) VALUES ($1, $2, $3, $4) returning name, email, photo",
      [name, email, hashPass, photo]
    );
    const token = await jwt.sign({ name, email, password, photo }, secret, {
      expiresIn: 129600
    });

    return token;
  } catch (error) {
    return error;
  }
};

const loginUser = async (email: string, password: string) => {
  try {
    const userInfo = await getUserByEmail(email);
    const hashedPassword = userInfo.password;

    const match = await bcrypt.compare(password, hashedPassword);
    if (match) {
      const token = await jwt.sign({ email, password }, secret, {
        expiresIn: 129600
      });
      return token;
    }
  } catch (error) {
    return error;
  }
};

const updateUser = async (
  id: string,
  name: string,
  email: string,
  photo: string
) => {
  try {
    const res = await pool.query(
      "UPDATE users SET name = $1, email = $2, photo = $3 WHERE id = $4 returning name, email, photo",
      [name, email, photo, id]
    );
    return res.rows.length < 1 ? null : res.rows[0];
  } catch (error) {
    return error;
  }
};

const passwordUpdate = async (id: number, newPassword1: string) => {
  const passReset = await bcrypt.hash(newPassword1, salt);
  return passReset;
};

const deleteUserById = async (id: number) => {
  try {
    const res = await pool.query(`DELETE FROM users WHERE id = ${id}`);
    return res.rows.length < 1 ? null : res.rows[0];
  } catch (error) {
    return error;
  }
};

const deleteUserByEmail = async (email: string) => {
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
  passwordUpdate
};
