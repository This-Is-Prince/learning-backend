import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { env } from "process";
import connectDB from "./db/connect";
import PersonRouter from "./routes/person";

// App
const app = express();
const port = env.PORT;

// Middleware
app.use(express.json());
app.use("/api/v1", PersonRouter);

declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      MONGO_URI_PERSON_INFO: string;
    }
  }
}

const start = async () => {
  try {
    await connectDB(env.MONGO_URI_PERSON_INFO);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
