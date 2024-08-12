const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
    {
        shortURL:{
            type:String,
            required:true,
            unique:true,
        },
        requiredURL:{
            type:String,
            required:true,
        },
        history:[
            {timestamp:Number}
        ],
        createdBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user",
        },
    },
    {timestamps:true}
);

const URL = mongoose.model("url",urlSchema);

module.exports =URL;