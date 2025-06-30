import API_BASE_URL, { API_ENDPOINTS, POST_API_HEADERS } from '../config/api';

export const searchProperties = async (searchParams = {}) => {
  try {
    const queryParams = new URLSearchParams();
    
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, value);
      }
    });
    
    const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
    
    const response = await fetch(`${API_BASE_URL}/api/properties${queryString}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to search properties');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Search API Error:', error);
    
    const storedProperties = JSON.parse(localStorage.getItem('properties') || '[]');
    
    let filteredProperties = [...storedProperties];
    
    if (searchParams.query) {
      const searchTerms = searchParams.query.toLowerCase().split(' ');
      filteredProperties = filteredProperties.filter(property => {
        const propertyText = `${property.title || ''} ${property.description || ''} ${property.locality || ''} ${property.address || ''}`.toLowerCase();
        return searchTerms.some(term => propertyText.includes(term));
      });
    }
    
    if (searchParams.location) {
      filteredProperties = filteredProperties.filter(property => 
        (property.locality && property.locality.toLowerCase().includes(searchParams.location.toLowerCase())) ||
        (property.address && property.address.toLowerCase().includes(searchParams.location.toLowerCase()))
      );
    }
    
    if (searchParams.propertyType) {
      filteredProperties = filteredProperties.filter(property => 
        property.propertyType && property.propertyType.toLowerCase() === searchParams.propertyType.toLowerCase()
      );
    }
    
    if (searchParams.minPrice) {
      filteredProperties = filteredProperties.filter(property => 
        property.price && parseInt(property.price) >= parseInt(searchParams.minPrice)
      );
    }
    
    if (searchParams.maxPrice) {
      filteredProperties = filteredProperties.filter(property => 
        property.price && parseInt(property.price) <= parseInt(searchParams.maxPrice)
      );
    }
    
    if (searchParams.bedrooms) {
      filteredProperties = filteredProperties.filter(property => 
        property.bedrooms && parseInt(property.bedrooms) === parseInt(searchParams.bedrooms)
      );
    }
    
    if (searchParams.furnishing) {
      filteredProperties = filteredProperties.filter(property => 
        property.furnishing && property.furnishing.toLowerCase() === searchParams.furnishing.toLowerCase()
      );
    }
    
    return { properties: filteredProperties };
  }
};

export const handlePropertySubmission = async (propertyData) => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('Authentication token not found');
    }
    
    const formData = new FormData();
    
    Object.entries(propertyData).forEach(([key, value]) => {
      if (key === 'images' && Array.isArray(value)) {
        value.forEach((image, index) => {
          if (image instanceof File) {
            formData.append(`images[${index}]`, image);
          } else if (typeof image === 'string' && image.startsWith('data:')) {
            fetch(image)
              .then(res => res.blob())
              .then(blob => {
                const file = new File([blob], `image-${index}.jpg`, { type: 'image/jpeg' });
                formData.append(`images[${index}]`, file);
              });
          }
        });
      } else {
        formData.append(key, JSON.stringify(value));
      }
    });
    
    const response = await fetch(`${API_BASE_URL}/api/properties`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to submit property');
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const fetchUserProperties = async (userId) => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('Authentication token not found');
    }
    
    const response = await fetch(`${API_BASE_URL}/properties/user/my-properties`, { // Changed to use my-properties endpoint
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch properties');
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const fetchPropertyById = async (propertyId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/properties/${propertyId}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch property details');
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    
    const allProperties = JSON.parse(localStorage.getItem('properties') || '[]');
    const property = allProperties.find(p => p.id.toString() === propertyId.toString());
    
    if (property) {
      return { property };
    }
    
    const searchResults = JSON.parse(localStorage.getItem('searchResults') || '{}');
    
    if (searchResults && searchResults.properties) {
      const foundInSearch = searchResults.properties.find(p => p.id.toString() === propertyId.toString());
      
      if (foundInSearch) {
        return { property: foundInSearch };
      }
    }
    
    throw new Error('Property not found');
  }
};

export const uploadPropertyImages = async (propertyId, images) => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('Authentication token not found');
    }
    
    const formData = new FormData();
    
    images.forEach((image, index) => {
      if (image instanceof File) {
        formData.append(`images[${index}]`, image);
      } else if (typeof image === 'string' && image.startsWith('data:')) {
        fetch(image)
          .then(res => res.blob())
          .then(blob => {
            const file = new File([blob], `image-${index}.jpg`, { type: 'image/jpeg' });
            formData.append(`images[${index}]`, file);
          });
      }
    });
    
    const response = await fetch(`${API_BASE_URL}/api/properties/${propertyId}/images`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to upload images');
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};


export const createAccount= async (details)=>{
  try{
    const response = await fetch(API_ENDPOINTS.AUTH.REGISTER,{
      method:'POST',
      body:details,
      headers:{
        "Content-Type":"application/json",
      }
    });

    if (!response.ok){
      throw new Error("Failed to Create Account")
    }

    return await response.json()

  }
  catch(err){
    console.log("Create Account API Error",err)
  }

}

export const getUserData=async(mobileNumber)=>{
  try{
    const response= await fetch (API_ENDPOINTS.AUTH.USER_DETAILS,{
      method:"POST",
      body:mobileNumber,
      headers:{
        "Content-Type":"application/json",
      }
    })
    if(!response.ok){
      throw new Error("Failed to Get User Details")
    }
    const data=await response.json()
    return data
  }
  catch(err){
    console.log("Failed to Fetch Get User API")
  }
}


export const postPropertyApi=async(data)=>{
  try{
    console.log(data)
    const response= await fetch(API_ENDPOINTS.PROPERTY.CREATE,{
      method:"POST",
      body:data,
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem("token")
      }
    })
        if (!response.ok){
      throw new Error("Failed to Create Account")
    }

    return await response.json()

  }
  catch(error){
    console.log(error)
  }
}