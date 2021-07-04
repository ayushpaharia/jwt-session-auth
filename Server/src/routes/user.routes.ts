import express, { Router, Response } from "express";
import {
  createUserHandler,
  // editUserHandler,
  getUserHandler,
} from "../controller/user.controller";
import requiresUser from "../middleware/requiresUser";
import validateRequest from "../middleware/validateRequest";
import { createUserSchema, editUserSchema } from "../schema/user.schema";

const userRoutes: Router = express.Router();

/**
 * @route   GET /api/users
 * @desc    Creates user
 */
userRoutes.post(
  "/api/users",
  validateRequest(createUserSchema),
  createUserHandler
);

/**
 * @route   GET /api/users
 * @desc    Gets a list of users
 */
userRoutes.get("/api/users", getUserHandler);

// TODO: Create user session logic and attach logged in user id to req.user as decoded access token
// /**
//  * @route   PUT /api/users
//  * @desc    Gets a list of users
//  */
// userRoutes.put(
//   "/api/users",
//   [validateRequest(editUserSchema), requiresUser],
//   editUserHandler
// );

export default userRoutes;
