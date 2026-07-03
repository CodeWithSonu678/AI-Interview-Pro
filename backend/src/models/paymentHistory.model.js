const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    plan:{
        type:String,
        enum:["pro","premium"],
        required:true
    },

    amount:{
        type:Number,
        required:true
    },

    orderId:{
        type:String,
        required:true
    },

    paymentId:{
        type:String,
        required:true
    },

    signature:{
        type:String,
        required:true
    },

    status:{
        type:String,
        enum:["success","failed"],
        default:"success"
    }

},{timestamps:true})

const paymentModel = mongoose.model("Payment",paymentSchema);

module.exports = paymentModel;