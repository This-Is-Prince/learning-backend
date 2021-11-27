require("express-async-errors");
import dotenv from "dotenv";
dotenv.config();

// App
import express from "express";
const app = express();

// Database
import connectDB from "./db/connect";

// All Errors Handler
import notFoundHandler from "./middleware/notFoundHandler";
import errorHandler from "./middleware/errorHandler";

// Env
import { env } from "process";
const port = env.PORT || 3000;

declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      PORT: string;
      MONGO_URI_07_FILE_UPLOAD: string;
      JWT_SECRET: string;
      JWT_LIFETIME: string;
    }
  }
}

app.use(express.json());

// Error Handler Middleware
app.use(notFoundHandler);
app.use(errorHandler);

const start = async () => {
  try {
    await connectDB(env.MONGO_URI_07_FILE_UPLOAD);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
