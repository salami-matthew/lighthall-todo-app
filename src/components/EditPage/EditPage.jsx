import React, { useState, useEffect } from 'react'
import "./EditPage.css"
import { db } from '../../../firebase-config.js';
import { useLocation } from 'react-router-dom';
import { collection, query, updateDoc, where, getDocs, doc} from 'firebase/firestore';

const EditPage = (props) => {

  const [task, setTask] = useState({
    ...props.task
  });

  const { search } = useLocation();
  const name = new URLSearchParams(search).get('name');

  useEffect(() => {
    setTask({ ...props.task });
  }, [props.task]);

  function handleEdit(event) {
    const { name, value } = event.target;
    setTask((prevTask) => {
      return {
        ...prevTask,
        [name]: value
      }
    });
  };

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const userQuery = query(collection(db, 'Users'), where('name', '==', name));
      const userRef = await getDocs(userQuery);
      const userDoc = userRef.docs[0];
      const updatedTasks = userDoc.data().tasks.map((t) => {
        if (t.title === props.task.title) {
          return task;
        }
        return t;
      });
      await updateDoc(doc(db, 'Users', userDoc.id), { tasks: updatedTasks });
      props.setTaskList(updatedTasks)
      props.onClose();

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div style={{ display: props.clickValue === true ? "block" : "none" }} className="edit-section">

      <div id='modal' className="modal-content todo-header">
        <span onClick={() => { props.onClose(); }} className="close">&times;</span>
        <form autoComplete='off' onSubmit={handleSubmit} className='todo-form'>
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