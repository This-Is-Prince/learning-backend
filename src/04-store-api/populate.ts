import dotenv from "dotenv";
import { env } from "process";
import connectDB from "./db/connect";
import Product from "./models/product";
dotenv.config();
import jsonProducts from "./products.json";

const start = async () => {
  try {
    await connectDB(env.MONGO_URI_04_STORE_API);
    await Product.deleteMany();
    await Product.create(jsonProducts);
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
start();
