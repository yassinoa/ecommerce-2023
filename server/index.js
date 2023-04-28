const express=require("express")
const app=express()
const dotenv=require('dotenv')
dotenv.config()
const connectToDatabase=require("./database.js")
const userRoutes = require("./routes/UserRoutes.js")
const  categoryRoutes  = require("./routes/CategoryRoutes.js")
const productRoutes  = require("./routes/productRoutes.js")

connectToDatabase()

app.use(express.json())

const port=process.env.PORT || 5001

app.use('/api/users',userRoutes)
app.use('/api/categorys',categoryRoutes)
app.use("/api/products",productRoutes)
// app.use("/api/orders", orderRoutes)

app.listen(port,()=>{
  console.log(`Server is running on port ${port}`)
})