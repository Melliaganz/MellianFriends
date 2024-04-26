import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Importe la fonction correctement

function Signup({ auth }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  if (auth.currentUser) {
    return <Navigate to="/" />; // Redirige vers la page d'accueil
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Utilise correctement la fonction createUserWithEmailAndPassword
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/'); // Redirige après l'inscription réussie
    } catch (error) {
      console.error('Error signing up with email and password:', error);
    }
  };

  return (
    <div>
      <h2>Inscription</h2>
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
        <button type="submit">S'inscrire</button>
      </form>
      <p>Vous avez déjà un compte ? <Link to="/login">Connectez-vous ici</Link></p>
    </div>
  );
}

export default Signup;
