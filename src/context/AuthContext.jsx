import React, { createContext, useState, useEffect } from 'react';

// Create an AuthContext to manage authentication state
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
// useEffect to retrieve user data from localStorage when the app loads
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // Function to register a new user and store data in localStorage
  const registerUser = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  // Function to log in the user by verifying stored data
  const loginUser = (userData) => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.email === userData.email && storedUser.password === userData.password) {
      setUser(storedUser);
      return true;
    }
    return false;
  };

  const logoutUser = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  // Provide user data and authentication functions to the app context
  return (
    <AuthContext.Provider value={{ user, registerUser, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};