import React, { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route, BrowserRouter } from "react-router-dom"
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Header from "./components/Header"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Récupère la valeur de isLoggedIn depuis le localStorage
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    if (storedIsLoggedIn) {
      setIsLoggedIn(JSON.parse(storedIsLoggedIn));
    }
  }, []);

  return (
    <React.Fragment>
    <BrowserRouter >
    <Header />
    <Routes >
      <Route path="/" element={isLoggedIn ?(<Home /> ) : (<Login />)} />
      <Route path="*" element={<NotFound />} />
      <Route path="/signup" element={<Signup />} />  
    </Routes>
    </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
