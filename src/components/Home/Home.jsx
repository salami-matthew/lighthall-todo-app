import React, { useState } from 'react'
import "./Home.css"
import { Link } from 'react-router-dom';

const Home = () => {
  const [name, setName] = useState("");


  return (
    <div className='home'>
      <h1 className='home-title'>Hello!</h1>
      <p>Login to see your tasks</p>
      <form autoComplete='off' className='login-form' action='/' method='POST'>
        <label className='home-label'>Name</label>
        <input name='name' ></input>
        <button className='login-btn' type='button'><Link to="/todo"><span>Login</span></Link></button>
      </form>
    </div>
  )
}

export default Home