import React, { useState } from 'react'
import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';



const ProfilHeader = ({...account}) => {
  const [photoUrl, setPhotoUrl] = useState(null);
  return (
    <div className='profileInfoContainer'>
        <div className='profilePictureContainer'>
          <a href="photoDeProfil" alt="PhotoDeProfil">
            <img src={photoUrl ? account.profilePic : "https://st3.depositphotos.com/1767687/16607/v/450/depositphotos_166074422-stock-illustration-default-avatar-profile-icon-grey.jpg" } alt="profil" title="Photo de profil"></img>
          </a>
          <div className='changeProfilePictureContainer'>
          <a href="/profile/picture:id"className='changeProfilePicture'>
            <CameraAltRoundedIcon />
          </a>
        </div>
        </div>
          <div className='infoProfileContainer'>
        <div className='profileName'>
          <h2>{account.name}{account.surname}</h2>
          </div>
          <div className='friendsNumber'>
            <p>71 amis</p>
          </div>
        </div>
        <div className='buttonModifierProfil'>
          <a href={"/account/" + account.id +"/edit"} className='modProfil'><CreateRoundedIcon />Modifier le profil </a>
        </div>
        </div>
  )
}

export default ProfilHeader