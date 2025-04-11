import React from 'react'
import {IMAGES} from '../utils/images'
 
const NavBar = () => {
  console.log(IMAGES.YOUTUBE)
  return (
    <div>
        <div>
            <img src={IMAGES.MAIN_LOGO} alt='main-logo' style={{backgroundColor:"black"}}/>
            <h1>RealEstatePro</h1>
        </div>
        <div>
            <h1>Buy/Sell</h1>
            <h1>Rent/Lease</h1>
            <h1>Property Management</h1>
            <h1>Post Property</h1>
            <button>Sign In</button>
        </div>
    </div>
  )
}

export default NavBar