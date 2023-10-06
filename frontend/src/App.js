
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './Components/Signup';
import Login from './Components/Login';
import Home from './Components/Home';
import Resetpassword from './Components/Resetpassword';
import Task from './Components/Task';
import Tasklist from './Components/Tasklist';
import Edittask from './Components/Edittask';
import Pnf from './Components/Pnf';
import Navbar from './Components/Navbar';




function App() {
  return (
    <BrowserRouter>
  
    <div className="App">
    <Navbar/>
    <Routes>
    
      <Route path='/' element={<Home/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/resetpass' element={<Resetpassword/>} />
      <Route path='/task' element={<Task/>} />
      <Route path='/taskdetails' element={<Tasklist/>} />
      <Route path='/edittask/:id' element={<Edittask/>} />
      <Route path='*' element={<Pnf/>} /> {/* wildcard*/}
    

    </Routes>
    
    </div>
    </BrowserRouter>
  );
}

export default App;
