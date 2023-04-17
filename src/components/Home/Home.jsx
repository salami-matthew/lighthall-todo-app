import React from 'react'
import "./Home.css"
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='home'>
      <h1 className='home-title'>Hello!</h1>
      <p>Login to see your tasks</p>
      <form className='login-form' action='/' method='post'>
        <label className='home-label'>Name</label>
        <input></input>
        <button className='login-btn' type='button'><Link to="/todo">Login</Link></button>
      </form>
    </div>
  )
}

export default Home