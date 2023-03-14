import React from 'react'
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import SpeakerNotesOffIcon from '@mui/icons-material/SpeakerNotesOff';


export const NoUserFound = () => {
    return (
        <div>
            <p className='textNoAccount'><NoAccountsIcon/> L'utilisateur n'existe pas </p>
        </div>
    );
};

export const NoPostFound = () => {
    return (
        <div>
            <p className=''><SpeakerNotesOffIcon /> Aucun Post</p>
        </div>
    )
}
export const PageNotFound = () => {
    return(
        <div className='pageNotFound'>
            <p>404: Page not found </p>
        </div>
    )
}
export const CommentsNotFound = () => {
    <div>
        <p>Aucun Commentaire</p>
    </div>
}