import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaTimes,
  FaWallet,
  FaUser,
  FaSignOutAlt,
  FaChevronDown,
  FaRobot,
  FaChartLine,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa';
import { useApp } from '../context/AppContext';

interface SMESidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedView: 'dashboard' | 'myAgents' | 'analytics';
  setSelectedView: (view: 'dashboard' | 'myAgents' | 'analytics') => void;
}

const SMESidebar: React.FC<SMESidebarProps> = ({
  isOpen,
  setIsOpen,
  selectedView,
  setSelectedView
}) => {
  const navigate = useNavigate();
  const { user, setUser, isSidebarCollapsed, setIsSidebarCollapsed } = useApp();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  const handleWallet = () => {
    alert('Wallet feature coming soon!');
  };

  const handleProfile = () => {
    alert('Profile feature coming soon!');
  };

  const handleMyAgents = () => {
    setSelectedView('myAgents');
    setIsOpen(false);
  };

  const menuItems = [
    {
      id: 'myAgents' as const,
      icon: FaRobot,
      label: 'My Agents',
      color: 'text-primary-600'
    },
    {
      id: 'analytics' as const,
      icon: FaChartLine,
      label: 'Analytics',
      color: 'text-green-600'
    }
  ];

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-2xl z-50 transform transition-all duration-300 flex flex-col
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          ${isSidebarCollapsed ? 'md:w-20' : 'md:w-80'}
          w-80
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-primary-600 text-white">
          {!isSidebarCollapsed && (
            <div className="flex items-center gap-2">
              <FaRobot className="text-2xl" />
              <h2 className="text-xl font-bold">SME Portal</h2>
            </div>
          )}
          {isSidebarCollapsed && (
            <FaRobot className="text-2xl mx-auto" />
          )}

          {/* Close button - mobile only */}
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-primary-700 rounded-lg transition-colors md:hidden"
          >
            <FaTimes className="text-xl" />
          </button>

          {/* Collapse button - desktop only */}
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="p-2 hover:bg-primary-700 rounded-lg transition-colors hidden md:block"
          >
            {isSidebarCollapsed ? <FaChevronRight className="text-xl" /> : <FaChevronLeft className="text-xl" />}
          </button>
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {/* Dashboard - always visible */}
            <button
              onClick={() => setSelectedView('dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                selectedView === 'dashboard'
                  ? 'bg-primary-100 border-2 border-primary-600 text-primary-700'
                  : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent text-gray-700'
              } ${isSidebarCollapsed ? 'justify-center' : ''}`}
              title={isSidebarCollapsed ? 'Dashboard' : ''}
            >
              <FaChartLine className={`text-xl ${selectedView === 'dashboard' ? 'text-primary-600' : 'text-blue-600'}`} />
              {!isSidebarCollapsed && (
                <span className="font-semibold">Dashboard</span>
              )}
            </button>

            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedView(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  selectedView === item.id
                    ? 'bg-primary-100 border-2 border-primary-600 text-primary-700'
                    : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent text-gray-700'
                } ${isSidebarCollapsed ? 'justify-center' : ''}`}
                title={isSidebarCollapsed ? item.label : ''}
              >
                <item.icon className={`text-xl ${selectedView === item.id ? 'text-primary-600' : item.color}`} />
                {!isSidebarCollapsed && (
                  <span className="font-semibold">{item.label}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* User Profile Section */}
        <div className="border-t border-gray-200">
          {isSidebarCollapsed ? (
            // Collapsed view - show only avatar
            <div
              className="p-4 hover:bg-gray-50 cursor-pointer transition-colors flex justify-center"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-primary-600"
                title={user?.name}
              />
            </div>
          ) : (
            // Expanded view - show full profile
            <div
              className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <div className="flex items-center gap-3">
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary-600"
                />
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{user?.name}</p>
                  <p className="text-sm text-gray-600">{user?.email}</p>
                </div>
                <FaChevronDown
                  className={`text-gray-400 transition-transform ${showUserMenu ? 'rotate-180' : ''}`}
                />
              </div>
            </div>
          )}

          {/* User Menu */}
          {showUserMenu && (
            <div className="border-t border-gray-200 bg-gray-50">
              <button
                onClick={handleWallet}
                className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-colors text-left ${
                  isSidebarCollapsed ? 'justify-center' : ''
                }`}
                title={isSidebarCollapsed ? 'Wallet' : ''}
              >
                <FaWallet className="text-green-600 text-lg" />
                {!isSidebarCollapsed && (
                  <div>
                    <p className="font-semibold text-gray-800">Wallet</p>
                    <p className="text-sm text-gray-600">${user?.wallet.toLocaleString()}</p>
                  </div>
                )}
              </button>

              <button
                onClick={handleMyAgents}
                className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-colors text-left ${
                  isSidebarCollapsed ? 'justify-center' : ''
                }`}
                title={isSidebarCollapsed ? 'My Agents' : ''}
              >
                <FaRobot className="text-primary-600 text-lg" />
                {!isSidebarCollapsed && (
                  <span className="font-semibold text-gray-800">My Agents</span>
                )}
              </button>

              <button
                onClick={handleProfile}
                className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-colors text-left ${
                  isSidebarCollapsed ? 'justify-center' : ''
                }`}
                title={isSidebarCollapsed ? 'Profile' : ''}
              >
                <FaUser className="text-blue-600 text-lg" />
                {!isSidebarCollapsed && (
                  <span className="font-semibold text-gray-800">Profile</span>
                )}
              </button>

              <button
                onClick={handleLogout}
                className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-colors text-left text-red-600 ${
                  isSidebarCollapsed ? 'justify-center' : ''
                }`}
                title={isSidebarCollapsed ? 'Logout' : ''}
              >
                <FaSignOutAlt className="text-lg" />
                {!isSidebarCollapsed && (
                  <span className="font-semibold">Logout</span>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SMESidebar;
