"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const notFoundHandler_1 = __importDefault(require("./middleware/notFoundHandler"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const process_1 = require("process");
// App
const app = (0, express_1.default)();
const port = process_1.env.PORT || 3000;
app.use(express_1.default.json());
app.use(notFoundHandler_1.default);
app.use(errorHandler_1.default);
const start = async () => {
    try {
        //   await connectDB(env.MONGO_URI_07_FILE_UPLOAD);
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}...`);
        });
    }
    catch (error) {
        console.log(error);
    }
};
start();
