"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProductsStatic = exports.getAllProducts = void 0;
const getAllProductsStatic = async (req, res) => {
    throw new Error("testing async error handlers");
    res.status(200).json({ msg: "products testing route" });
};
exports.getAllProductsStatic = getAllProductsStatic;
const getAllProducts = async (req, res) => {
    res.status(200).json({ msg: "products route" });
};
exports.getAllProducts = getAllProducts;
