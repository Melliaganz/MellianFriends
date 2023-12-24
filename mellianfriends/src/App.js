import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Register from './Pages/Login/Register';
import Accueil from './Pages/Accueil/Accueil';
import Header from './components/Header'; 
import Loader from './components/Loader';
import { auth } from './firebase/firebase';

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.error('Error during logout:', error.message);
      });
  };
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  return (
    <Router>
        <Header user={user} onDarkModeToggle={toggleDarkMode} darkMode={darkMode} />
      {loading && <Loader />}

      <Routes>
        {user ? (
          <Route path="/" element={<Navigate to="/accueil" replace />} />
        ) : (
          <Route path="/" element={<Login />} />
        )}

        {user ? (
          <Route path="/register" element={<Navigate to="/accueil" replace />} />
        ) : (
          <Route path="/register" element={<Register />} />
        )}

        {user ? (
          <Route path="/accueil" element={<Accueil />} />
        ) : (
          <Route path="*" element={<Navigate to="/" replace />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;
