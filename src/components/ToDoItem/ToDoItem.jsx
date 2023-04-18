import React, { useState } from 'react'
import "./ToDoItem.css"
import { AiFillCloseSquare, AiFillEdit } from "react-icons/ai";
import { IconContext } from "react-icons";

const ToDoItem = (props) => {
  // let date = new Date();
  // let today = date.toLocaleDateString();
  const [isChecked, setIsChecked] = useState(false);

  function strikeThrough() {
    setIsChecked(!isChecked);
  };

  function handleClick() {
    props.onDelete(props.id);
  };

  return (
    <div className='todo-item-container'>


      <div className='left-section'>
        <input onClick={strikeThrough} type='checkbox' />
        <span style={{ textDecoration: isChecked === true && "line-through" }}>
          <p className='todo-item-title'>{props.title}</p>
          <p className='todo-item-content'>{props.description}</p>
        </span>

      </div>




      <div className='right-section'>
        <span className='date-status'>
          <p>{props.date}</p>
          <div className='status'>Not Started</div>
        </span>



        <div className='action-icons'>
          <IconContext.Provider value={{ color: "#FF5858", size: "1.5rem" }}>
            <span onClick={handleClick}><AiFillCloseSquare /></span>
          </IconContext.Provider>
          <IconContext.Provider value={{ size: "1.5rem" }}>
            <span><AiFillEdit /></span>
          </IconContext.Provider>

        </div>
      </div>
    </div>
  )
}

export default ToDoItem