const express = require("express");
const app = express();
const PORT = 8000;
const router = require("./routers/url");
const { mongooseConnection } = require("./connection");
const URL = require("./models/url");
const path = require("path");
const { handleViewAllURL } = require("./controllers/url");

mongooseConnection("mongodb://127.0.0.1:27017/shortURL").then(() =>
  console.log("mongoDB Connected!")
);
app.use(express.json());
app.use(express.urlencoded())
app.set('view engine',"ejs");
app.set("views",path.resolve("./views"))

app.use('/',router)
app.listen(PORT, () => console.log("Server Started!"));
