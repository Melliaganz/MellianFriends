import React from 'react'
import Person2RoundedIcon from '@mui/icons-material/Person2Rounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import portrait from "../../images/Portrait.jpg";
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';

function Rightbar() {
  return (
    <div className='rightbarContainer'>
        <div className='rightbarHeader'>
            <div className='titleRightbar'>
            <h3><Person2RoundedIcon /> Contact</h3>
            </div>
            <div className='iconsRightbarHeader'>
                <span className='searchIcon'><SearchRoundedIcon /></span>
                <span className='MoreHorizIcon'><MoreHorizRoundedIcon /></span>
            </div>        
        </div>
        <div className='rightbarFriendsContainer'>
            <a href="/profile" alt="Profile">
            <img src={portrait} alt="portrait" height={30}></img>
            Lengrand Lucas
            </a>
            <a href="/profile" alt="Profile">
            <img src={portrait} alt="portrait" height={30}></img>
            Lengrand Lucas
            </a>
            <a href="/profile" alt="Profile">
            <img src={portrait} alt="portrait" height={30}></img>
            Lengrand Lucas
            </a>
            <a href="/profile" alt="Profile">
            <img src={portrait} alt="portrait" height={30}></img>
            Lengrand Lucas
            </a>
            <a href="/profile" alt="Profile">
            <img src={portrait} alt="portrait" height={30}></img>
            Lengrand Lucas
            </a>
            <a href="/profile" alt="Profile">
            <img src={portrait} alt="portrait" height={30}></img>
            Lengrand Lucas
            </a>
            <a href="/profile" alt="Profile">
            <img src={portrait} alt="portrait" height={30}></img>
            Lengrand Lucas
            </a>
            <a href="/profile" alt="Profile">
            <img src={portrait} alt="portrait" height={30}></img>
            Lengrand Lucas
            </a>
            <a href="/profile" alt="Profile">
            <img src={portrait} alt="portrait" height={30}></img>
            Lengrand Lucas
            </a>
            <a href="/profile" alt="Profile">
            <img src={portrait} alt="portrait" height={30}></img>
            Lengrand Lucas
            </a>
            <a href="/profile" alt="Profile">
            <img src={portrait} alt="portrait" height={30}></img>
            Lengrand Lucas
            </a>
            <a href="/profile" alt="Profile">
            <img src={portrait} alt="portrait" height={30}></img>
            Lengrand Lucas
            </a>
            <a href="/profile" alt="Profile">
            <img src={portrait} alt="portrait" height={30}></img>
            Lengrand Lucas
            </a>
            <a href="/profile" alt="Profile">
            <img src={portrait} alt="portrait" height={30}></img>
            Lengrand Lucas
            </a>
            <a href="/profile" alt="Profile">
            <img src={portrait} alt="portrait" height={30}></img>
            Lengrand Lucas
            </a>
            <a href="/profile" alt="Profile">
            <img src={portrait} alt="portrait" height={30}></img>
            Lengrand Lucas
            </a>
            <a href="/profile" alt="Profile">
            <img src={portrait} alt="portrait" height={30}></img>
            Lengrand Lucas
            </a>
            <a href="/profile" alt="Profile">
            <img src={portrait} alt="portrait" height={30}></img>
            Lengrand Lucas
            </a>
            <a href="/profile" alt="Profile">
            <img src={portrait} alt="portrait" height={30}></img>
            Lengrand Lucas
            </a>
            <a href="/profile" alt="Profile">
            <img src={portrait} alt="portrait" height={30}></img>
            Lengrand Lucas
            </a>
            <a href="/profile" alt="Profile">
            <img src={portrait} alt="portrait" height={30}></img>
            Lengrand Lucas
            </a>
            <a href="/profile" alt="Profile">
            <img src={portrait} alt="portrait" height={30}></img>
            Lengrand Lucas
            </a>
            <a href="/profile" alt="Profile">
            <img src={portrait} alt="portrait" height={30}></img>
            Lengrand Lucas
            </a>
            <a href="/profile" alt="Profile">
            <img src={portrait} alt="portrait" height={30}></img>
            Lengrand Lucas
            </a>
        </div>
        <div className='creerConversationBoutton'>
            <button className='creerConversationButton'><NoteAltOutlinedIcon /></button>
        </div>
    </div>
  )
}

export default Rightbar