import React from 'react';
import TodoList from './TodoList';
import TodoListStyledComp from './TodoListStyledComp';
import { AuthProvider } from './AuthContext';
import { ThemeProvider } from './ThemeContext';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CompletedTasks from './CompletedTasks';
import TaskDetails from './TaskDetails';

function App() {
  return (
    // <div className="App">
    //   <TodoList />
    //   <TodoListStyledComp/>
    // </div>
    <AuthProvider>
      <ThemeProvider>
          <TodoList />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;