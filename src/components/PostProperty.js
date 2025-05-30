import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/PostProperty.css";
import { IMAGES } from "../utils/images.js";
import { PRODUCT_ADD_DATA } from "../utils/constant.js";
import InputFeilds from "../reusable/InputFeilds.js";
import { handlePropertySubmission } from "../api/propertyApi";

const PostProperty = () => {
  const [activeFields, setActiveFields] = useState(0);
  const [productData, setProductData] = useState({});
  const [propertyImages, setPropertyImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      // Redirect to login if not logged in
      navigate('/login');
    }
  }, [navigate]);

  const LoadedPercentage = Math.round((activeFields) / PRODUCT_ADD_DATA.length * 100, 0);
  
  const handleInputChange = (id, value) => {
    setProductData((prev) => ({ ...prev, [id]: value }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length > 0) {
      const newImages = files.map(file => ({
        file,
        preview: URL.createObjectURL(file)
      }));
      
      setPropertyImages([...propertyImages, ...newImages]);
      
      setProductData(prev => ({
        ...prev,
        images: [...(prev.images || []), ...newImages.map(img => img.file)]
      }));
    }
  };

  const handleNext = async () => {
    const currentFields = PRODUCT_ADD_DATA[activeFields].inputFeilds;
  
    const allValid = currentFields.every((field) => {
      if (!field.required) return true;
      return productData[field.id] !== undefined && productData[field.id] !== "" && productData[field.id] !== "Select";
    });
  
    if (!allValid) {
      alert("Please fill all required fields before continuing.");
      return;
    }
    
    // If this is the last step, submit the form
    if (activeFields + 1 >= PRODUCT_ADD_DATA.length) {
      await handleSubmit();
    } else {
      // Otherwise, go to the next step
      setActiveFields((prev) => prev + 1);
    }
  };
  
  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setError("");
      
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      
      const propertySubmission = {
        ...productData,
        userId: userData.id || userData.firebaseUid,
        userContact: userData.mobile,
        userEmail: userData.email,
        createdAt: new Date().toISOString(),
        status: 'active'
      };
      
      try {
        const response = await handlePropertySubmission(propertySubmission);
        
        if (response && response.id) {
          const existingProperties = JSON.parse(localStorage.getItem('properties') || '[]');
          existingProperties.push(response);
          localStorage.setItem('properties', JSON.stringify(existingProperties));
          
          alert("Property posted successfully!");
          navigate('/profile/properties');
        }
      } catch (apiError) {
        console.error("API Error:", apiError);
        
        const newPropertyId = Date.now().toString();
        const newProperty = {
          id: newPropertyId,
          ...propertySubmission
        };
        
        const existingProperties = JSON.parse(localStorage.getItem('properties') || '[]');
        existingProperties.push(newProperty);
        localStorage.setItem('properties', JSON.stringify(existingProperties));
        
        const userProperties = JSON.parse(localStorage.getItem('userProperties') || '{}');
        if (!userProperties[userData.id || userData.firebaseUid]) {
          userProperties[userData.id || userData.firebaseUid] = [];
        }
        
        userProperties[userData.id || userData.firebaseUid].push(newPropertyId);
        localStorage.setItem('userProperties', JSON.stringify(userProperties));
        
        alert("Property posted successfully! (Saved locally)");
        navigate('/profile/properties');
      }
    } catch (error) {
      console.error("Error submitting property:", error);
      setError("Failed to submit property. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="outlet-render-post-property">
      <div className="post-property-main-content">
        <div className="top-bar">
          <img src={IMAGES.SMALL_LOGO_ICON} alt="Small Logo" />
          <div className="progressbar-container">
            <div className="progressbar-outer">
              <div className="progressbar-inner" style={{width: `${LoadedPercentage}%`}}></div>
            </div>
            <p className="progessbar-text">{LoadedPercentage}% done</p>
          </div>
        </div>
        <div className="middle-bar-container">
          <div className="middle-side-bar">
            {PRODUCT_ADD_DATA.map((item,index) => (
              <div className={ activeFields===index?"sidebar-text-container-active":"sidebar-text-container"}  key={item.id}>
                <img src={item.icon} alt="icon" />
                <p className="sidebar-text">{item.name}</p>
              </div>
            ))}
          </div>
          <div className="middle-input-conatiner">
            <h2 className="middle-heading">{PRODUCT_ADD_DATA[activeFields].name}</h2>
            <div className="input-fields-container">
              {
                PRODUCT_ADD_DATA[activeFields].inputFeilds.map(item=>(
                  <InputFeilds key={item.id} input={item} value={productData[item.id]}
                  onChange={handleInputChange}/>
                ))
              }
              
              {PRODUCT_ADD_DATA[activeFields].name === "Gallery" && (
                <div className="image-upload-container">
                  <label className="image-upload-label">
                    <img src={IMAGES.CAMERA_ICON} alt="Upload" />
                    <span>Upload Property Images</span>
                    <input 
                      type="file" 
                      multiple 
                      accept="image/*" 
                      onChange={handleImageUpload} 
                      style={{ display: 'none' }} 
                    />
                  </label>
                  
                  {propertyImages.length > 0 && (
                    <div className="image-preview-container">
                      {propertyImages.map((image, index) => (
                        <div key={index} className="image-preview">
                          <img src={image.preview} alt={`Property ${index + 1}`} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-bar">
        {activeFields > 0 && (
          <button
            className="secondary-btn"
            onClick={() => setActiveFields((prev) => prev - 1)}
            disabled={isSubmitting}
          >
            Back
          </button>
        )}
        <button 
          className="primary-btn" 
          onClick={handleNext}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : activeFields + 1 === PRODUCT_ADD_DATA.length ? 'Submit Property' : 'Save & Continue'}
        </button>
      </div>
      {error && <div className="error-message" style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>{error}</div>}
    </div>
  );
};

export default PostProperty;
