import { Request, Response } from "express";
import { validatePassword } from "../service/user.service";
import {
  createAccessToken,
  createSession,
  findSessions,
  updateSession,
} from "../service/session.service";
import config from "config";
import { sign } from "../utils/jwt.utils";
import { get } from "lodash";

export async function createUserSessionHandler(req: Request, res: Response) {
  // Validate email and password
  const user = await validatePassword(req.body);

  if (!user) return res.status(401).send("Invalid username or password");

  // Create a session
  const session = await createSession(user._id, req.get("user-agent") || "");

  // Create an access token
  const accessToken = await createAccessToken({
    user,
    session,
  });

  // Create refresh token
  const refreshToken = sign(session, {
    expiresIn: config.get("refreshTokenTtl"),
  });
  // Send refresh and access token back to user
  // Refresh token as a cookie and accessToken as a response
  // return res.send({ accessToken, refreshToken });

  let options = {
    maxAge: 1000 * 60 * 60 * 24 * 365, // would expire after 1 year
    httpOnly: true, // The cookie only accessible by the web server
    signed: true, // Indicates if the cookie should be signed
  };
  return res
    .status(200)
    .send({ accessToken })
    .cookie("refreshToken", refreshToken, options);
}

export async function invalidateUserSessionHandler(
  req: Request,
  res: Response
) {
  const sessionId = get(req, "user.session");

  await updateSession({ _id: sessionId }, { valid: false });

  return res.sendStatus(200);
}

export async function getUserSessionsHandler(req: Request, res: Response) {
  const userId = get(req, "user._id");

  const sessions = await findSessions({ user: userId, valid: true });

  return res.send(sessions);
}
