const pool = require("./../db");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);
// import { UserData } from '../user.controller';
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;
// import { UserData } from "../interfaces";

const results = (queryResult: any) => {
  return queryResult.rows.length < 1
    ? Error("Your query did not produce any valid results")
    : queryResult.rows[0];
};
const createReports = async (manager_id: number, direct_reports: [number]) => {
  try {
    console.log("manager queries, ", manager_id, direct_reports);
    const dr = await pool.query(
      "INSERT INTO manager_direct_reports (manager_id, direct_reports) VALUES ($1, $2) returning manager_id",
      [manager_id, direct_reports]
    );
    return dr;
  } catch (error) {
    return error;
  }
};
// const getUserById = async (user_id: number): Promise<UserData> => {
//   try {
//     const res = await pool.query(
//       `SELECT * FROM users WHERE user_id = ${user_id}`
//     );
//     console.log("res", res);
//     return results(res);
//   } catch (error) {
//     return error;
//   }
// };

// const getAllUsers = async () => {
//   try {
//     const getAll = await pool.query(`SELECT * FROM users LIMIT 5`);
//     return getAll.rows.length < 1 ? null : getAll.rows;
//   } catch (error) {
//     return error;
//   }
// };

// const getUserByEmail = async (email: string): Promise<UserData | null> => {
//   try {
//     const res = await pool.query(
//       `SELECT * FROM users WHERE email like '%${email}'`
//     );
//     return results(res);
//   } catch (error) {
//     return error;
//   }
// };

// const createUser = async (
//   name: string,
//   email: string,
//   password: string,
//   photo: string
// ) => {
//   try {
//     const hashPass = await bcrypt.hash(password, salt);
//     const dbInsert = await pool.query(
//       "INSERT INTO users (name, email, password, photo) VALUES ($1, $2, $3, $4) returning name, email, photo",
//       [name, email, hashPass, photo]
//     );
//     const token = await jwt.sign({ name, email, password, photo }, secret, {
//       expiresIn: 129600
//     });

//     return token;
//   } catch (error) {
//     return error;
//   }
// };

// const loginUser = async (email: string, password: string) => {
//   try {
//     const userInfo = await getUserByEmail(email);
//     const hashedPassword = userInfo.password;

//     const match = await bcrypt.compare(password, hashedPassword);
//     if (match) {
//       const token = await jwt.sign({ email, password }, secret, {
//         expiresIn: 129600
//       });
//       return token;
//     }
//   } catch (error) {
//     return error;
//   }
// };

// const updateUser = async (
//   user_id: string,
//   name: string,
//   email: string,
//   photo: string
// ) => {
//   try {
//     const res = await pool.query(
//       "UPDATE users SET name = $1, email = $2, photo = $3 WHERE user_id = $4 returning name, email, photo",
//       [name, email, photo, user_id]
//     );
//     return results(res);
//   } catch (error) {
//     return error;
//   }
// };

// const passwordUpdate = async (user_id: number, newPassword1: string) => {
//   const passReset = await bcrypt.hash(newPassword1, salt);
//   return passReset;
// };

// const deleteUserById = async (user_id: number) => {
//   try {
//     const res = await pool.query(
//       `DELETE FROM users WHERE user_id = ${user_id}`
//     );
//     return results(res);
//   } catch (error) {
//     return error;
//   }
// };

// const deleteUserByEmail = async (email: string) => {
//   try {
//     const res = await pool.query(
//       `DELETE FROM users WHERE email like '%${email}'`
//     );
//     console.log("iser is deleted", res);
//     return res.rowCount < 1 ? "user not deleted" : "user deleted";
//   } catch (error) {
//     console.log("err", error);
//     return error;
//   }
// };

export default {
  // getUserById,
  // getAllUsers,
  // getUserByEmail,
  // loginUser,
  // createUser,
  // updateUser,
  // deleteUserById,
  // deleteUserByEmail,
  // passwordUpdate,
  createReports
};
