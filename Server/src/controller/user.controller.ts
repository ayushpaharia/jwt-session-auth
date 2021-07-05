import { Request, Response } from "express";
import {
  // get,
  omit,
} from "lodash";
import log from "../logger";
import {
  checkIfUserExists,
  createUser,
  // findAndUpdateUser,
  // findUser,
  getUsers,
} from "../service/user.service";

export async function createUserHandler(req: Request, res: Response) {
  try {
    // 1. Check if user Exists
    if (!checkIfUserExists(req.body))
      return res.send({
        user: omit(req.body.toJSON(), ["password", "passwordConfirmation"]),
        message: "User with this email already exists!",
      });
    // 2. Create a user and hash the password in model
    const user = await createUser(req.body);
    return res.send({
      user: omit(user.toJSON(), "password"),
      message: "User Created!",
    });
  } catch (err) {
    log.error(err);
    res.status(409).send({ user: null, message: err.message });
  }
}

export async function getUserHandler(req: Request, res: Response) {
  try {
    // 1. Find all users
    const users = await getUsers();
    return res.send(
      users.map((item) =>
        omit(item.toJSON(), [
          "password",
          "_id",
          "__v",
          "createdAt",
          "updatedAt",
        ])
      )
    );
  } catch (err) {
    log.error(err);
    res.status(409).send(err.message);
  }
}

// export async function editUserHandler(req: Request, res: Response) {
//   const userId = get(req, "user._id");
//   const update = req.body;

//   const user = await findUser({ email: update.email });

//   if (!user) {
//     return res.sendStatus(404);
//   }

//   if (user._id !== userId) {
//     return res.sendStatus(401);
//   }

//   const updatedUser = await findAndUpdateUser({ userId }, update, {
//     new: true,
//   });

//   return res.send({ user: updatedUser });
// }
