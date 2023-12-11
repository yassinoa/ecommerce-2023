const express=require("express")
const app=express()
const dotenv=require('dotenv')
dotenv.config()
const connectToDatabase=require("./database.js")
const userRoutes = require("./routes/UserRoutes.js")
const  categoryRoutes  = require("./routes/CategoryRoutes.js")
const productRoutes  = require("./routes/productRoutes.js")
const path=require("path")

connectToDatabase()

app.use(express.json())

const port=process.env.PORT || 5001

app.use('/api/users',userRoutes)
app.use('/api/categorys',categoryRoutes)
app.use("/api/products",productRoutes)
// app.use("/api/orders", orderRoutes)


if (process.env.NODE_ENV === 'production') {
  console.log("hi")
  app.use(express.static(path.join(path.resolve(), '/client/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(path.resolve(), 'client', 'build', 'index.html'))
  );

}


app.listen(port,()=>{
  console.log(`Server is running on port ${port}`)
})