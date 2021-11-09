"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const { readFileSync } = require("fs");
// get all files
// const homePage = readFileSync("./dist/02-express-tutorial/index.html");
const homePage = readFileSync("./dist/02-express-tutorial/navbar-app/index.html");
const homeStyles = readFileSync("./dist/02-express-tutorial/navbar-app/styles.css");
const homeImage = readFileSync("./dist/02-express-tutorial/navbar-app/logo.svg");
const homeLogic = readFileSync("./dist/02-express-tutorial/navbar-app/browser-app.js");
const server = http_1.default.createServer((req, res) => {
    /**
     * Example 1
     */
    //   console.log("user hit the server");
    //   res.end("home page");
    //   console.log(req.method);
    //   console.log(req.url);
    //   console.log(req.headers);
    //   console.log(req.statusCode);
    //   res.writeHead(200, { "content-type": "text/html" });
    //   res.write(`<h1>Home Page.</h1>`);
    //   res.end();
    /**
     * Example 2
     */
    //   const url = req.url;
    //   if (url === "/") {
    //     res.writeHead(200, { "content-type": "text/html" });
    //     res.write(homePage);
    //     res.end();
    //   }
    //   // about page.
    //   else if (url === "/about") {
    //     res.writeHead(200, { "content-type": "text/html" });
    //     res.write(`<h1>About Page.</h1>`);
    //     res.end();
    //   }
    //   // 404
    //   else {
    //     res.writeHead(404, { "content-type": "text/html" });
    //     res.write(`<h1> Page Not Found.</h1>`);
    //     res.end();
    //   }
    /**
     * Example 3
     */
    const url = req.url;
    if (url === "/") {
        res.writeHead(200, { "content-type": "text/html" });
        res.write(homePage);
        res.end();
    }
    // about page.
    else if (url === "/about") {
        res.writeHead(200, { "content-type": "text/html" });
        res.write(`<h1>About Page.</h1>`);
        res.end();
    }
    //   Styles
    else if (url === "/styles.css") {
        res.writeHead(200, { "content-type": "text/css" });
        res.write(homeStyles);
        res.end();
    }
    //   Image
    else if (url === "/logo.svg") {
        res.writeHead(200, { "content-type": "image/svg+xml" });
        res.write(homeImage);
        res.end();
    }
    //   Logic
    else if (url === "/browser-app.js") {
        res.writeHead(200, { "content-type": "text/javascript" });
        res.write(homeLogic);
        res.end();
    }
    // 404
    else {
        res.writeHead(404, { "content-type": "text/html" });
        res.write(`<h1> Page Not Found.</h1>`);
        res.end();
    }
});
server.listen(5000);
