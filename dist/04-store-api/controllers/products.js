"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProductsStatic = exports.getAllProducts = void 0;
const product_1 = __importDefault(require("../models/product"));
const getAllProductsStatic = async (req, res) => {
    // const products = await Product.find({});
    // const products = await Product.find({ featured: true });
    const products = await product_1.default.find({ name: "vase table" });
    res.status(200).json({ products, nbHits: products.length });
};
exports.getAllProductsStatic = getAllProductsStatic;
const getAllProducts = async (req, res) => {
    const { featured } = req.query;
    // const products = await Product.find(req.query);
    let queryObject = {};
    if (featured) {
        queryObject.featured = featured === "true" ? true : false;
    }
    console.log(queryObject);
    const products = await product_1.default.find(queryObject);
    res.status(200).json({ products, nbHits: products.length });
};
exports.getAllProducts = getAllProducts;
