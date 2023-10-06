import React from 'react'

import HomeBanner from "../Assets/homeb.png"

const Home = () => {
  return (
    <div className='mainhome' >
      
        <div className="homepage">

        <div className="hometext">
            <h1>TIME MANAGEMENT</h1>
            <p>Keep track of all your task assignments, activities, and time logs across projects. Use the 'My Work' section to stay on top of all tasks assigned to you, sorted by deadlines</p>
        </div>
        <div className="homebody">
            <img src={HomeBanner} alt="" />
        </div>
        </div>
    </div>
  )
}

export default Home