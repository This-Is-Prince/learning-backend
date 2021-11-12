import { RequestHandler } from "express";

const getAllProductsStatic: RequestHandler = async (req, res) => {
  throw new Error("testing async error handlers");
  res.status(200).json({ msg: "products testing route" });
};
const getAllProducts: RequestHandler = async (req, res) => {
  res.status(200).json({ msg: "products route" });
};
export { getAllProducts, getAllProductsStatic };
