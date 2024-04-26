import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Accueil from './pages/Accueil';
import { initializeApp } from 'firebase/app';
import { getAuth, signOut, onAuthStateChanged  } from 'firebase/auth';
import Header from './components/Header';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "./App.css"


function App() {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false); 

  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
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
