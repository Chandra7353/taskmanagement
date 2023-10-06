let Task =require("../models/Task.models")

let addTask=async (req,res,next)=>
{
    try
    {
        let {userid,title,duedate,description,priority}=req.body;
        console.log("userId")
        userid=req.user._id;

        // let task=await Task.create({userId,tname});
        let task=await Task.create({userid,title,duedate,description,priority});


        if(task)
        {
            return res.status(201).json({error:false,message:"Task Added Successfully",data:task})
        }
        return res.status(500).json({error:false,message:"invalid task",data:task})
    }
    catch(err)
    {
        next(err)
    }
}


let getAllTask=async (req,res,next)=>
{
    try
    {
       
        let task=await Task.find({});

        if(!task.length)
        {
            return res.status(404).json({error:true,message:"No Task Available",data:task})
        }
        return res.status(200).json({error:false,message:"Tasks fetched Successfully",data:task})
    }
    catch(err)
    {
        next(err)
    }
}

let getSingleTask=async (req,res,next)=>
{
    try
    {
      
     
        let task=await Task.findOne({_id:req.params.id});
      
        if(task)
        {
            return res.status(200).json({error:false,message:"Task Fetched Successfully",data:task})
        }
        return res.status(404).json({error:true,message:"No Task Found"})
    }
    catch(err)
    {
        next(err)
    }
}

let updateTask=async (req,res,next)=>
{
    try
    {
      let isTaskAvailable=await Task.findOne({_id:req.params.id})

      if(!isTaskAvailable)
      {
        return res.status(404).json({error:true,message:"No Task Found"})
      }
     
        let task=await Task.findOneAndUpdate({_id:req.params.id},{$set:req.body},{new:true,runValidators:true});
        console.log(task);
        return res.status(200).json({error:false,message:"Task Updated Successfully",data:task})   
    }
    catch(err)
    {
        next(err)
    }
}

let deleteTask=async (req,res,next)=>
{
    try
    {
      let isTaskAvailable=await Task.findOne({_id:req.params.id})

      if(!isTaskAvailable)
      {
        return res.status(404).json({error:true,message:"No Task Found"})
      }
     
        let task=await Task.deleteOne({_id:req.params.id});
        return res.status(200).json({error:false,message:"Task Deleted Successfully"})   
    }
    catch(err)
    {
        next(err)
    }
}

let userTasks = async (req, res, next)=>{
    try{
        let userid=req.user._id;
        let userTask = await Task.find({userid});
        if(userTask.length){
            res.status(200).json({error:false, message:"Task found", data:userTask})
        }
        else{
            res.status(404).json({error:true, message:"Task not available"})
        }
    }
    catch(err){
        next(err)
    }
}


module.exports={
    addTask,
    getAllTask,
    getSingleTask,
    updateTask,
    deleteTask,
    userTasks
}