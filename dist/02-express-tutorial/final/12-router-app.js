"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const people_1 = __importDefault(require("../routes/people"));
const auth_1 = __importDefault(require("../routes/auth"));
const app = (0, express_1.default)();
const port = 5000;
// static assets
app.use(express_1.default.static(path_1.default.resolve(__dirname, "./methods-public")));
// parse from data
app.use(express_1.default.urlencoded({ extended: false }));
// parse json
app.use(express_1.default.json());
app.use("/api/people", people_1.default);
app.use("/login", auth_1.default);
app.listen(port, () => {
    console.log(`Server is listening on port ${port}....`);
});
