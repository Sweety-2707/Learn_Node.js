require('dotenv').config()
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const router = require("./routers/url");
const restrictedRouter = require("./routers/restrictedURL")
const { mongooseConnection } = require("./connection");
const URL = require("./models/url");
const path = require("path");
const cookieParser = require("cookie-parser");
const { restrictLoggedInUser } = require("./middlewares/auth");

mongooseConnection(process.env.MONGO_URL).then(() =>
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
