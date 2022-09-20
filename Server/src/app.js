const express = require("express");
const app = express();
const loginRoutes = require("./routers/loginRoutes");
const contactRoutes = require("./routers/contactsRoutes");
const registerRoutes = require("./routers/registerRoute")


app.use("/login",loginRoutes);
app.use("/contact",contactRoutes);
app.use("/register",registerRoutes)

module.exports = app;