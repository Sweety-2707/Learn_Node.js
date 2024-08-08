const mongoose = require("mongoose");

async function Connection(url){
    return mongoose.connect(url);
}

module.exports ={
    Connection,
}