"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const process_1 = require("process");
const connect_1 = __importDefault(require("./db/connect"));
const not_found_1 = __importDefault(require("./middleware/not-found"));
const error_handler_1 = __importDefault(require("./middleware/error-handler"));
const products_1 = __importDefault(require("./routes/products"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process_1.env.PORT || 5000;
// middleware
app.use(express_1.default.json());
// routes
app.get("/", (req, res) => {
    res.send(`<h1>Store API</h1><a href="/api/v1/products" >products route</a>`);
});
app.use("/api/v1/products", products_1.default);
// products route
app.use(not_found_1.default);
app.use(error_handler_1.default);
const start = async () => {
    try {
        // connectDB
        await (0, connect_1.default)(process_1.env.MONGO_URI_04_STORE_API);
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}...`);
        });
    }
    catch (error) { }
};
start();
