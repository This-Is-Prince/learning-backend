"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const process_1 = require("process");
const connect_1 = __importDefault(require("./db/connect"));
const authHandler_1 = __importDefault(require("./middleware/authHandler"));
const not_found_1 = __importDefault(require("./middleware/not-found"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const auth_1 = __importDefault(require("./routes/auth"));
const jobs_1 = __importDefault(require("./routes/jobs"));
// App
const app = (0, express_1.default)();
const port = process_1.env.PORT || 3000;
// Middleware
app.use(express_1.default.json());
// Routes
app.use("/api/v1/auth", auth_1.default);
app.use("/api/v1/jobs", authHandler_1.default, jobs_1.default);
// Handling errors in routes
app.use(not_found_1.default);
app.use(errorHandler_1.default);
const start = async () => {
    try {
        await (0, connect_1.default)(process_1.env.MONGO_URI_06_JOBS_API_MINE);
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}...`);
        });
    }
    catch (error) {
        console.log(error);
    }
};
start();
