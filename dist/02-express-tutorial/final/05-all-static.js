"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = 5000;
app.use(express_1.default.static(path_1.default.resolve(__dirname, "./navbar-app")));
// app.get("/", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "./navbar-app/index.html"));
// // adding to static assets
// // SSR
// });
app.all("*", (req, res) => {
    res.status(404).send("resource not found.");
});
app.listen(port, () => {
    console.log(`Server is listening on port ${port}....`);
});
