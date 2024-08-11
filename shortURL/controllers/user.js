const User = require("../models/user");
const {v4:uuid} = require("uuid");
const { setUser, getUser } = require("../services/auth");

async function handleUserSignUp(req,res){
    const {name,email,password} = req.body;
    await User.create({
        name,
        email,
        password
    });
    return res.render("signup",{
        msg:"SignUp Successfull!"
    })
}

async function userSignUp(req,res){
    return res.render("signup");
}

async function userLogin(req,res){
    return res.render("login");
}

async function handleUserLogin(req,res){
    const {email,password} = req.body;
    const user = await User.findOne({email,password});
    if(!user){
        return res.render("login",{
            msg:"Incorect Email or password"
        })
    }

    const sessionId = uuid();
    setUser(sessionId,user);
    res.cookie("uid",sessionId);
    console.log(getUser(sessionId),sessionId);
    
    return res.redirect("/");
}

module.exports={
    handleUserSignUp,
    userSignUp,
    userLogin,
    handleUserLogin,
}