import React from 'react'
import Cover from "../../images/a0037309517_10.jpg"
import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded';

function Profilbanner() {
  return (
    <div className="profilHeaderBannerContainer">
    <div className='profilHeaderBanner'>
        <a href="/photodecouverture">
        <img src={Cover} alt="Couverture"/>
        </a>
    </div>
    <div className='buttonModifyBanner'>
        <button type="picture" alt="changeProfilePicture"><CameraAltRoundedIcon />Changer la photo de couverture</button>
    </div>
    </div>
  )
}

export default Profilbanner