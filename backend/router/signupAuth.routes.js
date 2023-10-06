const express =require("express");
const { signupuser, LoginUser, Passwordreset,  singleuser } = require("../controller/signupAuth.controller");


let routes = express.Router();




routes.post("/signup", signupuser)
routes.post("/login", LoginUser)
routes.get("/singleuser/:id", singleuser)
routes.put("/resetpassword", Passwordreset)




module.exports= routes