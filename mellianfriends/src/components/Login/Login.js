import React from 'react'
import logo from "../../images/43289078_1104665113044499_8887411126501900288_n.jpg";

function Login() {
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
            <form className='formConnexion'>
                <div className='emailContainerLogin'>
                    <label htmlFor='Email'>Adresse E-mail</label>
                    <input
                    name='email'
                    type="email"
                    className='emailForm'
                    placeholder='E-mail'
                    required></input>
                </div>
                <div className='passwordContainerLogin'>
                    <label htmlFor='Password'>Mot de passe</label>
                    <input
                    name='password'
                    type="password"
                    className='passwordForm'
                    required
                    placeholder='Mot de passe'
                    />
                </div>
            </form>
            </div>
            <div className='forgottenPassword'>
                <a href="/forgottenPassword" alt="Mot de passe oublié" title="Récupérer le mot de passe">
                    Mot de passe Oublié ?
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