const express = require("express");
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

const loginCheck = () => {
  return (req, res, next) => {
    if (req.session.user) next();
    else res.redirect("/login");
  };
};

router.get("/secret", loginCheck(), (req, res) => {
  res.render("secret");
});

/*
router.get("/secret", (req, res) => {
  if (req.session.user) {
    res.render("secret");
  } else {
    res.redirect("/login");
  }
});
*/
module.exports = router;
