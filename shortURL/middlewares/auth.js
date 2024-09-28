const { getUser } = require("../services/auth");

async function restrictLoggedInUser(req,res,next){
    const userId = req.cookies?.uid;
    
    if(!userId){
        return res.redirect('/user/login');
    }

    const user = getUser(userId)

    if(!user){
        return res.redirect('/user/login');
    }

    req.user=user;        
    next();
}

function restrictAccess(roles=[]){
    return function(req,res,next){
        if(!req.user) return res.redirect('/user/login');
        if(!roles.includes(req.user.role)){
            
            return res.redirect("/?message=You are not Authorized!",);
        }
        return next();
    }
}

module.exports ={
    restrictLoggedInUser,
    restrictAccess,
}