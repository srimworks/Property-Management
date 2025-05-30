import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IMAGES } from '../utils/images';
import { fetchPropertyById } from '../api/propertyApi';
import '../styles/PropertyDetails.css';

const PropertyDetails = () => {
  const { propertyId } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: 'I am interested in this property. Please contact me.'
  });

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        setLoading(true);
        
        const response = await fetchPropertyById(propertyId);
        
        if (response && response.property) {
          setProperty(response.property);
        }
      } catch (error) {
        console.error('Error fetching property details:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPropertyDetails();
  }, [propertyId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm({
      ...contactForm,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Your inquiry has been sent to the property owner. They will contact you soon.');
    setContactForm({
      name: '',
      email: '',
      phone: '',
      message: 'I am interested in this property. Please contact me.'
    });
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="property-details-container">
        <div className="loading-container">
          <p>Loading property details...</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="property-details-container">
        <div className="not-found-container">
          <h2>Property Not Found</h2>
          <p>The property you're looking for doesn't exist or has been removed.</p>
          <button className="primary-btn" onClick={handleGoBack}>Go Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="property-details-container">
      <div className="property-details-header">
        <button className="back-button" onClick={handleGoBack}>
          <span>&larr;</span> Back to Search Results
        </button>
        <h1>{property.title || 'Property Details'}</h1>
        <p className="property-location">
          <img src={IMAGES.PROPERTY_LOCATION} alt="Location" />
          {property.locality || property.address || 'Location not specified'}
        </p>
      </div>

      <div className="property-details-content">
        <div className="property-gallery">
          <div className="main-image">
            <img 
              src={property.images && property.images.length > 0 
                ? property.images[activeImage] 
                : IMAGES.PROPERTY_PLACEHOLDER} 
              alt={property.title || 'Property'} 
            />
          </div>
          
          {property.images && property.images.length > 1 && (
            <div className="image-thumbnails">
              {property.images.map((image, index) => (
                <div 
                  key={index} 
                  className={`thumbnail ${activeImage === index ? 'active' : ''}`}
                  onClick={() => setActiveImage(index)}
                >
                  <img src={image} alt={`Property ${index + 1}`} />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="property-info">
          <div className="property-price-section">
            <h2 className="property-price">₹ {property.price || 'Price not specified'}</h2>
            <div className="property-features">
              {property.bedrooms && (
                <div className="feature">
                  <span className="feature-value">{property.bedrooms}</span>
                  <span className="feature-label">Bedrooms</span>
                </div>
              )}
              {property.bathrooms && (
                <div className="feature">
                  <span className="feature-value">{property.bathrooms}</span>
                  <span className="feature-label">Bathrooms</span>
                </div>
              )}
              {property.area && (
                <div className="feature">
                  <span className="feature-value">{property.area}</span>
                  <span className="feature-label">Sq. Ft.</span>
                </div>
              )}
            </div>
          </div>

          <div className="property-details-section">
            <h3>Property Details</h3>
            <div className="details-grid">
              <div className="detail-item">
                <span className="detail-label">Property Type</span>
                <span className="detail-value">{property.propertyType || 'Not specified'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Furnishing</span>
                <span className="detail-value">{property.furnishing || 'Not specified'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Floor</span>
                <span className="detail-value">{property.floor || 'Not specified'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Facing</span>
                <span className="detail-value">{property.facing || 'Not specified'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Age of Property</span>
                <span className="detail-value">{property.age || 'Not specified'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Available From</span>
                <span className="detail-value">{property.availableFrom || 'Not specified'}</span>
              </div>
            </div>
          </div>

          <div className="property-description">
            <h3>Description</h3>
            <p>{property.description || 'No description available for this property.'}</p>
          </div>

          {property.amenities && property.amenities.length > 0 && (
            <div className="property-amenities">
              <h3>Amenities</h3>
              <div className="amenities-list">
                {property.amenities.map((amenity, index) => (
                  <div key={index} className="amenity-item">
                    <span className="amenity-icon">✓</span>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="contact-owner-section">
        <h3>Contact Owner</h3>
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={contactForm.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={contactForm.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={contactForm.phone}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={contactForm.message}
              onChange={handleInputChange}
              rows="4"
              required
            ></textarea>
          </div>
          <button type="submit" className="primary-btn">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default PropertyDetails;
