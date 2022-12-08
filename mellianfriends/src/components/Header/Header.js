import React from 'react'
import logo from "../../images/43289078_1104665113044499_8887411126501900288_n.jpg"
import profil from "../../images/Portrait.jpg"
import SearchIcon from '@mui/icons-material/Search';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SettingsIcon from '@mui/icons-material/Settings';

export default function Header() {
  return (
    <header className='headerOnLine'>
        <div className='headerContainer'>
        <div className='navLogoContainer'>
            <a className='navLogo' href="/">
                <img src={logo} width={80} height={80} alt="logo MellianFriends"></img>
            </a>
            </div>
            <div className='rechercherNavContainer'>
                <button type='search' className='searchButton' aria-labelledby='bouttonSearch'><SearchIcon /></button>
                <input type="search" className="searchBarInput" placeholder="Rechercher"></input></div>
        <div className='menuNavContainer'>
        <nav className='navOnline'>
            <ul className='menuNavbar'>
                <li><a href="/" alt="Accueil" title="Accueil" className='headerAccueil'> <HomeRoundedIcon /> </a></li>
                <li><a href="/profile" alt="Profil" title="Profil" className='headerProfil'><img src={profil} alt="Profil"></img></a></li>
                <li><a href="/settings" alt="Settings" title="Paramètres" className='headerSettings'><SettingsIcon /></a></li>            
            </ul>
        </nav>
        </div>
        </div>
    </header>
  )
}
