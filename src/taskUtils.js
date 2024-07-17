// taskUtils.js

// Simulating a local storage key for our tasks
const TASKS_STORAGE_KEY = 'todoListTasks';

// Function to get all tasks from local storage
export const getAllTasks = () => {
  const tasksJson = localStorage.getItem(TASKS_STORAGE_KEY);
  return tasksJson ? JSON.parse(tasksJson) : [];
};

// Function to save all tasks to local storage
export const saveTasks = (tasks) => {
  localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
};

// Function to get completed tasks
export const getCompletedTasks = () => {
  const allTasks = getAllTasks();
  return allTasks.filter(task => task.completed);
};

// Function to get a task by its ID
export const getTaskById = (id) => {
  const allTasks = getAllTasks();
  return allTasks.find(task => task.id === id);
};

// Function to add a new task
export const addTask = (taskText, username) => {
  const allTasks = getAllTasks();
  const newTask = {
    id: Date.now().toString(), // Simple way to generate a unique ID
    text: taskText,
    completed: false,
    user: username
  };
  allTasks.push(newTask);
  saveTasks(allTasks);
  return newTask;
};

// Function to toggle a task's completed status
export const toggleTask = (id) => {
  const allTasks = getAllTasks();
  const taskIndex = allTasks.findIndex(task => task.id === id);
  if (taskIndex !== -1) {
    allTasks[taskIndex].completed = !allTasks[taskIndex].completed;
    saveTasks(allTasks);
  }
};

// Function to delete a task
export const deleteTask = (id) => {
  const allTasks = getAllTasks();
  const updatedTasks = allTasks.filter(task => task.id !== id);
  saveTasks(updatedTasks);
};

// Comments:
// 1. We use local storage to persist tasks between page reloads
// 2. getAllTasks and saveTasks are helper functions for interacting with local storage
// 3. getCompletedTasks filters all tasks to return only the completed ones
// 4. getTaskById finds a specific task by its ID
// 5. addTask creates a new task with a unique ID and saves it
// 6. toggleTask changes the completed status of a task
// 7. deleteTask removes a task from the list