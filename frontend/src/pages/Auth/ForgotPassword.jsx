import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { validateEmail } from "../../utils/helper";

// Step 1: Enter email
// Step 2: Enter OTP
// Step 3: Set new password

const ForgotPassword = ({ setCurrentPage }) => {
  const navigate = useNavigate();

  // Steps: "email" | "otp" | "reset"
  const [step, setStep] = useState("email");

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  // ─── Step 1: Send OTP ───────────────────────────────────────────────────────
  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError(null);

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);
      await axiosInstance.post(API_PATHS.AUTH.FORGOT_PASSWORD, { email });
      setSuccessMsg("OTP sent! Check your inbox.");
      setStep("otp");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ─── Step 2: Verify OTP ─────────────────────────────────────────────────────
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!otp || otp.length !== 6) {
      setError("Please enter the 6-digit OTP.");
      return;
    }

    try {
      setLoading(true);
      await axiosInstance.post(API_PATHS.AUTH.VERIFY_RESET_OTP, { email, otp });
      setSuccessMsg("OTP verified! Set your new password.");
      setStep("reset");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ─── Step 3: Reset Password ─────────────────────────────────────────────────
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      await axiosInstance.post(API_PATHS.AUTH.RESET_PASSWORD, { email, otp, newPassword });
      setSuccessMsg("Password reset successfully!");
      setTimeout(() => {
        if (setCurrentPage) {
          setCurrentPage("login");
        } else {
          navigate("/login");
        }
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Reset failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => {
    setError(null);
    setSuccessMsg(null);
    if (step === "otp") setStep("email");
    else if (step === "reset") setStep("otp");
    else if (setCurrentPage) setCurrentPage("login");
    else navigate("/login");
  };

  return (
    <div className="w-full p-6 flex flex-col justify-center">
      {/* Back button */}
      <button
        onClick={goBack}
        className="flex items-center gap-1 text-slate-500 text-xs mb-5 hover:text-primary transition-colors w-fit"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        {step === "email" ? "Back to Login" : "Back"}
      </button>

      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-5">
        {["email", "otp", "reset"].map((s, i) => (
          <React.Fragment key={s}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all
              ${step === s ? "bg-primary text-white" :
                (["email","otp","reset"].indexOf(step) > i) ? "bg-green-500 text-white" : "bg-slate-200 text-slate-500"}`}>
              {(["email","otp","reset"].indexOf(step) > i) ? "✓" : i + 1}
            </div>
            {i < 2 && (
              <div className={`flex-1 h-0.5 rounded transition-all
                ${(["email","otp","reset"].indexOf(step) > i) ? "bg-green-500" : "bg-slate-200"}`} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* ── STEP 1: Email ── */}
      {step === "email" && (
        <>
          <h3 className="text-lg font-semibold text-black">Forgot Password?</h3>
          <p className="text-xs text-slate-600 mt-1 mb-6">
            Enter your registered email to receive a reset OTP.
          </p>

          <form onSubmit={handleSendOTP}>
            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="john@example.com"
              type="text"
            />

            {error && <p className="text-red-500 text-xs mt-2 mb-1">{error}</p>}

            <button
              type="submit"
              className="btn-primary w-full mt-4"
              disabled={loading}
            >
              {loading ? "Sending OTP..." : "SEND OTP"}
            </button>
          </form>
        </>
      )}

      {/* ── STEP 2: OTP ── */}
      {step === "otp" && (
        <>
          <h3 className="text-lg font-semibold text-black">Enter OTP</h3>
          <p className="text-xs text-slate-600 mt-1 mb-6">
            A 6-digit OTP was sent to <span className="font-semibold text-slate-800">{email}</span>.
            {" "}It expires in <span className="font-semibold">10 minutes</span>.
          </p>

          <form onSubmit={handleVerifyOTP}>
            {/* OTP Input boxes */}
            <div className="flex flex-col gap-1 mb-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Verification Code</label>
              <input
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                placeholder="000000"
                className="w-full h-12 bg-white border border-slate-200 rounded-lg px-4 text-slate-900 tracking-[0.4em] text-center text-lg font-bold placeholder:text-slate-300 placeholder:tracking-normal focus:outline-none focus:border-[#4F7C82] focus:ring-4 focus:ring-[#4F7C82]/10 transition-all"
              />
            </div>

            {successMsg && <p className="text-green-600 text-xs mt-1 mb-1">{successMsg}</p>}
            {error && <p className="text-red-500 text-xs mt-1 mb-1">{error}</p>}

            <button
              type="submit"
              className="btn-primary w-full mt-4"
              disabled={loading}
            >
              {loading ? "Verifying..." : "VERIFY OTP"}
            </button>

            {/* Resend */}
            <p className="text-xs text-slate-500 text-center mt-3">
              Didn't get the OTP?{" "}
              <button
                type="button"
                className="text-primary font-medium underline cursor-pointer"
                onClick={handleSendOTP}
                disabled={loading}
              >
                Resend
              </button>
            </p>
          </form>
        </>
      )}

      {/* ── STEP 3: New Password ── */}
      {step === "reset" && (
        <>
          <h3 className="text-lg font-semibold text-black">Set New Password</h3>
          <p className="text-xs text-slate-600 mt-1 mb-6">
            Create a strong password with at least 8 characters.
          </p>

          <form onSubmit={handleResetPassword} className="flex flex-col gap-4">
            <Input
              value={newPassword}
              onChange={({ target }) => setNewPassword(target.value)}
              label="New Password"
              placeholder="Min 8 Characters"
              type="password"
            />

            <Input
              value={confirmPassword}
              onChange={({ target }) => setConfirmPassword(target.value)}
              label="Confirm Password"
              placeholder="Re-enter your password"
              type="password"
            />

            {/* Password match indicator */}
            {confirmPassword && (
              <p className={`text-xs -mt-2 ml-1 ${newPassword === confirmPassword ? "text-green-600" : "text-red-500"}`}>
                {newPassword === confirmPassword ? "✓ Passwords match" : "✗ Passwords do not match"}
              </p>
            )}

            {successMsg && <p className="text-green-600 text-xs">{successMsg}</p>}
            {error && <p className="text-red-500 text-xs">{error}</p>}

            <button
              type="submit"
              className="btn-primary w-full"
              disabled={loading}
            >
              {loading ? "Resetting..." : "RESET PASSWORD"}
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default ForgotPassword;
