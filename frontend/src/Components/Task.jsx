import React, { useEffect,  useState } from 'react'

import axios from "axios";

import { Link } from "react-router-dom"



const Task = () => {
  let [message, setmessage ]= useState("")
  let [tasklist, settasklist] = useState({
    title:"",
    description:"",
    duedate:"",
    priority:""
  })
 
  
  
  useEffect(() => {

    localStorage.getItem("token")

   
  }, [])

  let submittask = async (e)=>{
      let {name, value} = e.target;
      settasklist ({...tasklist ,[name]:value})

  }

  let updatetask  = async () => {
try{
  let response = await axios.post ('http://localhost:4500/api/task/addtask', tasklist, 
   
  {
   
  headers:{
      Authorization :"Bearer " + localStorage.getItem("token")
    }
  } 
  )
    settasklist(response.data)
    setmessage(response.data.message)
}
      
      catch(error){
        console.log(error);
        console.log(error.response.data.message);
        setmessage(error.response.data.message)
       
        
      }

      setTimeout(() => {
         setmessage("")
         
      },8000);
      // navigate("/task")
  }


  return (
    <div>
   
      <div className="addtask">
        <h3>Add Your Task</h3>
          <h1>{message && message}</h1>
        <form action="" onSubmit={updatetask} >
          <input type="text" name="title" placeholder='Title' required onChange={submittask} />
          <input type="date" name="duedate" id=""  required onChange={submittask} />
          <input type="text" name='priority' placeholder='Enter task priority' required onChange={submittask} />
          <textarea name="description" id="" cols="51" rows="5" placeholder='Enter your description' className='textareas'  required onChange={submittask} ></textarea>
          <input type="submit" value="Submit"  id='button' />
        </form>
        <Link to="/taskdetails" >View List</Link>
      </div>


    </div>
  )
}

export default Task 


