import { AnyCnameRecord } from "dns";

const pool = require("./db");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);

// const PassedPassword = password => {
//   console.log("string password", password);
//   bcrypt.hash(password, salt, async (err: any, hash: string) => {
//     if (err) {
//       console.log("errors from hash", err);
//       throw err;
//     }
//     console.log(" hash password", hash);

//     return hash;
//   });
// };

const getUserById = function(id: number) {
  return pool
    .query(`SELECT * FROM users WHERE id = ${id}`)
    .then((res: any) => {
      return res.rows;
    })
    .catch((err: any) => {
      return err;
    });
};

const getUserByEmail = function(email: string) {
  const emailString: string = email;

  return pool
    .query(`SELECT * FROM users WHERE email like '%${emailString}'`)
    .then((res: any) => {
      return res.rows;
    })
    .catch((err: any) => {
      return err;
    });
};

const createUser = (
  name: string,
  email: string,
  password: string,
  photo: string
) => {
  return bcrypt
    .hash(password, salt)
    .then(function(hash) {
      return pool.query(
        "INSERT INTO users (name, email, password, photo) VALUES ($1, $2, $3, $4) returning name, email, photo",
        [name, email, hash, photo]

        //   (error: any, results: any) => {
        //     if (error) {
        //       throw error;
        //     }
        //     return results;
        //   }
      );
    })
    .then(function(res: any) {
      return res.rows;
    })
    .catch((error: any) => {
      throw error;
    });
};

const loginUser = async (email: string, password: string) => {
  const userInfo = await getUserByEmail(email);
  var hashedPassword = userInfo[0].password;
  bcrypt
    .compare(password, hashedPassword)
    .then(function(res: any) {
      return res;
    })
    .catch((error: any) => {
      throw error;
    });
};

const updateUser = (
  id: string,
  name: string,
  email: string,
  password: string,
  photo: string
) => {
  console.log("user data11", id, name, email, password, photo);
  return pool
    .query(
      "UPDATE users SET name = $1, email = $2, password = $3, photo = $4 WHERE id = $5 returning name, email, photo",
      [name, email, password, photo, id]
    )
    .then((res: any) => {
      return res.rows;
    })
    .catch((err: any) => {
      return err;
    });
};

const deleteUserById = (id: number) => {
  console.log("id is here from queries", id);
  return pool
    .query(`DELETE FROM users WHERE id = ${id}`)
    .then((res: any) => {
      console.log("delete by id,", res.rows);
      return res;
    })
    .catch((err: any) => {
      console.log("error/", err);
      return err;
    });
};

module.exports = {
  //   getUsers
  getUserById,
  getUserByEmail,
  loginUser,
  //   PassedPassword,
  createUser,
  updateUser,
  deleteUserById
};
