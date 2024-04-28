import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'; 
import { Button, TextField, Modal, Typography } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import PersonAdd from '@mui/icons-material/PersonAdd';

function Signup({ auth, toggleDarkMode, darkMode }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;

      // Update user profile with display name
      await updateProfile(auth.currentUser, { displayName });

      navigate('/');
    } catch (error) {
      setError('Compte déjà existant ou erreur lors de la création du compte');
      console.error('Error signing up with email and password:', error);
    }
  };

  const handleCloseError = () => {
    setError(null);
  };

  if (auth.currentUser) {
    return <Navigate to="/" />;
  }

  return (
    <div className="loginContainer">
      <h2>Inscription</h2>
      <form className="formulaireDeConnexion" onSubmit={handleSubmit}>
        <TextField
          type="text"
          placeholder="Pseudo"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          required
        />
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
        <Button type="submit"><PersonAdd /></Button>
      </form>
      <Button onClick={toggleDarkMode}>
        {darkMode ? <Brightness7 /> : <Brightness4 />}
      </Button>
      <p>
        Vous avez déjà un compte ? <Link to="/login">Connectez-vous ici</Link>
      </p>

      <Modal open={Boolean(error)} onClose={handleCloseError}>
        <div className="modalContent">
          <Typography variant="h6">{error}</Typography>
          <Button onClick={handleCloseError}>Fermer</Button>
        </div>
      </Modal>
    </div>
  );
}

export default Signup;
