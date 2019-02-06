const pool = require("./../../db");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);
const authHelper = require("./../auth");

const getUserById = (id: number) => {
  return pool
    .query(`SELECT * FROM users WHERE id = ${id}`)
    .then((res: any) => {
      return res.rows;
    })
    .catch((err: any) => {
      return err;
    });
};

const getAllUsers = (id: number) => {
  return pool
    .query(`SELECT * FROM users`)
    .then((res: any) => {
      console.log("rest", res);
      return res.rows;
    })
    .catch((err: any) => {
      return err;
    });
};

const getUserByEmail = (email: string) => {
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
    .then(hash => {
      return pool.query(
        "INSERT INTO users (name, email, password, photo) VALUES ($1, $2, $3, $4) returning name, email, photo",
        [name, email, hash, photo]
      );
    })
    .then((res: any) => {
      return res.rows;
    })
    .catch((error: any) => {
      throw error;
    });
};

const loginUser = async (email: string, password: string) => {
  const userInfo = await getUserByEmail(email);
  const hashedPassword = userInfo[0].password;

  const match = await bcrypt.compare(password, hashedPassword);

  if (match) {
    const token = await authHelper.encode(userInfo[0]);
    return token;
  } else {
    return match;
  }
};

const updateUser = async (
  id: string,
  name: string,
  email: string,
  password: string,
  photo: string,
  token: string
) => {
  if (!token) {
    return [{ message: "A token is required for this request" }];
  }

  console.log("user data11", id, name, email, password, photo);
  const decoded = await authHelper.decodeToken(token);
  console.log("decoded is here", decoded.email, email);
  if (decoded.email != email) {
    console.log("the emails do not match");
    return [{ message: "you cannot update someone else account" }];
  }
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

const passwordUpdate = async (id: number, newPassword1: string) => {
  return bcrypt
    .hash(newPassword1, salt)
    .then(password => {
      return pool.query(
        "UPDATE users SET password = $1 WHERE id = $2 returning id, name, email",
        [password, id]
      );
    })
    .then((res: any) => {
      return res.rows;
    })
    .catch((error: any) => {
      throw error;
    });
};

const deleteUserById = async (id: number) => {
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
  getUserById,
  getAllUsers,
  getUserByEmail,
  loginUser,
  createUser,
  updateUser,
  deleteUserById,
  passwordUpdate
};
