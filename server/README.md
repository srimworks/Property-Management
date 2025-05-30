# Property Management API Server

This is the backend API server for the Property Management application.

## API Endpoints

### Properties

#### Create a Property
- **URL**: `/api/properties`
- **Method**: `POST`
- **Auth Required**: Yes (Bearer Token)
- **Content-Type**: `multipart/form-data`
- **Description**: Creates a new property listing
- **Request Body**:
  - Property details (JSON)
  - Images (files)

#### Get All Properties
- **URL**: `/api/properties`
- **Method**: `GET`
- **Auth Required**: No
- **Description**: Returns all property listings

#### Get User Properties
- **URL**: `/api/properties/user/:userId`
- **Method**: `GET`
- **Auth Required**: Yes (Bearer Token)
- **Description**: Returns all properties for a specific user

#### Upload Property Images
- **URL**: `/api/properties/:propertyId/images`
- **Method**: `POST`
- **Auth Required**: Yes (Bearer Token)
- **Content-Type**: `multipart/form-data`
- **Description**: Uploads additional images for an existing property

## Running the Server

1. Install dependencies:
   ```
   npm install
   ```

2. Start the server:
   ```
   npm start
   ```

The server will run on port 9092 by default.
