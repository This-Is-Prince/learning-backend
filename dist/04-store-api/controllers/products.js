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
    let { featured, company, name, sort, select, limit, page, numericFilters } = req.query;
    // const products = await Product.find(req.query);
    let queryObject = {};
    if (featured) {
        queryObject.featured = featured === "true" ? true : false;
    }
    if (company) {
        if (typeof company === "string") {
            queryObject.company = company;
        }
    }
    if (name) {
        if (typeof name === "string") {
            queryObject.name = { $regex: name, $options: "i" };
        }
    }
    if (numericFilters) {
        if (typeof numericFilters === "string") {
            const operatorMap = {
                ">": "$gt",
                ">=": "$gte",
                "=": "$eq",
                "<": "$lt",
                "<=": "$lte",
            };
            const regEx = /\b(<|>|>=|=|<|<=)\b/g;
            let filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`);
            const options = ["price", "rating"];
            filters.split(",").forEach((item) => {
                const [field, operator, value] = item.split("-");
                if (options.includes(field)) {
                    queryObject[field] = { [operator]: Number(value) };
                }
            });
        }
    }
    let result = product_1.default.find(queryObject);
    if (sort) {
        if (typeof sort === "string") {
            sort = sort.split(",").join(" ");
            result = result.sort(sort);
        }
    }
    if (select) {
        if (typeof select === "string") {
            select = select.split(",").join(" ");
            result = result.select(select);
        }
    }
    // Limit and skip
    let limitValue = Number(limit) || 5;
    let pageValue = Number(page) || 1;
    // Pagination
    result = result.skip((pageValue - 1) * limitValue).limit(limitValue);
    let products = await result;
    res.status(200).json({ products, nbHits: products.length });
};
exports.getAllProducts = getAllProducts;
