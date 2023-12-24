import React, { useState, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, signInWithPhoneNumber, GoogleAuthProvider, signInWithPopup, RecaptchaVerifier, onAuthStateChanged  } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import LoginIcon from '@mui/icons-material/Login';
import GoogleIcon from '@mui/icons-material/Google';
import PhoneIcon from '@mui/icons-material/Phone';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('email');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const authInstance = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authInstance, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [authInstance]);

  const handleLoginEmail = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(authInstance, email, password);
      setIsLoggedIn(true);
      navigate("/");
      console.log(userCredential.user);
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
  };

  const handleLoginPhone = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const applicationVerifier = new RecaptchaVerifier('recaptcha-container', {
        size: 'invisible',
      });

      const confirmationResult = await signInWithPhoneNumber(authInstance, phoneNumber, applicationVerifier);
      window.confirmationResult = confirmationResult;
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
  };

  const handleVerificationCodeSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const confirmationResult = window.confirmationResult;
      const userCredential = await confirmationResult.confirm(verificationCode);
      console.log(userCredential.user);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
  };

  const handleLoginGoogle = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(authInstance, provider);
      console.log(result.user);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
  };

  const handleMethodSelect = (method) => {
    setSelectedMethod(method);
  };
  useEffect(() => {
    // Sauvegarde l'état de connexion dans le localStorage
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  return (
    <div className='loginContainer'>
      <div className='blocConnexion'>
        <div className='bouttonsConnexion'>
          <div className='bouttonConnexion'>
            <button onClick={() => handleMethodSelect('email')}><AlternateEmailIcon /></button>
          </div>
          <div className='bouttonConnexion'>
            <button onClick={() => handleMethodSelect('phone')}><PhoneIcon /></button>
          </div>
          <div className='bouttonConnexion'>
            <button onClick={() => handleMethodSelect('google')}><GoogleIcon /></button>
          </div>
        </div>

        {selectedMethod === 'email' && (
          <form onSubmit={handleLoginEmail}>
            <label>
              Email:
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label>
              Mot de passe:
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <button type="submit" disabled={loading}>
              {loading ? 'Connexion en cours...' : <LoginIcon />}
            </button>
          </form>
        )}

        {selectedMethod === 'google' && (
          <button onClick={handleLoginGoogle} disabled={loading}>
            {loading ? 'Connexion en cours...' : 'Se connecter avec Google'}
          </button>
        )}

        {selectedMethod === 'phone' && (
          <form onSubmit={handleVerificationCodeSubmit}>
            <label>
              Numéro de téléphone:
              <input type="phone" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            </label>
            <button type="submit" disabled={loading}>
              {loading ? 'Connexion en cours...' : 'Envoyer le code de vérification'}
            </button>
          </form>
        )}

        <h2>Connexion <LoginIcon /></h2>
        {error && <div>{error}</div>}
      </div>
    </div>
  );
};

export default Login;
