import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { getEmailFromCrypto, REGEX } from "../../_utils/auth/auth.functions";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ManageAccounts from "@mui/icons-material/ManageAccounts";

const AccountEdit = ({...account}) => {
 const { id } =useParams();
 const [emailValue, setEmailValue] = useState(
  getEmailFromCrypto(account.email)
 );
 const [firstNameValue, setFirstNameValue] = useState(account.name);
 const [surnameValue, setSurnameValue] = useState(account.surname); 
const [passwordValue, setPasswordValue] = useState();


const sendData = (e) => {
  e.preventDefault();
  console.log(emailValue, passwordValue, firstNameValue, surnameValue)

  const requestOptions = {
    method: "PUT",
    accept: "*/*",
    headers: { "Content-Type": "application/json"},
    credentials: "include",
    body: JSON.stringify({
      name: firstNameValue,
      surname: surnameValue,
      email: emailValue,
      password: passwordValue,
    }),
  };;
  console.log(requestOptions);
  fetch(`http://localhost:3000/api/auth/account/${id}`, requestOptions)
  .then((response) => {
    console.log(response);
    if (response.status === 200){
      account.onPost();
    }
  })
  .catch((error) => console.log(error));
  window.location.reload();

}
  return (
    <div className="formulaireDedit">
      <form onSubmit={sendData} encType="application/x-www-form-urlencoded">
        <div className="corpsFormulaire">
          <div className="formulaireNom">
          <label htmlFor="nom">Nom:</label>
          <input
          id="nom"
          name="nom"
          type="text"
          value={firstNameValue}
          className="formulaireInputNom"
          pattern={REGEX.NAME_REGEX}
          onChange={(event) => setFirstNameValue(event.target.value)}
          placeholder="Nom"
          />
          </div>
          <div className="formulaireSurname">
            <label htmlFor="Prénom">Prénom:</label>
            <input 
            id="prenom"
            name="prenom"
            type="text"
            value={surnameValue}
            className="formulaireInputPrénom"
            placeholder="Prénom"
            onChange={(event) => setSurnameValue(event.target.value)}
            />
          </div>
          <div className="formulaireEmail">
            <label htmlFor="Email">Adresse Email:</label>
            <input
            id="email"
            name="email"
            type="email"
            className="formulaireInputEmail"
            aria-describedby="emailHelp"
            placeholder="Email"
            value={emailValue}
            onChange={(event) => setEmailValue(event.target.value)}
            />
          </div>
          <div className="formulairePassword">
            <label htmlFor="Password">Mot de passe:</label>
            <input 
            id="password"
            name="password"
            type="password"
            placeholder="Mot de passe"
            pattern={REGEX.PASSWORD_REGEX}
            title="Minimum de 4 lettres et 1 chiffre"
            value={passwordValue}
            onChange={(event) => setPasswordValue(event.target.value)}
            />
          </div>
          <div className="bouttonSoumettreDiv">
          <button type="submit" className="bouttonSoumettreForm">
            <ManageAccounts /> Modifier
          </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AccountEdit