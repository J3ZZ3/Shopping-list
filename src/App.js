import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import ShoppingList from './components/ShoppingList';
import AddEditShoppingList from './components/AddEditShoppingList';
import LandingPage from './components/LandingPage'; // Import LandingPage

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={isAuthenticated ? <ShoppingList /> : <LandingPage />} />

        {isAuthenticated && (
          <>
            <Route path="/profile" element={<Profile />} />
            <Route path="/edit/:id" element={<AddEditShoppingList />} />
            <Route path="/add" element={<AddEditShoppingList />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
