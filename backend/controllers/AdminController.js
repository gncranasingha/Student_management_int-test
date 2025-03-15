const bcrypt = require("bcrypt")

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

module.exports = {AdminRrgister}