import React, { useState } from 'react'
import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded';


const Profilbanner = ({...account}) => {
  const [bannerPic, setBannerPic] = useState(null);
  return (
    <div className="profilHeaderBannerContainer">
    <div className='profilHeaderBanner'>
        <a href="/photodecouverture">
        <img src={bannerPic ? account.coverPic : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWMAAACOCAMAAADTsZk7AAAAD1BMVEXr6+v39/f09PTu7u7w8PBHPc6pAAABSUlEQVR4nO3b0W6DIBSA4Qq8/zNP01admhYQZuK+73JX5g85B9Ls8QAAAAAAAAAAAAAAAAAAAAAAAHKkEEK6+iNuLYZhEuLVH3JfcXgRuZswzJGv/pS7mo/xyEHuI2ncXdC4O+f4DyyJXSx6WQ6yZ8gp8cMRfU9kV7dTxowfHstpquwxfU74NgpiSmbxKclK621eagZuL6vHssh9xPVDTuQu1onXey/acq2kX4mXG9p0vN3Wmtgkni8X0cOulbhN/BrJ0W2ulRj2jaew0fO5maPEY9jg56VmjhMfjA5q7fbdIXvvhLzEfvw44XDfidxUdmIjuVZ+YpEr5Q7jJ3uvQllikSvk77s3e69UcWIjuVR5YpELlQ7jJyO5QF1ikUtUJrb3ClQ3NpKzadzf9I9gG8P+TwcMZAAAAAAAAAAAAAAAAAAAAAAA/qcfVokFwcQV/cEAAAAASUVORK5CYII="} alt="Couverture"/>
        </a>
    </div>
    <div className='buttonModifyBanner'>
        <button type="picture" alt="changeProfilePicture"><CameraAltRoundedIcon />Changer la photo de couverture</button>
    </div>
    </div>
  )
}

export default Profilbanner