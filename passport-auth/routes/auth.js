const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");

const User = require("../models/User");

const router = express.Router();

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.use((req, res, next) => {
  if (req.user) {
    res.redirect("/");
  } else {
    next();
  }
});

router.get("/github", passport.authenticate("github"));

router.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    successRedirect: "/",
    failureRedirect: "/login"
  })
);

router.get("/facebook", passport.authenticate("facebook"));

router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/login"
  })
);

router.get("/signup", (req, res) => {
  res.render("auth/signup");
});

router.get("/login", (req, res) => {
  res.render("auth/login", { errorMessage: req.flash("error") });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
  })
);

router.post("/signup", (req, res) => {
  const { username, password } = req.body;

  if (!password || !username) {
    res.render("auth/signup", { errorMessage: "Both fields are required" });

    return;
  } else if (password.length < 8) {
    res.render("auth/signup", {
      errorMessage: "Password needs to be 8 characters min"
    });

    return;
  }

  User.findOne({ username: username })
    .then(user => {
      if (user) {
        res.render("auth/signup", {
          errorMessage: "This username is already taken"
        });

        return;
      }
      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync(password, salt);

      return User.create({
        username,
        password: hash
      }).then(data => {
        res.redirect("/");
      });
    })
    .catch(err => {
      res.render("views/signup", { errorMessage: err._message });
    });
});

module.exports = router;
