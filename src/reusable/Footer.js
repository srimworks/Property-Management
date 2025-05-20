import React ,{useState}from 'react'
import { IMAGES } from '../utils/images'
import { Link } from 'react-router'

const Footer = () => {

    const [formData, setFormData] = useState({
   
      email: "",

    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
      console.log(formData)
    };
 
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setFormData({
   
        email: "",
     
      });
    };
  
    const stopPropagation = (e) => {
      e.stopPropagation();
    };

  return (
    <div className='main'>
      <div className=''>
        <h1 className=''>Real Estate</h1>
        <h1 className=''>Rentals</h1>
        <h1 className=''>PG’s</h1>
        <h1 className=''>Property Management</h1>
        <h1 className=''>Popular</h1>
      </div>
      <div className=''>
      <div>
        <img src={IMAGES.MAIN_LOGO} alt='main-logo'/>
        <h1 className=''>RealEstatePro</h1>
        <div>
          <img src={IMAGES.FACEBOOK_ICON}/>
          <img src={IMAGES.INSTAGRAM_ICON}/>
          <img src={IMAGES.TWITTER_ICON}/>
        </div>
      </div>

      <div className=''>
      <div className="">
          <h1 className="links-heading">Properties</h1>
          <ul className="links">
            <Link to="/" className="link">
              <li className="links-body">Real Estate</li>
            </Link>
            <Link to="/" className="link">
              <li className="links-body">Rentals</li>
            </Link>
            <Link to="/" className="link">
              <li className="links-body">PGs</li>
            </Link>
            <Link to="/" className="link">
              <li className="links-body">Commercial</li>
            </Link>
            <Link to="/" className="link">
              <li className="links-body">Luxury</li>
            </Link>
          </ul>
        </div>

        <div className="">
          <h1 className="links-heading">Company</h1>
          <ul className="links">
            <Link to="/" className="link">
              <li className="links-body">Contact Us</li>
            </Link>
            <Link to="/" className="link">
              <li className="links-body">Careers</li>
            </Link>
            <Link to="/" className="link">
              <li className="links-body">Press</li>
            </Link>
            <Link to="/" className="link">
              <li className="links-body">Blog</li>
            </Link>
          </ul>
        </div>
      </div>

      <div>
        <h1>Newsletter</h1>
        <p>Subscribe for the latest property updates</p>
        <form onSubmit={handleSubmit} className="form">
        <input
                id="input"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email address"
                onClick={stopPropagation}
                required
              />
              </form>

              <button className=''>Subscribe</button>
      </div>
      </div>
     
    </div>
  )
}

export default Footer