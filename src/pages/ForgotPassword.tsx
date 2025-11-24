import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaCheckCircle, FaArrowLeft, FaUserCircle } from 'react-icons/fa';

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsEmailSent(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 px-4 py-8">
      <div className="absolute inset-0 bg-black opacity-10"></div>

      <div className="relative w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg mb-4">
            <FaUserCircle className="text-5xl text-primary-600" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">AI Agent Marketplace</h1>
          <p className="text-primary-100 text-lg">Password Recovery</p>
        </div>

        {/* Forgot Password Card */}
        <div className="card p-8 animate-slide-up">
          {!isEmailSent ? (
            <>
              <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">Forgot Password?</h2>
              <p className="text-gray-600 text-center mb-6">
                No worries! Enter your email address and we'll send you a verification link to reset your password.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input-field pl-10"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary w-full"
                >
                  {isLoading ? 'Sending...' : 'Send Verification Link'}
                </button>
              </form>

              <button
                onClick={() => navigate('/')}
                className="flex items-center justify-center gap-2 w-full mt-6 text-primary-600 hover:text-primary-700 font-medium"
              >
                <FaArrowLeft />
                Back to Login
              </button>
            </>
          ) : (
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                <FaCheckCircle className="text-5xl text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Check Your Email</h2>
              <p className="text-gray-600 mb-6">
                We've sent a verification link to <strong>{email}</strong>.
                Click the link in the email to reset your password.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> The link will expire in 1 hour. If you don't see the email, check your spam folder.
                </p>
              </div>
              <button
                onClick={() => setIsEmailSent(false)}
                className="btn-secondary w-full mb-3"
              >
                Resend Link
              </button>
              <button
                onClick={() => navigate('/')}
                className="flex items-center justify-center gap-2 w-full text-primary-600 hover:text-primary-700 font-medium"
              >
                <FaArrowLeft />
                Back to Login
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-center mt-6 text-primary-100 text-sm">
          © 2024 AI Agent Marketplace. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
