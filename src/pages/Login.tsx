import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGoogle, FaEnvelope, FaLock, FaUserCircle, FaRobot } from 'react-icons/fa';
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
    <div className="min-h-screen flex">
      {/* Left Side - Background Image and Branding */}
      <div className="hidden lg:flex lg:flex-1 relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Background Image - High Resolution AI Marketplace */}
        <div
          className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-40"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1655720828018-edd2daec9349?w=2400&h=1600&fit=crop&q=100)',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            imageRendering: 'crisp-edges',
          }}
        ></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center w-full px-12 text-white">
          <div className="max-w-lg animate-fade-in">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-sm rounded-3xl shadow-2xl mb-8">
              <FaRobot className="text-6xl text-white" />
            </div>
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Agentic AI Marketplace
            </h1>
            <p className="text-xl text-primary-100 mb-8 leading-relaxed">
              Connect with specialized AI agents tailored to your needs. Experience the future of intelligent assistance.
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl font-bold mb-1">1000+</div>
                <div className="text-primary-100">AI Agents</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl font-bold mb-1">50K+</div>
                <div className="text-primary-100">Happy Users</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl font-bold mb-1">24/7</div>
                <div className="text-primary-100">Availability</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl font-bold mb-1">4.9★</div>
                <div className="text-primary-100">Avg Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 px-4 py-8 lg:px-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="text-center mb-8 lg:hidden animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-100 rounded-full shadow-lg mb-4">
              <FaUserCircle className="text-5xl text-primary-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Agentic AI Marketplace</h1>
            <p className="text-gray-600">Connect with AI Specialists</p>
          </div>

          {/* Login Card */}
          <div className="card p-8 lg:p-10 animate-slide-in-right">
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
          <p className="text-center mt-6 text-gray-500 text-sm">
            © 2024 Agentic AI Marketplace. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
