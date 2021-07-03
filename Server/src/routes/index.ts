import express, { Router, Request, Response } from "express";

const router: Router = express.Router();

router.get("/healthcheck", (req: Request, res: Response) =>
  res.status(200).json({ message: "API works fine" })
);

export default router;
