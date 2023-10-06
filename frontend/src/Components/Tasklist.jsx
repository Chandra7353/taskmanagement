import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Tasklist = () => {
  const [list, setList] = useState([]);
  let navigate=useNavigate()



  useEffect(()=>{
listoftask()

  },[])
  
  let listoftask = async()=>{
    try{
      let {data:{data}} = await axios.get("http://localhost:4500/api/task/usertask",{
        headers:{
          Authorization : "Bearer "+ localStorage.getItem("token")
        }
      })
      console.log(data);
      setList(data);
    }
    catch(err){
      console.log(err);
    }
  }

 
  let navigateToUpdateTask=(id)=>
  {
      console.log(id);
      navigate(`/edittask/${id}`)
  }

  let deleteid = async (id)=>{

    try{
      let delteddata = await axios.delete(`http://localhost:4500/api/task/deletetask/${id} `,{
        headers:{
          Authorization : "Bearer "+ localStorage.getItem("token")
        }
      })
      console.log(delteddata);
      alert(delteddata.data.message)
      navigate("/taskdetails")
      window.location.reload()
    }
    catch(err){
      console.log(err);
    }
   

  }

  return (
    <div>
      
      <div className='listdetails'>
            {list.map((show )=>
            {
                return (
                 
                     <li type="1" key={show._id}> 
                     <h5>Title</h5> {show.title}
                     <h5>Duedate</h5> {show.duedate}
                     <h5>Priority</h5> {show.priority} 
                     <h5>Description</h5>{show.description} <br />
                     <button onClick={()=>{navigateToUpdateTask(show._id)}}>Update</button>
                     <button onClick={()=>{deleteid(show._id)}} >Delete</button>
                      
                      </li>
                
             
                  
                
                )
            })}
        </div>
     
    </div>
  );
};

export default Tasklist;
