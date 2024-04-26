// Login.js
import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { Google } from '@mui/icons-material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Button, TextField } from '@mui/material';


function Login({ auth }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  if (auth.currentUser) {
    return <Navigate to="/" />; // Redirige vers la page d'accueil
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/'); // Redirige après la connexion réussie
    } catch (error) {
      console.error('Error signing in with email and password:', error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate('/'); // Redirige après la connexion réussie
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };
  return (
    <div className='loginContainer'>
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          type="email"
          placeholder="Adresse email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit">Se connecter</Button>
      </form>
      <Button onClick={handleGoogleSignIn}><Google/></Button>
      <p>Vous n'avez pas de compte ? <Link to="/signup">Inscrivez-vous ici</Link></p>
    </div>
  );
}

export default Login;
