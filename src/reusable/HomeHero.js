import React from 'react'
import { IMAGES } from '../utils/images'

import "../styles/Home.css"

const HomeHero = () => {
  return (
    <div className='hero-outlet'>

        <div className='center-conatiner'>
            <h1 className='center-conatiner-heading'>Welcome to Real Estate Pro</h1>
            <p className='center-conatiner-body'>Your Trusted Partner in Buying, Selling, and Renting Properties</p>
            <div className='search-bar'></div>
        </div>
        <img src={IMAGES.HOME_HERO} alt='Hero Image' className='home-hero-image'/>
        
    </div>
  )
}

export default HomeHero