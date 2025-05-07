import React,{useState} from 'react'
import { IMAGES } from '../../utils/images';

const LoginPage_3 = () => {

          const [countryCode, setcountryCode] = useState("+91");
          const [formData, setFormData] = useState({
         
            mobile:"",
            fullname:"",
            email:""
          });
        
          const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
            console.log(formData)
          };
    
        
          const handleSubmit = (e) => {
            e.preventDefault();
            setFormData({
           
              mobile: "",
         fullname:"",
            email:""
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

                <div className="contact-input">
          <form onSubmit={handleSubmit} className="form">
            <div className="form-grid">

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


              <input
                id="input"
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                placeholder="Enter Name *"
                onClick={stopPropagation}
                required
              />

              {/* <label id="input-label">Email *</label> */}
              <input
                id="input"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Email *"
                onClick={stopPropagation}
                required
              />






 

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

    </div>
  )
}

export default LoginPage_3