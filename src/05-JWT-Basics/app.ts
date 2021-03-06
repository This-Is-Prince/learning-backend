import dotenv from "dotenv";
dotenv.config();
require("express-async-errors");
import express from "express";
import path from "path";
import { env } from "process";
import mainRouter from "./routes/main";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import notFoundMiddleware from "./middleware/not-found.js";

// App
const app = express();

// middleware
app.use(express.static(path.resolve(__dirname, "./public")));
app.use(express.json());

// Router
app.use("/api/v1", mainRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = env.PORT || 3000;

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
