import React, { useEffect, useState } from "react";
import { IMAGES } from "../utils/images";
import "../styles/NavBar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LOCATION_DATA } from "../utils/constant";
import LoginPage from "../components/SignIn/LoginPage";
import { searchProperties } from "../api/propertyApi";

const NavBar = () => {
  const location = useLocation().pathname;
  const navigate = useNavigate();
  const [showSearchResults, setSearchResults] = useState(false);
  const [filtered_list, setFiltered_list] = useState(null);
  const [selectedCities, setSelectedCities] = useState([]);
  const [inputText, setInputText] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [mobiledropdown,setMobileDropdown]=useState(false);
  const [searchQuery, setSearchQuery] = useState("")

  const handleSelectedCitites = (item) => {
    setSelectedCities([...selectedCities, item]);
  };

  const handleRemoveCities = (indexOf) => {
    setSelectedCities((prev) =>
      prev.filter((item, index) => index !== indexOf)
    );
  };

  const handleBlur = () => {
    setTimeout(() => {
      setSearchResults(false);
    }, 500);
  };
  const handleFocus = () => {
    setSearchResults(true);
  };
  const handleChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchQuery(value);

    if (value === "") {
      setFiltered_list(null);
    } else
      setFiltered_list(
        LOCATION_DATA.filter((item) => item.toLowerCase().includes(value))
      );
  };
  
  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    
    const searchParams = {
      query: searchQuery,
      location: selectedCities.join(',')
    };
    
    try {
      const results = await searchProperties(searchParams);
      
      localStorage.setItem('searchResults', JSON.stringify(results));
      localStorage.setItem('searchParams', JSON.stringify(searchParams));
      
      navigate('/search-results');
      setSearchResults(false);
    } catch (error) {
      console.error('Error performing search:', error);
    }
  };

  const handleSignin=()=>{
    setShowLogin(true);
    setMobileDropdown(false)
  }

  return (
    <nav className={location === "/" ? "nav-home" : "nav"}>
      
        <div className="nav-left">
          <Link to="/" className="link" onClick={()=>setMobileDropdown(false)}>
          <div className="nav-logo">
            <img src={IMAGES.MAIN_LOGO} alt="main-logo" />
            <h1 className="logo-text">RealEstatePro</h1>
        </div>
        </Link>
        {location !== "/" && !location.includes("/profile") && (
          <div className="nav-search-with-results">
            <form onSubmit={handleSearch} className="search-form">
              <div className="nav-search-bar">
                <img src={IMAGES.SEARCH_ICON_BLACK} alt="search Icon" />
                {/* Selected Cities */}
                <div className="selected-locations-nav">
                  {selectedCities.map((item, index) => (
                    <div key={index} className="selected-location">
                      {item}
                      <img
                        src={IMAGES.WHITE_CLOSE_ICON}
                        onClick={() => handleRemoveCities(index)}
                      />
                    </div>
                  ))}
                </div>
                {/* Input Container */}
                {selectedCities.length < 3 && (
                  <input
                    type="text"
                    placeholder="Search properties, locations..."
                    value={searchQuery}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                )}
                <button type="submit" className="search-button">
                  Search
                </button>
              </div>
            </form>
            {/* DropDownContaner */}
            {showSearchResults && (
              <div className="nav-search-results">
                {filtered_list !== null &&
                  filtered_list.map((item, index) => (
                    <li
                      key={index}
                      className="nav-result-item"
                      onClick={() => {
                        handleSelectedCitites(item);
                      }}
                    >
                      {item}
                    </li>
                  ))}
              </div>
            )}
          </div>
        )}
        <span className="material-symbols-outline" onClick={()=>setMobileDropdown(!mobiledropdown)}>dehaze</span>
        </div>
      
      <div className={mobiledropdown ?"nav-center-active" :"nav-center"}>
        

        <div className="nav-right">
          {!location.includes("/profile") && (
            <>
              <Link to="/search-results" className={mobiledropdown ? "link-100":"link"}  onClick={()=>setMobileDropdown(false)}>
                <h1 className="nav-right-text">Buy/Sell</h1>
              </Link>
              <h1 className="nav-right-text">Rent/Lease</h1>
              <h1 className="nav-right-text">Property Management</h1>
            </>
          )}

          <Link to="/post-property" className={mobiledropdown ? "link-100":"link"}>
            <h1 className="nav-right-text">Post Property</h1>
          </Link>
          <button className="primary-btn" onClick={handleSignin}>
            Sign In
          </button>
        </div>
        
      </div>
      {showLogin && (
          <div className="login-container">
            <LoginPage setShowLogin={setShowLogin} />
          </div>
        )}
    </nav>
  );
};

export default NavBar;
