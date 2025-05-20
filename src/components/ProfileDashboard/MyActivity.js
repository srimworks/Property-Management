import React from 'react'
import ProfileActivityCards from '../../reusable/ProfileActivityCards'

const MyActivity = () => {
  return (
    <div className='profile-cards-container'>
      <ProfileActivityCards/>
      <ProfileActivityCards/>
      <ProfileActivityCards/>
    </div>
  )
}

export default MyActivity