const mongoose = require("mongoose")


const StudentSchema = new mongoose.Schema({
    sid : {
        type: String,
        required : true,
        unique: true,
    },
    name : {
        type: String,
        required : true,
    },
   email:{
    type:String,
    required : true
   },
   age : {
    type:Number,
    required : true
   },
    image : {
        type: String,
       
    },
    status: {
        type: String,
        enum: ["Active", "Inactive"],
        default: "Active",
        required: true
    }
})

module.exports = mongoose.model("Student", StudentSchema)

