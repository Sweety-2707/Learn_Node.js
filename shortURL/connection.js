const mongoose = require('mongoose');

async function mongooseConnection(url){
    return mongoose.connect(url);
}

module.exports = {
    mongooseConnection,
}