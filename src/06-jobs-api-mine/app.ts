require("express-async-errors");
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { env } from "process";
import connectDB from "./db/connect";
import notFound from "./middleware/not-found";
import errorHandler from "./middleware/errorHandler";
import authRoute from "./routes/auth";
import jobsRoute from "./routes/jobs";

declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      PORT: string;
      MONGO_URI_06_JOBS_API_MINE: string;
      JWT_SECRET: string;
      JWT_LIFETIME: string;
    }
  }
}

// App
const app = express();
const port = env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/jobs", jobsRoute);

// Handling errors in routes
app.use(notFound);
app.use(errorHandler);

const start = async () => {
  try {
    await connectDB(env.MONGO_URI_06_JOBS_API_MINE);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
