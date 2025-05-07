import React,{useState} from 'react'
import { IMAGES } from '../../utils/images'
import { COUNTRY_DATA } from '../../utils/countryCodes';
import { Link } from 'react-router';


const LoginPage_1 = () => {
   const [countryEmoji, setCountryEmoji] = useState("🇮🇳");
   const [countryCode, setcountryCode] = useState("+91");
   const [formData, setFormData] = useState({

     mobile:"",

     country:"",
   });
 
   const handleChange = (e) => {
     const { name, value } = e.target;
     setFormData({ ...formData, [name]: value });
     console.log(formData)
   };
   const handleCountry=(code,emoji)=>{
     setCountryEmoji(emoji);
     formData.country=code
     console.log(formData)
 
   }
 
   const handleSubmit = (e) => {
     e.preventDefault();
     setFormData({
   
       mobile: "",
   
       country:""
     });
   };
 
   const stopPropagation = (e) => {
     e.stopPropagation();
   };

  return (
    <div>
    <div className='left-container'>
     <img src={IMAGES.LOGIN_MAIN_FRAME} alt='logo-main-img'/>
     <h1>Login / Sign up</h1>
     <p><img src={IMAGES.CHECK_RIGHT_ICON}/>Verified Listings Only</p>
     <p><img src={IMAGES.CHECK_RIGHT_ICON}/>Instant Property Matches</p>
     <p><img src={IMAGES.CHECK_RIGHT_ICON}/>Seamless Buying & Renting</p>
    </div>

    <div className='right-container'>
     <h1>Enter phone to continue</h1>

         <form onSubmit={handleSubmit} className="form">
            <div className="form-grid">


              {/* <label id="input-label">Mobile Number *</label> */}
              {/* <div > <span className="country-text">{countryEmoji}</span>{countryCode} <img src={IMAGES.CHEVRON_DOWN}/></div> */}
              <div className="phonenumber-field">
              <div className="country-container">
                <span className="country-text">{countryEmoji}</span>
                <select
                  className="country-dropdown"
                  name="country-selector"
                  onChange={(e)=>handleCountry(JSON.parse(e.target.value).code,JSON.parse(e.target.value).flag)}
                >
                  <option value="🇮🇳">{countryCode}</option>
                  {COUNTRY_DATA.map((item) => (
                    <option key={item.code} value={JSON.stringify({"flag":item.flag,"code":item.dial_code})}  >{item.dial_code}</option>
                  ))}
                </select>
              </div>
              <input
                id="input-phone"
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Enter Your mobile number *"
                onClick={stopPropagation}
                required
              />
              </div>

            <p>We’ll send OTP for verification</p>

              <button
                type="submit"
                onClick={(e) => e.stopPropagation()}
                className="request-submit-btn"
              >
                Continue
              </button>
            </div>
          </form>

                   <p>By continuing, you agree to our Terms & Conditions</p>
    </div>
    </div>
  )
}

export default LoginPage_1