import express from "express";
import path from "path";
import connect from "./db/connect";
import dotenv from "dotenv";
import { env } from "process";
dotenv.config();

const app = express();
const port = 3000;

declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      MONGO_URI: string;
    }
  }
}

// Middleware
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "./public")));

const start = async () => {
  try {
    await connect(env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}....`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();