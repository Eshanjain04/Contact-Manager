const app = require("./app");
require("dotenv").config();
const port = process.env.PORT || 8080;
const url = process.env.DATABASE_URL
const mongoose = require("mongoose");
mongoose.connect(url,()=>console.log("DB is connected"))

app.listen(port,()=>console.log("Server is running at "+port));