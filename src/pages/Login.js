// Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { Google } from '@mui/icons-material';
import { signInWithEmailAndPassword } from 'firebase/auth';


function Login({ auth }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

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
    <div>
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Adresse email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Se connecter</button>
      </form>
      <button onClick={handleGoogleSignIn}><Google/></button>
      <p>Vous n'avez pas de compte ? <Link to="/signup">Inscrivez-vous ici</Link></p>
    </div>
  );
}

export default Login;
