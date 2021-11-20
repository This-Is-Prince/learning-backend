require("express-async-errors");
import { env } from "process";
import dotenv from "dotenv";
dotenv.config();
import notFound from "./middleware/not-found";
import errorHandlerMiddleware from "./middleware/error-handler";
import express from "express";
import connectDB from "./db/connect";

// Importing Routers
import authRouter from "./routes/auth";
import jobsRouter from "./routes/jobs";

// Env Type merging
declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      MONGO_URI_06_JOBS_API: string;
      JWT_LIFETIME: string;
    }
  }
}

// App
const app = express();
// Port
const port = env.PORT || 3000;

// General Middleware
app.use(express.json());

// All Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", jobsRouter);

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
