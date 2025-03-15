const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const Admin = require("../models/Admin")



const AdminRrgister = async (req , res) => {

    const {name, email, password} = req.body
   
    try {

        const existUser = await Admin.findOne({email})

        if(existUser){
            return(
                res.status(400).json({message : "User Already exists"})
            )
        }

        const hashPassword = await bcrypt.hash(password, 10)

        let user = new Admin({
            name : name,
            email : email,
            password : hashPassword
        })
        
        await user.save()
        res.status(201).json({massage : "User saved"})
    } 
    catch (error) {
        res.status(500).json({massage : "Server error", error})
    }

}

const AdminLogin = async (req , res)=>{

    const {email, password} = req.body

    try {

        const existingUser = await Admin.findOne({email})

        if(!existingUser){
            return (
                res.status(404).json({message : "User Not Found"})
            )
        }

        const isConfirmed = await bcrypt.compare(password, existingUser.password)

        if(!isConfirmed){
            return(
                res.status(401).json({message : "Password is wrong"})
            )
        }

        const token = jwt.sign({
            userId : existingUser._id,
            email : existingUser.email
        },process.env.SECRET, {expiresIn: '5h'})

        res.status(200).json({token: token, message : "User Logged...!"})


        
    } 
    catch (error) {
        res.status(500).json({message : "Server error: ", error})
    }

}

module.exports = {AdminRrgister, AdminLogin}