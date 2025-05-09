import React from 'react'
import '../styles/SuggestionCard.css'
import { IMAGES } from '../utils/images'
 
const SuggestionCard = () => {
  return (
    <div className='suggestion-card'>
        <img src={IMAGES.PROPERTY_IMAGE} alt='Property Image'/>
        <div className='suggestion-card-bottom'>
            <h2 className='suggestion-price'>₹ 3,500/mo</h2>
            <p className='suggestion-title'>1, 2, 3 BHK Apartments</p>
            <p className='suggestion-description'>Patancheru, West Hyderabad, Hyderabad</p>
            <button className='secondary-btn'>View Detais</button>
        </div>
    </div>
  )
}

export default SuggestionCard