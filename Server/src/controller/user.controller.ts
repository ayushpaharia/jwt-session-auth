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
    if (!checkIfUserExists(req.body))
      return res.send({ message: "User with this email already exists!" });

    const user = await createUser(req.body);
    return res.send(omit(user.toJSON(), "password"));
  } catch (err) {
    log.error(err);
    res.status(409).send(err.message);
  }
}

export async function getUserHandler(req: Request, res: Response) {
  try {
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
