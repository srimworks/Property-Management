const API_BASE_URL = 'http://localhost:5000';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/register`,
    SEND_OTP: `${API_BASE_URL}/auth/send-otp`,
    VERIFY_OTP: `${API_BASE_URL}/auth/verify-otp`,
    FORGOT_PASSWORD: `${API_BASE_URL}/auth/forgot-password`,
    RESET_PASSWORD: `${API_BASE_URL}/auth/reset-password`,
  },
  PROPERTY: {
    LIST: `${API_BASE_URL}/properties`,
    CREATE: `${API_BASE_URL}/properties`,
    GET_BY_ID: (id) => `${API_BASE_URL}/properties/${id}`,
    UPDATE: (id) => `${API_BASE_URL}/properties/${id}`,
    DELETE: (id) => `${API_BASE_URL}/properties/${id}`,
  }
};

export default API_BASE_URL;
