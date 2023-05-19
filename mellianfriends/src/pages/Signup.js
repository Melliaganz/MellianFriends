import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, signInWithPhoneNumber, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import CreateIcon from '@mui/icons-material/Create';
import GoogleIcon from '@mui/icons-material/Google';
import PhoneIcon from '@mui/icons-material/Phone';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { auth } from "../firebase/firebase"

const SignupForm = () => {

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [signupMethod, setSignupMethod] = useState('email');

  const handleSignupEmail = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const authInstance = getAuth();
      const userCredential = await createUserWithEmailAndPassword(authInstance, email, password);
      // L'utilisateur est créé avec succès, tu peux effectuer d'autres actions ici
      console.log(userCredential.user);
      setLoading(false);
      navigate('/login');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  const handleSignupPhone = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const authInstance = getAuth();
      const confirmationResult = await signInWithPhoneNumber(authInstance, phoneNumber);
      // La vérification du numéro de téléphone a été envoyée, tu peux demander à l'utilisateur de saisir le code de vérification ici
      console.log(confirmationResult);
      setLoading(false);
      navigate('/login');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  const handleSignupGoogle = async (e) => {
    e.preventDefault();

    try {
      setLoading(true); // Activation du chargement
      const authInstance = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(authInstance, provider);
      // L'utilisateur est connecté avec succès via son compte Google, tu peux effectuer d'autres actions ici
      console.log(result.user);
      setLoading(false); // Désactivation du chargement
      navigate('/login');
    } catch (error) {
      setLoading(false); // Désactivation du chargement en cas d'erreur
      setError(error.message);
    }
  };

  const handleSignupMethodChange = (method) => {
    setSignupMethod(method);
  };

  const renderSignupForm = () => {
    if (loading) {
      return <button disabled>Inscription en cours...</button>;
    }
    if (signupMethod === 'email') {
      return (
        <form onSubmit={handleSignupEmail}>
          <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label>
            Mot de passe:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <button type="submit">S'inscrire avec Email</button>
        </form>
      );
    } else if (signupMethod === 'phone') {
      return (
        <form onSubmit={handleSignupPhone}>
          <label>
            Numéro de téléphone :
            <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          </label>
          <button type="submit">S'inscrire avec Numéro de téléphone</button>
        </form>
      );
    } else {
      return (
        <button onClick={handleSignupGoogle}>S'inscrire avec Google</button>
      );
    }
  };

  return (
    <div className='signupContainer'>
      <div className='titreSignup'>
    <h2>Inscription <CreateIcon /></h2>
    </div>
    <div className='bouttonsConnexion'>
      <button onClick={() => handleSignupMethodChange('email')}><AlternateEmailIcon /></button>
      <button onClick={() => handleSignupMethodChange('phone')}><PhoneIcon /></button>
      <button onClick={() => handleSignupMethodChange('google')}><GoogleIcon /></button>
    </div>

    {renderSignupForm()}

    {error && <p>{error}</p>}
  </div>
)};
export default SignupForm;
