const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
require("dotenv/config");
require("./passport");
const PORT = process.env.PORT || 8000;

const app = express();

// Middleware
app.use(bodyparser.json());

// Routes
const usersRoutes = require("./routes/users");
app.use("/users", usersRoutes);

// Create Database Connection With MongoDB
(async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("MongoDB Database Connected Successfully");
    } catch (error) {
        console.log("Unable To Connect MongoDB Database");
        console.log(error);
    }
})();

// Create Server On Localhost:8000
(async () => {
    try {
        await app.listen(PORT);
        console.log(`Server Started On Localhost:${PORT}`);
    } catch (error) {
        console.log(`Unable To Start Server On Localhost:${PORT}`);
        console.log(error);
    }
})();