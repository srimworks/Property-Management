import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from '../../firebase/auth';
import { IMAGES } from '../../utils/images';
import { fetchUserProperties } from '../../api/propertyApi';
import '../../styles/Transactions.css';

const MyTransactions = () => {
  const [user, setUser] = useState(null);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      
      // Load user's properties
      loadUserProperties(parsedUser);
    } else {
      // Redirect to login if not logged in
      navigate('/login');
    }
  }, [navigate]);
  
  const loadUserProperties = async (userData) => {
    try {
      setLoading(true);
      
      try {
        const response = await fetchUserProperties();
        if (response && Array.isArray(response.data.properties)) {
          setProperties(response.data.properties);
        }
      } catch (apiError) {
        console.error('API Error:', apiError);
        
        const allProperties = JSON.parse(localStorage.getItem('properties') || '[]');
        const userProps = allProperties.filter(prop => 
          prop.userId === userId
        );
        
        setProperties(userProps);
      }
    } catch (error) {
      console.error('Error loading properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (!user) {
    return <div className='transactions-container'>Loading...</div>;
  }

  return (
    <div className='transactions-container'>
      <div className='user-profile-section'>
        <div className='user-info'>
          <h2>Welcome, {user.fullName || 'User'}</h2>
          <p>Email: {user.email || 'No email provided'}</p>
          <p>Mobile: {user.mobile || 'No mobile number'}</p>
        </div>
        <button onClick={handleLogout} className='logout-btn'>
          Logout
        </button>
      </div>
      
      <div className='transactions-list'>
        <h3>Your Properties</h3>
        {loading ? (
          <p>Loading your properties...</p>
        ) : properties.length > 0 ? (
          <div className='property-cards'>
            {properties.map(property => (
              <div key={property.id} className='property-card'>
                <div className='property-image'>
                  {property.images && property.images.length > 0 ? (
                    <img src={property.images[0]} alt={property.apartmentType || 'Property'} />
                  ) : (
                    <img src={IMAGES.PROPERTY_PLACEHOLDER} alt='Property placeholder' />
                  )}
                </div>
                <div className='property-details'>
                  <h4>{property.title} </h4>
                  <p>Floor: {property.floor}</p>
                  <p>Built Up Area: {property.builtUpArea} sq.ft</p>
                  {property.facing && <p>Facing: {property.facing}</p>}
                  <p>Posted on: {new Date(property.owner.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='no-properties'>
            <p>You haven't posted any properties yet.</p>
            <button onClick={() => navigate('/post-property')} className='primary-btn'>
              Post a Property
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTransactions;