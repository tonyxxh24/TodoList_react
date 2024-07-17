import React, { useState, useEffect } from 'react';
import styles from './TodoList.module.css'
import { useAuth } from './AuthContext';
import { useTheme } from './ThemeContext';
import { Link, useNavigate } from 'react-router-dom';

function TodoList() {
  // State to store the list of tasks
  const [tasks, setTasks] = useState([]);
  // State to store the current input value
  const [inputValue, setInputValue] = useState('');
  const { user, login, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const navigate = useNavigate();

  // useEffect hook to load tasks from localStorage when the component mounts
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  // useEffect hook to save tasks to localStorage whenever the tasks state changes
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Function to add a new task
  const addTask = () => {
    if (inputValue.trim() && user) {
      const newTask = {
        id: Date.now().toString(), // Add a unique id
        text: inputValue.trim(),
        completed: false,
        user: user.username
      };
      setTasks(prevTasks => [...prevTasks, newTask]);
      setInputValue('');
    }
  };

  // Function to toggle a task's completion status
  const toggleTask = (taskId) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Function to delete a task
  const deleteTask = (taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
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
            <button onClick={addTask} className={styles.addButton}>Add Task</button>
            <ul className={styles.taskList}>
              {tasks.filter(task => task.user === user.username).map((task, index) => (
                <li key={index} className={styles.taskItem}>
                  <span className={task.completed ? styles.completed : ''}>
                    {task.text}
                  </span>
                  <div>
                    <button onClick={() => toggleTask(index)} className={styles.taskButton}>Toggle</button>
                    <button onClick={() => deleteTask(index)} className={styles.taskButton}>Delete</button>
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