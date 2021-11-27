require("express-async-errors");
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./db/connect";
import notFoundHandler from "./middleware/notFoundHandler";
import errorHandler from "./middleware/errorHandler";
import { env } from "process";

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

// App
const app = express();
const port = env.PORT || 3000;

app.use(express.json());
app.use(notFoundHandler);
app.use(errorHandler);

const start = async () => {
  try {
    //   await connectDB(env.MONGO_URI_07_FILE_UPLOAD);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
