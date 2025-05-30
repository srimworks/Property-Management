const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 9092;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

let properties = [];
let propertyIdCounter = 1;

app.post('/api/properties', upload.array('images', 10), (req, res) => {
  try {
    const propertyData = req.body;
    
    if (typeof propertyData.propertyDetails === 'string') {
      Object.keys(propertyData).forEach(key => {
        try {
          propertyData[key] = JSON.parse(propertyData[key]);
        } catch (e) {}
      });
    }
    
    const imageFiles = req.files || [];
    const imageUrls = imageFiles.map(file => `${req.protocol}://${req.get('host')}/uploads/${file.filename}`);
    
    const newProperty = {
      id: propertyIdCounter++,
      ...propertyData,
      images: imageUrls,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    properties.push(newProperty);
    
    res.status(201).json(newProperty);
  } catch (error) {
    console.error('Error creating property:', error);
    res.status(500).json({ message: 'Failed to create property', error: error.message });
  }
});

app.get('/api/properties', (req, res) => {
  try {
    const { query, location, propertyType, minPrice, maxPrice, bedrooms, furnishing } = req.query;
    
    let filteredProperties = [...properties];
    
    if (query) {
      const searchTerms = query.toLowerCase().split(' ');
      filteredProperties = filteredProperties.filter(property => {
        const propertyText = `${property.title || ''} ${property.description || ''} ${property.locality || ''} ${property.address || ''}`.toLowerCase();
        return searchTerms.some(term => propertyText.includes(term));
      });
    }
    
    if (location) {
      filteredProperties = filteredProperties.filter(property => 
        (property.locality && property.locality.toLowerCase().includes(location.toLowerCase())) ||
        (property.address && property.address.toLowerCase().includes(location.toLowerCase()))
      );
    }
    
    if (propertyType) {
      filteredProperties = filteredProperties.filter(property => 
        property.propertyType && property.propertyType.toLowerCase() === propertyType.toLowerCase()
      );
    }
    
    if (minPrice) {
      filteredProperties = filteredProperties.filter(property => 
        property.price && parseInt(property.price) >= parseInt(minPrice)
      );
    }
    
    if (maxPrice) {
      filteredProperties = filteredProperties.filter(property => 
        property.price && parseInt(property.price) <= parseInt(maxPrice)
      );
    }
    
    if (bedrooms) {
      filteredProperties = filteredProperties.filter(property => 
        property.bedrooms && parseInt(property.bedrooms) === parseInt(bedrooms)
      );
    }
    
    if (furnishing) {
      filteredProperties = filteredProperties.filter(property => 
        property.furnishing && property.furnishing.toLowerCase() === furnishing.toLowerCase()
      );
    }
    
    res.json({ properties: filteredProperties });
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({ message: 'Failed to fetch properties', error: error.message });
  }
});

app.get('/api/properties/user/:userId', (req, res) => {
  try {
    const { userId } = req.params;
    const userProperties = properties.filter(property => property.userId === userId);
    
    res.json({ properties: userProperties });
  } catch (error) {
    console.error('Error fetching user properties:', error);
    res.status(500).json({ message: 'Failed to fetch user properties', error: error.message });
  }
});

app.get('/api/properties/:propertyId', (req, res) => {
  try {
    const { propertyId } = req.params;
    const property = properties.find(p => p.id.toString() === propertyId);
    
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    
    res.json({ property });
  } catch (error) {
    console.error('Error fetching property details:', error);
    res.status(500).json({ message: 'Failed to fetch property details', error: error.message });
  }
});

app.post('/api/properties/:propertyId/images', upload.array('images', 10), (req, res) => {
  try {
    const { propertyId } = req.params;
    const propertyIndex = properties.findIndex(p => p.id === parseInt(propertyId));
    
    if (propertyIndex === -1) {
      return res.status(404).json({ message: 'Property not found' });
    }
    
    const imageFiles = req.files || [];
    const imageUrls = imageFiles.map(file => `${req.protocol}://${req.get('host')}/uploads/${file.filename}`);
    
    properties[propertyIndex].images = [
      ...(properties[propertyIndex].images || []),
      ...imageUrls
    ];
    
    properties[propertyIndex].updatedAt = new Date().toISOString();
    
    res.json({ property: properties[propertyIndex] });
  } catch (error) {
    console.error('Error uploading images:', error);
    res.status(500).json({ message: 'Failed to upload images', error: error.message });
  }
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
