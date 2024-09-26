const jwt=require("jsonwebtoken")
const authMiddleware=async(req , res , next)=>{
const token=req.headers.token
// console.log(req.headers)
// console.log(token)
if(!token){
    return res.status(401).json({ 
            succes:false,
            message:"Not Authorized Login Again",
            error:"Unauthorized"
        })
    }
        try{
            const decoded=jwt.verify(token, process.env.JWT_SECRET)
           req.body.userId=decoded.id
           next()
        }
catch(r){
    return res.status(500).json({
        succes:false,
        message:"Internal Server Error",
        error:r.message
        })
    }

}

module.exports=authMiddleware