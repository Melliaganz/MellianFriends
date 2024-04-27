import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth'; 
import { collection, addDoc } from 'firebase/firestore';
import { Button, TextField, Modal, Typography } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { Image } from '@mui/icons-material';
import { getStorage, ref, uploadString } from 'firebase/storage';

function Signup({ auth, toggleDarkMode, darkMode, firestore, storage }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profileImage, setProfileImage] = useState(null); // State pour l'image de profil
  const [previewImage, setPreviewImage] = useState(null); // State pour l'aperçu de l'image de profil
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
  
    if (imageFile) {
      // Check if the file is an image
      if (!imageFile.type.startsWith('image')) {
        setError('Le fichier sélectionné n\'est pas une image.');
        return;
      }
  
      // Ensure the file size is not too large (optional)
      const maxSizeMB = 5; // Set your maximum file size limit (in MB)
      const maxSizeBytes = maxSizeMB * 1024 * 1024; // Convert MB to bytes
      if (imageFile.size > maxSizeBytes) {
        setError(`La taille du fichier dépasse la limite de ${maxSizeMB} MB.`);
        return;
      }
  
      // Read the file as a data URL
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result);
        setPreviewImage(reader.result); // Set preview image
      };
      reader.readAsDataURL(imageFile);
    }
  };
  

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
  
      // Vérifiez si une image de profil a été téléchargée
      if (profileImage) {
        // Upload the profile image to Firebase Storage
        const storageRef = getStorage();
        const profileImageRef = ref(storageRef, `profileImages/${userId}`);
        await uploadString(profileImageRef, profileImage, 'data_url');
      } else {
        // Si aucune image de profil n'a été téléchargée, affichez une erreur
        setError('Veuillez télécharger une photo de profil.');
        return;
      }
  
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
        <div>
          <input
            accept="image/*"
            id="profileImageUpload"
            type="file"
            style={{ display: 'none' }}
            onChange={handleImageChange}
            required
          />
          <label htmlFor="profileImageUpload">
            <Button
              component="span"
              variant="contained"
              startIcon={<Image />}
            >
              Télécharger une photo de profil
            </Button>
          </label>
        </div>
        {previewImage && (
          <div>
            <img src={previewImage} alt="Aperçu de la photo de profil" style={{ width: '100px', height: '100px', borderRadius:'50%', objectFit:'cover' }} />
          </div>
        )}
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
