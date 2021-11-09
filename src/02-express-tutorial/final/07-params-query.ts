import express from "express";
import { products } from "../data";

const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.send(`<h1>Home Page</h1><a href='/api/products' >Products</a>`);
});

app.get("/api/products", (req, res) => {
  const newProducts = products.map((product) => {
    const { id, name, image } = product;
    return { id, name, image };
  });
  res.json(newProducts);
});

// app.get("/api/products/1", (req, res) => {
//   const newProducts = products.find((product) => {
//     return product.id === 1;
//   });
//   res.json(newProducts);
// });

app.get("/api/products/:productID", (req, res) => {
  let { productID } = req.params;
  const newProducts = products.find((product) => {
    return product.id === Number(productID);
  });
  if (newProducts) {
    res.json(newProducts);
  } else {
    res.status(404).send("Product Does Not Exist");
  }
});

app.get("/api/products/:productID/reviews/:reviewID", (req, res) => {
  console.log(req.params);
  res.send("Hello World");
});

app.get("/api/v1/query", (req, res) => {
  //   console.log(req.query);
  const { search, limit } = req.query;
  let sortedProducts = [...products];

  if (search) {
    sortedProducts = sortedProducts.filter((product) => {
      if (typeof search === "string") {
        return product.name.startsWith(search);
      } else {
        return false;
      }
    });
  }
  if (limit) {
    sortedProducts = sortedProducts.slice(0, Number(limit));
  }
  if (sortedProducts.length < 1) {
    // res.status(200).send("no products matched your search");
    res.status(200).json({ success: true, data: [] });
  } else {
    res.status(200).json({ success: true, data: sortedProducts });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}....`);
});
