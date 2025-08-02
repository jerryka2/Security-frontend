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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-lime-50 to-emerald-50 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-24 h-24 bg-green-300 rounded-full opacity-30 animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-lime-300 rounded-full opacity-30 animate-pulse-slow delay-300"></div>

      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-xl bg-white/95 backdrop-blur-md rounded-3xl shadow-[0_4px_16px_rgba(34,197,94,0.1)] p-10 space-y-8 border border-green-100"
      >
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center text-lime-500 font-bold text-2xl animate-bounce-in">
            ⚡️
          </div>
          <h2 className="text-4xl font-semibold text-green-700 animate-slide-in-down">
            {state === "Sign Up" ? "Start Your Charging Journey" : "Welcome Back to EnergiPort"}
          </h2>
          <p className="text-gray-600 text-base font-medium animate-fade-in-up delay-200">
            {state === "Sign Up" ? "Create an account to power up your EV" : "Log in to manage your charging sessions"}
          </p>
        </div>

        {/* Toggle Buttons */}
        <div className="flex justify-center gap-4 bg-green-50/50 p-2 rounded-xl shadow-sm">
          <button
            type="button"
            onClick={() => setState("Login")}
            className={`flex-1 py-3 px-4 rounded-xl text-base font-semibold transition-all duration-300 ${
              state === "Login"
                ? "bg-green-600 text-white shadow-[0_4px_12px_rgba(34,197,94,0.2)]"
                : "text-green-600 bg-white/80 hover:bg-green-100 hover:shadow-md hover:scale-105"
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setState("Sign Up")}
            className={`flex-1 py-3 px-4 rounded-xl text-base font-semibold transition-all duration-300 ${
              state === "Sign Up"
                ? "bg-green-600 text-white shadow-[0_4px_12px_rgba(34,197,94,0.2)]"
                : "text-green-600 bg-white/80 hover:bg-green-100 hover:shadow-md hover:scale-105"
            }`}
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
              className="w-full p-4 rounded-xl border border-green-200/60 bg-green-50/50 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-lime-400 transition-all duration-300 hover:border-lime-400 hover:shadow-sm"
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
            className="w-full p-4 rounded-xl border border-green-200/60 bg-green-50/50 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-lime-400 transition-all duration-300 hover:border-lime-400 hover:shadow-sm"
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
            className="w-full p-4 rounded-xl border border-green-200/60 bg-green-50/50 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-lime-400 transition-all duration-300 hover:border-lime-400 hover:shadow-sm"
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
                <div className="text-sm text-red-500">{passwordFeedback.warning}</div>
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
                className="h-5 w-5 text-green-600 focus:ring-lime-400 border-green-200 rounded"
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
          className="w-full py-4 bg-green-600 text-white rounded-xl text-lg font-semibold hover:bg-lime-500 hover:scale-105 transition-all duration-300 shadow-[0_4px_12px_rgba(34,197,94,0.2)] hover:shadow-[0_6px_16px_rgba(34,197,94,0.3)]"
        >
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>

        {/* Switch Links */}
        <p className="text-center text-base text-gray-600">
          {state === "Sign Up" ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            className="text-green-600 font-semibold hover:text-lime-500 hover:underline cursor-pointer transition-all duration-200"
            onClick={() => setState((prev) => (prev === "Sign Up" ? "Login" : "Sign Up"))}
          >
            {state === "Sign Up" ? "Login here" : "Register now"}
          </span>
        </p>

        {/* Forgot Password Link */}
        {state === "Login" && (
          <p className="text-center text-base text-gray-600 mt-3">
            Forgot your password?{" "}
            <Link to="/forgot-password" className="text-green-600 font-semibold hover:text-lime-500 hover:underline transition-all duration-200">
              Reset it here
            </Link>
          </p>
        )}

        {/* Custom Tailwind Animation Styles */}
        <style jsx>{`
          @keyframes pulse-slow {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.5; }
          }
          .animate-pulse-slow {
            animation: pulse-slow 3s ease-in-out infinite;
          }
          @keyframes bounce-in {
            0% { transform: scale(0); opacity: 0; }
            50% { transform: scale(1.2); opacity: 0.7; }
            100% { transform: scale(1); opacity: 1; }
          }
          .animate-bounce-in {
            animation: bounce-in 0.5s ease-out;
          }
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
        `}</style>
      </form>
    </div>
  );
};
 
export default Login;