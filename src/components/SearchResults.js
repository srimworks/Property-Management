import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IMAGES } from '../utils/images';
import '../styles/SearchResults.css';
import { apiService } from '../services/api';
import SearchResultsCard from "../reusable/SearchResultsCard.js"

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
        
        const results = await apiService.getProperties(storedParams);
        
        if (results) {
          setProperties(results);
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
      
      const results = await apiService.getProperties(filterParams);
      
      if (results) {
        setProperties(results);
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
      const results = await apiService.getProperties(searchParams);
      
      if (results) {
        setProperties(results);
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
        {/* <div className="search-header">
          <h1>Search Results</h1>
          {searchParams.query && (
            <p>Showing results for: <strong>{searchParams.query}</strong></p>
          )}
          {searchParams.location && (
            <p>Location: <strong>{searchParams.location}</strong></p>
          )}
        </div> */}
        
        <SearchResultsCard/>
      </div>
    </div>
  );
};

export default SearchResults;
