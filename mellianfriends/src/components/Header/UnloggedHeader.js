import React from 'react'
import logo from "../../images/43289078_1104665113044499_8887411126501900288_n.jpg"

function UnloggedHeader() {
  return (
    <header className='headerOffline'>
      <div className='headerOfflineContainer'>
        <div className='navLogo'>
          <a href="/login" alt="Accueil">
          <img src={logo} width={80} height={80} alt="logo Mellianfriends"/>
          </a>
        </div>
      </div>
    </header>
  )
}

export default UnloggedHeader