import React, { useState, useEffect } from 'react'
import "./Home.css"
import { Link } from 'react-router-dom';
import { db } from '../../../firebase-config.js';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';

const Home = () => {
  const [name, setName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (name) {
      const userQuery = query(collection(db, 'Users'), where('name', '==', name));
      const userRef = await getDocs(userQuery);
      if (userRef.empty) {
        await addDoc(collection(db, 'Users'), { name, tasks: [] });
      }
    }
  };

  return (
    <div className='home'>
      <h1 className='home-title'>Hello!</h1>
      <p>Login to see your tasks</p>
      <form autoComplete='off' className='login-form' onSubmit={handleSubmit}>
        <label className='home-label'>Name</label>
        <input name='name' value={name} onChange={(e) => setName(e.target.value)} />
        <button className='login-btn' type='submit'><Link to={`/todo?name=${encodeURIComponent(name)}`} ><span>Login</span></Link></button>
      </form>
    </div>
  )
}

export default Home