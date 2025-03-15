const mongoose = require("mongoose")
const { type } = require("os")

const StudentSchema = new mongoose.Schema({
    Sid : {
        type: String,
        required : true,
    },
    name : {
        type: String,
        required : true,
    },
    image : {
        type: file,
        required : true,
    },
    Sid : {
        type: String,
        required : true,
    },
    Sid : {
        type: String,
        required : true,
    },
})