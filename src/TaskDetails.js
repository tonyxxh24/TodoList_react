import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useTheme } from './ThemeContext';
import styles from './TodoList.module.css';
import { getTaskById } from './taskUtils';

function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { theme } = useTheme();

  // Assume we have a function to get task details by ID
  const task = getTaskById(id);

  if (!user) {
    return <p>Please log in to view task details.</p>;
  }

  if (!task) {
    return <p>Task not found.</p>;
  }

  return (
    <div className={`${styles.todoList} ${styles[theme]}`}>
      <h1>Task Details</h1>
      <h2>{task.text}</h2>
      <p>Status: {task.completed ? 'Completed' : 'Pending'}</p>
      <p>Created by: {task.user}</p>
      <button onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
}

export default TaskDetails;

// Comments:
// 1. We use the useParams hook to access the route parameter (task ID)
// 2. We use the useNavigate hook for the "Go Back" functionality
// 3. We fetch the task details based on the ID from the URL
// 4. We display detailed information about the task
// 5. The navigate(-1) function is used to go back to the previous page