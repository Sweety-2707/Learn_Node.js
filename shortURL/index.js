const express = require("express");
const app = express();
const PORT = 8000;
const router = require("./routers/url");
const restrictedRouter = require("./routers/restrictedURL")
const { mongooseConnection } = require("./connection");
const URL = require("./models/url");
const path = require("path");
const cookieParser = require("cookie-parser");
const { restrictLoggedInUser } = require("./middlewares/auth");

mongooseConnection("mongodb://127.0.0.1:27017/shortURL").then(() =>
  console.log("mongoDB Connected!")
);
app.use(express.json());
app.use(express.urlencoded())
app.use(cookieParser());
app.set('view engine',"ejs");
app.set("views",path.resolve("./views"))

app.use('/user',router);
app.use('/',restrictLoggedInUser,restrictedRouter);
app.listen(PORT, () => console.log("Server Started!"));
