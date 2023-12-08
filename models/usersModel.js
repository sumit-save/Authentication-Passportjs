const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

// Users collection schema
const usersSchema = new mongoose.Schema({
    username: { type: String },
    password: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("users", usersSchema);