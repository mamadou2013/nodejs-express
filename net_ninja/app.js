const express = require("express");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");

const app = express();

//set the view engine
app.set("view engine", "ejs");

//the middleware of the app
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(blogRoutes);

const dbURL =
  "mongodb+srv://netninja:test12345@nodetuts.ko0mx.mongodb.net/node-blog?retryWrites=true&w=majority";

mongoose
  .connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("connected successfully!");
    app.listen(1550);
  })
  .catch((err) => console.log(err));

// the main route
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
