const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product");

const app = express();

const databaseURL =
  "mongodb+srv://netninja:test12345@nodetuts.ko0mx.mongodb.net/node-fruit?retryWrites=true&w=majority";

//connection to the database
mongoose
  .connect(databaseURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("connected successfully");
    app.listen(2000);
  })
  .catch((err) => console.log(err));

const fruits = [];

//register the view engine
app.set("view engine", "pug");

//middleware & static files
app.use(express.static("public"));

//creation of the routes
app.get("/", (req, res) => {
  Product.find()
    .sort()
    .then((result) => {
      res.render("index", { fruit: result });
    })
    .catch((err) => console.log(err));
});

app.get("/add-product", (req, res) => {
  const product = new Product({
    name: "orange",
    price: 15,
    picture: "/images/orange.jpg",
    reference: "R0001",
  });

  product
    .save()
    .then((result) => {
      res.send(result);
      res.end();
    })
    .catch((err) => console.log(err));
});

app.get("");
