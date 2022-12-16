import React, { useState } from 'react'
import profil from "../../images/Portrait.jpg"

const FeedPost = ({ onPost }) => {
    const [contentValue, setContentValue] = useState("");
    const [imageUrlValue, setImageUrlValue] = useState("");

    async function SendData(e) {
        e.preventDefault();
        console.log(contentValue, imageUrlValue);

        const requestOptions = {
            method:"POST",
            headers: {"Content-type": "multipart/form-data"},
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
    }

  return (
    <div className='cardCreatePostContainer'>
            <form onSubmit={SendData}>
            <div className='cardCreatePostTitle' >
                <a href="/profil" alt="profil">
                <img src={profil} alt="Profil" title="profil" height={45}/>
                </a>
                <input type="text" alt="text" placeholder="Postez quelque chose..." value={contentValue} onChange={(event) => setContentValue(event.target.value)}></input>
            </div>
            <div className='cardCreatePostBody'>
                <div className='bouttonAjouterPhoto'>
                    <input 
                    accept="image/*"
                    name="image"
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