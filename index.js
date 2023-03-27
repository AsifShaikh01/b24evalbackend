const express = require("express");
const cors = require("cors");
const {connection} = require("./config/db");
const {userRouter} = require("./routes/user.routes")
const {postRouter} = require("./routes/post.routes");
const {authenticator} = require("./middleware/authenticator.middleware")
const dotenv = require("dotenv");
dotenv.config();



const app = express();

app.use(express.json());
app.use(cors());
app.get("/",(req,res)=>{
    res.send("Home Page")
})
app.use("/users",userRouter)
app.use("/posts",authenticator);
app.use("/posts",postRouter)


app.listen(process.env.port , async()=>{
    try {
        await connection
        console.log("connected to db")
    } catch (error) {
        console.log(error)
    }console.log(`Server is running at port ${process.env.port}`)
})