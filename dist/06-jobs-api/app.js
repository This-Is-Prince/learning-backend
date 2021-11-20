"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const process_1 = require("process");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const not_found_1 = __importDefault(require("./middleware/not-found"));
const error_handler_1 = __importDefault(require("./middleware/error-handler"));
const express_1 = __importDefault(require("express"));
const connect_1 = __importDefault(require("./db/connect"));
const authentication_1 = __importDefault(require("./middleware/authentication"));
// Importing Routers
const auth_1 = __importDefault(require("./routes/auth"));
const jobs_1 = __importDefault(require("./routes/jobs"));
// App
const app = (0, express_1.default)();
// Port
const port = process_1.env.PORT || 3000;
// General Middleware
app.use(express_1.default.json());
// All Routes
app.use("/api/v1/auth", auth_1.default);
app.use("/api/v1/jobs", authentication_1.default, jobs_1.default);
// Error Middleware
app.use(not_found_1.default);
app.use(error_handler_1.default);
const start = async () => {
    try {
        // Connecting Database
        await (0, connect_1.default)(process_1.env.MONGO_URI_06_JOBS_API);
        // Setting Server
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}....`);
        });
    }
    catch (error) {
        console.log(error);
    }
};
start();
