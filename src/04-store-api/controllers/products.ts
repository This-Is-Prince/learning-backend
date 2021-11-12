import { RequestHandler } from "express";
import Product from "../models/product";

const getAllProductsStatic: RequestHandler = async (req, res) => {
  // const products = await Product.find({});
  // const products = await Product.find({ featured: true });
  const products = await Product.find({ name: "vase table" });
  res.status(200).json({ products, nbHits: products.length });
};

interface QueryObjectType {
  [key: string]: boolean;
}

const getAllProducts: RequestHandler = async (req, res) => {
  const { featured } = req.query;
  // const products = await Product.find(req.query);
  let queryObject: QueryObjectType = {};
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  console.log(queryObject);
  const products = await Product.find(queryObject);
  res.status(200).json({ products, nbHits: products.length });
};
export { getAllProducts, getAllProductsStatic };
