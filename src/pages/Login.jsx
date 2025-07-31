import { useContext, useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import zxcvbn from "zxcvbn";
import { AppContext } from "../context/AppContext";
import { api } from "../services/apiClient";

const Login = () => {
  const [state, setState] = useState("Sign Up"); // Toggle between "Sign Up" and "Login"
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(null);
  const [passwordFeedback, setPasswordFeedback] = useState({ warning: "", suggestions: [] });

  const navigate = useNavigate();
  const { token, setToken, isInitializing } = useContext(AppContext);
  const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (showCaptcha && !captchaToken) {
      toast.error("Please verify you are a human.");
      return;
    }

    try {
      if (state === "Sign Up") {
        // Registration flow
        const { data } = await api.post("/api/user/register", { name, email, password });

        if (data.success) {
          if (data.message.includes("OTP sent")) {
            toast.success(data.message);
            navigate("/otp-verify", { state: { email } });
          } else {
            setToken(true); // Assume logged in directly
          }
        } else {
          toast.error(data.message);
        }
      } else {
        // Login flow
        const { data } = await api.post("/api/user/login", {
          email,
          password,
          captchaToken: showCaptcha ? captchaToken : undefined,
        });

        if (data.success) {
          if (data.requiresOtp) {
            toast.success(data.message || "OTP sent to your email for secure login");
            navigate("/otp-verify", { state: { email, isLogin: true } });
          } else {
            setToken(true);
            toast.success("Login successful!");
            navigate("/");
          }
        } else {
          toast.error(data.message || "Login failed.");
        }
      }
    } catch (error) {
      toast.error("Server error or endpoint not found");
      console.error(error);
    }
  };

  const handlePasswordChange = (e) => {
    const pwd = e.target.value;
    setPassword(pwd);
    if (state === "Sign Up") {
      const result = zxcvbn(pwd);
      setPasswordStrength(result.score);
      setPasswordFeedback(result.feedback);
    }
  };

  useEffect(() => {
    if (!isInitializing && token) {
      navigate("/");
    }
  }, [token, isInitializing, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-orange-50 to-pink-50 px-4 py-12 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-24 h-24 bg-orange-300 rounded-full opacity-30 animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-pink-300 rounded-full opacity-30 animate-pulse-slow delay-300"></div>

      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-xl bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-10 space-y-8 border border-orange-100"
      >
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 mx-auto bg-gradient-to-r from-orange-600 to-pink-600 text-white rounded-full flex items-center justify-center font-bold text-2xl animate-bounce-in">
            🎉
          </div>
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-pink-600 animate-slide-in-down">
            {state === "Sign Up" ? "Start Your Event Journey" : "Welcome to the Party"}
          </h2>
          <p className="text-gray-600 text-lg animate-fade-in-up delay-200">
            {state === "Sign Up" ? "Create an account to plan epic events" : "Log in to manage your celebrations"}
          </p>
        </div>

        {/* Toggle Buttons */}
        <div className="flex justify-center gap-4 bg-orange-50/50 p-2 rounded-lg shadow-sm">
          <button
            type="button"
            onClick={() => setState("Login")}
            className={`flex-1 py-3 px-4 rounded-lg text-base font-semibold transition-all duration-300 ${state === "Login" ? "bg-gradient-to-r from-orange-600 to-pink-600 text-white shadow-md" : "text-orange-600 bg-white/80 hover:bg-orange-100 hover:shadow-md hover:scale-105"}`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setState("Sign Up")}
            className={`flex-1 py-3 px-4 rounded-lg text-base font-semibold transition-all duration-300 ${state === "Sign Up" ? "bg-gradient-to-r from-orange-600 to-pink-600 text-white shadow-md" : "text-orange-600 bg-white/80 hover:bg-orange-100 hover:shadow-md hover:scale-105"}`}
          >
            Sign Up
          </button>
        </div>

        {/* Name Field (Sign Up) */}
        {state === "Sign Up" && (
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-4 rounded-lg border border-orange-200 bg-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-200 hover:border-orange-300 hover:shadow-sm"
              required
            />
          </div>
        )}

        {/* Email Field */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 rounded-lg border border-orange-200 bg-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-200 hover:border-orange-300 hover:shadow-sm"
            required
          />
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
            className="w-full p-4 rounded-lg border border-orange-200 bg-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-200 hover:border-orange-300 hover:shadow-sm"
            required
          />

          {/* Password Strength Meter (Sign Up) */}
          {state === "Sign Up" && password && (
            <div className="mt-4 space-y-2">
              <div className="h-3 w-full rounded-full bg-gray-200 overflow-hidden">
                <div
                  style={{
                    width: `${((passwordStrength ?? 0) + 1) * 20}%`,
                    backgroundColor:
                      passwordStrength === 0
                        ? "#ef4444"
                        : passwordStrength === 1
                        ? "#f59e0b"
                        : passwordStrength === 2
                        ? "#facc15"
                        : passwordStrength === 3
                        ? "#22c55e"
                        : "#16a34a",
                    transition: "width 0.3s ease-in-out",
                  }}
                  className="h-full"
                />
              </div>
              <div
                className="text-sm font-semibold"
                style={{
                  color:
                    passwordStrength === 0
                      ? "#ef4444"
                      : passwordStrength === 1
                      ? "#f59e0b"
                      : passwordStrength === 2
                      ? "#facc15"
                      : passwordStrength === 3
                      ? "#22c55e"
                      : "#16a34a",
                }}
              >
                {["Very Weak", "Weak", "Fair", "Good", "Strong"][passwordStrength ?? 0]}
              </div>
              {passwordFeedback.warning && (
                <div className="text-sm text-orange-600">{passwordFeedback.warning}</div>
              )}
              {passwordFeedback.suggestions.length > 0 && (
                <ul className="text-sm text-gray-600 list-disc pl-6">
                  {passwordFeedback.suggestions.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        {/* CAPTCHA (Login) */}
        {state === "Login" && (
          <>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="human-check"
                checked={showCaptcha}
                onChange={() => {
                  setShowCaptcha((prev) => !prev);
                  setCaptchaToken("");
                }}
                className="h-5 w-5 text-orange-600 focus:ring-orange-400 border-orange-200 rounded"
              />
              <label htmlFor="human-check" className="text-sm font-semibold text-gray-600">
                I'm not a robot
              </label>
            </div>

            {showCaptcha && (
              <div className="mt-4">
                <ReCAPTCHA
                  sitekey={RECAPTCHA_SITE_KEY}
                  onChange={setCaptchaToken}
                  className="transform scale-95 origin-left"
                />
              </div>
            )}
          </>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-4 bg-gradient-to-r from-orange-600 to-pink-600 text-white rounded-lg text-lg font-semibold hover:from-orange-700 hover:to-pink-700 hover:scale-105 transition-all duration-300 shadow-lg"
        >
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>

        {/* Switch Links */}
        <p className="text-center text-base text-gray-600">
          {state === "Sign Up" ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            className="text-orange-600 font-semibold hover:text-orange-700 hover:underline cursor-pointer transition-all duration-200"
            onClick={() => setState((prev) => (prev === "Sign Up" ? "Login" : "Sign Up"))}
          >
            {state === "Sign Up" ? "Login here" : "Register now"}
          </span>
        </p>

        {/* Forgot Password Link */}
        {state === "Login" && (
          <p className="text-center text-base text-gray-600 mt-3">
            Forgot your password?{" "}
            <Link to="/forgot-password" className="text-orange-600 font-semibold hover:text-orange-700 hover:underline transition-all duration-200">
              Reset it here
            </Link>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;