const API_BASE_URL = "http://localhost:5000";

export const API_ENDPOINTS = {
  AUTH: {
    USER_DETAILS: `${API_BASE_URL}/api/users/by-phone`,
    REGISTER: `${API_BASE_URL}/api/auth/register`,
    SEND_OTP: `${API_BASE_URL}/api/auth/send-otp`,
    VERIFY_OTP: `${API_BASE_URL}/api/auth/verify-otp`,
    FORGOT_PASSWORD: `${API_BASE_URL}/api/auth/forgot-password`,
    RESET_PASSWORD: `${API_BASE_URL}/api/auth/reset-password`,
    ADMIN_LOGIN: `${API_BASE_URL}/api/auth/login-admin`,
  },
  PROPERTY: {
    LIST: `${API_BASE_URL}/properties`,
    CREATE: `${API_BASE_URL}/api/properties`,
    GET_BY_ID: (id) => `${API_BASE_URL}/properties/${id}`,
    UPDATE: (id) => `${API_BASE_URL}/properties/${id}`,
    DELETE: (id) => `${API_BASE_URL}/properties/${id}`,
  },
  GET: {
    USERS: `${API_BASE_URL}/api/users`,
    FOR_SELL: `${API_BASE_URL}/api/properties/for-sell`,
    FOR_LEASE: `${API_BASE_URL}/api/properties/for-lease`,
    FOR_RENT: `${API_BASE_URL}/api/properties/for-rent`,
    FOR_MANAGE: `${API_BASE_URL}/api/properties/for-management`,
    PENDING_PROPERTIES: `${API_BASE_URL}/api/properties/pending-approval`,
  },
  ADMIN: {
    APPROVE_PROPERTY:(id)=> `${API_BASE_URL}/api/properties/${id}/approve`,
    REJECT_PROPERTY:(id)=> `${API_BASE_URL}/api/properties/${id}/reject`,
  },
};

export const POST_API_HEADERS = {
  Authorization: `Bearer ${localStorage.getItem("token")}`,
  "Content-Type": "text/plain",
};

export default API_BASE_URL;
