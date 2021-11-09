"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const app = (0, express_1.default)();
//  req => middleware => res
// app.use([logger, authorize])
// app.use(express.static('./public'))
app.use((0, morgan_1.default)("tiny"));
app.get("/", (req, res) => {
    res.send("Home");
});
app.get("/about", (req, res) => {
    res.send("About");
});
app.get("/api/products", (req, res) => {
    res.send("Products");
});
app.get("/api/items", (req, res) => {
    console.log(req.user);
    res.send("Items");
});
app.listen(5000, () => {
    console.log("Server is listening on port 5000....");
});
