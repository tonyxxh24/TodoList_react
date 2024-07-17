import React from 'react';
import TodoList from './TodoList';
import TodoListStyledComp from './TodoListStyledComp';
import { AuthProvider } from './AuthContext';
import { ThemeProvider } from './ThemeContext';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CompletedTasks from './CompletedTasks';
import TaskDetails from './TaskDetails';

// 1st version
// function App() {
//   return (
//     // <div className="App">
//     //   <TodoList />
//     //   <TodoListStyledComp/>
//     // </div>
//     <AuthProvider>
//       <ThemeProvider>
//           <TodoList />
//       </ThemeProvider>
//     </AuthProvider>
//   );
// }

// export default App;

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          {/* Navigation menu */}
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/completed">Completed Tasks</Link></li>
            </ul>
          </nav>

          {/* Route definitions */}
          <Routes>
            <Route path="/" element={<TodoList />} />
            <Route path="/completed" element={<CompletedTasks />} />
            <Route path="/task/:id" element={<TaskDetails />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;

// Comments:
// 1. We import necessary components from react-router-dom
// 2. We wrap our entire application with the Router component
// 3. We create a simple navigation menu using Link components
// 4. We define our routes using the Routes and Route components
// 5. The "path" prop defines the URL path for each route
// 6. The "element" prop specifies which component to render for each route
// 7. We use a route parameter ":id" for the TaskDetails route to handle dynamic task IDs