import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGoogle, FaEnvelope, FaLock, FaUser, FaUserCircle } from 'react-icons/fa';
import { useApp } from '../context/AppContext';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [userType, setUserType] = useState<'consumer' | 'sme'>('consumer');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const mockUser = {
        id: '1',
        name: formData.name,
        email: formData.email,
        type: userType,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
        wallet: 5000
      };

      setUser(mockUser);
      setIsLoading(false);
      navigate('/dashboard');
    }, 1000);
  };

  const handleGoogleSignup = () => {
    setIsLoading(true);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
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
          <h1 className="text-4xl font-bold text-white mb-2">Join Our Marketplace</h1>
          <p className="text-primary-100 text-lg">Create your account today</p>
        </div>

        {/* Signup Card */}
        <div className="card p-8 animate-slide-up">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create Account</h2>

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

          {/* Google Signup Button */}
          <button
            onClick={handleGoogleSignup}
            disabled={isLoading}
            className="btn-google w-full mb-4"
          >
            <FaGoogle className="text-xl" />
            <span>Sign up with Google</span>
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Or sign up with email</span>
            </div>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="John Doe"
                  required
                />
              </div>
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="your@email.com"
                  required
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="••••••••"
                  required
                />
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="••••••••"
                  required
                />
              </div>
              {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
            </div>

            <div className="flex items-start">
              <input type="checkbox" className="mt-1 mr-2" required />
              <span className="text-sm text-gray-600">
                I agree to the{' '}
                <a href="#" className="text-primary-600 hover:text-primary-700 font-medium">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-primary-600 hover:text-primary-700 font-medium">
                  Privacy Policy
                </a>
              </span>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          {/* Login Link */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/')}
              className="text-primary-600 hover:text-primary-700 font-semibold"
            >
              Sign In
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

export default Signup;
