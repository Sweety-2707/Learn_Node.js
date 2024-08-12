//statefull auth-sessionid (for short time)
// const sessionIdToMap = new Map();

//stateless auth-token (for longer time)
const jwt = require("jsonwebtoken")
const secretKey = "Sweety@123"

function setUser(user){
    // sessionIdToMap.set(id,user);   //statefull auth
    return jwt.sign({
        id:user._id,
        email:user.email,
        role:user.role,
    },secretKey);
}

function getUser(token){
    // return sessionIdToMap.get(id);  //statefull auth
    if(!token) return null;
    try {
        return jwt.verify(token,secretKey)       
    } catch (error) {
        return null;
    }
}

module.exports={
    setUser,
    getUser,
}