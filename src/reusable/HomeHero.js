import React, { useState } from 'react'
import { IMAGES } from '../utils/images'
import "../styles/Home.css"
import { LOCATION_DATA, MAIN_SERACH_BAR_DATA } from '../utils/constant'




const HomeHero = () => {
  const [activeTab,setAcitveTab]=useState(0)
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
    <div className='hero-outlet'>

        <div className='center-conatiner'>
            <h1 className='center-conatiner-heading'>Welcome to Real Estate Pro</h1>
            <p className='center-conatiner-body'>Your Trusted Partner in Buying, Selling, and Renting Properties</p>
            <div className='search-container'>
              <div className='top-item-container'>
                {
                  MAIN_SERACH_BAR_DATA.items.map((item,index)=>(
                    <p key={item.title} className={ activeTab===index?'top-item-active':'top-item'} onClick={()=>{setAcitveTab(index)}}>{item.title}</p>
                  ))
                }
              </div>
              <div className='middle-item-container'>
                <select className='dropdown-container' >
                  <option>Hyderbad</option>
                  <option>Bengaluru</option>
                  <option>Chennai</option>
                </select>
                <div className='search-with-results'>
                  <div className='search-bar'>
                  {/* Selected Cities */}
                  <div className='selected-locations-container'>
                    {selectedCities.map((item,index)=><div key={index} className='selected-location'>{item}<img src={IMAGES.WHITE_CLOSE_ICON} onClick={()=>handleRemoveCities(index)}/></div>)}
                  </div>
                  {/* Input Container */}
                  {selectedCities.length<3 && <input type='text'  placeholder='Search up to 3 localities' onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur}/>}
                  </div>
                  {/* DropDownContaner */}
                  {showSearchResults && <div className='search-results'>
                    {filtered_list!==null && filtered_list.map((item,index)=>(
                      <li key={index} className='result-item' onClick={()=> { handleSelectedCitites(item)}}>{item}</li>
                    ))}
                    </div>}
                </div>
                <button className='search-btn'> <img src={IMAGES.SEARCH_ICON} alt='Search Icon'/>Search</button>
              </div>
              <div className='bottom-item-container'>
                <div className='radio-container'>
                  {
                    MAIN_SERACH_BAR_DATA.items[activeTab].filterOptions.checkOptions.map((item,index)=>(
                      <div key={index}>
                      <input type='radio' id={`option${index}`} name={`filterOptions-${activeTab}`}/>
                      <label htmlFor={`option${index}`} className='radio-label'> {item}</label>
                      </div>
                    ))
                  }
                </div>
                <div className='dropdown-options-container'>
                  {
                    MAIN_SERACH_BAR_DATA.items[activeTab].filterOptions.dropDownOptions.map(item=>(
                      <select name={item.name} key={item.name} className='dropdown-options'>
                        {
                          item.Options.map(item=>(
                            <option value={item} key={item}>{item}</option>
                          ))
                        }

                      </select>
                    ))
                  }
                </div>
              </div>
            </div>
        </div>
        <img src={IMAGES.HOME_HERO} alt='Hero Image' className='home-hero-image'/>
        
    </div>
  )
}

export default HomeHero