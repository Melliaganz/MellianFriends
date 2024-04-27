import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Accueil from './pages/Accueil';
import { initializeApp } from 'firebase/app';
import { getAuth, signOut, onAuthStateChanged  } from 'firebase/auth';
import Header from './components/Header';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "./App.css"
import { CssBaseline } from '@mui/material';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';
import UserProfile from './pages/UserProfile';
import { getStorage } from 'firebase/storage';

function App() {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false); 
  const [theme, setTheme] = useState(createTheme({
    palette: {
      mode: 'light',
    },
  }));

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
  const database = getDatabase(firebaseApp)
  const firestore = getFirestore(firebaseApp);
  const storage = getStorage(firebaseApp)


  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    const updatedTheme = createTheme({
      palette: {
        mode: darkMode ? 'dark' : 'light',
        primary: {
          main: darkMode ? '#ff9800' : '#3f51b5',
        },
        secondary: {
          main: darkMode ? '#f44336' : '#f50057',
        },
        background: {
          default: darkMode ? '#000000' : '#ffffff', 
        },
      },
    });
    setTheme(updatedTheme);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return unsubscribe;
  }, [auth]);

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
        <CssBaseline />
        {user && <Header user={user} handleLogout={handleLogout} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}
        <Routes>
          <Route path="/login" element={<Login auth={auth} toggleDarkMode={toggleDarkMode} darkMode={darkMode}  />} />
          <Route path="/signup" element={<Signup auth={auth} storage={storage} toggleDarkMode={toggleDarkMode} darkMode={darkMode} firestore={firestore} />} />
          <Route
            path="/"
            element={
              user ? <Accueil auth={auth} database={database} firestore={firestore} /> : <Navigate to="/login" />
            }
          />
          <Route path="/profile/:userId" element={user ? <UserProfile  user={user} auth={auth} database={database} firestore={firestore}/> : <Navigate to="/login"/>} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;
