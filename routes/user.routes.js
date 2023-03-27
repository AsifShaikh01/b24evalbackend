
const {UserModel} = require("../model/user.model");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const userRouter = express.Router();

userRouter.post("/register" , async(req,res)=>{
     try {
        const payload = req.body;
        const user = await UserModel.findOne({email:payload.email});
        if(user){
            return res.send({"msg":"User already exist, please login"})
        }else{
            const hashedPassword = await bcrypt.hashSync(payload.password , 8);
            payload.password = hashedPassword;
            const newUser = new UserModel(payload);
            await newUser.save();
           return res.send({"msg":"User Registered Successfully"})
        }
     } catch (error) {
        console.log(error)
         res.send({"msg":error.message})
     }
})
userRouter.post("/login" , async(req,res)=>{
    try {
       const payload = req.body;
       const user = await UserModel.findOne({email:payload.email});
       if(!user){
           res.send({"msg":"Please Signup"})
       }
       const isPasswordCorrect = await bcrypt.compareSync(payload.password , user.password , ()=>{});
       if(isPasswordCorrect){
        const token = await jwt.sign({email:user.email},process.env.jwt_key);
        res.send({"msg":"Login Successfull" , token});

       }else{
        res.send({"msg":"Invalid Credentials"})
       }
    } catch (error) {
        console.log(error)
        res.send({"msg":error.message})
    }
})

module.exports={
    userRouter
}