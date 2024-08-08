const express = require("express");

const {Connection} =require("./connection");

const {logReqRes} = require("./middlewares/User.js");

const router = require("./routers/User.js");

const port = 8000;
const fs = require("fs");
const app = express();

//MondoDB Connection
Connection("mongodb://127.0.0.1:27017/Users")
.then(()=>console.log("MongoDB Connected")
);

//Middleware - Plugin
//Built-in Middleware
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log("Middleware 1");
  next();
});

app.use(logReqRes("log.txt"));

// JSON rendering
app.use("/",router);


app.listen(port, () => {
  console.log(`Server Started!`);
});
