const express=require("express")
const dotenv=require("dotenv")
const cors=require("cors")
const router=require("./Routs/Rout");
const userRout=require("./Routs/UserRout")
const CartRout=require("./Routs/CartRout")
const { default: mongoose } = require("mongoose");
const orderRout=require("./Routs/OrderRout")
dotenv.config()
const port = process.env.PORT || 3000;
// server 
const app=express();
// middleware
app.use(express.json());
app.use(cors())
// api routes 
app.use(router)
app.use(userRout)
app.use(CartRout)
app.use(orderRout)
app.use("/image", express.static('uploads'))
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("connected to database")

})
.catch((e)=>{
    console.log(e)
})


// app initailize
app.listen(port , ()=>{
    console.log(`server is running on port ${process.env.PORT}`)
})