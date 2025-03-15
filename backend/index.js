const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors")

const AdminRouter = require("./routers/AdminRoutes")

dotenv.config()
const PORT = process.env.PORT

const app = express()
app.use(cors())
app.use(express.json())


mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("mongo dB connected"))
.catch(()=> console.log("database connected error"))


//add router here
app.use("/api/adminauth", AdminRouter)

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
    
})
