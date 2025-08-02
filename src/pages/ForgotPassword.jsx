import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { api } from '../services/apiClient';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    setIsLoading(true);
    try {
      const { data } = await api.post('/api/user/forgot-password', { email });
      
      if (data.success) {
        setEmailSent(true);
        toast.success(data.message || 'Password reset link sent to your email');
      } else {
        toast.error(data.message || 'Failed to send reset email');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to send reset email');
    } finally {
      setIsLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-lime-50 to-emerald-50 flex items-center justify-center p-4 sm:p-6">
        <div className="relative bg-white/95 backdrop-blur-md rounded-3xl shadow-[0_4px_16px_rgba(34,197,94,0.1)] max-w-lg w-full p-8 sm:p-10">
          {/* Subtle decorative gradient overlay */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-green-400 to-lime-400 opacity-5 pointer-events-none"></div>

          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-4xl font-semibold text-green-700 tracking-tight">Check Your Email</h2>
            <p className="text-gray-600 text-base font-medium">
              We've sent a password reset link to <span className="font-semibold text-green-600">{email}</span>
            </p>
            <p className="text-sm text-gray-600">
              Didn't receive the email? Check your spam folder or try again.
            </p>
            <div className="space-y-4">
              <button
                onClick={() => {
                  setEmailSent(false);
                  setEmail('');
                }}
                className="w-full py-3.5 bg-green-600 text-white rounded-xl font-semibold text-lg hover:bg-lime-500 transition-all duration-300 shadow-[0_4px_12px_rgba(34,197,94,0.2)] hover:shadow-[0_6px_16px_rgba(34,197,94,0.3)]"
              >
                Try Different Email
              </button>
              <Link
                to="/login"
                className="block w-full py-3.5 bg-green-50 text-green-700 rounded-xl font-semibold text-lg hover:bg-green-100 transition-all duration-300 text-center"
              >
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-lime-50 to-emerald-50 flex items-center justify-center p-4 sm:p-6">
      <div className="relative bg-white/95 backdrop-blur-md rounded-3xl shadow-[0_4px_16px_rgba(34,197,94,0.1)] max-w-lg w-full p-8 sm:p-10">
        {/* Subtle decorative gradient overlay */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-green-400 to-lime-400 opacity-5 pointer-events-none"></div>

        <div className="text-center space-y-4">
          <h2 className="text-4xl font-semibold text-green-700 tracking-tight flex items-center justify-center gap-2">
            <span className="text-2xl text-lime-500 animate-pulse">⚡️</span>
            Forgot Password?
          </h2>
          <p className="text-gray-600 text-base font-medium">
            Enter your email address to receive a password reset link.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full px-4 py-3 text-gray-800 border-2 border-green-200/60 rounded-xl focus:border-lime-400 focus:ring-4 focus:ring-green-100 focus:outline-none transition-all duration-300 bg-green-50/50 shadow-sm"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-green-600 text-white rounded-xl font-semibold text-lg hover:bg-lime-500 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-300 shadow-[0_4px_12px_rgba(34,197,94,0.2)] hover:shadow-[0_6px_16px_rgba(34,197,94,0.3)] flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending Reset Link...
              </>
            ) : (
              'Send Reset Link'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 font-medium">
            Remember your password?{' '}
            <Link to="/login" className="text-green-600 font-semibold hover:text-lime-500 transition-colors duration-300">
              Back to Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;