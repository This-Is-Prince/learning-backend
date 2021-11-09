"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 5000;
// ALl methods in express order matters
// 1.get method then all method
app.get("/", (req, res) => {
    console.log("user hit the resource");
    res.status(200).send("Home Page.");
});
app.get("/about", (req, res) => {
    res.status(200).send("About Page.");
});
app.all("*", (req, res) => {
    res.status(404).send("<h1>Resource Not Found.</h1>");
});
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
// app.get
// app.post
// app.put
// app.delete
// app.all
// app.use
// app.listen
