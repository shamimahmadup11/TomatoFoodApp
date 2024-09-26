
const FoodModel=require("../Model/FoodModel")
const ListFood=async(req , res)=>{

    try{
        const food=await FoodModel.find({})
        res.status(200).json({
            success:true,
            data:food
        })


    }catch(e){
        res.json({
            status: false,
            message: e.message
        })
    }
}

module.exports=ListFood
