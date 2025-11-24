import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTimes, FaWallet, FaUser, FaSignOutAlt, FaChevronDown, FaComments } from 'react-icons/fa';
import { useApp } from '../context/AppContext';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const { user, conversations, currentConversation, setCurrentConversation, setUser } = useApp();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleConversationClick = (convId: string) => {
    setCurrentConversation(convId);
    navigate('/chat');
  };

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
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-primary-600 text-white">
          <div className="flex items-center gap-2">
            <FaComments className="text-2xl" />
            <h2 className="text-xl font-bold">Conversations</h2>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-primary-700 rounded-lg transition-colors"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto p-4">
          {conversations.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <FaComments className="text-4xl mx-auto mb-3 text-gray-300" />
              <p>No conversations yet</p>
              <p className="text-sm mt-2">Start chatting with an AI agent</p>
            </div>
          ) : (
            <div className="space-y-2">
              {conversations.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => handleConversationClick(conv.id)}
                  className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                    currentConversation === conv.id
                      ? 'bg-primary-100 border-2 border-primary-600'
                      : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                  }`}
                >
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-semibold text-gray-800 text-sm">{conv.agentName}</h3>
                    {conv.unread > 0 && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        {conv.unread}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 truncate mb-1">{conv.lastMessage}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(conv.timestamp).toLocaleDateString()} at{' '}
                    {new Date(conv.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* User Profile Section */}
        <div className="border-t border-gray-200">
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

          {/* User Menu */}
          {showUserMenu && (
            <div className="border-t border-gray-200 bg-gray-50">
              <button
                onClick={handleWallet}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-colors text-left"
              >
                <FaWallet className="text-green-600 text-lg" />
                <div>
                  <p className="font-semibold text-gray-800">Wallet</p>
                  <p className="text-sm text-gray-600">${user?.wallet.toLocaleString()}</p>
                </div>
              </button>

              <button
                onClick={handleProfile}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-colors text-left"
              >
                <FaUser className="text-blue-600 text-lg" />
                <span className="font-semibold text-gray-800">Profile</span>
              </button>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-colors text-left text-red-600"
              >
                <FaSignOutAlt className="text-lg" />
                <span className="font-semibold">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
