require("express-async-errors");
import { env } from "process";
import dotenv from "dotenv";
dotenv.config();
import notFound from "./middleware/not-found";
import errorHandlerMiddleware from "./middleware/error-handler";
import express from "express";
import connectDB from "./db/connect";

// Env Type merging
declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      MONGO_URI_06_JOBS_API: string;
    }
  }
}

// App
const app = express();
// Port
const port = env.PORT || 3000;

// Middleware
app.use(express.json());

app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(env.MONGO_URI_06_JOBS_API);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}....`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
