import React, { useState } from 'react'
import "./ToDo.css"
import ToDoItem from '../ToDoItem/ToDoItem'
import EditPage from '../EditPage/EditPage'
import Filter from '../Filter/Filter';

const ToDo = () => {
  // for form values
  const [task, setTask] = useState({
    title: "",
    description: "",
    date: ""
  });

  // for modal values
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    date: ""
  });

  // for list values to be rendered
  const [taskList, setTaskList] = useState([]);

  // for edit toggling
  const [isOpened, setIsOpened] = useState(false);


  // stores form values dynamically
  function handleChange(event) {
    const { name, value } = event.target;
    setTask((prevTask) => {
      return {
        ...prevTask,
        [name]: value
      }
    });
  };

  // submit a form to render a new task
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

  // delete a task
  function deleteTask(id) {
    setTaskList((prevList) => {
      prevList.filter((task, taskIndex) => {
        return taskIndex !== id;
      });
    });
  };

  // open edit modal with default values
  function editTask(id) {
    setIsOpened(!isOpened);
    setTaskList((prevList) => {
      prevList.filter((task, taskIndex) => {
        if (taskIndex == id) {
          setNewTask({ ...task });
        } else { }
      });
    });
  };

  function closeModal() {
    setIsOpened(!setIsOpened);
  };

  // main component
  return (
    <div className='todo'>
      <EditPage
        task={newTask}
        clickValue={isOpened}
        onClose={closeModal}
      />
      {/* todo header section */}
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

      {/* filter bar section */}
      <div className='filter-bar-container'>
        <div className='left-filter-bar'>
          <p>Filter</p>

          <Filter
            items={["All", "Not Started", "In Progress", "Completed"]}
          />
        </div>

        <Filter
          items={["Due Date ↑", "Due Date ↓", "Title ↑", "Title ↓"]}
        />
      </div>

      {/* individual task section */}
      <div className='todo-list'>
        {taskList && taskList.map((t, index) => {
          return <ToDoItem
            key={index}
            id={index}
            title={t.title}
            description={t.description}
            date={t.date}
            onDelete={deleteTask}
            onEdit={editTask}
          />
        })}
      </div>

    </div>
  )
}

export default ToDo;