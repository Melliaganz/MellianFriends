import React from 'react';
import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';

const Account = ({...account}) => {
  return (
    <section className='ProfilHeader'>
      <div className="profilHeaderBannerContainer">
      <div className='profilHeaderBanner'>
        <a href="/photodecouverture">
        <img src={account.coverPic} crossOrigin="anonymous" alt="Couverture" title="Photo de couverture"></img>
        </a>
    </div>
    <div className='buttonModifyBanner'>
        <button type="picture" alt="changeProfilePicture"><CameraAltRoundedIcon />Changer la photo de couverture</button>
    </div>
    </div>
      <div className='profileInfoContainer'>
        <div className='profilePictureContainer'>
          <a href="photoDeProfil" alt="PhotoDeProfil">
            <img 
            src={account.profilePic } width={168} height={168} crossOrigin="anonymous" alt="profil" title="Photo de profil"></img>
          </a>
          <div className='changeProfilePictureContainer'>
          <a href="/profile/picture:id"className='changeProfilePicture'>
            <CameraAltRoundedIcon />
          </a>
        </div>
        </div>
          <div className='infoProfileContainer'>
        <div className='profileName'>
          <h2>{account.name} {account.surname}</h2>
          </div>
          <div className='friendsNumber'>
            <p>71 amis</p>
          </div>
        </div>
        {account.canEdit === true &&(
        <div className='buttonModifierProfil'>
          <a href={"/account/" + account.id +"/edit"} className='modProfil'><CreateRoundedIcon />Modifier le profil </a>
        </div>
)}
        </div>
    </section>
  )
}

export default Account