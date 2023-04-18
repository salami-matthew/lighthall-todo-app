import React, { useState } from 'react'
import "./ToDo.css"
import ToDoItem from '../ToDoItem/ToDoItem'

const ToDo = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    date: ""
  });

  const [taskList, setTaskList] = useState([]);

  function handleChange(event) {
    const { name, value } = event.target;
    setTask((prevTask) => {
      return {
        ...prevTask,
        [name]: value
      }
    });
  };

  function submitTask(event) {
    setTaskList((prevList) => {
      return [...prevList, task]
    });
    setTask({
      title: "",
      description: "",
      date: ""
    });
    event.preventDefault();
  };

  function deleteTask(id) {
    setTaskList((prevList) => {
      prevList.filter((task, taskIndex) => {
        return taskIndex !== id;
      });
    });
  };

  return (
    <div className='todo'>
      <h1 className='todo-title'>Joe's ToDo</h1>
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