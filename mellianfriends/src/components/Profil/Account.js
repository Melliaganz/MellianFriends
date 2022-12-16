import React from 'react';
import Profilbanner from './Profilbanner';
import ProfilHeader from './ProfilHeader';
import MenuProfil from "./MenuProfil";

function Account() {
  return (
    <section className='ProfilHeader'>
      <div className='profilBanner'>
        <Profilbanner />
      </div>
      <div className='profilePic'>
        <ProfilHeader />
        <MenuProfil />
      </div>
    </section>
  )
}

export default Account