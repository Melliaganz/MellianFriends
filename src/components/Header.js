import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Brightness4, Brightness7, Logout } from '@mui/icons-material'; // Importe les icônes pour le mode sombre
import logo from "../img/logo.png"

function Header({ user, handleLogout, toggleDarkMode, darkMode }) {
  return (
    <header className='headerContainer'>
      <div className="logo">
        <img src={logo} alt="logo" width={25} height={25} />
      </div>
      {user && (
        <div className="menu">
          <button onClick={handleLogout}><Logout /></button>
          {/* Ajoute ici le menu pour accéder aux options de profil */}
        </div>
      )}
      <div className="home-button">
        <button onClick={toggleDarkMode}>
          {darkMode ? <Brightness7 /> : <Brightness4 />} {/* Affiche l'icône en fonction du mode sombre */}
        </button>
        <Link to="/">
          <span><Home /></span>
        </Link>
      </div>
    </header>
  );
}

export default Header;
