import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import ShoppingList from './components/ShoppingList';
import AddEditShoppingList from './components/AddEditShoppingList';
import LandingPage from './components/LandingPage'; // Import LandingPage

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const location = useLocation();

  // Determine if the navbar should be hidden
  const hideNavbar = ["/", "/login", "/register"].includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<LandingPage />} />
        {isAuthenticated && (
          <>
            <Route path="/profile" element={<Profile />} />
            <Route path="/home" element={<ShoppingList />} />
            <Route path="/edit/:id" element={<AddEditShoppingList />} />
            <Route path="/add" element={<AddEditShoppingList />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
