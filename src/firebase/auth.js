import { auth, RecaptchaVerifier } from '../config/firebase';
import { 
  signInWithPhoneNumber, 
  signOut as firebaseSignOut,
  signInWithCustomToken
} from 'firebase/auth';


const TEST_MODE = true;


let testVerificationData = {
  confirmationResult: null,
  testOtp: null,
  phoneNumber: null
};

export const setupRecaptcha = (containerId) => {
  try {
    if (window.recaptchaVerifier) {
      try {
        window.recaptchaVerifier.clear();
      } catch (error) {}
      window.recaptchaVerifier = null;
    }

    window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
      size: 'invisible'
    });
    
    return window.recaptchaVerifier;
  } catch (error) {
    console.error('Error setting up reCAPTCHA:', error);
    return null;
  }
};


const testOtps = new Map();

export const sendOTP = async (phoneNumber, recaptchaVerifier) => {
  try {
    if (!phoneNumber) {
      throw new Error('Phone number is required');
    }

    
    if (!phoneNumber.startsWith('+')) {
      phoneNumber = `+91${phoneNumber}`; 
    }
    
    
    const testOtp = Math.floor(100000 + Math.random() * 900000).toString();
    
    
    testOtps.set(phoneNumber, testOtp);
    
    console.log(`[Test Mode] OTP for ${phoneNumber}: ${testOtp}`);
    
    // Create a mock confirmation result
    const mockConfirmationResult = {
      confirm: (otp) => {
        return new Promise((resolve, reject) => {
          if (!otp || otp.length !== 6) {
            reject(new Error('Invalid OTP format'));
            return;
          }
          
          // Get the stored test OTP for this phone number
          const storedOtp = testOtps.get(phoneNumber);
          
          if (otp === storedOtp) {
            // Clear the used OTP
            testOtps.delete(phoneNumber);
            
            resolve({
              user: {
                phoneNumber: phoneNumber,
                uid: 'test-uid-' + Date.now()
              }
            });
          } else {
            reject(new Error('Invalid OTP'));
          }
        });
      }
    };
    
    // Store test data
    testVerificationData = {
      confirmationResult: mockConfirmationResult,
      testOtp: testOtp,
      phoneNumber: phoneNumber
    };
    
    return {
      success: true,
      confirmationResult: mockConfirmationResult,
      testOtp: testOtp // Pass the test OTP to display in UI
    };
  } catch (error) {
    console.error('Error sending OTP:', error);
    return {
      success: false,
      error: error.message || 'Failed to send OTP'
    };
  }
};

export const verifyOTP = async (confirmationResult, otp) => {
  try {
    const result = await confirmationResult.confirm(otp);
    const user = result.user;
    
    return {
      success: true,
      user,
      phoneNumber: user.phoneNumber,
      uid: user.uid
    };
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Function to get the current test OTP (for development purposes only)
export const getTestOTP = () => {
  if (TEST_MODE && testVerificationData.testOtp) {
    return testVerificationData.testOtp;
  }
  return null;
};

// Get current user
export const getCurrentUser = () => {
  return auth.currentUser;
};

// Sign out user
export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
    return { success: true };
  } catch (error) {
    console.error('Error signing out:', error);
    return {
      success: false,
      error: error.message
    };
  }
};
