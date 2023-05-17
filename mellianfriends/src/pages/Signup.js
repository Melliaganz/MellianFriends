import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithPhoneNumber, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase/firebase';

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  const handleSignupEmail = async (e) => {
    e.preventDefault();

    try {
      const authInstance = getAuth();
      const userCredential = await createUserWithEmailAndPassword(authInstance, email, password);
      // L'utilisateur est créé avec succès, tu peux effectuer d'autres actions ici
      console.log(userCredential.user);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSignupPhone = async (e) => {
    e.preventDefault();

    try {
      const authInstance = getAuth();
      const confirmationResult = await signInWithPhoneNumber(authInstance, phoneNumber);
      // La vérification du numéro de téléphone a été envoyée, tu peux demander à l'utilisateur de saisir le code de vérification ici
      console.log(confirmationResult);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSignupGoogle = async (e) => {
    e.preventDefault();

    try {
      const authInstance = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(authInstance, provider);
      // L'utilisateur est connecté avec succès via son compte Google, tu peux effectuer d'autres actions ici
      console.log(result.user);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Inscription</h2>

      <h3>Avec Email</h3>
      <form onSubmit={handleSignupEmail}>
        {/* Champ d'email */}
        {/* Champ de mot de passe */}
        <button type="submit">S'inscrire avec Email</button>
      </form>

      <h3>Avec Numéro de téléphone</h3>
      <form onSubmit={handleSignupPhone}>
        {/* Champ de numéro de téléphone */}
        <button type="submit">S'inscrire avec Numéro de téléphone</button>
      </form>

      <h3>Avec Compte Google</h3>
      <button onClick={handleSignupGoogle}>S'inscrire avec Google</button>

      {error && <p>{error}</p>}
    </div>
  );
};

export default SignupForm;
