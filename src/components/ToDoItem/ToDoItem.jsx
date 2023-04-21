import React, { useState, useEffect } from 'react'
import "./ToDoItem.css"
import { AiFillCloseSquare, AiFillEdit } from "react-icons/ai";
import { IconContext } from "react-icons";
import { collection, doc, getDocs, updateDoc, query, where } from 'firebase/firestore';
import { db } from '../../../firebase-config.js';

const ToDoItem = (props) => {
  // let date = new Date();
  // let today = date.toLocaleDateString();
  const [isChecked, setIsChecked] = useState(false);

  // for toggle button
  const [status, setStatus] = useState({
    title: "Not Started",
    background: "#ff5252"
  });

  useEffect(() => {
    // Fetch the task from the database and update the status state
    const fetchTask = async () => {
      try {
        const userQuery = query(collection(db, 'Users'), where('name', '==', props.name));
        const userRef = await getDocs(userQuery);
        const userDoc = userRef.docs[0];
        const userTasks = userDoc.data().tasks;
        const taskIndex = userTasks.findIndex((_, index) => index === props.id);

        if (taskIndex !== -1) {
          const task = userTasks[taskIndex];
          setStatus({
            title: task.status,
            background: getStatusBackground(task.status)
          });
          setIsChecked(task.status === 'Completed');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchTask();
  }, [props.name, props.id]);

  const getStatusBackground = (status) => {
    switch (status) {
      case 'Not Started':
        return '#ff5252';
      case 'In Progress':
        return '#002950';
      case 'Completed':
        return 'green';
      default:
        return '#002950';
    }
  };

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
          background: "green",
        });
        setIsChecked(true);
        break;
      case "Completed":
        setStatus({
          title: "Not Started",
          background: "#ff5252"
        });
        setIsChecked(false);
        break;
      default:
        setStatus({
          title: "Not Started",
          background: "#002950"
        });
    };
  };

  function handleClick() {
    props.onDelete(props.id);
  };

  async function updateTask(id, newStatus) {
    try {
      const userQuery = query(collection(db, 'Users'), where('name', '==', props.name));
      const userRef = await getDocs(userQuery);
      const userDoc = userRef.docs[0];
      const userTasks = userDoc.data().tasks;
      const taskIndex = userTasks.findIndex((_, index) => index === id);
  
      // Update the status in the taskToEdit object
      const taskToEdit = { ...userTasks[taskIndex] };
      taskToEdit.status = newStatus;
  
      const updatedTasks = [...userTasks];
      updatedTasks[taskIndex] = taskToEdit;
  
      await updateDoc(doc(db, 'Users', userDoc.id), {
        tasks: updatedTasks,
      });
    } catch (error) {
      console.error(error);
    }
  }

  function handleCheckboxChange(event) {
    const taskId = props.id;
    const newStatus = event.target.checked ? "Completed" : "Not Started";
    setIsChecked(event.target.checked);
    setStatus({
      title: newStatus,
      background: event.target.checked ? "green" : "#ff5252"
    });
    updateTask(taskId, newStatus);
  };

  function handleEdit() {
    toggleStatus()
    props.onUpdate(props.id);
  };

  return (
    <div className='todo-item-container' style={{ display: (props.statusFilter === status.title) || (props.statusFilter !== "All") && "none" }}>


      <div className='left-section'>
        <input id='check-box' type='checkbox' checked={isChecked} onChange={handleCheckboxChange} />
        <span className="status" style={{ textDecoration: isChecked && "line-through" }}>
          <p className='todo-item-title' style={{ textDecoration: isChecked && "line-through" }}>{props.title}</p>
          <p className='todo-item-content' style={{ textDecoration: isChecked && "line-through" }}>{props.description}</p>
        </span>

      </div>




      <div className='right-section'>
        <span className='date-status'>
          <p>{props.date}</p>
          <div style={{ backgroundColor: status.background }} onClick={handleEdit} className='status'>{status.title}</div>
        </span>



        <div className='action-icons'>
          <IconContext.Provider value={{ color: "#FF5858", size: "1.5rem" }}>
            <span onClick={handleClick}><AiFillCloseSquare /></span>
          </IconContext.Provider>
          <IconContext.Provider value={{ size: "1.5rem" }}>
            <span onClick={() => { props.onEdit(props.id); }}><AiFillEdit /></span>
          </IconContext.Provider>

        </div>
      </div>
    </div>
  )
}

export default ToDoItem