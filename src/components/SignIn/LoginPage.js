import React, { useState, useEffect, useRef } from "react";
import { IMAGES } from "../../utils/images";
import { COUNTRY_DATA } from "../../utils/countryCodes";
import { Link } from "react-router-dom";
import "../../styles/Signin.css";
import { setupRecaptcha, sendOTP, verifyOTP, getTestOTP } from "../../firebase/auth";
import API_BASE_URL from "../../config/api";

const Number = ({ setFlowValue, formData, setFormData, setConfirmationResult, setTestOtp }) => {
  const [countryEmoji, setCountryEmoji] = useState("🇮🇳");
  const [countryCode, setcountryCode] = useState("+91");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const recaptchaContainerRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCountry = (code, emoji) => {
    setCountryEmoji(emoji);
    formData.country = code;
    setcountryCode(code);
  };

  const handelSubmit = async () => {
    if (formData.mobile.length !== 10) {
      setError("Enter 10 Digit Mobile Number");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const recaptchaVerifier = setupRecaptcha('recaptcha-container');
      if (!recaptchaVerifier) {
        throw new Error("Failed to set up verification");
      }
      
      const sendOtpResult = await sendOTP(
        formData.mobile, 
        recaptchaVerifier
      );
      
      if (!sendOtpResult.success) {
        throw new Error(sendOtpResult.error || "Failed to send OTP");
      }
      
      setConfirmationResult(sendOtpResult.confirmationResult);
      
      if (sendOtpResult.testOtp) {
        setTestOtp(sendOtpResult.testOtp);
      }
      
      setFlowValue((prev) => ++prev);
    } catch (error) {
      console.error("Error sending OTP:", error);
      setError(error.message || "Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-grid">
      <div className="phonenumber-field-login">
        <div className="country-container">
          <span className="country-text">{countryEmoji}</span>
          <select
            className="country-dropdown"
            name="country-selector"
            onChange={(e) =>
              handleCountry(
                JSON.parse(e.target.value).code,
                JSON.parse(e.target.value).flag
              )
            }
          >
            <option value="🇮🇳">{countryCode}</option>
            {COUNTRY_DATA.map((item) => (
              <option
                key={item.code}
                value={JSON.stringify({
                  flag: item.flag,
                  code: item.dial_code,
                })}
              >
                {item.dial_code}
              </option>
            ))}
          </select>
        </div>
        <input
          id="input-phone-login"
          type="text"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          placeholder="Enter Your mobile number *"
          required
          maxLength={10}
        />
      </div>

      {error && <p className="error-message">{error}</p>}
      <p>We'll send OTP for verification</p>
      
      {/* Invisible reCAPTCHA container */}
      <div id="recaptcha-container" ref={recaptchaContainerRef}></div>
      
      <button 
        type="submit" 
        onClick={handelSubmit} 
        className="primary-btn-100"
        disabled={loading}
      >
        {loading ? "Sending..." : "Continue"}
      </button>
    </div>
  );
};

const OTP = ({ formData, setFlowValue, confirmationResult, setUserData, testOtp, setTestOtp }) => {
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const timerRef = useRef(null);

  useEffect(() => {

    if (timeLeft > 0 && !canResend) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && !canResend) {
      setCanResend(true);
    }

    return () => clearTimeout(timerRef.current);
  }, [timeLeft, canResend]);

  const handleEdit = () => {
    setFlowValue((prev) => --prev);
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleResendOtp = async () => {
    setLoading(true);
    setError("");
    setCanResend(false);

    try {
      const recaptchaVerifier = setupRecaptcha('recaptcha-container');
      if (!recaptchaVerifier) {
        throw new Error("Failed to set up verification");
      }
      
      const sendOtpResult = await sendOTP(
        formData.mobile, 
        recaptchaVerifier
      );
      
      if (!sendOtpResult.success) {
        throw new Error(sendOtpResult.error || "Failed to resend OTP");
      }
      
      setConfirmationResult(sendOtpResult.confirmationResult);
      
      if (sendOtpResult.testOtp) {
        setTestOtp(sendOtpResult.testOtp);
      }
      
      setTimeLeft(60);
    } catch (error) {
      console.error("Error resending OTP:", error);
      setError(error.message || "Failed to resend OTP. Please try again.");
      setCanResend(true);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    // Validate OTP format
    const otpValue = otp.trim();
    if (!otpValue || otpValue.length !== 6 || !/^\d{6}$/.test(otpValue)) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);
    setError("");

    try {
      if (!confirmationResult) {
        throw new Error("Verification session expired. Please resend OTP.");
      }
      
      // Show loading state
      setLoading(true);
      
      // Verify the OTP
      const verifyResult = await verifyOTP(confirmationResult, otpValue);
      
      if (!verifyResult.success) {
        throw new Error(verifyResult.error || "Failed to verify OTP. Please try again.");
      }
      
      // Skip API call to backend for now and proceed directly to profile completion or login
      console.log("Firebase verification successful, proceeding without backend API call");
      
      // Check if user already exists in localStorage
      const existingUser = localStorage.getItem('user');
      
      if (existingUser) {
        // User already exists in localStorage, update their data
        const parsedUser = JSON.parse(existingUser);
        
        // Update mobile number if it's different
        if (parsedUser.mobile !== formData.mobile) {
          parsedUser.mobile = formData.mobile;
          localStorage.setItem('user', JSON.stringify(parsedUser));
        }
        
        // Redirect to home page or dashboard
        window.location.href = '/';
      } else {
        // New user - proceed to profile completion
        setUserData({
          mobile: formData.mobile,
          firebaseUid: verifyResult.uid,
          phoneNumber: verifyResult.phoneNumber,
          email: ''
        });
        setFlowValue(2); // Go to profile completion
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setError(error.message || "Failed to verify OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-grid">
      <div className="phone-number-edit">
        <input value={`${formData.country} ${formData.mobile}`} disabled />
        <img src={IMAGES.EDIT_ICON} alt="Edit Icon" onClick={handleEdit} />
      </div>
      <h2 className="enter-otp">Enter OTP Here</h2>
      
      {testOtp && (
        <div className="test-otp-notice" style={{
          margin: '0 0 20px',
          padding: '12px 16px',
          backgroundColor: '#f0f9ff',
          borderRadius: '8px',
          border: '1px solid #bae0ff',
          fontSize: '14px',
          color: '#0066cc',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span style={{fontWeight: 500}}>🔒 Test Mode Active</span>
          <span style={{margin: '0 4px'}}>•</span>
          <span>Use OTP: </span>
          <span style={{
            fontWeight: 'bold',
            backgroundColor: '#e6f4ff',
            padding: '2px 8px',
            borderRadius: '4px',
            letterSpacing: '1px',
            fontFamily: 'monospace',
            color: '#0052d9'
          }}>
            {testOtp}
          </span>
        </div>
      )}
      
      <div className="form-group" style={{marginBottom: '8px'}}>
        <label style={{display: 'block', marginBottom: '8px', fontSize: '14px', color: '#333'}}>
          Enter 6-digit verification code
        </label>
        <input
          id="input-otp"
          type="text"
          className="otp-input"
          placeholder="Enter 6-digit OTP"
          value={otp}
          onChange={handleOtpChange}
          maxLength="6"
          inputMode="numeric"
          pattern="\d*"
          style={{
            width: '100%',
            padding: '12px 16px',
            borderRadius: '8px',
            border: '1px solid #d9d9d9',
            fontSize: '16px',
            outline: 'none',
            transition: 'border-color 0.3s',
          }}
          onFocus={(e) => e.target.style.borderColor = '#1890ff'}
          onBlur={(e) => e.target.style.borderColor = '#d9d9d9'}
        />
      </div>
      
      {error && <p className="error-message">{error}</p>}
      
      {canResend ? (
        <p className="resend-otp" onClick={handleResendOtp}>
          {loading ? "Resending..." : "Resend OTP"}
        </p>
      ) : (
        <p className="resend-otp-timer">Resend OTP in {timeLeft}s</p>
      )}
      
      {/* Invisible reCAPTCHA container for resend */}
      <div id="recaptcha-container"></div>
      
      <button
        type="submit"
        className="primary-btn-100"
        onClick={handleVerifyOtp}
        disabled={loading}
      >
        {loading ? "Verifying..." : "Verify & Continue"}
      </button>
    </div>
  );
};

const Details = ({ setFormData, setShowLogin, formData, userData }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async () => {
    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }

    if (email && !validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    setError("");

    try {
      console.log('Creating user profile locally without API calls');
      
      // Create a user object with the provided information
      const user = {
        id: Date.now().toString(), // Generate a temporary ID
        fullName: name,
        email: email || null,
        mobile: formData.mobile,
        firebaseUid: userData?.firebaseUid || 'temp-firebase-uid',
        phoneNumber: userData?.phoneNumber || formData.mobile,
        createdAt: new Date().toISOString()
      };
      
      // Store the user in localStorage
      localStorage.setItem('user', JSON.stringify(user));
      
      // Create a mock token
      const mockToken = 'firebase-auth-token-' + Math.random().toString(36).substring(2);
      localStorage.setItem('token', mockToken);
      
      console.log('User profile created successfully:', user);
      
      // Close the login modal if it exists
      if (setShowLogin) {
        setShowLogin(false);
      }
      
      // Redirect to profile page
      window.location.href = '/profile';
    } catch (error) {
      console.error("Error completing registration:", error);
      setError(error.message || "Failed to complete registration. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="details-container">
      <input
        type="text"
        name="name"
        value={name}
        onChange={handleNameChange}
        className="details-input"
        placeholder="Enter Name"
        required
      />
      <input
        type="email"
        name="email"
        value={email}
        onChange={handleEmailChange}
        className="details-input"
        placeholder="Enter Email"
        required
      />
      
      {error && <p className="error-message">{error}</p>}
      
      <button
        type="submit"
        className="primary-btn-100"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </div>
  );
};

const LoginPage = ({setShowLogin}) => {
  const [flowValue, setFlowValue] = useState(0);
  const [formData, setFormData] = useState({ mobile: "", country: "+91" });
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [userData, setUserData] = useState(null);
  const [testOtp, setTestOtp] = useState(null);

  return (
    <div className="signin-container">
      <div className="signin-left-container">
        <img src={IMAGES.LOGIN_MAIN_FRAME} alt="logo-main-img" />
        <h1>Login / Sign up</h1>
        <p>
          <img src={IMAGES.CHECK_RIGHT_ICON} alt="Check Icon" />
          Verified Listings Only
        </p>
        <p>
          <img src={IMAGES.CHECK_RIGHT_ICON} alt="Check Icon" />
          Instant Property Matches
        </p>
        <p>
          <img src={IMAGES.CHECK_RIGHT_ICON} alt="Check Icon" />
          Seamless Buying & Renting
        </p>
      </div>

      <div className="signin-right-container">
        {/* Invisible reCAPTCHA container */}
        <div id="recaptcha-container"></div>
        
        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <div className="close-icon-container">
            <img 
              src={IMAGES.CLOSE_ICON} 
              onClick={() => setShowLogin(false)} 
              alt="Close Icon"
            />
          </div>
          
          <h1>
            {flowValue === 0 ? "Enter phone to continue" : 
             flowValue === 1 ? "Verify OTP" : 
             "Complete your profile"}
          </h1>
          
          {flowValue === 0 && (
            <Number
              setFlowValue={setFlowValue}
              formData={formData}
              setFormData={setFormData}
              setConfirmationResult={setConfirmationResult}
              setTestOtp={setTestOtp}
            />
          )}
          {flowValue === 1 && (
            <OTP
              formData={formData}
              setFlowValue={setFlowValue}
              confirmationResult={confirmationResult}
              setUserData={setUserData}
              testOtp={testOtp}
              setTestOtp={setTestOtp}
            />
          )}
          {flowValue === 2 && (
            <Details
              setFormData={setFormData}
              setShowLogin={setShowLogin}
              formData={formData}
              userData={userData}
            />
          )}
        </form>

        <p>By continuing, you agree to our Terms & Conditions</p>
      </div>
    </div>
  );
};

const styles = `
  .error-message {
    color: #ff3b30;
    font-size: 14px;
    margin-top: 5px;
    text-align: left;
  }
  
  .resend-otp {
    color: #007aff;
    cursor: pointer;
    font-size: 14px;
    margin-top: 10px;
    text-align: right;
  }
  
  .resend-otp-timer {
    color: #8e8e93;
    font-size: 14px;
    margin-top: 10px;
    text-align: right;
  }
`;

if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = styles;
  document.head.appendChild(styleElement);
}

export default LoginPage;
