import React from 'react'
import {IMAGES} from '../utils/images'
import "../styles/NavBar.css"
 
const NavBar = () => {
  console.log(IMAGES.YOUTUBE)
  return (
    <nav>
        <div className='nav-left'>
            <img src={IMAGES.MAIN_LOGO} alt='main-logo' />
            <h1 className='logo-text'>RealEstatePro</h1>
        </div>
        <div className='nav-right'>
            <h1 className='nav-right-text'>Buy/Sell</h1>
            <h1 className='nav-right-text'>Rent/Lease</h1>
            <h1 className='nav-right-text'>Property Management</h1>
            <h1 className='nav-right-text'>Post Property</h1>
            <button className='primary-btn'>Sign In</button>
        </div>
    </nav>
  )
}

export default NavBar