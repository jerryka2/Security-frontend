import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import { api } from '../services/apiClient';

const OtpVerify = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

  const navigate = useNavigate();
  const location = useLocation();
  const { backendUrl, setToken } = useContext(AppContext);

  // Get email and flow type from navigation state
  const email = location.state?.email;
  const isLogin = location.state?.isLogin || false;

  useEffect(() => {
    // Redirect to login if no email provided
    if (!email) {
      navigate("/login");
      return;
    }

    // Countdown timer
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [email, navigate]);

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return; // Only allow single digit

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace to move to previous input
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      toast.error("Please enter complete OTP");
      return;
    }

    setIsLoading(true);
    try {
      // Use different endpoints based on flow type
      const endpoint = isLogin
        ? '/api/user/verify-login-otp'
        : '/api/user/verify-otp';

      const { data } = await api.post(endpoint, {
        email,
        otp: otpCode,
      });

      if (data.success) {
        if (isLogin) {
          // For login flow, set token and navigate to home
          toast.success(data.message || "Login successful!");
          setToken(true); // Just mark as logged in, don't store token
          navigate("/");
        } else {
          // For registration flow, navigate to login page
          toast.success(
            data.message ||
            "Registration completed successfully! Please login to continue."
          );
          navigate("/login");
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "OTP verification failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setIsLoading(true);
    try {
      // Use different endpoints based on flow type
      const endpoint = isLogin
        ? '/api/user/resend-login-otp'
        : '/api/user/resend-otp';

      const { data } = await api.post(endpoint, { email });

      if (data.success) {
        toast.success("OTP resent successfully!");
        setTimeLeft(300); // Reset timer
        setOtp(["", "", "", "", "", ""]); // Clear current OTP
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to resend OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-lime-50 to-emerald-50 flex items-center justify-center p-4 sm:p-6">
      <div className="relative bg-white/95 backdrop-blur-md rounded-3xl shadow-[0_4px_16px_rgba(34,197,94,0.1)] max-w-lg w-full p-8 sm:p-10">
        {/* Subtle decorative gradient overlay */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-green-400 to-lime-400 opacity-5 pointer-events-none"></div>

        {/* Header Section */}
        <div className="relative text-center space-y-3">
          <h2 className="text-4xl font-semibold text-green-700 tracking-tight flex items-center justify-center gap-2 animate-slide-in-down">
            <span className="text-2xl text-lime-500 animate-pulse">⚡️</span>
            {isLogin ? "Secure Login" : "Verify Your Email"}
          </h2>
          <p className="text-gray-600 text-base font-medium animate-fade-in-up delay-100">
            {isLogin
              ? "Enter the 6-digit code sent to your email"
              : "A 6-digit code has been sent to your email"}
          </p>
          <p className="font-semibold text-green-600 text-lg">{email}</p>
        </div>

        {/* OTP Input Form */}
        <form onSubmit={handleVerifyOtp} className="mt-10 space-y-8">
          <div className="flex justify-center gap-3 sm:gap-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-14 h-14 sm:w-16 sm:h-16 text-center text-2xl font-bold text-gray-800 border-2 border-green-200/60 rounded-xl focus:border-lime-400 focus:ring-4 focus:ring-green-100 focus:outline-none transition-all duration-300 bg-green-50/50 hover:bg-green-100 shadow-sm"
                disabled={isLoading}
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={isLoading || otp.join("").length !== 6}
            className="w-full py-3.5 bg-green-600 text-white rounded-xl font-semibold text-lg hover:bg-lime-500 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-300 shadow-[0_4px_12px_rgba(34,197,94,0.2)] hover:shadow-[0_6px_16px_rgba(34,197,94,0.3)] disabled:shadow-none flex items-center justify-center"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Verifying...
              </span>
            ) : isLogin ? (
              "Verify & Login"
            ) : (
              "Verify OTP"
            )}
          </button>
        </form>

        {/* Resend OTP Section */}
        <div className="mt-8 text-center">
          {timeLeft > 0 ? (
            <p className="text-gray-600 text-sm font-medium">
              Resend OTP in{" "}
              <span className="font-bold text-green-600">
                {formatTime(timeLeft)}
              </span>
            </p>
          ) : (
            <button
              onClick={handleResendOtp}
              disabled={isLoading}
              className="text-green-600 font-semibold text-base hover:text-lime-500 disabled:text-gray-400 transition-colors duration-300"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-4 w-4 mr-2 text-green-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                "Resend OTP"
              )}
            </button>
          )}
        </div>

        {/* Footer Link */}
        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600 font-medium">
            {isLogin
              ? "Having trouble logging in?"
              : "Want to use a different email?"}{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-green-600 font-semibold hover:text-lime-500 cursor-pointer transition-colors duration-300"
            >
              {isLogin ? "Try again" : "Go back"}
            </span>
          </p>
        </div>

        {/* Custom Tailwind Animation Styles */}
        <style jsx>{`
          @keyframes slide-in-down {
            0% { opacity: 0; transform: translateY(-20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-slide-in-down {
            animation: slide-in-down 0.6s ease-out;
          }
          @keyframes fade-in-up {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-up {
            animation: fade-in-up 0.6s ease-out;
          }
          @keyframes pulse {
            0%, 100% { opacity: 0.7; }
            50% { opacity: 1; }
          }
          .animate-pulse {
            animation: pulse 2s ease-in-out infinite;
          }
        `}</style>
      </div>
    </div>
  );
};

export default OtpVerify;