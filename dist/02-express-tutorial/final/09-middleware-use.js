"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logger_1 = __importDefault(require("../logger"));
const authorize_1 = __importDefault(require("../authorize"));
const app = (0, express_1.default)();
const port = 5000;
// req => middleware => res
/**
 * 1.way to add middleware to all routes
 */
// app.get("/", logger, (req, res) => {
//   res.send("Home");
// });
// app.get("/about", logger, (req, res) => {
//   res.send("About");
// });
// app.get("/api/products", logger, (req, res) => {
//   res.send("Products");
// });
// app.get("/api/items", logger, (req, res) => {
//   res.send("Items");
// });
/**
 * 2.way to add middleware to all routes
 */
// app.use Order matters
// < ----- Apply to All Routes ----- >
// app.use(logger);
// < ----- Apply to custom routes ----- >
// app.use("/api", logger);
// < ----- added more middleware ----- >
// middleware function order matters in array if authorize is at index 0 and logger is at index 1 then authorize run first
// app.use([logger, authorize]);
app.get("/", (req, res) => {
    res.send("Home");
});
// now home route cannot have logger middleware
// app.use(logger);
app.get("/about", (req, res) => {
    res.send("About");
});
app.get("/api/products", (req, res) => {
    res.send("Products");
});
app.get("/api/items", [logger_1.default, authorize_1.default], (req, res) => {
    console.log(req.user);
    res.send("Items");
});
app.listen(port, () => {
    console.log(`Server is listening on port ${port}....`);
});
