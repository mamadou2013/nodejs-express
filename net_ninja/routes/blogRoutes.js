const express = require("express");
const blogController = require("../controllers/blogController");
const router = express.Router();
//blogs routes
router.get("/blogs", blogController.blog_index);

//route of blogs creation
router.post("/blogs", blogController.blog_create_post);
router.get("/blogs/create", blogController.blog_creta_get);
router.get("/blogs/:id", blogController.blog_detail);
router.delete("/blogs/:id", blogController.blog_delete);

router.get("/about", (req, res) => {
  //res.sendFile("./views/about.html", { root: __dirname });
  res.render("about", { title: "about" });
});

module.exports = router;
