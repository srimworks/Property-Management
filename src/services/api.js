import { API_ENDPOINTS } from "../config/api";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }
  return data;
};

export const apiService = {
  // Auth APIs
  login: async (credentials) => {
    const response = await fetch(API_ENDPOINTS.AUTH.LOGIN, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    return handleResponse(response);
  },

  sendOtp: async (mobile) => {
    const response = await fetch(API_ENDPOINTS.AUTH.SEND_OTP, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mobile }),
    });
    return handleResponse(response);
  },

  verifyOtp: async (mobile, otp) => {
    const response = await fetch(API_ENDPOINTS.AUTH.VERIFY_OTP, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mobile, otp }),
    });
    return handleResponse(response);
  },

  // Property APIs
  getProperties: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const url = `${API_ENDPOINTS.PROPERTY.LIST}${
      queryString ? `?${queryString}` : ""
    }`;
    const response = await fetch(url, {
      headers: getAuthHeader(),
    });
    return handleResponse(response);
  },

  getPropertyById: async (id) => {
    const response = await fetch(API_ENDPOINTS.PROPERTY.GET_BY_ID(id), {
      headers: getAuthHeader(),
    });
    return handleResponse(response);
  },

  createProperty: async (propertyData) => {
    const response = await fetch(API_ENDPOINTS.PROPERTY.CREATE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
      body: JSON.stringify(propertyData),
    });
    return handleResponse(response);
  },

  updateProperty: async (id, propertyData) => {
    const response = await fetch(API_ENDPOINTS.PROPERTY.UPDATE(id), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
      body: JSON.stringify(propertyData),
    });
    return handleResponse(response);
  },

  deleteProperty: async (id) => {
    const response = await fetch(API_ENDPOINTS.PROPERTY.DELETE(id), {
      method: "DELETE",
      headers: getAuthHeader(),
    });
    return handleResponse(response);
  },
};

export const adminLogin = async (data) => {
  try {
    const response = await fetch(API_ENDPOINTS.AUTH.ADMIN_LOGIN, {
      method:"POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return response.ok;
    }
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getUsers=async ()=>{
  try {
    const response = await fetch(API_ENDPOINTS.GET.USERS, {
      method:"GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization":`Bearer ${localStorage.getItem("adminToken")}`
      },
    });

    if (!response.ok) {
      return response.ok;
    }
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
export const getRentList=async ()=>{
  try {
    const response = await fetch(API_ENDPOINTS.GET.FOR_RENT, {
      method:"GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization":`Bearer ${localStorage.getItem("adminToken")}`
      },
    });

    if (!response.ok) {
      return response.ok;
    }
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
export const getSellList=async ()=>{
  try {
    const response = await fetch(API_ENDPOINTS.GET.FOR_SELL, {
      method:"GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization":`Bearer ${localStorage.getItem("adminToken")}`
      },
    });

    if (!response.ok) {
      return response.ok;
    }
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
export const getLeaseList=async ()=>{
  try {
    const response = await fetch(API_ENDPOINTS.GET.FOR_LEASE, {
      method:"GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization":`Bearer ${localStorage.getItem("adminToken")}`
      },
    });

    if (!response.ok) {
      return response.ok;
    }
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
export const getManagementList=async ()=>{
  try {
    const response = await fetch(API_ENDPOINTS.GET.FOR_MANAGE, {
      method:"GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization":`Bearer ${localStorage.getItem("adminToken")}`
      },
    });

    if (!response.ok) {
      return response.ok;
    }
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
export const getPendingPropertiesList=async ()=>{
  try {
    const response = await fetch(API_ENDPOINTS.GET.PENDING_PROPERTIES, {
      method:"GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization":`Bearer ${localStorage.getItem("adminToken")}`
      },
    });

    if (!response.ok) {
      return response.ok;
    }
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const approveProperty = async (propertyId) => {
  try {
    const response = await fetch(API_ENDPOINTS.ADMIN.APPROVE_PROPERTY(propertyId), {
      method: 'PATCH',
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("adminToken")}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      return response.ok;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Failed to approve property:', error);
  }
};

export const rejectProperty = async (propertyId, comment) => {
  try {
    const response = await fetch(API_ENDPOINTS.ADMIN.REJECT_PROPERTY(propertyId), {
      method: 'PATCH',
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("adminToken")}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ comment })
    });

    if (!response.ok) {
      return response.ok;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Failed to reject property:', error);
  }
};
