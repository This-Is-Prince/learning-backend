import express from "express";
import path from "path";
import connect from "./db/connect";
import dotenv from "dotenv";
import { env } from "process";
import router from "./routes/tasks";
dotenv.config();

const app = express();
const port = 3000;

declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      MONGO_URI_03_TASK_MANAGER: string;
    }
  }
}

// Middleware
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "./public")));

app.use("/api/v1/tasks", router);

const start = async () => {
  try {
    await connect(env.MONGO_URI_03_TASK_MANAGER);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}....`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
