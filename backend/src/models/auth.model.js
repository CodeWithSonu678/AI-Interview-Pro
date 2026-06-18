const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:false,
    },

    googleId:{
        type:String,
        required:true
    },

    avatar:{
        type:String,
    },

    provider:{
        type: String,
        enum: ["local", "google"],
        default: "local"
    }

},{timestamps:true});

const authModel = mongoose.model("User",authSchema);

module.exports = authModel;