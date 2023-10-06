let express =require("express")
const { addTask, getAllTask, getSingleTask, updateTask, deleteTask, userTasks } =require("../controller/task.controller")
const {auth} =require("../middelwares/authMiddleware")

let router = express.Router()


router.post("/addtask" ,auth,addTask);
router.get("/tasks",auth ,getAllTask);
router.get("/task/:id",auth,getSingleTask);
router.get("/usertask", auth, userTasks)
router.put("/updatetask/:id",auth,updateTask);
router.delete("/deletetask/:id",auth,deleteTask);  


module.exports= router;