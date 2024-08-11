const express = require("express");
const { handleUserSignUp, userSignUp, userLogin, handleUserLogin } = require("../controllers/user");

const router =express.Router();

router.get('/signup',userSignUp)

router.post('/signup',handleUserSignUp)

router.get("/login",userLogin)

router.post("/login",handleUserLogin)

module.exports=router;