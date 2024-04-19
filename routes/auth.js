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
      username: req.body.username.trim(),
      email: req.body.email.trim(),
    });
    await User.register(user, req.body.password.trim());
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

// Login Route
router.post("/login", async (req, res) => {
  try {
    const username = req.body.username.trim(); // Trim whitespace from username
    req.body.username = req.body.username.trim(); // Trim whitespace from username

    const password = req.body.password.trim(); // Trim whitespace from password
    req.body.password = req.body.password.trim(); // Trim whitespace from password

    // Validate username
    if (!username) {
      throw new Error("Username is required.");
    }
    if (!/\S/.test(username)) {
      throw new Error("Username cannot be whitespace only.");
    }

    // Validate username
    if (!password) {
      throw new Error("Password is required.");
    }
    if (!/\S/.test(password)) {
      throw new Error("Password cannot be whitespace only.");
    }

    // Authenticate user
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        throw err;
      }

      if (!user) {
        req.flash("error", "Incorrect username or password.");
        return res.redirect("/login");
      }
      req.logIn(user, (err) => {
        if (err) {
          throw err;
        }
        req.flash("success", `Welcome Back!! ${username}`);
        return res.redirect("/");
      });
    })(req, res);
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/login");
  }
});

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
