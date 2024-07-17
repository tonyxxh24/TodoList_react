import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useTheme } from './ThemeContext';
import styles from './TodoList.module.css';
import { getCompletedTasks } from './taskUtils';

function CompletedTasks() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();

  // Assume we have a function to get completed tasks
  const completedTasks = getCompletedTasks();

  return (
    <div className={`${styles.todoList} ${styles[theme]}`}>
      <h1>Completed Tasks</h1>
      {user ? (
        <ul className={styles.taskList}>
          {completedTasks.map((task, index) => (
            <li key={index} className={styles.taskItem}>
              <span>{task.text}</span>
              <button onClick={() => navigate(`/task/${task.id}`)}>View Details</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Please log in to view completed tasks.</p>
      )}
    </div>
  );
}

export default CompletedTasks;

// Comments:
// 1. We use the useNavigate hook from react-router-dom for programmatic navigation
// 2. We reuse the AuthContext and ThemeContext from our main TodoList component
// 3. We display a list of completed tasks, with a button to view details for each task
// 4. The navigate function is used to redirect to the TaskDetails page with the task ID