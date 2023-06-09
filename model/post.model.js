const mongoose = require("mongoose");


const PostSchema = mongoose.Schema({
    title:{type : String , required:true},
    body:{type : String , required:true},
    device:{type : String , required:true , enum:["Laptop","Tablet","Mobile"]},
    no_of_comments:{type :Number , required:true},
    // userId:{type:String , required:true}
})

const postModel = mongoose.model("post",PostSchema);

module.exports={
    postModel
}