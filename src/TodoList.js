import React, { useState, useEffect } from 'react';
import styles from './TodoList.module.css'
import { useAuth } from './AuthContext';
import { useTheme } from './ThemeContext';
import { Link, useNavigate } from 'react-router-dom';
import { getAllTasks, addTask, toggleTask, deleteTask, saveTasks } from './taskUtils';

function TodoList() {
  // State to store the list of tasks
  const [tasks, setTasks] = useState([]);
  // State to store the current input value
  const [inputValue, setInputValue] = useState('');
  const { user, login, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const navigate = useNavigate();

  // // useEffect hook to load tasks from localStorage when the component mounts
  // useEffect(() => {
  //   const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  //   setTasks(storedTasks);
  // }, []);

  // // useEffect hook to save tasks to localStorage whenever the tasks state changes
  // useEffect(() => {
  //   localStorage.setItem('tasks', JSON.stringify(tasks));
  // }, [tasks]);

  useEffect(() => {
    setTasks(getAllTasks());
  }, []);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const handleAddTask = () => {
    if (inputValue.trim() && user) {
      const newTask = addTask(inputValue, user.username);
      setTasks([...tasks, newTask]);
      setInputValue('');
    }
  };

  const handleToggleTask = (id) => {
    const updatedTasks = tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  };

  return (
      <div className={`${styles.todoList} ${styles[theme]}`}>
        <h1>Todo List</h1>
        <button onClick={toggleTheme}>Toggle Theme</button>
        {user ? (
          <>
            <p>Welcome, {user.username}! <button onClick={logout}>Logout</button></p>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter a new task"
              className={styles.input}
            />
            <button onClick={handleAddTask} className={styles.addButton}>Add Task</button>
            <ul className={styles.taskList}>
              {tasks.filter(task => task.user === user.username).map((task) => (
                <li key={task.id} className={styles.taskItem}>
                  <span className={task.completed ? styles.completed : ''}>
                    {task.text}
                  </span>
                  <div>
                    <button onClick={() => handleToggleTask(task.id)} className={styles.taskButton}>Toggle</button>
                    <button onClick={() => handleDeleteTask(task.id)} className={styles.taskButton}>Delete</button>
                    <Link to={`/task/${task.id}`} className={styles.taskButton}>View Details</Link>
                  </div>
                </li>
              ))}
            </ul>
            <Link to="/completed" className={styles.addButton}>View Completed Tasks</Link>
          </>
        ) : (
          <button onClick={() => login('testUser')}>Login</button>
        )}
      </div>
    );
}

export default TodoList;