import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGoogle, FaEnvelope, FaLock, FaUserCircle } from 'react-icons/fa';
import { useApp } from '../context/AppContext';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'consumer' | 'sme'>('consumer');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const mockUser = {
        id: '1',
        name: 'John Doe',
        email: email,
        type: userType,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
        wallet: 5000
      };

      setUser(mockUser);
      setIsLoading(false);
      navigate('/dashboard');
    }, 1000);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    // Simulate Google OAuth
    setTimeout(() => {
      const mockUser = {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@gmail.com',
        type: userType,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
        wallet: 5000
      };

      setUser(mockUser);
      setIsLoading(false);
      navigate('/dashboard');
    }, 1000);
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
          <p className="text-primary-100 text-lg">Connect with AI Specialists</p>
        </div>

        {/* Login Card */}
        <div className="card p-8 animate-slide-up">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Welcome Back</h2>

          {/* User Type Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">I am a:</label>
            <div className="flex gap-4">
              <label className="flex-1 flex items-center justify-center p-3 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:border-primary-500"
                     style={{ borderColor: userType === 'consumer' ? '#0284c7' : '#d1d5db', backgroundColor: userType === 'consumer' ? '#f0f9ff' : 'white' }}>
                <input
                  type="radio"
                  name="userType"
                  value="consumer"
                  checked={userType === 'consumer'}
                  onChange={(e) => setUserType(e.target.value as 'consumer' | 'sme')}
                  className="mr-2"
                />
                <span className="font-semibold">Consumer</span>
              </label>
              <label className="flex-1 flex items-center justify-center p-3 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:border-primary-500"
                     style={{ borderColor: userType === 'sme' ? '#0284c7' : '#d1d5db', backgroundColor: userType === 'sme' ? '#f0f9ff' : 'white' }}>
                <input
                  type="radio"
                  name="userType"
                  value="sme"
                  checked={userType === 'sme'}
                  onChange={(e) => setUserType(e.target.value as 'consumer' | 'sme')}
                  className="mr-2"
                />
                <span className="font-semibold">SME</span>
              </label>
            </div>
          </div>

          {/* Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="btn-google w-full mb-4"
          >
            <FaGoogle className="text-xl" />
            <span>Continue with Google</span>
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Or continue with email</span>
            </div>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleLogin} className="space-y-4">
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pl-10"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-gray-600">Remember me</span>
              </label>
              <button
                type="button"
                onClick={() => navigate('/forgot-password')}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/signup')}
              className="text-primary-600 hover:text-primary-700 font-semibold"
            >
              Sign Up
            </button>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center mt-6 text-primary-100 text-sm">
          © 2024 AI Agent Marketplace. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
