const express=require("express")
require("dotenv").config();
require('./config/dbconnection')
const cors =require("cors")
const task = require("./router/task.routes.js")
const signuproutes =require("./router/signupAuth.routes.js")


let app =express()
app.use(express.json())
app.use(cors())
app.use(express.static('./public'))

app.use("/api/task",task)
app.use("/api/users", signuproutes)


// if user enter wrong url on the given  this will execute
app.use("*", (req, res, next)=>{
    res.status(404).json("Page n found")
 })

//Error handlin middleware
 app.use((err,req, res, next)=>{
    res.status(400).json({error:true, message:err.message,data:"error data !!!!!!!!!!!!!"})
 })

app.listen(process.env.PORT, ()=>{
    console.log(`server running sucessfully ${process.env.PORT}`);
} )