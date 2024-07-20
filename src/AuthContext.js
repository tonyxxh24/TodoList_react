import React, { createContext, useState, useContext } from 'react';

// Create a context for authentication
const AuthContext = createContext();

// Create a provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Function to log in a user
  const login = (username) => {
    setUser({ username });
  };

  // Function to log out a user
  const logout = () => {
    setUser(null);
  };

  const register = (username, email, password) => {
    // In a real application, you would send this data to your backend
    // For this example, we'll just log the user in immediately
    console.log(`Registering user: ${username}, ${email}`);
    setUser({ username });
  };

  // Provide the authentication state and functions to children
  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the auth context
export function useAuth() {
  return useContext(AuthContext);
}