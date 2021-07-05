console.clear();

import express from "express";
import config from "config";
import connectToDatabase from "./db/connect";
import log from "./logger";
import { healthCheckRoute, userRoutes } from "./routes";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { deserializeUser } from "./middleware";

const port = config.get("port") as number;
const host = config.get("host") as string;

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(deserializeUser);
app.use(cookieParser());

// Routes
app.use(healthCheckRoute);
app.use(userRoutes);

app.listen(port, host, () => {
  log.info(`Server listing at http://${host}:${port}/`);

  connectToDatabase();
});
