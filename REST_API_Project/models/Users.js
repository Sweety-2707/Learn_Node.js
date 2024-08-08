const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    first_name:{
      type: String,
      require:true
    },
    last_name:{
      type: String,
      require:true
    },
    email:{
      type: String,
      require:true,
      unique:true
    },
    gender:{
      type: String
    }
  },{timestamps:true});
  
  // create Model(Collection)
const User = mongoose.model('User',UserSchema);

module.exports = User;