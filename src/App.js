import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import { AuthProvider } from './context/AuthContext';
import TodList from './components/TodoList/TodoList';

function App() {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/todolist" element={<TodList />} />
      </Routes>
    </Router>
  </AuthProvider>
  );
}

export default App;