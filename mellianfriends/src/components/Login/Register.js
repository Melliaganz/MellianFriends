import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import logo from "../../images/43289078_1104665113044499_8887411126501900288_n.jpg";
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import {REGEX} from "../../_utils/auth/auth.functions"


function Register() {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [firstnameValue, setFirstnameValue] = useState("");
  const [surnameValue, setSurnameValue] = useState("");
  const navigate = useNavigate();

  const sendData = (e) => {
    e.preventDefault();
    console.log(emailValue, passwordValue, firstnameValue, surnameValue);

    const requestOptions = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      credentials: "include",
      body: JSON.stringify({
        name: firstnameValue,
        surname: surnameValue,
        email: emailValue,
        password: passwordValue
      }),
    };
    fetch("http://localhost:3000/api/auth/signup", requestOptions)
    .then((response) => {
      console.log(response.json());
      if (response.ok) {
        navigate("/login")
      }
    })
    .catch((error) => console.log(error));
  }
  return (
    <div className='containerfull'>
    <div className='registerContainer'>
        <div className='registerIntContainer'>
            <div className='logoMellianFriends'>
                <img src={logo} alt="Mellianfriends Logo"height={200}></img>
            </div>
            <div className='titleLoginHeader'>
                <h1 className='registerTitleH1'>MellianFriends</h1>
            </div>
            <div className='formulaireConnexion'>
            <form onSubmit={sendData}>
              <div className='nameAndSurname'>
                <div className='nameContainerLogin'>
                  <label htmlFor='nom'>Nom</label>
                  <input 
                  className='nameForm'
                  name="nom"
                  type="text"
                  placeholder='ex:Dupont'
                  required
                  pattern={REGEX.NAME_REGEX}
                  onChange={(event) => setFirstnameValue(event.target.value)}
                  />
                </div>
                <div className='prenomContainerLogin'>
                  <label htmlFor='prenom'>Prénom</label>
                  <input
                  className='prenomForm'
                  name="prenom"
                  type="text"
                  placeholder='ex: Jean'
                  required
                  pattern={REGEX.SURNAME_REGEX}
                  onChange={(event) => setSurnameValue(event.target.value)}
                  />
                </div>
                </div>
                <div className='emaileAndPassword'>
                <div className='emailContainerLogin'>
                    <label htmlFor='Email'>Adresse E-mail</label>
                    <input
                    name='email'
                    type="email"
                    className='emailForm'
                    placeholder='ex: Mellian@gmail.com'
                    required 
                    onChange={(event) => setEmailValue(event.target.value)}
                    />
                </div>
                <div className='passwordContainerLogin'>
                    <label htmlFor='Password'>Mot de passe</label>
                    <input
                    name='password'
                    type="password"
                    className='passwordForm'
                    required
                    placeholder='ex: Abc123,'
                    pattern={REGEX.PASSWORD_REGEX}
                    onChange={(event) => setPasswordValue(event.target.value)}
                    />
                </div>
                </div>
                <div className='buttonSubmit'>
                <button type="submit" className='bouttonSoumettre'>
                  <SaveAltIcon /> S'enregistrer
                </button>
                </div>
            </form>
            </div>
        </div>
        <div className='registerLink'>
        <a href="/login" alt="Se connecter" title="Se connecter">
            Vous avez déjà un compte?
        </a>
    </div>
    </div>
    </div>
  )
}

export default Register