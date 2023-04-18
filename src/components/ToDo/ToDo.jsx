import React, { useState, useEffect } from 'react'
import "./ToDo.css"
import ToDoItem from '../ToDoItem/ToDoItem'
import { useLocation } from 'react-router-dom';
import { collection, query, where, addDoc, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebase-config.js';

const ToDo = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    date: ""
  });

  const [taskList, setTaskList] = useState([]);

  const { search } = useLocation();
  const name = new URLSearchParams(search).get('name');

  useEffect(() => {
    const fetchTasks = async () => {
      const userQuery = query(collection(db, 'Users'), where('name', '==', name));
      const userRef = await getDocs(userQuery);
      userRef.forEach((doc) => {
        setTaskList(doc.data().tasks);
      });
    };
    fetchTasks();
  }, [name]);

  function handleChange(event) {
    const { name, value } = event.target;
    setTask((prevTask) => {
      return {
        ...prevTask,
        [name]: value
      }
    });
  };

  async function submitTask(event) {
    event.preventDefault();
    if (!task.title) {
      return;
    }
    try {
      const userQuery = query(collection(db, 'Users'), where('name', '==', name));
      const userRef = await getDocs(userQuery);
      if (userRef.empty) {
        await addDoc(collection(db, 'Users'), { name, tasks: [task] });
        setTaskList([task]);
      } else {
        const userDoc = doc(db, 'Users', userRef.docs[0].id);
        const userTasks = userRef.docs[0].data().tasks;
        const updatedTasks = [...userTasks, task];
        await updateDoc(userDoc, { tasks: updatedTasks });
        setTaskList(updatedTasks);
      }
      setTask({ title: '', description: '', date: '' });
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteTask(id) {
    try {
      const userQuery = query(collection(db, 'Users'), where('name', '==', name));
      const userRef = await getDocs(userQuery);
      const userDoc = userRef.docs[0];
      const userTasks = userDoc.data().tasks;
      const updatedTasks = userTasks.filter((_, taskIndex) => {
        return taskIndex !== id;
      });
      const userDocRef = doc(collection(db, 'Users'), userDoc.id);
      await updateDoc(userDocRef, { tasks: updatedTasks });
      setTaskList(updatedTasks);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='todo'>
      <h1 className='todo-title'>{name}'s ToDo</h1>
      <div className='todo-header'>

        <form autoComplete='off' action='/todo' method='POST' className='todo-form'>
          <div className='inputs-container'>
            <div className='inputs'>
              <label htmlFor='title'>Title</label>
              <input onChange={handleChange} value={task.title} name='title' id='title'></input>
            </div>
            <div className='inputs'>
              <label htmlFor='description'>Description</label>
              <input onChange={handleChange} value={task.description} name='description' id='description'></input>
            </div>
            <div className='inputs'>
              <label htmlFor='date'>Due date</label>
              <input onChange={handleChange} value={task.date} name='date' type='date' id='date'></input>
            </div>
          </div>

          <button onClick={submitTask} className='todo-btn'>Add</button>
        </form>
      </div>
      <div className='filter'>
        filter
      </div>

      <div className='todo-list'>
        {taskList && taskList.map((t, index) => {
          return <ToDoItem
            key={index}
            id={index}
            title={t.title}
            description={t.description}
            date={t.date}
            onDelete={deleteTask}
          />
        })}
      </div>

    </div>
  )
}

export default ToDo;