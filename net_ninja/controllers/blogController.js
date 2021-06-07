const Blog = require("../models/blog");

const blog_index = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("blogs/index", { title: "home", blogs: result });
    })
    .catch((err) => console.log(err));
};

const blog_create_post = (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((err) => console.log(err));
};

const blog_creta_get = (req, res) => {
  res.render("blogs/create", { title: "create a new blog" });
};

const blog_detail = (req, res) => {
  const id = req.params.id;
  //console.log(id);
  Blog.findById(id)
    .then((result) => {
      res.render("blogs/details", { title: "Blog detail", blog: result });
    })
    .catch((err) => {
      res.status(404).render("404", { title: "Blog not found" });
    });
};

const blog_delete = (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => console.log(err));
};

module.exports = {
  blog_index,
  blog_creta_get,
  blog_create_post,
  blog_detail,
  blog_delete,
};
