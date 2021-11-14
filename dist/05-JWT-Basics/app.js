"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const process_1 = require("process");
const main_1 = __importDefault(require("./routes/main"));
const error_handler_js_1 = __importDefault(require("./middleware/error-handler.js"));
const not_found_js_1 = __importDefault(require("./middleware/not-found.js"));
// App
const app = (0, express_1.default)();
// middleware
app.use(express_1.default.static(path_1.default.resolve(__dirname, "./public")));
app.use(express_1.default.json());
// Router
app.use("/api/v1", main_1.default);
app.use(not_found_js_1.default);
app.use(error_handler_js_1.default);
const port = process_1.env.PORT || 3000;
const start = async () => {
    try {
        app.listen(port, () => console.log(`Server is listening on port ${port}...`));
    }
    catch (error) {
        console.log(error);
    }
};
start();
