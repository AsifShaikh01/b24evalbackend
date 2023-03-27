const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authenticator = async (req,res,next)=>{
    try {
        let token = req?.headers?.authorization;
        if(!token){
            return res.send({"msg":"Not authorized"});
        }
        token = req.headers.authorization.split(" ")[1];
        const validToken = await jwt.verify(token,process.env.jwt_key);

        if(!validToken){
            return res.send({"msg":"Not authorized"})
        }
        req.body.userId = validToken.userId;
        next();
    } catch (error) {
        console.log(error);
        return res.send({"msg":error.message})
    }
}

module.exports = {
    authenticator
}