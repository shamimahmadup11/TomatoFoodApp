const mongoose=require("mongoose")

 const OrderSchema= new mongoose.Schema({
    userId:{type:String, required:true},
    items:{type:Array , required:true},
    amount:{type:Number , required:true},
    address:{type:Object , required:true},
    status:{type:String , default:"food Processing"},
    date:{type:Date , default:  Date.now()},
    payment:{type:Boolean , default:false}
 })

 const OrderModel= new mongoose.model("order" ,OrderSchema );
 module.exports=OrderModel