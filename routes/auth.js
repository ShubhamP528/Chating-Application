const express = require("express");
const router = express.Router();
const User = require("../model/user");
const passport = require("passport");

router.get("/register", (req, res) => {
  res.render("auth/signup");
});

router.post("/register", async (req, res) => {
  try {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
    });
    await User.register(user, req.body.password);
    req.flash("success", "Registered Successfully login and start");
    passport.authenticate("local", {
      failureRedirect: "/register",
      failureFlash: true,
    });
    res.redirect("/login");
  } catch (e) {
    req.flash("error", `${e.message}`);
    res.redirect("/register");
  }
});

router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  async (req, res) => {
    try {
      console.log(await User.find({ username: "shubham" }));
      req.flash("success", `Welcome Back!! ${req.user.username}`);
      res.redirect("/");
    } catch (e) {
      req.flash("error", `${e.message}`);
      res.redirect("/login");
    }
  }
);

router.get("/logout", (req, res) => {
  try {
    req.logOut(() => {
      req.flash("success", "logged out successfully");
      res.redirect("/login");
    });
  } catch (e) {
    req.flash("error", `${e.message}`);
    res.redirect("/error");
  }
});

module.exports = router;
