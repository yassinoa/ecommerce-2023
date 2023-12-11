
const mongoose =require("mongoose")

const connectToDatabase= async()=>{
 try {
      const connect =await mongoose.connect(process.env.MONGO_URL)
    console.log(`MONGODB connected : ${connect.connection.host}`)
  } catch (error) {
    console.log(`Error : ${error.message}`)
  }
}
module.exports=connectToDatabase ;