import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth'; 
import { collection, addDoc } from 'firebase/firestore';
import { Button, TextField, Modal, Typography } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';

function Signup({ auth, toggleDarkMode, darkMode, firestore, storage }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;

      // Enregistrez les détails du profil dans la base de données Firestore
      const usersCollection = collection(firestore, 'users');
      await addDoc(usersCollection, {
        userId,
        firstName,
        lastName,
      });

      // Définissez une photo de profil par défaut
      const defaultProfileImageUrl = 'chemin_vers_l_image_de_profil_par_defaut.jpg';
      const profileImageRef = storage.ref(`profileImages/${userId}`);
      await profileImageRef.put(defaultProfileImageUrl);

      navigate('/'); // Redirige après l'inscription réussie
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
    <div className='loginContainer'>
      <h2>Inscription</h2>
      <form className='formulaireDeConnexion' onSubmit={handleSubmit}>
        <TextField
          type="text"
          placeholder="Prénom"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <TextField
          type="text"
          placeholder="Nom"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
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
        <Button type="submit">S'inscrire</Button>
      </form>
      <Button onClick={toggleDarkMode}>
          {darkMode ? <Brightness7 /> : <Brightness4 />} 
        </Button>
      <p>Vous avez déjà un compte ? <Link to="/login">Connectez-vous ici</Link></p>

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
