"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const process_1 = require("process");
const connect_1 = __importDefault(require("./db/connect"));
const not_found_1 = __importDefault(require("./middleware/not-found"));
const person_1 = __importDefault(require("./routes/person"));
// App
const app = (0, express_1.default)();
const port = process_1.env.PORT;
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.resolve(__dirname, "./public")));
app.use("/api/v1", person_1.default);
app.use(not_found_1.default);
const start = async () => {
    try {
        await (0, connect_1.default)(process_1.env.MONGO_URI_PERSON_INFO);
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}...`);
        });
    }
    catch (error) {
        console.log(error);
    }
};
start();
