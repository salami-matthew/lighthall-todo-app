import React, { useState } from 'react'
import "./EditPage.css"


const EditPage = (props) => {

  const [task, setTask] = useState({
    ...props.task
  });

  function handleEdit(event) {
    const { name, value } = event.target;
    setTask((prevTask) => {
      return {
        ...prevTask,
        [name]: value
      }
    });
  };

  return (
    <div style={{ display: props.clickValue === true ? "block" : "none" }} className="edit-section">

      <div id='modal' className="modal-content todo-header">
        <span onClick={() => { props.onClose(); }} className="close">&times;</span>
        <form autoComplete='off' action='/todo' method='POST' className='todo-form'>
          <div className='inputs-container'>
            <div className='inputs'>
              <label htmlFor='title'>Title</label>
              <input onChange={handleEdit} value={task.title} name='title' id='title'></input>
            </div>
            <div className='inputs'>
              <label htmlFor='description'>Description</label>
              <input onChange={handleEdit} value={task.description} name='description' id='description'></input>
            </div>
            <div className='inputs'>
              <label htmlFor='date'>Due date</label>
              <input onChange={handleEdit} value={task.date} name='date' type='date' id='date'></input>
            </div>


          </div>

          <button className='todo-btn'>Save</button>
        </form>
      </div>
    </div>
  )
}

export default EditPage