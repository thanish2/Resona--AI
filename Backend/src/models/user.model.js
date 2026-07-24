const mongoose = require("mongoose");

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        uniqe:[true,"Username already exists"],
        required:true,
    },

    email:{
        type:String,
        uniqe:[true,"Email already exists"],
        required:true,
    },

    password:{
        type:String,
        required:true,
    },
})

const userModel=mongoose.model("users",userSchema);


module.exports=userModel