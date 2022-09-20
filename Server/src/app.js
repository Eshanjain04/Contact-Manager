const express = require("express");
const app = express();
const loginRoutes = require("./routers/loginRoutes");
const contactRoutes = require("./routers/contactsRoutes");

app.use("/login",loginRoutes);
app.use("/contact",contactRoutes);


module.exports = app;