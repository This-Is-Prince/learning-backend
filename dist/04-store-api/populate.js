"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const process_1 = require("process");
const connect_1 = __importDefault(require("./db/connect"));
const product_1 = __importDefault(require("./models/product"));
dotenv_1.default.config();
const products_json_1 = __importDefault(require("./products.json"));
const start = async () => {
    try {
        await (0, connect_1.default)(process_1.env.MONGO_URI_04_STORE_API);
        await product_1.default.deleteMany();
        await product_1.default.create(products_json_1.default);
        process.exit(0);
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
};
start();
