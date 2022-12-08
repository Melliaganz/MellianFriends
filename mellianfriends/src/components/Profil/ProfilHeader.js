import React from 'react'
import Portrait from "../../images/Portrait.jpg";
import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';

function ProfilHeader() {
  return (
    <div className='profileInfoContainer'>
        <div className='profilePictureContainer'>
          <a href="photoDeProfil" alt="PhotoDeProfil">
            <img src={Portrait} alt="profil" title="Photo de profil"></img>
          </a>
          <div className='changeProfilePictureContainer'>
          <a href="/profile/picture:id"className='changeProfilePicture'>
            <CameraAltRoundedIcon />
          </a>
        </div>
        </div>
          <div className='infoProfileContainer'>
        <div className='profileName'>
          <h2>Lucas Lengrand</h2>
          </div>
          <div className='friendsNumber'>
            <p>71 amis</p>
          </div>
        </div>
        <div className='buttonModifierProfil'>
          <button className='modProfil'><CreateRoundedIcon />Modifier le profil </button>
        </div>
        </div>
  )
}

export default ProfilHeader