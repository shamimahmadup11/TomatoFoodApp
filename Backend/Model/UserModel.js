const mongoose=require("mongoose")
const UserSchema=new mongoose.Schema({
    name :{type:String,required:true}, 
    email:{type:String , required:true},
    password:{type:String,required:true},
    cartData:{type:Object , default:{}}

} , {minimize:false})

const UserModel= new mongoose.model("user" ,UserSchema );

module.exports=UserModel
