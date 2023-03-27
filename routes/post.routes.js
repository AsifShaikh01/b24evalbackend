const {postModel} = require("../model/post.model");
const express = require("express");
const postRouter = express.Router();

postRouter.get("/", async(req,res)=>{
try {
    const {userId} = req.body;
    const {device=["Tablet","Laptop","mobile"]} = req.query;
    const posts = await postModel.find({$and:[{userId},{device:{$in:device}}]});
    res.send(posts)
} catch (error) {
    res.send({"msg":error.message})
}
})

postRouter.post("/add",async(req,res)=>{
    try {
        const payload = req.body;
        const newPost = new postModel(payload);
        await newPost.save();
        res.send({"msg":"post added"})
    } catch (error) {
        res.send({"msg":error.message})
    }
})

postRouter.patch("/update/:id",async(req,res)=>{
    try {
        const payload = req.body;
        const id = req.params.id;
        const updatedPost = await postModel.findByIdAndUpdate(id,payload);
        res.send({"msg":"post is updated"})
    } catch (error) {
        res.send({"msg":error.message})
    }
})
postRouter.delete("/delete/:id",async(req,res)=>{
    try {
        
        const id = req.params.id;
        const deletedPost = await postModel.findByIdAndDelete(id);
        if(deletedPost){
            res.send({"msg":"post is deleted"})
        }else{
            res.send("error in deleting")
        }
       
    } catch (error) {
        res.send({"msg":error.message})
    }
})

module.exports = {
    postRouter
}