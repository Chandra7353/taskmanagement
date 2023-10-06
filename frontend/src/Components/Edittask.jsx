import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams} from 'react-router-dom'

const Edittask = () => {
  let [message, setmessage ]= useState("")

  let [tasklist, settasklist] = useState([])
  // let [tasklist, settasklist] = useState({
  //   title:"",
  //   description:"",
  //   duedate:"",
  //   priority:""
  // })
 let {id}=useParams()
  let navigate =useNavigate()
  
  useEffect(() => {
  async function gettask(){
    try{
      let response= await axios.get(`http://localhost:4500/api/task/task/${id}`,{
        headers:{
          Authorization : "Bearer "+ localStorage.getItem("token")
        }
      })
      console.log(response.data.data);
      settasklist(response.data.data);
    }
    catch(err){
      console.log(err);
    }

  }
  gettask()
  }, [])



  let submittask = async (e)=>{
      let {name, value} = e.target;
      settasklist ({...tasklist ,[name]:value})

  }

  let updatetask  = async (e) => {
    e.preventDefault()
try{
  let response = await axios.put(`http://localhost:4500/api/task/updatetask/${id}`, tasklist, 
   
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
      navigate("/taskdetails")
  }


  return (
    <div>
   
      <div className="addtask">
        <h3>Edit Your Task</h3>
          <h1>{message && message}</h1>
        
        <form action="" onSubmit={updatetask} >
          <input type="text" name="title" placeholder='Title' value={tasklist.title} required onChange={submittask} />
          <input type="date" name="duedate" id=""  value={tasklist.duedate} required onChange={submittask} />
          <input type="text" name='priority' placeholder='Enter task priority' value={tasklist.priority} required onChange={submittask} />
          <textarea name="description" id="" cols="51" rows="5" placeholder='Enter your description' value={tasklist.description} className='textareas'  required onChange={submittask} ></textarea>
          <input type="submit" value="Submit"  id='button' />
        </form>
        
      </div>


    </div>
  )
}
export default Edittask