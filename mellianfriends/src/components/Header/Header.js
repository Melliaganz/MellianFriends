import React, { useState } from 'react'
import logo from "../../images/43289078_1104665113044499_8887411126501900288_n.jpg"
import { logout } from '../../_utils/auth/auth.functions';
import profil from "../../images/Portrait.jpg"
import SearchIcon from '@mui/icons-material/Search';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SettingsIcon from '@mui/icons-material/Settings';
import { getIdFromCookie } from '../../_utils/auth/auth.functions';


export default function Header({onLogout, ...account}) {
    const [profilePic, setProfilePic] = useState(null);
    const idFromCookie = getIdFromCookie();

    const onClickLogout = (e) => {
        e.preventDefault();
        logout();
        onLogout();
        window.location.reload();
    }
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
                <li><a href={"/account/" + idFromCookie } alt="Profil" title="Profil" className='headerProfil'><img src={profilePic ? account.profilePic : "https://st3.depositphotos.com/1767687/16607/v/450/depositphotos_166074422-stock-illustration-default-avatar-profile-icon-grey.jpg"} alt="Profil"></img></a></li>
                <li><a href="/login" onClick={onClickLogout} alt="Settings" title="Paramètres" className='headerSettings'><SettingsIcon /></a></li>            
            </ul>
        </nav>
        </div>
        </div>
    </header>
  )
}
