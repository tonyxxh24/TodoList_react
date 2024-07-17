import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Styled components
const TodoListContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const Input = styled.input`
  width: 70%;
  padding: 10px;
  font-size: 16px;
`;

const AddButton = styled.button`
  width: 25%;
  padding: 10px;
  font-size: 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
`;

const TaskList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const TaskItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin: 5px 0;
  background-color: #f1f1f1;
`;

const TaskText = styled.span`
  text-decoration: ${props => props.completed ? 'line-through' : 'none'};
  color: ${props => props.completed ? '#888' : 'black'};
`;

const TaskButton = styled.button`
  padding: 5px 10px;
  margin-left: 10px;
  cursor: pointer;
`;

function TodoListStyledComp() {
  // ... (useState and useEffect hooks remain the same)

  // State to store the list of tasks
  const [tasks, setTasks] = useState([]);
  // State to store the current input value
  const [inputValue, setInputValue] = useState('');

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
    if (inputValue.trim()) {
      setTasks([...tasks, { text: inputValue, completed: false }]);
      setInputValue('');
    }
  };

  // Function to toggle a task's completion status
  const toggleTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  // Function to delete a task
  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <TodoListContainer>
      <h1>Todo List</h1>
      <Input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter a new task"
      />
      <AddButton onClick={addTask}>Add Task</AddButton>
      <TaskList>
        {tasks.map((task, index) => (
          <TaskItem key={index}>
            <TaskText completed={task.completed}>
              {task.text}
            </TaskText>
            <div>
              <TaskButton onClick={() => toggleTask(index)}>Toggle</TaskButton>
              <TaskButton onClick={() => deleteTask(index)}>Delete</TaskButton>
            </div>
          </TaskItem>
        ))}
      </TaskList>
    </TodoListContainer>
  );
}

export default TodoListStyledComp;