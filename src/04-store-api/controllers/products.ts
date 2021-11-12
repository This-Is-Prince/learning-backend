import { RequestHandler } from "express";
import Product from "../models/product";

const getAllProductsStatic: RequestHandler = async (req, res) => {
  // const products = await Product.find({});
  // const products = await Product.find({ featured: true });
  const products = await Product.find({ name: "vase table" });
  res.status(200).json({ products, nbHits: products.length });
};

type PropertyType = boolean | string;

interface QueryObjectType {
  [key: string]: PropertyType;
}

const getAllProducts: RequestHandler = async (req, res) => {
  const { featured, company } = req.query;
  // const products = await Product.find(req.query);
  let queryObject: QueryObjectType = {};
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) {
    if (typeof company === "string") {
      queryObject.company = company;
    }
  }
  console.log(queryObject);
  const products = await Product.find(queryObject);
  res.status(200).json({ products, nbHits: products.length });
};
export { getAllProducts, getAllProductsStatic };
