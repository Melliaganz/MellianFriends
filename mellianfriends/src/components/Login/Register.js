import React from 'react'
import logo from "../../images/43289078_1104665113044499_8887411126501900288_n.jpg";
import SaveAltIcon from '@mui/icons-material/SaveAlt';


function Register() {
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
            <form >
              <div className='nameAndSurname'>
                <div className='nameContainerLogin'>
                  <label htmlFor='nom'>Nom</label>
                  <input 
                  className='nameForm'
                  name="nom"
                  type="text"
                  placeholder='ex:Dupont'
                  required
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
                    required></input>
                </div>
                <div className='passwordContainerLogin'>
                    <label htmlFor='Password'>Mot de passe</label>
                    <input
                    name='password'
                    type="password"
                    className='passwordForm'
                    required
                    placeholder='ex: Abc123,'
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
        <a href="/Login" alt="Se connecter" title="Se connecter">
            Vous avez déjà un compte?
        </a>
    </div>
    </div>
    </div>
  )
}

export default Register