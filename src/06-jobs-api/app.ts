require("express-async-errors");
import { env } from "process";
import dotenv from "dotenv";
dotenv.config();

// extra security Packages
import helmet from "helmet";
import cors from "cors";
// import * as xss from 'xss';
import xss from "xss-clean";
import rateLimiter from "express-rate-limit";

import notFound from "./middleware/not-found";
import errorHandlerMiddleware from "./middleware/error-handler";
import express from "express";
import connectDB from "./db/connect";
import authenticateUser from "./middleware/authentication";

// Importing Routers
import authRouter from "./routes/auth";
import jobsRouter from "./routes/jobs";

// Env Type merging
declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      MONGO_URI_06_JOBS_API: string;
      JWT_LIFETIME: string;
      JWT_SECRET: string;
    }
  }
}

// App
const app = express();
// Port
const port = env.PORT || 3000;

// General Middleware
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());
app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, //15 minutes
    max: 100, //limit each IP to 100 request per windowMs
  })
);

// All Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobsRouter);

// Error Middleware
app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    // Connecting Database
    await connectDB(env.MONGO_URI_06_JOBS_API);
    // Setting Server
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}....`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
