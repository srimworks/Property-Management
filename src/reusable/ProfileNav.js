import React from 'react'
import { IMAGES } from '../utils/images'

const ProfileNav = () => {
  return (
    <div className=''>
    <div>
        <img src={IMAGES.MAIN_LOGO} alt='logo'/>
        <h1 className='logo-text'>RealEstatePro</h1>
        </div>
        <h2>Post Property</h2>
        <h2><img src={IMAGES.ACCOUNT_CIRCLE_ICON}/>Mahal Teja</h2>
    </div>
  )
}

export default ProfileNav