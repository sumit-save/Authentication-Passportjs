const jwt = require("jsonwebtoken");
const express = require("express");
const passport = require("passport");

const router = new express.Router();

// Signup 
router.post("/signup", passport.authenticate("signup", { session: false }), function (req, res, next) {
    try {
        return res.status(200).json({ message: "signup successfully", user: req.user });
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
});

// Login
router.post("/login", async function (req, res, next) {
    passport.authenticate("login", { session: false }, async function (err, user, info) {
        try {
            if (err || !user) {
                return res.status(400).json({ message: err, user: user });
            }
            const token = await jwt.sign({ _id: user._id, username: user.username }, "SECRET123", { expiresIn: "1h" });
            return res.status(200).json({ message: "login successful", token: token });
        } catch (error) {
            return res.status(400).json(error);
        }
    })(req, res);
});

// Show
router.get("/user", passport.authenticate("jwt", { session: false }), async function (req, res, next) {
    try {
        return res.status(200).json({ user: req.user });
    } catch (error) {
        return res.status(400).json(error);
    }
});

module.exports = router;