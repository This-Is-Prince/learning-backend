"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const data_1 = require("./data");
const app = (0, express_1.default)();
const port = 5000;
// static assets
app.use(express_1.default.static(path_1.default.resolve(__dirname, "./methods-public")));
app.get("/api/people", (req, res) => {
    res.status(200).json({ success: true, data: data_1.people });
});
app.listen(port, () => {
    console.log(`Server is listening on port ${port}....`);
});
