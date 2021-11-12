require("express-async-errors");
import dotenv from "dotenv";
import express from "express";
import { env } from "process";
import connectDB from "./db/connect";
import notFound from "./middleware/not-found";
import errorHandlerMiddleware from "./middleware/error-handler";
import productsRouter from "./routes/products";

declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      MONGO_URI_04_STORE_API: string;
      PORT: number;
    }
  }
}

dotenv.config();
const app = express();
const port = env.PORT || 5000;

// middleware
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send(`<h1>Store API</h1><a href="/api/v1/products" >products route</a>`);
});

app.use("/api/v1/products", productsRouter);

// products route
app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    // connectDB
    await connectDB(env.MONGO_URI_04_STORE_API);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {}
};
start();
