import React, { useState } from 'react'
import "./Filter.css"

const Filter = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [statusButton, setStatusButton] = useState({
    title: "Status",
    background: "#38414a"
  });

  function handleClick(event) {
    const { name } = event.target;
    switch (name) {
      case "completed":
        setStatusButton({
          title: "Completed",
          background: "#2C6AA3"
        })
        break;
      case "inProgress":
        setStatusButton({
          title: "In Progress",
          background: "#5EB1FF"
        })
        break;
      case "notStarted":
        setStatusButton({
          title: "Not Started",
          background: "#002950"
        })
        break;
      case "none":
        setStatusButton({
          title: "Status",
          background: "#38414a"
        });
        break;

      default:
        setStatusButton((prevValues) => {
          return { ...prevValues };
        });
    }
    setIsClicked(!isClicked);
  }



  return (
    <div className='filter'>
      <p>Filter</p>
      <input className='search-bar' type='text' name='searchBar' />
      <div className='dropdown'>
        <button style={{ backgroundColor: statusButton.background }} onClick={handleClick} className='filter-btn'>{statusButton.title}</button>
        <div className='dropdown-content' style={{ display: isClicked === true && "block" }}>
          <button onClick={handleClick} name='completed' className='completed'>Completed</button>
          <button onClick={handleClick} name='inProgress' className='in-progress'>In Progress</button>
          <button onClick={handleClick} name='notStarted' className='not-started'>Not Started</button>
          <button onClick={handleClick} name='none' className='none'>🚫 None</button>
        </div>
      </div>
      <label>Due date</label>
      <input type='date' />
    </div>
  )
}

export default Filter