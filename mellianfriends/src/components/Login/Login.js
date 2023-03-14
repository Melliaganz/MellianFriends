import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../images/43289078_1104665113044499_8887411126501900288_n.jpg';
import { isLogged } from '../../_utils/auth/auth.functions';
import LoginIcon from '@mui/icons-material/Login';

function Login() {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogged()) {
      navigate('/');
    }
  }, [navigate]);

  const sendData = (e) => {
    e.preventDefault();
    console.log(emailValue, passwordValue);

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        email: emailValue,
        password: passwordValue,
      }),
    };
    console.log(requestOptions);
    fetch('http://localhost:3000/api/auth/login', requestOptions)
      .then((response) => {
        if (response.status === 200) {
          navigate('/');
          window.location.reload();
        } else {
          setError('Mot de passe ou Email Invalide.');
        }
      })
      .catch((error) => {
        console.log(error.message);
        setError('There was an error. Please try again later.');
      });
  };
  return (
    <div className='containerfull'>
    <div className='loginContainer'>
        <div className='loginIntContainer'>
            <div className='logoMellianFriends'>
                <img src={logo} alt="Mellianfriends Logo"height={200}></img>
            </div>
            <div className='titleLoginHeader'>
                <h1 className='loginTitleH1'>MellianFriends</h1>
            </div>
            <div className='formulaireConnexion'>
            <form className='formConnexion' onSubmit={sendData}>
                {error && (
                    <div className='errorContainer'>
                        <p className='errorMessage'>{error}</p>
                    </div>
                )}
                <div className='formContainerFull'>
                <div className='formInputContainer'>
                <div className='emailContainerLogin'>
                    <input
                    aria-labelledby='Email'
                    name='email'
                    type="email"
                    className='emailForm'
                    placeholder='E-mail'
                    required
                    value={emailValue}
                    onChange={(event) => setEmailValue(event.target.value)}
                    />
                </div>
                <div className='passwordContainerLogin'>
                    <input
                    aria-labelledby='Password'
                    name='password'
                    type="password"
                    className='passwordForm'
                    required
                    placeholder='Mot de passe'
                    value={passwordValue}
                    onChange={(event) => setPasswordValue(event.target.value)}
                    />
                </div>
                </div>
                </div>
                <div className='bouttonDeConnexion'>
                <button type="submit" className='btn_submit' href="/">
                    <LoginIcon /> Se connecter
                </button>
                </div>
            </form>
            </div>
            <div className='forgottenPassword'>
                <a href="/forgottenPassword" alt="Mot de passe oublié" title="Récupérer le mot de passe">
                    Mot de passe oublié ?
                </a>
            </div>
        </div>
        <div className='registerLink'>
        <a href="/Register" alt="S'enregistrer" title="S'enregistrer">
            Vous n'avez pas encore de compte?
        </a>
    </div>
    </div>
    </div>
  )
}

export default Login