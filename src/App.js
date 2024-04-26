import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Accueil from './pages/Accueil';
import { initializeApp } from 'firebase/app';
import { getAuth, signOut, onAuthStateChanged  } from 'firebase/auth';
import Header from './components/Header';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import "./App.css"


function App() {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false); 

  const firebaseConfig = {
    apiKey: "AIzaSyDImyVH55duHIT-d3H-HwV21lkhizqY2Ro",
    authDomain: "mellianfriends-36e4e.firebaseapp.com",
    projectId: "mellianfriends-36e4e",
    storageBucket: "mellianfriends-36e4e.appspot.com",
    messagingSenderId: "730276175398",
    appId: "1:730276175398:web:386b5cb09696eda67750e7",
    measurementId: "G-1RZMP8FQCV"
  };
  const firebaseApp = initializeApp(firebaseConfig);
  const auth = getAuth(firebaseApp);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  onAuthStateChanged(auth, (user) => {
    setUser(user);
  });
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  
  return (
    <Router>
        <ThemeProvider theme={theme}>

        {user && <Header user={user} handleLogout={handleLogout} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}
      <Routes>
        <Route
          path="/login"
          element={<Login auth={auth} />}
        />
        <Route
          path="/signup"
          element={<Signup auth={auth} />}
        />
        <Route
          path="/"
          element={
            user ? <Accueil auth={auth} /> : <Navigate to="/login" />
          }
        />
      </Routes>
      </ThemeProvider>
    </Router>
  );
};

export default App;
