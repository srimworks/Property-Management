const API_BASE_URL = 'http://localhost:5000';

export const API_ENDPOINTS = {
  AUTH: {
    USER_DETAILS: `${API_BASE_URL}/api/auth/check-user`,
    REGISTER: `${API_BASE_URL}/api/auth/register`,
    SEND_OTP: `${API_BASE_URL}/api/auth/send-otp`,
    VERIFY_OTP: `${API_BASE_URL}/api/auth/verify-otp`,
    FORGOT_PASSWORD: `${API_BASE_URL}/api/auth/forgot-password`,
    RESET_PASSWORD: `${API_BASE_URL}/api/auth/reset-password`,
  },
  PROPERTY: {
    LIST: `${API_BASE_URL}/properties`,
    CREATE: `${API_BASE_URL}/api/properties`,
    GET_BY_ID: (id) => `${API_BASE_URL}/properties/${id}`,
    UPDATE: (id) => `${API_BASE_URL}/properties/${id}`,
    DELETE: (id) => `${API_BASE_URL}/properties/${id}`,
  }
};

export const POST_API_HEADERS={
        "Authorization":`Bearer ${localStorage.getItem("token")}`,
        "Content-Type":"text/plain"
      }

export default API_BASE_URL;
