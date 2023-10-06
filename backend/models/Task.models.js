const  mongoose =require("mongoose")
const  user =require("./SignupAuth.models.js")

let taskSchema = new mongoose.Schema({
    title:
    {
     type:String,
     required:true
    },
    description:{
        type:String,
     required:true

    },
    duedate:{
        type:String,
     required:true
    },
    priority:{
        type:String,
     required:true
    },
    userid:{
      type:String,
      required:true

    }
 
})

module.exports = new mongoose.model("task",taskSchema)