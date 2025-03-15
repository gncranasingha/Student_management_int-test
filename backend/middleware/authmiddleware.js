const jwt = require("jsonwebtoken")

const verifyToken = (req , res, next)=>{
    const token = req.headers['authorization']
    if(!token){
        return res.status(400).json({message : "empty token"})
    }

    try {

        const decodeValue = jwt.verify(token, process.env.SECRET)
        res.user = decodeValue
        next()
        
    } 
    catch (error) {
        res.status(403).json({message : "Invalid token"})
    }
}

module.exports = verifyToken