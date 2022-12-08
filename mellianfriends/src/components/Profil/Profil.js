import React from 'react'
import Intro from './Intro';
import MenuProfil from './MenuProfil';
import Profilbanner from './Profilbanner';
import ProfilHeader from './ProfilHeader';
import FeedPost from '../Feed/FeedPost';
import FeedContent from '../Feed/FeedContent';
import Friends from './Friends';
import Photos from './Photos';

function Profil() {
  return (
    <div className='fullContainerProfil'>
    <div className='profilContainer'>
      <div className='profilHeaderContainer'>
        <Profilbanner />
      </div>
      <ProfilHeader />
      <MenuProfil />
    </div>
    <div className='feedContentContainer'>
    <div className='infosComponent'>
      <Intro />
      <Photos />
      <Friends />
    </div>
    <div className='feedContentProfil'>
    <FeedPost/>
    <FeedContent />
    <FeedContent />
    <FeedContent />
    <FeedContent />
    <FeedContent />
    <FeedContent />
    <FeedContent />
    </div>
    </div>
    </div>
  )
}

export default Profil