
const UserModel=require("../Model/UserModel")
const cartRouter = require("../Routs/CartRout")
const addCartData=async(req , res)=>{

    try{
        let userData= await UserModel.findById(req.body.userId)
           let cartData=await userData.cartData
           if(! cartData[req.body.itemId]){
            cartData[req.body.itemId]=1
           }
           else{
            cartData[req.body.itemId]+=1
           }
           await UserModel.findByIdAndUpdate(req.body.userId , {cartData})

           res.status(200).json({
            succes:true ,
            message:"cart data added successfully",
            data:cartData,
            error:false
           })
    }
    catch(e){
        res.json({
            succes:false ,
            message:"error",
            data:null ,
        })
    }
}
const getCartData=async(req , res)=>{
    try{

        let userData= await UserModel.findById(req.body.userId)
        let cartData=await userData.cartData
        res.status(200).json({
            succes:true ,
            message:"cart data fetched successfully",
            data:cartData,
            error:false

        })
    }catch(e){
        res.status(404).json({
            succes:false ,
            message:"cart data not found",
            data:null 

        })
    }
  
}

const removeCart=async(req , res)=>{
    try{
        let userData=await UserModel.findById(req.body.userId);
        let cartData=await userData.cartData
        if(cartData[req.body.itemId]<0){
            delete cartData[req.body.itemId]
        }
        else{  
            cartData[req.body.itemId]-=1   
        }
        await UserModel.findByIdAndUpdate(req.body.userId , {cartData})
        res.status(200).json({
            succes:true ,
            message:"cart data removed successfully",
            data:cartData,
            error:false}
        )  
}catch(e){
    res.json({
        succes:false ,
        message:"error",
        data:null ,
    })
}
}

const cartController={
    addCartData,
    getCartData,
    removeCart
}

module.exports=cartController