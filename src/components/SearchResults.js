import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IMAGES } from '../utils/images';
import '../styles/SearchResults.css';
import { searchProperties } from '../api/propertyApi';

const SearchResults = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useState({});
  const [filters, setFilters] = useState({
    propertyType: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    furnishing: ''
  });

  useEffect(() => {
    const loadSearchResults = async () => {
      try {
        setLoading(true);
        
        const storedParams = JSON.parse(localStorage.getItem('searchParams') || '{}');
        setSearchParams(storedParams);
        
        const storedResults = JSON.parse(localStorage.getItem('searchResults') || '{}');
        
        if (storedResults && storedResults.properties && storedResults.properties.length > 0) {
          setProperties(storedResults.properties);
          setLoading(false);
          return;
        }
        
        const results = await searchProperties(storedParams);
        
        if (results && results.properties) {
          setProperties(results.properties);
        }
      } catch (error) {
        console.error('Error loading search results:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadSearchResults();
  }, []);
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };
  
  const applyFilters = async () => {
    try {
      setLoading(true);
      
      const filterParams = {
        ...searchParams,
        ...filters
      };
      
      const results = await searchProperties(filterParams);
      
      if (results && results.properties) {
        setProperties(results.properties);
        localStorage.setItem('searchResults', JSON.stringify(results));
        localStorage.setItem('searchParams', JSON.stringify(filterParams));
        setSearchParams(filterParams);
      }
    } catch (error) {
      console.error('Error applying filters:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const resetFilters = async () => {
    setFilters({
      propertyType: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      furnishing: ''
    });
    
    try {
      setLoading(true);
      const results = await searchProperties(searchParams);
      
      if (results && results.properties) {
        setProperties(results.properties);
      }
    } catch (error) {
      console.error('Error resetting filters:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handlePropertyClick = (propertyId) => {
    navigate(`/property/${propertyId}`);
  };

  return (
    <div className="search-results-container">
      <div className="search-filters">
        <h2>Filters</h2>
        <div className="filter-group">
          <label>Property Type</label>
          <select 
            name="propertyType" 
            value={filters.propertyType} 
            onChange={handleFilterChange}
          >
            <option value="">Any</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="villa">Villa</option>
            <option value="penthouse">Penthouse</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label>Price Range</label>
          <div className="price-range">
            <input 
              type="number" 
              name="minPrice" 
              placeholder="Min" 
              value={filters.minPrice} 
              onChange={handleFilterChange}
            />
            <span>to</span>
            <input 
              type="number" 
              name="maxPrice" 
              placeholder="Max" 
              value={filters.maxPrice} 
              onChange={handleFilterChange}
            />
          </div>
        </div>
        
        <div className="filter-group">
          <label>Bedrooms</label>
          <select 
            name="bedrooms" 
            value={filters.bedrooms} 
            onChange={handleFilterChange}
          >
            <option value="">Any</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4+</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label>Furnishing</label>
          <select 
            name="furnishing" 
            value={filters.furnishing} 
            onChange={handleFilterChange}
          >
            <option value="">Any</option>
            <option value="furnished">Furnished</option>
            <option value="semifurnished">Semi-Furnished</option>
            <option value="unfurnished">Unfurnished</option>
          </select>
        </div>
        
        <div className="filter-actions">
          <button className="primary-btn" onClick={applyFilters}>Apply Filters</button>
          <button className="secondary-btn" onClick={resetFilters}>Reset</button>
        </div>
      </div>
      
      <div className="search-results-list">
        <div className="search-header">
          <h1>Search Results</h1>
          {searchParams.query && (
            <p>Showing results for: <strong>{searchParams.query}</strong></p>
          )}
          {searchParams.location && (
            <p>Location: <strong>{searchParams.location}</strong></p>
          )}
        </div>
        
        {loading ? (
          <div className="loading">Loading properties...</div>
        ) : properties.length === 0 ? (
          <div className="no-results">
            <p>No properties found matching your criteria.</p>
            <p>Try adjusting your filters or search terms.</p>
          </div>
        ) : (
          <div className="property-grid">
            {properties.map((property, index) => (
              <div 
                className="property-card" 
                key={property.id || index}
                onClick={() => handlePropertyClick(property.id)}
              >
                <div className="property-image">
                  <img 
                    src={property.images && property.images.length > 0 
                      ? property.images[0] 
                      : IMAGES.PROPERTY_PLACEHOLDER} 
                    alt={property.title || 'Property'} 
                  />
                </div>
                <div className="property-details">
                  <h3>{property.title || 'Untitled Property'}</h3>
                  <p className="property-location">
                    <img src={IMAGES.PROPERTY_LOCATION} alt="Location" />
                    {property.locality || property.address || 'Location not specified'}
                  </p>
                  <p className="property-price">₹ {property.price || 'Price not specified'}</p>
                  <div className="property-features">
                    {property.bedrooms && (
                      <span>{property.bedrooms} BHK</span>
                    )}
                    {property.furnishing && (
                      <span>{property.furnishing}</span>
                    )}
                    {property.propertyType && (
                      <span>{property.propertyType}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
