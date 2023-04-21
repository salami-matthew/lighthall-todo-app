import React, { useState } from 'react'
import "./ToDoItem.css"
import { AiFillCloseSquare, AiFillEdit } from "react-icons/ai";
import { IconContext } from "react-icons";

const ToDoItem = (props) => {
  // let date = new Date();
  // let today = date.toLocaleDateString();
  const [isChecked, setIsChecked] = useState(false);

  // for toggle button
  const [status, setStatus] = useState({
    title: "Not Started",
    background: "#ff5252"
  });

  // toggle button
  function toggleStatus(event) {
    switch (status.title) {
      case "Not Started":
        setStatus({
          title: "In Progress",
          background: "#002950"
        });
        break;
      case "In Progress":
        setStatus({
          title: "Completed",
          background: "green"
        });
        break;
      case "Completed":
        setStatus({
          title: "Not Started",
          background: "#ff5252"
        });
        break;
      default:
        setStatus({
          title: "Not Started",
          background: "#002950"
        });
    };
  };

  function strikeThrough() {
    setIsChecked(!isChecked);
  };

  function handleClick() {
    props.onDelete(props.id);
  };

  return (
    <div className='todo-item-container' style={{ display: (props.statusFilter === status.title) || (props.statusFilter !== "All") && "none" }}>


      <div className='left-section'>
        <input id='check-box' onClick={strikeThrough} type='checkbox' />
        <span style={{ textDecoration: isChecked === true && "line-through" }}>
          <p className='todo-item-title'>{props.title}</p>
          <p className='todo-item-content'>{props.description}</p>
        </span>

      </div>




      <div className='right-section'>
        <span className='date-status'>
          <p>{props.date}</p>
          <div style={{ backgroundColor: status.background }} onClick={toggleStatus} className='status'>{status.title}</div>
        </span>



        <div className='action-icons'>
          <IconContext.Provider value={{ color: "#FF5858", size: "1.5rem" }}>
            <span onClick={handleClick}><AiFillCloseSquare /></span>
          </IconContext.Provider>
          <IconContext.Provider value={{ size: "1.5rem" }}>
            <span onClick={() => { props.onEdit(); }}><AiFillEdit /></span>
          </IconContext.Provider>

        </div>
      </div>
    </div>
  )
}

export default ToDoItem