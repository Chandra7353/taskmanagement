import React, { useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from "axios"


const Login = () => {
   let navigate = useNavigate()

   let email = useRef()
   let password = useRef()

   let handlelogin = (e) => {
      e.preventDefault()


      let data = JSON.stringify({
         email: email.current.value,
         password: password.current.value
      });

      let config = {
         method: 'post',
         maxBodyLength: Infinity,
         url: 'http://localhost:4500/api/users/login',
         headers: {
            'Content-Type': 'application/json',
            'Cookie': 'JSESSIONID=67AA1C331E5507A16C0744FEC261739E'
         },
         data: data
      };

      axios.request(config)
         .then((response) => {
            console.log(JSON.stringify(response.data.data));
            console.log(response.data.data);
           
            localStorage.setItem("token", response.data.data)
            alert(response.data.message)
            navigate("/")
         })
         .catch((error) => {
            console.log(error.response.data);
            alert(error.response.data.message)
         });

   }



   return (
      <div>
      
         <div className="mainbody">

            <div className="content">
               <div className="text">
                  Login Form
               </div>
               <form action="#">
                  <div className="field">
                     <input type="text" name="email" required ref={email} />
                     <span className="fas fa-user"></span>
                     <label>Email</label>
                  </div>
                  <div class="field">
                     <input type="password" password="password" required ref={password} />
                     <span className="fas fa-lock"></span>
                     <label>Password</label>
                  </div>
                  <div className="forgot-pass">
                     <Link to="/resetpass">Forgot Password?</Link>
                  </div>
                  <button onClick={handlelogin} >Login</button>
                  <div className="sign-up">
                     Not a member?
                     <Link to="/signup" >signup now</Link>
                  </div>
               </form>
            </div>
         </div>
      </div>

   )
}

export default Login