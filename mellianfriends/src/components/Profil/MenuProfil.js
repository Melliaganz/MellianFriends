import React from 'react'
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';

function MenuProfil() {
  return (
    <div className='MenuProfilContainer'>
        <div className='boutonsMenu'>
            <nav className='menuNavProfil'>
            <ul className='listeMenuNavProfil'>
            <li> 
            <a href="/profile/"  alt="Profile">
                Publications
            </a>
            </li>
            <li>
            <a href="/profile/about/" alt="About">
                à propos
            </a>
            </li>
            <li>
            <a href="/profile/about/" alt="Friends">
                Amis
            </a>
            </li>
            <li>
            <a href="/profile/about/" alt="Pictures">
                Photos
            </a>
            </li>
            <li>
            <a href="/profile/about/" alt="Vidéos">
                Vidéos
            </a>
            </li>
            <li>
            <a href="/profile/about/" alt="Places">
                Lieux
            </a>
            </li>
            <li>
            <a href="/profile/about/" alt="More" className='moreArrow'>
                plus<ArrowDropDownRoundedIcon />
            </a>
            </li>
            </ul>
            </nav>
        </div>
    </div>
  )
}

export default MenuProfil