import React from 'react'
import { IMAGES } from '../utils/images'

const ProfileNav = () => {
  return (
    <div className=''>
    <div >
        <img src={IMAGES.MAIN_LOGO} alt='main-logo'/>
        <h1>RealEstatePro</h1>
        </div>
        <h2>Post Property</h2>
        <h2><img src={IMAGES.ACCOUNT_CIRCLE_ICON}/>Mahal Teja</h2>
    </div>
  )
}

export default ProfileNav