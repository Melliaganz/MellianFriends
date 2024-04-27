import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Brightness4, Brightness7, Logout } from '@mui/icons-material'; // Importe les icônes pour le mode sombre
import logo from "../img/logo.png"
import { Button } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

function Header({ user, handleLogout, toggleDarkMode, darkMode }) {
  return (
    <header className='headerContainer'>
      <div className="logo">
        <Link to={"/"}>
        <Button>
        <img src={logo} alt="logo" width={25} height={25} />
        </Button>
        </Link>
      </div>
      <div className="home-button">
        {user && (
          <div className="menu">
            <Button onClick={handleLogout}><Logout /></Button>
            <Link to={`/profile/${user.uid}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <Button>
                {user.photoURL ? <img src={user.photoURL} alt="Profile" width={25} height={25} /> : <PersonIcon />}
              </Button>
            </Link>
            {/* Ajoute ici le menu pour accéder aux options de profil */}
          </div>
        )}
        <Button onClick={toggleDarkMode}>
          {darkMode ? <Brightness7 /> : <Brightness4 />} {/* Affiche l'icône en fonction du mode sombre */}
        </Button>
        <Link to="/">
          <Button><Home /></Button>
        </Link>
      </div>
    </header>
  );
}

export default Header;
