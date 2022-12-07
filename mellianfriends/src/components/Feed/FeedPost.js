import React from 'react'
import profil from "../../images/Portrait.jpg"

function FeedPost() {
  return (
    <div className='cardCreatePostContainer'>
            <form>
            <div className='cardCreatePostTitle'>
                <a href="/profil" alt="profil">
                <img src={profil} alt="Profil" title="profil" height={45}/>
                </a>
                <input type="text" alt="text" placeholder="Postez quelque chose..."></input>
            </div>
            <div className='cardCreatePostBody'>
                <div className='bouttonAjouterPhoto'>
                    <input 
                    accept="image/*"
                    name="image"
                    type="file"
                    ></input>
                </div>
            </div>
            <div className='bouttonAccepter'>
                <button type="submit" className='btnAcpt'>
                    Publiez
                </button>
            </div>
            </form>
        </div>
  )
}

export default FeedPost