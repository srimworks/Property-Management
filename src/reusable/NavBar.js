import React, { useEffect, useState } from 'react'
import {IMAGES} from '../utils/images'
import "../styles/NavBar.css"
import { Link, useLocation } from 'react-router'
import { LOCATION_DATA } from '../utils/constant'
 
const NavBar = () => {
  const location=useLocation().pathname;
    const [showSearchResults,setSearchResults]=useState(false)
    const [filtered_list,setFiltered_list]=useState(null)
    const [selectedCities,setSelectedCities]=useState([])
    const [inputText,setInputText]=useState("")
  
  
  
    const handleSelectedCitites=(item)=>{
      setSelectedCities([...selectedCities,item])
    }
  
    const handleRemoveCities=(indexOf)=>{
      setSelectedCities((prev)=>prev.filter((item,index)=>index!==indexOf))
    }
  
    const handleBlur=()=>{
      setTimeout(()=>{
        setSearchResults(false)
      },500)
    }
    const handleFocus=()=>{
      setSearchResults(true)
    }
    const handleChange=(e)=>{
      const value=e.target.value.toLowerCase();
  
      if (value===""){
        setFiltered_list(null)
      }
  
      else setFiltered_list(LOCATION_DATA.filter(item=>item.toLowerCase().includes(value)))
    }

  return (
    <nav className={location==='/' ? "nav-home":"nav"}>
      <Link to="/" className='link'>
        <div className='nav-left'>
            <img src={IMAGES.MAIN_LOGO} alt='main-logo' />
            <h1 className='logo-text'>RealEstatePro</h1>
        </div>
        </Link>
        {
          location!=="/" &&
          <div className='nav-search-with-results'>
            <div className='nav-search-bar'>
              <img src={IMAGES.SEARCH_ICON_BLACK} alt='search Icon'/>
            {/* Selected Cities */}
            <div className='selected-locations-nav'>
              {selectedCities.map((item,index)=><div key={index} className='selected-location'>{item}<img src={IMAGES.WHITE_CLOSE_ICON} onClick={()=>handleRemoveCities(index)}/></div>)}
            </div>
            {/* Input Container */}
            {selectedCities.length<3 && <input type='text'  placeholder='Search up to 3 localities' onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur}/>}
            </div>
            {/* DropDownContaner */}
            {showSearchResults && <div className='nav-search-results'>
              {filtered_list!==null && filtered_list.map((item,index)=>(
                <li key={index} className='nav-result-item' onClick={()=> { handleSelectedCitites(item)}}>{item}</li>
              ))}
              </div>}
          </div>
        }
        <Link to="/search-results" className='link'>
        <div className='nav-right'>
            <h1 className='nav-right-text'>Buy/Sell</h1>
            <h1 className='nav-right-text'>Rent/Lease</h1>
            <h1 className='nav-right-text'>Property Management</h1>
            <h1 className='nav-right-text'>Post Property</h1>
            <button className='primary-btn'>Sign In</button>
        </div>
        </Link>
    </nav>
  )
}

export default NavBar