import React, { useState } from 'react'
import { getIdFromCookie } from '../../_utils/auth/auth.functions';

const FeedPost = ({ onPost }) => {
    const [contentValue, setContentValue] = useState("");
    const [imageUrlValue, setImageUrlValue] = useState("");
    const idFromCookie = getIdFromCookie();
    

    async function SendData(e) {
        e.preventDefault();
        console.log(contentValue, imageUrlValue);

        const requestOptions = {
            method:"POST",
            headers: {"Content-type": "application/json"},
            credentials: "include",
            body: JSON.stringify({
                content: contentValue,
                imageUrl: imageUrlValue,
            }),
        };

        await fetch("http://localhost:3000/api/posts/new", requestOptions)
        .then((response) => {
            if (response.status !== 201) {
            } else {
                onPost();
                setContentValue("");
                setImageUrlValue("");
            }
        })
        
        .catch((error) => console.log(error));
        window.location.reload();
    }

  return (
    <div className='cardCreatePostContainer'>
            <form onSubmit={SendData}>
            <div className='cardCreatePostTitle' >
                <a href={"/account/" + idFromCookie} alt="profil" title="Profil">
                <img src={imageUrlValue} crossOrigin="anonymous" alt="Profil" title="profil" height={45}/>
                </a>
                <textarea maxLength="450" type="text" alt="text" placeholder="Postez quelque chose..." required value={contentValue} onChange={(event) => setContentValue(event.target.value)}></textarea>
            </div>
            <div className='cardCreatePostBody'>
                <div className='bouttonAjouterPhoto'>
                    <input 
                    accept="image/*"
                    name="imageUrl"
                    type="file"
                    aria-labelledby='Images'
                    value={imageUrlValue}
                    onChange={(event) => setImageUrlValue(event.target.value)}
                    ></input>
                </div>
            </div>
            <div className='bouttonAccepter'>
                <button type="submit" className='btnAcpt' aria-labelledby='Publier' title='Publier'>
                    Publier
                </button>
            </div>
            </form>
        </div>
  )
}

export default FeedPost