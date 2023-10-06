const Users =require("../models/SignupAuth.models.js")
const jwt = require('jsonwebtoken')
const bcryptjs =require("bcryptjs");

 



let signupuser = async (req,res,next)=>{
    try{
        let {name, email, password}= req.body;
        let isUser = await Users.findOne({email})
        if(!isUser){
            let createUser = await Users.create({name, email, password})
            return res.status(200).json({error:false, message:"Account created sucessfully", data:{name:createUser.name, email:createUser.email}})
        }
        return res.status(404).json({ error: true, message: "User already exists" })
    }
    catch(err){
        next(err)
    }
}




let LoginUser = async (req, res, next) => {


    try {

        let { email, password } = req.body;

        let isavailable = await Users.findOne({ email })

        if (!isavailable) {

            return res.status(300).json({ error: true, message: "Given email id not found any User",  })
        }

        //comparing hash password
        let haspassword = await isavailable.compareMypassword(password)
      
        if (haspassword) {


            // JWT Token generation
            let tokengenerator = jwt.sign({ email:isavailable.email, name:isavailable.name, _id:isavailable._id },
                process.env.JWT_KEY, { expiresIn: process.env.JWT_EXPIRESIN })
              
            return res.status(201).json({ error: false, message: "User login sucessfuly", data:tokengenerator, isavailable })

        }
        else {
            return res.status(401).json({ error: true, message: "invalied password" })
        }

    }

    catch (err) {
        next(err)
    }

}


let Passwordreset = async (req, res, next)=>{
    try{
        let {email,password} = req.body;

        let isuserAvailable = await Users.findOne({email});

        if(!isuserAvailable){
            return res.status(404).json({error:true, message:`user detail not found with email id ${email}`})
        }
        let salt = await bcryptjs.genSalt(10); //length of encrypted password
        let hashedPassword = await bcryptjs.hash(password, salt);
        let updateduser = await Users.findOneAndUpdate({email}, {password:hashedPassword}, {new:true})
        console.log()
        return res.status(200).json({error:false, message:`Password updated successfully`, data:{email,name:updateduser.name}})
        
    }
    catch(err){
        next(err);
    }
}

let singleuser = async (req,res,next)=>{
    try{
        let {id}=req.params;

        let getsingleuser = await Users.findOne({_id:id})

        if(getsingleuser){
            return res.status(200).json({error:false, message:"sucessfully get data", data:getsingleuser})
        }

        return res.status(400).json({error:true, message:"no data found" })

    }
    catch(err){
        next(err)
    }
}











module.exports= {
    signupuser,
    LoginUser,
    singleuser,
    Passwordreset,
   
}