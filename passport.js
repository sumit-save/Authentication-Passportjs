const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const jwtStrategy = require("passport-jwt").Strategy;
const extractJwt = require("passport-jwt").ExtractJwt;
const usersModel = require("./models/usersModel");

// Signup strategy fields
const signupStrategyFields = {
    usernameField: "username",
    passwordField: "password"
};

// Login strategy fields
const loginStrategyFields = {
    usernameField: "username",
    passwordField: "password"
};

// Authorization strategy fields
const authorizationStrategyFields = {
    jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "SECRET123"
};

// Signup strategy callback
const signupStrategyCallback = async function (username, password, done) {
    try {
        const user = await usersModel.create({ username: username, password: password });
        if (user) { return done(null, user) };
    } catch (error) {
        done(error);
    }
};

// Login strategy callback
const loginStrategyCallback = async function (username, password, done) {
    try {
        const user = await usersModel.findOne({ username: username, password: password });
        if (!user) { return done("username and password not matched", false); }
        return done(null, user, { message: "logged in successfully" });
    } catch (error) {
        return done(error);
    }
};

// Authorization strategy callback
const authorizationStrategyCallback = async function (payload, cb) {
    try {
        const user = await usersModel.findOne({ _id: payload._id });
        if (user) { return cb(null, user); }
        else { return cb("user not found", false); }
    } catch (error) {
        return done(error);
    }
};

// Signup strategy
passport.use("signup", new localStrategy(signupStrategyFields, signupStrategyCallback));
// Login strategy
passport.use("login", new localStrategy(loginStrategyFields, loginStrategyCallback));
// Authorization strategy
passport.use("jwt", new jwtStrategy(authorizationStrategyFields, authorizationStrategyCallback));
