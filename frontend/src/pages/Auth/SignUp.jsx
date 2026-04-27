import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import ProfilePhotoSelector from "../../components/ProfilePhotoSelector";
import uploadImage from "../../utils/uploadImage";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { validateEmail } from "../../utils/helper";
import { UserContext } from "../../context/userContext";

const SignUp = ({ setCurrentPage }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  
  // OTP states
  const [showOTPForm, setShowOTPForm] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState(null);
  const [timerSeconds, setTimerSeconds] = useState(0);
  
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  // Handle SignUp Form Submit
  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    // Validation
    if (!fullName) {
      setError("Please enter full name.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    try {
      setLoading(true);
      let photoUrl = null;

      // Upload photo if selected
      if (profilePic?.file) {
        photoUrl = await uploadImage(profilePic.file);
      }

      // Create form data for signup
      const signupData = {
        name: fullName.trim(),
        email: email.trim(),
        password: password,
        profileImageUrl: photoUrl,
      };

      // Send signup request
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, signupData);

      if (response.data.success || response.data.requiresOTP) {
        setSuccessMessage("OTP sent to your email. Please check your inbox.");
        setShowOTPForm(true);
        setTimerSeconds(300); // 5 minutes timer
        setOtp("");
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Signup failed. Please try again.");
      }
      console.error("Signup error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP Verification
  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    setOtpError(null);

    if (!otp || otp.length !== 6) {
      setOtpError("Please enter a valid 6-digit OTP.");
      return;
    }

    try {
      setOtpLoading(true);

      const verifyData = {
        email: email.trim(),
        otp: otp.trim(),
      };

      const response = await axiosInstance.post(API_PATHS.AUTH.VERIFY_OTP, verifyData);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        updateUser(response.data);
        navigate("/dashboard");
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setOtpError(err.response.data.message);
      } else {
        setOtpError("OTP verification failed. Please try again.");
      }
      console.error("OTP verification error:", err);
    } finally {
      setOtpLoading(false);
    }
  };

  // Timer countdown effect
  useEffect(() => {
    if (!showOTPForm) return;

    const interval = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [showOTPForm]);

  // Format timer display (MM:SS)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Show OTP Form
  if (showOTPForm) {
    return (
      <div className="w-full p-6 flex flex-col justify-center">
        <h3 className="text-lg font-semibold text-black">Verify Your Email</h3>
        <p className="text-xs text-slate-700 mt-1.25 mb-6">
          We've sent an OTP to {email}. Enter it below to complete your signup.
        </p>

        <form onSubmit={handleOTPSubmit}>
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Enter 6-Digit OTP
            </label>
            <input
              type="text"
              maxLength="6"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              placeholder="000000"
              className="w-full px-4 py-2 text-center text-2xl letter-spacing tracking-widest border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            />
            <p className="text-xs text-gray-500 mt-1 text-center">
              OTP expires in: <span className="font-semibold">{formatTime(timerSeconds)}</span>
            </p>
          </div>

          {otpError && <p className="text-red-500 text-xs pb-2.5">{otpError}</p>}
          {successMessage && <p className="text-green-500 text-xs pb-2.5">{successMessage}</p>}

          <button
            type="submit"
            className="btn-primary w-full mt-4"
            disabled={otpLoading || otp.length !== 6}
          >
            {otpLoading ? "Verifying..." : "VERIFY OTP"}
          </button>

          <button
            className="text-[13px] text-primary underline cursor-pointer mt-2 w-full text-center"
            type="button"
            onClick={() => {
              setShowOTPForm(false);
              setOtp("");
              setOtpError(null);
            }}
          >
            Back to SignUp
          </button>
        </form>
      </div>
    );
  }

  // Show SignUp Form
  return (
    <div className="w-full p-6 flex flex-col justify-center">
      <h3 className="text-lg font-semibold text-black">Create an Account</h3>
      <p className="text-xs text-slate-700 mt-1.25 mb-6">
        Join us today by entering your details below.
      </p>

      <form onSubmit={handleSignUp}>
        {/* Profile Photo Selector */}
        <ProfilePhotoSelector profilePic={profilePic} setProfilePic={setProfilePic} />

        <div className="">
          <Input
            value={fullName}
            onChange={({ target }) => setFullName(target.value)}
            label="Full Name"
            placeholder="John"
            type="text"
          />

          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="john@example.com"
            type="text"
          />

          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Min 8 Characters"
            type="password"
          />
        </div>

        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
        {successMessage && <p className="text-green-500 text-xs pb-2.5">{successMessage}</p>}

        <button type="submit" className="btn-primary w-full mt-4" disabled={loading}>
          {loading ? "Signing up..." : "SIGN UP"}
        </button>

        <p className="text-[13px] text-slate-800 mt-3">
          Already an account?{" "}
          <button
            className="font-medium text-primary underline cursor-pointer"
            type="button"
            onClick={() => {
              setCurrentPage("login");
            }}
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
